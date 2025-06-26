import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { processFuelData, processGPSData, processJobData, prepareAnalysisData } from '@/lib/data-processing'
import { FraudAnalysisResult } from '@/types'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!
})

const FRAUD_DETECTION_PROMPT = `Analyze this fleet data for fraud and theft. Return JSON only.

{analysis_data}

Find these fraud types:
- After-hours fuel purchases (outside 7AM-6PM)
- Ghost jobs (jobs scheduled but no GPS/fuel activity at location)
- Fuel without GPS at location  
- Excessive fuel amounts (>25 gallons for vans, >50 for trucks)
- Rapid consecutive purchases (multiple fills within 2 hours)
- Personal use patterns (weekend/holiday activity)
- Jobs with no vehicle presence (cross-check GPS and fuel data)
- SHARED CARD USE: Same card number (last 4 digits) used by different drivers/vehicles within 60 minutes

CRITICAL SHARED CARD DETECTION:
1. Look for identical card numbers or last 4 digits used across different vehicles within 60 minutes
2. Flag even same-vehicle multiple uses within 60 minutes as suspicious
3. Include ALL transactions in the shared_card_use violation with exact timestamps
4. Calculate time_span_minutes between first and last use

IMPORTANT: For ALL fuel-related violations, include the "card_last_4" field with the last 4 digits of the fuel card used.

Return JSON:
{
  "violations": [
    {
      "type": "after_hours",
      "vehicle_id": "VAN-004", 
      "driver_name": "Diana",
      "timestamp": "2024-06-16 02:00:00",
      "location": "Shell Station",
      "card_last_4": "5678",
      "description": "Fuel purchase at 2 AM outside business hours",
      "severity": "high",
      "estimated_loss": 75.50
    },
    {
      "type": "shared_card_use",
      "card_last_4": "1234",
      "vehicles_involved": ["VAN-001", "TRUCK-002"],
      "drivers_involved": ["John Smith", "Mike Jones"],
      "transactions": [
        {"timestamp": "2024-06-16 14:15:00", "vehicle_id": "VAN-001", "driver_name": "John Smith", "location": "BP Station"},
        {"timestamp": "2024-06-16 14:45:00", "vehicle_id": "TRUCK-002", "driver_name": "Mike Jones", "location": "Shell Station"}
      ],
      "time_span_minutes": 30,
      "description": "Same fuel card (****1234) used by different drivers within 30 minutes",
      "severity": "high",
      "estimated_loss": 150.00
    }
  ],
  "summary": {
    "total_violations": 5,
    "total_estimated_loss": 500.00,
    "high_risk_vehicles": ["TRUCK001", "VAN002"]
  }
}`

function extractJsonFromResponse(text: string): any {
  try {
    // Find the JSON in the response
    if (text.includes('{')) {
      const jsonStart = text.indexOf('{')
      let braceCount = 0
      let jsonEnd = jsonStart
      
      // Find the end of the JSON by counting braces
      for (let i = jsonStart; i < text.length; i++) {
        const char = text[i]
        if (char === '{') {
          braceCount += 1
        } else if (char === '}') {
          braceCount -= 1
          if (braceCount === 0) {
            jsonEnd = i + 1
            break
          }
        }
      }
      
      const jsonText = text.slice(jsonStart, jsonEnd)
      return JSON.parse(jsonText)
    }
    
    // If no braces found, try parsing the entire text
    return JSON.parse(text)
  } catch (error) {
    console.error('JSON parsing error:', error)
    throw new Error('Failed to parse Claude response as JSON')
  }
}

export async function POST(request: NextRequest) {
  try {
    const { fuel_data, gps_data, job_data } = await request.json()

    if (!fuel_data || fuel_data.length === 0) {
      return NextResponse.json(
        { error: 'Fuel data is required for analysis' },
        { status: 400 }
      )
    }

    // Process the data
    const processedFuelData = processFuelData(fuel_data)
    const processedGPSData = gps_data ? processGPSData(gps_data) : []
    const processedJobData = job_data ? processJobData(job_data) : []

    // Prepare analysis data
    const analysisData = prepareAnalysisData(
      processedFuelData,
      processedGPSData,
      processedJobData
    )

    // Create the prompt with actual data
    const prompt = FRAUD_DETECTION_PROMPT.replace(
      '{analysis_data}',
      JSON.stringify(analysisData, null, 2)
    )

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 4000,
      temperature: 0.1,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })

    // Extract and parse the response
    const responseText = response.content[0].type === 'text' ? response.content[0].text : ''
    const fraudResults: FraudAnalysisResult = extractJsonFromResponse(responseText)

    // Validate the response structure
    if (!fraudResults.violations || !fraudResults.summary) {
      throw new Error('Invalid response structure from Claude')
    }

    return NextResponse.json(fraudResults)

  } catch (error) {
    console.error('Fraud analysis error:', error)
    
    return NextResponse.json(
      { 
        error: 'Analysis failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { FraudAnalysisResult } from '@/types'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export async function POST(request: NextRequest) {
  try {
    const fraudResults: FraudAnalysisResult = await request.json()

    // Create PDF document
    const doc = new jsPDF()
    
    // Title
    doc.setFontSize(20)
    doc.setTextColor(31, 78, 121) // Primary blue color
    doc.text('FleetAudit.io - Fraud Detection Report', 20, 25)
    
    // Date
    doc.setFontSize(12)
    doc.setTextColor(100, 100, 100)
    doc.text(`Report Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 20, 35)
    
    // Summary section
    doc.setFontSize(16)
    doc.setTextColor(31, 78, 121)
    doc.text('Executive Summary', 20, 50)
    
    doc.setFontSize(11)
    doc.setTextColor(0, 0, 0)
    
    const summaryText = [
      `Total Violations Detected: ${fraudResults.summary.total_violations}`,
      `Estimated Total Loss: $${fraudResults.summary.total_estimated_loss.toFixed(2)}`,
      `High Risk Vehicles: ${fraudResults.summary.high_risk_vehicles.length > 0 
        ? fraudResults.summary.high_risk_vehicles.join(', ') 
        : 'None'}`
    ]
    
    let yPosition = 60
    summaryText.forEach(text => {
      doc.text(text, 20, yPosition)
      yPosition += 8
    })
    
    // Violations table
    yPosition += 10
    doc.setFontSize(16)
    doc.setTextColor(31, 78, 121)
    doc.text('Detailed Violations', 20, yPosition)
    
    // Prepare table data
    const tableData = fraudResults.violations.map(violation => {
      const severity = `${violation.severity.charAt(0).toUpperCase()}${violation.severity.slice(1)}`
      const loss = `$${violation.estimated_loss.toFixed(2)}`
      
      if (violation.type === 'shared_card_use') {
        return [
          'Shared Card Use',
          violation.drivers_involved?.join(', ') || 'Multiple',
          violation.vehicles_involved?.join(', ') || 'Multiple',
          violation.time_span_minutes ? `${violation.time_span_minutes} min` : 'N/A',
          `****${violation.card_last_4 || 'Unknown'}`,
          severity,
          loss
        ]
      } else {
        return [
          violation.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          violation.driver_name || 'N/A',
          violation.vehicle_id || 'N/A',
          violation.timestamp ? new Date(violation.timestamp).toLocaleDateString() : 'N/A',
          violation.location || 'N/A',
          severity,
          loss
        ]
      }
    })
    
    // Add table
    doc.autoTable({
      startY: yPosition + 10,
      head: [['Type', 'Driver', 'Vehicle', 'Date/Time', 'Location/Card', 'Severity', 'Loss']],
      body: tableData,
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [31, 78, 121],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 25 },
        2: { cellWidth: 20 },
        3: { cellWidth: 25 },
        4: { cellWidth: 35 },
        5: { cellWidth: 20 },
        6: { cellWidth: 20 }
      }
    })
    
    // Add violation details on new page if needed
    if (fraudResults.violations.length > 0) {
      doc.addPage()
      yPosition = 25
      
      doc.setFontSize(16)
      doc.setTextColor(31, 78, 121)
      doc.text('Violation Details', 20, yPosition)
      yPosition += 15
      
      fraudResults.violations.forEach((violation, index) => {
        // Check if we need a new page
        if (yPosition > 250) {
          doc.addPage()
          yPosition = 25
        }
        
        doc.setFontSize(12)
        doc.setTextColor(0, 0, 0)
        doc.text(`${index + 1}. ${violation.type.replace('_', ' ').toUpperCase()}`, 20, yPosition)
        yPosition += 8
        
        doc.setFontSize(10)
        doc.setTextColor(60, 60, 60)
        
        // Wrap text for description
        const splitDescription = doc.splitTextToSize(violation.description, 170)
        doc.text(splitDescription, 25, yPosition)
        yPosition += splitDescription.length * 5 + 5
        
        // Add specific details
        if (violation.type === 'shared_card_use' && violation.transactions) {
          doc.text('Transactions:', 25, yPosition)
          yPosition += 6
          
          violation.transactions.forEach(tx => {
            const txText = `• ${new Date(tx.timestamp).toLocaleString()} - ${tx.vehicle_id} (${tx.driver_name}) at ${tx.location}`
            const splitTx = doc.splitTextToSize(txText, 160)
            doc.text(splitTx, 30, yPosition)
            yPosition += splitTx.length * 5
          })
        }
        
        yPosition += 10
      })
    }
    
    // Add recommendations
    doc.addPage()
    doc.setFontSize(16)
    doc.setTextColor(31, 78, 121)
    doc.text('Recommendations', 20, 25)
    
    doc.setFontSize(11)
    doc.setTextColor(0, 0, 0)
    
    const recommendations = [
      '• Review high-risk vehicles immediately and implement additional monitoring',
      '• Update fuel card policies to prevent shared usage between drivers',
      '• Implement GPS tracking integration for real-time location verification',
      '• Set up automated alerts for after-hours fuel purchases',
      '• Conduct driver training on fuel card usage policies',
      '• Review and update vehicle capacity limits for fuel purchases'
    ]
    
    yPosition = 40
    recommendations.forEach(rec => {
      const splitRec = doc.splitTextToSize(rec, 170)
      doc.text(splitRec, 20, yPosition)
      yPosition += splitRec.length * 6 + 3
    })
    
    // Footer
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text(`FleetAudit.io - Confidential Report - Page ${i} of ${pageCount}`, 20, 285)
    }
    
    // Generate PDF buffer
    const pdfBuffer = doc.output('arraybuffer')
    
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="FleetAudit-Report.pdf"'
      }
    })
    
  } catch (error) {
    console.error('PDF generation error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate PDF report',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
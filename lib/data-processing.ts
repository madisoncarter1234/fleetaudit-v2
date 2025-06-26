import { FuelData, GPSData, JobData } from '@/types'

// Column mapping for fuel data
const FUEL_COLUMN_MAPPING: Record<string, string> = {
  'Transaction Date': 'date',
  'Date': 'date',
  'Transaction Time': 'time',
  'Time': 'time',
  'Site Name': 'location',
  'Merchant Name': 'location',
  'Location': 'location',
  'Gallons': 'gallons',
  'Fuel Quantity': 'gallons',
  'Vehicle Number': 'vehicle_id',
  'Vehicle': 'vehicle_id',
  'Amount': 'amount',
  'Total Cost': 'amount',
  'Driver Name': 'driver_name',
  'Card Number': 'card_number',
  'Card': 'card_number',
  'Fuel Card': 'card_number',
  'Card Last 4': 'card_last_4',
  'Last 4': 'card_last_4',
  'card_last4': 'card_last_4'
}

// Process and normalize fuel data
export function processFuelData(rawData: any[]): FuelData[] {
  if (!rawData || rawData.length === 0) return []

  return rawData.map(row => {
    const processed: any = {}
    
    // Map columns to standard names
    Object.keys(row).forEach(originalKey => {
      const standardKey = FUEL_COLUMN_MAPPING[originalKey] || originalKey.toLowerCase()
      processed[standardKey] = row[originalKey]
    })

    // Create timestamp from date and time
    let timestamp = ''
    if (processed.date && processed.time) {
      timestamp = `${processed.date} ${processed.time}`
    } else if (processed.date) {
      timestamp = processed.date
    } else if (processed.timestamp) {
      timestamp = processed.timestamp
    }

    // Extract card last 4 if not present
    let cardLast4 = processed.card_last_4 || processed.card_last4
    if (!cardLast4 && processed.card_number) {
      cardLast4 = String(processed.card_number).slice(-4)
    }

    return {
      timestamp: timestamp,
      location: processed.location || '',
      gallons: parseFloat(processed.gallons) || 0,
      vehicle_id: processed.vehicle_id || '',
      driver_name: processed.driver_name || '',
      card_last_4: cardLast4 || '',
      amount: parseFloat(processed.amount) || 0
    }
  }).filter(item => item.timestamp && item.vehicle_id) // Filter out invalid entries
}

// Process GPS data
export function processGPSData(rawData: any[]): GPSData[] {
  if (!rawData || rawData.length === 0) return []

  return rawData.map(row => {
    let timestamp = ''
    if (row.Timestamp) {
      timestamp = row.Timestamp
    } else if (row.Date) {
      timestamp = row.Date
    } else if (row.timestamp) {
      timestamp = row.timestamp
    }

    return {
      timestamp: timestamp,
      vehicle_id: row['Vehicle ID'] || row.vehicle_id || row.Vehicle || '',
      latitude: parseFloat(row.Latitude || row.latitude || row.lat || 0),
      longitude: parseFloat(row.Longitude || row.longitude || row.lng || row.lon || 0),
      location: row.Location || row.location || ''
    }
  }).filter(item => item.timestamp && item.vehicle_id)
}

// Process job data
export function processJobData(rawData: any[]): JobData[] {
  if (!rawData || rawData.length === 0) return []

  return rawData.map(row => {
    let timestamp = ''
    if (row['Scheduled Time']) {
      timestamp = row['Scheduled Time']
    } else if (row.Date) {
      timestamp = row.Date
    } else if (row.timestamp) {
      timestamp = row.timestamp
    }

    return {
      job_id: row['Job ID'] || row.job_id || row.JobID || '',
      timestamp: timestamp,
      vehicle_id: row['Vehicle ID'] || row.vehicle_id || row.Vehicle || '',
      driver_name: row['Driver Name'] || row.driver_name || row.Driver || '',
      address: row.Address || row.address || row.Location || '',
      status: row.Status || row.status || ''
    }
  }).filter(item => item.timestamp && item.vehicle_id)
}

// Prepare data for Claude analysis
export function prepareAnalysisData(fuelData: FuelData[], gpsData?: GPSData[], jobData?: JobData[]) {
  const analysisData = {
    fuel_transactions: fuelData.map(fuel => ({
      timestamp: fuel.timestamp,
      vehicle_id: fuel.vehicle_id,
      driver_name: fuel.driver_name,
      location: fuel.location,
      gallons: fuel.gallons,
      amount: fuel.amount,
      card_last_4: fuel.card_last_4
    })),
    
    gps_data: gpsData ? gpsData.map(gps => ({
      timestamp: gps.timestamp,
      vehicle_id: gps.vehicle_id,
      latitude: gps.latitude,
      longitude: gps.longitude,
      location: gps.location
    })) : [],
    
    job_data: jobData ? jobData.map(job => ({
      job_id: job.job_id,
      timestamp: job.timestamp,
      vehicle_id: job.vehicle_id,
      driver_name: job.driver_name,
      address: job.address,
      status: job.status
    })) : []
  }

  return analysisData
}
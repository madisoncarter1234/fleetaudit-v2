// Fraud Detection Types
export type ViolationType = 
  | 'shared_card_use'
  | 'after_hours'
  | 'ghost_job'
  | 'excessive_amount'
  | 'rapid_purchases'
  | 'personal_use'
  | 'minor_deviation';

export type SeverityLevel = 'high' | 'medium' | 'low';

export interface Violation {
  type: ViolationType;
  vehicle_id?: string;
  driver_name?: string;
  timestamp?: string;
  location?: string;
  card_last_4?: string;
  description: string;
  severity: SeverityLevel;
  estimated_loss: number;
  
  // Shared card use specific fields
  vehicles_involved?: string[];
  drivers_involved?: string[];
  transactions?: Array<{
    timestamp: string;
    vehicle_id: string;
    driver_name: string;
    location: string;
  }>;
  time_span_minutes?: number;
  
  // Ghost job specific fields
  job_id?: string;
  scheduled_time?: string;
  address?: string;
}

export interface FraudAnalysisResult {
  violations: Violation[];
  summary: {
    total_violations: number;
    total_estimated_loss: number;
    high_risk_vehicles: string[];
  };
}

// CSV Data Types
export interface FuelData {
  timestamp: string;
  location: string;
  gallons: number;
  vehicle_id: string;
  driver_name: string;
  card_last_4: string;
  amount?: number;
}

export interface GPSData {
  timestamp: string;
  vehicle_id: string;
  latitude: number;
  longitude: number;
  location?: string;
}

export interface JobData {
  job_id: string;
  timestamp: string;
  vehicle_id: string;
  driver_name: string;
  address: string;
  status?: string;
}

// Demo Scenario Types
export interface DemoScenario {
  id: string;
  name: string;
  description: string;
  vehicles: number;
  violations: Violation[];
  summary: {
    total_violations: number;
    total_estimated_loss: number;
    high_risk_vehicles: string[];
  };
}

// File Upload Types
export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  data: any[];
  preview: any[];
}

export interface AnalysisState {
  fuel_data?: FuelData[];
  gps_data?: GPSData[];
  job_data?: JobData[];
  fraud_results?: FraudAnalysisResult;
  isAnalyzing: boolean;
  error?: string;
}
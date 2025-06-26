import { DemoScenario } from '@/types'

export const demoScenarios: DemoScenario[] = [
  {
    id: 'abc-logistics',
    name: 'ABC Logistics',
    description: '12-vehicle delivery fleet with multiple policy violations',
    vehicles: 12,
    violations: [
      {
        type: 'shared_card_use',
        card_last_4: '4455',
        vehicles_involved: ['VAN-003', 'TRUCK-007'],
        drivers_involved: ['Mike Chen', 'Sarah Wilson'],
        time_span_minutes: 25,
        description: 'Same fuel card (****4455) used by different drivers within 25 minutes',
        severity: 'high',
        estimated_loss: 187.50,
        transactions: [
          {
            timestamp: '2024-08-15 14:15:00',
            vehicle_id: 'VAN-003',
            driver_name: 'Mike Chen',
            location: 'BP Station - Highway 75'
          },
          {
            timestamp: '2024-08-15 14:40:00',
            vehicle_id: 'TRUCK-007',
            driver_name: 'Sarah Wilson',
            location: 'Shell Station - Interstate 85'
          }
        ]
      },
      {
        type: 'after_hours',
        vehicle_id: 'VAN-005',
        driver_name: 'Carlos Rodriguez',
        timestamp: '2024-08-15 02:47:00',
        location: 'Shell Station - Interstate 85',
        card_last_4: '4455',
        description: 'Fuel purchase at 2:47 AM on weekend outside business hours',
        severity: 'high',
        estimated_loss: 89.25
      },
      {
        type: 'excessive_amount',
        vehicle_id: 'TRUCK-003',
        driver_name: 'David Kim',
        timestamp: '2024-08-12 14:22:00',
        location: 'BP Station - Highway 75',
        card_last_4: '7891',
        description: 'Purchased 67 gallons (normal capacity: 35 gallons)',
        severity: 'medium',
        estimated_loss: 125.00
      },
      {
        type: 'ghost_job',
        job_id: 'ATL-2024-0815',
        driver_name: 'Mike Chen',
        vehicle_id: 'VAN-003',
        scheduled_time: '2024-08-15 14:00:00',
        address: 'Buford, GA',
        description: 'Scheduled delivery with no GPS activity at job location',
        severity: 'high',
        estimated_loss: 150.00
      }
    ],
    summary: {
      total_violations: 4,
      total_estimated_loss: 551.75,
      high_risk_vehicles: ['VAN-003', 'VAN-005', 'TRUCK-003']
    }
  },
  {
    id: 'metro-delivery',
    name: 'Metro Delivery',
    description: '6-vehicle urban delivery service with moderate violations',
    vehicles: 6,
    violations: [
      {
        type: 'rapid_purchases',
        vehicle_id: 'VAN-002',
        driver_name: 'Lisa Johnson',
        timestamp: '2024-08-10 16:45:00',
        location: 'Exxon Station - Downtown',
        card_last_4: '3344',
        description: 'Two fuel purchases within 45 minutes at different locations',
        severity: 'medium',
        estimated_loss: 95.50
      },
      {
        type: 'personal_use',
        vehicle_id: 'TRUCK-001',
        driver_name: 'James Wilson',
        timestamp: '2024-08-11 19:30:00',
        location: 'Shell Station - Residential Area',
        card_last_4: '2233',
        description: 'Weekend fuel purchase in residential area during off-hours',
        severity: 'medium',
        estimated_loss: 67.25
      }
    ],
    summary: {
      total_violations: 2,
      total_estimated_loss: 162.75,
      high_risk_vehicles: ['VAN-002', 'TRUCK-001']
    }
  },
  {
    id: 'clean-fleet-co',
    name: 'Clean Fleet Co',
    description: '8-vehicle service fleet with excellent compliance record',
    vehicles: 8,
    violations: [
      {
        type: 'minor_deviation',
        vehicle_id: 'VAN-001',
        driver_name: 'Jennifer Adams',
        timestamp: '2024-08-09 18:15:00',
        location: 'BP Station - Route 285',
        card_last_4: '5566',
        description: 'Fuel purchase 15 minutes after official end of shift',
        severity: 'low',
        estimated_loss: 12.50
      }
    ],
    summary: {
      total_violations: 1,
      total_estimated_loss: 12.50,
      high_risk_vehicles: []
    }
  }
]
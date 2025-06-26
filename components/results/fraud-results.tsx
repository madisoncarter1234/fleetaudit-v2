'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FraudAnalysisResult } from '@/types'
import { formatCurrency, formatDate } from '@/lib/utils'
import { AlertTriangle, Shield, TrendingUp, FileText, Download, RotateCcw, Users, DollarSign } from 'lucide-react'

interface FraudResultsProps {
  results: FraudAnalysisResult
  onStartOver: () => void
}

export function FraudResults({ results, onStartOver }: FraudResultsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'low': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4" />
      case 'medium': return <Shield className="h-4 w-4" />
      case 'low': return <TrendingUp className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const handleDownloadReport = async () => {
    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(results),
      })

      if (!response.ok) {
        throw new Error('Failed to generate report')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `FleetAudit-Report-${new Date().toISOString().split('T')[0]}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading report:', error)
      alert('Failed to download report. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              Total Violations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-800">
              {results.summary.total_violations}
            </div>
            <p className="text-sm text-red-600 mt-1">
              Policy violations detected
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <DollarSign className="h-5 w-5" />
              Estimated Loss
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-800">
              {formatCurrency(results.summary.total_estimated_loss)}
            </div>
            <p className="text-sm text-orange-600 mt-1">
              Financial impact identified
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Users className="h-5 w-5" />
              High Risk Vehicles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-800">
              {results.summary.high_risk_vehicles.length}
            </div>
            <p className="text-sm text-blue-600 mt-1">
              {results.summary.high_risk_vehicles.length > 0 
                ? results.summary.high_risk_vehicles.join(', ')
                : 'No high-risk vehicles'
              }
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          onClick={handleDownloadReport}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Download className="h-4 w-4" />
          Download PDF Report
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={onStartOver}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Start New Analysis
        </Button>
      </div>

      {/* Violations List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Detailed Violations
          </CardTitle>
          <CardDescription>
            Complete list of fraud and policy violations detected in your fleet data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.violations.map((violation, index) => (
              <div
                key={index}
                className={`violation-card ${violation.severity} ${getSeverityColor(violation.severity)} border rounded-lg p-4`}
              >
                <div className="flex items-start gap-3">
                  {getSeverityIcon(violation.severity)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold capitalize text-lg">
                        {violation.type.replace('_', ' ')}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getSeverityColor(violation.severity)}`}>
                          {violation.severity} Risk
                        </span>
                        <span className="font-bold text-lg">
                          {formatCurrency(violation.estimated_loss)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm mb-3 leading-relaxed">{violation.description}</p>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      {violation.vehicle_id && (
                        <div>
                          <span className="font-medium text-gray-600">Vehicle:</span>
                          <div className="font-medium">{violation.vehicle_id}</div>
                        </div>
                      )}
                      {violation.driver_name && (
                        <div>
                          <span className="font-medium text-gray-600">Driver:</span>
                          <div className="font-medium">{violation.driver_name}</div>
                        </div>
                      )}
                      {violation.timestamp && (
                        <div>
                          <span className="font-medium text-gray-600">Time:</span>
                          <div className="font-medium">{formatDate(violation.timestamp)}</div>
                        </div>
                      )}
                      {violation.location && (
                        <div>
                          <span className="font-medium text-gray-600">Location:</span>
                          <div className="font-medium">{violation.location}</div>
                        </div>
                      )}
                    </div>

                    {violation.card_last_4 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <span className="text-sm font-medium text-gray-600">Fuel Card: </span>
                        <span className="text-sm font-mono">****{violation.card_last_4}</span>
                      </div>
                    )}

                    {/* Special handling for shared card violations */}
                    {violation.type === 'shared_card_use' && violation.transactions && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h5 className="font-medium mb-3 text-sm">Transaction Details:</h5>
                        <div className="space-y-2">
                          {violation.transactions.map((transaction, txIndex) => (
                            <div key={txIndex} className="bg-white/50 rounded p-3 text-sm">
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                                <div>
                                  <span className="text-gray-600">Time:</span>
                                  <div className="font-medium">{formatDate(transaction.timestamp)}</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Vehicle:</span>
                                  <div className="font-medium">{transaction.vehicle_id}</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Driver:</span>
                                  <div className="font-medium">{transaction.driver_name}</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Location:</span>
                                  <div className="font-medium">{transaction.location}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {violation.time_span_minutes && (
                          <div className="mt-2 text-sm">
                            <span className="font-medium text-red-600">
                              Time between uses: {violation.time_span_minutes} minutes
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Ghost job specific details */}
                    {violation.type === 'ghost_job' && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {violation.job_id && (
                            <div>
                              <span className="font-medium text-gray-600">Job ID:</span>
                              <div className="font-medium">{violation.job_id}</div>
                            </div>
                          )}
                          {violation.scheduled_time && (
                            <div>
                              <span className="font-medium text-gray-600">Scheduled:</span>
                              <div className="font-medium">{formatDate(violation.scheduled_time)}</div>
                            </div>
                          )}
                          {violation.address && (
                            <div className="col-span-2">
                              <span className="font-medium text-gray-600">Job Address:</span>
                              <div className="font-medium">{violation.address}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-blue-700">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Review high-risk vehicles immediately and implement additional monitoring</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Update fuel card policies to prevent shared usage between drivers</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Implement GPS tracking integration for real-time location verification</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Set up automated alerts for after-hours fuel purchases</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
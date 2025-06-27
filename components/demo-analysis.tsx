'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { demoScenarios } from '@/lib/demo-data'
import { formatCurrency } from '@/lib/utils'
import { DemoScenario, Violation } from '@/types'
import { AlertTriangle, Shield, TrendingUp, FileText, Download } from 'lucide-react'

export function DemoAnalysis() {
  const [selectedDemo, setSelectedDemo] = useState<DemoScenario | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

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

  const runDemoAnalysis = (scenario: DemoScenario) => {
    setIsAnalyzing(true)
    setSelectedDemo(null)
    
    setTimeout(() => {
      setSelectedDemo(scenario)
      setIsAnalyzing(false)
    }, 2000)
  }

  const downloadDemoReport = async () => {
    if (!selectedDemo) return
    
    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary: selectedDemo.summary,
          violations: selectedDemo.violations
        })
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `FleetAudit-Demo-${selectedDemo.name.replace(/\s+/g, '-')}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Download error:', error)
    }
  }

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Try Our Demo Analysis
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See FleetAudit.io in action with real fleet data examples. Click any scenario below to run a live analysis.
        </p>
      </div>

      {/* Demo Scenario Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {demoScenarios.map((scenario, index) => (
          <Card 
            key={index} 
            className={`demo-card cursor-pointer transition-all ${selectedDemo?.name === scenario.name ? 'selected' : ''}`}
            onClick={() => runDemoAnalysis(scenario)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{scenario.name}</CardTitle>
              <CardDescription>{scenario.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fleet Size:</span>
                  <span className="font-medium">{scenario.vehicles} vehicles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Violations:</span>
                  <span className="font-medium">{scenario.violations.length} detected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Loss:</span>
                  <span className="font-medium">{formatCurrency(scenario.summary.total_estimated_loss)}</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Loading State */}
      {isAnalyzing && (
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="loading-pulse mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Analyzing Fleet Data...</h3>
              <p className="text-blue-600">Our AI is processing fuel transactions, GPS data, and job records to identify potential fraud patterns.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {selectedDemo && !isAnalyzing && (
        <div className="space-y-6">
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                Analysis Results: {selectedDemo.name}
              </CardTitle>
              <CardDescription>
                AI-powered analysis completed • {selectedDemo.violations.length} violations detected
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Summary Cards */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-700">
                    {selectedDemo.summary.total_violations}
                  </div>
                  <div className="text-sm text-red-600">Total Violations</div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-700">
                    {formatCurrency(selectedDemo.summary.total_estimated_loss)}
                  </div>
                  <div className="text-sm text-orange-600">Estimated Loss</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-700">
                    {selectedDemo.summary.high_risk_vehicles.length}
                  </div>
                  <div className="text-sm text-blue-600">High Risk Vehicles</div>
                </div>
              </div>

              {/* Download Report Button */}
              <div className="text-center mb-6">
                <Button onClick={downloadDemoReport} className="px-6 py-2">
                  <Download className="mr-2 h-4 w-4" />
                  Download Full Report
                </Button>
              </div>

              {/* Violations List */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Detected Violations</h4>
                {selectedDemo.violations.slice(0, 3).map((violation: Violation, index: number) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 ${getSeverityColor(violation.severity)}`}
                  >
                    <div className="flex items-start gap-3">
                      {getSeverityIcon(violation.severity)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold capitalize">
                            {violation.type.replace('_', ' ')}
                          </h5>
                          <span className="font-bold">
                            {formatCurrency(violation.estimated_loss)}
                          </span>
                        </div>
                        <p className="text-sm mb-2">{violation.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          {violation.vehicle_id && (
                            <div>
                              <span className="font-medium">Vehicle:</span> {violation.vehicle_id}
                            </div>
                          )}
                          {violation.driver_name && (
                            <div>
                              <span className="font-medium">Driver:</span> {violation.driver_name}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {selectedDemo.violations.length > 3 && (
                  <div className="text-center text-gray-600 text-sm">
                    + {selectedDemo.violations.length - 3} more violations in full report
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
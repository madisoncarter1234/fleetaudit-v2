'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { demoScenarios } from '@/lib/demo-data'
import { formatCurrency } from '@/lib/utils'
import { DemoScenario, Violation } from '@/types'
import { AlertTriangle, Shield, TrendingUp, FileText, ChevronRight, Database, Clock, MapPin, Truck, Download } from 'lucide-react'

export default function LandingPage() {
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
          violations: selectedDemo.violations,
          summary: selectedDemo.summary
        }),
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Truck className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              FleetAudit.io
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stop Fleet Fraud Before It Costs You Thousands
          </p>
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
            AI-powered detection analyzes fuel, GPS, and job data to uncover theft, misuse, and policy violations in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                Start Free Analysis
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-blue-200 text-blue-600 hover:bg-blue-50">
              Try Demo Below
            </Button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow border-blue-100">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">🔍 AI-Powered Detection</h3>
              <p className="text-gray-600">Detects shared cards, ghost jobs, after-hours usage, and excessive fuel purchases automatically.</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow border-green-100">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">💰 Immediate ROI</h3>
              <p className="text-gray-600">Customers recover 10x their cost in 30 days by identifying fraud and policy violations.</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow border-purple-100">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">📊 Professional Reports</h3>
              <p className="text-gray-600">Generates detailed PDF reports with evidence for HR and legal departments.</p>
            </CardContent>
          </Card>
        </div>

        {/* Live Demo Section */}
        <Card className="mb-16 border-2 border-blue-200 shadow-xl">
          <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="text-3xl font-bold text-blue-800">🚨 Live Fraud Detection Demo</CardTitle>
            <CardDescription className="text-lg text-blue-600">
              Click any scenario below to see FleetAudit in action with real fraud patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {demoScenarios.map((scenario) => (
                <Card 
                  key={scenario.id}
                  className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                    selectedDemo?.id === scenario.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
                  }`}
                  onClick={() => runDemoAnalysis(scenario)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Truck className="h-5 w-5 text-blue-600" />
                      {scenario.name}
                    </CardTitle>
                    <CardDescription className="text-sm">{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Vehicles:</span>
                        <span className="font-semibold text-blue-600">{scenario.vehicles}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Violations:</span>
                        <span className="font-semibold text-red-600">{scenario.summary.total_violations}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Est. Loss:</span>
                        <span className="font-bold text-red-700">{formatCurrency(scenario.summary.total_estimated_loss)}</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-700" 
                      size="sm"
                    >
                      Analyze This Fleet
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Analysis Loading */}
            {isAnalyzing && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-8 text-center">
                  <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">🔍 Analyzing Fleet Data...</h3>
                  <p className="text-blue-600">Processing fuel transactions, GPS data, and job schedules</p>
                </CardContent>
              </Card>
            )}

            {/* Demo Results */}
            {selectedDemo && !isAnalyzing && (
              <Card className="bg-red-50 border-red-200 border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                      <CardTitle className="text-xl text-red-800">
                        🚨 {selectedDemo.name} - Fraud Detected!
                      </CardTitle>
                    </div>
                    <Button onClick={downloadDemoReport} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                  <CardDescription className="text-red-600">
                    Analysis of {selectedDemo.vehicles} vehicles revealed {selectedDemo.summary.total_violations} violations 
                    with estimated losses of {formatCurrency(selectedDemo.summary.total_estimated_loss)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-red-200 text-center">
                      <div className="text-2xl font-bold text-red-600">{selectedDemo.summary.total_violations}</div>
                      <div className="text-sm text-red-500">Total Violations</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-red-200 text-center">
                      <div className="text-2xl font-bold text-red-600">{formatCurrency(selectedDemo.summary.total_estimated_loss)}</div>
                      <div className="text-sm text-red-500">Estimated Loss</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-red-200 text-center">
                      <div className="text-2xl font-bold text-red-600">{selectedDemo.summary.high_risk_vehicles.length}</div>
                      <div className="text-sm text-red-500">High-Risk Vehicles</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedDemo.violations.map((violation: Violation, index: number) => (
                      <Card key={index} className={`${getSeverityColor(violation.severity)} border-l-4`}>
                        <CardContent className="pt-4">
                          <div className="flex items-start gap-3">
                            {getSeverityIcon(violation.severity)}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold capitalize text-lg">
                                  {violation.type.replace('_', ' ')}
                                </h4>
                                <span className="px-3 py-1 rounded-full text-xs font-medium capitalize bg-white border shadow-sm">
                                  {violation.severity} Risk
                                </span>
                              </div>
                              <p className="text-sm mb-3 leading-relaxed">{violation.description}</p>
                              <div className="grid grid-cols-2 gap-4 text-sm bg-white/50 p-3 rounded">
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
                                {violation.timestamp && (
                                  <div>
                                    <span className="font-medium">Time:</span> {new Date(violation.timestamp).toLocaleString()}
                                  </div>
                                )}
                                <div>
                                  <span className="font-medium">Est. Loss:</span> {formatCurrency(violation.estimated_loss)}
                                </div>
                              </div>
                              {violation.transactions && (
                                <div className="mt-4 pt-3 border-t bg-white/30 p-3 rounded">
                                  <p className="text-sm font-medium mb-2">Transaction Details:</p>
                                  {violation.transactions.map((transaction, txIndex) => (
                                    <div key={txIndex} className="text-sm text-gray-700 mb-1 font-mono">
                                      {new Date(transaction.timestamp).toLocaleString()} - {transaction.vehicle_id} 
                                      ({transaction.driver_name}) at {transaction.location}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="text-center bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-blue-800">Ready to Protect Your Fleet?</CardTitle>
            <CardDescription className="text-lg text-blue-600">
              Upload your own data and get professional fraud analysis in minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <div className="mt-6 space-x-4">
              <Link href="/app">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                  Start Free Analysis
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-blue-200 text-blue-600 hover:bg-blue-50">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
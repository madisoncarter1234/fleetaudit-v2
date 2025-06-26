'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { demoScenarios } from '@/lib/demo-data'
import { formatCurrency } from '@/lib/utils'
import { DemoScenario, Violation } from '@/types'
import { AlertTriangle, Shield, TrendingUp, FileText, ChevronRight, Database, Clock, MapPin } from 'lucide-react'

export default function LandingPage() {
  const [selectedDemo, setSelectedDemo] = useState<DemoScenario | null>(null)

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">FleetAudit.io</h1>
          <p className="text-muted-foreground mb-10 text-lg">
            AI-powered fleet fraud detection that analyzes fuel, GPS, and job data to uncover theft, 
            misuse, and policy violations in real-time.
          </p>
          <div className="mt-6 space-x-4">
            <Link href="/app">
              <Button size="lg">Try FleetAudit Now</Button>
            </Link>
            <Button variant="outline" size="lg">Watch Demo</Button>
          </div>
        </div>

        {/* Features Section */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="text-center">Advanced Fraud Detection Capabilities</CardTitle>
            <CardDescription className="text-center">
              Protect your fleet with comprehensive AI-powered analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-6 h-6 mt-1 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Shared Card Detection</h3>
                <p className="text-muted-foreground">
                  Identifies when the same fuel card is used by multiple drivers or vehicles within suspicious timeframes.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 mt-1 text-orange-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">After-Hours Monitoring</h3>
                <p className="text-muted-foreground">
                  Flags fuel purchases outside business hours and identifies personal use patterns during off-time.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 mt-1 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Ghost Job Analysis</h3>
                <p className="text-muted-foreground">
                  Cross-references scheduled jobs with GPS data to identify phantom work orders and location fraud.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Database className="w-6 h-6 mt-1 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Excessive Fuel Detection</h3>
                <p className="text-muted-foreground">
                  Monitors fuel purchases that exceed vehicle capacity limits and flags suspicious amounts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Section */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="text-center">Interactive Demo Scenarios</CardTitle>
            <CardDescription className="text-center">
              Explore real-world examples of fleet fraud detection with actual violation patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {demoScenarios.map((scenario) => (
                <Card 
                  key={scenario.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedDemo?.id === scenario.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedDemo(scenario)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{scenario.name}</CardTitle>
                    <CardDescription className="text-sm">{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Vehicles:</span>
                        <span className="font-medium">{scenario.vehicles}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Violations:</span>
                        <span className="font-medium text-red-600">{scenario.summary.total_violations}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Est. Loss:</span>
                        <span className="font-bold text-red-600">{formatCurrency(scenario.summary.total_estimated_loss)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Demo Results */}
            {selectedDemo && (
              <Card className="bg-gray-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    {selectedDemo.name} - Fraud Detection Results
                  </CardTitle>
                  <CardDescription>
                    Analysis of {selectedDemo.vehicles} vehicles revealed {selectedDemo.summary.total_violations} violations 
                    with estimated losses of {formatCurrency(selectedDemo.summary.total_estimated_loss)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedDemo.violations.map((violation: Violation, index: number) => (
                      <Card key={index} className={`${getSeverityColor(violation.severity)} border-l-4`}>
                        <CardContent className="pt-4">
                          <div className="flex items-start gap-3">
                            {getSeverityIcon(violation.severity)}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold capitalize">
                                  {violation.type.replace('_', ' ')}
                                </h4>
                                <span className="px-2 py-1 rounded text-xs font-medium capitalize bg-white border">
                                  {violation.severity} Risk
                                </span>
                              </div>
                              <p className="text-sm mb-3">{violation.description}</p>
                              <div className="grid grid-cols-2 gap-4 text-sm">
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
                                <div className="mt-4 pt-3 border-t">
                                  <p className="text-sm font-medium mb-2">Transaction Details:</p>
                                  {violation.transactions.map((transaction, txIndex) => (
                                    <div key={txIndex} className="text-sm text-muted-foreground mb-1">
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
        <Card className="text-center bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Protect Your Fleet?</CardTitle>
            <CardDescription>
              Start detecting fraud in your fleet operations today. Upload your data and get instant AI-powered analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-6 space-x-4">
              <Link href="/app">
                <Button size="lg">Start Free Analysis</Button>
              </Link>
              <Button variant="outline" size="lg">Learn More</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
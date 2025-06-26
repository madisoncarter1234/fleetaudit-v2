'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { demoScenarios } from '@/lib/demo-data'
import { formatCurrency } from '@/lib/utils'
import { DemoScenario, Violation } from '@/types'
import { AlertTriangle, Shield, TrendingUp, FileText, ChevronRight } from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 px-4 rounded-2xl mx-4 mt-4 mb-8 shadow-2xl">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            FleetAudit.io
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            AI-powered fleet fraud detection that analyzes fuel, GPS, and job data to uncover theft, 
            misuse, and policy violations in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app">
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-50">
                Try FleetAudit Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="ghost" className="text-white border-white hover:bg-white/10">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Advanced Fraud Detection Capabilities
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="feature-card">
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-red-500 mb-2" />
                <CardTitle className="text-primary">Shared Card Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Identifies when the same fuel card is used by multiple drivers or vehicles within suspicious timeframes.</p>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <Shield className="h-8 w-8 text-orange-500 mb-2" />
                <CardTitle className="text-primary">After-Hours Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Flags fuel purchases outside business hours and identifies personal use patterns during off-time.</p>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-primary">Ghost Job Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Cross-references scheduled jobs with GPS data to identify phantom work orders and location fraud.</p>
              </CardContent>
            </Card>
          </div>

          {/* Demo Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
              Interactive Demo Scenarios
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore real-world examples of fleet fraud detection. Each scenario represents actual patterns 
              found in fleet operations, with estimated financial impact.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {demoScenarios.map((scenario) => (
                <Card 
                  key={scenario.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedDemo?.id === scenario.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedDemo(scenario)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{scenario.name}</CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vehicles:</span>
                        <span className="font-medium">{scenario.vehicles}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Violations:</span>
                        <span className="font-medium text-red-600">{scenario.summary.total_violations}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Est. Loss:</span>
                        <span className="font-bold text-red-600">{formatCurrency(scenario.summary.total_estimated_loss)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Demo Results */}
            {selectedDemo && (
              <Card className="bg-gray-50">
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
                      <div 
                        key={index}
                        className={`violation-card ${violation.severity} ${getSeverityColor(violation.severity)}`}
                      >
                        <div className="flex items-start gap-3">
                          {getSeverityIcon(violation.severity)}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold capitalize">
                                {violation.type.replace('_', ' ')}
                              </h4>
                              <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getSeverityColor(violation.severity)}`}>
                                {violation.severity} Risk
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
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <p className="text-xs font-medium mb-2">Transaction Details:</p>
                                {violation.transactions.map((transaction, txIndex) => (
                                  <div key={txIndex} className="text-xs text-gray-600 mb-1">
                                    {new Date(transaction.timestamp).toLocaleString()} - {transaction.vehicle_id} 
                                    ({transaction.driver_name}) at {transaction.location}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary">
            Ready to Protect Your Fleet?
          </h2>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            Start detecting fraud in your fleet operations today. Upload your data and get instant AI-powered analysis.
          </p>
          <Link href="/app">
            <Button size="lg" variant="fleetaudit" className="text-lg px-8 py-3">
              Start Free Analysis
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
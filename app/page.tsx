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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 px-6 mx-6 mt-6 mb-12">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="hero-title fade-in-up">
            FleetAudit.io
          </h1>
          <p className="hero-subtitle max-w-4xl mx-auto fade-in-up">
            AI-powered fleet fraud detection that analyzes fuel, GPS, and job data to uncover theft, 
            misuse, and policy violations in real-time. Protect your fleet with advanced analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center fade-in-up">
            <Link href="/app" className="btn-primary text-lg px-8 py-4">
              Try FleetAudit Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <button className="btn-secondary text-lg px-8 py-4">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="section-title fade-in-up">
            Advanced Fraud Detection Capabilities
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="feature-card fade-in-up">
              <AlertTriangle className="h-12 w-12 text-danger mb-4" />
              <h3 className="text-xl font-bold text-primary mb-4">Shared Card Detection</h3>
              <p className="text-gray-600 leading-relaxed">
                Identifies when the same fuel card is used by multiple drivers or vehicles within suspicious timeframes.
              </p>
            </div>

            <div className="feature-card fade-in-up">
              <Shield className="h-12 w-12 text-warning mb-4" />
              <h3 className="text-xl font-bold text-primary mb-4">After-Hours Monitoring</h3>
              <p className="text-gray-600 leading-relaxed">
                Flags fuel purchases outside business hours and identifies personal use patterns during off-time.
              </p>
            </div>

            <div className="feature-card fade-in-up">
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-primary mb-4">Ghost Job Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Cross-references scheduled jobs with GPS data to identify phantom work orders and location fraud.
              </p>
            </div>
          </div>

          {/* Demo Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 fade-in-up">
            <h2 className="text-4xl font-bold text-center mb-6 text-primary">
              Interactive Demo Scenarios
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg leading-relaxed">
              Explore real-world examples of fleet fraud detection. Each scenario represents actual patterns 
              found in fleet operations, with estimated financial impact and detailed violation analysis.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {demoScenarios.map((scenario) => (
                <div 
                  key={scenario.id}
                  className={`demo-card p-6 ${
                    selectedDemo?.id === scenario.id ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedDemo(scenario)}
                >
                  <h3 className="text-xl font-bold text-primary mb-3">{scenario.name}</h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">{scenario.description}</p>
                  
                  <div className="space-y-4">
                    <div className="metric-card">
                      <div className="metric-value text-primary">{scenario.vehicles}</div>
                      <div className="metric-label text-gray-500">Vehicles</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-danger">{scenario.summary.total_violations}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">Violations</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-danger">{formatCurrency(scenario.summary.total_estimated_loss)}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">Est. Loss</div>
                      </div>
                    </div>
                  </div>
                </div>
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
      <section className="py-20 px-6 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Protect Your Fleet?
          </h2>
          <p className="text-xl mb-10 text-white opacity-90 max-w-3xl mx-auto leading-relaxed">
            Start detecting fraud in your fleet operations today. Upload your data and get instant AI-powered analysis 
            with professional reports and actionable insights.
          </p>
          <Link href="/app" className="btn-primary bg-white text-primary hover:bg-gray-100 text-xl px-12 py-5 shadow-2xl">
            Start Free Analysis
            <ChevronRight className="ml-3 h-6 w-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}
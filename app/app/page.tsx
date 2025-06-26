'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AnalysisState, UploadedFile } from '@/types'
import { FileUpload } from '@/components/upload/file-upload'
import { DataPreview } from '@/components/upload/data-preview'
import { FraudResults } from '@/components/results/fraud-results'
import { Upload, Activity, FileText, ArrowLeft, MapPin, Database } from 'lucide-react'
import Link from 'next/link'

export default function AppPage() {
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    isAnalyzing: false
  })

  const [uploadedFiles, setUploadedFiles] = useState<{
    fuel?: UploadedFile
    gps?: UploadedFile
    jobs?: UploadedFile
  }>({})

  const handleFileUpload = (type: 'fuel' | 'gps' | 'jobs', file: UploadedFile) => {
    setUploadedFiles(prev => ({
      ...prev,
      [type]: file
    }))
  }

  const handleAnalyze = async () => {
    if (!uploadedFiles.fuel) {
      alert('Please upload fuel data to proceed with analysis.')
      return
    }

    setAnalysisState(prev => ({ ...prev, isAnalyzing: true, error: undefined }))

    try {
      const response = await fetch('/api/analyze/fraud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fuel_data: uploadedFiles.fuel?.data,
          gps_data: uploadedFiles.gps?.data,
          job_data: uploadedFiles.jobs?.data,
        }),
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const results = await response.json()
      setAnalysisState(prev => ({
        ...prev,
        fraud_results: results,
        isAnalyzing: false
      }))
    } catch (error) {
      setAnalysisState(prev => ({
        ...prev,
        error: 'Analysis failed. Please try again.',
        isAnalyzing: false
      }))
    }
  }

  const hasAnyData = Object.keys(uploadedFiles).length > 0
  const hasResults = analysisState.fraud_results

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Back to Demo</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="h-4 w-4 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">FleetAudit Professional</h1>
            </div>
            <div className="w-32" /> {/* Spacer for center alignment */}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Progress Steps */}
        <Card className="mb-8 bg-white/80 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-8">
              <div className={`flex items-center space-x-3 ${hasAnyData ? 'text-green-600' : 'text-blue-600'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${hasAnyData ? 'bg-green-600' : 'bg-blue-600'} text-white shadow-lg`}>
                  <Upload className="h-5 w-5" />
                </div>
                <span className="font-semibold">Upload Data</span>
                {hasAnyData && <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">✓ Complete</span>}
              </div>
              
              <div className={`w-20 h-2 rounded-full ${hasAnyData ? 'bg-green-200' : 'bg-gray-200'}`} />
              
              <div className={`flex items-center space-x-3 ${analysisState.isAnalyzing ? 'text-blue-600' : hasResults ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${analysisState.isAnalyzing ? 'bg-blue-600' : hasResults ? 'bg-green-600' : 'bg-gray-300'} text-white shadow-lg`}>
                  <Activity className={`h-5 w-5 ${analysisState.isAnalyzing ? 'animate-spin' : ''}`} />
                </div>
                <span className="font-semibold">AI Analysis</span>
                {hasResults && <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">✓ Complete</span>}
              </div>
              
              <div className={`w-20 h-2 rounded-full ${hasResults ? 'bg-green-200' : 'bg-gray-200'}`} />
              
              <div className={`flex items-center space-x-3 ${hasResults ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${hasResults ? 'bg-green-600' : 'bg-gray-300'} text-white shadow-lg`}>
                  <FileText className="h-5 w-5" />
                </div>
                <span className="font-semibold">Results & Reports</span>
                {hasResults && <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">✓ Ready</span>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Upload Section */}
        {!hasResults && (
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <Card className="border-red-200 bg-red-50/30 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Upload className="h-4 w-4 text-red-600" />
                  </div>
                  Fuel Data <span className="text-red-500 text-sm">*Required</span>
                </CardTitle>
                <CardDescription>Upload fuel card transactions from WEX, Fleetcor, etc.</CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFileUpload={(file) => handleFileUpload('fuel', file)}
                  acceptedFileTypes=".csv,.xlsx"
                  uploadedFile={uploadedFiles.fuel}
                />
                <div className="mt-4 text-xs text-gray-500">
                  <p className="font-medium mb-1">Expected columns:</p>
                  <p>Date, Time, Vehicle, Driver, Location, Gallons, Card Number</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50/30 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-blue-600" />
                  </div>
                  GPS Data <span className="text-blue-500 text-sm">Optional</span>
                </CardTitle>
                <CardDescription>Vehicle location data from Samsara, Geotab, etc.</CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFileUpload={(file) => handleFileUpload('gps', file)}
                  acceptedFileTypes=".csv,.xlsx"
                  uploadedFile={uploadedFiles.gps}
                />
                <div className="mt-4 text-xs text-gray-500">
                  <p className="font-medium mb-1">Expected columns:</p>
                  <p>Timestamp, Vehicle ID, Latitude, Longitude</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50/30 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Database className="h-4 w-4 text-green-600" />
                  </div>
                  Job Data <span className="text-green-500 text-sm">Optional</span>
                </CardTitle>
                <CardDescription>Scheduled jobs from Jobber, ServiceTitan, etc.</CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFileUpload={(file) => handleFileUpload('jobs', file)}
                  acceptedFileTypes=".csv,.xlsx"
                  uploadedFile={uploadedFiles.jobs}
                />
                <div className="mt-4 text-xs text-gray-500">
                  <p className="font-medium mb-1">Expected columns:</p>
                  <p>Job ID, Date, Vehicle, Driver, Address</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Data Preview */}
        {hasAnyData && !hasResults && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Data Preview</CardTitle>
                <CardDescription>
                  Review your uploaded data before analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataPreview uploadedFiles={uploadedFiles} />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analysis Button */}
        {hasAnyData && !hasResults && (
          <div className="text-center mb-8">
            <Button
              size="lg"
              onClick={handleAnalyze}
              disabled={analysisState.isAnalyzing || !uploadedFiles.fuel}
              className="px-8 py-3"
            >
              {analysisState.isAnalyzing ? (
                <>
                  <Activity className="animate-spin mr-2 h-5 w-5" />
                  Analyzing Data...
                </>
              ) : (
                <>
                  <Activity className="mr-2 h-5 w-5" />
                  Start Fraud Analysis
                </>
              )}
            </Button>
          </div>
        )}

        {/* Error Message */}
        {analysisState.error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-600">
                <Upload className="h-5 w-5" />
                <span className="font-medium">Analysis Error</span>
              </div>
              <p className="text-red-700 mt-2">{analysisState.error}</p>
              <Button
                variant="outline"
                onClick={() => setAnalysisState(prev => ({ ...prev, error: undefined }))}
                className="mt-4"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {hasResults && (
          <FraudResults 
            results={analysisState.fraud_results!} 
            onStartOver={() => {
              setAnalysisState({ isAnalyzing: false })
              setUploadedFiles({})
            }}
          />
        )}
      </div>
    </div>
  )
}
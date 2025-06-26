'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AnalysisState, UploadedFile } from '@/types'
import { FileUpload } from '@/components/upload/file-upload'
import { DataPreview } from '@/components/upload/data-preview'
import { FraudResults } from '@/components/results/fraud-results'
import { Upload, Activity, FileText, ArrowLeft } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-primary">FleetAudit Analysis</h1>
            <div className="w-32" /> {/* Spacer for center alignment */}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center space-x-2 ${hasAnyData ? 'text-green-600' : 'text-primary'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${hasAnyData ? 'bg-green-600' : 'bg-primary'} text-white`}>
                <Upload className="h-4 w-4" />
              </div>
              <span className="font-medium">Upload Data</span>
            </div>
            
            <div className={`w-16 h-1 rounded ${hasAnyData ? 'bg-green-200' : 'bg-gray-200'}`} />
            
            <div className={`flex items-center space-x-2 ${analysisState.isAnalyzing ? 'text-blue-600' : hasResults ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${analysisState.isAnalyzing ? 'bg-blue-600' : hasResults ? 'bg-green-600' : 'bg-gray-300'} text-white`}>
                <Activity className="h-4 w-4" />
              </div>
              <span className="font-medium">Analyze</span>
            </div>
            
            <div className={`w-16 h-1 rounded ${hasResults ? 'bg-green-200' : 'bg-gray-200'}`} />
            
            <div className={`flex items-center space-x-2 ${hasResults ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${hasResults ? 'bg-green-600' : 'bg-gray-300'} text-white`}>
                <FileText className="h-4 w-4" />
              </div>
              <span className="font-medium">Results</span>
            </div>
          </div>
        </div>

        {/* File Upload Section */}
        {!hasResults && (
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-red-500" />
                  Fuel Data
                  <span className="text-sm text-red-500">*Required</span>
                </CardTitle>
                <CardDescription>
                  Upload fuel card transaction data (CSV format)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFileUpload={(file) => handleFileUpload('fuel', file)}
                  acceptedFileTypes=".csv,.xlsx"
                  uploadedFile={uploadedFiles.fuel}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-blue-500" />
                  GPS Data
                  <span className="text-sm text-gray-500">Optional</span>
                </CardTitle>
                <CardDescription>
                  Upload vehicle location tracking data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFileUpload={(file) => handleFileUpload('gps', file)}
                  acceptedFileTypes=".csv,.xlsx"
                  uploadedFile={uploadedFiles.gps}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-green-500" />
                  Job Data
                  <span className="text-sm text-gray-500">Optional</span>
                </CardTitle>
                <CardDescription>
                  Upload scheduled job/delivery data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFileUpload={(file) => handleFileUpload('jobs', file)}
                  acceptedFileTypes=".csv,.xlsx"
                  uploadedFile={uploadedFiles.jobs}
                />
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
              variant="fleetaudit"
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
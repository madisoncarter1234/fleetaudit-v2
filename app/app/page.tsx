'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Upload, CheckCircle, AlertCircle, FileText, Activity, Zap } from 'lucide-react'

interface UploadedFile {
  name: string;
  size: number;
  data: any[];
}

export default function AppPage() {
  const [fuelData, setFuelData] = useState<UploadedFile | null>(null)
  const [gpsData, setGpsData] = useState<UploadedFile | null>(null)
  const [jobData, setJobData] = useState<UploadedFile | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleFileUpload = async (file: File, type: 'fuel' | 'gps' | 'job') => {
    const text = await file.text()
    const rows = text.split('\n').map(row => row.split(','))
    const headers = rows[0]
    const data = rows.slice(1).filter(row => row.length === headers.length).map(row => {
      const obj: any = {}
      headers.forEach((header, index) => {
        obj[header.trim()] = row[index]?.trim()
      })
      return obj
    })

    const uploadedFile = {
      name: file.name,
      size: file.size,
      data: data
    }

    if (type === 'fuel') setFuelData(uploadedFile)
    if (type === 'gps') setGpsData(uploadedFile)
    if (type === 'job') setJobData(uploadedFile)
  }

  const FileUploadCard = ({ 
    title, 
    description, 
    required = false, 
    file, 
    onUpload, 
    icon = "📊"
  }: {
    title: string;
    description: string;
    required?: boolean;
    file: UploadedFile | null;
    onUpload: (file: File) => void;
    icon?: string;
  }) => (
    <Card className={`group hover:shadow-hover transition-all duration-300 hover-scale ${required ? 'border-primary/30 bg-gradient-to-br from-primary/5 to-blue-50/30' : 'border-border bg-card'} shadow-card`}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{icon}</div>
          <div className="flex-1">
            <CardTitle className="text-xl font-bold flex items-center gap-3 mb-2">
              {title}
              {required && (
                <span className="text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full font-semibold shadow-sm">
                  Required
                </span>
              )}
            </CardTitle>
            <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {file ? (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-green-900 text-lg">{file.name}</p>
                <p className="text-green-700 font-medium">{file.data.length} records loaded successfully</p>
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 relative group-hover:scale-[1.02]">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl mx-auto flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-foreground">Click to upload or drag and drop</p>
                <p className="text-muted-foreground">Accepts .csv, .xlsx files</p>
                <p className="text-sm text-muted-foreground">Maximum file size: 10MB</p>
              </div>
            </div>
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0]
                if (selectedFile) onUpload(selectedFile)
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all font-medium group">
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to home</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-soft">
                <span className="text-primary-foreground font-bold text-base">F</span>
              </div>
              <span className="text-2xl font-bold text-foreground">FleetAudit Professional</span>
            </div>
            
            <div className="w-32" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 rounded-full">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="font-medium">Step 1 of 3 - Data Upload</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-foreground leading-tight tracking-tight">Upload your fleet data</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Upload your data files to start the AI-powered fraud detection analysis. Fuel data is required, while GPS and job data are optional but improve accuracy.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-20">
          <div className="flex justify-center">
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-card">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${fuelData ? 'bg-gradient-primary text-primary-foreground shadow-soft' : 'bg-primary/20 text-primary border-2 border-primary/30'} transition-all duration-300`}>
                    {fuelData ? <CheckCircle className="h-5 w-5" /> : <span className="font-bold">1</span>}
                  </div>
                  <span className={`font-semibold ${fuelData ? 'text-foreground' : 'text-primary'}`}>Upload data</span>
                </div>
                
                <div className={`w-16 h-1 rounded-full ${fuelData ? 'bg-gradient-to-r from-primary to-blue-400' : 'bg-border'} transition-all duration-500`} />
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground">
                    <span className="font-bold">2</span>
                  </div>
                  <span className="font-semibold text-muted-foreground">Run analysis</span>
                </div>
                
                <div className="w-16 h-1 rounded-full bg-border" />
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground">
                    <span className="font-bold">3</span>
                  </div>
                  <span className="font-semibold text-muted-foreground">Review results</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* File Upload Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <FileUploadCard
            title="Fuel Data"
            description="Fuel card transactions with dates, amounts, and locations"
            required={true}
            file={fuelData}
            onUpload={(file) => handleFileUpload(file, 'fuel')}
            icon="⛽"
          />
          
          <FileUploadCard
            title="GPS Data"
            description="Vehicle location logs with timestamps and coordinates"
            file={gpsData}
            onUpload={(file) => handleFileUpload(file, 'gps')}
            icon="🛰️"
          />
          
          <FileUploadCard
            title="Job Data"
            description="Scheduled jobs with routes and assigned vehicles"
            file={jobData}
            onUpload={(file) => handleFileUpload(file, 'job')}
            icon="📋"
          />
        </div>

        {/* Status */}
        {fuelData && (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-900 mb-1">Ready for analysis!</h3>
                  <p className="text-green-700 font-medium">
                    Fuel data loaded with {fuelData.data.length} records. 
                    {(gpsData || jobData) && ` Plus ${gpsData ? 'GPS' : ''}${gpsData && jobData ? ' and ' : ''}${jobData ? 'job' : ''} data for enhanced accuracy.`}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Button */}
        {fuelData && (
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <button
                onClick={() => setIsAnalyzing(!isAnalyzing)}
                disabled={isAnalyzing}
                className="bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors text-lg inline-flex items-center justify-center disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <Activity className="animate-spin mr-3 h-5 w-5" />
                    Analyzing fleet data...
                  </>
                ) : (
                  <>
                    <Zap className="mr-3 h-5 w-5" />
                    Start AI fraud analysis
                  </>
                )}
              </button>
              
              {!isAnalyzing && (
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                  Our advanced AI will analyze your fleet data in under 2 minutes to identify suspicious patterns, policy violations, and potential fraud.
                </p>
              )}
            </div>
            
            {isAnalyzing && (
              <div className="max-w-xl mx-auto">
                <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-card">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto flex items-center justify-center">
                      <Activity className="h-8 w-8 text-primary-foreground animate-spin" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-foreground">Analysis in progress</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Our AI is analyzing your fleet data for suspicious patterns, policy violations, and potential fraud. This usually takes 1-2 minutes.
                      </p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-primary h-2 rounded-full animate-pulse" style={{width: '65%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
'use client'

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File, CheckCircle, X } from 'lucide-react'
import Papa from 'papaparse'
import { UploadedFile } from '@/types'
import { Button } from '@/components/ui/button'

interface FileUploadProps {
  onFileUpload: (file: UploadedFile) => void
  acceptedFileTypes: string
  uploadedFile?: UploadedFile
}

export function FileUpload({ onFileUpload, acceptedFileTypes, uploadedFile }: FileUploadProps) {
  const processCSV = (file: File): Promise<UploadedFile> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error('CSV parsing failed'))
            return
          }

          const processedFile: UploadedFile = {
            name: file.name,
            size: file.size,
            type: file.type,
            data: results.data as any[],
            preview: results.data.slice(0, 5) as any[]
          }

          resolve(processedFile)
        },
        error: (error) => {
          reject(error)
        }
      })
    })
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    try {
      if (file.name.endsWith('.csv')) {
        const processedFile = await processCSV(file)
        onFileUpload(processedFile)
      } else {
        // For XLSX files, we'll just store the basic info for now
        // In a real implementation, you'd use a library like xlsx to parse
        const basicFile: UploadedFile = {
          name: file.name,
          size: file.size,
          type: file.type,
          data: [],
          preview: []
        }
        onFileUpload(basicFile)
      }
    } catch (error) {
      console.error('File processing error:', error)
      alert('Error processing file. Please check the format and try again.')
    }
  }, [onFileUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxFiles: 1
  })

  const removeFile = () => {
    // Reset by calling onFileUpload with empty data
    onFileUpload({
      name: '',
      size: 0,
      type: '',
      data: [],
      preview: []
    })
  }

  if (uploadedFile && uploadedFile.name) {
    return (
      <div className="border-2 border-green-200 border-dashed rounded-lg p-6 bg-green-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <p className="font-medium text-green-800">{uploadedFile.name}</p>
              <p className="text-sm text-green-600">
                {Math.round(uploadedFile.size / 1024)} KB • {uploadedFile.data.length} rows
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="text-green-600 hover:text-green-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        isDragActive
          ? 'border-primary bg-primary/5'
          : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-3" />
      {isDragActive ? (
        <p className="text-primary font-medium">Drop the file here...</p>
      ) : (
        <div>
          <p className="text-gray-600 mb-2">
            <span className="font-medium">Click to upload</span> or drag and drop
          </p>
          <p className="text-sm text-gray-500">
            Supports: {acceptedFileTypes.replace(/\./g, '').toUpperCase()}
          </p>
        </div>
      )}
    </div>
  )
}
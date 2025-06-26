'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UploadedFile } from '@/types'
import { FileText, Database, MapPin } from 'lucide-react'

interface DataPreviewProps {
  uploadedFiles: {
    fuel?: UploadedFile
    gps?: UploadedFile
    jobs?: UploadedFile
  }
}

export function DataPreview({ uploadedFiles }: DataPreviewProps) {
  const renderPreviewTable = (data: any[], title: string, icon: React.ReactNode) => {
    if (!data || data.length === 0) return null

    const columns = Object.keys(data[0] || {})
    const previewData = data.slice(0, 3)

    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          {icon}
          <h4 className="font-medium">{title}</h4>
          <span className="text-sm text-gray-500">({data.length} rows)</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                {columns.slice(0, 6).map((column) => (
                  <th key={column} className="px-3 py-2 text-left font-medium text-gray-600">
                    {column}
                  </th>
                ))}
                {columns.length > 6 && (
                  <th className="px-3 py-2 text-left font-medium text-gray-600">
                    ... +{columns.length - 6} more
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {previewData.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  {columns.slice(0, 6).map((column) => (
                    <td key={column} className="px-3 py-2 text-gray-700">
                      {String(row[column] || '').substring(0, 30)}
                      {String(row[column] || '').length > 30 && '...'}
                    </td>
                  ))}
                  {columns.length > 6 && (
                    <td className="px-3 py-2 text-gray-400">...</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {data.length > 3 && (
          <p className="text-sm text-gray-500 mt-2">
            Showing 3 of {data.length} rows
          </p>
        )}
      </div>
    )
  }

  const hasAnyData = (uploadedFiles.fuel?.data.length || 0) > 0 || 
                     (uploadedFiles.gps?.data.length || 0) > 0 || 
                     (uploadedFiles.jobs?.data.length || 0) > 0

  if (!hasAnyData) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Database className="mx-auto h-12 w-12 mb-3 text-gray-300" />
        <p>Upload files to see data preview</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {(uploadedFiles.fuel?.data.length || 0) > 0 && renderPreviewTable(
        uploadedFiles.fuel!.data,
        'Fuel Data Preview',
        <FileText className="h-4 w-4 text-red-500" />
      )}
      
      {(uploadedFiles.gps?.data.length || 0) > 0 && renderPreviewTable(
        uploadedFiles.gps!.data,
        'GPS Data Preview',
        <MapPin className="h-4 w-4 text-blue-500" />
      )}
      
      {(uploadedFiles.jobs?.data.length || 0) > 0 && renderPreviewTable(
        uploadedFiles.jobs!.data,
        'Job Data Preview',
        <Database className="h-4 w-4 text-green-500" />
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">Data Processing Notes:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Column names will be automatically mapped to standard format</li>
          <li>• Date and time columns will be combined into timestamps</li>
          <li>• Card numbers will be masked, showing only last 4 digits</li>
          <li>• Invalid rows will be filtered out during analysis</li>
        </ul>
      </div>
    </div>
  )
}
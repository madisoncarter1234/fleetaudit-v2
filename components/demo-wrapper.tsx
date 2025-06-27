'use client'

import dynamic from 'next/dynamic'

const DemoAnalysis = dynamic(() => import('./demo-analysis').then(mod => ({ default: mod.DemoAnalysis })), { 
  ssr: false,
  loading: () => <div className="text-center py-8 text-gray-600">Loading demo...</div>
})

export function DemoWrapper() {
  return <DemoAnalysis />
}
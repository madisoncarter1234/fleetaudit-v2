import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FleetAudit.io - AI-Powered Fleet Fraud Detection',
  description: 'Advanced fleet fraud detection using AI to analyze fuel, GPS, and job data for theft and policy violations.',
  keywords: 'fleet management, fraud detection, AI, fuel theft, GPS tracking, fleet analytics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
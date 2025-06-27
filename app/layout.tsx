import type { Metadata } from 'next'
import './globals.css'

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
      <body suppressHydrationWarning={true} className="antialiased">
        <div className="min-h-screen bg-background text-foreground">
          {children}
        </div>
      </body>
    </html>
  )
}
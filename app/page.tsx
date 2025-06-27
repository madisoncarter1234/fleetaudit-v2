import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Upload, Zap, FileText, CheckCircle } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/95 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-soft">
                <span className="text-primary-foreground font-bold text-base">F</span>
              </div>
              <span className="text-2xl font-bold text-foreground">FleetAudit</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#demo" className="text-muted-foreground hover:text-foreground transition-all font-medium">Demo</a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-all font-medium">How it works</a>
              <Button className="bg-gradient-primary hover:shadow-lg transition-all hover-lift font-semibold" asChild>
                <Link href="/app">Get Started</Link>
              </Button>
            </nav>
            
            <Button className="md:hidden bg-gradient-primary" asChild>
              <Link href="/app">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-accent border border-border rounded-full text-sm font-medium text-accent-foreground mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                AI-Powered Fleet Protection
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
                Stop fleet fraud before it 
                <span className="bg-gradient-primary bg-clip-text text-transparent"> costs millions</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
                AI-powered fraud detection analyzes fuel, GPS, and job data to identify theft and policy violations in under 2 minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button size="lg" className="px-10 py-4 text-lg bg-gradient-primary hover:shadow-hover transition-all hover-lift font-semibold" asChild>
                  <Link href="/app">
                    Start free analysis <ArrowRight className="ml-3 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="px-10 py-4 text-lg border-2 hover:bg-accent transition-all hover-lift font-semibold">
                  <span className="mr-3">▶</span> Watch demo
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-8 lg:gap-12 pt-12">
                <div className="flex items-center gap-3 bg-card/60 backdrop-blur-sm px-4 py-3 rounded-full border border-border/50 shadow-soft">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-card-foreground">No setup required</span>
                </div>
                <div className="flex items-center gap-3 bg-card/60 backdrop-blur-sm px-4 py-3 rounded-full border border-border/50 shadow-soft">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-card-foreground">Results in 2 minutes</span>
                </div>
                <div className="flex items-center gap-3 bg-card/60 backdrop-blur-sm px-4 py-3 rounded-full border border-border/50 shadow-soft">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-card-foreground">Enterprise secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">How it works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Three simple steps to detect fraud in your fleet and protect your business
            </p>
          </div>
          
          <div className="relative">
            {/* Connection lines */}
            <div className="hidden md:block absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
              <div className="flex justify-between items-center px-20">
                <div className="w-32 h-0.5 bg-gradient-to-r from-primary to-blue-400"></div>
                <div className="w-32 h-0.5 bg-gradient-to-r from-blue-400 to-primary"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
              <div className="group text-center space-y-6 hover-scale transition-all duration-500">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-primary rounded-2xl shadow-card border border-border/20 mx-auto flex items-center justify-center group-hover:shadow-hover transition-all duration-500">
                    <Upload className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground tracking-tight">Upload your data</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">Import fuel transactions, GPS logs, and job schedules in CSV format with our secure upload system</p>
                </div>
              </div>
              
              <div className="group text-center space-y-6 hover-scale transition-all duration-500">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-primary rounded-2xl shadow-card border border-border/20 mx-auto flex items-center justify-center group-hover:shadow-hover transition-all duration-500">
                    <Zap className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground tracking-tight">AI analysis</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">Our advanced AI cross-references your data to identify suspicious patterns and policy violations</p>
                </div>
              </div>
              
              <div className="group text-center space-y-6 hover-scale transition-all duration-500">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-primary rounded-2xl shadow-card border border-border/20 mx-auto flex items-center justify-center group-hover:shadow-hover transition-all duration-500">
                    <FileText className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground tracking-tight">Get results</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">Receive detailed reports with violation details and accurate financial impact estimates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl md:text-5xl font-bold">Trusted by fleet managers worldwide</h2>
            <p className="text-slate-300 text-xl max-w-2xl mx-auto">Real results from real companies protecting their fleets with FleetAudit</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center space-y-4 group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">$2.3M+</div>
                <div className="text-slate-300 font-medium text-lg">Fraud detected</div>
              </div>
            </div>
            <div className="text-center space-y-4 group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">15,000+</div>
                <div className="text-slate-300 font-medium text-lg">Vehicles protected</div>
              </div>
            </div>
            <div className="text-center space-y-4 group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">850+</div>
                <div className="text-slate-300 font-medium text-lg">Companies</div>
              </div>
            </div>
            <div className="text-center space-y-4 group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">98.7%</div>
                <div className="text-slate-300 font-medium text-lg">Accuracy rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                Ready to protect your fleet?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Join hundreds of fleet managers who trust FleetAudit to safeguard their operations and save millions in potential losses
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-10 py-4 text-lg bg-gradient-primary hover:shadow-hover transition-all hover-lift font-semibold" asChild>
                <Link href="/app">
                  Start free analysis <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-10 py-4 text-lg border-2 hover:bg-accent transition-all hover-lift font-semibold">
                Schedule demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold text-foreground">FleetAudit</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-muted-foreground">© 2024 FleetAudit.io • Built with Claude AI</p>
              <p className="text-sm text-muted-foreground mt-1">Protecting fleets worldwide with AI-powered fraud detection</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
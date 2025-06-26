# FleetAudit.io v2 - Next.js Migration

## 🎯 Overview

FleetAudit.io v2 is a complete Next.js migration of the Streamlit-based fleet fraud detection platform. It provides AI-powered analysis of fuel, GPS, and job data to uncover theft, misuse, and policy violations.

## 🚀 Features

- **AI-Powered Fraud Detection** - Claude Haiku integration with exact prompts from original system
- **Interactive Demo Scenarios** - 3 pre-built scenarios (ABC Logistics, Metro Delivery, Clean Fleet Co)
- **File Upload System** - Support for fuel, GPS, and job CSV files
- **Real-time Analysis** - Professional violation display with severity levels
- **PDF Report Generation** - Downloadable reports with detailed findings
- **Responsive Design** - Mobile-friendly interface with FleetAudit styling

## 🔧 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: Next.js API Routes
- **AI Integration**: Anthropic Claude API
- **File Processing**: PapaParse for CSV handling
- **PDF Generation**: jsPDF with autotable
- **UI Components**: Radix UI, Lucide React

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd fleetv2

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Add your Anthropic API key to .env.local
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

## 🏃‍♂️ Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🌐 Environment Variables

Create `.env.local` file with:

```bash
# Required
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_ENV=development
```

## 📂 Project Structure

```
fleetv2/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── app/page.tsx       # Main application
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   └── api/               # API routes
│       ├── analyze/fraud/ # Claude AI analysis
│       └── reports/       # PDF generation
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── upload/           # File upload system
│   ├── results/          # Results display
│   └── demo/             # Demo components
├── lib/                  # Utilities
│   ├── utils.ts          # Helper functions
│   ├── demo-data.ts      # Demo scenarios
│   └── data-processing.ts # CSV processing
├── types/                # TypeScript definitions
└── public/               # Static assets
```

## 🔍 Fraud Detection Features

### Detection Types
1. **Shared Card Use** - Same fuel card used by multiple drivers within 60 minutes
2. **After-Hours Fuel** - Purchases outside business hours (7AM-6PM)
3. **Ghost Jobs** - Scheduled jobs with no GPS activity at location
4. **Excessive Fuel** - Amounts exceeding vehicle capacity (>25 gal vans, >50 gal trucks)
5. **Rapid Consecutive Purchases** - Multiple fills within 2 hours
6. **Personal Use** - Weekend/holiday activity in residential areas

### File Upload Support
- **Fuel Data**: Transaction records from WEX, Fleetcor, etc.
- **GPS Data**: Vehicle tracking from Samsara, Geotab, etc.
- **Job Data**: Scheduled deliveries from Jobber, ServiceTitan, etc.

## 📋 Demo Scenarios

### 1. ABC Logistics (High Fraud)
- 12 vehicles, 4 violations, $551.75 estimated loss
- Includes shared card use, after-hours fuel, excessive amounts, ghost jobs

### 2. Metro Delivery (Medium Fraud)  
- 6 vehicles, 2 violations, $162.75 estimated loss
- Rapid purchases and personal use violations

### 3. Clean Fleet Co (Low Fraud)
- 8 vehicles, 1 violation, $12.50 estimated loss
- Minor policy deviation

## 🚀 Deployment

### One-Click Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/madisoncarter1234/fleetaudit-v2&env=ANTHROPIC_API_KEY&envDescription=Your%20Anthropic%20Claude%20API%20Key&envLink=https://console.anthropic.com/)

### Manual Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Add ANTHROPIC_API_KEY
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Setup
1. Get Anthropic API key from https://console.anthropic.com/
2. Add to environment variables
3. Deploy to your preferred platform

## 🔒 Security

- API keys protected in server-side routes
- File upload validation and sanitization
- Environment variables for sensitive data
- HTTPS enforcement in production

## 🧪 Testing

```bash
# Test with sample CSV files
# Upload test data from original Streamlit app
# Verify exact violation detection matches

# Demo scenarios should produce:
# - ABC Logistics: 4 violations, $551.75 loss
# - Metro Delivery: 2 violations, $162.75 loss  
# - Clean Fleet Co: 1 violation, $12.50 loss
```

## 📄 CSV Format Requirements

### Fuel Data
Required columns (flexible naming):
- Date/Transaction Date
- Time/Transaction Time (optional if combined with date)
- Vehicle/Vehicle Number/Vehicle ID
- Driver Name
- Location/Site Name/Merchant Name
- Gallons/Fuel Quantity
- Card Number/Card Last 4 (for fraud detection)
- Amount/Total Cost (optional)

### GPS Data
Required columns:
- Date/Timestamp
- Vehicle ID
- Latitude
- Longitude
- Location (optional)

### Job Data
Required columns:
- Job ID
- Scheduled Time/Date
- Vehicle ID
- Driver Name
- Address/Location

## 🎨 Styling

FleetAudit color scheme:
- Primary: #1f4e79
- Secondary: #2d5aa0  
- Accent: #3d6bb5
- High Risk: #e53e3e
- Medium Risk: #dd6b20
- Low Risk: #ecc94b

## 📞 Support

For issues and feedback, visit: https://github.com/anthropics/claude-code/issues

## 📄 License

This project maintains the same license as the original FleetAudit.io system.
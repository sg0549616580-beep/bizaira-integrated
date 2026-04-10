# Bizaira Integrated - Full Stack Application

A complete AI-powered creative studio application for generating marketing content, product photos, and business insights.

## 📁 Project Structure

```
bizaira-integrated/
├── src/
│   ├── App.tsx                 # Main app router
│   ├── main.tsx                # React entry point
│   ├── index.css               # Global styles
│   ├── components/
│   │   ├── AppLayout.tsx       # Main app shell with navigation
│   │   ├── AIWizard.tsx        # Reusable multi-step AI wizard component
│   │   ├── AuthSection.tsx     # Authentication form
│   │   ├── BottomNav.tsx       # Mobile bottom navigation
│   │   ├── CookieSettings.tsx  # Cookie preferences popup
│   │   ├── CookieConsentPopup.tsx # Cookie consent banner
│   │   ├── OnboardingFlow.tsx  # Onboarding screens
│   │   ├── SparkleIcon.tsx     # Branded icon component
│   │   └── ui/                 # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── textarea.tsx
│   │       ├── checkbox.tsx
│   │       └── [other components]
│   ├── pages/
│   │   ├── LandingPage.tsx     # Landing/home page
│   │   ├── AuthPage.tsx        # Authentication page
│   │   ├── CreatePage.tsx      # Tool selection hub
│   │   ├── ProductPhotoStudioPage.tsx  # Product photo generator
│   │   ├── AIMessagesPage.tsx  # Marketing message creator
│   │   ├── BusinessAnalyticsPage.tsx   # Analytics tool
│   │   ├── TimeOptimizerPage.tsx       # Schedule optimizer
│   │   ├── PricingPage.tsx     # Pricing info
│   │   ├── DashboardPage.tsx   # User dashboard
│   │   ├── SupportPage.tsx     # Help & support
│   │   ├── AccessibilityStatement.tsx  # Accessibility info
│   │   ├── JournalPage.tsx     # Note taking
│   │   ├── NotFound.tsx        # 404 page
│   ├── hooks/
│   │   ├── useAuth.tsx         # Authentication state
│   │   ├── use-mobile.tsx      # Mobile breakpoint detection
│   │   ├── use-toast.ts        # Toast notifications
│   │   └── useSmartMemory.tsx  # State management utility
│   ├── lib/
│   │   ├── ai-service.ts       # AI API client (generate text & images)
│   │   ├── i18n.tsx            # Internationalization (EN/HE)
│   │   └── utils.ts            # Utility functions
│   ├── integrations/
│   │   └── supabase/
│   │       └── client.ts       # Supabase auth client (stub)
│   └── assets/                 # Images and media
├── server/
│   ├── index.ts                # Express server
│   └── db.ts                   # Database setup (Drizzle ORM)
├── shared/
│   └── schema.ts               # Shared database schema
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── [other static files]
├── index.html                  # HTML entry
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript config
├── package.json                # Dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Technology Stack

- **Frontend**: React 18, React Router 6, TypeScript
- **Server**: Express, Node.js
- **Database**: PostgreSQL + Drizzle ORM
- **Build**: Vite
- **Styling**: Tailwind CSS (via utility classes)
- **Icons**: Lucide React
- **Internationalization**: Custom I18n (English/Hebrew)

## 📱 Pages & Features

### Core Pages
- **Landing** (`/`) - Hero landing with auth/onboarding
- **Create Hub** (`/create`) - Tool selection dashboard
- **Dashboard** (`/dashboard`) - User stats and usage
- **Pricing** (`/pricing`) - Subscription plans
- **Support** (`/support`) - Help center

### AI Tools (using AIWizard component)
- **Product Photo Studio** - Generate product images
- **AI Messages** - Create marketing copy
- **Business Analytics** - Analyze metrics
- **Time Optimizer** - Schedule management
- **Journal** - Note-taking

### Info Pages
- **Accessibility Statement** - WCAG compliance info
- **Auth** - Login/signup page
- **404 NotFound** - Error page

## 🎨 Key Components

### AIWizard
Multi-step wizard component for AI features:
- Question types: select, text, textarea, upload, chips
- Result display: text, preview, gallery
- Download functionality
- Error handling

### AppLayout
Main app container with:
- Mobile hamburger menu
- Language toggle (EN/HE)
- Bottom navigation (mobile)
- Footer with accessibility & cookie links
- Cookie settings popup

## 🌐 API Endpoints

### Server (port 3000)
- `POST /api/generate-text` - Generate text using AI
- `POST /api/generate-image` - Generate images using AI
- `/` - Serve SPA static files

## 🔌 Environment Variables

```env
DATABASE_URL=postgresql://...
AI_API_KEY=your_api_key_here
PORT=3000
```

## 🗂️ Data Flow

1. **Frontend** sends user input via React components
2. **AIWizard** collects answers across multiple steps
3. **AI Service client** calls backend APIs
4. **Express server** validates and forwards to AI gateway
5. **AI Gateway** (Lovable.dev) processes requests
6. **Results** returned and displayed in component

## 🎯 Routing Structure

```
/
├── /auth
├── /create
│   ├── /product-photos
│   ├── /messages
│   ├── /analytics
│   └── /time
├── /pricing
├── /dashboard
├── /journal
├── /support
├── /accessibility
└── [404]
```

## 🌍 Internationalization

Support for English and Hebrew (RTL):
- Language toggle in top-left corner
- All UI text translated in i18n.tsx
- RTL layout support via dir attribute

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Output in /dist
# Deploy dist folder to CDN/hosting
# Run server separately: npm start
```

## ✨ Features Implemented

✅ Complete routing structure  
✅ Multi-step AI wizard form component  
✅ Mobile-responsive navigation  
✅ English/Hebrew language support  
✅ AI text & image generation (via backend)  
✅ Authentication framework  
✅ Dashboard with stats  
✅ Pricing page  
✅ Accessibility statement  
✅ Cookie consent & settings  
✅ 404 error page  

## 🔄 Next Steps

1. Connect real authentication (Supabase)
2. Set up PostgreSQL database
3. Configure AI API gateway credentials
4. Implement user creation history storage
5. Add analytics tracking
6. Deploy to production

## 📝 Development Notes

- All components use TypeScript
- Tailwind utility classes for styling
- Mobile-first responsive design
- Mock data for development mode
- Error boundaries recommended for production
- Add error logging service
- Implement SEO optimization

## 📄 License

MIT

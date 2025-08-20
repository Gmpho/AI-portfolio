# AI-portfolio
AI Powered portfolio 


AI-portfolio/
├── .github/workflows/
│   └── deploy.yml                 # GitHub Actions CI/CD for Cloudflare
├── app/                          # Next.js App Router
│   ├── api/
│   │   ├── chat/route.ts
│   │   ├── pinecone/route.ts
│   │   ├── notion/route.ts
│   │   └── ollama/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── components/               # Next.js components
│       ├── ui/                  # ShadCN UI components
│       ├── chatbot/
│       ├── projects/
│       └── layout/
├── src/
│   ├── components/               # Reusable React Components
│   │   ├── ChatBot/              # AI Chatbot System
│   │   │   ├── ChatBot.tsx
│   │   │   ├── Message.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   └── index.ts
│   │   ├── ProjectCard/          # Project Display
│   │   │   ├── ProjectCard.tsx
│   │   │   └── index.ts
│   │   ├── ThemeToggle/          # Dark/Light Theme
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── index.ts
│   │   ├── Layout/               # Page Layout
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MainLayout.tsx
│   │   └── ResumeUpload/         # PDF Processing
│   │       ├── ResumeUpload.tsx
│   │       └── index.ts
│   ├── services/                 # External API Integrations
│   │   ├── openaiService.ts      # OpenAI Integration
│   │   ├── notionService.ts      # Notion API Integration
│   │   ├── pineconeService.ts    # Vector Database
│   │   ├── ollamaService.ts      # Local AI Fallback
│   │   └── resumeParser.ts       # PDF Resume Analysis
│   ├── hooks/                    # Custom React Hooks
│   │   ├── useChat.ts           # Chat State Management
│   │   ├── useTheme.ts          # Theme Management
│   │   ├── useLocalStorage.ts   # Browser Storage
│   │   ├── useAI.ts             # AI Service Integration
│   │   └── useResumeAnalysis.ts # PDF Processing
│   ├── types/                   # TypeScript Definitions
│   │   ├── chat.d.ts            # Chat System Types
│   │   ├── project.d.ts         # Project Data Types
│   │   ├── ai.d.ts              # AI Service Types
│   │   ├── resume.d.ts          # Resume Analysis Types
│   │   └── index.ts             # Barrel Export
│   ├── utils/                   # Utility Functions
│   │   ├── aiLearning.ts        # Self-Learning Algorithms
│   │   ├── resumeAnalyzer.ts    # Resume Processing
│   │   ├── skillExtractor.ts    # Skill Identification
│   │   ├── storage.ts           # Data Persistence
│   │   └── helpers.ts           # General Utilities
│   ├── config/                  # Application Configuration
│   │   ├── aiConfig.ts          # AI Service Settings
│   │   └── constants.ts         # App Constants
│   ├── data/                    # Static Data
│   │   ├── projects.ts          # Project Data
│   │   └── jobs.ts              # Job Market Data
│   ├── styles/                  # Global Styles
│   │   ├── globals.css          # Tailwind Imports
│   │   └── themes.css           # Theme Variables
│   └── lib/                     # Library code
│       ├── utils.ts
│       └── validators.ts
├── public/                      # Static files
│   ├── favicon.ico
│   ├── svg/                     # SVG assets
│   └── resumes/                 # Sample resume PDFs
├── scripts/                     # Build/Setup Scripts
│   ├── setup-ai.js              # AI Service Setup
│   ├── test-ai.js               # Service Testing
│   └── deploy-check.js          # Pre-deploy Validation
├── docs/                        # Documentation
│   ├── ARCHITECTURE.md          # Technical Architecture
│   ├── API.md                   # API Documentation
│   └── DEPLOYMENT.md            # Deployment Guide
├── tests/                       # Test Files
│   ├── unit/                    # Unit Tests
│   ├── integration/             # Integration Tests
│   └── e2e/                     # End-to-End Tests
├── package.json                 # Dependencies & Scripts
├── tsconfig.json               # TypeScript Configuration
├── next.config.js              # Next.js Configuration
├── tailwind.config.js          # Tailwind CSS Config
├── postcss.config.js           # PostCSS Configuration
├── .env.example                # Environment Template
├── .gitignore                  # Git Ignore Rules
└── README.md                   # Project Overview

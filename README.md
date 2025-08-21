# AI-Powered Portfolio - Complete Project Documentation

## Project Identity
- **Repository**: https://github.com/Gmpho/AI-portfolio.git
- **Owner**: Gmpho
- **Status**: Active Development
- **Live URL**: https://gmpho.github.io/AI-portfolio/
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + ShadCN UI
- **Deployment**: Cloudflare Pages/Workers

## Project Vision
Create an AI-powered portfolio with a self-learning career coach chatbot that helps visitors explore projects and receive personalized career guidance through intelligent conversations that adapt and learn from each interaction.

## Technical Architecture
### Core Technology Stack
```yaml
Frontend:
  Framework: Next.js 14+ with App Router
  Language: TypeScript (strict mode)
  Styling: Tailwind CSS + ShadCN UI components
  Build Tool: Next.js built-in with Turbopack

AI Services:
  Primary: OpenAI GPT-4
  Secondary: Ollama (Local/Offline)
  Database: Pinecone Vector Database
  CMS: Notion API
  PDF Processing: PDF.js
  Orchestration: LangChain Agent Executor

Deployment:
  Platform: Cloudflare Pages/Workers
  CI/CD: GitHub Actions
  Monitoring: Sentry

Development:
  Package Manager: npm
  Linting: ESLint
  Formatting: Prettier
  Testing: Jest + React Testing Library
```

## Key Features
- AI-powered career coach chatbot
- Self-learning capabilities
- Project showcase
- Integration with OpenAI, Ollama, Pinecone, Notion
- ShadCN UI components
- LangChain Agent Executor
- Robust DevSecOps & Observability (Sentry, Guardrails, Feature Flags)
- CI/CD with GitHub Actions and Cloudflare Pages

## Setup and Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Gmpho/AI-portfolio.git
    cd AI-portfolio
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure environment variables:**
    Create a `.env.local` file in the root directory and add the following (replace `...` with your actual keys):
    ```
    NEXT_PUBLIC_OPENAI_API_KEY=...
    NEXT_PUBLIC_NOTION_API_KEY=...
    NEXT_PUBLIC_NOTION_DATABASE_ID=...
    NEXT_PUBLIC_PINECONE_API_KEY=...
    NEXT_PUBLIC_PINECONE_ENVIRONMENT=...
    NEXT_PUBLIC_PINECONE_INDEX=...
    NEXT_PUBLIC_FEATURE_ENABLE_OLLAMA_FALLBACK=true # Set to false to disable Ollama fallback
    ```
    *Note: For production deployment, these secrets should be configured in your CI/CD environment (e.g., GitHub Secrets, Cloudflare Workers environment variables).* 

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## Development Workflow
-   **Local Development:**
    -   `npm run dev`: Start development server with hot reload.
    -   `npm run type-check`: Run type checking.
    -   `npm run lint`: Run linting.
    -   `npm run build`: Build for production.
    -   `npm run start`: Start production server locally.
-   **Testing:**
    -   `npm run test`: Run unit tests.
    -   `npm run test:watch`: Run tests with watch mode.
    -   `npm run test:coverage`: Generate coverage report.
    -   `npm run test:ai`: Test AI services.

## Deployment
The project is configured for continuous deployment to Cloudflare Pages via GitHub Actions.
The workflow is defined in `.github/workflows/deploy.yml`.

## DevSecOps & Observability
-   **Sentry Integration:** For application monitoring and error tracking.
-   **Guardrails:** Implemented for content moderation, input validation, response filtering, and rate limiting.
-   **Feature Flags:** For toggling AI services (e.g., Ollama fallback).
-   **Circuit Breakers:** For API failure handling.
-   **Compliance:** Consideration for OWASP, SOC2, and GDPR standards.

## Future Enhancements
- Voice interface for chatbot
- Multi-language support
- Advanced analytics dashboard
- Integration with job platforms (LinkedIn, Indeed)
- Real-time collaboration features
- Progressive Web App (PWA) capabilities
- Advanced resume builder with AI suggestions

## Complete Folder Structure
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
# Project Overview

This directory is the root of an "AI Powered portfolio" project. Currently, it contains basic project documentation and serves as a starting point for the project.

## Key Files

*   `README.md`: Provides a very brief overview of the project, stating it's an "AI Powered portfolio".
*   `GEMINI.md`: This file serves as instructional context for future interactions with the Gemini AI agent.

## Usage

This directory is intended to house the files and code for an AI-powered portfolio. It is currently set up as a foundational directory for the project.

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

## Project Documentation
*   [Project Documentation Structure (2025 Best Practices)](./Project%20Documentation%20Structure%20(2025%20Best%20Practices).pdf)

## Complete Folder Structure 📁

```
AI-portfolio/ 🚀
├── .github/workflows/ ⚙️
│   └── deploy.yml                 # GitHub Actions CI/CD for Cloudflare Pages 🚀
├── app/                          # Next.js App Router (Pages & Layouts) 🌐
│   ├── api/                      # API Routes for Backend Logic ⚡
│   │   ├── chat/route.ts         # Chatbot API Endpoint 💬
│   │   ├── pinecone/route.ts     # Pinecone API Endpoint 🌲
│   │   ├── notion/route.ts       # Notion API Endpoint 📝
│   │   └── ollama/route.ts       # Ollama API Endpoint (Local LLM) 🤖
│   ├── globals.css               # Global Styles (Tailwind CSS Base) 🎨
│   ├── layout.tsx                # Root Layout for the Application 🖼️
│   ├── page.tsx                  # Home Page Component 🏠
│   └── components/               # Next.js Specific Components (UI, Chatbot, Projects, Layout) 🧩
│       ├── ui/                  # ShadCN UI Components (Generated) ✨
│       ├── chatbot/             # Chatbot UI Components 💬
│       ├── projects/            # Project Display Components 📊
│       └── layout/              # Layout Specific Components (e.g., Navbar, Footer) 📐
├── src/                          # Source Code (Core Logic & Reusable Modules) 💻
│   ├── components/               # Reusable React Components ⚛️
│   │   ├── ChatBot/              # AI Chatbot System Components 🤖
│   │   │   ├── ChatBot.tsx       # Main Chatbot UI Component 💬
│   │   │   ├── Message.tsx       # Individual Chat Message Display ✉️
│   │   │   ├── ChatInput.tsx     # User Input Field for Chat ⌨️
│   │   │   └── index.ts          # Barrel Export for ChatBot Components 📦
│   │   ├── ProjectCard/          # Project Display Card Component 🖼️
│   │   │   ├── ProjectCard.tsx   # Individual Project Card UI 📊
│   │   │   └── index.ts          # Barrel Export for ProjectCard Components 📦
│   │   ├── ThemeToggle/          # Dark/Light Theme Toggler 🌓
│   │   │   ├── ThemeToggle.tsx   # Theme Toggle UI 💡
│   │   │   └── index.ts          # Barrel Export for ThemeToggle 📦
│   │   ├── Layout/               # Page Layout Components 📐
│   │   │   ├── Header.tsx        # Application Header ⬆️
│   │   │   ├── Footer.tsx        # Application Footer ⬇️
│   │   │   └── MainLayout.tsx    # Main Layout Structure 🌐
│   │   └── ResumeUpload/         # PDF Processing & Upload 📄
│   │       ├── ResumeUpload.tsx  # Resume Upload UI ⬆️
│   │       └── index.ts          # Barrel Export for ResumeUpload 📦
│   ├── services/                 # External API Integrations & Business Logic 🔗
│   │   ├── openaiService.ts      # OpenAI Integration (Chat, Embeddings, Moderation) 🧠
│   │   ├── notionService.ts      # Notion API Integration (CMS) 📝
│   │   ├── pineconeService.ts    # Vector Database Integration 🌲
│   │   ├── ollamaService.ts      # Local AI Fallback Integration 🤖
│   │   └── resumeParser.ts       # PDF Resume Analysis Logic 📄
│   ├── hooks/                    # Custom React Hooks (Reusable Logic) 🎣
│   │   ├── useChat.ts           # Chat State Management Hook 💬
│   │   ├── useTheme.ts          # Theme Management Hook 🌓
│   │   ├── useLocalStorage.ts   # Browser Storage Hook 💾
│   │   ├── useAI.ts             # AI Service Integration Hook 🧠
│   │   └── useResumeAnalysis.ts # PDF Processing Hook 📄
│   ├── types/                   # TypeScript Definitions & Interfaces 🧩
│   │   ├── chat.d.ts            # Chat System Types (Messages, UserProfile) 💬
│   │   ├── project.d.ts         # Project Data Types 📊
│   │   ├── ai.d.ts              # AI Service Types (LearningEngine, AIResponse) 🧠
│   │   ├── resume.d.ts          # Resume Analysis Types 📄
│   │   └── index.ts             # Barrel Export for Types 📦
│   ├── utils/                   # Utility Functions (Helpers, Algorithms) 🛠️
│   │   ├── aiLearning.ts        # Self-Learning Algorithms 🧠
│   │   ├── resumeAnalyzer.ts    # Resume Processing Utilities 📄
│   │   ├── skillExtractor.ts    # Skill Identification Logic 💡
│   │   ├── storage.ts           # Data Persistence Utilities 💾
│   │   └── helpers.ts           # General Utility Functions ✨
│   ├── config/                  # Application Configuration ⚙️
│   │   ├── aiConfig.ts          # AI Service Settings 🧠
│   │   └── constants.ts         # App Constants  ثابت
│   ├── data/                    # Static Data (e.g., Project Data, Job Market) 📊
│   │   ├── projects.ts          # Project Data 📂
│   │   └── jobs.ts              # Job Market Data 💼
│   ├── styles/                  # Global Styles & Theme Variables 🎨
│   │   ├── globals.css          # Tailwind Imports & Base Styles 🌈
│   │   └── themes.css           # Theme Variables 💡
│   └── lib/                     # Library Code (General Purpose) 📚
│       ├── utils.ts             # General Utilities 🛠️
│       └── validators.ts        # Validation Functions ✅
├── public/                      # Static Assets (Images, Fonts, Resumes) 🖼️
│   ├── favicon.ico              # Website Favicon ❤️
│   ├── svg/                     # SVG Assets 📐
│   └── resumes/                 # Sample Resume PDFs 📄
├── scripts/                     # Build & Setup Scripts 📜
│   ├── setup-ai.js              # AI Service Setup Script ⚙️
│   ├── test-ai.js               # AI Service Testing Script ✅
│   └── deploy-check.js          # Pre-deployment Validation Script 🚀
├── docs/                        # Project Documentation 📝
│   ├── ARCHITECTURE.md          # Technical Architecture Overview 🏗️
│   ├── API.md                   # API Documentation 🔗
│   └── DEPLOYMENT.md            # Deployment Guide 🚀
├── tests/                       # Test Files (Unit, Integration, E2E) ✅
│   ├── unit/                    # Unit Tests 🧪
│   ├── integration/             # Integration Tests 🔗
│   └── e2e/                     # End-to-End Tests 🌐
├── package.json                 # Dependencies & Scripts 📦
├── tsconfig.json               # TypeScript Configuration ⚙️
├── next.config.js              # Next.js Configuration ⚙️
├── tailwind.config.js          # Tailwind CSS Configuration 🎨
├── postcss.config.js           # PostCSS Configuration 🎨
├── .env.example                # Environment Template 🔑
├── .gitignore                  # Git Ignore Rules 🚫
└── README.md                   # Project Overview & Documentation 📖

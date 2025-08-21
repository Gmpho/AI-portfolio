# AI-Powered Portfolio - Complete Project Documentation

[![Build Status](https://github.com/Gmpho/AI-portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Gmpho/AI-portfolio/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents
- [Project Identity](#project-identity)
- [Project Vision](#project-vision)
- [Technical Architecture](#technical-architecture)
- [Key Features](#key-features)
- [Setup and Installation](#setup-and-installation)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [DevSecOps & Observability](#devsecops--observability)
- [Future Enhancements](#future-enhancements)
- [Complete Folder Structure](#complete-folder-structure)

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
│   └── lib/                     # Library code 📚
│       ├── utils.ts             # General Utilities 🛠️
│       └── validators.ts        # Validation Functions ✅
├── public/                      # Static Assets (Images, Fonts, Resumes) 🖼️
│   ├── favicon.ico              # Website Favicon ❤️
│   ├── svg/                     # SVG assets 📐
│   └── resumes/                 # Sample resume PDFs 📄
├── scripts/                     # Build & Setup Scripts 📜
│   ├── setup-ai.js              # AI Service Setup Script ⚙️
│   ├── test-ai.js               # Service Testing Script ✅
│   └── deploy-check.js          # Pre-deploy Validation Script 🚀
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

### Visual Architecture & Diagrams 📈

For a more interactive and visual representation of the project's architecture, including data flows, component interactions, and service dependencies, consider using external diagramming tools. Common formats for these diagrams include:

*   **SVG (Scalable Vector Graphics):** Ideal for crisp, scalable diagrams that can be embedded directly into Markdown.
*   **PNG (Portable Network Graphics):** Good for static images, especially for complex diagrams.

You can generate these using tools like:
*   **Excalidraw:** For hand-drawn style diagrams.
*   **Mermaid:** For generating diagrams from text-based syntax (can be rendered directly in GitHub Markdown).
*   **Lucidchart / draw.io:** For professional flowcharts and architecture diagrams.

These visual aids can significantly enhance understanding of the project's structure and logic.
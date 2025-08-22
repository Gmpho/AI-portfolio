# Architecture Overview

This document details the system design, key components, and deployment strategy of the AI-Powered Portfolio application. It emphasizes a modular approach and leverages modern cloud-native services for scalability and performance.

## Core Architecture

The application's core architecture is designed for high availability and low latency, utilizing Cloudflare's global edge network for deployment. User requests are routed through Cloudflare Pages/Workers, with backend logic (AI/chat handlers) running on Cloudflare Workers or Edge Functions.

### Visual Representation

Below is a high-level diagram illustrating the traffic flow and service interactions within the application. For a more detailed visual, refer to the `AI Web App Technology Flowchart.png` in the project root.

```mermaid
graph LR
    subgraph Browser
      U(User)
    end
    subgraph Cloudflare
      CF(Edge (Pages/Workers))
    end
    subgraph Backend
      API[Next.js API Routes<br/>(OpenAI, Pinecone, Notion, Ollama)]
      OpenAI[OpenAI API]
      Pinecone[Pinecone Vector DB]
      NotionAPI[Notion API]
      Ollama(Ollama LLM)
    end
    U --> CF
    CF --> API
    API --> OpenAI
    API --> Pinecone
    API --> NotionAPI
    API --> Ollama
```

*Figure: Example full-stack architecture on Cloudflare*

## Component Interaction

Next.js API routes (located in `app/api/`) serve as the primary interface for external services. For instance, the `/api/chat` handler orchestrates interactions with various AI and data services:

*   Sends prompts to OpenAI or Ollama for chat completions.
*   Stores and retrieves vectors from Pinecone for knowledge retrieval.
*   Reads and writes data in Notion for content management.

## Groups and Services

The architecture is logically grouped to illustrate hierarchies and service boundaries:

*   **Cloudflare Edge:** This layer handles initial user requests, providing WAF (Web Application Firewall) and CDN (Content Delivery Network) capabilities. It routes traffic to the Next.js application.
*   **Next.js Application:** Deployed as a Cloudflare Pages/Workers application, it serves the frontend and acts as a proxy/orchestrator for backend API calls.
*   **Backend Services:** These include external AI providers (OpenAI, Ollama), the Pinecone vector database, and the Notion API, all accessed securely from the Next.js API routes.

## Deployment Strategy

Our deployment strategy is fully serverless, leveraging GitHub Actions for CI/CD and Cloudflare Pages/Workers for hosting:

*   **Source Code Management:** All source code is managed in a GitHub repository.
*   **CI/CD Pipeline:** GitHub Actions are configured to build the application, run tests, and deploy the static frontend (if any) and Cloudflare Workers.
*   **Secrets Management:** API tokens and sensitive credentials (e.g., Cloudflare API token, OpenAI key, Pinecone key, Notion token) are stored as encrypted GitHub Actions secrets and Cloudflare Workers secrets (via `wrangler secrets`). They are never committed directly to the codebase.
*   **Local Development:** For local development, `.env` or `.dev.vars` files are used to manage secrets, ensuring they are gitignored.

This setup ensures a robust, scalable, and secure deployment pipeline.

## Runtime & Infrastructure Decisions

### Next.js App Router

*   **SSR/SSG Capabilities:** Utilizes Server-Side Rendering (SSR) and Static Site Generation (SSG) where beneficial for SEO and performance.
*   **Route Handlers:** Next.js Route Handlers act as serverless functions for API calls, aligning perfectly with the Cloudflare Workers model.

### Cloudflare Pages + Workers

*   **Global Edge Network:** Provides low-latency content delivery and execution by deploying code geographically closer to users.
*   **WAF & Policy Controls:** Built-in Web Application Firewall (WAF) and policy controls enhance security.
*   **Workers for LLM Orchestration:** Cloudflare Workers are ideal for orchestrating LLM calls (e.g., calling OpenAI, caching responses, or handling fallbacks).

### Sentry

*   **Error and Performance Telemetry:** Integrated for comprehensive error tracking and performance monitoring, critical for LLM operations.

### GitHub Actions

*   **Automated Pipeline:** Manages the build, test, and deploy pipeline, with secrets securely stored in GitHub Secrets.
*   **Source Map Uploads:** Configured to upload source maps to Sentry during CI builds for improved debugging.

## Local LLM Strategy: Ollama + Gemma-3-270M

For local development and as a robust offline fallback, we utilize Ollama with the Gemma-3-270M model. This strategy is optimized for resource-constrained hardware (e.g., 8GB RAM machines).

### Why Gemma-3-270M?

*   **Small & Efficient:** The 270M variant is lightweight (~200–300 MB in GGUF format), making it ideal for low-memory setups.
*   **Multimodal-Ready:** While this version is text-only, Gemma 3's architecture supports vision in larger sizes, offering future-proofing for potential file/image analysis features.
*   **Generous Context Window:** Supports up to 32K tokens, ample for chat sessions.
*   **Optimized Format:** Distributed as GGUF, optimized for tools like `llama.cpp` and Ollama for efficient inference on low-memory devices.

### Local Development Setup

1.  **Install Ollama:** Follow Ollama's official documentation for installation.
2.  **Pull Model:** On the machine running Ollama (your dev workstation or a small server), pull the model:
    ```bash
    ollama pull unsloth/gemma-3-270m-it-GGUF
    ```
3.  **Start Ollama:** Ensure the local Ollama endpoint is reachable at `http://localhost:11434/v1`.

### Best Practices for Constrained Devices

*   **Context Window Cap:** Trim conversational history to keep active context <= 512 tokens for interactive chat to avoid Out-Of-Memory (OOM) errors. Longer contexts are stored in Pinecone embeddings for retrieval-augmented responses.
*   **Batching & Rate-Limiting:** Limit concurrency (e.g., 1–2 parallel inferences) to manage resource usage. Cloudflare Workers will proxy requests, allowing for per-IP and per-user concurrency caps.
*   **Swap File Caution:** While enabling swap can help, it may slow inference and cause system thrashing. Prioritize reducing memory pressure.
*   **Server Fallback:** For always-on fallback, consider running Ollama on a small Virtual Private Server (VPS) with proper ingress controls.

### Model Parameters (Recommended for Gemma-3-270M)

*   **Temperature:** `1.0` (for conversational variety)
*   **Top_K:** `64`
*   **Top_P:** `0.95`
*   **Repetition Penalty:** `1.0`
*   **Max Tokens per Call:** `256–512` (to avoid long free-form generations on low memory).

## Secure API Design

Our API design incorporates robust security measures:

### API Gateway + Proxy Architecture

*   **Edge WAF (Cloudflare):** Protects against OWASP top risks, blocks malicious bots, and filters known bad IPs.
*   **API Gateway Layer (Cloudflare Workers):** Every inbound request passes through a layer that enforces rate limiting, authentication, input sanitization, and circuit-breaker wrappers.

### Hardening Rules

*   **HTTPS Enforcement:** Always enforce HTTPS (handled by Cloudflare). Reject non-TLS requests.
*   **Authentication:** Use JWT (short-lived) or session cookies for user administration actions.
*   **Input Validation & Sanitization:** Escape user-generated strings before output, validate types and sizes server-side to prevent injection attacks.
*   **Content Security Policy (CSP) & XSS:** Implement strict CSP headers, sanitize HTML, and escape any user-provided HTML to prevent Cross-Site Scripting (XSS) attacks.
*   **CORS:** Whitelist only your authorized domains.
*   **Rate Limits:** Implement per-IP and per-user token rate limits (e.g., 60 requests/min per IP for chat, 10 requests/min per user for expensive endpoints).
*   **DDoS Mitigation:** Enable Cloudflare rate limiting and challenge pages for suspicious traffic.

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
│   └── resumes/                 # Sample Resume PDFs 📄
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
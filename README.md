# AI-Powered Portfolio

## Project Overview

This project is an AI-powered portfolio website featuring a self-learning career coach chatbot. It's designed to showcase projects while providing personalized career guidance through intelligent conversations that adapt and learn from each interaction.

## Key Features

*   AI-powered career coach chatbot
*   Self-learning capabilities
*   Dynamic project showcase
*   Integration with OpenAI, Ollama, Pinecone, and Notion
*   Modern UI with ShadCN UI components
*   LangChain Agent Executor for AI orchestration
*   Robust DevSecOps & Observability (Sentry, Guardrails, Feature Flags)
*   CI/CD with GitHub Actions and Cloudflare Pages

## Technical Stack

Our application is built with a modern and robust technology stack:

### Frontend:
*   **Framework:** Next.js 14+ with App Router
*   **Language:** TypeScript (strict mode)
*   **Styling:** Tailwind CSS + ShadCN UI components
*   **Build Tool:** Next.js built-in with Turbopack

### AI Services:
*   **Primary LLM:** OpenAI GPT-4
*   **Secondary/Fallback LLM:** Ollama (Local/Offline)
*   **Vector Database:** Pinecone Vector Database
*   **CMS:** Notion API
*   **PDF Processing:** PDF.js
*   **Orchestration:** LangChain Agent Executor

### Deployment:
*   **Platform:** Cloudflare Pages/Workers
*   **CI/CD:** GitHub Actions
*   **Monitoring:** Sentry

### Development:
*   **Package Manager:** npm
*   **Linting:** ESLint
*   **Formatting:** Prettier
*   **Testing:** Jest + React Testing Library

## Quick Start & Setup

Follow these steps to get the project running locally:

1.  **Prerequisites:**
    *   Node.js (LTS version recommended)
    *   npm (comes with Node.js)
    *   Wrangler CLI (for Cloudflare Workers development, `npm install -g wrangler`)
    *   API keys for OpenAI, Pinecone, and Notion (see Environment Configuration below).

2.  **Clone the repository:**
    ```bash
    git clone https://github.com/Gmpho/AI-portfolio.git
    cd AI-portfolio
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Environment Configuration:**
    Create a `.env.local` file in the root directory of your project. This file will store your sensitive API keys and environment-specific variables. **Do NOT commit this file to Git.**

    Example `.env.local` content:
    ```
    NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
    PINECONE_API_KEY=your_pinecone_api_key
    PINECONE_INDEX=your_pinecone_index_name
    NOTION_API_KEY=your_notion_api_key
    NOTION_DATABASE_ID=your_notion_database_id
    OLLAMA_BASE_URL=http://localhost:11434/v1 # Only if using local Ollama
    NEXT_PUBLIC_FEATURE_ENABLE_OLLAMA_FALLBACK=true # Set to false to disable Ollama fallback
    ```
    *Note: For production deployment, these secrets should be configured securely in your CI/CD environment (e.g., GitHub Secrets, Cloudflare Workers environment variables).* 

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the Next.js development server, typically accessible at `http://localhost:3000`.

## Usage

Once the development server is running, you can interact with the application:

*   **Web UI:** Access the main portfolio website and explore the project showcase.
*   **Chatbot:** Interact with the AI-powered career coach chatbot through the provided UI.
*   **API Endpoints:** (For developers) You can test API routes directly. For example, sending a POST request to `/api/chat` with a message payload.

## Contributing

We welcome contributions to this project! Please refer to our `CONTRIBUTING.md` guide (to be created) for details on how to submit issues, propose features, and contribute code. We adhere to strict code style checks (linting, formatting) and encourage pull requests.

## Links to Further Documentation

*   [Architecture Overview](ARCHITECTURE.md)
*   [LangChain Agents Details](LANGCHAIN_AGENTS.md)
*   [Security Practices](SECURITY.md)
*   [API Documentation](API.md)
*   [Testing Strategy](TESTING.md)
*   [CI/CD Pipeline](CI_CD.md)

---

[![Build Status](https://github.com/Gmpho/AI-portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Gmpho/AI-portfolio/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

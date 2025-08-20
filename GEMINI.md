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

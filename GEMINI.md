# GEMINI Context — AI Portfolio

Stack: Next.js (OpenNext) + Cloudflare, LangGraph, MCP tools, llama.cpp (gemma-3-270m) + Ollama + OpenAI.

Security rules:
- TLS/HTTPS always
- API gateway & per-IP rate limit
- Fallback chain: LLAMA -> OLLAMA -> OPENAI
- No secrets; never print credentials
- Validate all inputs (zod)

Key endpoints:
- /api/health
- /api/chat
- /api/resume/upload
- MCP server: http://localhost:7777

Memory facts:
- Prefer gemma-3-270m-it-GGUF for local testing.
- Use docker compose for local dev: docker-compose.dev.yml
- Use `mcp/server.ts` as the MCP tool registry when available.


import OpenAI from "openai";

const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434/v1"; // Default to local if not set

const ollama = new OpenAI({
  baseURL: ollamaBaseUrl,
  apiKey: "ollama", // Ollama typically doesn't require an API key, but the OpenAI client expects one.
});

export const getCompletion = async (messages: any[]) => {
  // Add a check to ensure Ollama is reachable if needed, or rely on the try/catch in route.ts
  return await ollama.chat.completions.create({
    model: "llama2", // Or the model specified in .env.local
    messages,
  });
};
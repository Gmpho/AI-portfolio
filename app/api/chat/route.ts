import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

// Ollama Configuration
const ollama = new OpenAI({
  baseURL: process.env.OLLAMA_BASE_URL || "http://localhost:11434/v1",
  apiKey: "ollama",
});

// Circuit Breaker State
let circuitState: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
let failureCount = 0;
const FAILURE_THRESHOLD = 3;
const RESET_TIMEOUT_MS = 60 * 1000;
let lastFailureTime = 0;


async function retryWithBackoff<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err) {
      if (++attempt > retries) throw err;
      const delay = Math.pow(2, attempt) * 200 + Math.random() * 100;
      await new Promise(r => setTimeout(r, delay));
    }
  }
}

export async function POST(req: NextRequest) {
  if (circuitState === 'OPEN' && (Date.now() - lastFailureTime < RESET_TIMEOUT_MS)) {
    return NextResponse.json({ error: "OpenAI service is currently unavailable (circuit open)." }, { status: 503 });
  }

  const { messages, model } = await req.json();

  try {
    const resp = await retryWithBackoff(() =>
      openai.chat.completions.create({ model: model ?? "gpt-4o-mini", messages })
    );
    // Reset circuit on success
    failureCount = 0;
    circuitState = 'CLOSED';
    return NextResponse.json(resp);
  } catch (openaiErr) {
    console.error("OpenAI API error:", openaiErr);
    failureCount++;
    lastFailureTime = Date.now();
    if (failureCount >= FAILURE_THRESHOLD) {
      circuitState = 'OPEN';
    }

    if (process.env.FEATURE_OLLAMA_FALLBACK === "true") {
      try {
        const resp = await ollama.chat.completions.create({ model: "gemma-3-270m-it-GGUF", messages });
        return NextResponse.json(resp);
      } catch (ollamaErr) {
        return NextResponse.json({ error: "LLM failure" }, { status: 503 });
      }
    }
    return NextResponse.json({ error: "OpenAI unavailable" }, { status: 502 });
  }
}


import OpenAI from "openai";

const ollama = new OpenAI({
  baseURL: "http://localhost:11434/v1",
  apiKey: "ollama",
});

export const getCompletion = async (messages: any[]) => {
  return await ollama.chat.completions.create({
    model: "llama2",
    messages,
  });
};
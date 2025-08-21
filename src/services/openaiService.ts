import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

// Circuit Breaker State
let circuitState: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
let failureCount = 0;
let lastFailureTime = 0;
const FAILURE_THRESHOLD = 3; // Number of consecutive failures to open the circuit
const RESET_TIMEOUT_MS = 60 * 1000; // Time to wait before attempting to close (1 minute)

export const getChatCompletion = async (messages: any[]) => {
  if (circuitState === 'OPEN' && (Date.now() - lastFailureTime < RESET_TIMEOUT_MS)) {
    console.warn('Circuit is OPEN. Bypassing OpenAI chat completion.');
    throw new Error('OpenAI service is currently unavailable (circuit open).');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Or another suitable model
      messages: messages,
    });

    // Reset circuit on success
    circuitState = 'CLOSED';
    failureCount = 0;

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error getting chat completion:", error);
    failureCount++;
    lastFailureTime = Date.now();

    if (failureCount >= FAILURE_THRESHOLD) {
      circuitState = 'OPEN';
      console.error('Circuit opened for OpenAI chat completion due to multiple failures.');
    } else if (circuitState === 'OPEN' && (Date.now() - lastFailureTime >= RESET_TIMEOUT_MS)) {
      circuitState = 'HALF_OPEN'; // Attempt to close after timeout
      console.warn('Circuit is HALF_OPEN. Attempting to re-test OpenAI chat completion.');
    }

    throw error;
  }
};

export const getEmbeddings = async (text: string) => {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002", // Or another suitable embedding model
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error("Error getting embeddings:", error);
    throw error;
  }
};

export const moderateContent = async (input: string) => {
  try {
    const response = await openai.moderations.create({
      input: input,
    });
    const [results] = response.results;
    return results;
  } catch (error) {
    console.error("Error moderating content:", error);
    throw error;
  }
};

export const filterResponse = (responseText: string): { filteredText: string; flagged: boolean; reason?: string } => {
  let filteredText = responseText;
  let flagged = false;
  let reason: string | undefined;

  // Define a list of forbidden keywords/phrases for a professional portfolio context
  const forbiddenKeywords = [
    "bad word 1", // Replace with actual forbidden words
    "bad word 2",
    "unprofessional phrase",
    // Add more as needed
  ];

  for (const keyword of forbiddenKeywords) {
    const regex = new RegExp(`\b${keyword}\b`, 'gi'); // Whole word, case-insensitive
    if (filteredText.match(regex)) {
      flagged = true;
      reason = `Contains forbidden keyword: "${keyword}"`;
      // Optionally, replace the forbidden word with a placeholder or censor it
      filteredText = filteredText.replace(regex, '[REDACTED]');
      break; // Flag and break on first match
    }
  }

  // Add logic for relevance to career/portfolio if needed
  // For example, check for presence of career-related terms, or absence of off-topic terms.
  // This would be more complex and might involve NLP techniques or a larger keyword list.

  return { filteredText, flagged, reason };
};

// TODO: Implement guardrails based on specific requirements.
// This could involve:
// - Input validation/sanitization
// - Filtering sensitive information
// - Enforcing specific response formats or constraints

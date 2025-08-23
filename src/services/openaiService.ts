import OpenAI from "openai";

// Prefer server-only env var OPENAI_API_KEY. Fall back to NEXT_PUBLIC_OPENAI_API_KEY for
// backward compatibility, but warn because NEXT_PUBLIC_* vars are exposed to the client.
const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
if (!apiKey) {
  throw new Error(
    'Missing OpenAI API key. Set the server-side environment variable OPENAI_API_KEY.'
  );
}
if (process.env.NEXT_PUBLIC_OPENAI_API_KEY && !process.env.OPENAI_API_KEY) {
  console.warn(
    'Using NEXT_PUBLIC_OPENAI_API_KEY as a fallback. Consider moving this secret to OPENAI_API_KEY (server-only).'
  );
}

const openai = new OpenAI({
  apiKey,
});

// Circuit Breaker State (note: module-level state does not persist across serverless
// cold starts. For cross-instance circuit breaker behavior use an external store.)
let circuitState: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
let failureCount = 0;
let lastFailureTime = 0;
const FAILURE_THRESHOLD = 3; // Number of consecutive failures to open the circuit
const RESET_TIMEOUT_MS = 60 * 1000; // Time to wait before attempting to close (1 minute)

export const getChatCompletion = async (messages: any[]) => {
  if (circuitState === 'OPEN' && Date.now() - lastFailureTime < RESET_TIMEOUT_MS) {
    console.warn('Circuit is OPEN. Bypassing OpenAI chat completion.');
    throw new Error('OpenAI service is currently unavailable (circuit open).');
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
    });

    // Reset circuit on success
    circuitState = 'CLOSED';
    failureCount = 0;

    // Defensive checks for response shape
    if (response && response.choices && response.choices[0] && response.choices[0].message) {
      return response.choices[0].message.content;
    }

    throw new Error('Unexpected response shape from OpenAI chat completion');
  } catch (error) {
    console.error('Error getting chat completion:', error);
    failureCount++;
    lastFailureTime = Date.now();

    if (failureCount >= FAILURE_THRESHOLD) {
      circuitState = 'OPEN';
      console.error('Circuit opened for OpenAI chat completion due to multiple failures.');
    } else if (circuitState === 'OPEN' && Date.now() - lastFailureTime >= RESET_TIMEOUT_MS) {
      circuitState = 'HALF_OPEN'; // Attempt to close after timeout
      console.warn('Circuit is HALF_OPEN. Attempting to re-test OpenAI chat completion.');
    }

    throw error;
  }
};

// Prefer modern embedding model, with fallback for compatibility
const PREFERRED_EMBEDDING_MODEL = 'text-embedding-3-small';
const FALLBACK_EMBEDDING_MODEL = 'text-embedding-ada-002';

export const getEmbeddings = async (text: string) => {
  try {
    const response = await openai.embeddings.create({
      model: PREFERRED_EMBEDDING_MODEL,
      input: text,
    });
    return response.data[0].embedding;
  } catch (firstError) {
    console.warn(
      `Failed to get embeddings with ${PREFERRED_EMBEDDING_MODEL}, falling back to ${FALLBACK_EMBEDDING_MODEL}`,
      firstError
    );
    try {
      const fallback = await openai.embeddings.create({
        model: FALLBACK_EMBEDDING_MODEL,
        input: text,
      });
      return fallback.data[0].embedding;
    } catch (secondError) {
      console.error('Error getting embeddings (both primary and fallback failed):', secondError);
      throw secondError;
    }
  }
};

export const moderateContent = async (input: string) => {
  try {
    const response = await openai.moderations.create({
      input,
    });
    const [results] = response.results;
    return results;
  } catch (error) {
    console.error('Error moderating content:', error);
    throw error;
  }
};

export const filterResponse = (responseText: string): { filteredText: string; flagged: boolean; reason?: string } => {
  let filteredText = responseText;
  let flagged = false;
  let reason: string | undefined;

  // Define a list of forbidden keywords/phrases for a professional portfolio context
  const forbiddenKeywords = [
    'bad word 1', // Replace with actual forbidden words
    'bad word 2',
    'unprofessional phrase',
    // Add more as needed
  ];

  for (const keyword of forbiddenKeywords) {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi'); // Whole word, case-insensitive
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

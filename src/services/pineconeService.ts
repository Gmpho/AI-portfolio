

import { Pinecone } from '@pinecone-database/pinecone';

const apiKey = process.env.PINECONE_API_KEY;
const environment = process.env.PINECONE_ENVIRONMENT; // Keep for potential future use or logging
const indexName = process.env.PINECONE_INDEX;

if (!apiKey || !indexName) { // Removed environment from check
  throw new Error('Pinecone environment variables (PINECONE_API_KEY, PINECONE_INDEX) are not set.');
}

const pinecone = new Pinecone({
  apiKey: apiKey,
  // environment: environment, // Removed environment from constructor
});

export const getPineconeIndex = () => pinecone.Index(indexName);

export const upsertVectors = async (vectors: any[]) => {
  const index = getPineconeIndex();
  try {
    await index.upsert(vectors);
    console.log(`Successfully upserted ${vectors.length} vectors to Pinecone.`);
  } catch (error) {
    console.error("Error upserting vectors to Pinecone:", error);
    throw error;
  }
};

export const queryVectors = async (vector: number[], topK: number = 5, includeMetadata: boolean = true) => {
  const index = getPineconeIndex();
  try {
    const queryResponse = await index.query({
      vector: vector,
      topK: topK,
      includeMetadata: includeMetadata,
    });
    return queryResponse.matches;
  } catch (error) {
    console.error("Error querying vectors from Pinecone:", error);
    throw error;
  }
};
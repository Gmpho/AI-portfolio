import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeRecord } from '@pinecone-database/pinecone/dist/data/vectors/types';

const apiKey = process.env.PINECONE_API_KEY;
const indexName = process.env.PINECONE_INDEX;

if (!apiKey || !indexName) {
  throw new Error('The PINECONE_API_KEY and PINECONE_INDEX environment variables must be set.');
}

const pinecone = new Pinecone({
  apiKey: apiKey,
});

const index = pinecone.Index(indexName);

export const getPineconeIndex = () => index;

export const upsertVectors = async (vectors: PineconeRecord[]) => {
  try {
    await index.upsert(vectors);
    console.log(`Successfully upserted ${vectors.length} vectors to Pinecone.`);
  } catch (error) {
    console.error("Error upserting vectors to Pinecone:", error);
    throw error;
  }
};

export const queryVectors = async (vector: number[], topK: number = 5) => {
  try {
    const queryResponse = await index.query({
      vector,
      topK,
      includeMetadata: true,
    });
    return queryResponse.matches;
  } catch (error) {
    console.error("Error querying vectors from Pinecone:", error);
    throw error;
  }
};
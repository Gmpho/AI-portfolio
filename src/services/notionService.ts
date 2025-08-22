import { Client } from '@notionhq/client';

const notionApiKey = process.env.NOTION_API_KEY;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

if (!notionApiKey) {
  throw new Error('NOTION_API_KEY is not set in environment variables.');
}

if (!notionDatabaseId) {
  throw new Error('NOTION_DATABASE_ID is not set in environment variables.');
}

const notion = new Client({
  auth: notionApiKey,
});

export const getProjectsFromNotion = async () => {
  try {
    const response = await notion.databases.query({
      database_id: notionDatabaseId,
      // You can add filters and sorts here if needed
    });
    return response.results;
  } catch (error) {
    console.error("Error fetching projects from Notion:", error);
    throw error;
  }
};

// You might want to add functions to parse Notion page properties into a more usable format (e.g., Project interface)
// based on your Notion database structure.
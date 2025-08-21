import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID!;

export const getProjectsFromNotion = async () => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
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
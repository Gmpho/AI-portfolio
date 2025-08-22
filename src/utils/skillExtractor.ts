import { getChatCompletion } from '@/services/openaiService';

export const extractSkills = async (conversationHistory: { role: string; content: string }[]): Promise<string[]> => {
  try {
    const prompt = `Given the following conversation history, extract a comma-separated list of technical and soft skills mentioned or implied by the user. Focus on skills relevant to a professional portfolio. If no skills are apparent, return \"none\".\n\nConversation:\n${conversationHistory.map((msg: { role: string; content: string }) => `${msg.role}: ${msg.content}`).join('\n')}\n\nSkills:`

    const aiResponse = await getChatCompletion([{ role: 'user', content: prompt }]);

    if (aiResponse && aiResponse.toLowerCase().trim() !== 'none') {
      return aiResponse.split(',').map((skill: string) => skill.trim()).filter((skill: string) => skill.length > 0);
    }
    return [];
  } catch (error) {
    console.error("Error extracting skills:", error);
    return [];
  }
};

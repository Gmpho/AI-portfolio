import { UserProfile, ChatMessage } from '@/types/chat.d';
import { getChatCompletion } from './openaiService'; // Assuming relative path

let currentUserProfile: UserProfile = {
  skills: [],
  experienceLevel: 'entry', // Default
  jobPreferences: {
    title: '',
    location: '',
    remote: false,
    salaryRange: '',
    industries: [],
  },
  conversationHistory: [],
  learningProgress: 0,
  lastUpdated: new Date(),
};

export const getUserProfile = (): UserProfile => {
  // In a real application, you would load this from a database or local storage
  return currentUserProfile;
};

export const updateUserProfile = (updates: Partial<UserProfile>): UserProfile => {
  currentUserProfile = { ...currentUserProfile, ...updates, lastUpdated: new Date() };
  // In a real application, you would save this to a database or local storage
  return currentUserProfile;
};

export const addMessageToHistory = (message: ChatMessage): UserProfile => {
  currentUserProfile.conversationHistory.push(message);
  return currentUserProfile;
};

export const generateCareerRecommendations = async (profile: UserProfile): Promise<string> => {
  const prompt = `Based on the following user profile, provide concise and actionable career recommendations. Focus on potential job roles, areas for skill development, and relevant industries.
  User Profile:
  Skills: ${profile.skills.join(', ')}
  Experience Level: ${profile.experienceLevel}
  Job Preferences: ${JSON.stringify(profile.jobPreferences)}
  Conversation History Snippet: ${profile.conversationHistory.slice(-5).map((msg: ChatMessage) => `${msg.role}: ${msg.content}`).join('\n')}

  Recommendations:`

  try {
    const recommendations = await getChatCompletion([{ role: 'user', content: prompt }]);
    return recommendations || "No specific recommendations could be generated at this time.";
  } catch (error) {
    console.error("Error generating career recommendations:", error);
    return "An error occurred while generating recommendations.";
  }
};

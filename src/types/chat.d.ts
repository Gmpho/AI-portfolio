interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    learningImpact: number;
    contextTags: string[];
    sentiment: 'positive' | 'negative' | 'neutral';
    source?: 'openai' | 'ollama' | 'fallback';
  };
}

interface UserProfile {
  skills: string[];
  experienceLevel: 'entry' | 'mid' | 'senior';
  jobPreferences: {
    title: string;
    location: string;
    remote: boolean;
    salaryRange: string;
    industries: string[];
  };
  conversationHistory: ChatMessage[];
  learningProgress: number;
  resumeAnalysis?: ResumeAnalysis; // Assuming ResumeAnalysis will be defined elsewhere
  lastUpdated: Date;
}
export interface LearningEngine {
  extractSkills(messages: ChatMessage[]): string[];
  updateUserProfile(profile: UserProfile, newData: Partial<UserProfile>): UserProfile;
  generateCareerRecommendations(profile: UserProfile): Recommendation[];
  calculateLearningProgress(interactions: number): number;
}

export interface ResumeAnalysis {
  rawText: string;
  extractedSkills: string[];
  experience: WorkExperience[]; // Assuming WorkExperience will be defined elsewhere
  education: Education[]; // Assuming Education will be defined elsewhere
  recommendations: string[];
  confidence: number;
  analysisDate: Date;
}

export interface AIResponse {
  message: string;
  metadata: {
    confidence: number;
    sources: string[];
    learningApplied: boolean;
    suggestedActions: string[];
    serviceUsed: 'openai' | 'ollama' | 'fallback';
    processingTime: number;
  };
}
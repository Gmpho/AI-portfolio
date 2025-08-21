import { NextResponse } from 'next/server';
import { getChatCompletion, moderateContent, filterResponse } from '@/services/openaiService';
import { extractSkills } from '@/utils/skillExtractor';
import { getUserProfile, updateUserProfile, addMessageToHistory, generateCareerRecommendations } from '@/services/userService';
import { ChatMessage } from '@/types/chat.d';

// Simple in-memory store for rate limiting
const userRequestCounts = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // Max 10 requests per minute

export async function POST(request: Request) {
  try {
    // Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || request.ip;
    if (!ip) {
      return NextResponse.json({ error: 'Unable to determine IP address for rate limiting.' }, { status: 500 });
    }

    const now = Date.now();
    const user = userRequestCounts.get(ip) || { count: 0, lastReset: now };

    if (now - user.lastReset > RATE_LIMIT_WINDOW_MS) {
      // Reset count if window has passed
      user.count = 1;
      user.lastReset = now;
    } else {
      user.count++;
    }

    userRequestCounts.set(ip, user);

    if (user.count > MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const { message, history = [] } = await request.json(); // Accept history array

    // Combine history with the new message
    const messages = [...history, { role: 'user', content: message }];

    // 1. Input Validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required and must be a non-empty string.' }, { status: 400 });
    }
    if (message.length > 500) { // Example: Limit message length
      return NextResponse.json({ error: 'Message exceeds maximum length.' }, { status: 400 });
    }
    // Add more specific validation rules as needed

    // 2. Content Moderation
    const moderationResults = await moderateContent(message);
    if (moderationResults.flagged) {
      console.warn('User input flagged by moderation:', moderationResults);
      return NextResponse.json({ error: 'Your message contains content that violates our policies.' }, { status: 403 });
    }

    // 3. Get Chat Completion (if input is valid and not flagged)
    const aiResponse = await getChatCompletion(messages); // Pass combined messages

    // 4. Response Filtering
    const { filteredText, flagged: responseFlagged, reason: responseReason } = filterResponse(aiResponse);
    if (responseFlagged) {
      console.warn('AI response flagged by filtering:', responseReason);
      return NextResponse.json({ error: 'AI response contains content that violates our policies.' }, { status: 500 });
    }

    // Add AI response to history
    messages.push({ role: 'assistant', content: filteredText, id: Date.now().toString(), timestamp: new Date() });

    // Update conversation history in user profile
    addMessageToHistory({ role: 'user', content: message, id: Date.now().toString(), timestamp: new Date() });
    addMessageToHistory({ role: 'assistant', content: filteredText, id: Date.now().toString(), timestamp: new Date() });


    // 5. Skill Extraction
    const extractedSkills = await extractSkills(messages);
    if (extractedSkills.length > 0) {
      console.log('Extracted skills:', extractedSkills);
      // Update user profile with extracted skills
      const currentUserProfile = getUserProfile();
      const updatedSkills = Array.from(new Set([...currentUserProfile.skills, ...extractedSkills])); // Merge and deduplicate
      updateUserProfile({ skills: updatedSkills });
      console.log('User profile updated with new skills:', getUserProfile().skills);
    }

    // 6. Generate Career Recommendations (example - can be triggered conditionally)
    const currentUserProfile = getUserProfile();
    const careerRecommendations = await generateCareerRecommendations(currentUserProfile);
    console.log('Career Recommendations:', careerRecommendations);


    return NextResponse.json({ response: filteredText });

  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
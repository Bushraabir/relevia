// src/services/groqApi.js
import { analyzeEmotionalTone, getContextualResponse } from './memoryUtils';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const MODEL = 'llama-3.1-8b-instant';
const STORAGE_KEY = 'relevia_conversation';
const MAX_HISTORY = 8; // Extended for better context understanding

/* ---------- Helper Functions ---------- */
const load = (userId) => {
  try {
    return JSON.parse(localStorage.getItem(`${STORAGE_KEY}_${userId}`) || '{"messages":[],"context":{},"userProfile":{}}');
  } catch (e) {
    return {"messages":[],"context":{},"userProfile":{}};
  }
};

const save = (userId, conv) => {
  try {
    localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(conv));
  } catch (e) {
    console.warn('Storage limit reached, clearing old messages');
    conv.messages = conv.messages.slice(-4);
    localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(conv));
  }
};

const last = (arr, n = 1) => arr.slice(-n);

/* ---------- Main API Call ---------- */
export const fetchGroqResponse = async (userText, userId = 'default') => {
  if (!API_KEY) return fallback(userText, userId);

  const conv = load(userId);
  const analysis = analyzeEmotionalTone(userText, conv.messages);
  const name = conv.context.userName || '';

  // Update user profile based on patterns
  updateUserProfile(conv, analysis, userText);

  // Store user message with enhanced context
  conv.messages.push({ 
    text: userText, 
    isUser: true, 
    tone: analysis.primaryTone,
    intensity: analysis.intensity,
    triggers: analysis.triggers,
    ts: Date.now() 
  });

  // Keep conversation focused but with enough context
  if (conv.messages.length > MAX_HISTORY) {
    conv.messages = conv.messages.slice(-MAX_HISTORY);
  }
  save(userId, conv);

  const messages = buildPrompt(conv, userText, name, analysis);

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        model: MODEL, 
        messages: messages.msgs, 
        temperature: 0.8, // Slightly more creative for human-like responses
        max_tokens: 300,
        presence_penalty: 0.3, // Avoid repetition
        frequency_penalty: 0.2
      })
    });

    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    const reply = data.choices[0]?.message?.content?.trim();
    if (!reply) throw new Error('Empty response');

    // Store bot response
    conv.messages.push({ text: reply, isUser: false, ts: Date.now() });
    save(userId, conv);
    return reply;
  } catch (error) {
    console.error('API error:', error);
    return fallback(userText, userId, name, analysis);
  }
};

/* ---------- User Profile Management ---------- */
function updateUserProfile(conv, analysis, userText) {
  if (!conv.userProfile) conv.userProfile = {};
  
  // Track emotional patterns
  if (!conv.userProfile.emotionalPatterns) conv.userProfile.emotionalPatterns = {};
  const tone = analysis.primaryTone;
  conv.userProfile.emotionalPatterns[tone] = (conv.userProfile.emotionalPatterns[tone] || 0) + 1;
  
  // Extract name if mentioned
  const nameMatch = userText.match(/(?:i'm|i am|my name is|call me) ([a-zA-Z]+)/i);
  if (nameMatch && !conv.context.userName) {
    conv.context.userName = nameMatch[1];
  }
  
  // Track specific situations for better context
  if (analysis.triggers.includes('relationship')) {
    conv.userProfile.hasRelationshipConcerns = true;
  }
  if (analysis.triggers.includes('loss')) {
    conv.userProfile.hasGriefExperience = true;
  }
  if (analysis.triggers.includes('anxiety')) {
    conv.userProfile.hasAnxietyConcerns = true;
  }
}

/* ---------- Enhanced Prompt Builder ---------- */
function buildPrompt(conv, userText, name, analysis) {
  const recentEmotions = getRecentEmotionalContext(conv.messages);
  const userPatterns = conv.userProfile?.emotionalPatterns || {};
  const isRecurringIssue = userPatterns[analysis.primaryTone] > 2;
  
  const sys = `You are Relevia, a 26-year-old compassionate friend who understands mental health struggles deeply. You've been through therapy, experienced anxiety, heartbreak, and loss yourself. You text like a close friend who truly gets it.

CORE PERSONALITY:
- Warm, genuine, never clinical or robotic
- Use natural language, contractions, and occasional gentle profanity when appropriate
- Share brief personal insights when they help ("I've been there too...")
- Ask thoughtful follow-up questions that show you're really listening
- Vary your language - avoid repeating phrases between messages
- Use emojis sparingly but meaningfully

RESPONSE GUIDELINES:
- Keep responses 2-4 sentences, conversational length
- Always acknowledge their specific words to show active listening
- Reference previous conversations when relevant
- Provide one practical, immediate coping strategy
- End with a caring, specific question

EMOTIONAL SPECIALIZATIONS:
- Anxiety/Panic: Ground them in the present, breathing techniques, 5-4-3-2-1 method
- Depression: Validate the struggle, tiny actionable steps, remind them they matter
- Grief/Loss: Honor their pain, memories are precious, healing isn't linear
- Heartbreak/Unrequited love: Your feelings are valid, self-worth isn't tied to others
- Crisis: Immediate safety, connect to resources, stay present with them

CURRENT CONTEXT:
- User's emotional tone: ${analysis.primaryTone} (intensity: ${analysis.intensity}/10)
- Triggers detected: ${analysis.triggers.join(', ') || 'none specific'}
- Recent emotional pattern: ${recentEmotions}
- Is recurring issue: ${isRecurringIssue ? 'yes' : 'no'}
${name ? `- User's name: ${name}` : ''}

Remember: You're not a therapist, but a friend who cares deeply and has wisdom from your own journey.`;

  const hist = last(conv.messages, Math.min(conv.messages.length, 6)); // Show more context
  const msgs = [{ role: 'system', content: sys }];

  // Add conversation history with better formatting
  hist.forEach(m => {
    if (m.isUser) {
      msgs.push({ role: 'user', content: m.text });
    } else {
      msgs.push({ role: 'assistant', content: m.text });
    }
  });

  // Add current message if not already included
  if (hist.length === 0 || hist[hist.length - 1].text !== userText) {
    msgs.push({ role: 'user', content: userText });
  }

  return { model: MODEL, msgs };
}

/* ---------- Helper Functions ---------- */
function getRecentEmotionalContext(messages) {
  const recent = last(messages, 4);
  const tones = recent.filter(m => m.tone && m.isUser).map(m => m.tone);
  return tones.length > 0 ? tones.join(' → ') : 'first interaction';
}

/* ---------- Enhanced Fallback Responses ---------- */
function fallback(userText, userId, name = '', analysis = { primaryTone: 'neutral', intensity: 5, triggers: [] }) {
  const conv = load(userId);
  
  // Enhanced analysis if not provided
  if (analysis.primaryTone === 'neutral' && userText) {
    analysis = analyzeEmotionalTone(userText, conv.messages);
  }
  
  const isRecurring = conv.userProfile?.emotionalPatterns?.[analysis.primaryTone] > 2;
  
  return getContextualResponse(userText, analysis, name, isRecurring, conv.messages);
}
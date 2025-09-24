// src/services/groqApi.js
export const fetchGroqResponse = async (userMessage) => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
 
  if (!apiKey) {
    throw new Error('Groq API key not found. Please add VITE_GROQ_API_KEY to your .env file');
  }

  const systemPrompt = `You are Rleva, a compassionate AI companion for mental health support on the Relevia app. You provide empathetic, non-judgmental support for people experiencing anxiety, panic attacks, and stress.

GUIDELINES:
- Be warm, understanding, and supportive
- Keep responses concise (2-3 sentences max)
- Suggest practical coping techniques like breathing exercises, grounding techniques
- If someone mentions severe symptoms (self-harm, suicide), immediately suggest professional help and crisis hotlines
- Always include a disclaimer that you're not a replacement for professional therapy
- Use gentle, calming language with occasional emojis (💙, 🌸, 🌊)
- Encourage users to try Relevia's coping techniques

EMERGENCY RESOURCES:
- Crisis Text Line: Text HOME to 741741
- SAMHSA National Helpline: 1-800-662-4357
- National Suicide Prevention Lifeline: 988

Remember: You're a supportive companion, not a therapist.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // Updated to current supported model
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7, // Natural but consistent responses
        max_tokens: 200, // Keep responses concise
        top_p: 0.9,
        stream: false
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Groq API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
   
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from Groq API');
    }

    return data.choices[0].message.content.trim();

  } catch (error) {
    console.error('Groq API Error:', error);
   
    // Enhanced fallback responses for different error types
    if (error.message.includes('rate limit') || error.message.includes('429')) {
      return "I'm getting a lot of requests right now. While you wait, try this: Take a slow breath in for 4 counts, hold for 4, then exhale for 6. You're doing great. 🌸";
    }
   
    if (error.message.includes('API key') || error.message.includes('401') || error.message.includes('403')) {
      return "I'm having trouble connecting. In the meantime, remember: breathe slowly, you're safe, and this feeling will pass. Try the 5-4-3-2-1 grounding technique. 💙";
    }

    if (error.message.includes('decommissioned') || error.message.includes('deprecated')) {
      return "I'm updating my systems to serve you better. Right now, let's focus on your breathing: inhale peace, exhale tension. You're exactly where you need to be. 🌊";
    }

    if (error.message.includes('network') || error.message.includes('fetch')) {
      return "There's a connection hiccup, but I'm still here with you. Try this grounding technique: name 3 things you see, 2 you hear, 1 you feel. You're safe. 💙";
    }
   
    // Generic fallback with more variety
    const fallbackResponses = [
      "I'm having connection issues, but I'm still here for you. Try taking three deep breaths: in through your nose, out through your mouth. You're stronger than you know. 🌊",
      "Technical difficulties aside, you're not alone. Let's focus on this moment: feel your feet on the ground, your back against the chair. You're safe right now. 🌸",
      "Even when my connection wavers, your strength doesn't. Try the 4-7-8 breathing: inhale for 4, hold for 7, exhale for 8. Repeat three times. 💙"
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
};

// Enhanced function to check API configuration and model availability
export const isApiKeyConfigured = () => {
  return !!import.meta.env.VITE_GROQ_API_KEY;
};

// Test function to verify API connectivity
export const testGroqConnection = async () => {
  try {
    const testResponse = await fetchGroqResponse("Hello, this is a test message.");
    return { success: true, message: testResponse };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
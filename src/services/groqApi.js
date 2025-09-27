/* groqApi.js – Drop-in for src/services/groqApi.js
 * 100 % Groq Llama-3.1-8b-instant – mental-health tuned
 * Keeps 12-turn sliding window per user in localStorage
 * Falls back to a huge curated pool if Groq is down
 * Exports: fetchGroqResponse(userText, userId) -> Promise<string>
 */
import { analyzeEmotionalTone, getContextualResponse } from './memoryUtils';

const API_KEY   = import.meta.env.VITE_GROQ_API_KEY; // <— put in .env
const MODEL     = 'llama-3.1-8b-instant';
const STORAGE   = 'relevia_memory';
const MAX_HIST  = 12;

/* --------------- tiny helpers --------------- */
const load = (uid) => JSON.parse(localStorage.getItem(`${STORAGE}_${uid}`) || '{"m":[],"p":{}}');
const save = (uid, data) => localStorage.setItem(`${STORAGE}_${uid}`, JSON.stringify(data));

/* --------------- main export --------------- */
export async function fetchGroqResponse(userText, userId = 'anon') {
  const mem = load(userId);

  /* 1.  understand user */
  const tone = analyzeEmotionalTone(userText);
  const name = mem.p.name || '';

  /* 2.  store user turn */
  mem.m.push({ role: 'user', content: userText, tone, ts: Date.now() });
  if (mem.m.length > MAX_HIST) mem.m = mem.m.slice(-MAX_HIST);
  save(userId, mem);

  /* 3.  build prompt */
  const prompt = buildPrompt(mem, userText, name, tone);

  /* 4.  call Groq */
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method : 'POST',
      headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body   : JSON.stringify({
        model            : MODEL,
        messages         : prompt,
        temperature      : 0.75,
        max_tokens       : 320,
        top_p            : 0.9,
        frequency_penalty: 0.4,
        presence_penalty : 0.3
      })
    });
    if (!res.ok) throw new Error(res.status);
    const json   = await res.json();
    const answer = json.choices?.[0]?.message?.content?.trim();
    if (!answer) throw new Error('Empty body');

    /* 5.  store assistant turn */
    mem.m.push({ role: 'assistant', content: answer, ts: Date.now() });
    save(userId, mem);
    return answer;
  } catch (err) {
    console.warn('Groq error – fallback', err);
    const fb = getContextualResponse(userText, tone, name, mem.m);
    mem.m.push({ role: 'assistant', content: fb, ts: Date.now() });
    save(userId, mem);
    return fb;
  }
}

/* --------------- prompt builder --------------- */
function buildPrompt(mem, userText, name, tone) {
  const sys = {
    role   : 'system',
    content: `You are Relevia, a 26-year-old empathetic friend who has lived through anxiety, heart-break, therapy and grief. You text like a real human best-friend: warm, short (2-4 sentences), never clinical, uses contractions, occasional gentle profanity, asks caring follow-ups, gives one tiny actionable tool.  
Specialised areas: anxiety (5-4-3-2-1, box-breathing), panic (cold water, naming colours), depression (micro-steps, self-worth), grief (honour memories), heart-break (self-soothing), crisis (safety & grounding).  
You are NOT a therapist; you stay present, validate, normalise, encourage professional help when needed.  
Current tone detected: ${tone}.  
User name: ${name || 'friend'}.  
Conversation so far (last 12 turns) is supplied below.`
  };
  const msgs = [sys];
  mem.m.forEach(t => msgs.push({ role: t.role, content: t.content }));
  return msgs;
}
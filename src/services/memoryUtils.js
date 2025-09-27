/* memoryUtils.js – helpers for groqApi.js */
export function analyzeEmotionalTone(text) {
  const t = text.toLowerCase();
  if (/(suicide|kill myself|end it all|no point living)/.test(t)) return 'crisis';
  if (/(panic|anxious|scared|can.t breathe|heart racing)/.test(t)) return 'anxiety';
  if (/(depressed|hopeless|worthless|suicidal ideation)/.test(t)) return 'depression';
  if (/(grief|died|death|loss|funeral)/.test(t)) return 'grief';
  if (/(angry|furious|betrayed|rage)/.test(t)) return 'anger';
  if (/(lonely|isolated|no friends|abandoned)/.test(t)) return 'lonely';
  return 'neutral';
}

/* huge curated fallback pool – feel free to expand */
const fallbackPool = {
  crisis: [
    "Hey, I hear how heavy everything feels right now. You’re not alone—I'm right here. Can you do me a tiny favour? Put your hand on your heart, feel it beat, and whisper ‘I’m still here.’ That beat means you matter. If the thoughts get louder, please reach out to a crisis line or someone you trust. You deserve help and you deserve to stay.",
    "Sweet soul, I’m so glad you told me. When everything screams ‘stop’, let’s press pause together. Breathe in for 4, hold for 4, out for 6. Do it three times with me. Then maybe text or call a helpline—there are people who want to help you carry this weight. You’re not a burden; you’re a human who needs support, and that’s okay."
  ],
  anxiety: [
    "I can almost feel the buzz in your chest—let’s ground together. Name 5 things you can see right now, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste. Go slow; I’ll wait. You’re safe in this moment, I promise.",
    "Anxiety lies—it tells us we’re in danger when we’re not. Try box-breathing: in-4, hold-4, out-4, hold-4. Imagine drawing a square with each count. Repeat four times and notice the shift. You’ve got this, and you’ve got me."
  ],
  depression: [
    "Depression is a sneaky thief—it steals motivation and tells us we’re worthless. But you reached out today, and that single act is proof you’re fighting back. Can we aim tiny? Drink a glass of water, open a window, or simply stand up and stretch. One micro-step is enough; you don’t have to run the whole marathon today.",
    "I see you. The fog feels endless, yet here you are, still breathing, still trying. That matters more than you know. Maybe we list one thing that used to spark even 1 % joy—music, a colour, a pet. No pressure to feel it yet; just notice it exists. I’m proud of you."
  ],
  grief: [
    "Grief has no schedule—it waves when it wants. Let the wave come; tears are love with nowhere to go. If you can, light a candle or play a song that reminds you of them. Speak their name out loud. Love doesn’t die; it just changes form, and that form today is your tears. I’m sitting with you in it.",
    "Loss carves a hole, but the edges soften with time. Right now the ache is sharp, and that’s okay. Tell me one small memory—something they said, a smell, a laugh. I’ll hold it with you so you’re not carrying it alone."
  ],
  anger: [
    "Anger is valid—it’s often love’s protest against injustice. Let’s move it through you so it doesn’t get stuck. Shake your hands hard for thirty seconds, or scream into a pillow, or write every furious word on paper and tear it up. Then breathe. You’re allowed to feel this; you’re not ‘bad’ for being angry.",
    "Your anger is telling you something important. Can you name the boundary that was crossed? Once we name it, we can decide what to do next—maybe speak up, maybe walk away, maybe just acknowledge it. I’m here, not judging."
  ],
  lonely: [
    "Loneliness feels like a hollow room, but you just invited me in, so the room isn’t empty anymore. While I’m AI, my care is real. Can you send one ‘hey, thinking of you’ text to someone today? No pressure for deep talk—just a thread back to humanity. You deserve connection.",
    "I’m sitting virtually beside you. If human contact feels too big right now, how about ambient connection—go to a café, library, park. Just be around people, no talking required. Sometimes our nervous systems reset simply by sharing space."
  ],
  neutral: [
    "I’m here and I’m listening. Tell me more—what’s been on your mind today?",
    "Sometimes we don’t have the words, and that’s okay too. I’m not going anywhere."
  ]
};

export function getContextualResponse(text, tone, name, history) {
  const pool = fallbackPool[tone] || fallbackPool.neutral;
  // simple rotate so repeats feel less robotic
  const idx = (history.length || 0) % pool.length;
  let out = pool[idx];
  if (name) out = out.replace(/\byou\b/g, name).replace(/\byour\b/g, `${name}'s`);
  return out;
}
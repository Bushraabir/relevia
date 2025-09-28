/* safety.js – ultra-fast on-device crisis detector */
const CRISIS_RE = /(suicide|kill myself|end it all|no point living|i want to die)/i;

export function CrisisFilter(text) {
  if (!CRISIS_RE.test(text)) return null;
  return [
    "I care about you deeply. If you're thinking about ending your life, please reach out right now:",
    "US/Canada: 988 | UK: Samaritans 116 123 | Global: findahelpline.com",
    "You’re not alone—let’s breathe together until you feel safe to call."
  ].join(' ');
}
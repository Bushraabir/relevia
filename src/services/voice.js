/* voice.js – warm female voice + vibration pattern */
export function speak(text, onEnd) {
  if (!('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(text.replace(/[^\p{L}\p{N}\s]/gu, ''));
  u.voice = speechSynthesis.getVoices().find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) || null;
  u.rate = 0.88; u.pitch = 1.05; u.volume = 0.8;
  u.onend = onEnd;
  speechSynthesis.speak(u);

  // haptic breath pattern
  if ('vibrate' in navigator) {
    navigator.vibrate([200, 300, 400, 300, 200]); // in-out-in-out
  }
}
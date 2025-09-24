// src/services/memoryUtils.js
export const analyzeEmotionalTone = (text) => {
  const lowerText = text.toLowerCase();
  if (/(die|kill myself|suicide|no point in living)/i.test(lowerText)) return 'crisis';
  if (/(anxious|panic|scared|nervous|overwhelmed)/i.test(lowerText)) return 'anxiety';
  if (/(sad|depressed|hopeless|down|lonely|crying)/i.test(lowerText)) return 'sad';
  if (/(died|death|loss|lost|grief)/i.test(lowerText)) return 'grief';
  if (/(angry|mad|furious|frustrated)/i.test(lowerText)) return 'anger';
  return 'neutral';
};
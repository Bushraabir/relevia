import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Heart, Moon, Cloud, Flower, Star, Sun, Zap, Coffee,
  Bold, Italic, Underline, Highlighter, AlignLeft, AlignCenter, AlignRight,
  Type, Palette, Plus, X, Sparkles, RotateCcw, Save,
  TrendingUp, Shield, Download, Brain, Settings, HelpCircle,
  Eye, EyeOff, Key, FileText, Calendar, BarChart3, Target,
  Mic, MicOff, Volume2, VolumeX, Play, Pause, BookOpen,
  CheckCircle2, AlertCircle, Clock, Lightbulb, Activity,
  Search, Filter, SortDesc, Archive, Trash2, Edit3,
  ChevronDown, ChevronRight, Monitor, Smartphone, Tablet,
  Upload, Image, Link, Hash, Bookmark, Globe, Layers
} from 'lucide-react';

// Enhanced prompt categories with difficulty levels and therapeutic approaches
const promptLibrary = {
  beginner: {
    empathic: [
      "What are three small things that brought you comfort today?",
      "Describe a place where you feel completely safe.",
      "What would you say to comfort a friend feeling like you do now?",
      "Write about the last time you felt genuinely happy.",
      "What colors describe your mood today and why?",
      "What made you smile recently, even if just for a moment?",
      "Describe someone who makes you feel understood.",
      "What's one thing you're grateful for right now?"
    ],
    cbt: [
      "What is one thought that keeps coming back today?",
      "If this problem had a simple solution, what might it be?",
      "What would you tell a friend in your situation?",
      "What's one small step you could take toward feeling better?",
      "What evidence do you have that this feeling will pass?",
      "What assumptions might you be making about this situation?",
      "How might someone else view what you're going through?",
      "What would happen if you tried a different approach?"
    ],
    creative: [
      "If your day was a weather report, what would it say?",
      "Write a short letter to your past self from one year ago.",
      "Describe your ideal peaceful morning in detail.",
      "What song best matches your current emotions?",
      "If you could have a conversation with your feelings, what would you ask?",
      "Imagine your stress as a character - what would it look like?",
      "Write about your emotions as if they were colors painting a canvas.",
      "If your thoughts had a voice, what would they sound like?"
    ],
    mindfulness: [
      "What do you notice about your breathing right now?",
      "Describe five things you can sense in this moment.",
      "What thoughts are passing through your mind without judgment?",
      "How does your body feel as you sit here writing?",
      "What sounds can you hear around you right now?",
      "Notice the weight of your hands - what do you feel?",
      "What textures can you touch from where you're sitting?",
      "Observe your emotions like clouds passing by - what do you see?"
    ]
  },
  intermediate: [
    "Explore the connection between your physical sensations and emotions right now.",
    "What patterns do you notice in your thinking when you feel this way?",
    "How has your perspective on this situation changed over time?",
    "What would it look like to hold space for both your pain and your hope?",
    "Write about a time when you successfully navigated similar feelings.",
    "What story are you telling yourself about this experience? What other stories exist?",
    "How might your current challenge be connected to your personal growth?",
    "What would self-compassion look like in this specific situation?",
    "Explore the relationship between your expectations and your current reality.",
    "What would you discover if you approached this with curiosity instead of judgment?"
  ],
  advanced: [
    "Examine the story you're telling yourself about this experience. What alternative narratives exist?",
    "How might your current struggle be connected to your deeper values and growth?",
    "What would radical self-compassion look like in this moment?",
    "Explore the paradox of accepting difficult emotions while also working to change them.",
    "What would you discover if you approached this situation with curious detachment?",
    "How do your past experiences influence your interpretation of current events?",
    "What would it mean to find meaning in this difficult experience?",
    "Explore the tension between control and acceptance in your current situation.",
    "How might your suffering be connected to your capacity for empathy and connection?",
    "What would it look like to embrace the uncertainty in your life right now?"
  ]
};

// Enhanced mood tracking with energy levels, categories, and intensity
const moodCategories = {
  emotional: [
    { emoji: '😊', label: 'Joyful', color: 'bg-yellow-200 hover:bg-yellow-300', value: 0.9, energy: 0.6 },
    { emoji: '💝', label: 'Grateful', color: 'bg-pink-200 hover:bg-pink-300', value: 0.8, energy: 0.5 },
    { emoji: '😌', label: 'Content', color: 'bg-green-200 hover:bg-green-300', value: 0.6, energy: 0.3 },
    { emoji: '🙂', label: 'Hopeful', color: 'bg-blue-200 hover:bg-blue-300', value: 0.5, energy: 0.4 },
    { emoji: '😐', label: 'Neutral', color: 'bg-gray-200 hover:bg-gray-300', value: 0, energy: 0 },
    { emoji: '😔', label: 'Sad', color: 'bg-blue-300 hover:bg-blue-400', value: -0.6, energy: -0.3 },
    { emoji: '😟', label: 'Anxious', color: 'bg-orange-200 hover:bg-orange-300', value: -0.4, energy: 0.6 },
    { emoji: '😢', label: 'Overwhelmed', color: 'bg-purple-200 hover:bg-purple-300', value: -0.8, energy: -0.5 },
    { emoji: '😤', label: 'Frustrated', color: 'bg-red-200 hover:bg-red-300', value: -0.7, energy: 0.7 }
  ],
  energy: [
    { emoji: '⚡', label: 'Energized', color: 'bg-yellow-200 hover:bg-yellow-300', value: 0.8, energy: 0.9 },
    { emoji: '☕', label: 'Alert', color: 'bg-orange-200 hover:bg-orange-300', value: 0.5, energy: 0.7 },
    { emoji: '🌊', label: 'Calm', color: 'bg-blue-200 hover:bg-blue-300', value: 0.3, energy: 0.2 },
    { emoji: '🍃', label: 'Peaceful', color: 'bg-green-200 hover:bg-green-300', value: 0.4, energy: 0.1 },
    { emoji: '😴', label: 'Tired', color: 'bg-purple-200 hover:bg-purple-300', value: -0.2, energy: -0.4 },
    { emoji: '🌙', label: 'Drained', color: 'bg-indigo-200 hover:bg-indigo-300', value: -0.4, energy: -0.7 },
    { emoji: '🔋', label: 'Restless', color: 'bg-red-200 hover:bg-red-300', value: -0.1, energy: 0.8 }
  ],
  physical: [
    { emoji: '💪', label: 'Strong', color: 'bg-green-200 hover:bg-green-300', value: 0.7, energy: 0.8 },
    { emoji: '🧘', label: 'Relaxed', color: 'bg-purple-200 hover:bg-purple-300', value: 0.6, energy: 0.2 },
    { emoji: '🤕', label: 'Unwell', color: 'bg-red-200 hover:bg-red-300', value: -0.5, energy: -0.6 },
    { emoji: '😷', label: 'Under Weather', color: 'bg-gray-200 hover:bg-gray-300', value: -0.3, energy: -0.4 },
    { emoji: '🏃', label: 'Active', color: 'bg-blue-200 hover:bg-blue-300', value: 0.5, energy: 0.9 },
    { emoji: '🛌', label: 'Resting', color: 'bg-indigo-200 hover:bg-indigo-300', value: 0.2, energy: -0.2 }
  ]
};

// Advanced sentiment analysis with context awareness and therapeutic insights
const analyzeSentiment = (text, previousEntries = []) => {
  if (!text || text.length < 10) return { 
    polarity: 0, subjectivity: 0, arousal: 0, complexity: 0, coherence: 0, growth: 0,
    selfCompassion: 0, mindfulness: 0, resilience: 0, problemSolving: 0
  };
  
  const positiveWords = ['happy', 'joy', 'love', 'peace', 'hope', 'grateful', 'calm', 'better', 'good', 'positive', 'wonderful', 'amazing', 'blessed', 'thankful', 'proud', 'excited', 'optimistic', 'confident', 'serene', 'content'];
  const negativeWords = ['sad', 'pain', 'hurt', 'angry', 'fear', 'worried', 'anxious', 'depressed', 'lonely', 'lost', 'broken', 'difficult', 'struggling', 'terrible', 'awful', 'hopeless', 'frustrated', 'disappointed', 'overwhelmed', 'stressed'];
  const growthWords = ['learn', 'grow', 'understand', 'realize', 'discover', 'insight', 'progress', 'healing', 'journey', 'strength', 'resilience', 'courage', 'wisdom', 'perspective', 'change', 'transform', 'accept', 'forgive'];
  const complexityWords = ['however', 'although', 'despite', 'nevertheless', 'complex', 'nuanced', 'paradox', 'contradiction', 'balance', 'both', 'yet', 'still', 'ambivalent', 'mixed'];
  const selfCompassionWords = ['kind', 'gentle', 'patient', 'understanding', 'forgive', 'human', 'normal', 'okay', 'enough', 'worthy', 'deserving', 'compassion'];
  const mindfulnessWords = ['present', 'moment', 'aware', 'notice', 'observe', 'breath', 'body', 'sensation', 'feeling', 'here', 'now', 'mindful'];
  const resilienceWords = ['overcome', 'survive', 'endure', 'persevere', 'bounce', 'recover', 'adapt', 'cope', 'manage', 'handle', 'through', 'strong'];
  const problemSolvingWords = ['solution', 'solve', 'plan', 'strategy', 'approach', 'try', 'attempt', 'option', 'choice', 'decide', 'action', 'step'];
  
  const words = text.toLowerCase().split(/\W+/);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const totalWords = words.length;
  
  const posCount = words.filter(word => positiveWords.some(pw => word.includes(pw))).length;
  const negCount = words.filter(word => negativeWords.some(nw => word.includes(nw))).length;
  const growthCount = words.filter(word => growthWords.some(gw => word.includes(gw))).length;
  const complexityCount = words.filter(word => complexityWords.some(cw => word.includes(cw))).length;
  const selfCompassionCount = words.filter(word => selfCompassionWords.some(sc => word.includes(sc))).length;
  const mindfulnessCount = words.filter(word => mindfulnessWords.some(mw => word.includes(mw))).length;
  const resilienceCount = words.filter(word => resilienceWords.some(rw => word.includes(rw))).length;
  const problemSolvingCount = words.filter(word => problemSolvingWords.some(ps => word.includes(ps))).length;
  
  // Calculate coherence based on sentence structure and flow
  const avgSentenceLength = totalWords / Math.max(sentences.length, 1);
  const coherence = Math.min(1, avgSentenceLength / 15) * (sentences.length > 1 ? 1 : 0.5);
  
  return {
    polarity: Math.max(-1, Math.min(1, (posCount - negCount) / Math.max(totalWords * 0.1, 1))),
    subjectivity: Math.min(1, (posCount + negCount + growthCount) / Math.max(totalWords * 0.15, 1)),
    arousal: Math.min(1, words.filter(w => ['!', 'very', 'extremely', 'intense', 'overwhelming'].some(aw => w.includes(aw))).length / Math.max(totalWords * 0.05, 1)),
    complexity: Math.min(1, complexityCount / Math.max(totalWords * 0.05, 1)),
    coherence: coherence,
    growth: Math.min(1, growthCount / Math.max(totalWords * 0.08, 1)),
    selfCompassion: Math.min(1, selfCompassionCount / Math.max(totalWords * 0.05, 1)),
    mindfulness: Math.min(1, mindfulnessCount / Math.max(totalWords * 0.05, 1)),
    resilience: Math.min(1, resilienceCount / Math.max(totalWords * 0.05, 1)),
    problemSolving: Math.min(1, problemSolvingCount / Math.max(totalWords * 0.05, 1))
  };
};

// Enhanced smart intervention system with therapeutic approaches
const generateSmartIntervention = (sentiment, mood, timeOfDay, sessionLength, previousInterventions = []) => {
  const interventions = {
    grounding: [
      "Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.",
      "Take three deep breaths. With each exhale, let your shoulders drop a little more.",
      "Feel your feet on the ground. You are here, you are present, you are safe.",
      "Place your hand on your heart. Feel it beating steadily, supporting you through this moment.",
      "Look around and name three objects you can see. Notice their colors and textures.",
      "Press your palms together and feel the warmth and pressure. You are connected to yourself."
    ],
    reframing: [
      "What would you tell your best friend if they shared these exact thoughts with you?",
      "How might you view this situation differently in 5 years? What growth might come from this?",
      "This feeling is like weather - temporary, changing, part of a larger pattern.",
      "You've survived 100% of your difficult days so far. That's a perfect track record.",
      "What would happen if you assumed positive intent in this situation?",
      "Is this thought helpful right now? What would be more supportive to think instead?"
    ],
    selfCompassion: [
      "You're doing the best you can with the resources you have right now.",
      "It's okay to not be okay. Healing isn't linear, and you're exactly where you need to be.",
      "Speaking to yourself with the same kindness you'd show a dear friend is a radical act of love.",
      "Your feelings are messengers, not permanent residents. Thank them and let them pass through.",
      "What you're experiencing is part of being human. You are not alone in feeling this way.",
      "Place your hand on your chest and offer yourself the compassion you need right now."
    ],
    motivation: [
      "Every word you write is an act of courage and self-care.",
      "You're building emotional resilience simply by showing up here.",
      "Your willingness to explore your inner world is creating positive change.",
      "This practice of reflection is strengthening your capacity for growth.",
      "You are creating a sacred space for your thoughts and feelings.",
      "Your commitment to understanding yourself is a gift to your future self."
    ],
    mindfulness: [
      "Return to your breath. Each breath is an anchor to the present moment.",
      "Notice the thoughts without becoming them. You are the observer of your experience.",
      "What sensations do you feel in your body right now? Just notice without changing anything.",
      "Can you create a small space between you and your emotions? You are not your feelings.",
      "Breathe in awareness, breathe out tension. You are safe in this moment.",
      "Your awareness is like the sky - vast enough to hold all weather patterns of emotion."
    ]
  };
  
  let category = 'selfCompassion';
  if (sentiment.arousal > 0.6 || (mood.emotional?.value < -0.6)) category = 'grounding';
  else if (sentiment.polarity < -0.4 && sentiment.complexity > 0.3) category = 'reframing';
  else if (sentiment.growth > 0.4 || sentiment.resilience > 0.3) category = 'motivation';
  else if (sentiment.mindfulness > 0.3) category = 'mindfulness';
  
  // Avoid recently shown interventions
  const availableInterventions = interventions[category].filter(
    intervention => !previousInterventions.some(prev => prev.text === intervention)
  );
  
  if (availableInterventions.length === 0) {
    return interventions[category][Math.floor(Math.random() * interventions[category].length)];
  }
  
  return availableInterventions[Math.floor(Math.random() * availableInterventions.length)];
};

// Auto-save functionality with cloud sync simulation
const useAutoSave = (data, delay = 2000) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const timeoutRef = useRef(null);
  
  const saveData = useCallback(async (data) => {
    setIsSaving(true);
    setSaveError(null);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));
      
      // Save to localStorage (simulating cloud sync)
      const saveData = {
        ...data,
        lastModified: new Date().toISOString(),
        version: Date.now()
      };
      localStorage.setItem('journalDraft', JSON.stringify(saveData));
      
      setLastSaved(new Date());
      setIsSaving(false);
    } catch (error) {
      console.error('Auto-save failed:', error);
      setSaveError('Failed to save');
      setIsSaving(false);
    }
  }, []);
  
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (data.text && data.text.length > 20) {
      timeoutRef.current = setTimeout(() => {
        saveData(data);
      }, delay);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay, saveData]);
  
  return { isSaving, lastSaved, saveError };
};

// Enhanced voice features with better error handling
const useVoiceFeatures = () => {
  const [isReading, setIsReading] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voiceError, setVoiceError] = useState(null);
  const utteranceRef = useRef(null);
  
  useEffect(() => {
    const loadVoices = () => {
      try {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);
        if (availableVoices.length > 0 && !selectedVoice) {
          // Prefer calm, clear voices
          const preferredVoice = availableVoices.find(voice => 
            voice.name.toLowerCase().includes('samantha') || 
            voice.name.toLowerCase().includes('karen') ||
            voice.name.toLowerCase().includes('zira') ||
            voice.name.toLowerCase().includes('susan') ||
            (voice.name.toLowerCase().includes('female') && voice.lang.includes('en'))
          );
          setSelectedVoice(preferredVoice || availableVoices[0]);
        }
      } catch (error) {
        setVoiceError('Speech synthesis not supported');
      }
    };
    
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [selectedVoice]);
  
  const readText = (text) => {
    if (!text || voiceError) return;
    
    try {
      speechSynthesis.cancel();
      utteranceRef.current = new SpeechSynthesisUtterance(text);
      
      if (selectedVoice) {
        utteranceRef.current.voice = selectedVoice;
      }
      
      utteranceRef.current.rate = 0.75;
      utteranceRef.current.pitch = 1.0;
      utteranceRef.current.volume = 0.8;
      
      utteranceRef.current.onstart = () => setIsReading(true);
      utteranceRef.current.onend = () => setIsReading(false);
      utteranceRef.current.onerror = (error) => {
        console.error('Speech error:', error);
        setIsReading(false);
        setVoiceError('Speech playback error');
      };
      
      speechSynthesis.speak(utteranceRef.current);
    } catch (error) {
      setVoiceError('Unable to read text aloud');
    }
  };
  
  const stopReading = () => {
    speechSynthesis.cancel();
    setIsReading(false);
  };
  
  return { readText, stopReading, isReading, voices, selectedVoice, setSelectedVoice, voiceError };
};

// Progress tracking hook
const useProgressTracking = () => {
  const [streakCount, setStreakCount] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [achievements, setAchievements] = useState([]);
  
  const updateProgress = useCallback((entries) => {
    // Calculate streak
    const sortedEntries = [...entries].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.timestamp);
      entryDate.setHours(0, 0, 0, 0);
      
      if (entryDate.getTime() === currentDate.getTime()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (entryDate.getTime() === currentDate.getTime() + 24 * 60 * 60 * 1000) {
        // Allow for yesterday if no entry today
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    setStreakCount(streak);
    setTotalSessions(entries.length);
    
    // Check for achievements
    const newAchievements = [];
    if (entries.length >= 7 && !achievements.includes('first-week')) {
      newAchievements.push('first-week');
    }
    if (streak >= 7 && !achievements.includes('week-streak')) {
      newAchievements.push('week-streak');
    }
    if (entries.length >= 30 && !achievements.includes('month-milestone')) {
      newAchievements.push('month-milestone');
    }
    
    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
      return newAchievements;
    }
    return [];
  }, [achievements]);
  
  return { streakCount, totalSessions, achievements, updateProgress };
};

export default function AdvancedCalmJournal() {
  // Core states
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  
  // UI states
  const [activeTab, setActiveTab] = useState('write');
  const [showPrompt, setShowPrompt] = useState(true);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [promptDifficulty, setPromptDifficulty] = useState('beginner');
  const [promptCategory, setPromptCategory] = useState('empathic');
  const [showSettings, setShowSettings] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  
  // Mood and analytics
  const [mood, setMood] = useState({ energy: null, emotional: null, physical: null });
  const [moodCategory, setMoodCategory] = useState('emotional');
  const [moodIntensity, setMoodIntensity] = useState(5);
  const [sentimentData, setSentimentData] = useState({ 
    polarity: 0, subjectivity: 0, arousal: 0, complexity: 0, coherence: 0, growth: 0,
    selfCompassion: 0, mindfulness: 0, resilience: 0, problemSolving: 0
  });
  
  // Advanced features
  const [customPrompts, setCustomPrompts] = useState([]);
  const [entries, setEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMood, setFilterMood] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedEntry, setSelectedEntry] = useState(null);
  
  // Rich text and formatting
  const [fontSize, setFontSize] = useState('16px');
  const [lineHeight, setLineHeight] = useState('1.6');
  const [fontFamily, setFontFamily] = useState('Georgia');
  const [textAlign, setTextAlign] = useState('left');
  const [textColor, setTextColor] = useState('#374151');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [theme, setTheme] = useState('light');
  
  // Advanced functionality
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wordGoal, setWordGoal] = useState(null);
  const [timeGoal, setTimeGoal] = useState(null);
  const [sessionStart, setSessionStart] = useState(null);
  const [breaks, setBreaks] = useState([]);
  const [focusMode, setFocusMode] = useState(false);
  const [writingMode, setWritingMode] = useState('freeform');
  
  // Interventions and insights
  const [interventions, setInterventions] = useState([]);
  const [showIntervention, setShowIntervention] = useState(false);
  const [currentIntervention, setCurrentIntervention] = useState('');
  const [insights, setInsights] = useState([]);
  const [therapeuticGoals, setTherapeuticGoals] = useState([]);
  
  // Privacy and security
  const [privacyMode, setPrivacyMode] = useState(true);
  const [encryptionEnabled, setEncryptionEnabled] = useState(false);
  const [dataRetention, setDataRetention] = useState(365);
  const [shareAnalytics, setShareAnalytics] = useState(false);
  
  // Refs and hooks
  const textAreaRef = useRef(null);
  const interventionTimeoutRef = useRef(null);
  const { isSaving, lastSaved, saveError } = useAutoSave({ text, title, tags, mood });
  const { readText, stopReading, isReading, voices, selectedVoice, setSelectedVoice, voiceError } = useVoiceFeatures();
  const { streakCount, totalSessions, achievements, updateProgress } = useProgressTracking();
  
  // Initialize session
  useEffect(() => {
    if (!sessionStart && text.length > 0) {
      setSessionStart(new Date());
    }
  }, [text, sessionStart]);
  
  // Load saved data on mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem('journalDraft');
      const savedEntries = localStorage.getItem('journalEntries');
      const savedCustomPrompts = localStorage.getItem('customPrompts');
      const savedSettings = localStorage.getItem('journalSettings');
      
      if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        if (draft.text) setText(draft.text);
        if (draft.title) setTitle(draft.title);
        if (draft.tags) setTags(draft.tags);
      }
      
      if (savedEntries) {
        const parsedEntries = JSON.parse(savedEntries);
        setEntries(parsedEntries);
        updateProgress(parsedEntries);
      }
      
      if (savedCustomPrompts) {
        setCustomPrompts(JSON.parse(savedCustomPrompts));
      }
      
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        if (settings.theme) setTheme(settings.theme);
        if (settings.fontSize) setFontSize(settings.fontSize);
        if (settings.fontFamily) setFontFamily(settings.fontFamily);
        if (settings.promptDifficulty) setPromptDifficulty(settings.promptDifficulty);
        if (settings.promptCategory) setPromptCategory(settings.promptCategory);
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }, [updateProgress]);
  
  // Smart prompt selection
  useEffect(() => {
    const getSmartPrompt = () => {
      let prompts = [];
      if (promptDifficulty === 'beginner') {
        prompts = promptLibrary.beginner[promptCategory] || [];
      } else {
        prompts = promptLibrary[promptDifficulty] || [];
      }
      
      if (customPrompts.length > 0 && Math.random() < 0.3) {
        prompts = [...prompts, ...customPrompts];
      }
      
      return prompts[Math.floor(Math.random() * prompts.length)] || "What's on your mind today?";
    };
    
    setCurrentPrompt(getSmartPrompt());
  }, [promptDifficulty, promptCategory, customPrompts]);
  
  // Real-time analysis
  useEffect(() => {
    if (text.length > 50) {
      const sentiment = analyzeSentiment(text, entries);
      setSentimentData(sentiment);
      
      // Generate insights periodically
      if (text.length > 200 && Math.random() < 0.1) {
        generateInsight(sentiment);
      }
      
      // Trigger smart intervention
      const wordCount = text.split(' ').filter(w => w.length > 0).length;
      if (wordCount > 0 && wordCount % 100 === 0) {
        triggerSmartIntervention();
      }
    }
  }, [text, entries]);
  
  // Save entries to localStorage
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('journalEntries', JSON.stringify(entries));
    }
  }, [entries]);
  
  // Save settings
  useEffect(() => {
    const settings = {
      theme, fontSize, fontFamily, promptDifficulty, promptCategory,
      privacyMode, encryptionEnabled, dataRetention
    };
    localStorage.setItem('journalSettings', JSON.stringify(settings));
  }, [theme, fontSize, fontFamily, promptDifficulty, promptCategory, privacyMode, encryptionEnabled, dataRetention]);
  
  const generateInsight = (sentiment) => {
    const insightTemplates = [
      `Your writing shows ${sentiment.growth > 0.5 ? 'strong signs of personal growth and self-reflection' : 'authentic emotional processing'}.`,
      `The complexity in your thoughts (${Math.round(sentiment.complexity * 100)}%) suggests deep, nuanced thinking.`,
      `Your emotional awareness is evident through your ${sentiment.subjectivity > 0.7 ? 'highly personal' : 'balanced'} expression.`,
      `You're demonstrating ${sentiment.selfCompassion > 0.4 ? 'good self-compassion' : 'room to practice more self-kindness'}.`,
      `Your mindfulness level (${Math.round(sentiment.mindfulness * 100)}%) shows ${sentiment.mindfulness > 0.3 ? 'present-moment awareness' : 'potential for deeper presence'}.`,
      `The resilience in your words (${Math.round(sentiment.resilience * 100)}%) reflects your ${sentiment.resilience > 0.4 ? 'strong coping skills' : 'developing strength'}.`
    ];
    
    const insight = {
      id: Date.now(),
      text: insightTemplates[Math.floor(Math.random() * insightTemplates.length)],
      timestamp: new Date(),
      sentiment: sentiment,
      category: sentiment.growth > 0.4 ? 'growth' : sentiment.selfCompassion > 0.4 ? 'compassion' : 'processing'
    };
    
    setInsights(prev => [...prev.slice(-4), insight]);
  };
  
  const triggerSmartIntervention = () => {
    if (interventionTimeoutRef.current) clearTimeout(interventionTimeoutRef.current);
    
    interventionTimeoutRef.current = setTimeout(() => {
      const timeOfDay = new Date().getHours();
      const sessionLength = sessionStart ? (Date.now() - sessionStart.getTime()) / 1000 / 60 : 0;
      
      const intervention = generateSmartIntervention(
        sentimentData, 
        mood, 
        timeOfDay, 
        sessionLength, 
        interventions.slice(-5)
      );
      
      setCurrentIntervention(intervention);
      setShowIntervention(true);
      
      setTimeout(() => setShowIntervention(false), 15000);
    }, 3000);
  };
  
  const handleInterventionResponse = (helpful) => {
    const intervention = {
      id: Date.now(),
      text: currentIntervention,
      helpful,
      timestamp: new Date(),
      context: { 
        sentiment: sentimentData, 
        mood, 
        sessionLength: sessionStart ? (Date.now() - sessionStart.getTime()) / 1000 / 60 : 0,
        wordCount: text.split(' ').filter(w => w.length > 0).length
      }
    };
    
    setInterventions(prev => [...prev, intervention]);
    setShowIntervention(false);
  };
  
  const saveEntry = async () => {
    if (!text.trim()) return;
    
    const entry = {
      id: Date.now(),
      title: title || `Entry from ${new Date().toLocaleDateString()}`,
      text,
      tags,
      mood,
      moodIntensity,
      sentiment: sentimentData,
      wordCount: text.split(' ').filter(w => w.length > 0).length,
      sessionLength: sessionStart ? (Date.now() - sessionStart.getTime()) / 1000 / 60 : 0,
      timestamp: new Date(),
      prompt: showPrompt ? currentPrompt : null,
      promptCategory,
      promptDifficulty,
      writingMode
    };
    
    const newEntries = [entry, ...entries];
    setEntries(newEntries);
    
    // Check for new achievements
    const newAchievements = updateProgress(newEntries);
    if (newAchievements.length > 0) {
      setShowAchievements(true);
      setTimeout(() => setShowAchievements(false), 5000);
    }
    
    // Reset form
    setText('');
    setTitle('');
    setTags([]);
    setMood({ energy: null, emotional: null, physical: null });
    setMoodIntensity(5);
    setSessionStart(null);
    
    // Clear draft from localStorage
    localStorage.removeItem('journalDraft');
    
    // Show success notification
    showNotification('Entry saved successfully!', 'success');
  };
  
  const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-opacity duration-300 ${
      type === 'success' ? 'bg-green-500 text-white' :
      type === 'error' ? 'bg-red-500 text-white' :
      'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };
  
  const getFilteredEntries = () => {
    return entries
      .filter(entry => {
        const matchesSearch = entry.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (entry.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesMood = filterMood === 'all' || 
                          (entry.mood?.emotional?.label.toLowerCase() === filterMood.toLowerCase());
        return matchesSearch && matchesMood;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'date': return new Date(b.timestamp) - new Date(a.timestamp);
          case 'mood': return (b.sentiment?.polarity || 0) - (a.sentiment?.polarity || 0);
          case 'length': return b.wordCount - a.wordCount;
          case 'growth': return (b.sentiment?.growth || 0) - (a.sentiment?.growth || 0);
          default: return 0;
        }
      });
  };
  
  const getWritingStats = () => {
    const currentSession = {
      wordCount: text.split(' ').filter(w => w.length > 0).length,
      charCount: text.length,
      timeSpent: sessionStart ? Math.round((Date.now() - sessionStart.getTime()) / 1000 / 60) : 0,
      goalProgress: wordGoal ? Math.min(100, Math.round((text.split(' ').filter(w => w.length > 0).length / wordGoal) * 100)) : 0
    };
    
    const allTimeStats = entries.reduce((acc, entry) => ({
      totalEntries: acc.totalEntries + 1,
      totalWords: acc.totalWords + entry.wordCount,
      totalTime: acc.totalTime + (entry.sessionLength || 0),
      averageMood: acc.averageMood + (entry.sentiment?.polarity || 0),
      averageGrowth: acc.averageGrowth + (entry.sentiment?.growth || 0),
      averageLength: 0 // calculated below
    }), { totalEntries: 0, totalWords: 0, totalTime: 0, averageMood: 0, averageGrowth: 0 });
    
    if (allTimeStats.totalEntries > 0) {
      allTimeStats.averageMood = allTimeStats.averageMood / allTimeStats.totalEntries;
      allTimeStats.averageGrowth = allTimeStats.averageGrowth / allTimeStats.totalEntries;
      allTimeStats.averageLength = Math.round(allTimeStats.totalWords / allTimeStats.totalEntries);
    }
    
    return { currentSession, allTimeStats };
  };
  
  const exportData = (format = 'json') => {
    const data = {
      entries,
      customPrompts,
      interventions,
      insights,
      settings: { theme, fontSize, fontFamily, promptDifficulty, promptCategory },
      stats: {
        streakCount,
        totalSessions,
        achievements,
        ...getWritingStats().allTimeStats
      },
      metadata: {
        exportDate: new Date().toISOString(),
        totalEntries: entries.length,
        dateRange: entries.length > 0 ? {
          from: entries[entries.length - 1].timestamp,
          to: entries[0].timestamp
        } : null,
        version: '2.0'
      }
    };
    
    let content, filename, type;
    
    if (format === 'json') {
      content = JSON.stringify(data, null, 2);
      filename = `advanced-journal-export-${Date.now()}.json`;
      type = 'application/json';
    } else if (format === 'txt') {
      content = entries.map(entry => {
        const moodText = entry.mood?.emotional ? `Mood: ${entry.mood.emotional.emoji} ${entry.mood.emotional.label}` : '';
        const tagsText = (entry.tags || []).length > 0 ? `Tags: ${(entry.tags || []).join(', ')}` : '';
        return `${entry.title}\n${new Date(entry.timestamp).toLocaleString()}\n${moodText}\n${tagsText}\n${'-'.repeat(50)}\n${entry.text}\n\n`;
      }).join('\n');
      filename = `journal-entries-${Date.now()}.txt`;
      type = 'text/plain';
    } else if (format === 'csv') {
      const csvHeaders = 'Date,Title,Word Count,Mood,Sentiment,Growth Score,Tags\n';
      const csvRows = entries.map(entry => {
        const date = new Date(entry.timestamp).toISOString().split('T')[0];
        const mood = entry.mood?.emotional?.label || '';
        const sentiment = Math.round((entry.sentiment?.polarity || 0) * 100);
        const growth = Math.round((entry.sentiment?.growth || 0) * 100);
        const tags = (entry.tags || []).join(';');
        return `${date},"${entry.title.replace(/"/g, '""')}",${entry.wordCount},${mood},${sentiment},${growth},"${tags}"`;
      }).join('\n');
      content = csvHeaders + csvRows;
      filename = `journal-data-${Date.now()}.csv`;
      type = 'text/csv';
    }
    
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification(`Data exported as ${format.toUpperCase()}`, 'success');
  };
  
  const addCustomPrompt = () => {
    if (currentTag.trim()) {
      const newPrompts = [...customPrompts, currentTag.trim()];
      setCustomPrompts(newPrompts);
      localStorage.setItem('customPrompts', JSON.stringify(newPrompts));
      setCurrentTag('');
      showNotification('Custom prompt added!', 'success');
    }
  };
  
  const removeCustomPrompt = (index) => {
    const newPrompts = customPrompts.filter((_, i) => i !== index);
    setCustomPrompts(newPrompts);
    localStorage.setItem('customPrompts', JSON.stringify(newPrompts));
  };

  const renderWriteTab = () => (
    <div className="space-y-6">
      {/* Achievement Notification */}
      {showAchievements && achievements.length > 0 && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-4 rounded-2xl shadow-xl animate-pulse">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🏆</div>
            <div>
              <div className="font-bold">Achievement Unlocked!</div>
              <div className="text-sm opacity-90">
                {achievements.includes('first-week') && 'First Week Complete! '}
                {achievements.includes('week-streak') && 'Week Streak! '}
                {achievements.includes('month-milestone') && '30 Entries Milestone! '}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Smart Intervention Overlay */}
      {showIntervention && (
        <div className="fixed top-4 right-4 z-50 max-w-sm bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 shadow-xl intervention-enter">
          <div className="flex items-start gap-3">
            <Lightbulb size={20} className="text-indigo-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs text-indigo-600 font-medium mb-1">Mindful Moment</div>
              <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                {currentIntervention}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleInterventionResponse(true)}
                  className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs hover:bg-green-300 transition-colors"
                >
                  👍 Helpful
                </button>
                <button
                  onClick={() => handleInterventionResponse(false)}
                  className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs hover:bg-gray-300 transition-colors"
                >
                  ✋ Not now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Progress Tracker */}
      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target size={18} className="text-green-600" />
            <span className="font-medium text-slate-700">Today's Progress</span>
          </div>
          <div className="text-sm text-green-600 font-medium">{streakCount} day streak</div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">
              {text.split(' ').filter(w => w.length > 0).length}
            </div>
            <div className="text-xs text-slate-600">Words</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {sessionStart ? Math.round((Date.now() - sessionStart.getTime()) / 1000 / 60) : 0}m
            </div>
            <div className="text-xs text-slate-600">Time</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">{totalSessions}</div>
            <div className="text-xs text-slate-600">Total</div>
          </div>
        </div>
      </div>
      
      {/* Entry Header */}
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your entry a title (optional)"
          className="w-full px-4 py-3 bg-white/70 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all writing-flow"
        />
        
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && currentTag.trim()) {
                  setTags([...tags, currentTag.trim()]);
                  setCurrentTag('');
                }
              }}
              placeholder="Add tags..."
              className="px-3 py-2 bg-white/70 rounded-lg border border-slate-200 text-sm"
            />
            <button
              onClick={() => {
                if (currentTag.trim()) {
                  setTags([...tags, currentTag.trim()]);
                  setCurrentTag('');
                }
              }}
              className="px-3 py-2 bg-indigo-200 text-indigo-800 rounded-lg hover:bg-indigo-300 text-sm transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center gap-1"
                >
                  <Hash size={10} />
                  {tag}
                  <button
                    onClick={() => setTags(tags.filter((_, i) => i !== index))}
                    className="hover:text-blue-900 ml-1"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Mood Selector */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-medium text-slate-700 flex items-center">
            <Heart size={20} className="mr-2 text-pink-400" />
            How are you feeling?
          </h3>
          <div className="flex gap-2">
            {['emotional', 'energy', 'physical'].map(category => (
              <button
                key={category}
                onClick={() => setMoodCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors capitalize ${
                  moodCategory === category 
                  ? 'bg-pink-200 text-pink-800' 
                  : 'bg-white/60 hover:bg-white/80 text-slate-600'
                }`}
              >
                {category === 'emotional' && '💝'} 
                {category === 'energy' && '⚡'} 
                {category === 'physical' && '💪'} 
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {moodCategories[moodCategory].map((m, index) => (
            <button
              key={index}
              onClick={() => {
                setMood(prev => ({ ...prev, [moodCategory]: m }));
                // Add mood selection animation
                const btn = document.querySelector(`[data-mood="${m.label}"]`);
                if (btn) btn.classList.add('mood-selected');
              }}
              data-mood={m.label}
              className={`
                p-3 rounded-2xl transition-all duration-300 text-center group
                ${mood[moodCategory]?.label === m.label 
                  ? m.color + ' ring-2 ring-indigo-300 transform scale-105 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/80 hover:scale-102'
                }
              `}
            >
              <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{m.emoji}</div>
              <div className="text-xs text-slate-600 font-medium">{m.label}</div>
            </button>
          ))}
        </div>
        
        {/* Mood Intensity Slider */}
        {mood[moodCategory] && (
          <div className="mt-4">
            <label className="block text-sm text-slate-600 mb-2">
              Intensity: {moodIntensity}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={moodIntensity}
              onChange={(e) => setMoodIntensity(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        )}
      </div>

      {/* Smart Prompt System */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-slate-700 flex items-center">
            <Sparkles size={20} className="mr-2 text-indigo-400" />
            Writing Prompt
          </h3>
          <div className="flex gap-2">
            <select
              value={promptDifficulty}
              onChange={(e) => setPromptDifficulty(e.target.value)}
              className="px-3 py-2 bg-white/70 rounded-lg border border-slate-200 text-sm"
            >
              <option value="beginner">Gentle</option>
              <option value="intermediate">Deeper</option>
              <option value="advanced">Profound</option>
            </select>
            <select
              value={promptCategory}
              onChange={(e) => setPromptCategory(e.target.value)}
              className="px-3 py-2 bg-white/70 rounded-lg border border-slate-200 text-sm"
            >
              <option value="empathic">Empathic</option>
              <option value="cbt">CBT-Based</option>
              <option value="creative">Creative</option>
              <option value="mindfulness">Mindfulness</option>
            </select>
          </div>
        </div>
        
        {showPrompt && (
          <div className="p-6 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-2xl border border-blue-100/50">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-1 bg-white/60 rounded-full text-slate-600 capitalize">
                    {promptDifficulty} • {promptCategory}
                  </span>
                  {voices.length > 0 && !voiceError && (
                    <button
                      onClick={() => isReading ? stopReading() : readText(currentPrompt)}
                      className="p-1 bg-white/60 rounded-full hover:bg-white/80 text-slate-600 transition-colors"
                      title={isReading ? "Stop reading" : "Read prompt aloud"}
                    >
                      {isReading ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                  )}
                  <button
                    onClick={() => setCurrentPrompt(promptLibrary[promptDifficulty === 'beginner' ? 'beginner' : promptDifficulty][promptCategory === 'mindfulness' ? Math.random() > 0.5 ? 'empathic' : 'cbt' : promptCategory][Math.floor(Math.random() * (promptLibrary[promptDifficulty === 'beginner' ? 'beginner' : promptDifficulty][promptCategory] || promptLibrary.beginner.empathic).length)])}
                    className="p-1 bg-white/60 rounded-full hover:bg-white/80 text-slate-600 transition-colors"
                    title="Get new prompt"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>
                <p className="text-slate-700 text-lg leading-relaxed font-light italic">
                  "{currentPrompt}"
                </p>
              </div>
              <button
                onClick={() => setShowPrompt(false)}
                className="ml-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}
        
        {!showPrompt && (
          <div className="flex gap-2">
            <button
              onClick={() => setShowPrompt(true)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-200 to-purple-200 text-slate-700 rounded-full hover:from-indigo-300 hover:to-purple-300 transition-all duration-300 font-medium flex items-center gap-2"
            >
              <Sparkles size={16} />
              Show me a prompt
            </button>
            <button
              onClick={() => setWritingMode(writingMode === 'freeform' ? 'guided' : 'freeform')}
              className={`px-4 py-3 rounded-full text-sm transition-colors ${
                writingMode === 'guided' 
                ? 'bg-purple-200 text-purple-800' 
                : 'bg-white/60 hover:bg-white/80 text-slate-600'
              }`}
            >
              {writingMode === 'freeform' ? 'Switch to Guided' : 'Switch to Freeform'}
            </button>
          </div>
        )}
      </div>

      {/* Advanced Writing Toolbar */}
      <div className="p-4 bg-white/70 rounded-2xl border border-slate-200/50 space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Type size={16} className="text-slate-600" />
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="px-3 py-1 bg-white/80 rounded-lg border border-slate-200 text-sm"
            >
              <option value="14px">Small</option>
              <option value="16px">Medium</option>
              <option value="18px">Large</option>
              <option value="20px">X-Large</option>
              <option value="24px">XX-Large</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">Font:</span>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="px-3 py-1 bg-white/80 rounded-lg border border-slate-200 text-sm"
            >
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times</option>
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Courier New">Courier</option>
              <option value="Palatino">Palatino</option>
            </select>
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={() => setTextAlign('left')}
              className={`p-2 rounded-lg transition-colors ${textAlign === 'left' ? 'bg-indigo-200 text-indigo-700' : 'bg-white/60 hover:bg-white/80'}`}
            >
              <AlignLeft size={16} />
            </button>
            <button
              onClick={() => setTextAlign('center')}
              className={`p-2 rounded-lg transition-colors ${textAlign === 'center' ? 'bg-indigo-200 text-indigo-700' : 'bg-white/60 hover:bg-white/80'}`}
            >
              <AlignCenter size={16} />
            </button>
            <button
              onClick={() => setTextAlign('right')}
              className={`p-2 rounded-lg transition-colors ${textAlign === 'right' ? 'bg-indigo-200 text-indigo-700' : 'bg-white/60 hover:bg-white/80'}`}
            >
              <AlignRight size={16} />
            </button>
          </div>
          
          {(wordGoal || timeGoal) && (
            <div className="flex items-center gap-4">
              {wordGoal && (
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-lg">
                  <Target size={16} className="text-green-600" />
                  <span className="text-sm text-green-700">
                    {text.split(' ').filter(w => w.length > 0).length}/{wordGoal} words
                  </span>
                </div>
              )}
              {timeGoal && (
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-lg">
                  <Clock size={16} className="text-blue-600" />
                  <span className="text-sm text-blue-700">
                    {sessionStart ? Math.round((Date.now() - sessionStart.getTime()) / 1000 / 60) : 0}/{timeGoal}m
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Writing Area */}
      <div className="relative">
        <textarea
          ref={textAreaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            fontSize,
            fontFamily,
            textAlign,
            color: textColor,
            backgroundColor,
            lineHeight,
            minHeight: focusMode ? '80vh' : '400px'
          }}
          className={`w-full p-6 rounded-2xl border border-slate-200/50 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all duration-300 resize-none leading-relaxed placeholder-slate-400 writing-flow ${
            focusMode ? 'bg-white shadow-2xl' : 'bg-white/50'
          }`}
          placeholder={writingMode === 'guided' && showPrompt 
            ? "Let the prompt guide your thoughts... There's no right or wrong way to respond."
            : "Let your thoughts flow here... There's no wrong way to express what's in your heart."
          }
        />
        
        {/* Live Stats & Auto-save Indicator */}
        <div className="absolute bottom-4 right-4 flex items-center gap-4 text-xs">
          {isSaving && (
            <div className="flex items-center gap-2 bg-white/90 px-3 py-2 rounded-lg shadow-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-slate-600">Saving...</span>
            </div>
          )}
          {lastSaved && !isSaving && (
            <div className="bg-white/90 px-3 py-2 rounded-lg shadow-sm">
              <span className="text-green-600">✓ Saved {lastSaved.toLocaleTimeString()}</span>
            </div>
          )}
          {saveError && (
            <div className="bg-red-100 px-3 py-2 rounded-lg shadow-sm">
              <span className="text-red-600">⚠ {saveError}</span>
            </div>
          )}
          {text.length > 0 && (
            <div className="bg-white/90 px-3 py-2 rounded-lg shadow-sm text-slate-600">
              {text.split(' ').filter(w => w.length > 0).length} words
            </div>
          )}
          {sessionStart && (
            <div className="bg-white/90 px-3 py-2 rounded-lg shadow-sm text-slate-600">
              {Math.round((Date.now() - sessionStart.getTime()) / 1000 / 60)}m
            </div>
          )}
        </div>
      </div>

      {/* Real-time Sentiment Analysis */}
      {text.length > 100 && (
        <div className="p-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-2xl border border-indigo-100/30">
          <h4 className="text-sm font-medium text-slate-600 mb-3 flex items-center">
            <Activity size={16} className="mr-2 text-indigo-600" />
            Live Writing Analysis
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="text-center">
              <div className={`text-lg font-semibold ${sentimentData.polarity > 0 ? 'text-green-600' : sentimentData.polarity < 0 ? 'text-blue-600' : 'text-gray-600'}`}>
                {sentimentData.polarity > 0.2 ? '😊' : sentimentData.polarity < -0.2 ? '🌧️' : '😐'}
              </div>
              <div className="text-slate-500">Emotional Tone</div>
              <div className="text-xs text-slate-400">
                {Math.round(sentimentData.polarity * 100)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-indigo-600 font-semibold text-lg">
                {Math.round(sentimentData.growth * 100)}%
              </div>
              <div className="text-slate-500">Growth</div>
            </div>
            <div className="text-center">
              <div className="text-purple-600 font-semibold text-lg">
                {Math.round(sentimentData.selfCompassion * 100)}%
              </div>
              <div className="text-slate-500">Self-Compassion</div>
            </div>
            <div className="text-center">
              <div className="text-green-600 font-semibold text-lg">
                {Math.round(sentimentData.mindfulness * 100)}%
              </div>
              <div className="text-slate-500">Mindfulness</div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Insights */}
      {insights.length > 0 && (
        <div className="p-4 bg-gradient-to-r from-yellow-50/50 to-orange-50/50 rounded-2xl border border-yellow-100/30">
          <h4 className="text-sm font-medium text-slate-600 mb-3 flex items-center">
            <Brain size={16} className="mr-2 text-yellow-600" />
            Personal Insights
          </h4>
          <div className="space-y-2">
            {insights.slice(-2).map(insight => (
              <div key={insight.id} className="flex items-start gap-2">
                <div className="text-sm">💡</div>
                <p className="text-sm text-slate-600 italic flex-1">
                  {insight.text}
                </p>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  insight.category === 'growth' ? 'bg-green-100 text-green-700' :
                  insight.category === 'compassion' ? 'bg-pink-100 text-pink-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {insight.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setFocusMode(!focusMode)}
            className={`px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-2 ${
              focusMode ? 'bg-purple-200 text-purple-800' : 'bg-white/60 hover:bg-white/80 text-slate-600'
            }`}
          >
            <Monitor size={16} />
            {focusMode ? 'Exit Focus' : 'Focus Mode'}
          </button>
          <button
            onClick={() => setWordGoal(wordGoal ? null : 200)}
            className={`px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-2 ${
              wordGoal ? 'bg-green-200 text-green-800' : 'bg-white/60 hover:bg-white/80 text-slate-600'
            }`}
          >
            <Target size={16} />
            {wordGoal ? `${wordGoal} words` : 'Set Goal'}
          </button>
          <button
            onClick={() => setTimeGoal(timeGoal ? null : 15)}
            className={`px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-2 ${
              timeGoal ? 'bg-blue-200 text-blue-800' : 'bg-white/60 hover:bg-white/80 text-slate-600'
            }`}
          >
            <Clock size={16} />
            {timeGoal ? `${timeGoal}m` : 'Set Timer'}
          </button>
          {voices.length > 0 && !voiceError && (
            <button
              onClick={() => isReading ? stopReading() : readText(text)}
              disabled={!text.trim()}
              className="px-4 py-2 bg-indigo-200 text-indigo-800 rounded-full hover:bg-indigo-300 disabled:bg-gray-200 disabled:text-gray-500 text-sm flex items-center gap-2 transition-colors"
            >
              {isReading ? <Pause size={16} /> : <Play size={16} />}
              {isReading ? 'Stop' : 'Listen'}
            </button>
          )}
        </div>
        
        <button
          onClick={saveEntry}
          disabled={!text.trim()}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-sm flex items-center gap-2 ${
            text.trim() 
              ? 'bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 text-white transform hover:scale-105' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Save size={16} />
          Save Entry
        </button>
      </div>
    </div>
  );

  const renderEntriesTab = () => {
    const filteredEntries = getFilteredEntries();
    
    return (
      <div className="space-y-6">
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your entries..."
              className="w-full pl-10 pr-4 py-3 bg-white/70 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <select
            value={filterMood}
            onChange={(e) => setFilterMood(e.target.value)}
            className="px-4 py-3 bg-white/70 rounded-xl border border-slate-200"
          >
            <option value="all">All Moods</option>
            <option value="joyful">Joyful</option>
            <option value="grateful">Grateful</option>
            <option value="content">Content</option>
            <option value="sad">Sad</option>
            <option value="anxious">Anxious</option>
            <option value="overwhelmed">Overwhelmed</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-white/70 rounded-xl border border-slate-200"
          >
            <option value="date">Latest First</option>
            <option value="mood">By Mood</option>
            <option value="length">By Length</option>
            <option value="growth">By Growth</option>
          </select>
        </div>

        {/* Entry Stats */}
        {entries.length > 0 && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{entries.length}</div>
                <div className="text-sm text-slate-600">Total Entries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{streakCount}</div>
                <div className="text-sm text-slate-600">Day Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(entries.reduce((sum, e) => sum + e.wordCount, 0) / entries.length)}
                </div>
                <div className="text-sm text-slate-600">Avg Words</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-600">
                  {Math.round(entries.reduce((sum, e) => sum + (e.sentiment?.polarity || 0), 0) / entries.length * 100)}%
                </div>
                <div className="text-sm text-slate-600">Avg Mood</div>
              </div>
            </div>
          </div>
        )}

        {/* Entries List */}
        <div className="space-y-4">
          {filteredEntries.length > 0 ? (
            filteredEntries.map(entry => (
              <div key={entry.id} className="p-6 bg-white/70 rounded-2xl border border-slate-200/50 hover:bg-white/80 transition-all cursor-pointer"
                   onClick={() => setSelectedEntry(selectedEntry?.id === entry.id ? null : entry)}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-slate-800">{entry.title}</h3>
                    <p className="text-sm text-slate-500">
                      {new Date(entry.timestamp).toLocaleDateString(undefined, { 
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                      })} • {entry.wordCount} words
                      {entry.sessionLength && ` • ${Math.round(entry.sessionLength)}m session`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {entry.mood?.emotional && (
                      <div className="flex items-center gap-1">
                        <span className="text-lg">{entry.mood.emotional.emoji}</span>
                        <span className="text-xs text-slate-500">{entry.moodIntensity}/10</span>
                      </div>
                    )}
                    {entry.sentiment && (
                      <div className="flex gap-1">
                        <div className={`w-3 h-3 rounded-full ${
                          entry.sentiment.polarity > 0.2 ? 'bg-green-400' :
                          entry.sentiment.polarity < -0.2 ? 'bg-blue-400' : 'bg-gray-400'
                        }`} title="Emotional tone"></div>
                        <div className={`w-3 h-3 rounded-full opacity-70 ${
                          entry.sentiment.growth > 0.4 ? 'bg-purple-400' : 'bg-gray-300'
                        }`} title="Growth indicator"></div>
                      </div>
                    )}
                    <ChevronDown 
                      size={16} 
                      className={`text-slate-400 transition-transform ${
                        selectedEntry?.id === entry.id ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                </div>
                
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(entry.tags || []).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <p className="text-slate-700 leading-relaxed mb-4">
                  {selectedEntry?.id === entry.id 
                    ? entry.text 
                    : entry.text.length > 300 
                      ? `${entry.text.substring(0, 300)}...` 
                      : entry.text
                  }
                </p>
                
                {selectedEntry?.id === entry.id && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
                      <div>
                        <div className="font-semibold text-slate-600">Growth</div>
                        <div className="text-purple-600">{Math.round((entry.sentiment?.growth || 0) * 100)}%</div>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-600">Self-Compassion</div>
                        <div className="text-pink-600">{Math.round((entry.sentiment?.selfCompassion || 0) * 100)}%</div>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-600">Mindfulness</div>
                        <div className="text-green-600">{Math.round((entry.sentiment?.mindfulness || 0) * 100)}%</div>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-600">Complexity</div>
                        <div className="text-indigo-600">{Math.round((entry.sentiment?.complexity || 0) * 100)}%</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {entry.prompt && selectedEntry?.id === entry.id && (
                  <p className="text-sm text-slate-500 italic bg-slate-50 p-3 rounded-lg mt-4">
                    Prompt: "{entry.prompt}"
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">No entries found</h3>
              <p className="text-slate-500">
                {entries.length === 0 ? 'Start writing your first entry!' : 'Try adjusting your search or filters.'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAnalyticsTab = () => {
    const { currentSession, allTimeStats } = getWritingStats();
    
    return (
      <div className="space-y-6">
        {/* Current Session Stats */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
          <h3 className="text-lg font-medium text-slate-700 mb-4 flex items-center">
            <Clock size={20} className="mr-2 text-blue-600" />
            Current Session
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{currentSession.wordCount}</div>
              <div className="text-sm text-slate-600">Words Written</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{currentSession.charCount}</div>
              <div className="text-sm text-slate-600">Characters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{currentSession.timeSpent}m</div>
              <div className="text-sm text-slate-600">Time Spent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{currentSession.goalProgress}%</div>
              <div className="text-sm text-slate-600">Goal Progress</div>
            </div>
          </div>
        </div>

        {/* All-Time Stats */}
        <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
          <h3 className="text-lg font-medium text-slate-700 mb-4 flex items-center">
            <BarChart3 size={20} className="mr-2 text-green-600" />
            All-Time Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{allTimeStats.totalEntries}</div>
              <div className="text-sm text-slate-600">Total Entries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{allTimeStats.totalWords.toLocaleString()}</div>
              <div className="text-sm text-slate-600">Total Words</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600">{allTimeStats.averageLength}</div>
              <div className="text-sm text-slate-600">Avg Words/Entry</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600">{Math.round(allTimeStats.totalTime)}m</div>
              <div className="text-sm text-slate-600">Total Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{Math.round(allTimeStats.averageGrowth * 100)}%</div>
              <div className="text-sm text-slate-600">Avg Growth</div>
            </div>
          </div>
        </div>

        {/* Streak & Achievements */}
        <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100">
          <h3 className="text-lg font-medium text-slate-700 mb-4 flex items-center">
            <Star size={20} className="mr-2 text-yellow-600" />
            Progress & Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{streakCount}</div>
              <div className="text-sm text-slate-600 mb-2">Day Streak</div>
              <div className="w-full bg-yellow-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (streakCount / 30) * 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-slate-500 mt-1">Goal: 30 days</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{achievements.length}</div>
              <div className="text-sm text-slate-600 mb-2">Achievements</div>
              <div className="flex justify-center gap-1">
                {['first-week', 'week-streak', 'month-milestone'].map(achievement => (
                  <div key={achievement} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    achievements.includes(achievement) ? 'bg-orange-200 text-orange-700' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {achievement === 'first-week' && '🎯'}
                    {achievement === 'week-streak' && '🔥'}
                    {achievement === 'month-milestone' && '🏆'}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {Math.round(allTimeStats.averageMood * 100)}
              </div>
              <div className="text-sm text-slate-600 mb-2">Mood Trend</div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                allTimeStats.averageMood > 0.2 ? 'bg-green-100 text-green-700' :
                allTimeStats.averageMood < -0.2 ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {allTimeStats.averageMood > 0.2 ? 'Improving' :
                 allTimeStats.averageMood < -0.2 ? 'Processing' : 'Stable'}
              </div>
            </div>
          </div>
        </div>

        {/* Intervention Effectiveness */}
        {interventions.length > 0 && (
          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
            <h3 className="text-lg font-medium text-slate-700 mb-4 flex items-center">
              <Brain size={20} className="mr-2 text-purple-600" />
              AI Support Effectiveness
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{interventions.length}</div>
                <div className="text-sm text-slate-600">Total Suggestions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">
                  {interventions.filter(i => i.helpful).length}
                </div>
                <div className="text-sm text-slate-600">Helpful</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-600">
                  {Math.round((interventions.filter(i => i.helpful).length / Math.max(interventions.length, 1)) * 100)}%
                </div>
                <div className="text-sm text-slate-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-violet-600">{insights.length}</div>
                <div className="text-sm text-slate-600">Insights Generated</div>
              </div>
            </div>
          </div>
        )}

        {/* Export Options */}
        <div className="p-6 bg-white/70 rounded-2xl border border-slate-200/50">
          <h3 className="text-lg font-medium text-slate-700 mb-4 flex items-center">
            <Download size={20} className="mr-2 text-slate-600" />
            Export Your Data
          </h3>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => exportData('json')}
              className="px-4 py-2 bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300 transition-colors flex items-center gap-2"
            >
              <FileText size={16} />
              Export as JSON
            </button>
            <button
              onClick={() => exportData('txt')}
              className="px-4 py-2 bg-green-200 text-green-800 rounded-lg hover:bg-green-300 transition-colors flex items-center gap-2"
            >
              <BookOpen size={16} />
              Export as Text
            </button>
            <button
              onClick={() => exportData('csv')}
              className="px-4 py-2 bg-purple-200 text-purple-800 rounded-lg hover:bg-purple-300 transition-colors flex items-center gap-2"
            >
              <BarChart3 size={16} />
              Export as CSV
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSettingsTab = () => (
    <div className="space-y-6">
      {/* Privacy Settings */}
      <div className="p-6 bg-white/70 rounded-2xl border border-slate-200/50">
        <h3 className="text-lg font-medium text-slate-700 mb-4 flex items-center">
          <Shield size={20} className="mr-2 text-green-600" />
          Privacy & Security
        </h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <span className="text-slate-700 font-medium">Privacy Mode</span>
              <p className="text-sm text-slate-500">All processing happens locally on your device</p>
            </div>
            <input
              type="checkbox"
              checked={privacyMode}
              onChange={(e) => setPrivacyMode(e.target.checked)}
              className="rounded w-5 h-5"
            />
          </label>
          <label className="flex items-center justify-between">
            <div>
              <span className="text-slate-700 font-medium">Enable Data Encryption</span>
              <p className="text-sm text-slate-500">Encrypt your journal entries and personal data</p>
            </div>
            <input
              type="checkbox"
              checked={encryptionEnabled}
              onChange={(e) => setEncryptionEnabled(e.target.checked)}
              className="rounded w-5 h-5"
            />
          </label>
          <div>
            <label className="block text-slate-700 font-medium mb-2">Data Retention Period</label>
            <select
              value={dataRetention}
              onChange={(e) => setDataRetention(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-white/80 rounded-lg border border-slate-200"
            >
              <option value={30}>30 days</option>
              <option value={90}>90 days</option>
              <option value={365}>1 year</option>
              <option value={-1}>Forever</option>
            </select>
          </div>
          <label className="flex items-center justify-between">
            <div>
              <span className="text-slate-700 font-medium">Share Anonymous Analytics</span>
              <p className="text-sm text-slate-500">Help improve the app with anonymous usage data</p>
            </div>
            <input
              type="checkbox"
              checked={shareAnalytics}
              onChange={(e) => setShareAnalytics(e.target.checked)}
              className="rounded w-5 h-5"
            />
          </label>
        </div>
      </div>

      {/* Voice Settings */}
      {voices.length > 0 && (
        <div className="p-6 bg-white/70 rounded-2xl border border-slate-200/50">
          <h3 className="text-lg font-medium text-slate-700 mb-4 flex items-center">
            <Volume2 size={20} className="mr-2 text-blue-600" />
            Voice Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-600 mb-2">Preferred Voice</label>
              <select
                value={selectedVoice?.name || ''}
                onChange={(e) => {
                  const voice = voices.find(v => v.name === e.target.value);
                  setSelectedVoice(voice);
                }}
                className="w-full px-3 py-2 bg-white/80 rounded-lg border border-slate-200"
              >
                {voices.map(voice => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>
            {voiceError && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {voiceError}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Writing Preferences */}
      <div className="p-6 bg-white/70 rounded-2xl border border-slate-200/50">
        <h3 className="text-lg font-medium text-slate-700 mb-4 flex items-center">
          <Edit3 size={20} className="mr-2 text-indigo-600" />
          Writing Preferences
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-2">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-3 py-2 bg-white/80 rounded-lg border border-slate-200"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="sepia">Sepia</option>
              <option value="forest">Forest</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-2">Default Font Size</label>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-full px-3 py-2 bg-white/80 rounded-lg border border-slate-200"
              >
                <option value="14px">Small</option>
                <option value="16px">Medium</option>
                <option value="18px">Large</option>
                <option value="20px">Extra Large</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2">Line Height</label>
              <select
                value={lineHeight}
                onChange={(e) => setLineHeight(e.target.value)}
                className="w-full px-3 py-2 bg-white/80 rounded-lg border border-slate-200"
              >
                <option value="1.4">Compact</option>
                <option value="1.6">Normal</option>
                <option value="1.8">Relaxed</option>
                <option value="2.0">Spacious</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-2">Font Family</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full px-3 py-2 bg-white/80 rounded-lg border border-slate-200"
            >
              <option value="Georgia">Georgia (Serif)</option>
              <option value="Times New Roman">Times New Roman (Serif)</option>
              <option value="Arial">Arial (Sans-serif)</option>
              <option value="Helvetica">Helvetica (Sans-serif)</option>
              <option value="Courier New">Courier New (Monospace)</option>
              <option value="Palatino">Palatino (Serif)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Prompt Management */}
      <div className="p-6 bg-white/70 rounded-2xl border border-slate-200/50">
        <h3 className="text-lg font-medium text-slate-700 mb-4 flex items-center">
          <Sparkles size={20} className="mr-2 text-yellow-600" />
          Custom Prompts
        </h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              placeholder="Add your own writing prompt..."
              className="flex-1 px-4 py-2 bg-white/80 rounded-lg border border-slate-200"
              onKeyPress={(e) => e.key === 'Enter' && addCustomPrompt()}
            />
            <button
              onClick={addCustomPrompt}
              className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded-lg hover:bg-yellow-300 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          {customPrompts.length > 0 && (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {customPrompts.map((prompt, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm text-slate-700 italic">"{prompt}"</span>
                  <button
                    onClick={() => removeCustomPrompt(index)}
                    className="text-red-400 hover:text-red-600 transition-colors ml-3"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Goal Settings */}
      <div className="p-6 bg-white/70 rounded-2xl border border-slate-200/50">
        <h3 className="text-lg font-medium text-slate-700 mb-4 flex items-center">
          <Target size={20} className="mr-2 text-green-600" />
          Default Goals
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-600 mb-2">Default Word Goal</label>
            <input
              type="number"
              value={wordGoal || ''}
              onChange={(e) => setWordGoal(e.target.value ? parseInt(e.target.value) : null)}
              placeholder="e.g., 200"
              className="w-full px-3 py-2 bg-white/80 rounded-lg border border-slate-200"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-2">Default Time Goal (minutes)</label>
            <input
              type="number"
              value={timeGoal || ''}
              onChange={(e) => setTimeGoal(e.target.value ? parseInt(e.target.value) : null)}
              placeholder="e.g., 15"
              className="w-full px-3 py-2 bg-white/80 rounded-lg border border-slate-200"
            />
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="p-6 bg-white/70 rounded-2xl border border-slate-200/50">
        <h3 className="text-lg font-medium text-slate-700 mb-4 flex items-center">
          <Settings size={20} className="mr-2 text-slate-600" />
          Data Management
        </h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={() => exportData('json')}
              className="flex-1 px-4 py-3 bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300 transition-colors flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Backup All Data
            </button>
            <button
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                input.onchange = (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      try {
                        const data = JSON.parse(e.target.result);
                        if (data.entries) setEntries(data.entries);
                        if (data.customPrompts) setCustomPrompts(data.customPrompts);
                        showNotification('Data restored successfully!', 'success');
                      } catch (error) {
                        showNotification('Invalid backup file', 'error');
                      }
                    };
                    reader.readAsText(file);
                  }
                };
                input.click();
              }}
              className="flex-1 px-4 py-3 bg-green-200 text-green-800 rounded-lg hover:bg-green-300 transition-colors flex items-center justify-center gap-2"
            >
              <Upload size={16} />
              Restore Backup
            </button>
          </div>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear all entries? This cannot be undone.')) {
                setEntries([]);
                setInterventions([]);
                setInsights([]);
                localStorage.removeItem('journalEntries');
                localStorage.removeItem('journalDraft');
                showNotification('All data cleared', 'success');
              }
            }}
            className="w-full px-4 py-3 bg-red-200 text-red-800 rounded-lg hover:bg-red-300 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 size={16} />
            Clear All Data
          </button>
        </div>
      </div>

      {/* About */}
      <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
        <h3 className="text-lg font-medium text-slate-700 mb-4 flex items-center">
          <HelpCircle size={20} className="mr-2 text-indigo-600" />
          About This Journal
        </h3>
        <div className="space-y-3 text-sm text-slate-600">
          <p>
            This advanced digital journal uses AI-powered sentiment analysis and therapeutic techniques 
            to support your mental health and personal growth journey.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-green-600" />
              <span>Privacy First</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain size={14} className="text-indigo-600" />
              <span>AI Enhanced</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-purple-600" />
              <span>Real-time Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={14} className="text-pink-600" />
              <span>Mental Health Focused</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 italic">
            Version 2.0 • All analysis happens locally • No data is sent to external servers
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 
      theme === 'sepia' ? 'bg-amber-50' : 
      theme === 'forest' ? 'bg-green-50' :
      'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }`}>
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-blue-200 opacity-30 animate-pulse">
          <Cloud size={40} />
        </div>
        <div className="absolute top-40 right-20 text-purple-200 opacity-40 animate-bounce" style={{ animationDuration: '4s' }}>
          <Flower size={30} />
        </div>
        <div className="absolute bottom-32 left-20 text-indigo-200 opacity-25 animate-pulse" style={{ animationDelay: '2s' }}>
          <Moon size={35} />
        </div>
        <div className="absolute top-1/2 right-1/4 text-pink-200 opacity-20 animate-pulse" style={{ animationDelay: '3s' }}>
          <Star size={25} />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-6xl">
          {/* Enhanced Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className={`text-4xl font-light tracking-wide ${
                theme === 'dark' ? 'text-white' : 'text-slate-700'
              }`}>
                Tour personal journaling diary
              </h1>
              <div className="flex gap-2">
                <div className="p-2 bg-white/60 rounded-full backdrop-blur-sm" title="AI-Powered Analytics">
                  <Brain size={20} className="text-indigo-600" />
                </div>
                <div className="p-2 bg-white/60 rounded-full backdrop-blur-sm" title="Privacy Protected">
                  <Shield size={20} className="text-green-600" />
                </div>
                <div className="p-2 bg-white/60 rounded-full backdrop-blur-sm" title="Voice Enabled">
                  <Volume2 size={20} className="text-blue-600" />
                </div>
                <div className="p-2 bg-white/60 rounded-full backdrop-blur-sm" title={`${streakCount} Day Streak`}>
                  <Star size={20} className="text-yellow-600" />
                </div>
              </div>
            </div>
            <p className={`text-lg font-light italic ${
              theme === 'dark' ? 'text-gray-300' : 'text-slate-500'
            }`}>
              Advanced AI-enhanced journaling with privacy-first design
            </p>
          </div>

          {/* Main Application Container */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200/50 bg-white/60 backdrop-blur-sm">
              {[
                { id: 'write', label: 'Write', icon: Edit3 },
                { id: 'entries', label: 'My Entries', icon: BookOpen, badge: entries.length },
                { id: 'analytics', label: 'Insights', icon: BarChart3 },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 font-medium transition-all relative ${
                    activeTab === tab.id
                      ? 'bg-indigo-100 text-indigo-700 border-b-2 border-indigo-300'
                      : 'text-slate-600 hover:bg-white/60'
                  }`}
                >
                  <tab.icon size={18} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {tab.badge > 99 ? '99+' : tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8 min-h-[600px] bg-gradient-to-br from-white/40 to-white/20">
              {activeTab === 'write' && renderWriteTab()}
              {activeTab === 'entries' && renderEntriesTab()}
              {activeTab === 'analytics' && renderAnalyticsTab()}
              {activeTab === 'settings' && renderSettingsTab()}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className={`text-sm font-light italic ${
              theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
            }`}>
              Your thoughts are safe, your growth is tracked, and your journey matters.
            </p>
            <div className="flex justify-center items-center gap-6 mt-4 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <Shield size={12} className="text-green-500" />
                Privacy First
              </div>
              <div className="flex items-center gap-1">
                <Brain size={12} className="text-indigo-500" />
                AI Enhanced
              </div>
              <div className="flex items-center gap-1">
                <Activity size={12} className="text-purple-500" />
                Real-time Analytics
              </div>
              <div className="flex items-center gap-1">
                <Heart size={12} className="text-pink-500" />
                Mental Health Focused
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Floating Action Button */}
      {activeTab !== 'write' && (
        <button
          onClick={() => setActiveTab('write')}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full shadow-2xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center z-50 group"
          title="Quick Write"
        >
          <Edit3 size={20} />
          <div className="absolute -top-12 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Quick Write
          </div>
        </button>
      )}

      {/* Accessibility Features */}
      <div className="fixed bottom-4 left-4 flex flex-col gap-2 z-40">
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors group"
          title="Toggle Fullscreen"
        >
          <Monitor size={16} className="text-slate-600" />
          <div className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Fullscreen
          </div>
        </button>
        <button
          onClick={() => {
            const root = document.documentElement;
            const currentSize = parseFloat(getComputedStyle(root).fontSize);
            root.style.fontSize = currentSize > 16 ? '16px' : '18px';
          }}
          className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors group"
          title="Toggle Font Size"
        >
          <Type size={16} className="text-slate-600" />
          <div className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Font Size
          </div>
        </button>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed top-4 left-4 z-40">
        <button
          onClick={() => {
            const shortcuts = `Keyboard Shortcuts:
• Ctrl/Cmd + S: Save entry
• Ctrl/Cmd + N: New entry  
• Ctrl/Cmd + F: Search entries
• Escape: Exit focus mode
• Tab: Next field
• Shift + Tab: Previous field`;
            alert(shortcuts);
          }}
          className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors group"
          title="Keyboard Shortcuts"
        >
          <HelpCircle size={16} className="text-slate-600" />
          <div className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Help
          </div>
        </button>
      </div>

      {/* Global Keyboard Event Handler */}
      <div
        className="sr-only"
        onKeyDown={(e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            if (activeTab === 'write' && text.trim()) {
              saveEntry();
            }
          }
          if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            setActiveTab('write');
            setText('');
            setTitle('');
            setTags([]);
            setMood({ energy: null, emotional: null, physical: null });
          }
          if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            setActiveTab('entries');
            setTimeout(() => {
              const searchInput = document.querySelector('input[placeholder="Search your entries..."]');
              if (searchInput) searchInput.focus();
            }, 100);
          }
          if (e.key === 'Escape' && focusMode) {
            setFocusMode(false);
          }
        }}
        tabIndex={0}
        aria-label="Global keyboard shortcuts"
      />

      {/* Custom Styles */}
      <style jsx="true">{`
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .writing-flow {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .writing-flow:focus {
          transform: scale(1.01);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .mood-selected {
          animation: moodSelect 0.3s ease-out;
        }
        
        @keyframes moodSelect {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1.05); }
        }
        
        .intervention-enter {
          animation: slideInRight 0.5s ease-out;
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #6366f1;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #6366f1;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5);
        }
      `}</style>
    </div>
  );
}
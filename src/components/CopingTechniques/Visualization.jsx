import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw,
  Clock,
  CheckCircle,
  Volume2,
  VolumeX,
  Settings,
  Sparkles,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Heart,
  Bell,
  User,
  Calendar,
  AlertTriangle,
  Plus,
  X
} from 'lucide-react';

const visualizationScenarios = {
  peacefulBeach: {
    name: "Peaceful Ocean Beach",
    description: "Escape to a serene coastline where gentle waves wash away your worries",
    duration: "12-15 minutes",
    icon: "🏖️",
    color: "from-blue-400 to-cyan-500",
    backgroundGradient: "from-sky-200 via-blue-100 to-cyan-50",
    darkBackground: "from-blue-900 via-slate-800 to-cyan-900",
    ambientSound: "ocean waves",
    triggers: ['water', 'drowning', 'ocean'],
    steps: [
      {
        instruction: "Close your eyes gently and take three deep, cleansing breaths. Let your body settle into complete comfort.",
        duration: 25,
        scene: "preparation",
        guidance: "You are safe and supported. This is your time to find peace and restoration.",
        visualCue: "🌊"
      },
      {
        instruction: "Imagine yourself standing at the edge of a beautiful, pristine beach. The sand is soft and warm beneath your bare feet.",
        duration: 40,
        scene: "arrival",
        guidance: "Feel the gentle warmth of the sand supporting you. This beach exists just for you - your personal sanctuary.",
        visualCue: "🏖️"
      },
      {
        instruction: "Look out at the endless ocean before you. The water is a brilliant blue-green, sparkling in the golden sunlight.",
        duration: 35,
        scene: "ocean view",
        guidance: "The vastness of the ocean reminds you that your worries are small in comparison to this infinite peace.",
        visualCue: "🌊"
      },
      {
        instruction: "Listen to the rhythmic sound of gentle waves rolling onto the shore. Each wave brings calm and takes away tension.",
        duration: 40,
        scene: "wave sounds",
        guidance: "Let the rhythm of the waves synchronize with your breathing. In with peace, out with stress.",
        visualCue: "〰️"
      },
      {
        instruction: "Feel the warm, gentle breeze caressing your skin. It carries the fresh, clean scent of salt air and ocean spray.",
        duration: 35,
        scene: "ocean breeze",
        guidance: "This breeze is washing away all your worries, leaving you refreshed and renewed.",
        visualCue: "💨"
      },
      {
        instruction: "Walk slowly along the water's edge. Feel the cool water gently touching your feet as waves roll in and out.",
        duration: 45,
        scene: "walking shoreline",
        guidance: "With each step, you feel lighter, more peaceful, more connected to the natural world.",
        visualCue: "👣"
      },
      {
        instruction: "Find a comfortable spot on the warm sand and sit or lie down. Feel completely supported by the earth beneath you.",
        duration: 50,
        scene: "settling on sand",
        guidance: "You are held safely by the earth. Let your entire body sink into deep relaxation.",
        visualCue: "🏝️"
      },
      {
        instruction: "Look up at the vast, clear blue sky. Watch as a few fluffy white clouds drift peacefully overhead.",
        duration: 40,
        scene: "sky gazing",
        guidance: "Like these clouds, your thoughts can drift by gently without disturbing your inner peace.",
        visualCue: "☁️"
      },
      {
        instruction: "Feel the warm sun on your face and body, filling you with golden light and healing energy.",
        duration: 45,
        scene: "sun bathing",
        guidance: "This golden light is healing every cell in your body, restoring your energy and vitality.",
        visualCue: "☀️"
      },
      {
        instruction: "Take a few more moments to simply be present in this peaceful place. You can return here anytime you need tranquility.",
        duration: 50,
        scene: "integration",
        guidance: "This peace lives within you always. Carry this serenity with you as you slowly prepare to return.",
        visualCue: "🧘"
      }
    ]
  },
  enchantedForest: {
    name: "Enchanted Forest Sanctuary",
    description: "Journey through a magical woodland where ancient trees offer wisdom and healing",
    duration: "14-18 minutes", 
    icon: "🌲",
    color: "from-green-500 to-emerald-600",
    backgroundGradient: "from-green-100 via-emerald-50 to-green-200",
    darkBackground: "from-green-900 via-emerald-800 to-green-900",
    ambientSound: "forest sounds",
    triggers: ['claustrophobia', 'darkness', 'isolation'],
    steps: [
      {
        instruction: "Close your eyes and breathe deeply. With each breath, feel yourself becoming more relaxed and open to healing.",
        duration: 25,
        scene: "centering",
        guidance: "You are about to enter a sacred forest where healing and wisdom await you.",
        visualCue: "🌿"
      },
      {
        instruction: "Find yourself standing at the entrance to an ancient, enchanted forest. Tall, majestic trees welcome you with their gentle presence.",
        duration: 40,
        scene: "forest entrance",
        guidance: "These ancient guardians have watched over this sacred space for centuries. They welcome you with love.",
        visualCue: "🌲"
      },
      {
        instruction: "Step onto a soft pathway covered with moss and fallen leaves. Feel the springy earth beneath your feet.",
        duration: 35,
        scene: "forest path",
        guidance: "Each step connects you deeper to the earth's healing energy. You are supported and guided.",
        visualCue: "🍃"
      },
      {
        instruction: "Listen to the gentle symphony of the forest - birds singing, leaves rustling, a distant stream bubbling peacefully.",
        duration: 40,
        scene: "forest sounds",
        guidance: "These natural sounds are medicine for your soul, washing away stress and bringing deep peace.",
        visualCue: "🐦"
      },
      {
        instruction: "Breathe in the fresh, clean forest air filled with the scent of pine, earth, and growing things.",
        duration: 35,
        scene: "forest scents",
        guidance: "Each breath fills your lungs with pure, healing energy that flows throughout your entire being.",
        visualCue: "🌲"
      },
      {
        instruction: "Discover a beautiful clearing where golden sunlight filters through the canopy, creating dancing patterns of light.",
        duration: 45,
        scene: "sunlit clearing",
        guidance: "This golden light represents healing energy flowing into every part of your body and mind.",
        visualCue: "✨"
      },
      {
        instruction: "In the center of the clearing, find a perfect place to rest - perhaps by a gentle stream or beneath a wise old tree.",
        duration: 50,
        scene: "resting place",
        guidance: "This is your sacred healing space. Feel completely safe, loved, and supported here.",
        visualCue: "🏞️"
      },
      {
        instruction: "As you rest, imagine roots growing from your body into the earth, connecting you to the forest's ancient wisdom.",
        duration: 45,
        scene: "grounding",
        guidance: "Feel the deep wisdom of the earth flowing up through these roots, bringing you strength and clarity.",
        visualCue: "🌳"
      },
      {
        instruction: "Notice woodland creatures - deer, rabbits, butterflies - approaching without fear, drawn to your peaceful energy.",
        duration: 40,
        scene: "forest friends",
        guidance: "These gentle beings recognize the peace within you. You are one with all of nature.",
        visualCue: "🦋"
      },
      {
        instruction: "Feel a profound sense of belonging and connection to all life. You are part of something magnificent and eternal.",
        duration: 45,
        scene: "unity",
        guidance: "This connection to nature and all life is always within you. You carry this wisdom wherever you go.",
        visualCue: "💚"
      },
      {
        instruction: "Slowly and gently, begin to return from this sacred place, carrying its peace and wisdom with you always.",
        duration: 35,
        scene: "return",
        guidance: "This enchanted forest lives within your heart. You can return here anytime you need healing and peace.",
        visualCue: "🌟"
      }
    ]
  },
  mountainRetreat: {
    name: "Mountain Peak Serenity",
    description: "Ascend to a peaceful mountain summit where clarity and strength await you",
    duration: "10-14 minutes",
    icon: "⛰️",
    color: "from-purple-500 to-indigo-600",
    backgroundGradient: "from-purple-100 via-indigo-50 to-blue-100",
    darkBackground: "from-purple-900 via-indigo-800 to-blue-900",
    ambientSound: "mountain wind",
    triggers: ['heights', 'vertigo', 'falling'],
    steps: [
      {
        instruction: "Take several deep breaths and allow your body to become heavy and relaxed in your seat.",
        duration: 25,
        scene: "preparation",
        guidance: "You are about to journey to a place of great strength and clarity high above the world.",
        visualCue: "🧘"
      },
      {
        instruction: "Imagine yourself standing on a peaceful mountain peak, high above the clouds and concerns of daily life.",
        duration: 40,
        scene: "mountain peak",
        guidance: "From this elevated perspective, you can see that you are stronger and more capable than you realize.",
        visualCue: "⛰️"
      },
      {
        instruction: "Look out at the vast landscape stretching endlessly in all directions. Mountains, valleys, and distant horizons unfold before you.",
        duration: 40,
        scene: "panoramic view",
        guidance: "This expansive view reminds you of the infinite possibilities in your life.",
        visualCue: "🌄"
      },
      {
        instruction: "Feel the cool, crisp mountain air filling your lungs with each breath. The air here is pure and energizing.",
        duration: 35,
        scene: "mountain air",
        guidance: "This pure air is cleansing your mind of doubt and filling you with confidence and clarity.",
        visualCue: "💨"
      },
      {
        instruction: "Notice how stable and grounded you feel on this solid rock foundation beneath your feet.",
        duration: 30,
        scene: "solid ground",
        guidance: "Like this mountain, you have an unshakeable foundation of inner strength and resilience.",
        visualCue: "🪨"
      },
      {
        instruction: "Feel the gentle warmth of sunlight on your face, while a cool breeze keeps you perfectly comfortable.",
        duration: 35,
        scene: "perfect weather",
        guidance: "You are in perfect balance - strong yet gentle, grounded yet elevated, calm yet energized.",
        visualCue: "☀️"
      },
      {
        instruction: "From this high vantage point, look down at any problems or worries. See how small they appear from here.",
        duration: 45,
        scene: "perspective shift",
        guidance: "Your challenges are manageable. You have the wisdom and strength to overcome anything.",
        visualCue: "👁️"
      },
      {
        instruction: "Feel a profound sense of your own inner strength and capability flowing through you like mountain streams.",
        duration: 40,
        scene: "inner strength",
        guidance: "This strength has always been within you. You are more resilient and capable than you know.",
        visualCue: "💪"
      },
      {
        instruction: "Take a moment to set an intention or make a commitment to yourself from this place of clarity and strength.",
        duration: 45,
        scene: "intention setting",
        guidance: "From this elevated state of consciousness, your intentions are powerful and achievable.",
        visualCue: "🎯"
      },
      {
        instruction: "Slowly prepare to return, knowing you can access this mountain strength and clarity whenever you need it.",
        duration: 30,
        scene: "integration",
        guidance: "Carry this mountain strength with you. You are unshakeable, clear-minded, and powerful.",
        visualCue: "🌟"
      }
    ]
  },
  healingGarden: {
    name: "Healing Garden of Renewal",
    description: "Enter a magical garden where every flower, tree, and stream offers healing energy",
    duration: "15-20 minutes",
    icon: "🌺",
    color: "from-pink-500 to-rose-600",
    backgroundGradient: "from-pink-100 via-rose-50 to-purple-100",
    darkBackground: "from-pink-900 via-rose-800 to-purple-900",
    ambientSound: "garden birds",
    triggers: ['allergies', 'insects', 'pollen'],
    steps: [
      {
        instruction: "Relax completely and breathe naturally. Allow healing energy to begin flowing through your entire being.",
        duration: 25,
        scene: "preparation",
        guidance: "You are about to enter a sacred healing garden where miraculous restoration awaits you.",
        visualCue: "🌿"
      },
      {
        instruction: "Find yourself walking through an ornate gate into the most beautiful garden you've ever seen.",
        duration: 40,
        scene: "garden entrance",
        guidance: "This garden exists specifically for your healing. Every element here serves your highest good.",
        visualCue: "🌸"
      },
      {
        instruction: "Walk along a winding path surrounded by vibrant flowers in every color imaginable - roses, lilies, jasmine, and more.",
        duration: 45,
        scene: "flower path",
        guidance: "Each flower radiates healing energy. Feel their colors washing over you like gentle waves of restoration.",
        visualCue: "🌺"
      },
      {
        instruction: "Breathe in the heavenly fragrance of all these healing flowers. Let their essence fill your entire being.",
        duration: 35,
        scene: "healing scents",
        guidance: "These natural aromatherapy scents are healing your mind, body, and spirit on the deepest levels.",
        visualCue: "🌹"
      },
      {
        instruction: "Discover a crystal-clear stream flowing gently through the garden, its water sparkling in the golden light.",
        duration: 40,
        scene: "healing stream",
        guidance: "This is the stream of pure healing energy. Its gentle flow represents life force flowing through you.",
        visualCue: "💧"
      },
      {
        instruction: "Kneel by the stream and cup the pure water in your hands. Drink deeply of this healing elixir.",
        duration: 45,
        scene: "drinking healing water",
        guidance: "This sacred water is healing every cell, organ, and system in your body. Feel it restoring you completely.",
        visualCue: "🥤"
      },
      {
        instruction: "Find a comfortable spot beneath a magnificent healing tree whose branches offer perfect shade and protection.",
        duration: 50,
        scene: "healing tree",
        guidance: "This ancient tree has witnessed countless healings. Feel its wisdom and loving energy surrounding you.",
        visualCue: "🌳"
      },
      {
        instruction: "Place your hands on your heart and feel healing light flowing from the garden into every part of your body.",
        duration: 55,
        scene: "heart healing",
        guidance: "Golden healing light is flowing through your heart to every cell. You are being restored to perfect wholeness.",
        visualCue: "💖"
      },
      {
        instruction: "Visualize any areas of your body or mind that need healing being bathed in this magical garden light.",
        duration: 60,
        scene: "targeted healing",
        guidance: "The garden's healing energy knows exactly where to go. Trust in this perfect, loving restoration.",
        visualCue: "✨"
      },
      {
        instruction: "Feel butterflies landing gently on your hands and shoulders, each one bringing a message of hope and renewal.",
        duration: 40,
        scene: "butterfly messengers",
        guidance: "These butterflies represent transformation. Like them, you are emerging renewed and beautiful.",
        visualCue: "🦋"
      },
      {
        instruction: "Know that this healing garden exists within your heart. You can return here anytime for restoration and peace.",
        duration: 35,
        scene: "integration",
        guidance: "Carry this healing energy with you always. You are whole, healthy, and surrounded by love.",
        visualCue: "💚"
      }
    ]
  }
};

const defaultPersonalSettings = {
  favoriteScenarios: [],
  customDurations: {},
  personalTriggers: [],
  voicePreferences: {
    gender: 'any',
    accent: 'neutral',
    speed: 0.7
  },
  reminderSchedule: {
    frequency: 'none',
    times: []
  },
  ambientVolume: 0.3,
  voiceVolume: 0.8
};

const AdvancedVisualization = () => {
  const [selectedScenario, setSelectedScenario] = useState('peacefulBeach');
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [completedSessions, setCompletedSessions] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('visualization-completed-sessions') || '0');
    return saved;
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPersonalSettings, setShowPersonalSettings] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('visualization-dark-mode');
    return saved ? JSON.parse(saved) : false;
  });
  const [immersiveMode, setImmersiveMode] = useState(true);
  const [showVisualCues, setShowVisualCues] = useState(true);
  const [ambientSoundEnabled, setAmbientSoundEnabled] = useState(true);
  const [newTrigger, setNewTrigger] = useState('');
  
  // Personal Settings State
  const [personalSettings, setPersonalSettings] = useState(() => {
    const saved = localStorage.getItem('visualization-personal-settings');
    return saved ? JSON.parse(saved) : defaultPersonalSettings;
  });

  const timerRef = useRef(null);
  const sessionTimerRef = useRef(null);
  const utteranceRef = useRef(null);
  const startTimeRef = useRef(null);

  const currentScenario = visualizationScenarios[selectedScenario];
  const currentStepData = currentScenario?.steps[currentStep] || currentScenario?.steps[0];

  // Save states to localStorage
  useEffect(() => {
    localStorage.setItem('visualization-personal-settings', JSON.stringify(personalSettings));
  }, [personalSettings]);

  useEffect(() => {
    localStorage.setItem('visualization-dark-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('visualization-completed-sessions', JSON.stringify(completedSessions));
  }, [completedSessions]);

  // Check for triggers before starting
  const hasTriggersForScenario = useCallback((scenarioKey) => {
    const scenario = visualizationScenarios[scenarioKey];
    if (!scenario || !personalSettings.personalTriggers) return false;
    return personalSettings.personalTriggers.some(trigger => 
      scenario.triggers.includes(trigger.toLowerCase())
    );
  }, [personalSettings.personalTriggers]);

  // Get available scenarios (excluding those with triggers)
  const getAvailableScenarios = useCallback(() => {
    return Object.entries(visualizationScenarios).filter(([key]) => 
      !hasTriggersForScenario(key)
    );
  }, [hasTriggersForScenario]);

  // Session timing
  useEffect(() => {
    if (isActive && !isPaused) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
      }
      sessionTimerRef.current = setInterval(() => {
        setSessionTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
    } else {
      clearInterval(sessionTimerRef.current);
    }

    return () => clearInterval(sessionTimerRef.current);
  }, [isActive, isPaused]);

  // Step timer
  useEffect(() => {
    if (isActive && !isPaused && timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isActive && !isPaused && autoAdvance) {
      handleNextStep();
    }

    return () => clearTimeout(timerRef.current);
  }, [isActive, isPaused, timeRemaining, autoAdvance]);

  // Voice guidance
  useEffect(() => {
    if (voiceEnabled && isActive && currentStepData && 'speechSynthesis' in window && !isPaused) {
      const speakAfterDelay = setTimeout(() => {
        if (isActive && !isPaused) {
          speakInstruction(currentStepData.instruction);
          const guidanceDelay = setTimeout(() => {
            if (isActive && !isPaused) {
              speakInstruction(currentStepData.guidance);
            }
          }, (currentStepData.instruction.length * 60) + 3000);
          
          return () => clearTimeout(guidanceDelay);
        }
      }, 2000);
      
      return () => clearTimeout(speakAfterDelay);
    }
  }, [currentStep, isActive, voiceEnabled, isPaused]);

  const speakInstruction = useCallback((text) => {
    if (!voiceEnabled || isPaused) return;
    
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = personalSettings.voicePreferences.speed;
      utterance.pitch = 0.9;
      utterance.volume = personalSettings.voiceVolume;
      
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice;
      
      if (personalSettings.voicePreferences.gender === 'female') {
        selectedVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('female') ||
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('karen') ||
          voice.name.toLowerCase().includes('zira')
        );
      } else if (personalSettings.voicePreferences.gender === 'male') {
        selectedVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('male') ||
          voice.name.toLowerCase().includes('daniel') ||
          voice.name.toLowerCase().includes('alex') ||
          voice.name.toLowerCase().includes('david')
        );
      }
      
      if (selectedVoice) utterance.voice = selectedVoice;
      
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  }, [voiceEnabled, personalSettings.voicePreferences, personalSettings.voiceVolume, isPaused]);

  const getAdjustedSteps = useCallback(() => {
    const customDuration = personalSettings.customDurations[selectedScenario];
    if (!customDuration || customDuration === 1) return currentScenario.steps;
    
    return currentScenario.steps.map(step => ({ 
      ...step, 
      duration: Math.floor(step.duration * customDuration) 
    }));
  }, [selectedScenario, personalSettings.customDurations, currentScenario]);

  const startVisualization = () => {
    const steps = getAdjustedSteps();
    setIsActive(true);
    setIsPaused(false);
    setCurrentStep(0);
    setIsCompleted(false);
    setTimeRemaining(steps[0].duration);
    setTotalTime(steps.reduce((acc, step) => acc + step.duration, 0));
    setSessionTime(0);
    startTimeRef.current = Date.now();
  };

  const handleNextStep = useCallback(() => {
    const steps = getAdjustedSteps();
    
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setTimeRemaining(steps[nextStep].duration);
    } else {
      completeSession();
    }
  }, [currentStep, getAdjustedSteps]);

  const handlePrevStep = useCallback(() => {
    const steps = getAdjustedSteps();
    
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setTimeRemaining(steps[prevStep].duration);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
  }, [currentStep, getAdjustedSteps]);

  const completeSession = () => {
    setIsActive(false);
    setIsCompleted(true);
    setCompletedSessions(prev => prev + 1);
    
    // Add to favorites if not already there
    if (!personalSettings.favoriteScenarios.includes(selectedScenario)) {
      setPersonalSettings(prev => ({
        ...prev,
        favoriteScenarios: [...prev.favoriteScenarios, selectedScenario]
      }));
    }
    
    if (voiceEnabled) {
      setTimeout(() => {
        speakInstruction("Beautiful work. You have completed your visualization journey. Take a moment to feel the peace and healing you've received.");
      }, 1000);
    }
  };

  const pauseResume = () => {
    setIsPaused(!isPaused);
    if (!isPaused && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const resetSession = () => {
    setIsActive(false);
    setIsPaused(false);
    setCurrentStep(0);
    setIsCompleted(false);
    setTimeRemaining(0);
    setSessionTime(0);
    startTimeRef.current = null;
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const updatePersonalSettings = (updates) => {
    setPersonalSettings(prev => ({ ...prev, ...updates }));
  };

  const addPersonalTrigger = () => {
    const trigger = newTrigger.trim().toLowerCase();
    if (trigger && !personalSettings.personalTriggers.includes(trigger)) {
      updatePersonalSettings({
        personalTriggers: [...personalSettings.personalTriggers, trigger]
      });
      setNewTrigger('');
    }
  };

  const removePersonalTrigger = (trigger) => {
    updatePersonalSettings({
      personalTriggers: personalSettings.personalTriggers.filter(t => t !== trigger)
    });
  };

  const removeFavoriteScenario = (scenario) => {
    updatePersonalSettings({
      favoriteScenarios: personalSettings.favoriteScenarios.filter(s => s !== scenario)
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStepProgress = () => {
    return ((currentStep + 1) / currentScenario.steps.length) * 100;
  };

  const getTimeProgress = () => {
    if (totalTime === 0) return 0;
    const steps = getAdjustedSteps();
    const remainingTime = timeRemaining + (steps.slice(currentStep + 1).reduce((acc, step) => acc + step.duration, 0));
    return ((totalTime - remainingTime) / totalTime) * 100;
  };

  const bgClass = immersiveMode && isActive 
    ? isDarkMode 
      ? `min-h-screen bg-gradient-to-br ${currentScenario.darkBackground} transition-all duration-1000`
      : `min-h-screen bg-gradient-to-br ${currentScenario.backgroundGradient} transition-all duration-1000`
    : isDarkMode
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 transition-all duration-700"
    : "min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 transition-all duration-700";

  const cardClass = isDarkMode
    ? "bg-gray-800/90 backdrop-blur-lg border border-gray-700/50 text-white"
    : "bg-white/90 backdrop-blur-lg border border-white/50 text-gray-800";

  return (
    <div className={bgClass}>
      <div className="p-4">
        <div className="max-w-5xl mx-auto">
          {/* Animated background elements */}
          {immersiveMode && isActive && (
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-0">
                {selectedScenario === 'peacefulBeach' && (
                  <>
                    <div className="absolute bottom-0 left-0 w-full h-32 opacity-20">
                      <div 
                        className="w-full h-full bg-gradient-to-t from-blue-400/30 to-transparent"
                        style={{
                          animation: 'float 8s ease-in-out infinite'
                        }}
                      />
                    </div>
                    <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-yellow-300/20 animate-pulse" />
                  </>
                )}
                {selectedScenario === 'enchantedForest' && (
                  <div className="absolute inset-0">
                    <div className="absolute bottom-0 left-0 w-full h-40 opacity-30">
                      <div className="w-full h-full bg-gradient-to-t from-green-400/20 to-transparent" />
                    </div>
                    <div className="absolute top-1/3 left-1/4 w-24 h-24 rounded-full bg-green-300/15 animate-pulse" />
                    <div className="absolute top-2/3 right-1/3 w-16 h-16 rounded-full bg-emerald-300/15 animate-pulse delay-1000" />
                  </div>
                )}
                {selectedScenario === 'mountainRetreat' && (
                  <div className="absolute inset-0">
                    <div className="absolute bottom-0 left-0 w-full h-32 opacity-25">
                      <div className="w-full h-full bg-gradient-to-t from-purple-400/20 to-transparent" />
                    </div>
                    <div className="absolute top-1/4 left-1/2 w-40 h-40 rounded-full bg-indigo-300/10 animate-pulse" />
                  </div>
                )}
                {selectedScenario === 'healingGarden' && (
                  <div className="absolute inset-0">
                    <div className="absolute bottom-0 left-0 w-full h-36 opacity-25">
                      <div className="w-full h-full bg-gradient-to-t from-pink-400/20 to-transparent" />
                    </div>
                    <div className="absolute top-1/4 right-1/4 w-28 h-28 rounded-full bg-rose-300/15 animate-pulse" />
                    <div className="absolute top-2/3 left-1/4 w-20 h-20 rounded-full bg-pink-300/15 animate-pulse delay-500" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
              <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Therapeutic Visualization
              </h1>
              <Sparkles className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            </div>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Immersive guided imagery journeys to heal your mind, body, and spirit
            </p>
          </div>

          {/* Top Controls */}
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowPersonalSettings(!showPersonalSettings);
                  setShowSettings(false);
                }}
                className={`p-3 rounded-xl ${cardClass} hover:shadow-lg transition-all flex items-center gap-2 ${showPersonalSettings ? 'ring-2 ring-blue-500' : ''}`}
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Personal</span>
              </button>
              <button
                onClick={() => {
                  setShowSettings(!showSettings);
                  setShowPersonalSettings(false);
                }}
                className={`p-3 rounded-xl ${cardClass} hover:shadow-lg transition-all flex items-center gap-2 ${showSettings ? 'ring-2 ring-blue-500' : ''}`}
              >
                <Settings className="w-5 h-5" />
                <span className="hidden sm:inline">Settings</span>
              </button>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-3 rounded-xl ${cardClass} hover:shadow-lg transition-all`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Personal Settings Panel */}
          {showPersonalSettings && (
            <div className={`${cardClass} rounded-xl p-6 mb-8 relative z-10`}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Settings
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Favorite Scenarios */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Favorite Scenarios ({personalSettings.favoriteScenarios.length})
                  </h4>
                  <div className="space-y-2">
                    {personalSettings.favoriteScenarios.length === 0 ? (
                      <p className="text-sm opacity-60">Complete sessions to build favorites</p>
                    ) : (
                      personalSettings.favoriteScenarios.map(scenario => (
                        <div key={scenario} className={`flex items-center justify-between p-2 rounded-lg ${isDarkMode ? 'bg-pink-900/20' : 'bg-gradient-to-r from-pink-100 to-rose-100'}`}>
                          <span className="flex items-center gap-2">
                            <span>{visualizationScenarios[scenario]?.icon}</span>
                            <span className="text-sm">{visualizationScenarios[scenario]?.name}</span>
                          </span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => setSelectedScenario(scenario)}
                              className="text-xs px-2 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
                            >
                              Select
                            </button>
                            <button
                              onClick={() => removeFavoriteScenario(scenario)}
                              className="text-xs px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Personal Triggers */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Content Triggers to Avoid ({personalSettings.personalTriggers.length})
                  </h4>
                  <div className="space-y-2 mb-3">
                    {personalSettings.personalTriggers.map(trigger => (
                      <div key={trigger} className={`flex items-center justify-between p-2 rounded-lg ${isDarkMode ? 'bg-red-900/20' : 'bg-red-100'}`}>
                        <span className="text-sm capitalize">{trigger}</span>
                        <button
                          onClick={() => removePersonalTrigger(trigger)}
                          className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add trigger (e.g., water, heights)"
                      value={newTrigger}
                      onChange={(e) => setNewTrigger(e.target.value)}
                      className={`flex-1 p-2 text-sm rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addPersonalTrigger();
                        }
                      }}
                    />
                    <button
                      onClick={addPersonalTrigger}
                      className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs opacity-60 mt-2">Scenarios with these triggers will be hidden</p>
                </div>

                {/* Custom Durations */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Custom Session Lengths
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(visualizationScenarios).map(([key, scenario]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm flex items-center gap-2">
                          <span>{scenario.icon}</span>
                          <span className="truncate">{scenario.name}</span>
                        </span>
                        <select
                          value={personalSettings.customDurations[key] || 1}
                          onChange={(e) => updatePersonalSettings({
                            customDurations: {
                              ...personalSettings.customDurations,
                              [key]: parseFloat(e.target.value)
                            }
                          })}
                          className={`text-xs p-1 rounded border min-w-[100px] ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                        >
                          <option value={0.5}>50% Shorter</option>
                          <option value={0.75}>25% Shorter</option>
                          <option value={1}>Standard</option>
                          <option value={1.25}>25% Longer</option>
                          <option value={1.5}>50% Longer</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Voice & Audio Preferences */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    Voice & Audio
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm mb-1">Voice Gender</label>
                      <select
                        value={personalSettings.voicePreferences.gender}
                        onChange={(e) => updatePersonalSettings({
                          voicePreferences: {
                            ...personalSettings.voicePreferences,
                            gender: e.target.value
                          }
                        })}
                        className={`w-full p-2 text-sm rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                      >
                        <option value="any">Any</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1">Voice Speed: {personalSettings.voicePreferences.speed}x</label>
                      <input
                        type="range"
                        min="0.5"
                        max="1.5"
                        step="0.1"
                        value={personalSettings.voicePreferences.speed}
                        onChange={(e) => updatePersonalSettings({
                          voicePreferences: {
                            ...personalSettings.voicePreferences,
                            speed: parseFloat(e.target.value)
                          }
                        })}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1">Voice Volume: {Math.round(personalSettings.voiceVolume * 100)}%</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={personalSettings.voiceVolume}
                        onChange={(e) => updatePersonalSettings({
                          voiceVolume: parseFloat(e.target.value)
                        })}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1">Ambient Sound Volume: {Math.round(personalSettings.ambientVolume * 100)}%</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={personalSettings.ambientVolume}
                        onChange={(e) => updatePersonalSettings({
                          ambientVolume: parseFloat(e.target.value)
                        })}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Reminder Schedule */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Practice Reminders
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm mb-1">Frequency</label>
                      <select
                        value={personalSettings.reminderSchedule.frequency}
                        onChange={(e) => updatePersonalSettings({
                          reminderSchedule: {
                            ...personalSettings.reminderSchedule,
                            frequency: e.target.value
                          }
                        })}
                        className={`w-full p-2 text-sm rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                      >
                        <option value="none">No Reminders</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                    
                    {personalSettings.reminderSchedule.frequency !== 'none' && (
                      <div>
                        <label className="block text-sm mb-1">Preferred Time</label>
                        <input
                          type="time"
                          value={personalSettings.reminderSchedule.times[0] || ''}
                          onChange={(e) => updatePersonalSettings({
                            reminderSchedule: {
                              ...personalSettings.reminderSchedule,
                              times: [e.target.value]
                            }
                          })}
                          className={`w-full p-2 text-sm rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Session Stats */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Your Journey Stats
                  </h4>
                  <div className="space-y-2">
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                      <div className="text-lg font-bold text-blue-600">{completedSessions}</div>
                      <div className="text-sm opacity-75">Total Sessions Completed</div>
                    </div>
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
                      <div className="text-lg font-bold text-green-600">{personalSettings.favoriteScenarios.length}</div>
                      <div className="text-sm opacity-75">Favorite Scenarios</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Panel */}
          {showSettings && (
            <div className={`${cardClass} rounded-xl p-6 mb-8 relative z-10`}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Session Settings
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      Voice Guidance
                    </span>
                    <button
                      onClick={() => setVoiceEnabled(!voiceEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${voiceEnabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${voiceEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      Ambient Sounds
                    </span>
                    <button
                      onClick={() => setAmbientSoundEnabled(!ambientSoundEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${ambientSoundEnabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${ambientSoundEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" />
                      Auto Advance Steps
                    </span>
                    <button
                      onClick={() => setAutoAdvance(!autoAdvance)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoAdvance ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoAdvance ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </label>
                </div>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Immersive Background
                    </span>
                    <button
                      onClick={() => setImmersiveMode(!immersiveMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${immersiveMode ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${immersiveMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Visual Cues
                    </span>
                    <button
                      onClick={() => setShowVisualCues(!showVisualCues)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showVisualCues ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showVisualCues ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </label>

                  <div className="pt-2">
                    <p className="text-sm opacity-75 mb-2">Quick Actions</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setVoiceEnabled(true);
                          setAmbientSoundEnabled(true);
                          setAutoAdvance(true);
                          setImmersiveMode(true);
                          setShowVisualCues(true);
                        }}
                        className="text-xs px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                      >
                        Enable All
                      </button>
                      <button
                        onClick={() => {
                          setVoiceEnabled(false);
                          setAmbientSoundEnabled(false);
                          setAutoAdvance(false);
                          setImmersiveMode(false);
                          setShowVisualCues(false);
                        }}
                        className="text-xs px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        Disable All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Session Stats */}
          {(isActive || isCompleted) && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-10">
              <div className={`${cardClass} rounded-xl p-4 text-center`}>
                <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="text-lg font-bold">{formatTime(sessionTime)}</div>
                <div className="text-sm opacity-75">Journey Time</div>
              </div>
              <div className={`${cardClass} rounded-xl p-4 text-center`}>
                <div className="text-lg font-bold">{Math.round(getStepProgress())}%</div>
                <div className="text-sm opacity-75">Progress</div>
              </div>
              <div className={`${cardClass} rounded-xl p-4 text-center`}>
                <div className="text-2xl mb-1">{currentStepData?.visualCue}</div>
                <div className="text-sm opacity-75 capitalize">{currentStepData?.scene}</div>
              </div>
              <div className={`${cardClass} rounded-xl p-4 text-center`}>
                <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="text-lg font-bold">{completedSessions}</div>
                <div className="text-sm opacity-75">Total Sessions</div>
              </div>
            </div>
          )}

          {/* Scenario Selection */}
          {!isActive && !isCompleted && (
            <div className="relative z-10">
              {/* Available Scenarios */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {getAvailableScenarios().map(([key, scenario]) => (
                  <div
                    key={key}
                    onClick={() => setSelectedScenario(key)}
                    className={`${cardClass} rounded-xl p-6 cursor-pointer transition-all hover:shadow-xl transform hover:scale-105 ${
                      selectedScenario === key ? 'ring-2 ring-blue-500 shadow-xl' : ''
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{scenario.icon}</div>
                      <h3 className="font-bold text-lg mb-2">{scenario.name}</h3>
                      <p className="text-sm opacity-80 mb-3">{scenario.description}</p>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs bg-gradient-to-r ${scenario.color} text-white mb-2`}>
                        {personalSettings.customDurations[key] ? 
                          `${scenario.duration} (${personalSettings.customDurations[key] === 0.5 ? '50% shorter' : 
                          personalSettings.customDurations[key] === 0.75 ? '25% shorter' :
                          personalSettings.customDurations[key] === 1.25 ? '25% longer' :
                          personalSettings.customDurations[key] === 1.5 ? '50% longer' : 'custom'})` 
                          : scenario.duration}
                      </div>
                      {personalSettings.favoriteScenarios.includes(key) && (
                        <div className="flex justify-center mt-2">
                          <Heart className="w-4 h-4 text-red-500 fill-current" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Show hidden scenarios info */}
              {personalSettings.personalTriggers.length > 0 && (
                <div className={`${cardClass} rounded-lg p-4 mb-6`}>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold">Content Filter Active</span>
                  </div>
                  <p className="text-sm text-center opacity-75">
                    {Object.keys(visualizationScenarios).length - getAvailableScenarios().length} scenario(s) hidden based on your trigger preferences: {personalSettings.personalTriggers.join(', ')}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Main Control Panel */}
          <div className={`${cardClass} rounded-2xl p-8 relative z-10`}>
            {!isActive && !isCompleted ? (
              // Start Screen
              <div className="text-center">
                <div className="text-6xl mb-4">{currentScenario.icon}</div>
                <h2 className="text-3xl font-bold mb-4">{currentScenario.name}</h2>
                <p className="text-lg opacity-80 mb-6 max-w-2xl mx-auto">
                  {currentScenario.description}
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 opacity-60" />
                    <span>{personalSettings.customDurations[selectedScenario] ? 
                      `${currentScenario.duration} (${personalSettings.customDurations[selectedScenario] === 0.5 ? '50% shorter' : 
                      personalSettings.customDurations[selectedScenario] === 0.75 ? '25% shorter' :
                      personalSettings.customDurations[selectedScenario] === 1.25 ? '25% longer' :
                      personalSettings.customDurations[selectedScenario] === 1.5 ? '50% longer' : 'custom'})` 
                      : currentScenario.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 opacity-60" />
                    <span>{currentScenario.ambientSound}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 opacity-60" />
                    <span>{currentScenario.steps.length} steps</span>
                  </div>
                </div>
                
                {hasTriggersForScenario(selectedScenario) && (
                  <div className={`${isDarkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-100 border-yellow-300'} border rounded-lg p-4 mb-6`}>
                    <div className="flex items-center justify-center gap-2 text-yellow-700 dark:text-yellow-300">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="font-semibold">Content Warning</span>
                    </div>
                    <p className="text-sm mt-2 text-yellow-600 dark:text-yellow-400 text-center">
                      This scenario contains content that matches your personal triggers: {currentScenario.triggers.filter(t => personalSettings.personalTriggers.includes(t)).join(', ')}. Consider choosing a different journey.
                    </p>
                  </div>
                )}
                
                <div className="flex justify-center gap-4">
                  <button
                    onClick={startVisualization}
                    disabled={hasTriggersForScenario(selectedScenario)}
                    className={`${hasTriggersForScenario(selectedScenario) 
                      ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg transform hover:scale-105'
                    } text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all`}
                  >
                    <Play className="w-5 h-5" />
                    Begin Journey
                  </button>
                </div>
              </div>
            ) : isCompleted ? (
              // Completion Screen
              <div className="text-center">
                <div className="text-6xl mb-4">🌟</div>
                <h2 className="text-3xl font-bold mb-4">Journey Complete</h2>
                <p className="text-lg opacity-80 mb-6">
                  You have successfully completed your {currentScenario.name.toLowerCase()} visualization.
                  Take a moment to appreciate the peace and healing you've received.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                    <div className="text-2xl font-bold text-blue-600">{formatTime(sessionTime)}</div>
                    <div className="text-sm opacity-75">Total Time</div>
                  </div>
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
                    <div className="text-2xl font-bold text-green-600">{currentScenario.steps.length}</div>
                    <div className="text-sm opacity-75">Steps</div>
                  </div>
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                    <div className="text-2xl font-bold text-purple-600">100%</div>
                    <div className="text-sm opacity-75">Complete</div>
                  </div>
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-rose-900/30' : 'bg-rose-100'}`}>
                    <div className="text-2xl font-bold text-rose-600">{completedSessions}</div>
                    <div className="text-sm opacity-75">Total Sessions</div>
                  </div>
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={startVisualization}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
                  >
                    <Play className="w-5 h-5" />
                    Journey Again
                  </button>
                  <button
                    onClick={resetSession}
                    className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-6 py-3 rounded-xl font-semibold transition-all`}
                  >
                    Choose New Journey
                  </button>
                </div>
              </div>
            ) : (
              // Active Session
              <div>
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Step {currentStep + 1} of {currentScenario.steps.length}</span>
                    <span>{formatTime(timeRemaining)} remaining</span>
                  </div>
                  <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2 mb-2`}>
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getStepProgress()}%` }}
                    />
                  </div>
                  <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-1`}>
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-1 rounded-full transition-all duration-1000"
                      style={{ width: `${getTimeProgress()}%` }}
                    />
                  </div>
                </div>

                {/* Current Step Display */}
                <div className="text-center mb-8">
                  {showVisualCues && (
                    <div className="text-8xl mb-4 animate-pulse">{currentStepData.visualCue}</div>
                  )}
                  <h3 className="text-2xl font-bold mb-4 capitalize">{currentStepData.scene}</h3>
                  <div className={`max-w-3xl mx-auto p-6 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50'} mb-6`}>
                    <p className="text-lg leading-relaxed mb-4">{currentStepData.instruction}</p>
                    <p className="text-base opacity-80 italic">{currentStepData.guidance}</p>
                  </div>
                  <div className="text-3xl font-bold mb-2">{formatTime(timeRemaining)}</div>
                  <div className="text-sm opacity-75">Time remaining for this step</div>
                </div>

                {/* Controls */}
                <div className="flex justify-center items-center gap-4 flex-wrap">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStep === 0}
                    className={`p-3 rounded-xl ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : `${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`} transition-all`}
                    title="Previous Step"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={pauseResume}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
                    title={isPaused ? "Resume" : "Pause"}
                  >
                    {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
                  </button>
                  
                  <button
                    onClick={handleNextStep}
                    disabled={currentStep === currentScenario.steps.length - 1}
                    className={`p-3 rounded-xl ${currentStep === currentScenario.steps.length - 1 ? 'opacity-50 cursor-not-allowed' : `${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`} transition-all`}
                    title="Next Step"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={resetSession}
                    className={`p-3 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 transition-all`}
                    title="Reset Session"
                  >
                    <RotateCcw className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className={`p-3 rounded-xl transition-all ${voiceEnabled ? `${isDarkMode ? 'bg-green-900/30' : 'bg-green-100'} text-green-600` : `${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} text-gray-500`}`}
                    title={voiceEnabled ? "Disable Voice" : "Enable Voice"}
                  >
                    {voiceEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                  </button>

                  <button
                    onClick={() => setAmbientSoundEnabled(!ambientSoundEnabled)}
                    className={`p-3 rounded-xl transition-all ${ambientSoundEnabled ? `${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'} text-blue-600` : `${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} text-gray-500`}`}
                    title={ambientSoundEnabled ? "Disable Ambient Sound" : "Enable Ambient Sound"}
                  >
                    {ambientSoundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                  </button>
                </div>

                {isPaused && (
                  <div className="text-center mt-6">
                    <div className={`inline-block px-4 py-2 rounded-lg ${isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'} text-yellow-700 dark:text-yellow-300`}>
                      <span className="text-sm">Session Paused - Click play to continue your journey</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-8 relative z-10">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Find a comfortable position, close your eyes, and let your journey begin.
            </p>
            {personalSettings.favoriteScenarios.length > 0 && (
              <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                You have {personalSettings.favoriteScenarios.length} favorite scenario{personalSettings.favoriteScenarios.length !== 1 ? 's' : ''}
              </p>
            )}
            {completedSessions > 0 && (
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Total sessions completed: {completedSessions}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes sway {
          0% { transform: translateX(0px) rotate(0deg); }
          100% { transform: translateX(10px) rotate(2deg); }
        }
        
        /* Custom scrollbar for dark mode */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${isDarkMode ? '#374151' : '#f1f5f9'};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? '#6b7280' : '#cbd5e1'};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? '#9ca3af' : '#94a3b8'};
        }

        /* Smooth transitions for all interactive elements */
        button {
          transition: all 0.2s ease-in-out;
        }
        
        /* Enhanced focus states for accessibility */
        button:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        
        input:focus-visible,
        select:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default AdvancedVisualization;
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  PlayIcon, 
  PauseIcon, 
  ArrowPathIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  AdjustmentsHorizontalIcon,
  SparklesIcon,
  EyeIcon,
  EyeSlashIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/solid';

const relaxationTechniques = {
  progressive: {
    name: "Progressive Muscle Relaxation",
    description: "Systematically tense and release muscle groups to release physical stress and anxiety",
    duration: "10-15 minutes",
    icon: "💪",
    color: "from-blue-500 to-purple-500",
    steps: [
      { 
        instruction: "Find a comfortable position, either sitting or lying down. Close your eyes and take three slow, deep breaths.",
        duration: 20,
        bodyPart: "preparation",
        guidance: "Allow your body to settle into this moment. You are completely safe here."
      },
      { 
        instruction: "Curl your toes tightly, creating tension in your feet. Hold this tension for 5 seconds... now release and let your feet go completely limp.",
        duration: 25,
        bodyPart: "feet",
        guidance: "Notice the contrast between tension and relaxation. Feel the relief washing through your feet."
      },
      { 
        instruction: "Tighten your calf muscles by flexing your feet upward. Hold the tension... now release and feel your calves become heavy and relaxed.",
        duration: 25,
        bodyPart: "calves",
        guidance: "Your lower legs are sinking deeper into relaxation with each breath you take."
      },
      { 
        instruction: "Tense your thigh muscles by pressing your knees together. Hold firmly... now let go and feel your thighs melt into softness.",
        duration: 25,
        bodyPart: "thighs",
        guidance: "All tension is flowing out of your legs, leaving them heavy and peaceful."
      },
      { 
        instruction: "Squeeze your buttocks muscles tightly. Hold this tension... now release completely and let your hips sink down.",
        duration: 25,
        bodyPart: "glutes",
        guidance: "Your entire lower body is now deeply relaxed and supported."
      },
      { 
        instruction: "Tense your stomach muscles by drawing your belly button toward your spine. Hold... now release and let your abdomen soften.",
        duration: 25,
        bodyPart: "abdomen",
        guidance: "Feel your breathing naturally deepen as your core muscles release and relax."
      },
      { 
        instruction: "Make tight fists and tense your entire arms, pulling them close to your body. Hold... now let your arms drop and go completely limp.",
        duration: 30,
        bodyPart: "arms",
        guidance: "Your arms feel heavy and warm, like they're floating in warm water."
      },
      { 
        instruction: "Raise your shoulders up to your ears and tense your neck. Hold this tension... now let your shoulders drop and your neck lengthen.",
        duration: 30,
        bodyPart: "shoulders & neck",
        guidance: "All the weight you've been carrying is melting away from your shoulders."
      },
      { 
        instruction: "Scrunch up your entire face - close your eyes tightly, furrow your brow, clench your jaw. Hold... now relax everything.",
        duration: 30,
        bodyPart: "face",
        guidance: "Your face is now soft and peaceful, like the surface of a calm lake."
      },
      { 
        instruction: "Take a moment to scan your entire body from head to toe. Notice the deep relaxation flowing through every muscle.",
        duration: 45,
        bodyPart: "full body scan",
        guidance: "You are completely relaxed, safe, and at peace. This feeling of calm will stay with you."
      }
    ]
  },
  grounding: {
    name: "5-4-3-2-1 Sensory Grounding",
    description: "Anchor yourself in the present moment using your five senses to calm anxiety",
    duration: "5-8 minutes",
    icon: "🌍",
    color: "from-green-500 to-teal-500",
    steps: [
      { 
        instruction: "Take three slow, calming breaths. You're going to ground yourself using your senses to return to the present moment.",
        duration: 20,
        bodyPart: "preparation",
        guidance: "This technique will help pull you out of anxious thoughts and into the safety of now."
      },
      { 
        instruction: "Look around you slowly and mindfully identify 5 things you can SEE. Name them silently or out loud, really observing each one.",
        duration: 60,
        bodyPart: "sight",
        guidance: "Take your time with each object. Notice colors, shapes, textures, and details. You are present and aware."
      },
      { 
        instruction: "Now focus on 4 things you can physically TOUCH or FEEL. Your clothes, the chair, the temperature, a texture nearby...",
        duration: 50,
        bodyPart: "touch",
        guidance: "Feel the physical world supporting and surrounding you. You are grounded and connected to reality."
      },
      { 
        instruction: "Listen carefully and identify 3 different things you can HEAR right now. Perhaps sounds from outside, inside, near or far.",
        duration: 45,
        bodyPart: "hearing",
        guidance: "These sounds connect you to the world around you. You are safe in this moment."
      },
      { 
        instruction: "Gently notice 2 things you can SMELL. Take slow breaths to identify scents in your environment.",
        duration: 40,
        bodyPart: "smell",
        guidance: "Each breath brings you deeper into the present, away from worry and into awareness."
      },
      { 
        instruction: "Finally, identify 1 thing you can TASTE. It might be lingering from something you drank or ate, or just your mouth right now.",
        duration: 35,
        bodyPart: "taste",
        guidance: "You have successfully anchored yourself in this moment. You are here, you are safe, you are present."
      },
      { 
        instruction: "Take three final deep breaths and appreciate how grounded and present you feel in this moment.",
        duration: 30,
        bodyPart: "integration",
        guidance: "Remember: you can use this technique anytime you feel overwhelmed. Your senses will always bring you home to the present."
      }
    ]
  },
  visualization: {
    name: "Guided Safe Space Visualization",
    description: "Create and visit a mental sanctuary where you feel completely secure and peaceful",
    duration: "12-18 minutes",
    icon: "🏞️",
    color: "from-purple-500 to-pink-500",
    steps: [
      { 
        instruction: "Close your eyes gently and take five slow, deep breaths. Let your body sink into comfort and safety.",
        duration: 30,
        bodyPart: "preparation",
        guidance: "You are about to create a special place in your mind where you feel completely safe and peaceful."
      },
      { 
        instruction: "Imagine a place where you feel absolutely safe and calm. This could be real or completely from your imagination - a beach, forest, cozy room, or magical realm.",
        duration: 60,
        bodyPart: "creating your space",
        guidance: "This is your sanctuary. No one can disturb you here. Take time to see this place clearly in your mind."
      },
      { 
        instruction: "Look around your safe space. What do you see? Notice the colors, the lighting, the atmosphere. Make it exactly how you want it to be.",
        duration: 55,
        bodyPart: "visual details",
        guidance: "Add any details that make you feel more comfortable and secure. This place exists just for you."
      },
      { 
        instruction: "What sounds exist in your safe place? Perhaps gentle waves, birds singing, a crackling fire, or peaceful silence. Let yourself hear these calming sounds.",
        duration: 50,
        bodyPart: "sounds of safety",
        guidance: "These sounds remind you that you belong here, that this place welcomes and protects you."
      },
      { 
        instruction: "Feel the temperature and textures in your space. Is it warmly sunny or coolly comfortable? What can you touch - soft grass, warm sand, a cozy blanket?",
        duration: 55,
        bodyPart: "physical sensations",
        guidance: "Every sensation confirms your safety and comfort. Your body relaxes deeper into this peaceful environment."
      },
      { 
        instruction: "Notice any pleasant scents in your safe place - ocean air, flowers, fresh rain, or something that brings you comfort.",
        duration: 45,
        bodyPart: "comforting scents",
        guidance: "These scents anchor the memory of this place, making it easier to return whenever you need peace."
      },
      { 
        instruction: "Find the most comfortable spot in your safe place and settle in. Feel how protected and loved you are here.",
        duration: 80,
        bodyPart: "settling in",
        guidance: "You are completely safe here. Nothing can harm or disturb you. You deserve this peace and tranquility."
      },
      { 
        instruction: "Know that this safe place lives within you and you can return here anytime. Take three deep breaths and slowly prepare to return, carrying this peace with you.",
        duration: 40,
        bodyPart: "integration & return",
        guidance: "This sanctuary is always accessible to you. The calm and safety you feel here can travel with you into your daily life."
      }
    ]
  },
  bodyScan: {
    name: "Mindful Body Scan",
    description: "Systematically relax your entire body through mindful awareness and gentle attention",
    duration: "8-12 minutes",
    icon: "🧘",
    color: "from-teal-500 to-blue-500",
    steps: [
      { 
        instruction: "Lie down or sit comfortably with your spine straight. Close your eyes and take several deep, cleansing breaths.",
        duration: 25,
        bodyPart: "centering",
        guidance: "Allow your body to be heavy and supported. You don't need to do anything except be present with yourself."
      },
      { 
        instruction: "Bring your attention to the top of your head. Simply notice any sensations - warmth, tingling, or just awareness itself.",
        duration: 30,
        bodyPart: "head & scalp",
        guidance: "There's no right or wrong way to feel. Simply observe with gentle, non-judgmental awareness."
      },
      { 
        instruction: "Move your attention down to your face. Notice your forehead, eyes, cheeks, jaw. If you notice tension, simply breathe into those areas.",
        duration: 35,
        bodyPart: "face",
        guidance: "Let your facial muscles soften with each exhale. Your face holds so much - allow it to rest now."
      },
      { 
        instruction: "Focus on your neck and throat. These areas often hold stress and emotion. Breathe gently into any tightness you find.",
        duration: 30,
        bodyPart: "neck & throat",
        guidance: "Your throat is the bridge between your heart and mind. Let it be open and relaxed."
      },
      { 
        instruction: "Bring awareness to your shoulders and arms. Notice if they're carrying tension from the day. Let them become heavy and relaxed.",
        duration: 40,
        bodyPart: "shoulders & arms",
        guidance: "You can put down whatever burden you've been carrying. Your shoulders don't need to hold it all."
      },
      { 
        instruction: "Focus on your chest and heart area. Notice your natural breath rhythm. Feel your heart beating steadily, keeping you alive.",
        duration: 45,
        bodyPart: "chest & heart",
        guidance: "Your heart has been beating for you your entire life. Send it gratitude and love."
      },
      { 
        instruction: "Move your attention to your abdomen and lower torso. This is often where we hold emotional tension. Breathe softly here.",
        duration: 35,
        bodyPart: "abdomen",
        guidance: "Your core is your center of power and intuition. Let it be soft and spacious."
      },
      { 
        instruction: "Focus on your hips, pelvis, and lower back. These areas support your entire upper body. Send them appreciation.",
        duration: 35,
        bodyPart: "hips & pelvis",
        guidance: "Thank these strong areas for supporting you. Let them release and soften."
      },
      { 
        instruction: "Bring attention to your legs - thighs, knees, calves. Feel them heavy and supported, carrying you through life.",
        duration: 40,
        bodyPart: "legs",
        guidance: "Your legs have taken you on your life's journey. Honor them with relaxation and gratitude."
      },
      { 
        instruction: "Finally, focus on your feet. They connect you to the earth and ground you in reality. Feel them completely relaxed.",
        duration: 30,
        bodyPart: "feet",
        guidance: "Your feet keep you connected to the earth. Feel rooted, stable, and peacefully grounded."
      },
      { 
        instruction: "Now feel your entire body as one unified, relaxed whole. You are complete, peaceful, and deeply relaxed.",
        duration: 35,
        bodyPart: "integration",
        guidance: "Carry this sense of wholeness and peace with you. Your body is your home, and it is a good home."
      }
    ]
  }
};

const AdvancedRelaxation = () => {
  const [selectedTechnique, setSelectedTechnique] = useState('grounding');
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [initialAnxiety, setInitialAnxiety] = useState(5);
  const [currentAnxiety, setCurrentAnxiety] = useState(5);
  const [showSettings, setShowSettings] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showEmergencyHelp, setShowEmergencyHelp] = useState(false);
  const [voiceSpeed, setVoiceSpeed] = useState(0.8);

  const timerRef = useRef(null);
  const sessionTimerRef = useRef(null);
  const utteranceRef = useRef(null);
  const startTimeRef = useRef(null);

  const currentTechnique = relaxationTechniques[selectedTechnique];
  const currentStepData = currentTechnique.steps[currentStep];

  // Session timing
  useEffect(() => {
    if (isActive && !isPaused) {
      startTimeRef.current = startTimeRef.current || Date.now();
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
    } else if (timeRemaining === 0 && isActive && !isPaused) {
      if (autoAdvance) {
        handleNextStep();
      }
    }

    return () => clearTimeout(timerRef.current);
  }, [isActive, isPaused, timeRemaining, autoAdvance]);

  // Voice guidance
  useEffect(() => {
    if (voiceEnabled && isActive && currentStepData && 'speechSynthesis' in window && !isPaused) {
      // Wait 2 seconds before speaking to allow for transition
      setTimeout(() => {
        if (isActive && !isPaused) {
          speakInstruction(currentStepData.instruction);
          // Speak guidance after instruction with delay
          setTimeout(() => {
            if (isActive && !isPaused) {
              speakInstruction(currentStepData.guidance);
            }
          }, (currentStepData.instruction.length * 50) + 2000); // Adjust timing based on instruction length
        }
      }, 2000);
    }
  }, [currentStep, isActive, voiceEnabled, isPaused]);

  const speakInstruction = (text) => {
    if (!voiceEnabled || isPaused) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = voiceSpeed;
    utterance.pitch = 0.9;
    utterance.volume = 0.8;
    
    const voices = window.speechSynthesis.getVoices();
    const calmVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('samantha') ||
      voice.name.toLowerCase().includes('karen')
    );
    if (calmVoice) utterance.voice = calmVoice;
    
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const startTechnique = () => {
    setIsActive(true);
    setIsPaused(false);
    setCurrentStep(0);
    setIsCompleted(false);
    setTimeRemaining(currentTechnique.steps[0].duration);
    setTotalTime(currentTechnique.steps.reduce((acc, step) => acc + step.duration, 0));
    setCurrentAnxiety(initialAnxiety);
    startTimeRef.current = Date.now();
  };

  const handleNextStep = () => {
    if (currentStep < currentTechnique.steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setTimeRemaining(currentTechnique.steps[nextStep].duration);
      // Simulate gradual anxiety reduction
      setCurrentAnxiety(prev => Math.max(1, prev - 0.3));
    } else {
      completeSession();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setTimeRemaining(currentTechnique.steps[prevStep].duration);
      window.speechSynthesis.cancel();
    }
  };

  const completeSession = () => {
    setIsActive(false);
    setIsCompleted(true);
    setCompletedSessions(prev => prev + 1);
    setCurrentAnxiety(Math.max(1, initialAnxiety - 2 - Math.random() * 2));
    
    if (voiceEnabled) {
      setTimeout(() => {
        speakInstruction("Wonderful! You've completed the session. Take a moment to notice how much calmer and more relaxed you feel now.");
      }, 1000);
    }
  };

  const pauseResume = () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
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
    setCurrentAnxiety(initialAnxiety);
    startTimeRef.current = null;
    window.speechSynthesis.cancel();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStepProgress = () => {
    return ((currentStep + 1) / currentTechnique.steps.length) * 100;
  };

  const getTimeProgress = () => {
    if (totalTime === 0) return 0;
    return ((totalTime - timeRemaining - (currentTechnique.steps.slice(currentStep + 1).reduce((acc, step) => acc + step.duration, 0))) / totalTime) * 100;
  };

  const bgClass = isDarkMode 
    ? "min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-accent-900/30"
    : "min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50";

  const cardClass = isDarkMode
    ? "bg-neutral-800/90 backdrop-blur-lg border border-neutral-700/50 text-white"
    : "bg-white/90 backdrop-blur-lg border border-white/50 text-neutral-800";

  return (
    <div className={`${bgClass} transition-all duration-700 p-4`}>
      <div className="max-w-5xl mx-auto">
        {/* Emergency Help Button */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setShowEmergencyHelp(!showEmergencyHelp)}
            className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all duration-300 animate-pulse"
            title="Crisis Support"
          >
            <ExclamationTriangleIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Emergency Help Panel */}
        {showEmergencyHelp && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
            <div className={`${cardClass} rounded-2xl p-6 max-w-md w-full`}>
              <h3 className="text-xl font-heading font-bold mb-4 text-red-500">🆘 Crisis Support</h3>
              <div className="space-y-4">
                <p className="text-sm">If you're in immediate danger or having thoughts of self-harm:</p>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <p className="font-bold">Crisis Hotlines:</p>
                  <p>• National Suicide Prevention Lifeline: <strong>988</strong></p>
                  <p>• Crisis Text Line: Text HOME to <strong>741741</strong></p>
                  <p>• International: <strong>iasp.info/resources</strong></p>
                </div>
                <p className="text-sm opacity-75">
                  These relaxation techniques are helpful but not a substitute for professional mental health care.
                </p>
              </div>
              <button
                onClick={() => setShowEmergencyHelp(false)}
                className="mt-4 w-full p-3 bg-neutral-500 hover:bg-neutral-600 text-white rounded-lg transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <SparklesIcon className={`w-8 h-8 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`} />
            <h1 className={`text-4xl font-heading ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
              Scientific Relaxation Therapy
            </h1>
            <SparklesIcon className={`w-8 h-8 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`} />
          </div>
          <p className={`text-lg ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'} max-w-2xl mx-auto`}>
            Evidence-based relaxation techniques to calm your mind, release physical tension, and restore inner peace
          </p>
        </div>

        {/* Session Stats */}
        {(isActive || isCompleted) && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className={`${cardClass} rounded-xl p-4 text-center`}>
              <ClockIcon className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-lg font-bold">{formatTime(sessionTime)}</div>
              <div className="text-sm opacity-75">Session Time</div>
            </div>
            <div className={`${cardClass} rounded-xl p-4 text-center`}>
              <div className="text-lg font-bold">{Math.round(getStepProgress())}%</div>
              <div className="text-sm opacity-75">Progress</div>
            </div>
            <div className={`${cardClass} rounded-xl p-4 text-center`}>
              <div className="text-lg font-bold">{Math.round(currentAnxiety * 10) / 10}/10</div>
              <div className="text-sm opacity-75">Stress Level</div>
            </div>
            <div className={`${cardClass} rounded-xl p-4 text-center`}>
              <CheckCircleIcon className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-lg font-bold">{completedSessions}</div>
              <div className="text-sm opacity-75">Completed</div>
            </div>
          </div>
        )}

        {/* Technique Selection */}
        {!isActive && !isCompleted && (
          <>
            <div className="mb-8">
              <h2 className={`text-2xl font-heading font-bold text-center mb-6 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                Choose Your Relaxation Technique
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(relaxationTechniques).map(([key, technique]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTechnique(key)}
                    className={`${cardClass} rounded-xl p-6 text-left transition-all duration-300 hover:scale-105 transform ${
                      selectedTechnique === key ? `ring-2 ring-primary-500 shadow-lg bg-gradient-to-br ${technique.color} text-white` : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{technique.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-lg mb-2">{technique.name}</h3>
                        <p className="text-sm opacity-90 mb-3 leading-relaxed">{technique.description}</p>
                        <div className="flex items-center gap-4 text-xs opacity-75">
                          <span>⏱️ {technique.duration}</span>
                          <span>📍 {technique.steps.length} steps</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pre-Session Anxiety Check */}
            <div className={`${cardClass} rounded-xl p-6 mb-8`}>
              <h3 className="font-heading font-bold text-lg mb-4 text-center">How are you feeling right now?</h3>
              <div className="max-w-md mx-auto">
                <label className="block text-sm mb-2">Current stress/anxiety level:</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={initialAnxiety}
                  onChange={(e) => setInitialAnxiety(parseInt(e.target.value))}
                  className="w-full accent-primary-500 mb-2"
                />
                <div className="flex justify-between text-xs opacity-75">
                  <span>Very calm</span>
                  <span className="font-bold">{initialAnxiety}/10</span>
                  <span>Very anxious</span>
                </div>
                <p className="text-sm text-center mt-3 opacity-75">
                  We'll track your progress during the session
                </p>
              </div>
            </div>
          </>
        )}

        {/* Main Session Interface */}
        {!isCompleted && (
          <div className={`${cardClass} rounded-2xl shadow-soft p-8`}>
            {!isActive ? (
              <div className="text-center">
                <div className="mb-6">
                  <div className={`inline-block p-4 rounded-full bg-gradient-to-br ${currentTechnique.color} text-white mb-4`}>
                    <div className="text-4xl">{currentTechnique.icon}</div>
                  </div>
                  <h2 className="text-2xl font-heading font-bold mb-3">
                    {currentTechnique.name}
                  </h2>
                  <p className="text-lg opacity-75 mb-4 max-w-2xl mx-auto">
                    {currentTechnique.description}
                  </p>
                  <div className="text-sm opacity-60">
                    Duration: {currentTechnique.duration} • {currentTechnique.steps.length} guided steps
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={startTechnique}
                    className={`flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${currentTechnique.color} text-white rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                  >
                    <PlayIcon className="w-6 h-6" />
                    Begin Relaxation Session
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Progress Indicators */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">Step {currentStep + 1} of {currentTechnique.steps.length}</span>
                    <span className="text-sm">{formatTime(timeRemaining)} remaining</span>
                  </div>
                  <div className={`w-full ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'} rounded-full h-3 mb-2`}>
                    <div 
                      className={`bg-gradient-to-r ${currentTechnique.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${getStepProgress()}%` }}
                    />
                  </div>
                  <div className={`w-full ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'} rounded-full h-1`}>
                    <div 
                      className="bg-gradient-to-r from-secondary-400 to-secondary-600 h-1 rounded-full transition-all duration-1000"
                      style={{ width: `${getTimeProgress()}%` }}
                    />
                  </div>
                </div>

                {/* Current Step Display */}
                <div className="text-center mb-8">
                  <div className="mb-6">
                    <div className={`inline-block p-6 rounded-full bg-gradient-to-br ${currentTechnique.color} text-white mb-4 animate-pulse`}>
                      <div className="text-5xl">{currentTechnique.icon}</div>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-sm font-medium opacity-60 uppercase tracking-wider mb-2">
                        {currentStepData.bodyPart}
                      </h3>
                      <div className={`inline-block px-4 py-2 rounded-full text-sm ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-100'} opacity-80`}>
                        Step {currentStep + 1} • {formatTime(timeRemaining)} left
                      </div>
                    </div>
                  </div>
                  
                  <div className="max-w-3xl mx-auto space-y-6">
                    <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-neutral-700/50' : 'bg-neutral-50'} border-l-4 border-primary-500`}>
                      <p className="text-lg font-heading leading-relaxed">
                        {currentStepData.instruction}
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gradient-to-r from-primary-900/30 to-secondary-900/30' : 'bg-gradient-to-r from-primary-50 to-secondary-50'} border border-primary-200/30`}>
                      <p className={`text-base italic font-body leading-relaxed ${isDarkMode ? 'text-primary-300' : 'text-primary-700'}`}>
                        "{currentStepData.guidance}"
                      </p>
                    </div>
                  </div>

                  {/* Breathing Visual Aid */}
                  <div className="flex justify-center mt-8 mb-6">
                    <div className="relative">
                      <div 
                        className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentTechnique.color} opacity-30 animate-pulse`}
                        style={{ animationDuration: '4s' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${currentTechnique.color} opacity-60 animate-pulse`} 
                             style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white font-bold text-sm">{timeRemaining}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Session Controls */}
                <div className="flex justify-center items-center gap-4">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStep === 0}
                    className={`p-3 rounded-full transition-all ${
                      currentStep === 0 
                        ? 'opacity-30 cursor-not-allowed bg-neutral-400' 
                        : isDarkMode 
                        ? 'bg-neutral-700 hover:bg-neutral-600 text-white' 
                        : 'bg-white hover:bg-neutral-50 text-neutral-700 shadow-md'
                    }`}
                    title="Previous Step"
                  >
                    <ChevronLeftIcon className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={pauseResume}
                    className={`p-4 rounded-full transition-all shadow-lg hover:scale-105 ${
                      isPaused 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                        : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                    }`}
                    title={isPaused ? "Resume" : "Pause"}
                  >
                    {isPaused ? <PlayIcon className="w-6 h-6" /> : <PauseIcon className="w-6 h-6" />}
                  </button>
                  
                  <button
                    onClick={handleNextStep}
                    className={`p-3 rounded-full transition-all ${
                      isDarkMode 
                        ? 'bg-neutral-700 hover:bg-neutral-600 text-white' 
                        : 'bg-white hover:bg-neutral-50 text-neutral-700 shadow-md'
                    }`}
                    title="Next Step"
                  >
                    <ChevronRightIcon className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={resetSession}
                    className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all hover:scale-105"
                    title="Reset Session"
                  >
                    <ArrowPathIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Session Tips */}
                <div className={`mt-8 p-4 rounded-xl ${isDarkMode ? 'bg-neutral-700/30' : 'bg-neutral-50'} text-center`}>
                  <p className="text-sm opacity-75">
                    💡 Tip: If you miss an instruction, you can pause and use the previous/next buttons to navigate
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Completion Screen */}
        {isCompleted && (
          <div className={`${cardClass} rounded-2xl p-8 text-center`}>
            <div className="mb-6">
              <div className="text-6xl mb-4 animate-bounce">🌟</div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                Excellent Work!
              </h2>
              <p className="text-lg opacity-75 mb-6 max-w-2xl mx-auto">
                You've completed the {currentTechnique.name} session. Take a moment to notice the positive changes in your body and mind.
              </p>
            </div>
            
            {/* Results Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-neutral-700/50' : 'bg-neutral-50'}`}>
                <div className="text-2xl font-bold text-green-500">
                  -{Math.round((initialAnxiety - currentAnxiety) * 10) / 10}
                </div>
                <div className="text-sm opacity-75">Stress Reduction</div>
              </div>
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-neutral-700/50' : 'bg-neutral-50'}`}>
                <div className="text-2xl font-bold text-blue-500">{formatTime(sessionTime)}</div>
                <div className="text-sm opacity-75">Time Invested</div>
              </div>
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-neutral-700/50' : 'bg-neutral-50'}`}>
                <div className="text-2xl font-bold text-purple-500">{completedSessions}</div>
                <div className="text-sm opacity-75">Total Sessions</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={resetSession}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all hover:scale-105"
              >
                Try Another Technique
              </button>
              <button
                onClick={startTechnique}
                className="px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white rounded-xl transition-all hover:scale-105"
              >
                Repeat This Session
              </button>
            </div>

            {/* Post-session reflection */}
            <div className={`mt-8 p-6 rounded-xl ${isDarkMode ? 'bg-gradient-to-r from-primary-900/20 to-secondary-900/20' : 'bg-gradient-to-r from-primary-50 to-secondary-50'} text-left`}>
              <h4 className="font-heading font-bold mb-3">🌱 Reflection & Integration</h4>
              <ul className="text-sm space-y-2 opacity-90">
                <li>• Notice any areas of your body that feel more relaxed now</li>
                <li>• Take note of any changes in your breathing or heart rate</li>
                <li>• Consider how you might carry this sense of calm into your day</li>
                <li>• Remember: regular practice makes these techniques more effective</li>
              </ul>
            </div>
          </div>
        )}

        {/* Settings Panel */}
        <div className="flex justify-center my-6">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-3 rounded-full transition-all hover:scale-110 ${
              showSettings 
                ? 'bg-accent-500 text-white' 
                : isDarkMode 
                ? 'bg-neutral-700 hover:bg-neutral-600 text-white' 
                : 'bg-white hover:bg-neutral-50 text-neutral-700 shadow-md'
            }`}
            title="Settings"
          >
            <AdjustmentsHorizontalIcon className="w-6 h-6" />
          </button>
        </div>

        {showSettings && (
          <div className={`${cardClass} rounded-2xl p-6 mb-6`}>
            <h3 className="text-lg font-heading font-bold mb-6 text-center">Session Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Voice Guidance */}
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={voiceEnabled}
                    onChange={(e) => setVoiceEnabled(e.target.checked)}
                    className="w-4 h-4 rounded accent-primary-500"
                  />
                  <span className="flex items-center gap-2">
                    {voiceEnabled ? <SpeakerWaveIcon className="w-4 h-4 text-primary-500" /> : <SpeakerXMarkIcon className="w-4 h-4 text-neutral-400" />}
                    Voice Guidance
                  </span>
                </label>
                
                {voiceEnabled && (
                  <div>
                    <label className="block text-xs mb-1 opacity-75">Voice Speed</label>
                    <input
                      type="range"
                      min="0.6"
                      max="1.2"
                      step="0.1"
                      value={voiceSpeed}
                      onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                      className="w-full accent-primary-500"
                    />
                    <div className="text-xs text-center opacity-60">{voiceSpeed}x</div>
                  </div>
                )}
              </div>

              {/* Auto Advance */}
              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={autoAdvance}
                    onChange={(e) => setAutoAdvance(e.target.checked)}
                    className="w-4 h-4 rounded accent-primary-500"
                  />
                  <span className="flex items-center gap-2">
                    <PlayIcon className="w-4 h-4 text-secondary-500" />
                    Auto-advance Steps
                  </span>
                </label>
                <p className="text-xs opacity-60 mt-1">Automatically move to next step when timer ends</p>
              </div>

              {/* Dark Mode */}
              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={(e) => setIsDarkMode(e.target.checked)}
                    className="w-4 h-4 rounded accent-primary-500"
                  />
                  <span className="flex items-center gap-2">
                    {isDarkMode ? <EyeSlashIcon className="w-4 h-4 text-neutral-300" /> : <EyeIcon className="w-4 h-4 text-neutral-600" />}
                    Dark Mode
                  </span>
                </label>
                <p className="text-xs opacity-60 mt-1">Gentle on the eyes for evening sessions</p>
              </div>

              {/* Session Stats */}
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-500">{completedSessions}</div>
                <div className="text-xs opacity-75">Sessions Completed</div>
                <div className="text-xs opacity-60 mt-1">Keep building your practice!</div>
              </div>
            </div>
          </div>
        )}

        {/* Educational Information */}
        <div className={`${cardClass} rounded-2xl p-6 text-center`}>
          <h3 className="text-lg font-heading font-bold mb-4">🧠 The Science Behind Relaxation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium text-primary-600 dark:text-primary-400">Progressive Relaxation</h4>
              <p className="opacity-75">Developed by Edmund Jacobson in the 1920s, this technique helps distinguish between muscle tension and relaxation, reducing physical anxiety symptoms.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-secondary-600 dark:text-secondary-400">Grounding Techniques</h4>
              <p className="opacity-75">Based on mindfulness principles, grounding helps interrupt anxiety spirals by anchoring attention in the present moment through sensory awareness.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-accent-600 dark:text-accent-400">Visualization</h4>
              <p className="opacity-75">Uses guided imagery to activate the parasympathetic nervous system, creating real physiological changes that promote relaxation and healing.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-neutral-600 dark:text-neutral-400">Body Scanning</h4>
              <p className="opacity-75">Rooted in mindfulness meditation, body scanning increases body awareness and helps release unconsciously held tension and stress.</p>
            </div>
          </div>
          
          <div className={`mt-6 p-4 rounded-xl ${isDarkMode ? 'bg-neutral-700/30' : 'bg-neutral-50'} text-xs opacity-75`}>
            <p className="mb-2">
              <strong>Note:</strong> These techniques are evidence-based wellness practices but are not substitutes for professional mental health treatment.
            </p>
            <p>
              If you're experiencing persistent anxiety, depression, or other mental health concerns, please consider consulting with a qualified healthcare provider.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedRelaxation;
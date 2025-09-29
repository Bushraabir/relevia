import { useState, useEffect, useRef } from 'react';

function Mindfulness() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [responses, setResponses] = useState([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [showEmergency, setShowEmergency] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const inputRef = useRef(null);

  const emergencyResources = [
    { 
      title: "Cold Water", 
      description: "Hold cold water in your hands or splash gently on your face",
      icon: "❄️",
      category: "Physical",
      color: "from-blue-400/30 to-cyan-400/20",
      delay: "0s"
    },
    { 
      title: "Muscle Release", 
      description: "Tense all muscles for 5 seconds, then slowly release",
      icon: "💪",
      category: "Physical",
      color: "from-purple-400/30 to-pink-400/20",
      delay: "0.1s"
    },
    { 
      title: "Safe Space", 
      description: "Picture yourself in your most peaceful place",
      icon: "🏞️",
      category: "Mental",
      color: "from-green-400/30 to-emerald-400/20",
      delay: "0.2s"
    },
    { 
      title: "Object Focus", 
      description: "Choose one object and describe every detail",
      icon: "🔍",
      category: "Mental",
      color: "from-amber-400/30 to-orange-400/20",
      delay: "0.3s"
    },
    { 
      title: "Temperature", 
      description: "Move to a different temperature environment",
      icon: "🌡️",
      category: "Environmental",
      color: "from-teal-400/30 to-blue-400/20",
      delay: "0.4s"
    },
    { 
      title: "Movement", 
      description: "Gentle stretches, shoulder rolls, or finger movements",
      icon: "🤸‍♀️",
      category: "Physical",
      color: "from-indigo-400/30 to-purple-400/20",
      delay: "0.5s"
    }
  ];

  const inspirationalQuotes = [
    {
      text: "You are braver than you believe, stronger than you seem, and more loved than you know.",
      author: "A.A. Milne"
    },
    {
      text: "This too shall pass. Every storm runs out of rain.",
      author: "Maya Angelou"
    },
    {
      text: "Peace comes from within. You have everything you need inside you right now.",
      author: "Buddha"
    },
    {
      text: "You've survived 100% of your difficult days. That's an incredible track record.",
      author: "Anonymous"
    },
    {
      text: "Breathe in courage, breathe out fear. You are safe in this moment.",
      author: "Mindfulness Practice"
    },
    {
      text: "The present moment is the only time over which we have dominion.",
      author: "Thich Nhat Hanh"
    },
    {
      text: "You are enough, exactly as you are, in this very moment.",
      author: "Self-Compassion"
    }
  ];

  const mindfulnessSteps = [
    {
      sense: "Sight",
      instruction: "5 things you can see around you",
      prompt: "Look slowly around your space. Notice colors, shapes, textures, and light. Let your eyes rest gently on each object.",
      placeholder: "The warm sunlight streaming through the window, casting gentle shadows...",
      icon: "👁️",
      gradient: "from-sky-400 via-sky-500 to-sky-600",
      glassGradient: "from-sky-400/15 via-sky-500/8 to-sky-600/15",
      shadowColor: "rgba(14, 165, 233, 0.3)",
      bgColor: "sky",
      number: 5,
      helpTip: "Focus on details like textures, colors, and the way light falls on objects"
    },
    {
      sense: "Touch",
      instruction: "4 things you can feel or touch",
      prompt: "Notice the textures around you - soft, rough, warm, cool. Feel the weight of your body being supported.",
      placeholder: "The soft fabric of my sweater, the cool surface of my desk...",
      icon: "✋",
      gradient: "from-emerald-400 via-emerald-500 to-emerald-600",
      glassGradient: "from-emerald-400/15 via-emerald-500/8 to-emerald-600/15",
      shadowColor: "rgba(16, 185, 129, 0.3)",
      bgColor: "emerald",
      number: 4,
      helpTip: "Touch different surfaces and notice temperature, texture, and weight"
    },
    {
      sense: "Sound",
      instruction: "3 sounds you can hear right now",
      prompt: "Close your eyes if comfortable. Listen to the sounds around you - both near and far. Let them wash over you without judgment.",
      placeholder: "The gentle hum of the air conditioner, distant birds singing...",
      icon: "👂",
      gradient: "from-violet-400 via-violet-500 to-violet-600",
      glassGradient: "from-violet-400/15 via-violet-500/8 to-violet-600/15",
      shadowColor: "rgba(139, 92, 246, 0.3)",
      bgColor: "violet",
      number: 3,
      helpTip: "Listen for both obvious and subtle sounds in your environment"
    },
    {
      sense: "Smell",
      instruction: "2 scents you notice or remember",
      prompt: "Take a slow, deep breath through your nose. Notice any scents in the air, or bring to mind a comforting smell.",
      placeholder: "The comforting aroma of coffee, the fresh scent of rain...",
      icon: "👃",
      gradient: "from-amber-400 via-orange-500 to-red-500",
      glassGradient: "from-amber-400/15 via-orange-500/8 to-red-500/15",
      shadowColor: "rgba(245, 158, 11, 0.3)",
      bgColor: "amber",
      number: 2,
      helpTip: "If you can't smell anything, imagine a favorite comforting scent"
    },
    {
      sense: "Taste",
      instruction: "1 taste in your mouth",
      prompt: "Notice any taste present, or simply the clean, neutral taste of calm breathing. You are fully present in this moment.",
      placeholder: "The refreshing taste of mint tea, or simply calm breathing...",
      icon: "👅",
      gradient: "from-pink-400 via-rose-500 to-rose-600",
      glassGradient: "from-pink-400/15 via-rose-500/8 to-rose-600/15",
      shadowColor: "rgba(236, 72, 153, 0.3)",
      bgColor: "pink",
      number: 1,
      helpTip: "Even the taste of your breath counts - you're connecting with your body"
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Cycle through quotes automatically
  useEffect(() => {
    if (showQuotes) {
      const interval = setInterval(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % inspirationalQuotes.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [showQuotes]);

  const startExercise = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsActive(true);
      setCurrentStep(0);
      setIsCompleted(false);
      setResponses([]);
      setCurrentResponse('');
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }, 1500);
  };

  const nextStep = () => {
    if (currentResponse.trim()) {
      setResponses(prev => [...prev, {
        step: currentStep,
        response: currentResponse.trim(),
        sense: mindfulnessSteps[currentStep].sense,
        number: mindfulnessSteps[currentStep].number,
        icon: mindfulnessSteps[currentStep].icon
      }]);
      setCurrentResponse('');
    }

    if (currentStep < mindfulnessSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimeout(() => inputRef.current?.focus(), 600);
    } else {
      setShowCelebration(true);
      setTimeout(() => {
        setIsCompleted(true);
        setShowCelebration(false);
      }, 2000);
    }
  };

  const resetExercise = () => {
    setIsActive(false);
    setCurrentStep(0);
    setIsCompleted(false);
    setResponses([]);
    setCurrentResponse('');
    setShowEmergency(false);
    setShowQuotes(false);
    setShowCelebration(false);
  };

  const handleInputChange = (e) => {
    setCurrentResponse(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && currentResponse.trim()) {
      nextStep();
    }
  };

  const currentStepData = mindfulnessSteps[currentStep] || mindfulnessSteps[0];
  const progressPercentage = ((currentStep + 1) / mindfulnessSteps.length) * 100;

  // Reusable components
  const GlassCard = ({ children, className = "", blur = "backdrop-blur-xl", animate = false, delay = "0s", ...props }) => (
    <div 
      className={`bg-white/[0.08] ${blur} border border-white/[0.15] shadow-2xl ${className} ${
        animate ? 'animate-fadeInUp' : ''
      } transition-all duration-700 hover:bg-white/[0.12] hover:border-white/[0.2]`}
      style={{
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        animationDelay: delay,
      }}
      {...props}
    >
      {children}
    </div>
  );

  const FloatingOrb = ({ size, color, delay, duration, position, opacity = 0.2 }) => (
    <div
      className={`absolute ${position} pointer-events-none`}
      style={{
        animation: `float ${duration}s infinite ease-in-out`,
        animationDelay: `${delay}s`,
        opacity
      }}
    >
      <div
        className={`${size} ${color} rounded-full`}
        style={{
          background: `radial-gradient(circle, currentColor 0%, transparent 70%)`,
          filter: 'blur(40px)'
        }}
      />
    </div>
  );

  const LoadingSpinner = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <GlassCard className="p-8 rounded-3xl text-center max-w-sm mx-4">
        <div className="relative mb-6">
          <div className="w-16 h-16 mx-auto relative">
            <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-white/20 animate-ping" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl animate-pulse">🕊️</div>
            </div>
          </div>
        </div>
        <p className="text-white/90 text-lg">Preparing your safe space...</p>
      </GlassCard>
    </div>
  );

  const CelebrationOverlay = () => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-sky-500/20 via-emerald-500/20 to-violet-500/20 backdrop-blur-sm transition-all duration-1000 ${
      showCelebration ? 'opacity-100 visible' : 'opacity-0 invisible'
    }`}>
      <div className="text-center animate-bounce">
        <div className="text-8xl mb-6">🎉</div>
        <h3 className="text-3xl font-bold text-white mb-2">Congratulations!</h3>
        <p className="text-white/80 text-lg">You've completed your grounding journey</p>
      </div>
    </div>
  );

  const EmergencyModal = () => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
      showEmergency ? 'opacity-100 visible' : 'opacity-0 invisible'
    }`}>
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-lg"
        onClick={() => setShowEmergency(false)}
      />

      <GlassCard className={`relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-3xl transform transition-all duration-500 ${
        showEmergency ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
      }`}>
        <div className="p-4 md:p-6 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-xl border-b border-white/10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Emergency Relief</h2>
              <p className="text-white/80 text-sm">Immediate grounding techniques</p>
            </div>
            <button
              onClick={() => setShowEmergency(false)}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {emergencyResources.map((resource, index) => (
              <GlassCard
                key={index}
                animate={showEmergency}
                delay={resource.delay}
                className="group p-4 rounded-xl cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {resource.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{resource.title}</h3>
                    <span className="text-xs px-2 py-1 bg-white/20 text-white/90 rounded-full">
                      {resource.category}
                    </span>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{resource.description}</p>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="p-4 text-center rounded-2xl">
            <div className="text-3xl mb-3">💝</div>
            <h3 className="font-bold text-white text-lg mb-2">Remember</h3>
            <p className="text-white/80 text-base leading-relaxed">
              You are safe. This feeling will pass. You have overcome challenges before, and you will overcome this too.
            </p>
          </GlassCard>
        </div>
      </GlassCard>
    </div>
  );

  const QuotesModal = () => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
      showQuotes ? 'opacity-100 visible' : 'opacity-0 invisible'
    }`}>
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-lg"
        onClick={() => setShowQuotes(false)}
      />

      <GlassCard className={`relative max-w-2xl w-full rounded-3xl transform transition-all duration-500 ${
        showQuotes ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
      }`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-white">Words of Comfort</h2>
            <button
              onClick={() => setShowQuotes(false)}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 text-white/70 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <div className="min-h-[200px] flex items-center justify-center">
            <GlassCard className="p-6 rounded-2xl text-center transition-all duration-1000">
              <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-4">
                "{inspirationalQuotes[currentQuoteIndex].text}"
              </p>
              <p className="text-white/60 text-sm">— {inspirationalQuotes[currentQuoteIndex].author}</p>
            </GlassCard>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {inspirationalQuotes.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentQuoteIndex ? 'bg-white/80' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );

  // Welcome Screen
  if (!isActive && !isCompleted) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {isLoading && <LoadingSpinner />}
        
        <div 
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x * 0.1}% ${mousePosition.y * 0.1}%, rgba(14,165,233,0.15) 0%, transparent 50%),
              radial-gradient(circle at ${100 - mousePosition.x * 0.1}% ${100 - mousePosition.y * 0.1}%, rgba(16,185,129,0.12) 0%, transparent 50%),
              linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)
            `
          }}
        />

        <FloatingOrb size="w-48 h-48 md:w-80 md:h-80" color="text-sky-400" delay="0" duration="25" position="-top-24 -left-24 md:-top-40 md:-left-40" />
        <FloatingOrb size="w-32 h-32 md:w-64 md:h-64" color="text-emerald-400" delay="8" duration="30" position="-bottom-16 -right-16 md:-bottom-32 md:-right-32" />
        <FloatingOrb size="w-24 h-24 md:w-48 md:h-48" color="text-violet-400" delay="15" duration="20" position="top-1/4 left-1/4" />

        <div className="absolute top-4 right-4 flex gap-2 z-20">
          <button
            onClick={() => setShowQuotes(true)}
            className="transition-all duration-500 hover:scale-105"
          >
            <GlassCard className="px-3 py-2 rounded-xl text-xs">
              <span className="text-white/90 font-medium flex items-center gap-1">
                <span>💭</span>
                <span className="hidden sm:inline">Quotes</span>
              </span>
            </GlassCard>
          </button>
          <button
            onClick={() => setShowEmergency(true)}
            className="transition-all duration-500 hover:scale-105"
          >
            <div className="px-3 py-2 rounded-xl backdrop-blur-xl border border-red-400/40 bg-red-500/20 text-xs">
              <span className="text-white font-medium flex items-center gap-1">
                <span>🆘</span>
                <span className="hidden sm:inline">Help</span>
              </span>
            </div>
          </button>
        </div>

        <EmergencyModal />
        <QuotesModal />

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="text-center max-w-4xl">
            <div className="mb-8 relative">
              <div 
                className="inline-flex items-center justify-center w-20 h-20 md:w-32 md:h-32 rounded-full shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(14,165,233,0.25) 0%, rgba(16,185,129,0.2) 50%, rgba(139,92,246,0.15) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                <span className="text-3xl md:text-6xl">🕊️</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-white drop-shadow-2xl">
              Find Your Peace
            </h1>

            <p className="text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 leading-relaxed max-w-3xl mx-auto">
              You're in a safe space. Let's gently guide you back to calm with the proven 5-4-3-2-1 grounding technique.
            </p>

            <GlassCard className="p-4 md:p-8 mb-8 md:mb-12 max-w-2xl mx-auto rounded-2xl">
              <div className="text-2xl md:text-4xl mb-3">✨</div>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                "This moment of difficulty will pass. You are stronger than you know, and you're not alone in this journey."
              </p>
            </GlassCard>

            <button
              onClick={startExercise}
              disabled={isLoading}
              className="px-6 md:px-12 py-3 md:py-4 text-white rounded-full text-base md:text-xl font-medium transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              style={{
                background: 'linear-gradient(135deg, rgba(14,165,233,0.4) 0%, rgba(16,185,129,0.35) 50%, rgba(139,92,246,0.4) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}
            >
              Begin Your Journey to Calm →
            </button>

            <p className="text-white/60 text-sm">
              A gentle, step-by-step process that takes about 5-10 minutes
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Completion Screen
  if (isCompleted) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <CelebrationOverlay />
        
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)'
          }}
        />

        <FloatingOrb size="w-32 h-32 md:w-64 md:h-64" color="text-emerald-400" delay="0" duration="25" position="-top-16 -left-16" />
        <FloatingOrb size="w-48 h-48 md:w-80 md:h-80" color="text-sky-400" delay="12" duration="30" position="-bottom-24 -right-24" />

        <div className="relative z-10 min-h-screen p-4 overflow-y-auto">
          <div className="max-w-4xl mx-auto py-8">
            <GlassCard className="p-6 md:p-12 rounded-3xl text-center">
              <div className="relative mb-6">
                <div className="text-4xl md:text-6xl filter drop-shadow-2xl">🌟</div>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-white">
                Beautiful Work!
              </h2>

              <p className="text-white/80 text-base sm:text-lg md:text-xl mb-6 leading-relaxed max-w-2xl mx-auto">
                You've successfully completed the grounding exercise. Feel the calm settling into your body and mind.
              </p>

              <GlassCard className="p-4 md:p-6 mb-6 max-w-xl mx-auto rounded-2xl">
                <p className="text-white/90 text-base md:text-lg leading-relaxed">
                  "Peace comes from within. Do not seek it without." — Buddha
                </p>
              </GlassCard>

              {responses.length > 0 && (
                <GlassCard className="p-4 md:p-6 mb-6 text-left rounded-2xl">
                  <h3 className="text-lg md:text-xl font-bold mb-4 text-white text-center">Your Grounding Journey</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {responses.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                      >
                        <div 
                          className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${mindfulnessSteps[item.step]?.shadowColor}, ${mindfulnessSteps[item.step]?.shadowColor}80)`,
                          }}
                        >
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white mb-1 text-sm">
                            {item.sense} ({item.number})
                          </p>
                          <p className="text-white/70 text-sm leading-relaxed break-words">{item.response}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={resetExercise}
                  className="px-6 py-3 text-white rounded-full text-base font-medium transition-all duration-500 transform hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(14,165,233,0.4) 0%, rgba(16,185,129,0.4) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                >
                  Practice Again
                </button>
                <button
                  onClick={() => setShowQuotes(true)}
                  className="px-6 py-3 rounded-full text-base font-medium transition-all duration-500 transform hover:scale-105"
                >
                  <GlassCard className="px-6 py-3 rounded-full text-white">
                    Read More Comfort
                  </GlassCard>
                </button>
              </div>
            </GlassCard>
          </div>
        </div>

        <QuotesModal />
      </div>
    );
  }

  // Main Exercise Interface
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x * 0.05}% ${mousePosition.y * 0.05}%, ${currentStepData.shadowColor} 0%, transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)
          `
        }}
      />

      <div className="fixed top-0 left-0 w-full h-1.5 z-30 bg-black/30">
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
          style={{ 
            width: `${progressPercentage}%`,
            background: `linear-gradient(90deg, ${currentStepData.gradient.replace('from-', '').replace('via-', ', ').replace('to-', ', ')})`,
            boxShadow: `0 0 15px ${currentStepData.shadowColor}`
          }}
        />
      </div>

      <FloatingOrb size="w-32 h-32" color={`text-${currentStepData.bgColor}-300`} delay="0" duration="25" position="top-1/4 left-1/6" opacity={0.15} />
      <FloatingOrb size="w-24 h-24" color={`text-${currentStepData.bgColor}-400`} delay="10" duration="20" position="bottom-1/3 right-1/4" opacity={0.1} />

      <button
        onClick={() => setShowEmergency(true)}
        className="fixed top-4 right-4 z-40 transition-all duration-500 hover:scale-105"
      >
        <div className="px-3 py-2 rounded-xl backdrop-blur-xl border border-red-400/40 bg-red-500/20 text-xs">
          <span className="text-white font-medium flex items-center gap-1">
            <span>🆘</span>
            <span className="hidden sm:inline">Help</span>
          </span>
        </div>
      </button>

      <EmergencyModal />

      <div className="flex items-center justify-center min-h-screen p-4 pt-8">
        <div className="w-full max-w-4xl">
          <div className="transform transition-all duration-700 ease-out">
            <GlassCard className="rounded-3xl overflow-hidden">
              <div className="relative p-4 md:p-8 overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-60"
                  style={{
                    background: `linear-gradient(135deg, ${currentStepData.glassGradient.replace('from-', '').replace('via-', ', ').replace('to-', ', ')})`,
                  }}
                />
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                      <div 
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl backdrop-blur-xl border border-white/30"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                        }}
                      >
                        {currentStepData.icon}
                      </div>
                      <div>
                        <p className="text-white/80 text-sm font-medium mb-1">Step {currentStep + 1} of 5</p>
                        <p className="text-xl md:text-2xl font-bold text-white">{currentStepData.sense}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white">
                        {currentStepData.number}
                      </div>
                      <div className="text-white/70 font-medium text-sm">items</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-8">
                <div className="text-center mb-6">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                    Notice {currentStepData.instruction}
                  </h2>
                  
                  <GlassCard className="p-4 md:p-6 max-w-2xl mx-auto rounded-2xl mb-4">
                    <p className="text-white/90 text-sm md:text-base leading-relaxed">
                      {currentStepData.prompt}
                    </p>
                  </GlassCard>

                  <div className="max-w-xl mx-auto">
                    <p className="text-white/60 text-xs md:text-sm italic">
                      💡 {currentStepData.helpTip}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="relative max-w-3xl mx-auto">
                    <textarea
                      ref={inputRef}
                      value={currentResponse}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder={currentStepData.placeholder}
                      className="w-full p-4 rounded-2xl text-sm md:text-base resize-none transition-all duration-500 min-h-[100px] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        boxShadow: currentResponse ? `0 0 20px ${currentStepData.shadowColor}` : 'none'
                      }}
                      rows={3}
                    />
                    
                    <div className={`absolute top-3 right-3 flex items-center gap-1 transition-all duration-300 ${
                      isTyping ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}>
                      <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" style={{animationDelay: '0.2s'}} />
                      <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" style={{animationDelay: '0.4s'}} />
                    </div>
                  </div>
                  
                  <div className={`flex justify-between items-center gap-2 mt-3 max-w-3xl mx-auto transition-all duration-300 ${
                    currentResponse.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}>
                    <div className="text-white/60 text-xs flex items-center gap-2">
                      <span>{currentResponse.length} characters</span>
                      {currentResponse.length > 50 && <span className="text-green-400">✓ Great detail!</span>}
                    </div>
                    <div className="text-white/60 text-xs">
                      Press Ctrl+Enter to continue
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-2 mb-6">
                  {mindfulnessSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`relative transition-all duration-700 ${
                        index <= currentStep ? 'scale-125' : 'scale-100'
                      }`}
                    >
                      <div
                        className={`h-2 rounded-full transition-all duration-700 ${
                          index < currentStep 
                            ? 'w-8 opacity-100' 
                            : index === currentStep
                            ? 'w-8 opacity-100'
                            : 'w-2 opacity-50'
                        }`}
                        style={{
                          background: index <= currentStep 
                            ? `linear-gradient(90deg, ${step.gradient.replace('from-', '').replace('via-', ', ').replace('to-', ', ')})` 
                            : 'rgba(255,255,255,0.2)',
                          boxShadow: index <= currentStep ? `0 0 10px ${step.shadowColor}` : 'none'
                        }}
                      />
                      
                      {index === currentStep && (
                        <div 
                          className="absolute inset-0 rounded-full animate-ping opacity-40"
                          style={{
                            background: `linear-gradient(90deg, ${step.gradient.replace('from-', '').replace('via-', ', ').replace('to-', ', ')})`,
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    onClick={nextStep}
                    disabled={!currentResponse.trim()}
                    className={`px-6 md:px-12 py-3 md:py-4 rounded-full text-base md:text-lg font-medium transition-all duration-500 transform w-full sm:w-auto ${
                      currentResponse.trim()
                        ? 'hover:scale-105 cursor-pointer'
                        : 'cursor-not-allowed opacity-50'
                    }`}
                    style={{
                      background: currentResponse.trim() 
                        ? `linear-gradient(135deg, ${currentStepData.glassGradient.replace('from-', '').replace('via-', ', ').replace('to-', ', ')})` 
                        : 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      boxShadow: currentResponse.trim() ? `0 15px 30px ${currentStepData.shadowColor}` : 'none'
                    }}
                  >
                    <span className="text-white flex items-center justify-center gap-2">
                      <span>
                        {currentStep < mindfulnessSteps.length - 1 ? 'Continue Journey' : 'Complete Exercise'}
                      </span>
                      {currentResponse.trim() && (
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      )}
                    </span>
                  </button>

                  <p className="text-white/60 text-sm mt-3">
                    {currentStep + 1} of {mindfulnessSteps.length} steps completed
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Mindfulness;
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  HeartIcon,
  SparklesIcon,
  MoonIcon,
  SunIcon,
  AdjustmentsHorizontalIcon,
  PlayIcon,
  PauseIcon,
  ArrowPathIcon
} from '@heroicons/react/24/solid';

const affirmationCategories = {
  panic: [
    "I am safe right now. This feeling will pass, and I will emerge stronger and more peaceful than before.",
    "My breath is my anchor. With each inhale, I welcome calm. With each exhale, I release fear.",
    "I have survived every difficult moment in my life so far, and I will survive this one too with grace.",
    "This is temporary. My body knows how to return to balance, and peace is flowing back to me now.",
    "I am grounded in this moment. My feet are on solid ground, and I am completely safe.",
    "I choose to release control and trust that everything is working out perfectly for my highest good.",
    "My nervous system is calming down with each breath I take. I am returning to peace naturally.",
    "I acknowledge this feeling without judgment and allow it to pass through me like a wave.",
    "My body is doing its best to protect me. I thank it, and I let it know I am safe.",
    "I have walked through storms before. This moment will also settle into calm skies.",
    "Right here, right now, nothing is harming me. I can rest in this truth.",
    "My heartbeat is slowing, my breath is steadying, and calm is returning to me."
  ],
  anxiety: [
    "I release the need to control everything. I trust in the natural flow of life and my ability to adapt.",
    "My thoughts are just thoughts. I observe them with kindness and let them pass like clouds in the sky.",
    "I am exactly where I need to be in this moment. Everything is unfolding as it should.",
    "I have the strength to handle whatever comes my way. I am resilient, capable, and deeply loved.",
    "I choose peace over worry. I choose presence over anxiety. I choose love over fear.",
    "My nervous system is calming down. With each moment, I feel more centered and at ease.",
    "I trust my ability to navigate uncertainty with wisdom and courage.",
    "Each breath I take dissolves tension and brings me deeper into the present moment.",
    "I don’t need all the answers right now. It is enough to simply breathe and take one step at a time.",
    "It’s okay to rest. Rest is productive. My worth is not measured by constant doing.",
    "I am safe to let go of worry. Peace belongs to me right now.",
    "I replace fear with curiosity. I choose to wonder what good might come instead of fearing the worst."
  ],
  confidence: [
    "I am worthy of love, respect, and all the beautiful things life has to offer.",
    "My unique gifts and talents make a meaningful difference in this world.",
    "I trust my intuition and make decisions with wisdom and confidence.",
    "I am enough, exactly as I am. I don't need to be perfect to be worthy of happiness.",
    "I embrace challenges as opportunities to grow and discover my incredible inner strength.",
    "I radiate confidence and attract positive experiences into my life effortlessly.",
    "I celebrate my progress and honor my journey with compassion and pride.",
    "My voice matters, my dreams are valid, and I deserve to take up space in this world.",
    "I believe in myself, even if others don’t yet see my light.",
    "Every step I take forward is proof of my courage and resilience.",
    "I am proud of the person I am becoming, one choice at a time."
  ],
  healing: [
    "My body and mind are healing more deeply with each passing moment.",
    "I forgive myself for past mistakes and embrace the wisdom they've given me.",
    "I am surrounded by healing energy that restores my peace and vitality.",
    "Every cell in my body vibrates with health, joy, and perfect harmony.",
    "I release old patterns that no longer serve me and welcome new possibilities with an open heart.",
    "Love flows through me, healing every part of my being and creating space for miracles.",
    "I am gentle with myself as I heal, knowing that recovery takes time and patience.",
    "My heart is open to receiving the love and support I need on my healing journey.",
    "Healing is not linear, and that’s okay. I honor my pace.",
    "I give myself permission to start again as many times as I need.",
    "Every breath I take fills me with renewal and strength."
  ],
  grounding: [
    "I feel my feet firmly planted on the earth beneath me. I am stable and secure.",
    "I am present in this moment, fully aware of my surroundings and completely safe.",
    "My connection to the earth fills me with strength, stability, and unshakeable peace.",
    "I breathe in calm and breathe out tension, anchoring myself in the here and now.",
    "I am like a mighty tree - rooted, stable, and able to weather any storm with grace.",
    "The ground supports me completely. I am held safely by the earth's loving energy.",
    "I release what I cannot control and focus on what is within my power in this moment.",
    "I am centered in my body, mind, and spirit. I am whole, complete, and at peace.",
    "The air I breathe nourishes me. The earth beneath me sustains me.",
    "I feel my shoulders drop, my jaw loosen, and my body soften as I settle into this moment."
  ],
  sleep: [
    "I release the day with gratitude and prepare my mind and body for restorative sleep.",
    "My bedroom is a sanctuary of peace where worries dissolve and dreams flourish.",
    "With each breath, I sink deeper into relaxation and prepare for healing rest.",
    "I trust that while I sleep, my subconscious mind is working to solve problems and restore balance.",
    "Tomorrow will bring new opportunities and fresh energy. Tonight, I rest completely.",
    "I am held safely by the universe as I drift into peaceful, regenerating sleep.",
    "My body knows how to heal and restore itself during sleep. I surrender to this natural process.",
    "Peace washes over me like gentle waves, carrying me into deep, restful slumber.",
    "I let go of the day. Nothing more is required of me now except rest.",
    "I welcome sleep as a gift, knowing it renews my body and clears my mind."
  ],
  selfCompassion: [
    "I am allowed to feel exactly what I feel without guilt or shame.",
    "I treat myself with the same kindness I would give to a dear friend.",
    "I don’t need to earn rest, love, or care—I deserve them as I am.",
    "It’s okay to not have it all figured out. I am learning, and that’s enough.",
    "I am worthy of compassion, especially from myself.",
    "I give myself permission to be imperfect and still be deeply lovable.",
    "I am patient with myself as I grow and change.",
    "Even in difficult moments, I am doing my best—and that is enough."
  ]
};


const AdvancedAffirmations = () => {
  const [currentCategory, setCurrentCategory] = useState('anxiety');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [speechSupported, setSpeechSupported] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.7);
  const [fontSize, setFontSize] = useState('text-xl');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [favoriteAffirmations, setFavoriteAffirmations] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  
  const autoPlayIntervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const utteranceRef = useRef(null);

  const currentAffirmations = affirmationCategories[currentCategory];

  // Time tracking
  useEffect(() => {
    startTimeRef.current = Date.now();
    const timer = setInterval(() => {
      if (startTimeRef.current) {
        setTimeSpent(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Speech synthesis setup
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSupported(true);
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const englishVoices = voices.filter(voice => voice.lang.startsWith('en'));
        
        // Prefer calming, female voices for anxiety relief
        const preferredVoice = englishVoices.find(voice => 
          voice.name.toLowerCase().includes('female') || 
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('karen') ||
          voice.name.toLowerCase().includes('allison')
        ) || englishVoices[0];
        
        setSelectedVoice(preferredVoice);
      };

      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, []);

  // Auto-advance functionality
  useEffect(() => {
    if (isAutoAdvancing && !isSpeaking) {
      const timer = setTimeout(() => {
        handleNext();
      }, 8000); // 8 seconds per affirmation
      
      return () => clearTimeout(timer);
    }
  }, [isAutoAdvancing, currentIndex, isSpeaking]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setDirection('next');
    setCurrentIndex((prev) => {
      const newIndex = (prev + 1) % currentAffirmations.length;
      setSessionProgress((newIndex / currentAffirmations.length) * 100);
      return newIndex;
    });
  }, [currentAffirmations.length]);

  const handlePrev = useCallback(() => {
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setDirection('prev');
    setCurrentIndex((prev) => {
      const newIndex = (prev - 1 + currentAffirmations.length) % currentAffirmations.length;
      setSessionProgress((newIndex / currentAffirmations.length) * 100);
      return newIndex;
    });
  }, [currentAffirmations.length]);

  // Touch handlers for swipe gestures
  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchMove = (e) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart.x || !touchEnd.x) return;
    
    const distance = touchStart.x - touchEnd.x;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Speech functionality
  const speakAffirmation = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentAffirmations[currentIndex]);

    utterance.rate = playbackSpeed;
    utterance.pitch = 0.8;
    utterance.volume = 0.9;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Favorites functionality
  const toggleFavorite = () => {
    const currentAffirmation = `${currentCategory}-${currentIndex}`;
    setFavoriteAffirmations(prev => 
      prev.includes(currentAffirmation)
        ? prev.filter(fav => fav !== currentAffirmation)
        : [...prev, currentAffirmation]
    );
  };

  const isFavorite = favoriteAffirmations.includes(`${currentCategory}-${currentIndex}`);

  // Shuffle affirmations
  const shuffleAffirmations = () => {
    const randomIndex = Math.floor(Math.random() * currentAffirmations.length);
    setCurrentIndex(randomIndex);
    setSessionProgress((randomIndex / currentAffirmations.length) * 100);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') handlePrev();
      else if (event.key === 'ArrowRight') handleNext();
      else if (event.key === ' ') {
        event.preventDefault();
        speakAffirmation();
      }
      else if (event.key === 'f' || event.key === 'F') {
        event.preventDefault();
        toggleFavorite();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction === 'next' ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction === 'next' ? -300 : 300,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const bgClass = isDarkMode 
    ? "min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-accent-900/50"
    : "min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50";

  const cardClass = isDarkMode
    ? "bg-neutral-800/90 backdrop-blur-lg border border-neutral-700/50"
    : "bg-white/90 backdrop-blur-lg border border-white/50";

  return (
    <div className={`${bgClass} flex items-center justify-center p-4 transition-all duration-700`}>
      <div
        className="w-full max-w-4xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ opacity: 1, scale: 1 }}
      >
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                isDarkMode ? 'bg-primary-400/20' : 'bg-primary-500/10'
              } animate-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Header */}
        <div className="text-center mb-8" style={{ opacity: 1, transform: 'translateY(0px)' }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <SparklesIcon className={`w-8 h-8 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`} />
            <h1 className={`text-4xl font-heading ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
              Healing Affirmations
            </h1>
            <SparklesIcon className={`w-8 h-8 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`} />
          </div>
          <p className={`${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'} font-body`}>
            Time spent: {formatTime(timeSpent)} • Progress: {Math.round(sessionProgress)}%
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mt-2 opacity-60" />
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.keys(affirmationCategories).map((category) => (
            <button
              key={category}
              onClick={() => {
                setCurrentCategory(category);
                setCurrentIndex(0);
                setSessionProgress(0);
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
              }}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                currentCategory === category
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg scale-105'
                  : isDarkMode
                  ? 'bg-neutral-700/80 text-neutral-300 hover:bg-neutral-600/80 border border-neutral-600'
                  : 'bg-white/80 text-neutral-700 hover:bg-neutral-50 border border-neutral-200 shadow-sm'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Affirmation Card */}
        <div
          className={`${cardClass} rounded-3xl shadow-soft p-8 mb-6 relative overflow-hidden`}
          style={{
            transform: isSpeaking ? 'scale(1.02)' : 'scale(1)',
            boxShadow: isSpeaking ? 
              (isDarkMode ? '0 25px 50px rgba(59, 130, 246, 0.3)' : '0 25px 50px rgba(59, 130, 246, 0.2)') :
              (isDarkMode ? '0 10px 30px rgba(0, 0, 0, 0.3)' : '0 10px 30px rgba(0, 0, 0, 0.1)'),
            transition: 'all 0.3s ease-in-out'
          }}
        >
          {/* Breathing animation overlay */}
          {isSpeaking && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-3xl animate-pulse" />
          )}

          {/* Progress Bar */}
          <div className={`w-full ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'} rounded-full h-2 mb-8`}>
            <div 
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${sessionProgress}%` }}
            />
          </div>

          {/* Affirmation Text */}
          <div className="relative">
            <div
              key={`${currentCategory}-${currentIndex}`}
              className="text-center mb-8 transition-all duration-500 ease-in-out"
              style={{
                opacity: 1,
                transform: 'translateX(0px) scale(1)'
              }}
            >
              <div className="relative">
                <p className={`${fontSize} ${isDarkMode ? 'text-white' : 'text-neutral-800'} leading-relaxed font-body mb-6 relative z-10`}>
                  {currentAffirmations[currentIndex]}
                </p>
                
                {/* Subtle accent decoration */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-primary-400/30 rounded-tl-lg" />
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-secondary-400/30 rounded-br-lg" />
              </div>
              
              {/* Affirmation Counter */}
              <div className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'} font-medium`}>
                {currentIndex + 1} of {currentAffirmations.length} • {currentCategory} affirmations
              </div>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex justify-center items-center gap-3 mb-6">
            <button
              onClick={toggleFavorite}
              className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isFavorite 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-110' 
                  : isDarkMode 
                  ? 'bg-neutral-700/80 text-neutral-300 hover:bg-red-500 hover:text-white border border-neutral-600'
                  : 'bg-white/80 text-neutral-600 hover:bg-red-500 hover:text-white border border-neutral-200 shadow-sm'
              }`}
              title="Toggle Favorite (F key)"
            >
              <HeartIcon className="w-5 h-5" />
            </button>

            <button
              onClick={shuffleAffirmations}
              className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isDarkMode 
                  ? 'bg-neutral-700/80 text-neutral-300 hover:bg-accent-500 hover:text-white border border-neutral-600'
                  : 'bg-white/80 text-neutral-600 hover:bg-accent-500 hover:text-white border border-neutral-200 shadow-sm'
              }`}
              title="Random Affirmation"
            >
              <ArrowPathIcon className="w-5 h-5" />
            </button>

            {speechSupported && (
              <button
                onClick={speakAffirmation}
                className={`p-4 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  isSpeaking 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg scale-110 animate-pulse' 
                    : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-md hover:shadow-lg'
                }`}
                title="Play/Stop Speech (Space key)"
              >
                {isSpeaking ? <SpeakerXMarkIcon className="w-6 h-6" /> : <SpeakerWaveIcon className="w-6 h-6" />}
              </button>
            )}

            <button
              onClick={handlePrev}
              className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isDarkMode 
                  ? 'bg-neutral-700/80 text-neutral-300 hover:bg-neutral-600/80 border border-neutral-600'
                  : 'bg-white/80 text-neutral-600 hover:bg-neutral-50 border border-neutral-200 shadow-sm'
              }`}
              title="Previous (← key)"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isDarkMode 
                  ? 'bg-neutral-700/80 text-neutral-300 hover:bg-neutral-600/80 border border-neutral-600'
                  : 'bg-white/80 text-neutral-600 hover:bg-neutral-50 border border-neutral-200 shadow-sm'
              }`}
              title="Next (→ key)"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>

            <button
              onClick={() => setIsAutoAdvancing(!isAutoAdvancing)}
              className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isAutoAdvancing 
                  ? 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg scale-110' 
                  : isDarkMode 
                  ? 'bg-neutral-700/80 text-neutral-300 hover:bg-secondary-500 hover:text-white border border-neutral-600'
                  : 'bg-white/80 text-neutral-600 hover:bg-secondary-500 hover:text-white border border-neutral-200 shadow-sm'
              }`}
              title="Auto-advance"
            >
              {isAutoAdvancing ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
            </button>
          </div>

          {/* Settings Toggle */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                showSettings
                  ? 'bg-accent-500 text-white'
                  : isDarkMode 
                  ? 'bg-neutral-700/80 text-neutral-300 hover:bg-neutral-600/80 border border-neutral-600'
                  : 'bg-white/80 text-neutral-600 hover:bg-neutral-50 border border-neutral-200 shadow-sm'
              }`}
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div 
            className={`${cardClass} rounded-2xl shadow-soft p-6 mb-6 transition-all duration-300`}
            style={{ opacity: 1, height: 'auto' }}
          >
            <h3 className={`text-lg font-heading mb-4 text-center ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
              Personalize Your Experience
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Font Size */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-700'}`}>
                  Font Size
                </label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className={`w-full p-3 rounded-lg border transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-neutral-700/80 border-neutral-600 text-white focus:border-primary-500'
                      : 'bg-white border-neutral-300 text-neutral-800 focus:border-primary-500'
                  }`}
                >
                  <option value="text-lg">Small</option>
                  <option value="text-xl">Medium</option>
                  <option value="text-2xl">Large</option>
                  <option value="text-3xl">Extra Large</option>
                </select>
              </div>

              {/* Speech Speed */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-700'}`}>
                  Speech Speed
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0.5"
                    max="1.2"
                    step="0.1"
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                    className="w-full accent-primary-500"
                  />
                  <div className={`text-xs text-center ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {playbackSpeed}x speed
                  </div>
                </div>
              </div>

              {/* Dark Mode */}
              <div className="flex flex-col items-center">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-700'}`}>
                  Theme
                </label>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-4 rounded-full transition-all duration-300 transform hover:scale-110 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-yellow-900'
                      : 'bg-gradient-to-r from-neutral-800 to-neutral-900 text-yellow-400'
                  }`}
                >
                  {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                </button>
              </div>

              {/* Favorites Count */}
              <div className="flex flex-col items-center">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-700'}`}>
                  Favorites
                </label>
                <div className={`text-center ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                  <HeartIcon className="w-8 h-8 text-red-500 mx-auto mb-1" />
                  <div className="text-2xl font-bold">{favoriteAffirmations.length}</div>
                  <div className="text-xs text-neutral-500">saved</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Tips */}
        <div className={`text-center text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'} space-y-2`}>
          <p>💡 Swipe or use arrow keys to navigate • Press space to play/pause • F to favorite</p>
          <p>🎵 Find a quiet, comfortable space and breathe deeply while listening</p>
          <p>🌱 Use these affirmations daily for the best results in managing anxiety</p>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAffirmations;
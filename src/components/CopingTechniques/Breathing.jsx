import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Pause, Play, RotateCcw, Settings, Volume2, VolumeX, Moon, Sun } from 'lucide-react';

const patterns = {
  calm: {
    name: 'Ocean Calm',
    description: 'Gentle waves of tranquility',
    icon: '🌊',
    phases: [
      { name: 'breathe in', targetScale: 1.25, duration: 4000, instruction: 'Draw in peace and stillness' },
      { name: 'breathe out', targetScale: 1, duration: 6000, instruction: 'Let go of stress completely' },
    ],
    color: '#06B6D4'
  },
  box: {
    name: 'Box Breathing',
    description: 'Structured calm for focus',
    icon: '⬜',
    phases: [
      { name: 'inhale', targetScale: 1.4, duration: 4000, instruction: 'Fill your lungs with serenity' },
      { name: 'hold', targetScale: 1.4, duration: 4000, instruction: 'Rest in this peaceful moment' },
      { name: 'exhale', targetScale: 1, duration: 4000, instruction: 'Release all tension slowly' },
      { name: 'pause', targetScale: 1, duration: 4000, instruction: 'Embrace the quiet space' },
    ],
    color: '#8B5CF6'
  },
  fourSevenEight: {
    name: '4-7-8 Sleep',
    description: 'Deep relaxation for rest',
    icon: '😴',
    phases: [
      { name: 'inhale', targetScale: 1.5, duration: 4000, instruction: 'Breathe in through your nose softly' },
      { name: 'hold', targetScale: 1.5, duration: 7000, instruction: 'Hold this peaceful breath' },
      { name: 'exhale', targetScale: 1, duration: 8000, instruction: 'Slowly release through your mouth' },
    ],
    color: '#10B981'
  },
  gentle: {
    name: 'Gentle Flow',
    description: 'Natural and effortless',
    icon: '🍃',
    phases: [
      { name: 'breathe in', targetScale: 1.3, duration: 3500, instruction: 'Welcome in fresh energy' },
      { name: 'hold softly', targetScale: 1.3, duration: 1500, instruction: 'Feel the gentle pause' },
      { name: 'breathe out', targetScale: 1, duration: 4500, instruction: 'Release with gentle ease' },
    ],
    color: '#22C55E'
  },
};

const calmingAffirmations = [
  { text: "You are safe and at peace", type: "safety" },
  { text: "This moment is yours", type: "present" },
  { text: "You breathe with grace", type: "strength" },
  { text: "Calm flows through you", type: "present" },
  { text: "You are exactly where you need to be", type: "empowerment" },
  { text: "Your breath is your anchor", type: "trust" },
  { text: "Each breath brings deeper peace", type: "progress" },
  { text: "You radiate tranquility", type: "strength" },
  { text: "This is your moment of zen", type: "present" },
  { text: "Serenity surrounds you", type: "peace" },
];

const FloatingParticle = ({ delay = 0, color = '#38BDF8' }) => {
  const size = Math.random() * 3 + 1.5;
  const startX = Math.random() * 100;
  const duration = 25 + Math.random() * 10;
  
  return (
    <motion.div
      className="absolute rounded-full opacity-30 pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        left: startX + '%',
        bottom: '-10px',
      }}
      animate={{
        y: [0, -800],
        x: [0, (Math.random() - 0.5) * 150],
        opacity: [0, 0.3, 0.2, 0],
        scale: [0.3, 1, 0.8, 0.2]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeOut",
      }}
    />
  );
};

const BreathingGuide = ({ phase, progress, isActive, color }) => {
  if (!isActive || !phase) return null;
  
  const circleSize = 100 + (phase.targetScale - 1) * progress * 60;
  
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 0.4 : 0 }}
    >
      <svg width="320" height="320" viewBox="0 0 320 320" className="absolute">
        <defs>
          <radialGradient id="breatheGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <motion.circle
          cx="160"
          cy="160"
          r={circleSize}
          fill="url(#breatheGradient)"
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.2"
          animate={{
            r: circleSize,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </svg>
    </motion.div>
  );
};

const ProgressRing = ({ progress, color, size = 240 }) => {
  const circumference = 2 * Math.PI * 100;
  const strokeDashoffset = circumference - (progress * circumference);
  
  return (
    <svg className="absolute transform -rotate-90" width={size} height={size}>
      <circle
        cx={size/2}
        cy={size/2}
        r="100"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="2"
        fill="transparent"
      />
      <motion.circle
        cx={size/2}
        cy={size/2}
        r="100"
        stroke={color}
        strokeWidth="3"
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{ filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.3))' }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
    </svg>
  );
};

function Breathing() {
  const [selectedPattern, setSelectedPattern] = useState('calm');
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [completionCelebration, setCompletionCelebration] = useState(null);
  
  const startTimeRef = useRef(null);
  const sessionStartRef = useRef(null);
  const pattern = patterns[selectedPattern];

  // Main breathing loop
  useEffect(() => {
    if (!isRunning || currentPhaseIndex === -1) return;

    const currentPhase = pattern.phases[currentPhaseIndex];
    startTimeRef.current = Date.now();
    
    const timer = setTimeout(() => {
      const nextPhaseIndex = (currentPhaseIndex + 1) % pattern.phases.length;
      if (nextPhaseIndex === 0) {
        setCycle(c => {
          const newCycle = c + 1;
          // Show affirmation every 3 cycles
          if (newCycle % 3 === 0) {
            const affirmation = calmingAffirmations[Math.floor(Math.random() * calmingAffirmations.length)];
            setCurrentAffirmation(affirmation.text);
            setTimeout(() => setCurrentAffirmation(''), 4000);
          }
          return newCycle;
        });
      }
      setCurrentPhaseIndex(nextPhaseIndex);
    }, currentPhase.duration);

    return () => clearTimeout(timer);
  }, [isRunning, currentPhaseIndex, pattern]);

  // Progress and time tracking
  useEffect(() => {
    if (!isRunning || currentPhaseIndex === -1) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const phaseDuration = pattern.phases[currentPhaseIndex].duration;
      const newProgress = Math.min(1, elapsed / phaseDuration);
      
      setRemainingTime(Math.max(0, phaseDuration - elapsed));
      setProgress(newProgress);
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, currentPhaseIndex, pattern]);

  // Session duration tracking
  useEffect(() => {
    let interval;
    if (isRunning && sessionStartRef.current) {
      interval = setInterval(() => {
        setSessionDuration(Math.floor((Date.now() - sessionStartRef.current) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Celebration notifications
  useEffect(() => {
    if (cycle > 0 && cycle % 5 === 0) {
      setCompletionCelebration(cycle);
      const timer = setTimeout(() => {
        setCompletionCelebration(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [cycle]);

  const startExercise = useCallback(() => {
    if (currentPhaseIndex === -1) {
      setCurrentPhaseIndex(0);
      setIsRunning(true);
      sessionStartRef.current = Date.now();
      setCurrentAffirmation("Welcome to your peaceful moment");
      setTimeout(() => setCurrentAffirmation(''), 3000);
    } else {
      setIsRunning(!isRunning);
      if (!isRunning && sessionStartRef.current) {
        sessionStartRef.current = Date.now() - (sessionDuration * 1000);
      }
    }
  }, [currentPhaseIndex, isRunning, sessionDuration]);

  const resetExercise = useCallback(() => {
    setCurrentPhaseIndex(-1);
    setIsRunning(false);
    setCycle(0);
    setSessionDuration(0);
    setProgress(0);
    setCurrentAffirmation('');
    sessionStartRef.current = null;
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentPhase = currentPhaseIndex !== -1 ? pattern.phases[currentPhaseIndex] : null;
  const breathingScale = currentPhase ? 
    1 + ((currentPhase.targetScale - 1) * (currentPhase.name.includes('in') || currentPhase.name.includes('inhale') ? progress : 1 - progress)) 
    : 1;

  const bgClass = isDarkMode 
    ? "min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800"
    : "min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-indigo-100";

  return (
    <motion.div
      className={`${bgClass} relative overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${isDarkMode 
          ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/15 via-transparent to-transparent'
          : 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/50 via-transparent to-transparent'
        }`} />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <FloatingParticle 
            key={`particle-${i}`} 
            delay={i * 2} 
            color={pattern.color}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col xl:flex-row">
        
        {/* Main Breathing Interface */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
          
          {/* Header */}
          <motion.div
            className="text-center mb-8 md:mb-16"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-light mb-4 ${
              isDarkMode 
                ? 'text-white bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent' 
                : 'text-slate-700 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
            }`}>
              Breathe
            </h1>
            <p className={`text-lg md:text-xl max-w-md mx-auto ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {pattern.description}
            </p>
          </motion.div>

          {/* Main Breathing Circle */}
          <div className="relative flex items-center justify-center mb-12 md:mb-20">
            
            {/* Progress Ring */}
            <ProgressRing progress={progress} color={pattern.color} size={window.innerWidth < 768 ? 200 : 240} />
            
            {/* Breathing Guide */}
            <BreathingGuide phase={currentPhase} progress={progress} isActive={isRunning} color={pattern.color} />
            
            {/* Main Circle */}
            <motion.div
              className={`relative rounded-full ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/20' 
                  : 'bg-gradient-to-br from-white/80 to-white/60 border border-white/40'
              } backdrop-blur-xl shadow-2xl`}
              style={{
                width: window.innerWidth < 768 ? '200px' : '240px',
                height: window.innerWidth < 768 ? '200px' : '240px',
              }}
              animate={{
                scale: breathingScale,
                boxShadow: currentPhase ? 
                  `0 0 ${30 * breathingScale}px ${pattern.color}30` : 
                  isDarkMode ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
              }}
              transition={{ 
                scale: { duration: currentPhase ? currentPhase.duration / 1000 : 2, ease: "easeInOut" },
                boxShadow: { duration: 1 }
              }}
            >
              {/* Inner glow layers */}
              <div className={`absolute inset-4 md:inset-6 rounded-full ${
                isDarkMode ? 'bg-white/5' : 'bg-white/40'
              } backdrop-blur-lg`} />
              <div className={`absolute inset-6 md:inset-10 rounded-full ${
                isDarkMode ? 'bg-white/8' : 'bg-white/60'
              }`} />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8">
                <motion.div
                  key={currentPhaseIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-2 md:mb-4"
                >
                  <div className="text-2xl md:text-4xl mb-2 md:mb-3">{pattern.icon}</div>
                  <h3 className={`text-lg md:text-2xl font-medium mb-1 md:mb-2 ${
                    isDarkMode ? 'text-white' : 'text-slate-700'
                  }`}>
                    {currentPhase ? currentPhase.name.charAt(0).toUpperCase() + currentPhase.name.slice(1) : 'Ready to begin?'}
                  </h3>
                  {currentPhase && (
                    <div className={`text-sm md:text-lg font-light ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                      {Math.ceil(remainingTime / 1000)}s
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Phase Instruction */}
          <AnimatePresence mode="wait">
            {currentPhase && (
              <motion.div
                key={currentPhaseIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center mb-8 md:mb-16 max-w-lg px-4"
              >
                <p className={`text-lg md:text-xl leading-relaxed ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-600'
                }`}>
                  {currentPhase.instruction}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Affirmations */}
          <AnimatePresence>
            {currentAffirmation && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                className={`${
                  isDarkMode 
                    ? 'bg-white/10 border border-white/20' 
                    : 'bg-white/60 border border-white/40'
                } backdrop-blur-xl rounded-2xl p-4 md:p-6 max-w-md mx-auto text-center shadow-xl`}
              >
                <p className={`text-base md:text-lg font-light leading-relaxed ${
                  isDarkMode ? 'text-white' : 'text-slate-700'
                }`}>
                  ✨ {currentAffirmation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Control Panel */}
        <div className={`w-full xl:w-96 ${
          isDarkMode 
            ? 'bg-black/20 xl:border-l border-white/10' 
            : 'bg-white/30 xl:border-l border-white/30'
        } backdrop-blur-xl p-4 md:p-8 flex flex-col justify-between`}>
          
          {/* Dark Mode Toggle */}
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
              Controls
            </h2>
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-3 rounded-full ${
                isDarkMode 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-slate-700/20 hover:bg-slate-700/30 text-slate-700'
              } transition-all`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            
            {/* Primary Control */}
            <motion.button
              onClick={startExercise}
              className={`w-full py-4 md:py-6 px-6 md:px-8 rounded-2xl font-medium text-lg shadow-xl transition-all ${
                isRunning 
                  ? 'bg-amber-500 hover:bg-amber-400 text-white' 
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white'
              }`}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center gap-3">
                {isRunning ? <Pause size={24} /> : <Play size={24} />}
                {currentPhaseIndex === -1 ? 'Begin Your Journey' : isRunning ? 'Pause' : 'Continue'}
              </div>
            </motion.button>

            {/* Secondary Controls */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <motion.button
                onClick={resetExercise}
                className={`py-3 md:py-4 px-4 md:px-6 ${
                  isDarkMode 
                    ? 'bg-slate-700/70 hover:bg-slate-600/70 text-white' 
                    : 'bg-slate-200/70 hover:bg-slate-300/70 text-slate-700'
                } rounded-xl font-medium transition-all backdrop-blur-sm`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={currentPhaseIndex === -1}
              >
                <RotateCcw size={18} className="mx-auto" />
              </motion.button>
              
              <motion.button
                onClick={() => setIsSettingsOpen(true)}
                className="py-3 md:py-4 px-4 md:px-6 bg-purple-500/80 hover:bg-purple-400/80 text-white rounded-xl font-medium transition-all backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Settings size={18} className="mx-auto" />
              </motion.button>

              <motion.button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`py-3 md:py-4 px-4 md:px-6 ${
                  soundEnabled 
                    ? 'bg-green-500/80 hover:bg-green-400/80' 
                    : isDarkMode ? 'bg-slate-600/70 hover:bg-slate-500/70' : 'bg-slate-300/70 hover:bg-slate-400/70'
                } text-white rounded-xl font-medium transition-all backdrop-blur-sm`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {soundEnabled ? <Volume2 size={18} className="mx-auto" /> : <VolumeX size={18} className="mx-auto" />}
              </motion.button>
            </div>

            {/* Pattern Selection */}
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(patterns).map(([key, pat]) => (
                <motion.button
                  key={key}
                  onClick={() => setSelectedPattern(key)}
                  className={`p-3 md:p-4 rounded-xl text-left transition-all backdrop-blur-sm ${
                    selectedPattern === key 
                      ? isDarkMode 
                        ? 'bg-white/20 border-2 border-white/30 text-white' 
                        : 'bg-white/60 border-2 border-blue-300/50 text-slate-700'
                      : isDarkMode 
                        ? 'bg-white/5 border-2 border-transparent text-slate-300 hover:bg-white/10' 
                        : 'bg-white/20 border-2 border-transparent text-slate-600 hover:bg-white/40'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-xl md:text-2xl mb-1 md:mb-2">{pat.icon}</div>
                  <div className="font-medium text-xs md:text-sm">{pat.name}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4 md:space-y-6 mt-6">
            
            {/* Cycle and Time Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`${
                isDarkMode ? 'bg-white/10' : 'bg-white/40'
              } rounded-xl p-3 md:p-4 text-center backdrop-blur-sm`}>
                <div className={`font-bold text-lg md:text-xl ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>{cycle}</div>
                <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Cycles</div>
              </div>
              <div className={`${
                isDarkMode ? 'bg-white/10' : 'bg-white/40'
              } rounded-xl p-3 md:p-4 text-center backdrop-blur-sm`}>
                <div className={`font-bold text-lg md:text-xl ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>{formatTime(sessionDuration)}</div>
                <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Time</div>
              </div>
            </div>

            {/* Progress */}
            <div className={`${
              isDarkMode ? 'bg-white/10' : 'bg-white/40'
            } rounded-xl p-3 md:p-4 backdrop-blur-sm`}>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Serenity Progress
                </span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
                  {Math.min(100, Math.round((cycle / 10) * 100))}%
                </span>
              </div>
              <div className={`${
                isDarkMode ? 'bg-slate-700/50' : 'bg-slate-300/50'
              } h-2 rounded-full overflow-hidden`}>
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                  animate={{ width: `${Math.min(100, (cycle / 10) * 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsSettingsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${
                isDarkMode 
                  ? 'bg-slate-800/95 border border-white/20' 
                  : 'bg-white/95 border border-slate-200/50'
              } backdrop-blur-xl p-6 md:p-8 rounded-3xl max-w-lg w-full shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <h2 className={`text-xl md:text-2xl font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  Breathing Patterns
                </h2>
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className={`transition-colors p-2 text-lg ${
                    isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className={`block font-medium mb-4 ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    Choose Your Journey
                  </label>
                  <div className="space-y-3">
                    {Object.entries(patterns).map(([key, pat]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedPattern(key)}
                        className={`w-full p-4 rounded-xl text-left transition-all backdrop-blur-sm ${
                          selectedPattern === key 
                            ? isDarkMode 
                              ? 'bg-white/20 border-2 border-white/30 text-white' 
                              : 'bg-blue-100/80 border-2 border-blue-300/50 text-slate-800'
                            : isDarkMode 
                              ? 'bg-white/5 border-2 border-white/10 text-slate-300 hover:bg-white/10' 
                              : 'bg-slate-50/50 border-2 border-slate-200/50 text-slate-600 hover:bg-slate-100/70'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{pat.icon}</span>
                          <div>
                            <div className="font-medium">{pat.name}</div>
                            <div className="text-sm opacity-75">{pat.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  onClick={() => setIsSettingsOpen(false)}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue Journey
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Celebrations */}
      <AnimatePresence>
        {completionCelebration && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className={`fixed top-4 md:top-20 right-4 md:right-6 ${
              isDarkMode 
                ? 'bg-emerald-500/20 border border-emerald-400/30' 
                : 'bg-emerald-100/90 border border-emerald-300/50'
            } backdrop-blur-md rounded-2xl p-4 z-50 shadow-xl max-w-xs`}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">🌟</div>
              <div>
                <div className={`font-medium ${
                  isDarkMode ? 'text-emerald-200' : 'text-emerald-700'
                }`}>
                  Beautiful Progress!
                </div>
                <div className={`text-sm ${
                  isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
                }`}>
                  {completionCelebration} peaceful cycles completed
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Celebration */}
      <AnimatePresence>
        {cycle >= 10 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4"
          >
            <div className="text-center">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="text-4xl md:text-6xl mb-4"
              >
                🧘‍♀️
              </motion.div>
              <h2 className={`text-2xl md:text-4xl font-light mb-2 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                Perfect Serenity
              </h2>
              <p className={`text-lg md:text-xl ${
                isDarkMode ? 'text-slate-200' : 'text-slate-600'
              }`}>
                You've reached a beautiful state of calm
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sound Toggle in Bottom Corner */}
      <div className="fixed bottom-4 left-4 z-40">
        <motion.button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-3 md:p-4 rounded-full backdrop-blur-md border transition-all shadow-lg ${
            soundEnabled 
              ? 'bg-blue-500/20 border-blue-400/30 text-blue-300' 
              : isDarkMode 
                ? 'bg-white/10 border-white/20 text-white/60 hover:text-white/80' 
                : 'bg-white/30 border-white/40 text-slate-600 hover:text-slate-800'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </motion.button>
      </div>

      {/* Info Toast */}
      {soundEnabled && (
        <div className={`fixed bottom-20 left-4 ${
          isDarkMode 
            ? 'bg-slate-800/90 border border-white/20 text-white' 
            : 'bg-white/90 border border-slate-200/50 text-slate-700'
        } backdrop-blur-md rounded-xl p-3 text-sm shadow-lg z-30`}>
          🔊 Sound enabled (visual feedback only)
        </div>
      )}
    </motion.div>
  );
}

export default Breathing;
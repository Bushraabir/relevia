import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Pause, Play, RotateCcw, Settings, Volume2, VolumeX, Moon, Sun, ChevronUp, ChevronDown } from 'lucide-react';
import Ballpit from '../Balls';

// Bio-feedback constants
const JITTER_THRESHOLD_HIGH = 18;   // ms
const JITTER_THRESHOLD_LOW  = 8;    // ms

const initialPatterns = {
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
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isActive || !phase) return null;
  
  const isMobile = screenSize.width < 768;
  const circleSize = isMobile ? 60 + (phase.targetScale - 1) * progress * 40 : 100 + (phase.targetScale - 1) * progress * 60;
  const svgSize = isMobile ? 280 : 320;
  
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 0.4 : 0 }}
    >
      <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`} className="absolute">
        <defs>
          <radialGradient id="breatheGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <motion.circle
          cx={svgSize/2}
          cy={svgSize/2}
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
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenSize.width < 640;
  const isTablet = screenSize.width < 1024;
  const actualSize = isMobile ? 180 : isTablet ? 200 : size;
  const circumference = 2 * Math.PI * 100;
  const strokeDashoffset = circumference - (progress * circumference);
  
  return (
    <svg className="absolute transform -rotate-90 pointer-events-none" width={actualSize} height={actualSize}>
      <circle
        cx={actualSize/2}
        cy={actualSize/2}
        r="100"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="2"
        fill="transparent"
      />
      <motion.circle
        cx={actualSize/2}
        cy={actualSize/2}
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
  const [patterns, setPatterns] = useState(initialPatterns);
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
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  
  const startTimeRef = useRef(null);
  const sessionStartRef = useRef(null);
  
  // Bio-feedback refs
  const pressTimes  = useRef([]);   // stores BOTH key & mouse events
  const lastMoveRef = useRef(0);    // 25 Hz throttle for mouse
  const jitterRef   = useRef(0);

  // push any event (key or mouse) into the same buffer
  const pushEvent = (t) => {
    pressTimes.current.push(t);
    if (pressTimes.current.length > 30) pressTimes.current.shift();
  };



  // ---------- AUDIO SYNTH ----------
  const audioCtx     = useRef(null);
  const oscL         = useRef(null), oscR   = useRef(null);
  const subOsc       = useRef(null);            // 64 Hz rumble
  const gainL        = useRef(null), gainR  = useRef(null);
  const subGain      = useRef(null);
  const panner       = useRef(null);
  
  const pattern = patterns[selectedPattern];

  // Screen size tracking
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    
    // ---------- INIT WEB-AUDIO ----------
    if (soundEnabled && !audioCtx.current) {
      audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
      gainL.current    = audioCtx.current.createGain();
      gainR.current    = audioCtx.current.createGain();
      subGain.current  = audioCtx.current.createGain();
      panner.current   = audioCtx.current.createStereoPanner();

      oscL.current     = audioCtx.current.createOscillator();
      oscR.current     = audioCtx.current.createOscillator();
      subOsc.current   = audioCtx.current.createOscillator();

      // wiring
      oscL.current.connect(gainL.current).connect(panner.current);
      oscR.current.connect(gainR.current).connect(panner.current);
      subOsc.current.connect(subGain.current).connect(panner.current);
      panner.current.connect(audioCtx.current.destination);

      // start oscillators
      oscL.current.start();
      oscR.current.start();
      subOsc.current.start();
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      audioCtx.current?.close();
    };
  }, [soundEnabled]);

  const isMobile = screenSize.width < 768;
  const isTablet = screenSize.width < 1024;
  const isXL = screenSize.width >= 1280;

  // Main breathing loop with bio-feedback integration
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

  // Bio-feedback integration
    const keyHandler = (e) => {
      if (isRunning) pushEvent(performance.now());
    };
    window.addEventListener('keydown', keyHandler);

    // Capture click bursts (anxiety indicator)
    const clickHandler = () => {
      if (isRunning) pushEvent(performance.now());
    };
    window.addEventListener('click', clickHandler);

    // Mouse movement tracker (25 Hz throttle)
    const moveHandler = (e) => {
      const now = performance.now();
      if (isRunning && now - lastMoveRef.current > 40) { // 25 Hz = 40ms
        pushEvent(now);
        lastMoveRef.current = now;
      }
    };
    window.addEventListener('mousemove', moveHandler);

    // Scroll jank detector (stress indicator)
    let lastScroll = 0;
    const scrollHandler = () => {
      const now = performance.now();
      if (now - lastScroll > 100) { // max 10 Hz
        if (isRunning) pushEvent(now);
        lastScroll = now;
      }
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });

    // Jitter calculation and breathing adaptation
    const jitterInterval = setInterval(() => {
      const times = pressTimes.current;
      if (times.length < 5) return;                      // need enough presses
      const diffs = times.slice(1).map((t,i)=> Math.abs(t - times[i])).filter(d=> d<500);
      const jitter = diffs.length ? diffs.reduce((a,b)=>a+b,0)/diffs.length : 0;
      jitterRef.current = jitter;
      pressTimes.current = [];                           // reset buffer
      
      // Adapt breathing speed based on jitter
      const baseDurations = initialPatterns[selectedPattern].phases.map(p => p.duration);
      let multiplier = 1;
      
      if (jitter > JITTER_THRESHOLD_HIGH) {
        multiplier = 1.2;   // slower → calm
      } else if (jitter < JITTER_THRESHOLD_LOW) {
        multiplier = 1;     // default
      } else {
        multiplier = 0.95;  // slightly faster
      }
      
      // Update pattern durations
      setPatterns(prev => ({
        ...prev,
        [selectedPattern]: {
          ...prev[selectedPattern],
          phases: prev[selectedPattern].phases.map((p, index) => {
            const newDuration = Math.max(3000, Math.min(8000, baseDurations[index] * multiplier));
            return { ...p, duration: newDuration };
          })
        }
      }));
    }, 5000);   // every 5 seconds
return () => {
  clearTimeout(timer);
  window.removeEventListener('keydown', keyHandler);
  window.removeEventListener('click', clickHandler);
  window.removeEventListener('scroll', scrollHandler);
  clearInterval(jitterInterval);
};
  }, [isRunning, currentPhaseIndex, pattern, selectedPattern]);

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

  const currentPhase = currentPhaseIndex !== -1 ? pattern.phases[currentPhaseIndex] : null;
  const breathingScale = currentPhase ? 
    1 + ((currentPhase.targetScale - 1) * (currentPhase.name.includes('in') || currentPhase.name.includes('inhale') ? progress : 1 - progress)) 
    : 1;

  // ---------- REAL-TIME SYNTH PARAMS ----------
  useEffect(() => {
    if (!soundEnabled || !audioCtx.current) return;

    const base    = 256;                          // middle-C
    const beat    = 6 + (jitterRef.current * 0.01); // 6 Hz ± jitter
    const inhale  = currentPhase?.name.includes('in');
    const semi    = inhale ? 3 : -3;              // ±3 semitones
    const freq    = base * Math.pow(2, semi / 12);
    const now     = audioCtx.current.currentTime;

    // frequencies
    oscL.current.frequency.setTargetAtTime(freq, now, 0.1);
    oscR.current.frequency.setTargetAtTime(freq + beat, now, 0.1);
    subOsc.current.frequency.setTargetAtTime(64, now, 0.1); // chest rumble

    // volumes (scale with circle size)
    const vol     = 0.1 * (breathingScale ** 2);
    gainL.current.gain.setTargetAtTime(vol, now, 0.1);
    gainR.current.gain.setTargetAtTime(vol, now, 0.1);
    subGain.current.gain.setTargetAtTime(vol * 0.5, now, 0.1); // quieter sub

    // 3-D pan: inhale → right, exhale → left
    const panValue = inhale ? 0.3 : -0.3;
    panner.current.pan.setTargetAtTime(panValue, now, 0.1);
  }, [soundEnabled, currentPhase, breathingScale]);

const startExercise = useCallback(() => {
  // make sure the context is running
  if (soundEnabled && audioCtx.current) {
    if (audioCtx.current.state === 'suspended') audioCtx.current.resume();
  } else if (soundEnabled && !audioCtx.current) {
    // first time – build the whole chain
    audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    gainL.current    = audioCtx.current.createGain();
    gainR.current    = audioCtx.current.createGain();
    subGain.current  = audioCtx.current.createGain();
    panner.current   = audioCtx.current.createStereoPanner();
    oscL.current     = audioCtx.current.createOscillator();
    oscR.current     = audioCtx.current.createOscillator();
    subOsc.current   = audioCtx.current.createOscillator();
    oscL.current.connect(gainL.current).connect(panner.current);
    oscR.current.connect(gainR.current).connect(panner.current);
    subOsc.current.connect(subGain.current).connect(panner.current);
    panner.current.connect(audioCtx.current.destination);
    oscL.current.start();
    oscR.current.start();
    subOsc.current.start();
  }
  // your existing logic …
  if (currentPhaseIndex === -1) {
    setCurrentPhaseIndex(0);
    setIsRunning(true);
    sessionStartRef.current = Date.now();
    setCurrentAffirmation('Welcome to your peaceful moment');
    setTimeout(() => setCurrentAffirmation(''), 3000);
  } else {
    setIsRunning(v => !v);
    if (!isRunning && sessionStartRef.current) {
      sessionStartRef.current = Date.now() - sessionDuration * 1000;
    }
  }
}, [currentPhaseIndex, isRunning, sessionDuration, soundEnabled]);





  const resetExercise = useCallback(() => {
  setCurrentPhaseIndex(-1);
  setIsRunning(false);
  setCycle(0);
  setSessionDuration(0);
  setProgress(0);
  setCurrentAffirmation('');
  sessionStartRef.current = null;
  setPatterns(initialPatterns);
  // silence & close the audio chain
  if (audioCtx.current) {
    audioCtx.current.close();
    audioCtx.current = null;
  }
}, []);





  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
      {/* Interactive Ballpit Background */}
      <div className="absolute inset-0 z-0">
        <Ballpit 
          followCursor={!isMobile}
          colors={[pattern.color, '#ffffff', pattern.color]}
          count={isMobile ? 80 : isTablet ? 120 : 150}
          gravity={0.3}
          friction={0.98}
          className="opacity-60"
        />
      </div>

      {/* Enhanced Background Overlay */}
      <div className="absolute inset-0 z-[5]">
        <div className={`absolute inset-0 ${isDarkMode 
          ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent'
          : 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent'
        }`} />
        
        {/* Floating particles */}
        {[...Array(isMobile ? 4 : 8)].map((_, i) => (
          <FloatingParticle 
            key={`particle-${i}`} 
            delay={i * 2} 
            color={pattern.color}
          />
        ))}
      </div>

      {/* Bio-feedback Debug Info - Development only */}
      {process.env.NODE_ENV === 'development' && (
        <motion.div 
          className="fixed top-4 left-4 backdrop-blur-md rounded-xl p-3 text-sm shadow-lg z-30 border"
          style={{
            background: isDarkMode 
              ? 'rgba(30, 41, 59, 0.9)' 
              : 'rgba(255, 255, 255, 0.9)',
            borderColor: isDarkMode 
              ? 'rgba(255, 255, 255, 0.2)' 
              : 'rgba(226, 232, 240, 0.5)',
            color: isDarkMode ? 'white' : '#374151'
          }}
        >
          <div>Jitter: {jitterRef.current.toFixed(1)}ms</div>
          <div>Keys: {pressTimes.current.length}</div>
          {soundEnabled && currentPhase && (
            <div className="text-xs opacity-75 mt-1">
              ♪ {(6 + (jitterRef.current * 0.01)).toFixed(2)} Hz | 
              pan {(currentPhase.name.includes('in') ? 0.3 : -0.3).toFixed(1)} | 
              vol {(0.0003 * (breathingScale ** 2) * 1000).toFixed(2)}
            </div>
          )}
        </motion.div>
      )}

      {/* Mobile Layout */}
      {isMobile ? (
        <div className="relative z-10 min-h-screen flex flex-col">
          
          {/* Mobile Header */}
          <div className="flex-shrink-0 p-4 text-center pt-safe-area-inset-top pt-8">
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <h1 className={`text-3xl font-light mb-2 ${
                isDarkMode 
                  ? 'text-white bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent' 
                  : 'text-slate-700 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
              }`}>
                Breathe
              </h1>
              <p className={`text-base ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {pattern.description}
              </p>
            </motion.div>
          </div>

          {/* Mobile Main Circle */}
          <div className="flex-1 flex items-center justify-center px-4 pointer-events-none">
            <div className="relative flex items-center justify-center">
              
              {/* Progress Ring */}
              <ProgressRing progress={progress} color={pattern.color} size={180} />
              
              {/* Breathing Guide */}
              <BreathingGuide phase={currentPhase} progress={progress} isActive={isRunning} color={pattern.color} />
              
              {/* Main Circle */}
              <motion.div
                className="relative rounded-full backdrop-blur-xl border shadow-2xl"
                style={{
                  width: '180px',
                  height: '180px',
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(255, 255, 255, 0.25)',
                  borderColor: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(255, 255, 255, 0.3)',
                  boxShadow: isDarkMode
                    ? '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    : '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                }}
                animate={{
                  scale: breathingScale,
                  boxShadow: currentPhase ? 
                    `0 0 ${30 * breathingScale}px ${pattern.color}40, 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)` : 
                    isDarkMode 
                      ? '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      : '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                }}
                transition={{ 
                  scale: { duration: currentPhase ? currentPhase.duration / 1000 : 2, ease: "easeInOut" },
                  boxShadow: { duration: 1 }
                }}
              >
                {/* Inner layers */}
                <div 
                  className="absolute inset-4 rounded-full backdrop-blur-lg" 
                  style={{
                    background: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.2)',
                  }}
                />
                <div 
                  className="absolute inset-8 rounded-full backdrop-blur-md" 
                  style={{
                    background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.3)',
                  }}
                />
                
                {/* Gradient overlay */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)`
                  }}
                />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <motion.div
                    key={currentPhaseIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-2"
                  >
                    <div className="text-2xl mb-2 filter drop-shadow-md">{pattern.icon}</div>
                    <h3 className={`text-lg font-medium mb-1 filter drop-shadow-sm ${
                      isDarkMode ? 'text-white' : 'text-slate-700'
                    }`}>
                      {currentPhase ? currentPhase.name.charAt(0).toUpperCase() + currentPhase.name.slice(1) : 'Ready to begin?'}
                    </h3>
                    {currentPhase && (
                      <div className={`text-sm font-light filter drop-shadow-sm ${
                        isDarkMode ? 'text-slate-200' : 'text-slate-500'
                      }`}>
                        {Math.ceil(remainingTime / 1000)}s
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Phase Instruction - Mobile */}
          <div className="flex-shrink-0 px-4 mb-4">
            <AnimatePresence mode="wait">
              {currentPhase && (
                <motion.div
                  key={currentPhaseIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <p className={`text-base leading-relaxed filter drop-shadow-sm ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-600'
                  }`}>
                    {currentPhase.instruction}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Collapsible Mobile Controls */}
          <div className="flex-shrink-0 pointer-events-auto pb-safe-area-inset-bottom">
            {/* Collapse Toggle */}
            <div className="flex justify-center mb-2">
              <motion.button
                onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
                className="p-2 rounded-full backdrop-blur-md border"
                style={{
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)',
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.4)',
                  color: isDarkMode ? 'white' : '#374151'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isControlsCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </motion.button>
            </div>

            <motion.div
              initial={false}
              animate={{ 
                height: isControlsCollapsed ? 0 : 'auto',
                opacity: isControlsCollapsed ? 0 : 1 
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div 
                className="p-4 backdrop-blur-xl border-t"
                style={{
                  background: isDarkMode 
                    ? 'rgba(0, 0, 0, 0.3)' 
                    : 'rgba(255, 255, 255, 0.25)',
                  borderColor: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(255, 255, 255, 0.3)',
                }}
              >
                
                {/* Primary Control */}
                <motion.button
                  onClick={startExercise}
                  className={`w-full py-4 px-6 rounded-2xl font-medium text-lg shadow-xl mb-4 transition-all ${
                    isRunning 
                      ? 'bg-amber-500 hover:bg-amber-400 text-white' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center gap-3">
                    {isRunning ? <Pause size={20} /> : <Play size={20} />}
                    {currentPhaseIndex === -1 ? 'Begin Journey' : isRunning ? 'Pause' : 'Continue'}
                  </div>
                </motion.button>

                {/* Secondary Controls */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <motion.button
                    onClick={resetExercise}
                    className="py-3 px-3 rounded-xl font-medium transition-all backdrop-blur-md border"
                    style={{
                      background: isDarkMode 
                        ? 'rgba(71, 85, 105, 0.7)' 
                        : 'rgba(226, 232, 240, 0.7)',
                      borderColor: isDarkMode 
                        ? 'rgba(71, 85, 105, 0.8)' 
                        : 'rgba(226, 232, 240, 0.8)',
                      color: isDarkMode ? 'white' : '#374151'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={currentPhaseIndex === -1}
                  >
                    <RotateCcw size={16} className="mx-auto" />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setIsSettingsOpen(true)}
                    className="py-3 px-3 rounded-xl font-medium transition-all backdrop-blur-md"
                    style={{
                      background: 'rgba(168, 85, 247, 0.8)',
                      color: 'white'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Settings size={16} className="mx-auto" />
                  </motion.button>

                  <motion.button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="py-3 px-3 rounded-xl font-medium transition-all backdrop-blur-md"
                    style={{
                      background: soundEnabled 
                        ? 'rgba(34, 197, 94, 0.8)' 
                        : isDarkMode 
                          ? 'rgba(71, 85, 105, 0.7)' 
                          : 'rgba(148, 163, 184, 0.7)',
                      color: 'white'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {soundEnabled ? <Volume2 size={16} className="mx-auto" /> : <VolumeX size={16} className="mx-auto" />}
                  </motion.button>

                  <motion.button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="py-3 px-3 rounded-xl font-medium transition-all backdrop-blur-md border"
                    style={{
                      background: isDarkMode 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'rgba(0, 0, 0, 0.1)',
                      borderColor: isDarkMode 
                        ? 'rgba(255, 255, 255, 0.2)' 
                        : 'rgba(0, 0, 0, 0.2)',
                      color: isDarkMode ? 'white' : '#374151'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isDarkMode ? <Sun size={16} className="mx-auto" /> : <Moon size={16} className="mx-auto" />}
                  </motion.button>
                </div>

                {/* Pattern Selection - Mobile */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {Object.entries(patterns).map(([key, pat]) => (
                    <motion.button
                      key={key}
                      onClick={() => setSelectedPattern(key)}
                      className="p-3 rounded-xl text-left transition-all backdrop-blur-md border"
                      style={{
                        background: selectedPattern === key 
                          ? isDarkMode 
                            ? 'rgba(255, 255, 255, 0.15)' 
                            : 'rgba(255, 255, 255, 0.6)'
                          : isDarkMode 
                            ? 'rgba(255, 255, 255, 0.05)' 
                            : 'rgba(255, 255, 255, 0.2)',
                        borderColor: selectedPattern === key 
                          ? isDarkMode 
                            ? 'rgba(255, 255, 255, 0.3)' 
                            : 'rgba(59, 130, 246, 0.5)'
                          : 'transparent',
                        color: isDarkMode ? 'white' : selectedPattern === key ? '#1e293b' : '#64748b'
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-lg mb-1">{pat.icon}</div>
                      <div className="font-medium text-xs">{pat.name}</div>
                    </motion.button>
                  ))}
                </div>

                {/* Stats - Mobile */}
                <div className="grid grid-cols-3 gap-3">
                  <div 
                    className="rounded-xl p-3 text-center backdrop-blur-md border"
                    style={{
                      background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.4)',
                      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <div className={`font-bold text-lg filter drop-shadow-sm ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>{cycle}</div>
                    <div className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>Cycles</div>
                  </div>
                  <div 
                    className="rounded-xl p-3 text-center backdrop-blur-md border"
                    style={{
                      background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.4)',
                      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <div className={`font-bold text-lg filter drop-shadow-sm ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>{formatTime(sessionDuration)}</div>
                    <div className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>Time</div>
                  </div>
                  <div 
                    className="rounded-xl p-3 text-center backdrop-blur-md border"
                    style={{
                      background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.4)',
                      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <div className={`font-bold text-lg filter drop-shadow-sm ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
                      {Math.min(100, Math.round((cycle / 10) * 100))}%
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>Peace</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        // Desktop/Tablet Layout
        <div className="relative z-10 min-h-screen flex">
          
          {/* Main Breathing Interface */}
          <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 pointer-events-none max-w-[calc(100vw-20rem)]">
            
            {/* Header */}
            <motion.div
              className="text-center mb-8 md:mb-12"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-light mb-4 ${
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

            {/* Main Breathing Circle with Glassmorphism */}
            <div className="relative flex items-center justify-center mb-8 md:mb-12">
              
              {/* Progress Ring */}
              <ProgressRing progress={progress} color={pattern.color} size={isTablet ? 200 : 240} />
              
              {/* Breathing Guide */}
              <BreathingGuide phase={currentPhase} progress={progress} isActive={isRunning} color={pattern.color} />
              
              {/* Main Glassmorphism Circle */}
              <motion.div
                className="relative rounded-full backdrop-blur-xl border shadow-2xl"
                style={{
                  width: isTablet ? '200px' : '240px',
                  height: isTablet ? '200px' : '240px',
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(255, 255, 255, 0.25)',
                  borderColor: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(255, 255, 255, 0.3)',
                  boxShadow: isDarkMode
                    ? '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    : '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                }}
                animate={{
                  scale: breathingScale,
                  boxShadow: currentPhase ? 
                    `0 0 ${40 * breathingScale}px ${pattern.color}40, 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)` : 
                    isDarkMode 
                      ? '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      : '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                }}
                transition={{ 
                  scale: { duration: currentPhase ? currentPhase.duration / 1000 : 2, ease: "easeInOut" },
                  boxShadow: { duration: 1 }
                }}
              >
                {/* Inner glassmorphism layers */}
                <div 
                  className={`absolute ${isTablet ? 'inset-4' : 'inset-4 md:inset-6'} rounded-full backdrop-blur-lg`}
                  style={{
                    background: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.2)',
                  }}
                />
                <div 
                  className={`absolute ${isTablet ? 'inset-6' : 'inset-6 md:inset-10'} rounded-full backdrop-blur-md`}
                  style={{
                    background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.3)',
                  }}
                />
                
                {/* Subtle gradient overlay */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)`
                  }}
                />
                
                {/* Content */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center text-center ${isTablet ? 'p-4' : 'p-4 md:p-8'}`}>
                  <motion.div
                    key={currentPhaseIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`${isTablet ? 'mb-2' : 'mb-2 md:mb-4'}`}
                  >
                    <div className={`${isTablet ? 'text-2xl mb-2' : 'text-2xl md:text-4xl mb-2 md:mb-3'} filter drop-shadow-md`}>{pattern.icon}</div>
                    <h3 className={`${isTablet ? 'text-lg' : 'text-lg md:text-2xl'} font-medium ${isTablet ? 'mb-1' : 'mb-1 md:mb-2'} filter drop-shadow-sm ${
                      isDarkMode ? 'text-white' : 'text-slate-700'
                    }`}>
                      {currentPhase ? currentPhase.name.charAt(0).toUpperCase() + currentPhase.name.slice(1) : 'Ready to begin?'}
                    </h3>
                    {currentPhase && (
                      <div className={`${isTablet ? 'text-sm' : 'text-sm md:text-lg'} font-light filter drop-shadow-sm ${
                        isDarkMode ? 'text-slate-200' : 'text-slate-500'
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
                  className="text-center mb-8 md:mb-12 max-w-lg px-4"
                >
                  <p className={`text-lg md:text-xl leading-relaxed filter drop-shadow-sm ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-600'
                  }`}>
                    {currentPhase.instruction}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Control Panel - Desktop/Tablet - Interactive */}
          <div 
            className="w-80 backdrop-blur-xl p-6 flex flex-col justify-between border-l pointer-events-auto overflow-y-auto"
            style={{
              background: isDarkMode 
                ? 'rgba(0, 0, 0, 0.3)' 
                : 'rgba(255, 255, 255, 0.25)',
              borderColor: isDarkMode 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(255, 255, 255, 0.3)',
              maxHeight: '100vh'
            }}
          >
            
            {/* Header with Dark Mode Toggle */}
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-medium filter drop-shadow-sm ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
                Controls
              </h2>
              <motion.button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-3 rounded-full backdrop-blur-md transition-all border"
                style={{
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.1)',
                  borderColor: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : 'rgba(0, 0, 0, 0.2)',
                  color: isDarkMode ? 'white' : '#374151'
                }}
                whileHover={{ 
                  scale: 1.05,
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.15)' 
                    : 'rgba(0, 0, 0, 0.15)'
                }}
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
                  className="py-3 md:py-4 px-4 md:px-6 rounded-xl font-medium transition-all backdrop-blur-md border"
                  style={{
                    background: isDarkMode 
                      ? 'rgba(71, 85, 105, 0.7)' 
                      : 'rgba(226, 232, 240, 0.7)',
                    borderColor: isDarkMode 
                      ? 'rgba(71, 85, 105, 0.8)' 
                      : 'rgba(226, 232, 240, 0.8)',
                    color: isDarkMode ? 'white' : '#374151'
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    background: isDarkMode 
                      ? 'rgba(71, 85, 105, 0.8)' 
                      : 'rgba(226, 232, 240, 0.8)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  disabled={currentPhaseIndex === -1}
                >
                  <RotateCcw size={18} className="mx-auto" />
                </motion.button>
                
                <motion.button
                  onClick={() => setIsSettingsOpen(true)}
                  className="py-3 md:py-4 px-4 md:px-6 rounded-xl font-medium transition-all backdrop-blur-md"
                  style={{
                    background: 'rgba(168, 85, 247, 0.8)',
                    color: 'white'
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    background: 'rgba(168, 85, 247, 0.9)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Settings size={18} className="mx-auto" />
                </motion.button>

                <motion.button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="py-3 md:py-4 px-4 md:px-6 rounded-xl font-medium transition-all backdrop-blur-md"
                  style={{
                    background: soundEnabled 
                      ? 'rgba(34, 197, 94, 0.8)' 
                      : isDarkMode 
                        ? 'rgba(71, 85, 105, 0.7)' 
                        : 'rgba(148, 163, 184, 0.7)',
                    color: 'white'
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    background: soundEnabled 
                      ? 'rgba(34, 197, 94, 0.9)' 
                      : isDarkMode 
                        ? 'rgba(71, 85, 105, 0.8)' 
                        : 'rgba(148, 163, 184, 0.8)'
                  }}
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
                    className="p-3 md:p-4 rounded-xl text-left transition-all backdrop-blur-md border"
                    style={{
                      background: selectedPattern === key 
                        ? isDarkMode 
                          ? 'rgba(255, 255, 255, 0.15)' 
                          : 'rgba(255, 255, 255, 0.6)'
                        : isDarkMode 
                          ? 'rgba(255, 255, 255, 0.05)' 
                          : 'rgba(255, 255, 255, 0.2)',
                      borderColor: selectedPattern === key 
                        ? isDarkMode 
                          ? 'rgba(255, 255, 255, 0.3)' 
                          : 'rgba(59, 130, 246, 0.5)'
                        : 'transparent',
                      color: isDarkMode ? 'white' : selectedPattern === key ? '#1e293b' : '#64748b'
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      background: selectedPattern === key 
                        ? isDarkMode 
                          ? 'rgba(255, 255, 255, 0.2)' 
                          : 'rgba(255, 255, 255, 0.7)'
                        : isDarkMode 
                          ? 'rgba(255, 255, 255, 0.1)' 
                          : 'rgba(255, 255, 255, 0.4)'
                    }}
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
                <div 
                  className="rounded-xl p-3 md:p-4 text-center backdrop-blur-md border"
                  style={{
                    background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.4)',
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <div className={`font-bold text-lg md:text-xl filter drop-shadow-sm ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>{cycle}</div>
                  <div className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>Cycles</div>
                </div>
                <div 
                  className="rounded-xl p-3 md:p-4 text-center backdrop-blur-md border"
                  style={{
                    background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.4)',
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <div className={`font-bold text-lg md:text-xl filter drop-shadow-sm ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>{formatTime(sessionDuration)}</div>
                  <div className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>Time</div>
                </div>
              </div>

              {/* Progress */}
              <div 
                className="rounded-xl p-3 md:p-4 backdrop-blur-md border"
                style={{
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.4)',
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-600'}`}>
                    Serenity Progress
                  </span>
                  <span className={`font-medium filter drop-shadow-sm ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
                    {Math.min(100, Math.round((cycle / 10) * 100))}%
                  </span>
                </div>
                <div 
                  className="h-2 rounded-full overflow-hidden"
                  style={{
                    background: isDarkMode ? 'rgba(71, 85, 105, 0.5)' : 'rgba(148, 163, 184, 0.5)'
                  }}
                >
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
      )}

      {/* Affirmations - Universal */}
      <AnimatePresence>
        {currentAffirmation && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            className={`fixed ${isMobile ? 'bottom-32 left-4 right-4' : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'} backdrop-blur-xl rounded-2xl p-4 md:p-6 max-w-md mx-auto text-center shadow-xl border z-50 pointer-events-none`}
            style={{
              background: isDarkMode 
                ? 'rgba(255, 255, 255, 0.08)' 
                : 'rgba(255, 255, 255, 0.4)',
              borderColor: isDarkMode 
                ? 'rgba(255, 255, 255, 0.15)' 
                : 'rgba(255, 255, 255, 0.5)',
              boxShadow: isDarkMode
                ? '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                : '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
            }}
          >
            <p className={`text-base md:text-lg font-light leading-relaxed filter drop-shadow-sm ${
              isDarkMode ? 'text-white' : 'text-slate-700'
            }`}>
              ✨ {currentAffirmation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal - Universal */}
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
              className="backdrop-blur-xl p-6 md:p-8 rounded-3xl max-w-lg w-full shadow-2xl border max-h-[90vh] overflow-y-auto"
              style={{
                background: isDarkMode 
                  ? 'rgba(30, 41, 59, 0.95)' 
                  : 'rgba(255, 255, 255, 0.95)',
                borderColor: isDarkMode 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : 'rgba(226, 232, 240, 0.5)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <h2 className={`text-xl md:text-2xl font-medium filter drop-shadow-sm ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
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
                  <label className={`block font-medium mb-4 filter drop-shadow-sm ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    Choose Your Journey
                  </label>
                  <div className="space-y-3">
                    {Object.entries(patterns).map(([key, pat]) => (
                      <motion.button
                        key={key}
                        onClick={() => setSelectedPattern(key)}
                        className="w-full p-4 rounded-xl text-left transition-all backdrop-blur-md border"
                        style={{
                          background: selectedPattern === key 
                            ? isDarkMode 
                              ? 'rgba(255, 255, 255, 0.15)' 
                              : 'rgba(59, 130, 246, 0.1)'
                            : isDarkMode 
                              ? 'rgba(255, 255, 255, 0.1)' 
                              : 'rgba(226, 232, 240, 0.5)',
                          color: isDarkMode 
                            ? selectedPattern === key ? 'white' : '#cbd5e1'
                            : selectedPattern === key ? '#1e293b' : '#64748b'
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{pat.icon}</span>
                          <div>
                            <div className="font-medium">{pat.name}</div>
                            <div className="text-sm opacity-75">{pat.description}</div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {soundEnabled && (
                  <div className={`p-4 rounded-xl border ${
                    isDarkMode 
                      ? 'bg-blue-900/20 border-blue-700/30 text-blue-100' 
                      : 'bg-blue-50 border-blue-200 text-blue-800'
                  }`}>
                    <div className="font-medium mb-2">Audio Features Active</div>
                    <div className="text-sm opacity-75">
                      Adaptive binaural audio + 64 Hz sub-bass that follows your breathing and typing calm.
                    </div>
                  </div>
                )}

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
            initial={{ opacity: 0, x: isMobile ? 0 : 300, y: isMobile ? 50 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: isMobile ? 0 : 300, y: isMobile ? 50 : 0 }}
            className={`fixed ${isMobile ? 'top-16 left-4 right-4' : 'top-4 md:top-20 right-4 md:right-6'} backdrop-blur-md rounded-2xl p-4 z-50 shadow-xl max-w-xs border ${isMobile ? 'mx-auto' : ''}`}
            style={{
              background: isDarkMode 
                ? 'rgba(16, 185, 129, 0.2)' 
                : 'rgba(16, 185, 129, 0.1)',
              borderColor: isDarkMode 
                ? 'rgba(52, 211, 153, 0.3)' 
                : 'rgba(52, 211, 153, 0.5)'
            }}
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
            className="fixed inset-0 flex items-start justify-center z-50 pointer-events-none p-4"
          >
            <div className="text-left ">
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
                className={`${isMobile ? 'text-4xl' : 'text-4xl md:text-6xl'} mb-4`}
              >
                🧘‍♀️
              </motion.div>
              <h2 className={`${isMobile ? 'text-2xl' : 'text-2xl md:text-4xl'} font-light mb-2 filter drop-shadow-md ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                Perfect Serenity
              </h2>
              <p className={`${isMobile ? 'text-lg' : 'text-lg md:text-xl'} filter drop-shadow-sm ${
                isDarkMode ? 'text-slate-200' : 'text-slate-600'
              }`}>
                You've reached a beautiful state of calm
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Touch-friendly Sound Toggle for non-mobile */}
      {!isMobile && (
        <div className="fixed bottom-4 left-4 z-40">
          <motion.button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-3 md:p-4 rounded-full backdrop-blur-md border transition-all shadow-lg"
            style={{
              background: soundEnabled 
                ? 'rgba(59, 130, 246, 0.2)' 
                : isDarkMode 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(255, 255, 255, 0.3)',
              borderColor: soundEnabled 
                ? 'rgba(59, 130, 246, 0.3)' 
                : isDarkMode 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : 'rgba(255, 255, 255, 0.4)',
              color: soundEnabled 
                ? '#60a5fa' 
                : isDarkMode ? 'rgba(255, 255, 255, 0.6)' : '#64748b'
            }}
            whileHover={{ 
              scale: 1.05,
              color: soundEnabled 
                ? '#3b82f6' 
                : isDarkMode ? 'rgba(255, 255, 255, 0.8)' : '#1e293b'
            }}
            whileTap={{ scale: 0.95 }}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </motion.button>
        </div>
      )}

      {/* Info Toast - Desktop only */}
      {soundEnabled && !isMobile && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 left-4 backdrop-blur-md rounded-xl p-3 text-sm shadow-lg z-30 border"
          style={{
            background: isDarkMode 
              ? 'rgba(30, 41, 59, 0.9)' 
              : 'rgba(255, 255, 255, 0.9)',
            borderColor: isDarkMode 
              ? 'rgba(255, 255, 255, 0.2)' 
              : 'rgba(226, 232, 240, 0.5)',
            color: isDarkMode ? 'white' : '#374151'
          }}
        >
          🔊 Binaural audio active
        </motion.div>
      )}

      {/* Mobile-specific CSS improvements */}
      <style jsx>{`
        /* Safe area support for newer devices */
        .pt-safe-area-inset-top {
          padding-top: max(2rem, env(safe-area-inset-top));
        }
        
        .pb-safe-area-inset-bottom {
          padding-bottom: max(1rem, env(safe-area-inset-bottom));
        }
        
        @media (max-width: 768px) {
          /* Ensure touch events work on mobile for interactive elements */
          .pointer-events-none {
            /* Allow pointer events on children */
          }
          
          /* Improve touch targets */
          button {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Smooth scrolling for mobile */
          html {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
          }
          
          /* Prevent zoom on input focus */
          input, select, textarea {
            font-size: 16px;
          }
          
          /* Better tap highlights */
          * {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
          }
          
          /* Optimize viewport handling */
          .min-h-screen {
            min-height: 100vh;
            min-height: -webkit-fill-available;
          }
        }
        
        @media (max-width: 640px) {
          /* Extra small mobile adjustments */
          .text-3xl {
            font-size: 1.875rem;
          }
        }
        
        /* Tablet-specific optimizations */
        @media (min-width: 768px) and (max-width: 1024px) {
          /* Ensure good touch targets on tablets */
          button {
            min-height: 48px;
            min-width: 48px;
          }
        }
        
        /* Desktop layout improvements */
        @media (min-width: 1024px) {
          /* Ensure control panel stays in view */
          .overflow-y-auto {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
          }
          
          .overflow-y-auto::-webkit-scrollbar {
            width: 4px;
          }
          
          .overflow-y-auto::-webkit-scrollbar-track {
            background: transparent;
          }
          
          .overflow-y-auto::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
          }
        }
        
        /* High DPI display support */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .filter {
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
          }
        }
        
        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Focus visible improvements */
        button:focus-visible {
          outline: 2px solid rgba(59, 130, 246, 0.5);
          outline-offset: 2px;
        }
        
        /* Dark mode system preference */
        @media (prefers-color-scheme: dark) {
          /* Additional dark mode styles if needed */
        }
        
        /* Portrait orientation optimizations */
        @media (orientation: portrait) and (max-width: 768px) {
          /* Optimize for mobile portrait */
          .flex-1 {
            flex: 1 1 0%;
            min-height: 0;
          }
        }
        
        /* Landscape orientation optimizations */
        @media (orientation: landscape) and (max-height: 500px) {
          /* Optimize for mobile landscape */
          .min-h-screen {
            min-height: 100vh;
          }
          
          .mb-8 {
            margin-bottom: 1rem;
          }
          
          .mb-12 {
            margin-bottom: 1.5rem;
          }
        }
        
        /* Print styles */
        @media print {
          .fixed {
            position: static !important;
          }
          
          .backdrop-blur-xl {
            backdrop-filter: none;
            background: white !important;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default Breathing;
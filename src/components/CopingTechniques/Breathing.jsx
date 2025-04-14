import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const patterns = {
  simple: [
    { name: 'inhale', targetScale: 1.6, duration: 4000 },
    { name: 'exhale', targetScale: 1, duration: 4000 },
  ],
  withHold: [
    { name: 'inhale', targetScale: 1.6, duration: 4000 },
    { name: 'hold', targetScale: 1.6, duration: 4000 },
    { name: 'exhale', targetScale: 1, duration: 4000 },
  ],
  box: [
    { name: 'inhale', targetScale: 1.6, duration: 4000 },
    { name: 'hold', targetScale: 1.6, duration: 4000 },
    { name: 'exhale', targetScale: 1, duration: 4000 },
    { name: 'hold', targetScale: 1.6, duration: 4000 },
  ],
  fourSevenEight: [
    { name: 'inhale', targetScale: 1.6, duration: 4000 },
    { name: 'hold', targetScale: 1.6, duration: 7000 },
    { name: 'exhale', targetScale: 1, duration: 8000 },
  ],
};

const comfortingMessages = [
  "You're doing great! Keep breathing.",
  "Take it slow, one breath at a time.",
  "Feel the calm wash over you.",
  "You're in control. You've got this.",
  "Let each breath bring you peace.",
  "Anxiety fades with every exhale.",
  "You're stronger than you think.",
  "Breathe in calm, breathe out tension.",
  "You're safe. You're okay.",
  "Focus on your breath, let go of worry.",
  "You’re amazing—keep it up!",
  "Every breath is a step toward calm.",
  "You’ve got the power to feel better!",
  "Shine bright—you’re doing wonderfully.",
  "Embrace the peace within you.",
  "You are enough, just as you are.",
  "Let go of what you can't control.",
  "You are deserving of peace and calm.",
  "Take a moment to appreciate yourself.",
  "You are capable of amazing things.",
  "Breathe deeply, you've got this!",
  "You are not alone—keep going.",
  "Each breath is a new beginning.",
  "You are resilient and strong.",
  "Feel the love and support around you."
];

function Breathing() {
  const [selectedPattern, setSelectedPattern] = useState('box');
  const [phases, setPhases] = useState(patterns[selectedPattern]);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [message, setMessage] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [comfortMessage, setComfortMessage] = useState('');
  const startTimeRef = useRef(null);

  useEffect(() => {
    setPhases(patterns[selectedPattern]);
    if (isRunning) {
      setIsRunning(false);
      setCurrentPhaseIndex(-1);
    }
  }, [selectedPattern]);

  useEffect(() => {
    if (!isRunning || currentPhaseIndex === -1) return;

    const currentPhase = phases[currentPhaseIndex];
    startTimeRef.current = Date.now();
    const timer = setTimeout(() => {
      const nextPhaseIndex = (currentPhaseIndex + 1) % phases.length;
      if (nextPhaseIndex === 0) {
        setCycle((c) => {
          const newCycle = c + 1;
          setComfortMessage(comfortingMessages[Math.floor(Math.random() * comfortingMessages.length)]);
          setTimeout(() => setComfortMessage(''), 5000);
          return newCycle;
        });
      }
      setCurrentPhaseIndex(nextPhaseIndex);
    }, currentPhase.duration);

    return () => clearTimeout(timer);
  }, [isRunning, currentPhaseIndex, phases]);

  useEffect(() => {
    if (!isRunning || currentPhaseIndex === -1) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const phaseDuration = phases[currentPhaseIndex].duration;
      setRemainingTime(Math.max(0, phaseDuration - elapsed));
      setProgress(Math.min(1, elapsed / phaseDuration));
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, currentPhaseIndex, phases]);

  const startExercise = () => {
    if (currentPhaseIndex === -1) {
      setCurrentPhaseIndex(0);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const resetExercise = () => {
    setCurrentPhaseIndex(-1);
    setIsRunning(false);
    setCycle(0);
    setMessage('');
    setComfortMessage('');
  };

  const circleVariants = {
    start: {
      scale: [1, 1.1, 1],
      rotate: [0, 3, -3, 0],
      boxShadow: '0 0 20px rgba(96, 165, 250, 0.4)',
      background: 'radial-gradient(circle, #e0f2fe, #a5b4fc)',
      transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
    },
    breathing: (phase) => ({
      scale: phase.targetScale,
      rotate: phase.name === 'hold' ? [0, 2, -2, 0] : 0,
      boxShadow: `0 0 ${phase.targetScale * 25}px rgba(96, 165, 250, ${phase.name === 'hold' ? 0.7 : 0.6})`,
      background:
        phase.name === 'inhale'
          ? 'radial-gradient(circle at 25% 25%, #7dd3fc, #2563eb)'
          : phase.name === 'exhale'
          ? 'radial-gradient(circle at 75% 75%, #2563eb, #7dd3fc)'
          : 'radial-gradient(circle, #c7d2fe, #7dd3fc)',
      transition: {
        scale: { duration: phase.duration / 1000, ease: 'easeInOut' },
        boxShadow: { duration: 0.8, ease: 'easeInOut' },
        rotate: phase.name === 'hold' ? { repeat: Infinity, duration: 1.2 } : { duration: 0 },
      },
    }),
    paused: {
      scale: 1,
      rotate: 0,
      boxShadow: '0 0 8px rgba(96, 165, 250, 0.2)',
      background: 'radial-gradient(circle, #e0f2fe, #a5b4fc)',
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.03, boxShadow: '0 0 12px rgba(255, 255, 255, 0.4)', transition: { duration: 0.25 } },
    tap: { scale: 0.97, transition: { duration: 0.15 } },
    initial: { scale: 1, boxShadow: '0 0 4px rgba(255, 255, 255, 0.2)' },
  };

  const displayText = currentPhaseIndex === -1
    ? 'Start Your Calm Journey'
    : `${phases[currentPhaseIndex].name.charAt(0).toUpperCase() + phases[currentPhaseIndex].name.slice(1)} for ${Math.ceil(remainingTime / 1000)}s`;

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100 p-4 sm:p-6 overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        className="absolute w-64 h-64 bg-blue-200 rounded-full opacity-10 top-5 left-5"
        animate={{ x: ['-10%', '10%'], y: ['-10%', '10%'], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-teal-200 rounded-full opacity-10 bottom-10 right-10"
        animate={{ x: ['10%', '-10%'], y: ['10%', '-10%'], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-40 h-40 bg-blue-100 rounded-full opacity-15 top-1/4 right-1/4"
        animate={{ x: ['-5%', '5%'], y: ['-5%', '5%'], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-56 h-56 bg-teal-100 rounded-full opacity-15 bottom-1/4 left-1/4"
        animate={{ x: ['5%', '-5%'], y: ['5%', '-5%'], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.h1
        className="text-xl  sm:text-2xl font-bold text-gray-700 mb-10 sm:mb-8 z-10"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Breathing Companion
      </motion.h1>
      <div className="mt-5 relative flex items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-md z-10">
        <svg className="absolute w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
          <motion.circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="2.5"
            strokeDasharray="301"
            strokeDashoffset={currentPhaseIndex === -1 || !isRunning ? 301 : 301 * (1 - progress)}
            transition={{ ease: 'linear' }}
          />
        </svg>
        <motion.div
          className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full relative z-10"
          variants={circleVariants}
          animate={currentPhaseIndex === -1 ? 'start' : isRunning ? 'breathing' : 'paused'}
          custom={currentPhaseIndex !== -1 ? phases[currentPhaseIndex] : null}
        />
      </div>
      <motion.p
        key={currentPhaseIndex + isRunning.toString()}
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="mt-8 sm:mt-10 text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-700 text-center px-4 max-w-lg drop-shadow-md z-10"
        aria-live="polite"
      >
        {displayText}
      </motion.p>
      {comfortMessage && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="mt-3 text-gray-500 text-base sm:text-lg font-medium drop-shadow-sm z-10"
        >
          {comfortMessage}
        </motion.p>
      )}
      <div className="mt-5 sm:mt-6 flex space-x-2 sm:space-x-3 z-10">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${index < (cycle % 5 || (cycle > 0 ? 5 : 0)) ? 'bg-teal-400' : 'bg-gray-200'} shadow-sm`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      <p className="mt-3 sm:mt-4 text-gray-600 text-base sm:text-lg font-medium drop-shadow-sm z-10">
        Cycles: {cycle}
      </p>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="mt-3 sm:mt-4 text-gray-700 text-lg sm:text-xl font-semibold drop-shadow-sm z-10"
        >
          {message}
        </motion.p>
      )}
      <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-4 sm:gap-6 z-10">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={startExercise}
          className="px-6 py-3 sm:px-8 sm:py-4 bg-teal-400 text-white rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-200 text-base sm:text-lg font-bold transition-colors"
        >
          {currentPhaseIndex === -1 ? 'Start' : isRunning ? 'Pause' : 'Resume'}
        </motion.button>
        {currentPhaseIndex !== -1 && (
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={resetExercise}
            className="px-6 py-3 sm:px-8 sm:py-4 bg-gray-400 text-white rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-200 text-base sm:text-lg font-bold transition-colors"
          >
            Reset
          </motion.button>
        )}
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => setIsSettingsOpen(true)}
          className="px-6 py-3 sm:px-8 sm:py-4 bg-blue-400 text-white rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200 text-base sm:text-lg font-bold transition-colors"
        >
          Settings
        </motion.button>
      </div>
      <div className="mt-6 sm:mt-8 w-full max-w-xs sm:max-w-sm md:max-w-md z-10">
        <div className="bg-gray-100 h-2 sm:h-3 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-teal-300 to-blue-300 h-2 sm:h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(cycle / 50) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-gradient-to-br from-teal-50 to-blue-50 p-5 sm:p-7 rounded-3xl shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md"
            >
              <div className="flex justify-end">
                <button onClick={() => setIsSettingsOpen(false)} className="text-teal-600 hover:text-teal-800 font-semibold">Close</button>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-teal-800 mb-5">Customize Your Breath</h2>
              <div className="mb-5">
                <label className="block text-teal-700 font-semibold mb-2">Breathing Pattern</label>
                <select
                  value={selectedPattern}
                  onChange={(e) => setSelectedPattern(e.target.value)}
                  className="w-full p-3 border border-teal-200 bg-white rounded-lg text-teal-800 text-sm sm:text-base focus:ring-2 focus:ring-teal-300 focus:outline-none"
                >
                  <option value="simple">Simple (Inhale-Exhale)</option>
                  <option value="withHold">With Hold</option>
                  <option value="box">Box Breathing</option>
                  <option value="fourSevenEight">4-7-8 Technique</option>
                </select>
              </div>
              {phases.map((phase, index) => (
                <div key={index} className="mb-5">
                  <label className="block text-teal-700 font-semibold mb-2">
                    {phase.name.charAt(0).toUpperCase() + phase.name.slice(1)} Duration
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="10000"
                    step="1000"
                    value={phase.duration}
                    onChange={(e) => {
                      const newDuration = Number(e.target.value);
                      setPhases((prev) => [
                        ...prev.slice(0, index),
                        { ...prev[index], duration: newDuration },
                        ...prev.slice(index + 1),
                      ]);
                    }}
                    className="w-full accent-teal-400"
                  />
                  <span className="text-teal-600 text-sm">{phase.duration / 1000}s</span>
                </div>
              ))}
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => setIsSettingsOpen(false)}
                className="mt-5 px-6 py-3 bg-teal-400 text-white rounded-lg text-sm sm:text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-teal-200"
              >
                Apply
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Breathing;
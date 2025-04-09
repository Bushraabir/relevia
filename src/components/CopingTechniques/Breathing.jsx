import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function Breathing() {
  const [phase, setPhase] = useState('start');
  const [isPaused, setIsPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [message, setMessage] = useState('');

  const startExercise = () => {
    if (phase === 'start') {
      setPhase('inhale');
      setIsPaused(false);
    } else {
      setIsPaused(!isPaused);
    }
  };

  useEffect(() => {
    if (isPaused || phase === 'start') return;
    const timer = setTimeout(() => {
      if (phase === 'inhale') {
        setPhase('hold');
      } else if (phase === 'hold') {
        setPhase('exhale');
      } else if (phase === 'exhale') {
        setPhase('inhale');
        setCycle((c) => {
          const newCycle = c + 1;
          if (newCycle % 5 === 0) {
            setMessage(getMessage(newCycle));
            setTimeout(() => setMessage(''), 3000);
          }
          return newCycle;
        });
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [phase, isPaused]);

  const phaseInstructions = {
    start: 'Press Start to Begin',
    inhale: 'Inhale deeply for 4 seconds',
    hold: 'Hold your breath for 4 seconds',
    exhale: 'Exhale slowly for 4 seconds',
  };

  const circleVariants = {
    start: {
      scale: [1, 1.05, 1],
      boxShadow: '0 0 0 0 rgba(56, 189, 248, 0)',
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: 'easeInOut',
      },
    },
    inhale: {
      scale: 1.5,
      boxShadow: '0 0 20px 10px rgba(56, 189, 248, 0.5)',
      transition: { duration: 4, ease: 'easeInOut' },
    },
    hold: {
      scale: 1.5,
      boxShadow: '0 0 30px 15px rgba(56, 189, 248, 0.7)',
      transition: { duration: 4, ease: 'easeInOut' },
    },
    exhale: {
      scale: 1,
      boxShadow: '0 0 20px 10px rgba(56, 189, 248, 0.5)',
      transition: { duration: 4, ease: 'easeInOut' },
    },
  };

  const sparkleVariants = {
    start: { opacity: 0, scale: 0 },
    inhale: { opacity: 0, scale: 0 },
    hold: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: { duration: 4, repeat: Infinity },
    },
    exhale: { opacity: 0, scale: 0 },
  };

  const getMessage = (cycle) => {
    if (cycle === 5) return 'Great job! You\'ve completed your first set.';
    if (cycle === 10) return 'Amazing! You\'ve completed two sets. Keep going!';
    return `Wonderful! You\'ve completed ${cycle / 5} sets.`;
  };

  const activeCount = cycle === 0 ? 0 : (cycle % 5 === 0 ? 5 : cycle % 5);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-200 to-secondary-200"
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-primary-300 opacity-20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="w-64 h-64 rounded-full bg-primary-500 relative z-10"
          variants={circleVariants}
          animate={phase}
        />
        <motion.div
          className="absolute w-4 h-4 bg-primary-300 rounded-full top-0 left-1/2 transform -translate-x-1/2 -translate-y-full"
          variants={sparkleVariants}
          animate={phase}
        />
        <motion.div
          className="absolute w-4 h-4 bg-primary-300 rounded-full bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
          variants={sparkleVariants}
          animate={phase}
        />
        <motion.div
          className="absolute w-4 h-4 bg-primary-300 rounded-full left-0 top-1/2 transform -translate-y-1/2 -translate-x-full"
          variants={sparkleVariants}
          animate={phase}
        />
        <motion.div
          className="absolute w-4 h-4 bg-primary-300 rounded-full right-0 top-1/2 transform -translate-y-1/2 translate-x-full"
          variants={sparkleVariants}
          animate={phase}
        />
      </div>
      <p
        className="mt-8 text-4xl font-heading text-neutral-800 text-center px-4"
        aria-live="polite"
      >
        {phaseInstructions[phase]}
      </p>
      <div className="w-64 h-2 bg-neutral-200 rounded-full overflow-hidden mt-4">
        <motion.div
          key={phase}
          className="h-full bg-gradient-to-r from-accent-400 to-accent-600"
          initial={{ width: 0 }}
          animate={{ width: phase === 'start' ? 0 : '100%' }}
          transition={{ duration: 4, ease: 'linear' }}
        />
      </div>
      <div className="flex space-x-2 mt-4">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className={`w-4 h-4 rounded-full ${index < activeCount ? 'bg-accent-500' : 'bg-neutral-300'}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-4 text-neutral-800 font-body text-xl"
        >
          {message}
        </motion.p>
      )}
      <div className="mt-8 flex space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startExercise}
          className="px-6 py-3 bg-accent-500 text-white rounded-lg shadow-soft focus:outline-none focus:ring-2 focus:ring-accent-600"
        >
          {phase === 'start' ? 'Start' : isPaused ? 'Resume' : 'Pause'}
        </motion.button>
        {phase !== 'start' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setPhase('start');
              setIsPaused(true);
              setCycle(0);
              setMessage('');
            }}
            className="px-6 py-3 bg-neutral-500 text-white rounded-lg shadow-soft focus:outline-none focus:ring-2 focus:ring-neutral-600"
          >
            Reset
          </motion.button>
        )}
      </div>
      <p className="mt-4 text-neutral-600 font-body">Cycles completed: {cycle}</p>
    </motion.div>
  );
}

export default Breathing;
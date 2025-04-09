import { motion } from 'framer-motion';
import { useState } from 'react';

function Visualisation() {
  const [step, setStep] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const steps = [
    "Close your eyes and take a deep breath.",
    "Imagine yourself on a beautiful beach.",
    "Feel the warm sand between your toes.",
    "Hear the gentle waves lapping at the shore.",
    "Smell the fresh, salty air.",
    "See the clear blue sky and the sun shining down.",
    "Stay in this peaceful place for a few moments."
  ];

  const startExercise = () => {
    setIsStarted(true);
    setStep(0);
    setCompleted(false);
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setCompleted(true);
    }
  };

  const resetExercise = () => {
    setIsStarted(false);
    setStep(0);
    setCompleted(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-200 to-secondary-200 relative"
    >
      <svg viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full">
        <motion.path
          fill="rgba(56, 189, 248, 0.3)"
          d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,176C672,160,768,160,864,176C960,192,1056,224,1152,224C1248,224,1344,192,1392,176L1440,160L1440,320L0,320Z"
          animate={{ x: [-1440, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
      {!isStarted ? (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center relative z-10"
        >
          <h1 className="text-4xl font-heading text-neutral-800 mb-4">Guided Visualization</h1>
          <p className="text-neutral-600 font-body mb-8">Imagine a peaceful beach to calm your mind.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startExercise}
            className="px-6 py-3 bg-accent-500 text-white rounded-lg shadow-soft focus:outline-none focus:ring-2 focus:ring-accent-600"
          >
            Start
          </motion.button>
        </motion.div>
      ) : !completed ? (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center relative z-10"
        >
          <h2 className="text-3xl font-heading text-neutral-800 mb-4">
            Step {step + 1}: {steps[step]}
          </h2>
          <p className="text-neutral-600 font-body mb-6">Take your time, then proceed when ready.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextStep}
            className="px-6 py-3 bg-accent-500 text-white rounded-lg shadow-soft focus:outline-none focus:ring-2 focus:ring-accent-600"
          >
            Next
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center relative z-10"
        >
          <h2 className="text-3xl font-heading text-neutral-800 mb-4">Well Done!</h2>
          <p className="text-neutral-600 font-body mb-6">You've completed the visualization exercise. Feel the calm.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetExercise}
            className="px-6 py-3 bg-accent-500 text-white rounded-lg shadow-soft focus:outline-none focus:ring-2 focus:ring-accent-600"
          >
            Restart
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Visualisation;
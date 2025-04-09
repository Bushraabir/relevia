import { motion } from 'framer-motion';
import { useState } from 'react';

function Relaxation() {
  const [step, setStep] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const steps = [
    {
      instruction: 'Tense your feet by curling your toes for 5 seconds, then release.',
    },
    {
      instruction: 'Tighten your leg muscles for 5 seconds, then relax.',
    },
    {
      instruction: 'Clench your fists and tense your arms for 5 seconds, then let go.',
    },
    {
      instruction: 'Raise your shoulders towards your ears, hold for 5 seconds, then drop them.',
    },
    {
      instruction: 'Scrunch your face tightly for 5 seconds, then relax.',
    },
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
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-secondary-200 to-accent-200"
    >
      {!isStarted ? (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-heading text-neutral-800 mb-4">Progressive Relaxation</h1>
          <p className="text-neutral-600 font-body mb-8">Release tension by tensing and relaxing muscle groups.</p>
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
          className="text-center"
        >
          <h2 className="text-3xl font-heading text-neutral-800 mb-4">
            Step {step + 1} of {steps.length}: {steps[step].instruction}
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
          className="text-center"
        >
          <h2 className="text-3xl font-heading text-neutral-800 mb-4">Well Done!</h2>
          <p className="text-neutral-600 font-body mb-6">You've completed the relaxation exercise. Feel the calm.</p>
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

export default Relaxation;
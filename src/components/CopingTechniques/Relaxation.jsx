import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

function Relaxation() {
  const [step, setStep] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const steps = [
    { instruction: 'Curl your toes gently for 5 seconds, then release slowly.' },
    { instruction: 'Tighten your leg muscles for 5 seconds, then let go softly.' },
    { instruction: 'Clench your fists and tense your arms for 5 seconds, then relax.' },
    { instruction: 'Raise your shoulders towards your ears, hold for 5 seconds, then drop them gently.' },
    { instruction: 'Scrunch your face lightly for 5 seconds, then relax your features.' },
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
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 p-4"
    >
      <AnimatePresence mode="wait">
        {!isStarted ? (
          <motion.div
            key="start"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Calm Your Mind
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-md">
              Let’s ease your panic with gentle steps. You’re safe here.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={startExercise}
              className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Begin
            </motion.button>
          </motion.div>
        ) : !completed ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Step {step + 1} of {steps.length}: {steps[step].instruction}
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Take your time—breathe slowly and move forward when you’re ready.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={nextStep}
              className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Next
            </motion.button>
            <div className="flex justify-center space-x-2 mt-6">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${index <= step ? 'bg-green-500' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              You’re Amazing!
            </h2>
            <p className="text-gray-600 text-lg mb-6 max-w-md">
              You’ve made it through. Feel the calm wash over you.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={resetExercise}
              className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Restart
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Relaxation;
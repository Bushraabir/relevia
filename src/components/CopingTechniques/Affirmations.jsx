import React, { useState } from 'react';
import { motion } from 'framer-motion';

const affirmations = [
  "I am safe and in control.",
  "This feeling will pass.",
  "I am strong and capable.",
  "I am surrounded by love and support.",
  "I trust myself to handle this.",
  "I am calm and at peace.",
  "I am worthy of happiness.",
  "I am resilient and can overcome challenges.",
  "I am in charge of my thoughts and feelings.",
  "I am grateful for my strength and courage."
];

const Affirmations = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[0]);

  const handleNextAffirmation = () => {
    const currentIndex = affirmations.indexOf(currentAffirmation);
    const nextIndex = (currentIndex + 1) % affirmations.length;
    setCurrentAffirmation(affirmations[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-primary-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-2xl"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl font-heading text-primary-800 mb-6 text-center"
        >
          Affirmations for Calm
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="bg-white rounded-lg shadow-soft p-6"
        >
          <p className="text-lg text-neutral-700 mb-4">{currentAffirmation}</p>
          <button
            onClick={handleNextAffirmation}
            className="px-4 py-2 bg-secondary-500 text-white rounded hover:bg-secondary-600"
          >
            Next Affirmation
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Affirmations;
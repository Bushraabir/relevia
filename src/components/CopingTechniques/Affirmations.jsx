import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';
import { useSwipeable } from 'react-swipeable';

const affirmations = [
  "I am safe and capable! I can handle anything that comes my way with grace and confidence. I'm stronger than I think!",
  "This too shall pass! I've conquered challenges before, and I'll conquer this one too. Each victory makes me stronger and more at peace.",
  "I am incredibly strong and capable! My inner strength is a mighty force, guiding me through every moment and helping me overcome any obstacle.",
  "I am surrounded by so much love and support! There are wonderful people who care about me deeply, always ready to lift me up when I need them.",
  "I totally trust myself to handle this! I've got the skills, resilience, and wisdom to navigate any moment with courage and calm.",
  "I am calm and at peace! With each breath, I feel more relaxed, centered, and connected to the beautiful warmth within me.",
  "I am so worthy of happiness! I deserve to feel joy, contentment, and the gentle embrace of positivity in every amazing part of my life.",
  "I am incredibly resilient and can overcome any challenge! Every difficulty I face makes me stronger, shaping me into an even more powerful and amazing version of myself.",
  "I am in charge of my thoughts and feelings! I choose to focus on positivity, hope, and the comforting light that guides me forward to wonderful things.",
  "I am so grateful for my strength and courage! I appreciate the amazing progress I’ve made and the warm, reliable, and fantastic person I am becoming every day."
];

const Affirmations = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [speechSupported, setSpeechSupported] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);

  
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSupported(true);
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const englishVoices = voices.filter(voice => voice.lang.startsWith('en'));
        const nonLocalEnglishVoices = englishVoices.filter(voice => !voice.localService);

        let preferredVoice = null;
        if (nonLocalEnglishVoices.length > 0) {
          const femaleVoices = nonLocalEnglishVoices.filter(voice =>
            voice.name.toLowerCase().includes('female')
          );
          preferredVoice = femaleVoices.length > 0 ? femaleVoices[0] : nonLocalEnglishVoices[0];
        } else if (englishVoices.length > 0) {
          preferredVoice = englishVoices[0];
        }
        setSelectedVoice(preferredVoice);
      };

    
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices(); // Initial load
    }
  }, []);

  const handleNext = useCallback(() => {
    window.speechSynthesis.cancel();
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % affirmations.length);
  }, []);

  const handlePrev = useCallback(() => {
    window.speechSynthesis.cancel();
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + affirmations.length) % affirmations.length);
  }, []);


  const speakAffirmation = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(affirmations[currentIndex]);

    utterance.rate = 0.8;   // Slower speech for calmness
    utterance.pitch = 0.8;  // Lower pitch for a deeper, relaxing tone
    utterance.volume = 0.8; // Softer volume for a gentle sound

   
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    window.speechSynthesis.speak(utterance);
  };


  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, 
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);


  const variants = {
    enter: (direction) => ({
      x: direction === 'next' ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction === 'next' ? -100 : 100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center p-4">
      <motion.div
        {...handlers}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
       
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl font-heading text-primary-800 mb-6 text-center"
        >
          Dear, always remember...
        </motion.h1>

   
        <motion.div
          className="bg-secondary rounded-lg shadow-soft p-6"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
       
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="text-xl text-neutral-700 mb-4 text-center leading-relaxed"
            >
              {affirmations[currentIndex]}
            </motion.p>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-4">
            {speechSupported && (
              <button
                onClick={speakAffirmation}
                aria-label="Read affirmation aloud"
                className="p-2 bg-secondary-500 text-white rounded hover:bg-secondary-600"
              >
                <SpeakerWaveIcon className="w-6 h-6" />
              </button>
            )}
            <button
              onClick={handlePrev}
              aria-label="Previous Affirmation"
              className="p-2 bg-secondary-500 text-white rounded hover:bg-secondary-600"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Affirmation"
              className="p-2 bg-secondary-500 text-white rounded hover:bg-secondary-600"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Affirmations;
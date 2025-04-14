import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

function Mindfulness() {
  const [step, setStep] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [breathing, setBreathing] = useState(false);

  const steps = [
    { instruction: 'Gently observe 5 things you can see around you.', placeholder: 'e.g., a cozy blanket, a warm light, a friendly face...', icon: '👀', prompt: 'Take a slow, comforting breath and name them softly in your mind.' },
    { instruction: 'Feel 4 things you can touch nearby.', placeholder: 'e.g., a soft pillow, a smooth surface, your own hand...', icon: '✋', prompt: 'Focus on their gentle texture as you breathe deeply and calmly.' },
    { instruction: 'Listen for 3 soothing sounds in your environment.', placeholder: 'e.g., a gentle breeze, soft music, your steady breath...', icon: '👂', prompt: 'Listen closely while exhaling slowly, letting the sounds comfort you.' },
    { instruction: 'Notice 2 calming scents you can detect.', placeholder: 'e.g., a warm cup of tea, fresh laundry, a scented candle...', icon: '👃', prompt: 'Inhale gently and let the aromas wrap you in comfort.' },
    { instruction: 'Focus on 1 comforting taste in your mouth or memory.', placeholder: 'e.g., a sip of water, a piece of chocolate, a favorite meal...', icon: '👅', prompt: 'Savor it as you relax your body and feel the calm.' },
  ];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const circle1X = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const circle1Y = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);
  const circle2X = useTransform(mouseX, [0, window.innerWidth], [15, -15]);
  const circle2Y = useTransform(mouseY, [0, window.innerHeight], [15, -15]);
  const circle3X = useTransform(mouseX, [0, window.innerWidth], [-10, 10]);
  const circle3Y = useTransform(mouseY, [0, window.innerHeight], [10, -10]);
  const circle4X = useTransform(mouseX, [0, window.innerWidth], [20, -20]);
  const circle4Y = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);
  const circle5X = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);
  const circle5Y = useTransform(mouseY, [0, window.innerHeight], [-15, 15]);
  const circle6X = useTransform(mouseX, [0, window.innerWidth], [10, -10]);
  const circle6Y = useTransform(mouseY, [0, window.innerHeight], [10, -10]);
  const circle7X = useTransform(mouseX, [0, window.innerWidth], [-5, 5]);
  const circle7Y = useTransform(mouseY, [0, window.innerHeight], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const startExercise = () => {
    setIsStarted(true);
    setStep(0);
    setCompleted(false);
    setBreathing(true);
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setCompleted(true);
      setBreathing(false);
    }
  };

  const resetExercise = () => {
    setIsStarted(false);
    setStep(0);
    setCompleted(false);
    setBreathing(false);
  };

  useEffect(() => {
    if (breathing) {
      const timer = setTimeout(() => setBreathing(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [step, breathing]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 2, ease: 'easeInOut' } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -10 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const buttonVariants = {
    initial: { scale: 1, boxShadow: '0 0 10px rgba(34, 211, 238, 0.4)', backgroundColor: 'rgba(34, 211, 238, 0.9)' },
    hover: { scale: 1.08, boxShadow: '0 0 20px rgba(34, 211, 238, 0.7)', backgroundColor: 'rgba(34, 211, 238, 1)', transition: { duration: 0.4, ease: 'easeOut' } },
    tap: { scale: 0.92, transition: { duration: 0.2 } },
  };

  const iconVariants = {
    hidden: { scale: 0.7, opacity: 0, rotate: 15 },
    visible: { scale: 1, opacity: 1, rotate: 0, transition: { duration: 0.7, ease: 'easeOut', type: 'spring', stiffness: 100 } },
  };

  const breathVariants = {
    inhale: { scale: 1.2, opacity: 0.8, transition: { duration: 2, ease: 'easeIn' } },
    exhale: { scale: 1, opacity: 0.3, transition: { duration: 2, ease: 'easeOut' } },
  };

  const progressVariants = {
    active: { scale: 1.2, backgroundColor: 'rgba(34, 211, 238, 1)', transition: { duration: 0.5 } },
    inactive: { scale: 1, backgroundColor: 'rgba(209, 213, 219, 0.8)', transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-cyan-50 via-blue-100 to-teal-50 p-6 sm:p-8 lg:p-12 relative overflow-hidden"
    >
      <motion.div
        className="absolute w-96 h-96 bg-cyan-100 rounded-full opacity-15 top-0 left-0 filter blur-sm"
        animate={{ x: ['-15%', '15%'], y: ['-15%', '15%'], opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        style={{ x: circle1X, y: circle1Y }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-teal-100 rounded-full opacity-20 bottom-0 right-0 filter blur-sm"
        animate={{ x: ['15%', '-15%'], y: ['15%', '-15%'], opacity: [0.15, 0.25, 0.15], scale: [1, 1.05, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ x: circle2X, y: circle2Y }}
      />
      <motion.div
        className="absolute w-56 h-56 bg-blue-50 rounded-full opacity-25 top-1/2 left-1/3 filter blur-sm"
        animate={{ x: ['-10%', '10%'], y: ['-10%', '10%'], opacity: [0.2, 0.3, 0.2], rotate: [0, 5, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{ x: circle3X, y: circle3Y }}
      />
      <motion.div
        className="absolute w-64 h-64 bg-cyan-50 rounded-full opacity-20 bottom-1/4 right-1/4 filter blur-sm"
        animate={{ x: ['-20%', '20%'], y: ['-20%', '20%'], opacity: [0.1, 0.2, 0.1], scale: [1, 1.15, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{ x: circle4X, y: circle4Y }}
      />
      <motion.div
        className="absolute w-48 h-48 bg-teal-50 rounded-full filter blur-sm"
        style={{ top: '10%', right: '10%', x: circle5X, y: circle5Y }}
        animate={{ x: ['10%', '-10%'], y: ['10%', '-10%'], opacity: [0.1, 0.15, 0.1], scale: [1, 1.05, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-64 h-64 bg-blue-100 rounded-full filter blur-sm"
        style={{ bottom: '20%', left: '20%', x: circle6X, y: circle6Y }}
        animate={{ x: ['-15%', '15%'], y: ['-15%', '15%'], opacity: [0.15, 0.2, 0.15], scale: [1, 1.1, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-40 h-40 bg-cyan-50 rounded-full filter blur-sm"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', x: circle7X, y: circle7Y }}
        animate={{ scale: [1, 1.02, 1], opacity: [0.05, 0.07, 0.05] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      {!isStarted ? (
        <motion.div className="text-center z-10 max-w-lg">
          <motion.h1
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-800 mb-6 tracking-wide"
          >
            Find Your Calm
          </motion.h1>
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="text-gray-700 text-lg sm:text-xl lg:text-2xl mb-10 leading-relaxed"
          >
            Let’s gently guide you back to peace with a warm, friendly exercise. You’re safe here.
          </motion.p>
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={startExercise}
            className="px-8 py-4 text-white rounded-full shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-200 text-lg sm:text-xl font-medium"
          >
            Begin Your Journey
          </motion.button>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.95 }}
              transition={{ duration: 0.6, ease: 'easeInOut', type: 'spring', stiffness: 80 }}
              className="text-center z-10 p-6 sm:p-8 lg:p-12 max-w-xl"
            >
              <motion.div
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                className="text-6xl sm:text-7xl lg:text-8xl mb-8 drop-shadow-md"
              >
                {steps[step].icon}
              </motion.div>
              <motion.h2
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 mb-4 leading-tight"
              >
                {steps[step].instruction}
              </motion.h2>
              <motion.p
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="text-gray-600 text-lg sm:text-xl lg:text-2xl mb-6"
              >
                {steps[step].placeholder}
              </motion.p>
              <motion.p
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className="text-gray-500 text-base sm:text-lg lg:text-xl mb-8 italic"
              >
                {steps[step].prompt}
              </motion.p>
              {breathing && (
                <motion.div
                  className="w-24 h-24 bg-cyan-200 rounded-full mx-auto mb-6 opacity-30"
                  variants={breathVariants}
                  initial="exhale"
                  animate={['inhale', 'exhale']}
                  transition={{ repeat: 1, duration: 4 }}
                />
              )}
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={nextStep}
                className="px-8 py-4 text-white rounded-full shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-200 text-lg sm:text-xl font-medium"
              >
                Continue
              </motion.button>
              <div className="flex justify-center space-x-3 mt-8">
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    variants={progressVariants}
                    animate={index <= step ? 'active' : 'inactive'}
                    className="w-4 h-4 rounded-full shadow-sm"
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', type: 'spring', stiffness: 90 }}
              className="text-center z-10 p-6 sm:p-8 lg:p-12 max-w-lg"
            >
              <motion.h2
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-800 mb-6 tracking-wide"
              >
                You’re Amazing!
              </motion.h2>
              <motion.p
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="text-gray-700 text-lg sm:text-xl lg:text-2xl mb-10 leading-relaxed"
              >
                You’ve done something wonderful for yourself. Take a deep breath and feel the warmth of this moment. You’re safe, and you’re stronger than you know.
              </motion.p>
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={resetExercise}
                className="px-8 py-4 text-white rounded-full shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-200 text-lg sm:text-xl font-medium"
              >
                Start Over
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

export default Mindfulness;
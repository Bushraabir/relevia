import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaLungs, FaEye, FaHandSparkles, FaImages, FaSmile, FaRunning, FaPen, FaHeart, FaShieldAlt } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    },
  },
  hover: {
    y: -4,
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    },
  },
};

const iconVariants = {
  show: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const techniques = [
  {
    id: 'breathing',
    title: 'Deep Breathing',
    description: 'Gentle 4-7-8 breathing to calm your nervous system',
    icon: <FaLungs className="text-4xl text-primary-500" />,
    color: 'primary',
    priority: true,
  },
  {
    id: 'mindfulness',
    title: 'Grounding',
    description: '5-4-3-2-1 technique to reconnect with the present',
    icon: <FaEye className="text-4xl text-secondary-500" />,
    color: 'secondary',
    priority: true,
  },
  {
    id: 'relaxation',
    title: 'Progressive Relaxation',
    description: 'Release physical tension through gentle muscle relaxation',
    icon: <FaHandSparkles className="text-4xl text-accent-500" />,
    color: 'accent',
  },
  {
    id: 'visualization',
    title: 'Safe Place Visualization',
    description: 'Create a peaceful mental sanctuary',
    icon: <FaImages className="text-4xl text-primary-400" />,
    color: 'primary',
  },
  {
    id: 'affirmations',
    title: 'Calming Affirmations',
    description: 'Gentle self-compassion phrases for inner peace',
    icon: <FaSmile className="text-4xl text-secondary-400" />,
    color: 'secondary',
  },
  {
    id: 'activity',
    title: 'Gentle Movement',
    description: 'Light stretching and movement to release tension',
    icon: <FaRunning className="text-4xl text-accent-400" />,
    color: 'accent',
  },
  {
    id: 'journaling',
    title: 'Mindful Journaling',
    description: 'Express and process your thoughts with kindness',
    icon: <FaPen className="text-4xl text-primary-300" />,
    color: 'primary',
  },
];

const breathingSteps = [
  { phase: 'Breathe In', duration: 4, description: 'Slowly through your nose' },
  { phase: 'Hold', duration: 7, description: 'Keep the air in your lungs' },
  { phase: 'Breathe Out', duration: 8, description: 'Slowly through your mouth' }
];

const groundingItems = [
  '5 things you can SEE around you',
  '4 things you can TOUCH',
  '3 things you can HEAR',
  '2 things you can SMELL',
  '1 thing you can TASTE'
];

const EmergencyButton = ({ children, onClick, className = "" }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2
      }}
      className="relative"
    >
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative bg-gradient-to-br from-primary-400 to-primary-600 text-white px-8 py-6 rounded-2xl shadow-lg overflow-hidden w-full ${className}`}
      >
        <motion.div
          className="absolute inset-0 bg-white/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="relative z-10">
          {children}
        </div>
      </motion.button>
    </motion.div>
  );
};

const CalmButton = ({ onClick, text, variant = "primary" }) => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    secondary: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    accent: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
  };

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${variants[variant]} text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl`}
    >
      {text}
    </motion.button>
  );
};

const BreathingExercise = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(breathingSteps[0].duration);
  const [isRunning, setIsRunning] = useState(false);

  React.useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      const nextStep = (currentStep + 1) % breathingSteps.length;
      setCurrentStep(nextStep);
      setTimeLeft(breathingSteps[nextStep].duration);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentStep]);

  const startExercise = () => setIsRunning(true);
  const pauseExercise = () => setIsRunning(false);

  const currentPhase = breathingSteps[currentStep];
  const progress = ((currentPhase.duration - timeLeft) / currentPhase.duration) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Breathing Exercise</h2>
        
        <motion.div
          animate={{
            scale: currentStep === 0 ? [1, 1.3, 1] : currentStep === 1 ? 1.3 : [1.3, 1, 1]
          }}
          transition={{ duration: 1, repeat: isRunning ? Infinity : 0 }}
          className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center"
        >
          <FaLungs className="text-white text-4xl" />
        </motion.div>

        <div className="mb-6">
          <h3 className="text-xl font-medium text-gray-700 mb-2">{currentPhase.phase}</h3>
          <p className="text-gray-600 mb-2">{currentPhase.description}</p>
          <div className="text-3xl font-bold text-blue-600">{timeLeft}s</div>
        </div>

        <div className="mb-6">
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          {!isRunning ? (
            <button
              onClick={startExercise}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Start
            </button>
          ) : (
            <button
              onClick={pauseExercise}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Pause
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const GroundingExercise = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(['', '', '', '', '']);

  const handleNext = () => {
    if (currentStep < groundingItems.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full"
      >
        <div className="text-center mb-6">
          <FaEye className="text-4xl text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Grounding Exercise</h2>
          <p className="text-gray-600">5-4-3-2-1 Technique</p>
        </div>

        <div className="mb-6">
          <div className="bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / groundingItems.length) * 100}%` }}
            />
          </div>
          
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Name {groundingItems[currentStep]}
          </h3>
          
          <textarea
            value={answers[currentStep]}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[currentStep] = e.target.value;
              setAnswers(newAnswers);
            }}
            placeholder="Take your time and notice..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3 justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {currentStep < groundingItems.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onClose}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Complete
            </button>
          )}
          
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

function Coping() {
  const [activeExercise, setActiveExercise] = useState(null);
  const [selectedTechnique, setSelectedTechnique] = useState(null);

  const priorityTechniques = techniques.filter(t => t.priority);
  const otherTechniques = techniques.filter(t => !t.priority);

  const handleTechniqueClick = (technique) => {
    setSelectedTechnique(technique);
    if (technique.id === 'breathing') {
      setActiveExercise('breathing');
    } else if (technique.id === 'mindfulness') {
      setActiveExercise('grounding');
    }
  };

  const closeExercise = () => {
    setActiveExercise(null);
    setSelectedTechnique(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 pt-20 pb-16 relative overflow-hidden">
      {/* Gentle floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'bg-blue-100/40' : 
              i % 3 === 1 ? 'bg-green-100/40' : 'bg-purple-100/40'
            }`}
            style={{
              width: `${60 + Math.random() * 40}px`,
              height: `${60 + Math.random() * 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center mb-6">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaHeart className="text-5xl text-red-400 mr-4" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              You're Safe Here
            </h1>
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            >
              <FaShieldAlt className="text-5xl text-blue-400 ml-4" />
            </motion.div>
          </div>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Take a moment to breathe. These gentle techniques are here to help you find calm and peace. 
            You've gotten through difficult moments before, and you'll get through this one too.
          </p>
          
          {/* Emergency Help Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-12 border border-blue-200/50 shadow-lg"
          >
            <h2 className="text-xl text-gray-700 mb-4 font-semibold">
              Need immediate help?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EmergencyButton onClick={() => setActiveExercise('breathing')}>
                <div className="text-center">
                  <FaLungs className="text-3xl mb-2 mx-auto" />
                  <span className="font-medium text-lg">Start Breathing</span>
                  <p className="text-sm opacity-90">Begin in 3 seconds</p>
                </div>
              </EmergencyButton>
              <EmergencyButton onClick={() => setActiveExercise('grounding')}>
                <div className="text-center">
                  <FaEye className="text-3xl mb-2 mx-auto" />
                  <span className="font-medium text-lg">Ground Yourself</span>
                  <p className="text-sm opacity-90">5-4-3-2-1 technique</p>
                </div>
              </EmergencyButton>
            </div>
          </motion.div>
        </motion.div>

        {/* Priority Techniques */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-gray-700 mb-8 text-center font-semibold"
          >
            Quick Relief Techniques
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {priorityTechniques.map((technique, index) => (
              <motion.button
                key={technique.id}
                onClick={() => handleTechniqueClick(technique)}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white/60 backdrop-blur-sm border border-white/50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group text-left w-full"
              >
                <motion.div 
                  variants={iconVariants}
                  className="flex items-center mb-6"
                >
                  <div className="p-3 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg mr-4">
                    {technique.icon}
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-800 mb-1 group-hover:text-blue-600 transition-colors font-semibold">
                      {technique.title}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                      QUICK RELIEF
                    </span>
                  </div>
                </motion.div>
                <p className="text-gray-600 leading-relaxed">
                  {technique.description}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Comfort Message */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-200/50 to-green-200/50 rounded-full flex items-center justify-center"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-8xl"
                  >
                    🌸
                  </motion.div>
                </motion.div>
              </div>
              <div className="flex-1 text-left">
                <h2 className="text-3xl text-gray-800 mb-4 font-semibold">
                  Remember: This Will Pass
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Panic attacks are temporary. Your feelings are valid, and it's okay to take things one breath at a time. 
                  You are stronger than you know, and help is always available.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0)",
                        "0 0 0 8px rgba(59, 130, 246, 0.1)",
                        "0 0 0 0 rgba(59, 130, 246, 0)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="rounded-xl"
                  >
                    <button
                      onClick={() => setActiveExercise('breathing')}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Start Breathing Exercise
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Additional Techniques */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="text-2xl text-gray-700 mb-8 text-center font-semibold"
          >
            Additional Calming Techniques
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherTechniques.map((technique, index) => (
              <motion.button
                key={technique.id}
                onClick={() => handleTechniqueClick(technique)}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white/50 backdrop-blur-sm border border-white/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group h-full text-left w-full"
              >
                <motion.div 
                  variants={iconVariants}
                  className="mb-4"
                >
                  <div className="p-3 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg w-fit">
                    {technique.icon}
                  </div>
                </motion.div>
                <h3 className="text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors font-semibold">
                  {technique.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {technique.description}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Support Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-white/60 to-gray-100/40 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
            <h2 className="text-2xl text-gray-800 mb-4 font-semibold">
              You're Not Alone
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              If you need additional support or resources, remember that seeking help is a sign of strength. 
              There are people who care and want to help you through this.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalmButton onClick={() => alert('Resources page would open')} text="View Resources" variant="secondary" />
              <CalmButton onClick={() => alert('Support contact would open')} text="Get Support" variant="accent" />
            </div>
          </div>
        </motion.section>
      </div>

      {/* Exercise Modals */}
      {activeExercise === 'breathing' && <BreathingExercise onClose={closeExercise} />}
      {activeExercise === 'grounding' && <GroundingExercise onClose={closeExercise} />}
    </div>
  );
}

export default Coping;
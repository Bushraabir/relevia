import { motion } from 'framer-motion';
import { useState } from 'react';
import React from 'react';
import { FaLungs, FaEye, FaHeart, FaShieldAlt, FaBrain, FaStethoscope, FaBookOpen, FaLightbulb, FaClock, FaCheckCircle, FaUsers, FaDna, FaExclamationTriangle, FaLeaf, FaPills, FaUserMd, FaSun } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    },
  },
  hover: {
    y: -6,
    scale: 1.02,
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    },
  },
};

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

const panicCauses = [
  {
    icon: <FaDna className="text-3xl text-primary-500" />,
    title: "Genetic Factors",
    description: "If anxiety runs in your family, you might be more sensitive to stress. This doesn't mean you're destined to have panic attacks - it just means your nervous system might be more reactive.",
    color: "primary"
  },
  {
    icon: <FaExclamationTriangle className="text-3xl text-secondary-500" />,
    title: "Stress and Life Changes",
    description: "Big life events like moving, job changes, or loss can overwhelm our coping systems. Your mind and body are trying to process a lot - panic can be a sign you need extra support.",
    color: "secondary"
  },
  {
    icon: <FaStethoscope className="text-3xl text-accent-500" />,
    title: "Health Conditions",
    description: "Sometimes our bodies send panic signals when dealing with thyroid issues, heart conditions, or breathing problems. It's always worth checking with a doctor to rule out physical causes.",
    color: "accent"
  },
  {
    icon: <FaBrain className="text-3xl text-primary-400" />,
    title: "Brain Chemistry",
    description: "Your brain's chemical messengers (like serotonin) help regulate mood. When they're out of balance, anxiety can increase. The good news? This is very treatable.",
    color: "primary"
  },
  {
    icon: <FaPills className="text-3xl text-secondary-400" />,
    title: "Substances & Medications",
    description: "Caffeine, alcohol, certain medications, or withdrawal can trigger panic-like symptoms. Even everyday substances can affect sensitive nervous systems.",
    color: "secondary"
  }
];

const panicSymptoms = [
  { symptom: "Racing heart or palpitations", description: "Your heart is doing its job - pumping blood to help you cope" },
  { symptom: "Sweating or sudden chills", description: "Your body's natural cooling or warming system responding to stress" },
  { symptom: "Difficulty breathing or feeling suffocated", description: "Shallow breathing is common during anxiety - your lungs are actually fine" },
  { symptom: "Dizziness or feeling lightheaded", description: "Often caused by breathing changes - you're safe, even if you feel unsteady" },
  { symptom: "Chest tightness or discomfort", description: "Muscle tension from stress - not your heart, even though it feels scary" },
  { symptom: "Nausea or stomach upset", description: "Your digestive system slows during stress - this is temporary" },
  { symptom: "Tingling in hands, feet, or face", description: "Changes in blood flow during anxiety - uncomfortable but harmless" },
  { symptom: "Feeling like you can't swallow", description: "Throat muscles can tense up - sip water slowly if you can" },
  { symptom: "Fear of losing control or 'going crazy'", description: "This feeling is the panic talking - you're still you, and you're safe" },
  { symptom: "Overwhelming fear of dying", description: "Panic tricks your brain into thinking there's danger - but you're going to be okay" }
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
        className={`relative bg-gradient-to-br from-primary-400 to-primary-600 text-white px-8 py-6 rounded-2xl shadow-soft overflow-hidden w-full ${className}`}
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
        <h2 className="text-2xl font-heading font-semibold text-neutral-800 mb-6">Breathing Exercise</h2>
        
        <motion.div
          animate={{
            scale: currentStep === 0 ? [1, 1.3, 1] : currentStep === 1 ? 1.3 : [1.3, 1, 1]
          }}
          transition={{ duration: 1, repeat: isRunning ? Infinity : 0 }}
          className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-6 flex items-center justify-center animate-gentlePulse"
        >
          <FaLungs className="text-white text-4xl" />
        </motion.div>

        <div className="mb-6">
          <h3 className="text-xl font-medium text-neutral-700 mb-2">{currentPhase.phase}</h3>
          <p className="text-neutral-600 mb-2">{currentPhase.description}</p>
          <div className="text-3xl font-bold text-primary-600">{timeLeft}s</div>
        </div>

        <div className="mb-6">
          <div className="bg-neutral-200 rounded-full h-3">
            <div 
              className="bg-primary-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          {!isRunning ? (
            <button
              onClick={startExercise}
              className="bg-primary-500 text-white px-6 py-3 rounded-xl hover:bg-primary-600 transition-colors shadow-soft"
            >
              Start
            </button>
          ) : (
            <button
              onClick={pauseExercise}
              className="bg-accent-500 text-white px-6 py-3 rounded-xl hover:bg-accent-600 transition-colors shadow-soft"
            >
              Pause
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-neutral-500 text-white px-6 py-3 rounded-xl hover:bg-neutral-600 transition-colors shadow-soft"
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
          <FaEye className="text-4xl text-secondary-500 mx-auto mb-4" />
          <h2 className="text-2xl font-heading font-semibold text-neutral-800">Grounding Exercise</h2>
          <p className="text-neutral-600">5-4-3-2-1 Technique</p>
        </div>

        <div className="mb-6">
          <div className="bg-neutral-200 rounded-full h-3 mb-4">
            <div 
              className="bg-secondary-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / groundingItems.length) * 100}%` }}
            />
          </div>
          
          <h3 className="text-lg font-medium text-neutral-700 mb-3">
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
            className="w-full p-4 border-2 border-neutral-200 rounded-xl resize-none h-24 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3 justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="bg-neutral-500 text-white px-4 py-2 rounded-xl hover:bg-neutral-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-soft"
          >
            Previous
          </button>
          
          {currentStep < groundingItems.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-secondary-500 text-white px-6 py-2 rounded-xl hover:bg-secondary-600 transition-colors shadow-soft"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onClose}
              className="bg-secondary-600 text-white px-6 py-2 rounded-xl hover:bg-secondary-700 transition-colors shadow-soft"
            >
              Complete
            </button>
          )}
          
          <button
            onClick={onClose}
            className="bg-neutral-500 text-white px-4 py-2 rounded-xl hover:bg-neutral-600 transition-colors shadow-soft"
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

  const closeExercise = () => {
    setActiveExercise(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50 pt-20 pb-16 relative overflow-hidden">
      {/* Gentle floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'bg-primary-100/30' : 
              i % 3 === 1 ? 'bg-secondary-100/30' : 'bg-accent-100/30'
            }`}
            style={{
              width: `${40 + Math.random() * 60}px`,
              height: `${40 + Math.random() * 60}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
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
          <div className="flex justify-center items-center mb-8">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaHeart className="text-6xl text-red-400 mr-6" />
            </motion.div>
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-neutral-800 leading-tight mb-2">
                Understanding Panic Attacks
              </h1>
              <p className="text-xl text-primary-600 font-medium">You're not alone in this journey</p>
            </div>
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              <FaShieldAlt className="text-6xl text-primary-400 ml-6" />
            </motion.div>
          </div>
          
          <p className="text-lg text-neutral-600 max-w-4xl mx-auto leading-relaxed mb-8 font-body">
            If you're here, you might be experiencing panic attacks or supporting someone who is. 
            First, take a deep breath - you're safe, you're going to be okay, and what you're going through is more common than you might think. 
            Let's explore what panic attacks are, why they happen, and most importantly, how you can feel better.
          </p>
          
          {/* Quick Relief Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-12 border-2 border-primary-200/50 shadow-soft"
          >
            <h2 className="text-xl text-neutral-700 mb-4 font-heading font-semibold flex items-center justify-center">
              <FaClock className="mr-3 text-primary-500" />
              Having a panic attack right now?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EmergencyButton onClick={() => setActiveExercise('breathing')}>
                <div className="text-center">
                  <FaLungs className="text-3xl mb-2 mx-auto" />
                  <span className="font-medium text-lg">Start Breathing</span>
                  <p className="text-sm opacity-90">4-7-8 technique</p>
                </div>
              </EmergencyButton>
              <EmergencyButton onClick={() => setActiveExercise('grounding')}>
                <div className="text-center">
                  <FaEye className="text-3xl mb-2 mx-auto" />
                  <span className="font-medium text-lg">Ground Yourself</span>
                  <p className="text-sm opacity-90">5-4-3-2-1 method</p>
                </div>
              </EmergencyButton>
            </div>
          </motion.div>
        </motion.div>

        {/* What is a Panic Attack */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-white/80 to-neutral-100/60 backdrop-blur-sm rounded-3xl p-10 border-2 border-white/50 shadow-soft">
            <div className="text-center mb-8">
              <FaBrain className="text-6xl text-primary-500 mx-auto mb-6" />
              <h2 className="text-4xl font-heading font-bold text-neutral-800 mb-6">
                What Exactly is a Panic Attack?
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed font-body text-neutral-700">
              <p className="text-xl text-center text-primary-600 font-medium mb-8">
                Think of a panic attack as your body's alarm system going off when there's no real emergency.
              </p>
              
              <p>
                A panic attack is a sudden wave of intense fear or discomfort that washes over you without warning. 
                It's like your body's emergency response system - designed to protect you from danger - gets triggered 
                even when you're actually safe. These episodes are brief but incredibly intense, usually lasting between 
                5 to 20 minutes, though it can feel like an eternity when you're in the middle of one.
              </p>

              <p>
                During a panic attack, you might feel like you're losing control, having a heart attack, or even dying. 
                These feelings are terrifying, but here's the important part: <strong className="text-secondary-600">
                you are not in actual danger</strong>. Your body is having a very real, very intense response to 
                something it perceives as threatening, even though there's no real threat present.
              </p>

              <div className="bg-secondary-50 p-6 rounded-2xl border-l-4 border-secondary-400 my-8">
                <h3 className="text-2xl font-heading font-semibold text-secondary-700 mb-4 flex items-center">
                  <FaCheckCircle className="mr-3" />
                  Remember This Truth
                </h3>
                <p className="text-lg text-secondary-700">
                  Panic attacks are uncomfortable and scary, but they are not dangerous. They cannot hurt you, 
                  cause heart attacks, or make you "go crazy." You will get through this, just like you've 
                  gotten through every difficult moment before.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Why Do Panic Attacks Happen */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <FaLightbulb className="text-5xl text-accent-500 mx-auto mb-6" />
            <h2 className="text-3xl font-heading font-bold text-neutral-800 mb-4">
              Why Do Panic Attacks Happen?
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Understanding the "why" can help reduce the fear and mystery around panic attacks. 
              Here are some common factors that might contribute to them:
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {panicCauses.map((cause, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className={`bg-gradient-to-br from-${cause.color}-50 to-${cause.color}-100/50 backdrop-blur-sm border-2 border-${cause.color}-200/50 p-6 rounded-2xl shadow-soft`}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-white rounded-full shadow-soft mr-4">
                    {cause.icon}
                  </div>
                  <h3 className="font-heading font-semibold text-neutral-800 text-lg">
                    {cause.title}
                  </h3>
                </div>
                <p className="text-neutral-600 font-body leading-relaxed">
                  {cause.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10 text-center">
            <div className="bg-accent-50 p-6 rounded-2xl border-2 border-accent-200/50 max-w-3xl mx-auto">
              <FaUsers className="text-3xl text-accent-500 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-accent-700 mb-3">
                You're In Good Company
              </h3>
              <p className="text-accent-700 font-body">
                Panic attacks affect about 1 in 4 people at some point in their lives. This includes celebrities, 
                CEOs, teachers, parents, students - people from all walks of life. Having panic attacks doesn't 
                say anything negative about who you are as a person.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Symptoms Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-white/80 to-neutral-100/60 backdrop-blur-sm rounded-3xl p-10 border-2 border-white/50 shadow-soft">
            <div className="text-center mb-10">
              <FaStethoscope className="text-5xl text-secondary-500 mx-auto mb-6" />
              <h2 className="text-3xl font-heading font-bold text-neutral-800 mb-4">
                What Does a Panic Attack Feel Like?
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Recognizing these symptoms can help you understand what's happening in your body. 
                Remember, these feelings are your body's way of trying to protect you - they're intense but not harmful.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {panicSymptoms.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.05 }}
                  className="bg-white/70 p-6 rounded-xl border border-neutral-200/50 shadow-soft"
                >
                  <h3 className="font-heading font-semibold text-neutral-800 mb-2 text-lg">
                    {item.symptom}
                  </h3>
                  <p className="text-neutral-600 font-body leading-relaxed text-sm italic">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <div className="bg-primary-50 p-8 rounded-2xl border-2 border-primary-200/50">
                <FaSun className="text-4xl text-primary-500 mx-auto mb-4" />
                <h3 className="text-2xl font-heading font-bold text-primary-700 mb-4">
                  The Most Important Thing to Remember
                </h3>
                <p className="text-lg text-primary-700 font-body max-w-2xl mx-auto">
                  No matter how intense these symptoms feel, panic attacks are temporary. They have a beginning, 
                  a peak (usually within 10 minutes), and an end. Your body is designed to return to calm - 
                  it's just a matter of riding the wave until it passes.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* When to Seek Help */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-white/60 to-neutral-100/40 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/50 shadow-soft">
            <div className="text-center mb-8">
              <FaUserMd className="text-5xl text-accent-500 mx-auto mb-6" />
              <h2 className="text-3xl font-heading font-bold text-neutral-800 mb-4">
                When Should You Reach Out for Help?
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-heading font-semibold text-neutral-800 flex items-center">
                    <FaCheckCircle className="text-secondary-500 mr-3" />
                    It might be time to seek professional support if:
                  </h3>
                  <ul className="space-y-3 text-neutral-700 font-body">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Panic attacks are happening frequently (more than once a week)
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      You're avoiding places or situations because you're afraid of having a panic attack
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      The fear of panic attacks is interfering with your daily life, work, or relationships
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      You're using alcohol, drugs, or other substances to cope with anxiety
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      You're experiencing depression along with panic attacks
                    </li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-heading font-semibold text-neutral-800 flex items-center">
                    <FaHeart className="text-red-400 mr-3" />
                    Remember, seeking help shows strength
                  </h3>
                  <div className="space-y-4 text-neutral-700 font-body">
                    <p>
                      There's no shame in getting professional support. Therapists, counselors, and doctors 
                      are trained to help people navigate anxiety and panic disorders. Many effective treatments 
                      are available, including:
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li>• <strong>Cognitive Behavioral Therapy (CBT)</strong> - helps change thought patterns that trigger panic</li>
                      <li>• <strong>Mindfulness-based therapies</strong> - teaches present-moment awareness</li>
                      <li>• <strong>Medication options</strong> - when appropriate, can help manage symptoms</li>
                      <li>• <strong>Support groups</strong> - connecting with others who understand</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center bg-accent-50 p-6 rounded-2xl border-2 border-accent-200/50">
                <p className="text-lg text-accent-700 font-body">
                  <strong>Most importantly:</strong> Panic disorder is very treatable. Many people learn to manage 
                  their symptoms completely and go on to live full, rich lives. Recovery is not only possible - it's probable 
                  with the right support and tools.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Hope and Recovery Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 rounded-3xl p-10 border-2 border-white/50 shadow-soft">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center mb-6">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FaSun className="text-6xl text-yellow-400 mr-4" />
                </motion.div>
                <h2 className="text-4xl font-heading font-bold text-neutral-800">
                  Your Path Forward
                </h2>
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                >
                  <FaLeaf className="text-6xl text-secondary-400 ml-4" />
                </motion.div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-8 text-lg leading-relaxed font-body text-neutral-700">
              <div className="text-center">
                <p className="text-2xl text-primary-600 font-heading font-semibold mb-6">
                  "Panic attacks can be terrifying experiences, but they are treatable with the right combination of techniques, therapy, and support."
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white/70 rounded-xl shadow-soft">
                  <FaCheckCircle className="text-3xl text-secondary-500 mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-neutral-800 mb-2">Understanding</h3>
                  <p className="text-sm text-neutral-600">Knowledge about what's happening reduces fear and gives you power</p>
                </div>
                <div className="text-center p-6 bg-white/70 rounded-xl shadow-soft">
                  <FaHeart className="text-3xl text-red-400 mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-neutral-800 mb-2">Self-Compassion</h3>
                  <p className="text-sm text-neutral-600">Treat yourself with the same kindness you'd show a good friend</p>
                </div>
                <div className="text-center p-6 bg-white/70 rounded-xl shadow-soft">
                  <FaUsers className="text-3xl text-accent-500 mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-neutral-800 mb-2">Support</h3>
                  <p className="text-sm text-neutral-600">You don't have to face this alone - help is available and effective</p>
                </div>
              </div>

              <div className="text-center bg-white/80 p-8 rounded-2xl shadow-soft">
                <p className="text-xl text-neutral-800 mb-4">
                  With patience, persistence, and the right support, you can learn to manage panic attacks 
                  and regain control of your life. Many people who've walked this path before you are now 
                  living fulfilling, joyful lives.
                </p>
                <p className="text-lg text-primary-600 font-medium">
                  You have the strength within you. Take it one breath, one moment, one day at a time.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Final Support Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-white/60 to-neutral-100/40 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/50 shadow-soft">
            <div className="flex items-center justify-center mb-6">
              <FaHeart className="text-4xl text-red-400 mr-4 animate-gentlePulse" />
              <h2 className="text-2xl font-heading font-bold text-neutral-800">
                Remember: You Are Not Alone
              </h2>
              <FaShieldAlt className="text-4xl text-primary-400 ml-4 animate-gentlePulse" />
            </div>
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed font-body">
              If you're experiencing a panic attack right now, use the breathing or grounding exercises above. 
              If you're reading this to understand panic attacks better, know that your journey toward healing 
              is already beginning. Every step you take, every technique you learn, every moment of self-compassion 
              you practice is progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setActiveExercise('breathing')} 
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-soft hover:shadow-lg"
              >
                Try Breathing Exercise
              </button>
              <button 
                onClick={() => setActiveExercise('grounding')} 
                className="bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-soft hover:shadow-lg"
              >
                Try Grounding Exercise
              </button>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-accent-50 to-primary-50 rounded-xl border border-accent-200/50">
              <p className="text-accent-700 font-body text-center italic">
                "The cave you fear to enter holds the treasure you seek." - Joseph Campbell
              </p>
              <p className="text-sm text-neutral-600 mt-2 text-center">
                Your courage in facing this challenge is the first step toward freedom from it.
              </p>
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
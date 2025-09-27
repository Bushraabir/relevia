import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { 
  Heart, 
  Shield, 
  Brain, 
  Lightbulb, 
  Users, 
  Dna, 
  AlertTriangle, 
  Stethoscope, 
  Pill, 
  Sun, 
  Leaf, 
  CheckCircle, 
  UserCheck,
  Sparkles,
  ArrowDown,
  Quote,
  Star,
  Zap,
  Eye,
  Info
} from 'lucide-react';

// Enhanced motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9,
    rotateX: 15
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  hover: {
    y: -10,
    scale: 1.03,
    rotateX: -2,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const heroVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Interactive floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 80 + 40,
    color: ['primary', 'secondary', 'accent'][i % 3],
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full bg-gradient-to-br from-${particle.color}-200/20 to-${particle.color}-300/10 backdrop-blur-sm`}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

// Enhanced interactive card component
const InteractiveCard = ({ children, className = "", variants = cardVariants, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <motion.div
      variants={variants}
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative cursor-pointer ${className}`}
      style={{
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-transparent pointer-events-none"
        animate={{
          opacity: isHovered ? 0.8 : 0,
          background: isHovered 
            ? `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.2) 0%, transparent 50%)`
            : 'transparent'
        }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  );
};

// Data
const panicCauses = [
  {
    icon: <Dna className="text-4xl" />,
    title: "Genetic Factors",
    description: "If anxiety runs in your family, you might be more sensitive to stress. This doesn't mean you're destined to have panic attacks - it just means your nervous system might be more reactive.",
    color: "primary",
    gradient: "from-primary-100 to-primary-200"
  },
  {
    icon: <AlertTriangle className="text-4xl" />,
    title: "Stress and Life Changes",
    description: "Big life events like moving, job changes, or loss can overwhelm our coping systems. Your mind and body are trying to process a lot - panic can be a sign you need extra support.",
    color: "secondary",
    gradient: "from-secondary-100 to-secondary-200"
  },
  {
    icon: <Stethoscope className="text-4xl" />,
    title: "Health Conditions",
    description: "Sometimes our bodies send panic signals when dealing with thyroid issues, heart conditions, or breathing problems. It's always worth checking with a doctor to rule out physical causes.",
    color: "accent",
    gradient: "from-accent-100 to-accent-200"
  },
  {
    icon: <Brain className="text-4xl" />,
    title: "Brain Chemistry",
    description: "Your brain's chemical messengers (like serotonin) help regulate mood. When they're out of balance, anxiety can increase. The good news? This is very treatable.",
    color: "primary",
    gradient: "from-primary-200 to-primary-300"
  },
  {
    icon: <Pill className="text-4xl" />,
    title: "Substances & Medications",
    description: "Caffeine, alcohol, certain medications, or withdrawal can trigger panic-like symptoms. Even everyday substances can affect sensitive nervous systems.",
    color: "secondary",
    gradient: "from-secondary-200 to-secondary-300"
  }
];

const panicSymptoms = [
  { symptom: "Racing heart or palpitations", description: "Your heart is doing its job - pumping blood to help you cope", icon: <Heart className="text-red-500" /> },
  { symptom: "Sweating or sudden chills", description: "Your body's natural cooling or warming system responding to stress", icon: <Zap className="text-blue-500" /> },
  { symptom: "Difficulty breathing or feeling suffocated", description: "Shallow breathing is common during anxiety - your lungs are actually fine", icon: <Sparkles className="text-cyan-500" /> },
  { symptom: "Dizziness or feeling lightheaded", description: "Often caused by breathing changes - you're safe, even if you feel unsteady", icon: <Eye className="text-purple-500" /> },
  { symptom: "Chest tightness or discomfort", description: "Muscle tension from stress - not your heart, even though it feels scary", icon: <Shield className="text-orange-500" /> },
  { symptom: "Nausea or stomach upset", description: "Your digestive system slows during stress - this is temporary", icon: <Sparkles className="text-green-500" /> },
  { symptom: "Tingling in hands, feet, or face", description: "Changes in blood flow during anxiety - uncomfortable but harmless", icon: <Zap className="text-yellow-500" /> },
  { symptom: "Feeling like you can't swallow", description: "Throat muscles can tense up - sip water slowly if you can", icon: <Info className="text-pink-500" /> },
  { symptom: "Fear of losing control or 'going crazy'", description: "This feeling is the panic talking - you're still you, and you're safe", icon: <Brain className="text-indigo-500" /> },
  { symptom: "Overwhelming fear of dying", description: "Panic tricks your brain into thinking there's danger - but you're going to be okay", icon: <Heart className="text-red-400" /> }
];

function PanicUnderstanding() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  
  const [activeSection, setActiveSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50 relative overflow-hidden">
      {/* Enhanced floating particles */}
      <FloatingParticles />
      
      {/* Mouse follower effect */}
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-gradient-to-r from-primary-400/20 to-secondary-400/20 pointer-events-none z-50 mix-blend-multiply"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-100/30 via-transparent to-secondary-100/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-accent-100/20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl py-20">
        {/* Hero Section with enhanced animations */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          style={{ opacity, scale }}
          className="text-center mb-24"
        >
          <div className="flex justify-center items-center mb-12">
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
              className="relative"
            >
              <Heart className="text-8xl text-red-400 mr-8" />
              <motion.div
                className="absolute -top-2 -right-2 text-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="text-yellow-400" />
              </motion.div>
            </motion.div>
            
            <div className="text-center">
              <motion.h1 
                className="text-6xl md:text-8xl font-heading font-bold bg-gradient-to-r from-neutral-800 via-primary-700 to-secondary-700 bg-clip-text text-transparent leading-tight mb-4"
                animate={{ backgroundPosition: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                Understanding Panic Attacks
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative"
              >
                <p className="text-2xl text-primary-600 font-medium font-handwritten">
                  You're not alone in this journey ✨
                </p>
                <motion.div
                  className="absolute -top-1 -right-6 text-accent-400"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="text-lg" />
                </motion.div>
              </motion.div>
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
              className="relative"
            >
              <Shield className="text-8xl text-primary-400 ml-8" />
              <motion.div
                className="absolute -bottom-2 -left-2 text-2xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Leaf className="text-secondary-500" />
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="max-w-5xl mx-auto"
          >
            <p className="text-xl text-neutral-600 leading-relaxed mb-12 font-body">
              If you're here, you might be experiencing panic attacks or supporting someone who is. 
              First, take a deep breath - you're safe, you're going to be okay, and what you're going through is more common than you might think. 
              Let's explore what panic attacks are, why they happen, and most importantly, how you can feel better.
            </p>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-primary-400"
            >
              <ArrowDown className="text-3xl mx-auto" />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* What is a Panic Attack - Enhanced */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <InteractiveCard className="bg-gradient-to-br from-white/90 to-neutral-100/70 backdrop-blur-md rounded-3xl p-12 border-2 border-white/60 shadow-soft">
            <div className="text-center mb-12">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="inline-block mb-8"
              >
                <Brain className="text-8xl text-primary-500 drop-shadow-lg" />
              </motion.div>
              <h2 className="text-5xl font-heading font-bold text-neutral-800 mb-8">
                What Exactly is a Panic Attack?
              </h2>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-2xl text-center text-primary-600 font-medium mb-12 font-handwritten bg-primary-50 p-6 rounded-2xl border-2 border-primary-200/50"
              >
                Think of a panic attack as your body's alarm system going off when there's no real emergency.
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block ml-2"
                >
                  🚨
                </motion.div>
              </motion.div>
            </div>

            <div className="max-w-5xl mx-auto space-y-8 text-xl leading-relaxed font-body text-neutral-700">
              <motion.p
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                A panic attack is a sudden wave of intense fear or discomfort that washes over you without warning. 
                It's like your body's emergency response system - designed to protect you from danger - gets triggered 
                even when you're actually safe. These episodes are brief but incredibly intense, usually lasting between 
                5 to 20 minutes, though it can feel like an eternity when you're in the middle of one.
              </motion.p>

              <motion.p
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                During a panic attack, you might feel like you're losing control, having a heart attack, or even dying. 
                These feelings are terrifying, but here's the important part: <strong className="text-secondary-600 bg-secondary-100 px-2 py-1 rounded">
                you are not in actual danger</strong>. Your body is having a very real, very intense response to 
                something it perceives as threatening, even though there's no real threat present.
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-secondary-50 to-secondary-100 p-8 rounded-2xl border-l-8 border-secondary-400 my-12 relative overflow-hidden"
              >
                <motion.div
                  className="absolute top-0 right-0 text-6xl opacity-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <CheckCircle />
                </motion.div>
                <h3 className="text-3xl font-heading font-semibold text-secondary-700 mb-6 flex items-center">
                  <CheckCircle className="mr-4 text-4xl" />
                  Remember This Truth
                </h3>
                <p className="text-xl text-secondary-700 relative z-10">
                  Panic attacks are uncomfortable and scary, but they are not dangerous. They cannot hurt you, 
                  cause heart attacks, or make you "go crazy." You will get through this, just like you've 
                  gotten through every difficult moment before.
                </p>
              </motion.div>
            </div>
          </InteractiveCard>
        </motion.section>

        {/* Why Do Panic Attacks Happen - Enhanced Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="inline-block mb-8"
            >
              <Lightbulb className="text-7xl text-accent-500 drop-shadow-lg" />
            </motion.div>
            <h2 className="text-4xl font-heading font-bold text-neutral-800 mb-6">
              Why Do Panic Attacks Happen?
            </h2>
            <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              Understanding the "why" can help reduce the fear and mystery around panic attacks. 
              Here are some common factors that might contribute to them:
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {panicCauses.map((cause, index) => (
              <InteractiveCard
                key={index}
                className={`bg-gradient-to-br ${cause.gradient}/80 to-white/50 backdrop-blur-md border-2 border-${cause.color}-200/60 p-8 rounded-3xl shadow-soft hover:shadow-xl transition-all duration-500 relative overflow-hidden`}
              >
                <motion.div
                  className="absolute -top-10 -right-10 opacity-5 text-8xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  {cause.icon}
                </motion.div>
                
                <div className="flex items-start mb-6 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    className={`p-4 bg-gradient-to-br from-white to-${cause.color}-50 rounded-2xl shadow-soft mr-6 text-${cause.color}-600`}
                  >
                    {cause.icon}
                  </motion.div>
                  <h3 className="font-heading font-bold text-neutral-800 text-2xl leading-tight">
                    {cause.title}
                  </h3>
                </div>
                <p className="text-neutral-600 font-body leading-relaxed text-lg relative z-10">
                  {cause.description}
                </p>
                
                <motion.div
                  className="absolute bottom-4 right-4 opacity-20"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="text-2xl" />
                </motion.div>
              </InteractiveCard>
            ))}
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-accent-50 via-white to-accent-50 p-10 rounded-3xl border-2 border-accent-200/60 max-w-4xl mx-auto relative overflow-hidden shadow-soft">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-100/20 to-transparent"
                animate={{ x: [-100, 100] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              />
              <Users className="text-5xl text-accent-500 mx-auto mb-6" />
              <h3 className="text-3xl font-heading font-bold text-accent-700 mb-6">
                You're In Good Company
              </h3>
              <p className="text-accent-700 font-body text-xl leading-relaxed relative z-10">
                Panic attacks affect about 1 in 4 people at some point in their lives. This includes celebrities, 
                CEOs, teachers, parents, students - people from all walks of life. Having panic attacks doesn't 
                say anything negative about who you are as a person.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Enhanced Symptoms Section */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <InteractiveCard className="bg-gradient-to-br from-white/90 to-neutral-100/70 backdrop-blur-md rounded-3xl p-12 border-2 border-white/60 shadow-soft">
            <div className="text-center mb-16">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-8"
              >
                <Stethoscope className="text-7xl text-secondary-500 drop-shadow-lg" />
              </motion.div>
              <h2 className="text-4xl font-heading font-bold text-neutral-800 mb-6">
                What Does a Panic Attack Feel Like?
              </h2>
              <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                Recognizing these symptoms can help you understand what's happening in your body. 
                Remember, these feelings are your body's way of trying to protect you - they're intense but not harmful.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              {panicSymptoms.map((item, index) => (
                <InteractiveCard
                  key={index}
                  className="bg-gradient-to-br from-white/80 to-neutral-50/60 p-6 rounded-2xl border-2 border-neutral-200/50 shadow-soft relative overflow-hidden"
                  variants={{
                    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { delay: index * 0.1, duration: 0.6 }
                    }
                  }}
                >
                  <div className="flex items-start mb-4">
                    <motion.div
                      whileHover={{ scale: 1.3 }}
                      className="mr-4 mt-1"
                    >
                      {item.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-neutral-800 mb-3 text-lg">
                        {item.symptom}
                      </h3>
                      <p className="text-neutral-600 font-body leading-relaxed italic">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  <motion.div
                    className="absolute top-2 right-2 opacity-10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Heart className="text-2xl" />
                  </motion.div>
                </InteractiveCard>
              ))}
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 text-center relative"
            >
              <div className="bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50 p-10 rounded-3xl border-2 border-primary-200/60 shadow-soft relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-100/30 to-transparent"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <Sun className="text-6xl text-primary-500 mx-auto mb-6" />
                <h3 className="text-3xl font-heading font-bold text-primary-700 mb-6">
                  The Most Important Thing to Remember
                </h3>
                <p className="text-xl text-primary-700 font-body max-w-3xl mx-auto leading-relaxed relative z-10">
                  No matter how intense these symptoms feel, panic attacks are temporary. They have a beginning, 
                  a peak (usually within 10 minutes), and an end. Your body is designed to return to calm - 
                  it's just a matter of riding the wave until it passes.
                </p>
              </div>
            </motion.div>
          </InteractiveCard>
        </motion.section>

        {/* When to Seek Help - Enhanced */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <InteractiveCard className="bg-gradient-to-br from-white/80 to-neutral-100/60 backdrop-blur-md rounded-3xl p-12 border-2 border-white/50 shadow-soft">
            <div className="text-center mb-12">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="inline-block mb-8"
              >
                <UserCheck className="text-7xl text-accent-500 drop-shadow-lg" />
              </motion.div>
              <h2 className="text-4xl font-heading font-bold text-neutral-800 mb-6">
                When Should You Reach Out for Help?
              </h2>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-heading font-bold text-neutral-800 flex items-center mb-8">
                    <CheckCircle className="text-secondary-500 mr-4 text-3xl" />
                    It might be time to seek professional support if:
                  </h3>
                  <div className="space-y-6">
                    {[
                      "Panic attacks are happening frequently (more than once a week)",
                      "You're avoiding places or situations because you're afraid of having a panic attack",
                      "The fear of panic attacks is interfering with your daily life, work, or relationships",
                      "You're using alcohol, drugs, or other substances to cope with anxiety",
                      "You're experiencing depression along with panic attacks"
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-start group"
                      >
                        <motion.div
                          className="w-3 h-3 bg-secondary-400 rounded-full mt-2 mr-4 flex-shrink-0"
                          whileHover={{ scale: 1.5 }}
                        />
                        <p className="text-neutral-700 font-body text-lg leading-relaxed group-hover:text-secondary-700 transition-colors">
                          {item}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-heading font-bold text-neutral-800 flex items-center mb-8">
                    <Heart className="text-red-400 mr-4 text-3xl animate-gentlePulse" />
                    Remember, seeking help shows strength
                  </h3>
                  <div className="space-y-6 text-neutral-700 font-body text-lg">
                    <p className="leading-relaxed">
                      There's no shame in getting professional support. Therapists, counselors, and doctors 
                      are trained to help people navigate anxiety and panic disorders. Many effective treatments 
                      are available, including:
                    </p>
                    <div className="grid gap-4">
                      {[
                        { title: "Cognitive Behavioral Therapy (CBT)", desc: "helps change thought patterns that trigger panic", icon: <Brain className="text-primary-500" /> },
                        { title: "Mindfulness-based therapies", desc: "teaches present-moment awareness", icon: <Sun className="text-yellow-500" /> },
                        { title: "Medication options", desc: "when appropriate, can help manage symptoms", icon: <Pill className="text-accent-500" /> },
                        { title: "Support groups", desc: "connecting with others who understand", icon: <Users className="text-secondary-500" /> }
                      ].map((treatment, index) => (
                        <motion.div
                          key={index}
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          whileHover={{ x: 10 }}
                          className="flex items-start p-4 bg-white/50 rounded-xl border border-neutral-200/50 transition-all duration-300 hover:shadow-soft"
                        >
                          <div className="mr-4 mt-1">
                            {treatment.icon}
                          </div>
                          <div>
                            <strong className="text-neutral-800">{treatment.title}</strong>
                            <span className="text-neutral-600"> - {treatment.desc}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 text-center bg-gradient-to-r from-accent-50 via-accent-100 to-accent-50 p-8 rounded-3xl border-2 border-accent-200/60 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
                />
                <p className="text-xl text-accent-700 font-body leading-relaxed relative z-10">
                  <strong>Most importantly:</strong> Panic disorder is very treatable. Many people learn to manage 
                  their symptoms completely and go on to live full, rich lives. Recovery is not only possible - it's probable 
                  with the right support and tools.
                </p>
              </motion.div>
            </div>
          </InteractiveCard>
        </motion.section>

        {/* Hope and Recovery Section - Completely Enhanced */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <InteractiveCard className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 rounded-3xl p-12 border-2 border-white/50 shadow-soft relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-100/20 via-transparent to-secondary-100/20"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="text-center mb-12 relative z-10">
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
                  className="relative"
                >
                  <Sun className="text-8xl text-yellow-400 mr-6 drop-shadow-lg" />
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="text-2xl text-yellow-300" />
                  </motion.div>
                </motion.div>
                
                <h2 className="text-5xl font-heading font-bold text-neutral-800">
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
                  className="relative"
                >
                  <Leaf className="text-8xl text-secondary-400 ml-6 drop-shadow-lg" />
                  <motion.div
                    className="absolute -bottom-2 -left-2"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="text-xl text-red-400" />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <div className="max-w-5xl mx-auto space-y-12 relative z-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-primary-100 via-white to-secondary-100 p-8 rounded-2xl border-2 border-primary-200/50 relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-secondary-400"
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <Quote className="text-4xl text-primary-500 mx-auto mb-4" />
                  <p className="text-2xl text-primary-600 font-heading font-semibold leading-relaxed italic">
                    "Panic attacks can be terrifying experiences, but they are treatable with the right combination of techniques, therapy, and support."
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-3 gap-8"
              >
                {[
                  {
                    icon: <CheckCircle className="text-4xl text-secondary-500" />,
                    title: "Understanding",
                    desc: "Knowledge about what's happening reduces fear and gives you power",
                    gradient: "from-secondary-100 to-secondary-200"
                  },
                  {
                    icon: <Heart className="text-4xl text-red-400" />,
                    title: "Self-Compassion",
                    desc: "Treat yourself with the same kindness you'd show a good friend",
                    gradient: "from-red-100 to-pink-200"
                  },
                  {
                    icon: <Users className="text-4xl text-accent-500" />,
                    title: "Support",
                    desc: "You don't have to face this alone - help is available and effective",
                    gradient: "from-accent-100 to-accent-200"
                  }
                ].map((item, index) => (
                  <InteractiveCard
                    key={index}
                    className={`text-center p-8 bg-gradient-to-br ${item.gradient}/60 to-white/50 rounded-2xl shadow-soft border-2 border-white/50 relative overflow-hidden`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="mx-auto mb-6 inline-block p-4 bg-white/80 rounded-full shadow-soft"
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="font-heading font-bold text-neutral-800 text-xl mb-4">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 font-body leading-relaxed">
                      {item.desc}
                    </p>
                    <motion.div
                      className="absolute -bottom-4 -right-4 opacity-10"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    >
                      <Star className="text-4xl" />
                    </motion.div>
                  </InteractiveCard>
                ))}
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center bg-gradient-to-br from-white/90 to-neutral-100/60 p-10 rounded-3xl shadow-soft border-2 border-white/50 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-100/30 via-transparent to-blue-100/30"
                  animate={{ x: [-50, 50, -50] }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                <p className="text-2xl text-neutral-800 mb-6 leading-relaxed font-body relative z-10">
                  With patience, persistence, and the right support, you can learn to manage panic attacks 
                  and regain control of your life. Many people who've walked this path before you are now 
                  living fulfilling, joyful lives.
                </p>
                <motion.p 
                  className="text-xl text-primary-600 font-medium font-handwritten relative z-10"
                  animate={{ color: ['#0284C7', '#10B981', '#8B5CF6', '#0284C7'] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  You have the strength within you. Take it one breath, one moment, one day at a time. ✨
                </motion.p>
              </motion.div>
            </div>
          </InteractiveCard>
        </motion.section>

        {/* Final Support Section - Completely Redesigned */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <InteractiveCard className="bg-gradient-to-br from-white/80 to-neutral-100/60 backdrop-blur-md rounded-3xl p-12 border-2 border-white/50 shadow-soft relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-50/50 via-transparent to-secondary-50/50"
              animate={{ 
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 50%)'
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <div className="flex items-center justify-center mb-8 relative z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative"
              >
                <Heart className="text-6xl text-red-400 mr-6 animate-gentlePulse" />
                <motion.div
                  className="absolute -top-1 -right-1 text-xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  ❤️
                </motion.div>
              </motion.div>
              
              <h2 className="text-4xl font-heading font-bold text-neutral-800">
                Remember: You Are Not Alone
              </h2>
              
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="relative"
              >
                <Shield className="text-6xl text-primary-400 ml-6 animate-gentlePulse" />
                <motion.div
                  className="absolute -bottom-1 -left-1 text-xl"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🛡️
                </motion.div>
              </motion.div>
            </div>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-neutral-600 mb-10 max-w-4xl mx-auto leading-relaxed font-body relative z-10"
            >
              If you're experiencing a panic attack right now, remember to breathe slowly and remind yourself that this will pass. 
              If you're reading this to understand panic attacks better, know that your journey toward healing 
              is already beginning. Every step you take, every technique you learn, every moment of self-compassion 
              you practice is progress.
            </motion.p>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-10 p-8 bg-gradient-to-r from-accent-50 via-primary-50 to-secondary-50 rounded-2xl border-2 border-accent-200/50 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: [-200, 200] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              />
              
              <Quote className="text-4xl text-accent-600 mx-auto mb-4" />
              <p className="text-accent-700 font-body text-center italic text-xl mb-4 leading-relaxed relative z-10">
                "The cave you fear to enter holds the treasure you seek."
              </p>
              <p className="text-lg text-neutral-600 font-handwritten relative z-10">
                - Joseph Campbell
              </p>
              <motion.p 
                className="text-neutral-600 mt-4 text-center font-body relative z-10"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Your courage in facing this challenge is the first step toward freedom from it. 🌟
              </motion.p>
            </motion.div>

            {/* Final encouraging animation */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", damping: 15 }}
              className="mt-10 flex justify-center space-x-4"
            >
              {[Heart, Sun, Leaf, Star, Sparkles].map((Icon, index) => (
                <motion.div
                  key={index}
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: index * 0.2 
                  }}
                  className="text-3xl opacity-60"
                >
                  <Icon className={`
                    ${index === 0 ? 'text-red-400' : ''}
                    ${index === 1 ? 'text-yellow-400' : ''}
                    ${index === 2 ? 'text-secondary-400' : ''}
                    ${index === 3 ? 'text-accent-400' : ''}
                    ${index === 4 ? 'text-primary-400' : ''}
                  `} />
                </motion.div>
              ))}
            </motion.div>
          </InteractiveCard>
        </motion.section>
      </div>
    </div>
  );
}

export default PanicUnderstanding;
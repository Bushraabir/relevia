import { Link } from 'react-router-dom';
import React from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { animated, useSpring as useReactSpring } from '@react-spring/web';
import Lottie from 'lottie-react';
import heartAnimation from '../assets/animation/heart.json';
import Cursor from '../components/cursor';
import ChatbotWidget from '../components/Chatbot';

// Fixed morphing background - removed problematic spring animations
const MorphingBackground = () => {
  const [phase, setPhase] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(prev => (prev + 1) % 2);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const morphShapes = [
    'polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 25% 100%, 0% 80%)',
    'polygon(20% 0%, 100% 20%, 80% 100%, 0% 80%, 0% 40%, 40% 0%)'
  ];

  return (
    <div className="absolute inset-0 overflow-hidden opacity-60">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-100/30 via-secondary-100/20 to-accent-100/15"
        animate={{
          clipPath: morphShapes[phase]
        }}
        transition={{ 
          duration: 12, 
          ease: "easeInOut",
          type: "tween" // Fixed: Use tween instead of spring for complex animations
        }}
      />
      
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-primary-50/10"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut",
          type: "tween"
        }}
      />
    </div>
  );
};

// Fixed floating orbs with proper debouncing
const FloatingOrbs = () => {
  const [windowSize, setWindowSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  }));
  
  // Proper debounce implementation
  const debounce = useCallback((func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }, []);

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    const debouncedResize = debounce(updateSize, 250);
    window.addEventListener('resize', debouncedResize);
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, [debounce]);

  const orbs = useMemo(() => [
    { id: 1, x: '10%', y: '70%', size: windowSize.width < 768 ? 20 : 30, color: 'from-primary-200/40 to-primary-400/20', delay: 0, speed: 15 },
    { id: 2, x: '85%', y: '60%', size: windowSize.width < 768 ? 24 : 36, color: 'from-secondary-200/40 to-secondary-500/20', delay: 2, speed: 18 },
    { id: 3, x: '15%', y: '15%', size: windowSize.width < 768 ? 16 : 24, color: 'from-accent-200/40 to-accent-400/20', delay: 4, speed: 20 },
    { id: 4, x: '80%', y: '20%', size: windowSize.width < 768 ? 22 : 32, color: 'from-primary-300/30 to-secondary-300/30', delay: 1, speed: 16 },
  ], [windowSize.width]);
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full bg-gradient-radial ${orb.color} blur-lg shadow-lg backdrop-blur-sm border border-white/10`}
          style={{ 
            width: orb.size, 
            height: orb.size, 
            left: orb.x, 
            top: orb.y,
          }}
          animate={{ 
            y: [0, -15, 0], 
            x: [0, 10, 0], 
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: orb.speed, 
            repeat: Infinity, 
            delay: orb.delay, 
            ease: "easeInOut",
            type: "tween"
          }}
        />
      ))}
    </div>
  );
};

// Fixed particle field with simple animations
const ParticleField = () => {
  const particles = useMemo(() => {
    const particleCount = 12; // Reduced for performance
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      color: ['primary-300', 'secondary-300', 'accent-300'][Math.floor(Math.random() * 3)],
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute bg-${particle.color}/20 rounded-full blur-sm`}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [particle.opacity, particle.opacity * 2, particle.opacity]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
            type: "tween"
          }}
        />
      ))}
    </div>
  );
};

// Fixed scroll indicator
const ScrollIndicator = ({ scrollY }) => {
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      style={{ opacity }}
    >
      <motion.div
        className="flex flex-col items-center text-neutral-600 bg-white/15 backdrop-blur-lg border border-white/20 rounded-full px-4 py-3 shadow-lg"
        animate={{ y: [0, 6, 0] }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          ease: "easeInOut",
          type: "tween"
        }}
      >
        <span className="text-xs mb-2 font-medium">Scroll</span>
        <div className="w-6 h-10 border-2 border-primary-400/60 rounded-full relative bg-gradient-to-b from-white/5 to-transparent">
          <motion.div
            className="w-1.5 h-2 bg-primary-500 rounded-full absolute left-1/2 transform -translate-x-1/2 top-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              type: "tween"
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

function Home() {
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Optimized scroll transforms
  const heroY = useTransform(scrollY, [0, 800], [0, -200]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.8]);
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -300]);
  
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Fixed debounce function
  const debounce = useCallback((func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), wait);
    };
  }, []);

  // Optimized mouse tracking
  const updateMousePosition = useCallback((e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    setMousePosition({ 
      x: (clientX - innerWidth / 2) / innerWidth,
      y: (clientY - innerHeight / 2) / innerHeight 
    });
    
    mouseX.set((clientX - innerWidth / 2) / 30);
    mouseY.set((clientY - innerHeight / 2) / 30);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const debouncedMouseMove = debounce(updateMousePosition, 16);
    window.addEventListener('mousemove', debouncedMouseMove);
    setIsLoaded(true);

    return () => {
      window.removeEventListener('mousemove', debouncedMouseMove);
    };
  }, [updateMousePosition, debounce]);

  // Fixed gradient animation - removed conflicting properties
  const gradientAnimation = useReactSpring({
    from: { 
      backgroundPosition: '0% 50%'
    },
    to: async (next) => {
      while (true) {
        await next({ backgroundPosition: '100% 50%' });
        await next({ backgroundPosition: '0% 50%' });
      }
    },
    config: { duration: 20000 },
  });

  // Fixed animation variants - removed complex spring animations
  const heroVariants = {
    initial: { opacity: 0, y: 60, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 1.8, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        type: "tween"
      } 
    }
  };

  const letterVariants = {
    initial: { 
      opacity: 0, 
      y: 40, 
      scale: 0.8 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        type: "tween"
      } 
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 40, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
        type: "tween"
      } 
    },
    hover: { 
      y: -8, 
      scale: 1.02,
      transition: { 
        duration: 0.3,
        ease: "easeOut",
        type: "tween"
      } 
    }
  };

  // Feature cards data
  const featureCards = useMemo(() => [
    { 
      to: '/about', 
      title: 'Mindful Awareness', 
      desc: 'Journey into the depths of tranquility with guided meditation and mindfulness practices designed to nurture your inner peace.',
      icon: '🧘‍♀️',
      gradient: 'from-primary-100/70 via-primary-200/50 to-secondary-200/70',
      shadow: 'shadow-primary-200/40',
      glowColor: 'primary-400'
    },
    { 
      to: '/coping', 
      title: 'Gentle Healing', 
      desc: 'Discover compassionate coping strategies and evidence-based techniques to navigate life\'s challenges with grace and resilience.',
      icon: '🌿',
      gradient: 'from-secondary-100/70 via-secondary-200/50 to-accent-200/70',
      shadow: 'shadow-secondary-200/40',
      glowColor: 'secondary-400'
    },
    { 
      to: '/medication', 
      title: 'Holistic Wellness', 
      desc: 'Access comprehensive guidance on wellness approaches, combining traditional wisdom with modern therapeutic insights.',
      icon: '💊',
      gradient: 'from-accent-100/70 via-accent-200/50 to-primary-200/70',
      shadow: 'shadow-accent-200/40',
      glowColor: 'accent-400'
    }
  ], []);

  // Letter content
  const letterContent = useMemo(() => ({
    greeting: "Hey beautiful soul,",
    opening: "I see you here, and I want you to know—you're incredibly brave just for being present in this moment. Right now, in this very second, you are exactly where you need to be.",
    affirmation: "You are safe. You are loved. You are enough—not because of what you do, but simply because you exist.",
    breathing: "Let's breathe together, shall we? Place one hand on your heart, feel its gentle rhythm. Now, breathe in slowly through your nose for 4 counts... hold for 4... and release through your mouth for 6.",
    grounding: "Notice three things you can see right now—maybe the gentle glow of your screen, a photo that brings you joy, or shadows dancing on the wall. Listen for two sounds. Feel one thing—the warmth of your hands or the support of your chair.",
    encouragement: "Whatever you're feeling right now—anxiety, sadness, overwhelm, or numbness—it's valid, and it's temporary. You've weathered every storm in your life so far, and that strength lives within you still.",
    closing: "Take all the time you need. Move gently through your day. You don't have to be perfect or have everything figured out. Just be kind to yourself.",
    signature: "With infinite love and gentle support,",
  }), []);

  return (
    <>
      <div className="sr-only">
        <h1>Relevia - Transform Your Mental Wellness Journey | Anxiety Relief & Mindfulness</h1>
        <p>Discover your sanctuary for mental wellness at Relevia. Expert-guided anxiety relief, mindfulness practices, and compassionate support for your healing journey.</p>
      </div>

      <div className="min-h-screen relative overflow-hidden">
        {/* Fixed background system - removed conflicting properties */}
        <animated.div
          style={{ 
            backgroundImage: `
              radial-gradient(ellipse at 25% 25%, rgba(14, 165, 233, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse at 75% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              conic-gradient(from 180deg at 50% 50%, #F9FAFB 0deg, #E0F2FE 90deg, #D1FAE5 180deg, #EDE9FE 270deg, #F9FAFB 360deg)
            `,
            backgroundSize: '400% 400%',
            ...gradientAnimation
          }}
          className="absolute inset-0 z-0"
        />
        
        <MorphingBackground />
        
        <motion.div 
          style={{ y: backgroundY }} 
          className="absolute inset-0 z-5"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/10" />
        </motion.div>
        
        <FloatingOrbs />
        <ParticleField />

        <Cursor />
        <ChatbotWidget />

        {/* Hero Section */}
        <motion.main 
          id="main"
          className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 pt-20 pb-24"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Heart animation */}
          <motion.div
            variants={heroVariants}
            initial="initial"
            animate="animate"
            className="mb-16 relative"
            style={{
              x: springX,
              y: springY
            }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-primary-300/30 via-secondary-300/20 to-transparent rounded-full blur-2xl scale-150 animate-gentlePulse" />
            <div className="absolute inset-4 bg-gradient-radial from-white/20 to-transparent rounded-full blur-lg animate-gentlePulse" style={{ animationDuration: '4s' }} />
            
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1], 
                opacity: [0.9, 1, 0.9],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: 'easeInOut',
                type: "tween"
              }}
              className="relative z-10"
            >
              <Lottie 
                animationData={heartAnimation} 
                loop={true} 
                speed={0.3} 
                style={{ 
                  width: typeof window !== 'undefined' && window.innerWidth < 768 ? 280 : 400, 
                  height: typeof window !== 'undefined' && window.innerWidth < 768 ? 280 : 400,
                  filter: 'drop-shadow(0 8px 32px rgba(14, 165, 233, 0.2))'
                }} 
                className="relative z-10"
                role="img"
                aria-label="Animated heart representing peace and wellness"
              />
            </motion.div>
          </motion.div>

          {/* Main heading - Fixed letter animations */}
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.5, staggerChildren: 0.1 }}
            className="mb-20 text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-800 bg-clip-text text-transparent leading-tight">
              {["You're", "Safe", "Here"].map((word, wordIndex) => (
                <motion.div key={wordIndex} className="inline-block mx-2 sm:mx-4">
                  {word.split('').map((letter, letterIndex) => (
                    <motion.span
                      key={letterIndex}
                      variants={letterVariants}
                      className="inline-block hover:scale-110 hover:text-primary-600 transition-all duration-500 cursor-default"
                      whileHover={{ 
                        y: -10,
                        scale: 1.15,
                        transition: { duration: 0.3, ease: "easeOut", type: "tween" } 
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              ))}
            </h1>
          </motion.header>

          {/* Subtitle */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 2, duration: 1.8 }} 
            className="max-w-5xl mx-auto text-center mb-24"
          >
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-neutral-600 leading-relaxed font-body mb-8"
              animate={{ 
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                type: "tween"
              }}
            >
              Take a moment. Breathe deeply. You've found your sanctuary.
            </motion.p>
            
            {/* Fixed divider */}
            <motion.div
              className="flex items-center justify-center space-x-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5, duration: 1.5 }}
            >
              <motion.div
                className="h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent flex-1 max-w-24"
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  type: "tween"
                }}
              />
              
              <div className="w-2 h-2 bg-gradient-radial from-primary-500 to-secondary-500 rounded-full" />
              
              <motion.div
                className="h-0.5 bg-gradient-to-r from-transparent via-secondary-400 to-transparent flex-1 max-w-24"
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut", 
                  delay: 1.5,
                  type: "tween"
                }}
              />
            </motion.div>
          </motion.div>

          {/* Letter section with glass morphism */}
          <motion.article
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/30 backdrop-blur-2xl border border-white/40 rounded-2xl p-8 sm:p-12 md:p-16 shadow-xl max-w-5xl mx-auto my-32 relative overflow-hidden"
            style={{
              boxShadow: `
                0 20px 40px -12px rgba(0, 0, 0, 0.1),
                0 0 0 1px rgba(255, 255, 255, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `
            }}
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Background decorations */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-8 left-8 w-32 h-32 bg-gradient-to-br from-primary-300/50 to-secondary-300/30 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s' }} />
              <div className="absolute bottom-8 right-8 w-24 h-24 bg-gradient-to-br from-accent-300/40 to-primary-300/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '8s' }} />
            </div>

            {/* Letter content */}
            <div className="relative z-10 space-y-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="text-2xl sm:text-3xl font-handwritten text-primary-700 text-center mb-12"
                viewport={{ once: true }}
              >
                {letterContent.greeting}
              </motion.h2>

              {[
                letterContent.opening,
                letterContent.breathing,
                letterContent.grounding,
                letterContent.encouragement,
                letterContent.closing
              ].map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 1.5 
                  }}
                  className="text-neutral-700 leading-relaxed text-lg sm:text-xl font-body hover:text-neutral-800 transition-colors duration-500"
                  viewport={{ once: true }}
                >
                  {paragraph}
                </motion.p>
              ))}

              {/* Affirmation section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 2 }}
                className="bg-gradient-to-br from-primary-50/80 via-secondary-50/70 to-accent-50/80 rounded-2xl p-8 border border-primary-300/20 shadow-lg my-12 relative overflow-hidden backdrop-blur-sm"
                whileHover={{ scale: 1.01 }}
                viewport={{ once: true }}
              >
                <motion.p 
                  className="text-center text-primary-800 font-semibold text-xl sm:text-2xl font-heading"
                  animate={{ 
                    opacity: [0.9, 1, 0.9]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    type: "tween"
                  }}
                >
                  {letterContent.affirmation}
                </motion.p>
              </motion.div>

              {/* Signature */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="text-center pt-8 border-t border-neutral-200/40"
                viewport={{ once: true }}
              >
                <p className="font-handwritten text-lg text-secondary-700 mb-2">
                  {letterContent.signature}
                </p>
                <p className="font-heading text-xl text-accent-700 font-semibold">
                  Team Relevia 💚
                </p>
              </motion.div>
            </div>
          </motion.article>

          {/* Call-to-action section */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 2 }} 
            className="text-center mb-24"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-700 mb-16 font-heading font-medium"
              animate={{ 
                opacity: [0.9, 1, 0.9]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut",
                type: "tween"
              }}
            >
              Begin Your Journey to Inner Peace
            </motion.h2>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              {[
                { 
                  to: '/about', 
                  text: 'Explore Resources', 
                  primary: true,
                  icon: '🌟',
                  gradient: 'from-primary-500 via-primary-600 to-secondary-600'
                },
                { 
                  to: '/contact', 
                  text: 'Connect With Us', 
                  primary: false,
                  icon: '💝',
                  gradient: 'from-white via-neutral-50 to-white'
                }
              ].map((btn, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 + i * 0.3, duration: 1.5 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -4,
                    transition: { duration: 0.3, ease: "easeOut", type: "tween" }
                  }} 
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    to={btn.to} 
                    className={`
                      inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-500 backdrop-blur-lg border-2 relative overflow-hidden group
                      ${btn.primary 
                        ? `bg-gradient-to-r ${btn.gradient} hover:shadow-primary-500/25 text-white border-white/20 hover:border-white/40` 
                        : `bg-gradient-to-r ${btn.gradient} hover:bg-white text-neutral-700 border-neutral-300/50 hover:border-primary-400/50 hover:shadow-neutral-300/30`
                      }
                    `}
                    aria-label={`Navigate to ${btn.text.toLowerCase()}`}
                  >
                    <span className="text-xl">{btn.icon}</span>
                    <span className="relative z-10">{btn.text}</span>
                    
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full ${btn.primary ? 'bg-white/10' : 'bg-primary-100/40'}`} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.main>

        {/* Feature cards section */}
        <motion.section 
          ref={ref} 
          className="relative z-10 py-24 px-4 sm:px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="text-center mb-20"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-neutral-800 mb-6">
                Your Wellness Toolkit
              </h2>
              <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed font-body">
                Discover thoughtfully curated resources designed to support your mental health journey with compassion and expertise.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {featureCards.map((item, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  initial="initial"
                  whileInView="animate"
                  whileHover="hover"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className={`
                    bg-white/40 backdrop-blur-2xl border border-white/50 rounded-2xl p-8 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-700 group relative overflow-hidden
                    ${item.shadow}
                  `}
                  style={{ 
                    boxShadow: `
                      0 16px 32px -8px rgba(0, 0, 0, 0.08),
                      0 0 0 1px rgba(255, 255, 255, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.15)
                    `
                  }}
                >
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-30 transition-all duration-700 rounded-2xl`} />
                  
                  <Link to={item.to} className="relative z-10 block h-full" aria-label={`Learn more about ${item.title}`}>
                    {/* Fixed icon animation - removed problematic rotate array */}
                    <motion.div 
                      className="text-5xl sm:text-6xl mb-6 group-hover:scale-110 transition-all duration-500 text-center"
                      whileHover={{ 
                        scale: 1.15,
                        transition: { duration: 0.6, type: "spring", stiffness: 200 }
                      }}
                      role="img"
                      aria-label={`${item.title} icon`}
                    >
                      {item.icon}
                    </motion.div>
                    
                    <h3 className="text-2xl sm:text-3xl text-neutral-800 mb-6 group-hover:text-neutral-900 transition-colors leading-tight font-heading font-bold text-center">
                      {item.title}
                    </h3>
                    
                    <p className="text-base sm:text-lg text-neutral-600 leading-relaxed group-hover:text-neutral-700 transition-colors mb-8 font-body text-center">
                      {item.desc}
                    </p>
                    
                    {/* Fixed CTA animation */}
                    <motion.div
                      className={`flex items-center justify-center text-${item.glowColor} group-hover:text-${item.glowColor}/80 transition-all duration-500 pt-4 border-t border-neutral-200/50`}
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <span className="text-sm font-bold mr-2 font-body">Explore More</span>
                      <motion.svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          type: "tween"
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Scroll indicator */}
        <ScrollIndicator scrollY={scrollY} />

        {/* Fixed floating decorations */}
        <motion.div 
          className="fixed bottom-0 left-0 w-full h-32 pointer-events-none overflow-hidden z-5" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 3, duration: 2 }}
          aria-hidden="true"
        >
          {[...Array(8)].map((_, i) => (
            <motion.div 
              key={i}
              className={`absolute w-2 h-2 rounded-full backdrop-blur-sm shadow-sm border border-white/20 ${
                ['bg-gradient-to-br from-primary-300/60 to-primary-500/40', 
                 'bg-gradient-to-br from-secondary-300/60 to-secondary-500/40', 
                 'bg-gradient-to-br from-accent-300/60 to-accent-500/40'][i % 3]
              }`}
              style={{
                left: `${10 + i * 10}%`,
                bottom: `${Math.random() * 20 + 10}px`
              }}
              animate={{ 
                y: [0, -20, 0], 
                opacity: [0.4, 0.8, 0.4]
              }} 
              transition={{ 
                duration: 8 + Math.random() * 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.3,
                type: "tween"
              }} 
            />
          ))}
        </motion.div>

        {/* Fixed help button */}
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 4, duration: 1.2 }}
        >
          <motion.button
            className="w-14 h-14 bg-gradient-to-br from-accent-500 via-accent-600 to-accent-700 hover:from-accent-600 hover:via-accent-700 hover:to-accent-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-500 backdrop-blur-lg border-2 border-white/20 flex items-center justify-center group relative overflow-hidden"
            whileHover={{ 
              scale: 1.1, 
              y: -2,
              transition: { duration: 0.3, ease: "easeOut", type: "tween" } 
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Quick help and resources"
          >
            <span className="text-xl font-bold font-heading relative z-10">?</span>
            
            <motion.div 
              className="absolute inset-0 border-2 border-white/30 rounded-full"
              animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeOut",
                type: "tween"
              }}
            />
          </motion.button>
        </motion.div>

        {/* Accessibility improvements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {isLoaded && "Welcome to Relevia - Your sanctuary for mental wellness has loaded successfully."}
        </div>

        {/* Skip navigation */}
        <a 
          href="#main" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 hover:bg-primary-700 text-white px-6 py-4 rounded-xl z-50 font-bold shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-300"
        >
          Skip to main content
        </a>

        {/* Fixed ambient background elements */}
        <div className="fixed inset-0 pointer-events-none z-1" aria-hidden="true">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-64 h-64 rounded-full opacity-3 blur-2xl ${
                ['bg-primary-200', 'bg-secondary-200', 'bg-accent-200'][i]
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                opacity: [0.03, 0.08, 0.03],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 3,
                type: "tween"
              }}
            />
          ))}
        </div>

        {/* SEO structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Relevia - Mental Wellness Journey",
            "description": "Discover your sanctuary for mental wellness at Relevia. Expert-guided anxiety relief, mindfulness practices, and compassionate support for your healing journey.",
            "url": "https://relevia.vercel.app/",
            "mainEntity": {
              "@type": "Organization",
              "name": "Relevia",
              "description": "Mental wellness platform with interactive therapy resources",
              "serviceType": [
                "Mental Health Support", 
                "Anxiety Relief", 
                "Mindfulness Training",
                "Wellness Coaching"
              ],
              "areaServed": "Worldwide"
            }
          })}
        </script>

        {/* Meta tags for SEO */}
        <div className="sr-only">
          <meta name="description" content="Transform your mental wellness journey with Relevia's compassionate approach to anxiety relief, mindfulness practices, and therapeutic support." />
          <meta name="keywords" content="mental health, wellness, anxiety relief, mindfulness, therapy, healing journey, stress management" />
          <meta name="author" content="Relevia Team" />
          <meta property="og:title" content="Relevia - Your Mental Wellness Sanctuary" />
          <meta property="og:description" content="Begin your journey to inner peace with expert-guided resources and compassionate support." />
          <meta property="og:url" content="https://relevia.vercel.app/" />
          <meta property="og:type" content="website" />
        </div>
      </div>
    </>
  );
}

export default Home;
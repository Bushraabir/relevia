import { Link } from 'react-router-dom';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { animated, useSpring as useReactSpring } from '@react-spring/web';
import Cursor from '../components/cursor';
import Chatbot from '../components/Chatbot';
import Lottie from 'lottie-react';
import heartAnimation from '../assets/animation/heart.json';

// Enhanced particle configuration for serenity
const particleOptions = {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  interactivity: {
    events: { 
      onHover: { enable: true, mode: 'attract' }, 
      onClick: { enable: true, mode: 'push' },
      resize: true
    },
    modes: { 
      attract: { distance: 120, duration: 0.6, factor: 2 }, 
      push: { quantity: 2 } 
    }
  },
  particles: {
    number: { value: 20, density: { enable: true, value_area: 1200 } },
    color: { value: ['#E0F2FE', '#D1FAE5', '#EDE9FE', '#F9FAFB'] },
    shape: { type: ['circle'] },
    opacity: { 
      value: 0.15, 
      random: { enable: true, minimumValue: 0.05 },
      animation: { enable: true, speed: 0.8, minimumValue: 0.05, sync: false }
    },
    size: { 
      value: 1.5, 
      random: { enable: true, minimumValue: 0.3 },
      animation: { enable: true, speed: 1.5, minimumValue: 0.3, sync: false }
    },
    move: { 
      enable: true, 
      speed: 0.3, 
      direction: 'none', 
      random: true, 
      straight: false, 
      outModes: 'bounce',
      attract: { enable: false }
    },
    links: {
      enable: true,
      distance: 80,
      color: '#E0F2FE',
      opacity: 0.08,
      width: 0.5
    }
  },
  detectRetina: true
};

const particlesInit = async (main) => {
  await loadFull(main);
};

// Serene floating orbs with peaceful movement
const FloatingOrbs = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const orbs = [
    { id: 1, x: '10%', y: '80%', size: windowSize.width < 768 ? 12 : 18, color: 'bg-primary-100/30', delay: 0 },
    { id: 2, x: '88%', y: '70%', size: windowSize.width < 768 ? 16 : 24, color: 'bg-secondary-100/30', delay: 1.2 },
    { id: 3, x: '18%', y: '18%', size: windowSize.width < 768 ? 10 : 16, color: 'bg-accent-100/30', delay: 2.4 },
    { id: 4, x: '78%', y: '25%', size: windowSize.width < 768 ? 14 : 20, color: 'bg-primary-200/25', delay: 0.8 },
    { id: 5, x: '48%', y: '88%', size: windowSize.width < 768 ? 8 : 14, color: 'bg-secondary-200/25', delay: 1.6 },
    { id: 6, x: '95%', y: '45%', size: windowSize.width < 768 ? 6 : 12, color: 'bg-accent-200/25', delay: 3.2 }
  ];
  
  return (
    <>
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full ${orb.color} backdrop-blur-sm shadow-soft`}
          style={{ 
            width: orb.size, 
            height: orb.size, 
            left: orb.x, 
            top: orb.y,
            filter: 'blur(0.3px)'
          }}
          animate={{ 
            y: [0, -8, 0], 
            x: [0, 5, 0], 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 15 + orb.id * 2, 
            repeat: Infinity, 
            delay: orb.delay, 
            ease: 'easeInOut' 
          }}
          whileHover={{ scale: 1.3, opacity: 0.8, transition: { duration: 0.3 } }}
        />
      ))}
    </>
  );
};

// Enhanced mindfulness breathing circle
const BreathingCircle = ({ isVisible }) => {
  return (
    <motion.div
      className="fixed top-6 right-6 z-40"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-primary-50/40 backdrop-blur-md border border-primary-200/30 flex items-center justify-center cursor-pointer hover:bg-primary-100/50 transition-colors duration-500 shadow-soft"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ 
          duration: 4.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        whileHover={{ scale: 1.15, transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-primary-600 text-xs font-medium font-body">Breathe</span>
      </motion.div>
    </motion.div>
  );
};

function Home() {
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [cursorDisabled, setCursorDisabled] = useState(false);
  
  const yOffset = useTransform(scrollY, [0, 800], [0, 120]);
  const scaleHeader = useTransform(scrollY, [0, 600], [1, 0.98]);
  const opacityHeader = useTransform(scrollY, [0, 600], [1, 0.9]);
  const rotateOrbs = useTransform(scrollY, [0, 1000], [0, 180]);
  
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  // Enhanced mouse tracking with cursor control
  useEffect(() => {
    const updateMousePosition = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Check if hovering over interactive elements
      const target = e.target.closest('[data-disable-cursor], .chatbot-button, .quick-help-button, button, a, input, textarea');
      setCursorDisabled(!!target);
      
      setMousePosition({ 
        x: (clientX - innerWidth / 2) / innerWidth,
        y: (clientY - innerHeight / 2) / innerHeight 
      });
      
      mouseX.set((clientX - innerWidth / 2) / 60);
      mouseY.set((clientY - innerHeight / 2) / 60);
    };

    window.addEventListener('mousemove', updateMousePosition);
    setIsLoaded(true);

    const timer = setTimeout(() => setShowBreathing(true), 8000);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      clearTimeout(timer);
    };
  }, [mouseX, mouseY]);

  // Refined animation variants for tranquility
  const cardVariants = {
    initial: { opacity: 0, y: 40, scale: 0.95, rotateX: -10 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      rotateX: 0,
      transition: { 
        duration: 1.6, 
        ease: [0.22, 1, 0.36, 1],
        type: "spring",
        stiffness: 80,
        damping: 20
      } 
    },
    hover: { 
      y: -8, 
      scale: 1.02, 
      rotateX: 2,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 30 
      } 
    }
  };

  const headerTextVariants = {
    initial: { opacity: 0, y: -20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        delay: 0.8, 
        duration: 1.8, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  const letterContainerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 1.2 }
    }
  };

  const letterVariants = {
    initial: { 
      opacity: 0, 
      y: 30, 
      rotateX: -45,
      scale: 0.8 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      scale: 1,
      transition: { 
        duration: 1, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  const gradientSpring = useReactSpring({
    from: { backgroundPosition: '0% 50%' },
    to: { backgroundPosition: '100% 50%' },
    config: { duration: 20000 },
    loop: { reverse: true }
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cursor with disabled state */}
      {!cursorDisabled && <Cursor />}
      <BreathingCircle isVisible={showBreathing} />
      
      {/* Chatbot with cursor disable attributes */}
      <div data-disable-cursor className="chatbot-container">
        <Chatbot />
      </div>
      
      {/* Serene particle system */}
      <motion.div 
        style={{ 
          y: yOffset, 
          opacity: opacityHeader, 
          scale: scaleHeader,
          rotate: rotateOrbs
        }} 
        className="absolute inset-0 z-0"
      >
        <Particles id="tsparticles" init={particlesInit} options={particleOptions} />
      </motion.div>
      
      {/* Peaceful gradient background */}
      <animated.div
        style={{ 
          ...gradientSpring, 
          background: 'linear-gradient(135deg, #F9FAFB 0%, #E0F2FE 15%, #D1FAE5 30%, #EDE9FE 45%, #F9FAFB 60%, #E0F2FE 75%, #D1FAE5 90%, #F9FAFB 100%)', 
          backgroundSize: '400% 400%' 
        }}
        className="absolute inset-0 z-0"
      />
      
      {/* Subtle depth overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/3 to-white/8 z-5" />
      
      <FloatingOrbs />
      
      {/* Main content with improved spacing and flow */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 pt-24 pb-32">
        
        {/* Heart animation with enhanced peaceful presence */}
        <motion.div
          initial={{ opacity: 0, y: -15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 relative"
          style={{
            x: springX,
            y: springY
          }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.03, 1], 
              opacity: [0.95, 1, 0.95]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            {/* Soft radial glow */}
            <div className="absolute inset-0 bg-gradient-radial from-primary-100/20 via-secondary-100/15 to-transparent rounded-full blur-3xl animate-gentlePulse" />
            <div className="absolute inset-6 bg-gradient-radial from-primary-50/30 to-transparent rounded-full blur-2xl" />
            
            <Lottie 
              animationData={heartAnimation} 
              loop={true} 
              speed={0.25} 
              style={{ 
                width: window.innerWidth < 768 ? 260 : 350, 
                height: window.innerWidth < 768 ? 260 : 350 
              }} 
              className="relative z-10 drop-shadow-sm"
            />
          </motion.div>
        </motion.div>

        {/* Refined main heading */}
        <motion.div
          variants={letterContainerVariants}
          initial="initial"
          animate="animate"
          className="mb-20"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-bold bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-700 bg-clip-text text-transparent text-center tracking-tight leading-tight">
            {["Hey", "friend", ",", "You're", "SAFE", "here"].map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-2 sm:mr-3 md:mr-4">
                {word.split('').map((letter, letterIndex) => (
                  <motion.span
                    key={letterIndex}
                    variants={letterVariants}
                    className="inline-block hover:scale-105 hover:text-primary-600 transition-all duration-500 cursor-default"
                    style={{ perspective: '1000px' }}
                    whileHover={{ 
                      y: -3, 
                      transition: { type: "spring", stiffness: 400, damping: 25 } 
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
                {wordIndex < 5 && <span className="mr-2 sm:mr-3 md:mr-4"> </span>}
              </span>
            ))}
          </h1>
        </motion.div>

        {/* Peaceful subtitle with breathing rhythm */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 2.5, duration: 1.6, ease: [0.22, 1, 0.36, 1] }} 
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <motion.p 
            className="text-base sm:text-lg md:text-xl font-body text-neutral-600 leading-relaxed"
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Let's focus on your next breath—and nothing more.
          </motion.p>
          <motion.div
            className="mt-6 h-0.5 bg-gradient-to-r from-transparent via-primary-300 to-transparent rounded-full mx-auto"
            initial={{ width: 0 }}
            animate={{ width: '8rem' }}
            transition={{ delay: 3, duration: 1.5, ease: "easeOut" }}
          />
        </motion.div>

        {/* Enhanced letter with improved readability and calm aesthetic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-8 sm:p-10 md:p-14 lg:p-18 shadow-soft max-w-4xl mx-auto my-20 sm:my-24 md:my-28 relative overflow-hidden transform-gpu
          before:content-[''] before:absolute before:top-0 before:left-10 sm:before:left-16 md:before:left-20 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-accent-200 before:via-accent-300 before:to-accent-200 before:z-10
          after:content-[''] after:absolute after:top-10 sm:after:top-16 md:after:top-20 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-accent-200 after:via-accent-300 after:to-accent-200 after:z-10 
          font-handwritten text-base sm:text-lg md:text-xl leading-relaxed"
          viewport={{ once: true, amount: 0.1 }}
          style={{
            transform: `rotateX(${mousePosition.y * 1}deg) rotateY(${mousePosition.x * 1}deg)`
          }}
        >
          {/* Gentle background elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-12 left-12 w-24 h-24 bg-primary-200 rounded-full blur-3xl animate-gentlePulse" />
            <div className="absolute bottom-16 right-16 w-20 h-20 bg-secondary-200 rounded-full blur-3xl animate-gentlePulse" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-accent-200 rounded-full blur-3xl animate-gentlePulse" style={{ animationDelay: '4s' }} />
          </div>

          {/* Letter content with peaceful timing */}
          {[
            "Hey buddy,\nI'm really sorry you're feeling like this right now. I just want you to know—you're gonna be okay. Seriously. This feeling? It'll pass. You're safe, you're not alone, and most importantly—you are enough, exactly as you are. No need to fix or change anything about yourself right now. Just breathe with me, okay? 🫶",
            
            "Find a cozy little spot—maybe your bed, your couch, even the floor if that's where you feel comfy. Wrap yourself up in something soft if you can. Now, hand on your heart, other on your belly. Deep breath in through your nose… 1… 2… 3… 4… hold it… and exhale slowly through your mouth… 6… 5… 4… 3… 2… 1… Nice. Let's do that a couple more times. You're doing amazing. 🌬️",
            
            "Now gently look around you—name three things you can see (maybe your pillow, a photo, your cup?), two things you can hear (the fan? birds? silence?), and one thing you can feel (your blanket, the floor, your breath). This is you coming back to the now. And right now? You're safe. 🧸🪷"
          ].map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: index * 0.3, 
                duration: 1.2, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="mt-16 mb-8 ml-8 sm:ml-14 md:ml-18 text-neutral-700 hover:text-neutral-800 transition-colors duration-500"
              style={{ whiteSpace: 'pre-line' }}
              viewport={{ once: true }}
            >
              {paragraph}
            </motion.p>
          ))}

          {/* Peaceful affirmation section */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 ml-8 sm:ml-14 md:ml-18 p-6 sm:p-8 bg-gradient-to-r from-primary-50/60 via-secondary-50/60 to-accent-50/60 rounded-2xl border border-primary-100/40 shadow-soft hover:shadow-lg transition-all duration-500"
            whileHover={{ scale: 1.01 }}
            viewport={{ once: true }}
          >
            <p className="italic text-neutral-600 text-center font-medium mb-3 font-body">
              Whisper this to yourself (or say it out loud if you want!):
            </p>
            <motion.p 
              className="text-neutral-700 font-semibold text-center"
              animate={{ 
                opacity: [0.95, 1, 0.95]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              "I am safe. I am enough. It's okay to feel this. I've got me."
            </motion.p>
          </motion.div>

          {/* Remaining paragraphs */}
          {[
            "Let those words wrap around you like the warmest, fluffiest blanket ever. 🤍✨",
            
            "Now imagine a soft golden light—like sunlight peeking through clouds—gently pouring over you. From your head… down to your chest… your arms… your legs… all the way to your toes. It's warm, calm, and safe. It's like the universe itself is giving you a little hug. 🌞",
            
            "This feeling might feel huge right now, but it's just a wave. And waves always pass. You've gotten through every single one before—every tough moment, every panic—and you'll get through this too. You're stronger than your thoughts. 🌊💪",
            
            "You don't have to reach out to anyone right now, but you can if you want. But also—you're enough all by yourself. You've got this. You really do. And I'm so, so proud of you for just breathing and reading this. That's already a win. 🫂",
            
            "Take another breath. Take your time. Be gentle with yourself. Everything's gonna be okay. Promise."
          ].map((paragraph, index) => (
            <motion.p
              key={index + 3}
              initial={{ opacity: 0, x: (index + 3) % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: (index + 3) * 0.2, 
                duration: 1.2, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="mb-8 ml-8 sm:ml-14 md:ml-18 text-neutral-700 hover:text-neutral-800 transition-colors duration-500"
              viewport={{ once: true }}
            >
              {paragraph}
            </motion.p>
          ))}

          {/* Warm signature */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="ml-8 sm:ml-14 md:ml-18 p-6 bg-gradient-to-r from-secondary-50/70 to-accent-50/70 rounded-2xl border border-secondary-100/50 shadow-soft hover:shadow-lg transition-all duration-500"
            whileHover={{ scale: 1.01 }}
            viewport={{ once: true }}
          >
            <p className="font-bold text-neutral-700 text-center font-body">
              Big warm hug, <br />
              <span className="text-secondary-600">Your Friend</span> <br />
              <motion.span 
                className="text-secondary-700"
                animate={{ 
                  opacity: [0.9, 1, 0.9]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Relevia 💛
              </motion.span>
            </p>
          </motion.div>
        </motion.div>

        {/* Refined call-to-action with peaceful spacing */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }} 
          className="text-center mb-20"
          viewport={{ once: true }}
        >
          <motion.h2 
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading text-neutral-700 mb-12 font-medium"
            viewport={{ once: true }}
          >
            Let's begin the journey to calm...
          </motion.h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
            {[
              { to: '/relevia/about', text: 'Discover Resources', bg: 'bg-primary-500', hover: 'hover:bg-primary-600', shadow: 'shadow-primary-200' },
              { to: '/relevia/contact', text: 'Connect With Us', bg: 'bg-secondary-500', hover: 'hover:bg-secondary-600', shadow: 'shadow-secondary-200' }
            ].map((btn, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3 + i * 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  transition: { type: 'spring', stiffness: 300, damping: 20 }
                }} 
                whileTap={{ scale: 0.98 }}
                data-disable-cursor
              >
                <Link 
                  to={btn.to} 
                  className={`inline-block ${btn.bg} ${btn.hover} text-white px-10 sm:px-12 py-4 sm:py-5 rounded-full font-body text-base sm:text-lg shadow-soft hover:shadow-lg transition-all duration-500 backdrop-blur-sm border border-white/10 relative overflow-hidden group`}
                >
                  <span className="relative z-10">{btn.text}</span>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Enhanced feature cards with peaceful design */}
      <motion.div 
        ref={ref} 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl w-full mx-auto mb-24 px-4 sm:px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        {[
          { 
            to: '/relevia/about', 
            title: 'Explore Awareness', 
            desc: 'Deep dive into the roots of tranquility and mindfulness. Discover gentle techniques that have helped millions find inner peace.',
            icon: '🧘‍♀️',
            color: 'primary'
          },
          { 
            to: '/relevia/coping', 
            title: 'Soothing Methods', 
            desc: 'Discover gentle ways to ease anxiety and embrace calm. Practical tools you can use anywhere, anytime.',
            icon: '🌿',
            color: 'secondary'
          },
          { 
            to: '/relevia/medication', 
            title: 'Healing Insights', 
            desc: 'Clear and compassionate guidance on medication and wellness. Evidence-based information to help you make informed decisions.',
            icon: '💊',
            color: 'accent'
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            whileHover="hover"
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-8 sm:p-10 cursor-pointer shadow-soft hover:shadow-lg transition-all duration-700 hover:backdrop-blur-2xl group relative overflow-hidden transform-gpu"
            style={{ perspective: '1000px' }}
            data-disable-cursor
          >
            {/* Peaceful gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-50/30 to-${item.color === 'primary' ? 'secondary' : item.color === 'secondary' ? 'accent' : 'primary'}-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl`} />
            
            {/* Gentle floating elements */}
            <div className="absolute top-6 right-6 w-6 h-6 bg-white/15 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-gentlePulse" style={{ animationDelay: '0.2s' }} />
            <div className="absolute bottom-8 left-8 w-4 h-4 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-gentlePulse" style={{ animationDelay: '0.6s' }} />
            
            <Link to={item.to} className="relative z-10 block h-full">
              <motion.div 
                className="text-4xl sm:text-5xl mb-6 group-hover:scale-105 transition-transform duration-500"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {item.icon}
              </motion.div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading text-neutral-700 mb-6 group-hover:text-neutral-800 transition-colors leading-tight">
                {item.title}
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 font-body leading-relaxed group-hover:text-neutral-700 transition-colors mb-6">
                {item.desc}
              </p>
              
              {/* Gentle arrow indicator */}
              <motion.div
                className="flex items-center text-neutral-500 group-hover:text-neutral-700 transition-colors"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <span className="text-sm font-medium mr-2 font-body">Learn more</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Serene floating bottom decorations */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none overflow-hidden" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 4, duration: 2 }}
      >
        {/* Peaceful floating elements */}
        <motion.div 
          className="absolute left-10 sm:left-16 bottom-10 sm:bottom-16 w-2 sm:w-3 h-2 sm:h-3 bg-primary-200/50 rounded-full backdrop-blur-sm shadow-soft" 
          animate={{ 
            y: [0, -8, 0], 
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1]
          }} 
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} 
        />
        <motion.div 
          className="absolute right-14 sm:right-20 bottom-8 sm:bottom-12 w-3 sm:w-4 h-3 sm:h-4 bg-secondary-200/50 rounded-full backdrop-blur-sm shadow-soft" 
          animate={{ 
            y: [0, -12, 0], 
            opacity: [0.5, 0.8, 0.5],
            rotate: [0, 90, 180]
          }} 
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }} 
        />
        <motion.div 
          className="absolute left-1/2 bottom-6 sm:bottom-10 w-2 h-2 bg-accent-200/50 rounded-full backdrop-blur-sm shadow-soft" 
          animate={{ 
            y: [0, -6, 0], 
            opacity: [0.4, 0.7, 0.4],
            x: [0, 5, 0]
          }} 
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }} 
        />
        <motion.div 
          className="absolute left-1/4 bottom-12 w-1 h-1 bg-primary-300/60 rounded-full backdrop-blur-sm" 
          animate={{ 
            y: [0, -4, 0], 
            opacity: [0.3, 0.6, 0.3],
            scale: [0.8, 1.2, 0.8]
          }} 
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }} 
        />
        <motion.div 
          className="absolute right-1/3 bottom-14 w-2 h-2 bg-secondary-300/60 rounded-full backdrop-blur-sm" 
          animate={{ 
            y: [0, -10, 0], 
            opacity: [0.4, 0.7, 0.4],
            rotate: [0, -90, -180]
          }} 
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }} 
        />
      </motion.div>

      {/* Peaceful scroll indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: [1, 0.6, 1], y: [0, 3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ 
          opacity: useTransform(scrollY, [0, 300], [1, 0])
        }}
      >
        <div className="flex flex-col items-center text-neutral-400">
          <span className="text-xs font-body mb-2">Scroll gently</span>
          <motion.div
            className="w-0.5 h-8 bg-gradient-to-b from-primary-300 to-transparent rounded-full"
            animate={{ scaleY: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Interactive background elements with peaceful movement */}
      <motion.div
        className="fixed top-24 left-12 w-1 h-1 bg-primary-200/40 rounded-full"
        style={{
          y: useTransform(scrollY, [0, 1000], [0, 150]),
          opacity: useTransform(scrollY, [0, 400], [0.4, 0])
        }}
      />
      <motion.div
        className="fixed top-48 right-20 w-2 h-2 bg-secondary-200/40 rounded-full"
        style={{
          y: useTransform(scrollY, [0, 1000], [0, -100]),
          x: useTransform(scrollY, [0, 1000], [0, 30]),
          opacity: useTransform(scrollY, [0, 400], [0.5, 0])
        }}
      />
      <motion.div
        className="fixed bottom-1/3 left-24 w-0.5 h-0.5 bg-accent-200/40 rounded-full"
        style={{
          y: useTransform(scrollY, [0, 1000], [0, 80]),
          opacity: useTransform(scrollY, [0, 400], [0.3, 0])
        }}
      />

      {/* Mobile-specific peaceful enhancements */}
      <div className="md:hidden">
        <motion.div
          className="fixed top-4 left-4 text-xs text-neutral-400 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/40 shadow-soft"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1 }}
        >
          <span className="flex items-center">
            <span className="w-1 h-1 bg-primary-400 rounded-full mr-2 animate-gentlePulse"></span>
            Tap gently to explore
          </span>
        </motion.div>
      </div>

      {/* Enhanced accessibility features */}
      <div className="sr-only">
        <h1>Relevia - Your Safe Space for Mental Wellness</h1>
        <p>A peaceful sanctuary for anxiety relief, mindfulness, and emotional well-being. Find calm in the storm.</p>
      </div>
      
      {/* Improved skip link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-6 py-3 rounded-lg z-50 font-body font-medium shadow-soft border border-primary-500 hover:bg-primary-700 transition-colors duration-300"
        data-disable-cursor
      >
        Skip to main content
      </a>
      
      <div id="main-content" className="sr-only">Main content begins here</div>

      {/* Quick help button with peaceful styling */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.button
          className="quick-help-button w-12 h-12 bg-accent-500/80 hover:bg-accent-600/90 text-white rounded-full shadow-soft hover:shadow-lg transition-all duration-500 backdrop-blur-sm border border-white/20 flex items-center justify-center group"
          whileHover={{ 
            scale: 1.1, 
            rotate: 5,
            transition: { type: "spring", stiffness: 300, damping: 20 } 
          }}
          whileTap={{ scale: 0.95 }}
          data-disable-cursor
          aria-label="Quick help and resources"
        >
          <motion.span 
            className="text-lg"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            ?
          </motion.span>
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-secondary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gentlePulse" />
        </motion.button>
      </motion.div>

      {/* Ambient sound toggle (visual only) */}
      <motion.div
        className="fixed top-6 left-6 z-40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.button
          className="w-10 h-10 bg-white/60 hover:bg-white/80 rounded-full shadow-soft hover:shadow-lg transition-all duration-500 backdrop-blur-sm border border-white/40 flex items-center justify-center group"
          whileHover={{ 
            scale: 1.05,
            transition: { type: "spring", stiffness: 300, damping: 20 } 
          }}
          whileTap={{ scale: 0.98 }}
          data-disable-cursor
          aria-label="Toggle ambient sounds"
        >
          <motion.span 
            className="text-neutral-600 text-sm"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            🎵
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Progress indicator for breathing exercises */}
      <motion.div
        className="fixed left-6 top-1/2 transform -translate-y-1/2 z-30"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: showBreathing ? 0.6 : 0, x: showBreathing ? 0 : -10 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col items-center space-y-2">
          {[1, 2, 3, 4].map((step) => (
            <motion.div
              key={step}
              className="w-1 h-6 bg-primary-200/40 rounded-full"
              animate={{
                backgroundColor: [`rgba(186, 230, 253, 0.4)`, `rgba(186, 230, 253, 0.8)`, `rgba(186, 230, 253, 0.4)`]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: step * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
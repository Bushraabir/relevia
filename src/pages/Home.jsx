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

// Enhanced particle configuration for better performance and visual appeal
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
      attract: { distance: 150, duration: 0.4, factor: 3 }, 
      push: { quantity: 3 } 
    }
  },
  particles: {
    number: { value: 25, density: { enable: true, value_area: 1000 } },
    color: { value: ['#E0F2FE', '#F0F9FF', '#F8FAFC', '#F1F8E9'] },
    shape: { type: ['circle', 'triangle'] },
    opacity: { 
      value: 0.2, 
      random: { enable: true, minimumValue: 0.1 },
      animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false }
    },
    size: { 
      value: 2, 
      random: { enable: true, minimumValue: 0.5 },
      animation: { enable: true, speed: 2, minimumValue: 0.5, sync: false }
    },
    move: { 
      enable: true, 
      speed: 0.5, 
      direction: 'none', 
      random: true, 
      straight: false, 
      outModes: 'bounce',
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    },
    links: {
      enable: true,
      distance: 100,
      color: '#E0F2FE',
      opacity: 0.1,
      width: 1
    }
  },
  detectRetina: true
};

const particlesInit = async (main) => {
  await loadFull(main);
};

// Enhanced floating orbs with more dynamic behavior
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
    { id: 1, x: '8%', y: '75%', size: windowSize.width < 768 ? 16 : 24, color: 'bg-blue-200/40', delay: 0 },
    { id: 2, x: '85%', y: '65%', size: windowSize.width < 768 ? 20 : 32, color: 'bg-emerald-200/40', delay: 0.8 },
    { id: 3, x: '15%', y: '15%', size: windowSize.width < 768 ? 12 : 20, color: 'bg-indigo-200/40', delay: 1.2 },
    { id: 4, x: '75%', y: '20%', size: windowSize.width < 768 ? 18 : 28, color: 'bg-teal-200/40', delay: 0.4 },
    { id: 5, x: '45%', y: '85%', size: windowSize.width < 768 ? 14 : 22, color: 'bg-cyan-200/40', delay: 0.6 },
    { id: 6, x: '92%', y: '40%', size: windowSize.width < 768 ? 10 : 18, color: 'bg-sky-200/40', delay: 1.5 }
  ];
  
  return (
    <>
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full ${orb.color} backdrop-blur-sm shadow-lg`}
          style={{ 
            width: orb.size, 
            height: orb.size, 
            left: orb.x, 
            top: orb.y,
            filter: 'blur(0.5px)'
          }}
          animate={{ 
            y: [0, -15, 0], 
            x: [0, 10, 0], 
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 12 + orb.id, 
            repeat: Infinity, 
            delay: orb.delay, 
            ease: 'easeInOut' 
          }}
          whileHover={{ scale: 1.5, opacity: 0.9 }}
        />
      ))}
    </>
  );
};

// Enhanced interactive breathing circle
const BreathingCircle = ({ isVisible }) => {
  return (
    <motion.div
      className="fixed top-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-16 h-16 rounded-full bg-blue-200/30 backdrop-blur-md border border-blue-300/50 flex items-center justify-center cursor-pointer hover:bg-blue-200/50 transition-colors"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-blue-600 text-sm font-medium">Breathe</span>
      </motion.div>
    </motion.div>
  );
};

function Home() {
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  
  const yOffset = useTransform(scrollY, [0, 600], [0, 100]);
  const scaleHeader = useTransform(scrollY, [0, 600], [1, 0.95]);
  const opacityHeader = useTransform(scrollY, [0, 600], [1, 0.8]);
  const rotateOrbs = useTransform(scrollY, [0, 1000], [0, 360]);
  
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  // Mouse tracking for subtle parallax effects
  useEffect(() => {
    const updateMousePosition = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      setMousePosition({ 
        x: (clientX - innerWidth / 2) / innerWidth,
        y: (clientY - innerHeight / 2) / innerHeight 
      });
      
      mouseX.set((clientX - innerWidth / 2) / 50);
      mouseY.set((clientY - innerHeight / 2) / 50);
    };

    window.addEventListener('mousemove', updateMousePosition);
    setIsLoaded(true);

    // Show breathing helper after 5 seconds
    const timer = setTimeout(() => setShowBreathing(true), 5000);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      clearTimeout(timer);
    };
  }, [mouseX, mouseY]);

  // Enhanced animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 60, scale: 0.9, rotateX: -15 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      rotateX: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100
      } 
    },
    hover: { 
      y: -12, 
      scale: 1.05, 
      rotateX: 5,
      rotateY: 2,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 25 
      } 
    }
  };

  const headerTextVariants = {
    initial: { opacity: 0, y: -30, scale: 0.9 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        delay: 0.6, 
        duration: 1.4, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      } 
    }
  };

  const letterContainerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.8 }
    }
  };

  const letterVariants = {
    initial: { 
      opacity: 0, 
      y: 50, 
      rotateX: -90,
      scale: 0.5 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      } 
    }
  };

  const gradientSpring = useReactSpring({
    from: { backgroundPosition: '0% 50%' },
    to: { backgroundPosition: '100% 50%' },
    config: { duration: 15000 },
    loop: { reverse: true }
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Cursor />
      <BreathingCircle isVisible={showBreathing} />
      
      {/* Chatbot Component */}
      <Chatbot />
      
      {/* Enhanced particle system */}
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
      
      {/* Dynamic gradient background */}
      <animated.div
        style={{ 
          ...gradientSpring, 
          background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 20%, #f0f9ff 40%, #f1f8e9 60%, #fefce8 80%, #f3f4f6 100%)', 
          backgroundSize: '400% 400%' 
        }}
        className="absolute inset-0 z-0"
      />
      
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10 z-5" />
      
      <FloatingOrbs />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 pt-20 pb-32">
        
        {/* Enhanced heart animation with parallax */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8 relative"
          style={{
            x: springX,
            y: springY
          }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1], 
              opacity: [0.9, 1, 0.9],
              rotate: [0, 2, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            {/* Enhanced glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/40 via-emerald-100/40 to-cyan-100/40 rounded-full blur-3xl animate-pulse" />
            <div className="absolute inset-4 bg-gradient-to-r from-blue-50/60 to-emerald-50/60 rounded-full blur-2xl" />
            
            <Lottie 
              animationData={heartAnimation} 
              loop={true} 
              speed={0.3} 
              style={{ 
                width: window.innerWidth < 768 ? 280 : 380, 
                height: window.innerWidth < 768 ? 280 : 380 
              }} 
              className="relative z-10"
            />
          </motion.div>
        </motion.div>

        {/* Enhanced main heading with letter-by-letter animation */}
        <motion.div
          variants={letterContainerVariants}
          initial="initial"
          animate="animate"
          className="mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-bold bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-clip-text text-transparent text-center tracking-tight leading-tight">
            {["Hey", "friend", ",", "You're", "SAFE", "here"].map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-2 sm:mr-3 md:mr-5">
                {word.split('').map((letter, letterIndex) => (
                  <motion.span
                    key={letterIndex}
                    variants={letterVariants}
                    className="inline-block hover:scale-110 hover:text-blue-600 transition-all duration-300 cursor-default"
                    style={{ perspective: '1000px' }}
                    whileHover={{ 
                      y: -5, 
                      transition: { type: "spring", stiffness: 500 } 
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
                {wordIndex < 5 && <span className="mr-2 sm:mr-3 md:mr-5"> </span>}
              </span>
            ))}
          </h1>
        </motion.div>

        {/* Enhanced subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 2, duration: 1.2 }} 
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <p className="text-base sm:text-lg md:text-xl font-body text-slate-600/90 leading-relaxed">
            Let's focus on your next breath—and nothing more.
          </p>
          <motion.div
            className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-300 to-emerald-300 rounded-full mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 2.5, duration: 1 }}
          />
        </motion.div>

        {/* Enhanced letter content with better mobile optimization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white/60 backdrop-blur-2xl p-6 sm:p-8 md:p-12 lg:p-16 rounded-3xl shadow-2xl shadow-blue-100/30 max-w-4xl mx-auto my-16 sm:my-20 md:my-24 relative overflow-hidden border border-white/70
          before:content-[''] before:absolute before:top-0 before:left-8 sm:before:left-16 md:before:left-20 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-red-300 before:via-red-400 before:to-red-300 before:z-10
          after:content-[''] after:absolute after:top-8 sm:after:top-16 md:after:top-20 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-red-300 after:via-red-400 after:to-red-300 after:z-10 
          font-handwritten text-base sm:text-lg md:text-xl leading-relaxed transform-gpu"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            transform: `rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`
          }}
        >
          {/* Enhanced background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 left-8 w-32 h-32 bg-blue-200 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-12 right-12 w-28 h-28 bg-emerald-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-cyan-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          {/* Letter paragraphs with staggered animations */}
          {[
            "Hey buddy,\nI'm really sorry you're feeling like this right now. I just want you to know—you're gonna be okay. Seriously. This feeling? It'll pass. You're safe, you're not alone, and most importantly—you are enough, exactly as you are. No need to fix or change anything about yourself right now. Just breathe with me, okay? 🫶",
            
            "Find a cozy little spot—maybe your bed, your couch, even the floor if that's where you feel comfy. Wrap yourself up in something soft if you can. Now, hand on your heart, other on your belly. Deep breath in through your nose… 1… 2… 3… 4… hold it… and exhale slowly through your mouth… 6… 5… 4… 3… 2… 1… Nice. Let's do that a couple more times. You're doing amazing. 🌬️",
            
            "Now gently look around you—name three things you can see (maybe your pillow, a photo, your cup?), two things you can hear (the fan? birds? silence?), and one thing you can feel (your blanket, the floor, your breath). This is you coming back to the now. And right now? You're safe. 🧸🪷"
          ].map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.9, 
                ease: "easeOut" 
              }}
              className=" mt-20 mb-6 ml-6 sm:ml-12 md:ml-16 text-slate-700 hover:text-slate-800 transition-colors duration-300"
              style={{ whiteSpace: 'pre-line' }}
            >
              {paragraph}
            </motion.p>
          ))}

          {/* Enhanced affirmation box */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.9, ease: "easeOut" }}
            className="mb-6 ml-6 sm:ml-12 md:ml-16 p-4 sm:p-6 bg-gradient-to-r from-blue-50/80 to-emerald-50/80 rounded-2xl border border-blue-100/50 hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <p className="italic text-slate-600 text-center font-medium mb-2">
              Whisper this to yourself (or say it out loud if you want!):
            </p>
            <motion.p 
              className="text-slate-700 font-semibold text-center"
              animate={{ 
                scale: [1, 1.02, 1],
                opacity: [0.9, 1, 0.9]
              }}
              transition={{ duration: 3, repeat: Infinity }}
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
              initial={{ opacity: 0, x: (index + 3) % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: (index + 3) * 0.15, 
                duration: 0.9, 
                ease: "easeOut" 
              }}
              className="mb-6 ml-6 sm:ml-12 md:ml-16 text-slate-700 hover:text-slate-800 transition-colors duration-300"
            >
              {paragraph}
            </motion.p>
          ))}

          {/* Enhanced signature */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.9, duration: 0.9, ease: "easeOut" }}
            className="ml-6 sm:ml-12 md:ml-16 p-4 bg-gradient-to-r from-yellow-50/90 to-amber-50/90 rounded-2xl border border-yellow-200/60 hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <p className="font-bold text-slate-700 text-center">
              Big warm hug, <br />
              <span className="text-amber-600">Your Friend</span> <br />
              <motion.span 
                className="text-amber-700"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Relevia 💛
              </motion.span>
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced call-to-action section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2 }} 
          className="text-center mb-16"
          viewport={{ once: true }}
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading text-slate-700 mb-8 font-medium"
          >
            Let's begin the journey to calm...
          </motion.h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            {[
              { to: '/relevia/about', text: 'Discover Resources', bg: 'bg-blue-500', hover: 'hover:bg-blue-600', shadow: 'shadow-blue-200' },
              { to: '/relevia/contact', text: 'Connect With Us', bg: 'bg-emerald-500', hover: 'hover:bg-emerald-600', shadow: 'shadow-emerald-200' }
            ].map((btn, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 + i * 0.2 }}
                whileHover={{ 
                  scale: 1.08, 
                  y: -4,
                  transition: { type: 'spring', stiffness: 400, damping: 17 }
                }} 
                whileTap={{ scale: 0.96 }}
              >
                <Link 
                  to={btn.to} 
                  className={`inline-block ${btn.bg} ${btn.hover} text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-body text-base sm:text-lg shadow-lg ${btn.shadow}/50 hover:shadow-xl hover:${btn.shadow}/70 transition-all duration-300 backdrop-blur-sm border border-white/20 relative overflow-hidden group`}
                >
                  <span className="relative z-10">{btn.text}</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Enhanced feature cards grid */}
      <motion.div 
        ref={ref} 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl w-full mx-auto mb-20 px-4 sm:px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {[
          { 
            to: '/relevia/about', 
            title: 'Explore Awareness', 
            desc: 'Deep dive into the roots of tranquility and mindfulness. Discover techniques that have helped millions find inner peace.',
            icon: '🧘‍♀️',
            color: 'blue'
          },
          { 
            to: '/relevia/coping', 
            title: 'Soothing Methods', 
            desc: 'Discover gentle ways to ease anxiety and embrace calm. Practical tools you can use anywhere, anytime.',
            icon: '🌿',
            color: 'emerald'
          },
          { 
            to: '/relevia/medication', 
            title: 'Healing Insights', 
            desc: 'Clear and compassionate guidance on medication and wellness. Evidence-based information to help you make informed decisions.',
            icon: '💊',
            color: 'indigo'
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            whileHover="hover"
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-white/50 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 sm:p-8 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:backdrop-blur-lg group relative overflow-hidden transform-gpu"
            style={{ perspective: '1000px' }}
          >
            {/* Enhanced gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-50/40 to-${item.color === 'blue' ? 'cyan' : item.color === 'emerald' ? 'teal' : 'purple'}-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
            
            {/* Animated background shapes */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="absolute bottom-6 left-6 w-6 h-6 bg-white/15 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-bounce" style={{ animationDelay: '0.3s' }} />
            
            <Link to={item.to} className="relative z-10 block h-full">
              <motion.div 
                className="text-3xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 10 }}
              >
                {item.icon}
              </motion.div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-heading text-slate-700 mb-4 group-hover:text-slate-800 transition-colors leading-tight">
                {item.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-body leading-relaxed group-hover:text-slate-700 transition-colors">
                {item.desc}
              </p>
              
              {/* Interactive arrow */}
              <motion.div
                className="mt-4 flex items-center text-slate-500 group-hover:text-slate-700 transition-colors"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <span className="text-sm font-medium mr-2">Learn more</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced floating bottom decorations */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none overflow-hidden" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 3 }}
      >
        {/* More diverse floating elements */}
        <motion.div 
          className="absolute left-8 sm:left-12 bottom-8 sm:bottom-12 w-3 sm:w-4 h-3 sm:h-4 bg-blue-300/70 rounded-full backdrop-blur-sm shadow-lg" 
          animate={{ 
            y: [0, -15, 0], 
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.2, 1]
          }} 
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} 
        />
        <motion.div 
          className="absolute right-12 sm:right-16 bottom-6 sm:bottom-10 w-4 sm:w-5 h-4 sm:h-5 bg-emerald-300/70 rounded-full backdrop-blur-sm shadow-lg" 
          animate={{ 
            y: [0, -20, 0], 
            opacity: [0.6, 1, 0.6],
            rotate: [0, 180, 360]
          }} 
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} 
        />
        <motion.div 
          className="absolute left-1/2 bottom-4 sm:bottom-8 w-2 sm:w-3 h-2 sm:h-3 bg-indigo-300/70 rounded-full backdrop-blur-sm shadow-lg" 
          animate={{ 
            y: [0, -12, 0], 
            opacity: [0.6, 1, 0.6],
            x: [0, 10, 0]
          }} 
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }} 
        />
        <motion.div 
          className="absolute left-1/4 bottom-10 w-2 h-2 bg-cyan-300/70 rounded-full backdrop-blur-sm shadow-lg" 
          animate={{ 
            y: [0, -8, 0], 
            opacity: [0.4, 0.9, 0.4],
            scale: [0.8, 1.3, 0.8]
          }} 
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} 
        />
        <motion.div 
          className="absolute right-1/4 bottom-14 w-3 h-3 bg-teal-300/70 rounded-full backdrop-blur-sm shadow-lg" 
          animate={{ 
            y: [0, -18, 0], 
            opacity: [0.5, 1, 0.5],
            rotate: [0, -180, -360]
          }} 
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }} 
        />
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: [1, 0.5, 1], y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ 
          opacity: useTransform(scrollY, [0, 200], [1, 0])
        }}
      >

      </motion.div>

      {/* Interactive background elements that respond to scroll */}
      <motion.div
        className="fixed top-20 left-10 w-2 h-2 bg-blue-200/60 rounded-full"
        style={{
          y: useTransform(scrollY, [0, 1000], [0, 200]),
          opacity: useTransform(scrollY, [0, 500], [0.6, 0])
        }}
      />
      <motion.div
        className="fixed top-40 right-16 w-3 h-3 bg-emerald-200/60 rounded-full"
        style={{
          y: useTransform(scrollY, [0, 1000], [0, -150]),
          x: useTransform(scrollY, [0, 1000], [0, 50]),
          opacity: useTransform(scrollY, [0, 500], [0.7, 0])
        }}
      />
      <motion.div
        className="fixed bottom-1/3 left-20 w-1 h-1 bg-indigo-200/60 rounded-full"
        style={{
          y: useTransform(scrollY, [0, 1000], [0, 100]),
          opacity: useTransform(scrollY, [0, 500], [0.5, 0])
        }}
      />

      {/* Mobile-specific enhancements */}
      <div className="md:hidden">
        {/* Mobile touch feedback */}
        <motion.div
          className="fixed top-4 left-4 text-xs text-slate-400 bg-white/70 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
        >
          Tap to interact
        </motion.div>
      </div>

      {/* Accessibility improvements */}
      <div className="sr-only">
        <h1>Relevia - Mental Health Support</h1>
        <p>A safe space for anxiety relief and mental wellness</p>
      </div>
      
      {/* Skip link for keyboard navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      
      <div id="main-content" className="sr-only">Main content starts here</div>
    </div>
  );
}

export default Home;
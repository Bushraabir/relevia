import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLungs, FaEye, FaHandSparkles, FaImages, FaSmile, FaRunning, FaPen } from 'react-icons/fa';
import { Player } from '@lottiefiles/react-lottie-player';
import copingAnimation from '../assets/animation/coping.json';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
      ease: 'easeOut',
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotate: -5, backgroundColor: 'rgba(255,255,255,0)' },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    backgroundColor: 'rgba(255,255,255,0.2)',
    transition: { duration: 1, ease: 'easeOut' },
  },
  hover: {
    scale: 1.05,
    backgroundColor: 'rgba(255,255,255,0.3)',
    boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.15)',
    borderColor: '#2c7a7b',
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
  tap: { scale: 0.95, transition: { duration: 0.2 } },
};

const iconVariants = {
  show: { scale: 1 },
  hover: {
    scale: [1, 1.1, 1],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

const blobColors = ['bg-blue-200/30', 'bg-purple-200/30', 'bg-teal-200/30', 'bg-green-200/30'];

const MotionFaLungs = motion(FaLungs);
const MotionFaEye = motion(FaEye);
const MotionFaHandSparkles = motion(FaHandSparkles);
const MotionFaImages = motion(FaImages);
const MotionFaSmile = motion(FaSmile);
const MotionFaRunning = motion(FaRunning);
const MotionFaPen = motion(FaPen);

const techniques = [
  {
    id: 'breathing',
    title: 'Deep Breathing',
    description: 'Try the 4-4-4 breathing technique to help calm your nervous system.',
    icon: <MotionFaLungs className="text-5xl text-teal-600" variants={iconVariants} />,
    path: '/relevia/coping/breathing',
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness',
    description: 'You can ground yourself with the 5-4-3-2-1 sensory technique.',
    icon: <MotionFaEye className="text-5xl text-teal-600" variants={iconVariants} />,
    path: '/relevia/coping/mindfulness',
  },
  {
    id: 'relaxation',
    title: 'Progressive Relaxation',
    description: 'Let’s release tension together by tensing and relaxing your muscles.',
    icon: <MotionFaHandSparkles className="text-5xl text-teal-600" variants={iconVariants} />,
    path: '/relevia/coping/relaxation',
  },
  {
    id: 'visualization',
    title: 'Visualization',
    description: 'Picture a peaceful scene to help soothe your mind.',
    icon: <MotionFaImages className="text-5xl text-teal-600" variants={iconVariants} />,
    path: '/relevia/coping/visualization',
  },
  {
    id: 'affirmations',
    title: 'Positive Affirmations',
    description: 'Try repeating calming phrases to help shift your mindset.',
    icon: <MotionFaSmile className="text-5xl text-teal-600" variants={iconVariants} />,
    path: '/relevia/coping/affirmations',
  },
  {
    id: 'activity',
    title: 'Physical Activity',
    description: 'Engage in some light movement to help release stress.',
    icon: <MotionFaRunning className="text-5xl text-teal-600" variants={iconVariants} />,
    path: '/relevia/coping/activity',
  },
  {
    id: 'journaling',
    title: 'Journaling',
    description: 'Writing down your thoughts can help you process your emotions.',
    icon: <MotionFaPen className="text-5xl text-teal-600" variants={iconVariants} />,
    path: '/relevia/coping/journaling',
  },
];

const Button = ({ to, text, colorVariants }) => {
  return (
    <motion.div
      variants={{
        initial: { scale: 0 },
        visible: { scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
        hover: { y: -6, transition: { duration: 0.5, ease: 'easeInOut' } },
        tap: { y: 2, scale: 0.95, transition: { duration: 0.2, ease: 'easeInOut' } }
      }}
      initial="initial"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      className="relative"
    >
      <motion.div
        className="absolute inset-0 rounded-full z-0"
        variants={{
          visible: { boxShadow: `0 0 0 ${colorVariants.glow}` },
          hover: { boxShadow: `0 0 20px 4px ${colorVariants.glow}`, transition: { duration: 0.5, ease: 'easeInOut' } }
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        variants={{
          visible: { scale: 1, opacity: 1 },
          hover: { scale: 1.2, opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }
        }}
      />
      <Link to={to} className="relative z-10 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full shadow-lg text-base sm:text-lg font-semibold block">
        <motion.div
          variants={{
            visible: { y: 0, backgroundColor: colorVariants.bg, boxShadow: `0 4px 12px ${colorVariants.shadow}` },
            hover: {
              y: -4,
              backgroundColor: colorVariants.hoverBg,
              boxShadow: `0 12px 32px ${colorVariants.shadowHover}`,
              transition: { duration: 0.5, ease: 'easeInOut' }
            },
            tap: {
              y: 2,
              scale: 0.98,
              backgroundColor: colorVariants.tapBg,
              boxShadow: `0 2px 8px ${colorVariants.shadowTap}`,
              transition: { duration: 0.2, ease: 'easeInOut' }
            }
          }}
          className="px-6 sm:px-10 py-3 sm:py-4 rounded-full"
        >
          <motion.span
            className="relative z-20"
            variants={{
              hover: {
                letterSpacing: '0.05em',
                textShadow: '0 2px 8px rgba(255,255,255,0.3)',
                transition: { duration: 0.5, ease: 'easeInOut' }
              }
            }}
          >
            {text}
          </motion.span>
          <motion.div
            className="absolute inset-0"
            variants={{
              hover: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute ${colorVariants.particle} rounded-full`}
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                }}
                variants={{
                  visible: { scale: 0, opacity: 0 },
                  hover: {
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                    x: [0, (Math.random() - 0.5) * 40, 0],
                    y: [0, (Math.random() - 0.5) * 40, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }
                  }
                }}
              />
            ))}
          </motion.div>
          <motion.div
            className="absolute inset-0"
            initial={{ x: '-100%' }}
            variants={{
              hover: {
                x: '200%',
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear'
                }
              }
            }}
            style={{
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)'
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

function Coping() {
  const [activeTechnique, setActiveTechnique] = useState(null);

  const resourcesColors = {
    bg: '#0d9488',
    hoverBg: '#115e59',
    tapBg: '#0c7a6e',
    shadow: 'rgba(13, 148, 136, 0.25)',
    shadowHover: 'rgba(13, 148, 136, 0.4)',
    shadowTap: 'rgba(13, 148, 136, 0.2)',
    glow: 'rgba(13, 148, 136, 0.5)',
    particle: 'bg-white/40'
  };

  const contactColors = {
    bg: '#7c3aed',
    hoverBg: '#6d28d9',
    tapBg: '#5b21b6',
    shadow: 'rgba(124, 58, 237, 0.25)',
    shadowHover: 'rgba(124, 58, 237, 0.4)',
    shadowTap: 'rgba(124, 58, 237, 0.2)',
    glow: 'rgba(124, 58, 237, 0.5)',
    particle: 'bg-purple-300/40'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-purple-100 pt-28 pb-20 relative overflow-hidden">
      {blobColors.map((color, index) => (
        <motion.div
          key={index}
          className={`absolute w-80 h-80 ${color} rounded-full blur-3xl`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            rotate: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: 20 + Math.random() * 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      <div className="container mx-auto px-4 sm:px-8 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl font-bold text-gray-900 text-center mb-8 tracking-tight"
        >
          Coping Techniques
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: 'easeOut' }}
          className="text-gray-700 text-lg sm:text-xl text-center max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Explore these gentle techniques to help you find calm and feel empowered when things feel overwhelming.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-full sm:w-1/2 flex justify-center"
          >
            <Player
              autoplay
              loop
              src={copingAnimation}
              style={{ height: '600px', width: '600px', maxWidth: '100%' }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
            className="w-full sm:w-1/2 text-center"
          >
            <motion.h2
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6"
            >
              Need Quick Relief?
            </motion.h2>
            <p className="text-gray-700 text-lg mb-8">Let’s start with guided breathing to help you find peace in seconds.</p>
            <Link to="/relevia/coping/breathing">
              <motion.button
                variants={{
                  initial: { 
                    backgroundColor: '#0d9488',
                    y: 0
                  },
                  hover: {
                    backgroundColor: '#115e59',
                    transition: {
                      duration: 0.6,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  },
                  tap: {
                    y: 4
                  }
                }}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="relative bg-teal-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-semibold overflow-hidden"
              >
                <motion.div 
                  className="absolute inset-0 bg-white/10"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0, 0.8, 0],
                    borderRadius: ["50%", "40%", "50%"],
                    transition: {
                      duration: 2.4,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }
                  }}
                />
                <motion.span
                  className="relative z-20"
                  animate={{
                    y: [-2, 2, -2],
                    textShadow: [
                      '0 2px 8px rgba(255,255,255,0)',
                      '0 4px 24px rgba(255,255,255,0.8)',
                      '0 2px 8px rgba(255,255,255,0)'
                    ],
                    color: ['#f0fdfa', '#ccfbf1', '#f0fdfa']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  Start Breathing Exercise
                </motion.span>
                <motion.div
                  className="absolute inset-0 border-4 border-white/40 rounded-full"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360],
                    transition: {
                      duration: 2.8,
                      repeat: Infinity,
                      ease: 'anticipate'
                    }
                  }}
                />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    transition: {
                      staggerChildren: 0.2
                    }
                  }}
                >
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-white/50 rounded-full"
                      style={{
                        width: '10px',
                        height: '12px',
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: [0, 1.4, 0],
                        opacity: [0, 1, 0],
                        x: [-20, 0, 20],
                        y: [10, -10, 10]
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: 'circInOut'
                      }}
                    />
                  ))}
                </motion.div>
                <motion.div
                  className="absolute inset-0 border-[6px] border-white/30 rounded-full"
                  animate={{
                    scale: [1, 2.2, 1],
                    opacity: [0, 1, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }
                  }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {techniques.map((technique) => (
            <Link to={technique.path} key={technique.id}>
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                className="backdrop-blur-lg border border-white/30 p-8 rounded-3xl shadow-lg cursor-pointer flex flex-col items-start overflow-hidden relative"
              >
                <div className="flex items-center mb-6 z-10">
                  {technique.icon}
                  <h3 className="text-2xl font-semibold text-teal-700 ml-5">{technique.title}</h3>
                </div>
                <p className="text-gray-700 text-lg flex-grow z-10">{technique.description}</p>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="mt-6 text-teal-600 font-semibold text-lg flex items-center z-10"
                >
                  Explore Now
                  <motion.span
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="ml-3 text-2xl"
                  >
                    →
                  </motion.span>
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1, ease: 'easeOut' }}
          className="text-center mt-24"
        >
          <motion.h2
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-4xl font-semibold text-gray-900 mb-8"
          >
            Looking for More?
          </motion.h2>
          <p className="text-gray-700 text-lg mb-10">Access additional resources or reach out for support.</p>
          <div className="flex justify-center gap-8">
            <Button to="/relevia/about" text="Resources" colorVariants={resourcesColors} />
            <Button to="/relevia/contact" text="Contact Us" colorVariants={contactColors} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Coping;
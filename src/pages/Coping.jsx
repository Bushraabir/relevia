import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLungs, FaEye, FaHandSparkles, FaImages, FaSmile, FaRunning, FaPen } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      staggerChildren: 0.2, 
      delayChildren: 0.4, 
      ease: 'easeOut' 
    } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, rotate: -5 },
  show: { 
    opacity: 1, 
    y: 0, 
    rotate: 0, 
    transition: { 
      duration: 1, 
      ease: 'easeOut' 
    } 
  },
  hover: { 
    scale: 1.08, 
    rotate: 2, 
    boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.15)', 
    transition: { 
      duration: 0.4, 
      ease: 'easeInOut' 
    } 
  },
  tap: { 
    scale: 0.95, 
    transition: { 
      duration: 0.2 
    } 
  }
};

const techniques = [
  {
    id: 'breathing',
    title: 'Deep Breathing',
    description: 'Regulate your breath with the 4-4-4 technique to calm your nervous system.',
    icon: <FaLungs className="text-5xl text-teal-600" />,
    path: '/coping/breathing',
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness',
    description: 'Ground yourself using the 5-4-3-2-1 sensory technique.',
    icon: <FaEye className="text-5xl text-teal-600" />,
    path: '/coping/mindfulness',
  },
  {
    id: 'relaxation',
    title: 'Progressive Relaxation',
    description: 'Release tension by tensing and relaxing muscle groups.',
    icon: <FaHandSparkles className="text-5xl text-teal-600" />,
    path: '/coping/relaxation',
  },
  {
    id: 'visualization',
    title: 'Visualization',
    description: 'Imagine a peaceful scene to soothe your mind.',
    icon: <FaImages className="text-5xl text-teal-600" />,
    path: '/coping/visualization',
  },
  {
    id: 'affirmations',
    title: 'Positive Affirmations',
    description: 'Repeat calming phrases to shift your mindset.',
    icon: <FaSmile className="text-5xl text-teal-600" />,
    path: '/coping/affirmations',
  },
  {
    id: 'activity',
    title: 'Physical Activity',
    description: 'Engage in light movement to release stress.',
    icon: <FaRunning className="text-5xl text-teal-600" />,
    path: '/coping/activity',
  },
  {
    id: 'journaling',
    title: 'Journaling',
    description: 'Write your thoughts to process emotions.',
    icon: <FaPen className="text-5xl text-teal-600" />,
    path: '/coping/journaling',
  },
];

function Coping() {
  const [activeTechnique, setActiveTechnique] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-purple-100 pt-28 pb-20 relative overflow-hidden">
      <motion.div
        animate={{ x: [-120, 120, -120], y: [-60, 60, -60], rotate: [0, 10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-0 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [120, -120, 120], y: [60, -60, 60], rotate: [0, -10, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"
      />
      <div className="container mx-auto px-8 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-6xl font-bold text-gray-900 text-center mb-8 tracking-tight"
        >
          Coping Techniques
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: 'easeOut' }}
          className="text-gray-700 text-xl text-center max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Discover soothing techniques designed to restore calm and empower you during moments of overwhelm.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
          className="text-center mb-20 bg-white/20 backdrop-blur-xl p-10 rounded-3xl border border-white/30 shadow-xl"
        >
          <motion.h2
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-4xl font-semibold text-gray-900 mb-6"
          >
            Seeking Instant Relief?
          </motion.h2>
          <p className="text-gray-700 text-lg mb-8">Start with guided breathing to find peace in seconds.</p>
          <Link to="/coping/breathing">
          <motion.button
          
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.02, 1], transition: { duration: 2, repeat: Infinity } }}
         
            whileHover={{ scale: 1.1, rotate: 1, boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)' }}
          
            whileTap={{ scale: 0.95 }}
            className="bg-teal-600 text-white px-10 py-4 rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 text-xl font-semibold"
          >
            Try Breathing Now
          </motion.button>
        </Link>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {techniques.map(technique => (
            <Link to={technique.path} key={technique.id}>
              <motion.div
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-white/30 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-lg cursor-pointer flex flex-col items-start overflow-hidden relative"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-teal-200/20 rounded-3xl"
                />
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
            <motion.div
              whileHover={{ scale: 1.15, rotate: 3 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/resources" className="bg-teal-600 text-white px-10 py-4 rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 text-lg font-semibold">
                Resources
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.15, rotate: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/contact" className="bg-purple-600 text-white px-10 py-4 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 text-lg font-semibold">
                Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Coping;
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function QuickHelpButton() {
  const buttonVariants = {
    idle: {
      width: 64,
      height: 64,
      borderRadius: 9999,
    },
    hover: {
      width: 192,
      height: 64,
      borderRadius: 16,
    },
  };

  const iconVariants = {
    idle: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      },
    },
    hover: {
      rotate: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const textVariants = {
    idle: {
      opacity: 0,
      x: -10,
    },
    hover: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <Link to="/relevia/coping" className="fixed bottom-6 right-6 z-50">
      <motion.div
        className="relative flex items-center justify-center bg-gradient-to-br from-accent-500 to-accent-600 shadow-lg overflow-hidden"
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        layout
      >
        <motion.div
          className="absolute -inset-2 bg-accent-300/20 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -inset-4 bg-accent-200/10 rounded-full"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-accent-100/50 rounded-full"
            initial={{ opacity: 0, y: 0 }}
            animate={{
              y: -30,
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeOut",
            }}
            style={{
              left: `${(i - 1) * 20}px`,
              bottom: -10,
            }}
          />
        ))}
        <motion.div variants={iconVariants}>
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </motion.div>
        <motion.span
          variants={textVariants}
          className="text-white font-body font-bold text-xl tracking-wider ml-4 whitespace-nowrap"
        >
          Quick Help
        </motion.span>
      </motion.div>
    </Link>
  );
}

export default QuickHelpButton;
import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaBars } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();

  const navLinks = [
    { to: '/relevia/about', label: 'What is it actually?' },
    { to: '/relevia/coping', label: 'Coping Techniques' },
    { to: '/relevia/medication', label: 'Medication' },
    { to: '/relevia/contact', label: 'Contact' },
  ];

  const menuVariants = {
    closed: { 
      opacity: 0, 
      y: '-100%',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        when: 'afterChildren',
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (isOpen) {
      controls.start('open');
    } else {
      controls.start('closed');
    }
  }, [isOpen, controls]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-gradient-to-r from-teal-500/50 via-blue-500/50 to-purple-500/50 p-4 fixed w-full top-0 z-20 shadow-soft "
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/relevia/"
          className="text-neutral-50 text-2xl font-heading font-bold tracking-wide"
        >
          Relevia
        </Link>

        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <motion.div
              key={link.to}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={link.to}
                className="text-neutral-50 font-body text-lg hover:text-teal-200 transition duration-300"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="md:hidden text-neutral-50"
        >
          <FaBars size={24} />
        </motion.button>
      </div>

      <motion.div
        variants={menuVariants}
        initial="closed"
        animate={controls}
        className="fixed inset-0 bg-gradient-to-br from-teal-400/50 via-blue-400/50 to-purple-400/50 flex flex-col items-center justify-center space-y-8 z-30 "
      >
        {navLinks.map((link) => (
          <motion.div key={link.to} variants={linkVariants}>
            <Link
              to={link.to}
              className="text-neutral-50 text-3xl font-body tracking-wide"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-neutral-50"
          variants={linkVariants}
        >
          <FaTimes size={28} />
        </motion.button>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;
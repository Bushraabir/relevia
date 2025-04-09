import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faEnvelope, faPhone, faLink } from '@fortawesome/free-solid-svg-icons';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.4,
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, rotate: -15, skewY: 5 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotate: 0,
    skewY: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
      mass: 0.8
    }
  }
};

const contactListVariants = {
  hidden: { opacity: 0, scale: 0.9, rotateX: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      staggerChildren: 0.25,
      type: "tween",
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const contactItems = [
  {
    icon: <FontAwesomeIcon icon={faGlobe} className="h-6 w-6 text-primary-500" />,
    text: "Visit our website",
    link: "https://bushraabir.github.io/empowereducation"
  },
  {
    icon: <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6 text-primary-500" />,
    text: "Email us",
    link: "mailto:empoweredhelpline@gmail.com"
  },
  {
    icon: <FontAwesomeIcon icon={faPhone} className="h-6 w-6 text-primary-500" />,
    text: "WhatsApp us",
    link: "https://wa.me/01340100676"
  },
  {
    icon: <FontAwesomeIcon icon={faLink} className="h-6 w-6 text-primary-500" />,
    text: "Follow us on Facebook",
    link: "https://www.facebook.com/profile.php?id=61569631168287"
  }
];

function Contact() {
  return (
    <motion.section 
      className="min-h-screen bg-gradient-to-br from-neutral-100 to-neutral-50 pt-20 pb-8 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible" 
        className="container mx-auto p-6 max-w-4xl"
      >
        <motion.h1 
          variants={itemVariants} 
          className="text-4xl md:text-5xl font-heading font-bold mb-8 text-neutral-800 tracking-tight"
          whileHover={{ scale: 1.02, color: "#0369A1" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Contact
        </motion.h1>
        <motion.p 
          variants={itemVariants} 
          className="text-lg md:text-xl font-body text-neutral-700 mb-10 leading-relaxed max-w-2xl mx-auto"
        >
          This is a small effort from EmpowerED Global to help people overcome panic attacks. Many people suffer from this but cannot address their emotions properly or have no idea how to deal with them. We aim to assist in addressing this issue. If you liked our work, want to give an appreciation, or want to collaborate with us, please reach out through the contacts below.
        </motion.p>
        <motion.div 
          variants={contactListVariants} 
          initial="hidden" 
          animate="visible" 
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
        >
          {contactItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.08, 
                rotate: 3, 
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
                backgroundColor: "#E0F2FE"
              }}
              whileTap={{ scale: 0.92, rotate: -3 }}
              transition={{ type: "spring", stiffness: 250, damping: 15 }}
              className="group flex items-center space-x-4 p-4 rounded-xl bg-white shadow-soft border border-neutral-200"
            >
              {React.cloneElement(item.icon, { 
                className: 'h-6 w-6 text-primary-500 group-hover:text-primary-700 transition-all duration-300 transform group-hover:scale-110' 
              })}
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary-500 font-body text-lg hover:underline group-hover:text-primary-600 transition-colors duration-300"
              >
                {item.text}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Contact;
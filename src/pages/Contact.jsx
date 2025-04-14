import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faEnvelope, faPhone, faLink } from '@fortawesome/free-solid-svg-icons';
import abirImg from '../assets/images/abir.jpg';
import bushraImg from '../assets/images/bushra.png';

const FloatingBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => {
        const x = useTransform(mouseX, [0, window.innerWidth], [-10, 10]);
        const y = useTransform(mouseY, [0, window.innerHeight], [-10, 10]);
        return (
          <motion.div
            key={i}
            className="absolute bg-primary-100/30 rounded-full blur-lg"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              x,
              y,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
};

const StoryCard = ({ name, image, story }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const variants = {
    hidden: { opacity: 0, rotateY: 90 },
    visible: { opacity: 1, rotateY: 0 },
  };

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-neutral-200"
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ type: 'spring', stiffness: 80, damping: 10 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center space-x-4">
        <motion.img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover shadow-md"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        <h3 className="text-2xl font-handwritten text-primary-600">{name}</h3>
      </div>
      <motion.button
        className="mt-4 text-primary-500 font-body hover:text-primary-700"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {isExpanded ? 'Hide story' : 'Read story'}
      </motion.button>
      <AnimatePresence>
        {isExpanded && (
          <motion.p
            className="mt-4 text-neutral-700 leading-relaxed"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {story}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ContactItem = ({ icon, text, link }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-md border border-neutral-200 hover:bg-primary-50 transition-all duration-300"
    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)' }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 200 }}
  >
    <FontAwesomeIcon icon={icon} className="h-6 w-6 text-primary-500" />
    <span className="text-primary-600 font-medium text-lg">{text}</span>
  </motion.a>
);

function Contact() {
  const contactItems = [
    {
      icon: faGlobe,
      text: 'Visit our website',
      link: 'https://bushraabir.github.io/empowereducation',
    },
    {
      icon: faEnvelope,
      text: 'Email us',
      link: 'mailto:empoweredhelpline@gmail.com',
    },
    {
      icon: faPhone,
      text: 'WhatsApp us',
      link: 'https://wa.me/01340100676',
    },
    {
      icon: faLink,
      text: 'Follow us on Facebook',
      link: 'https://www.facebook.com/profile.php?id=61569631168287',
    },
  ];

  const stories = [
    {
      name: 'Abir’s Experience',
      image: abirImg,
      story: `I’ve experienced anxiety and panic attacks myself. At times, I felt suffocated, with extreme tingling headaches. It was like my brain was on fire—my thoughts running wild, my body forgetting how to breathe, and my mental energy dropping to almost nothing.
      
      I remember sleepless nights, moments when I felt like I was falling apart from the inside. I had black circles under my eyes, felt extremely hungry and full at the same time. Everything felt wrong, like my body and mind were not mine anymore.
      
      I tried talking to people, but it didn’t help. Most would just say, “Calm down,” and that never works. It made me feel even more alone, like no one really understood. I don’t want anyone else to go through that silence and confusion.
      
      Even now, I still deal with anxiety from time to time. But I’ve stopped hiding from it. Now, I want to face it—with you, and with all of us—together.
      Relivia is my way of saying:
      
      “I’ve been there. I still am sometimes. And I built this space for all of us.”`,
    },
    {
      name: 'Bushra’s Experience',
      image: bushraImg,
      story: `Mental health has always been a quiet battle for me. I often felt sharp pain in my chest, sudden mood swings, and endless pressure. The stress, the racing thoughts—they didn’t always show, but they were always there, quietly hurting.
      
      I used to think I had to deal with it all alone. I tried talking to people, but instead of helping, they said things that made me feel worse. When people don’t understand you, you start to believe your feelings don’t matter. That’s the part that hurts the most.
      
      Sometimes the pain was so heavy, I honestly thought I might die. I’m still healing. I’m not fully okay yet. But I’m trying.
      
      We created Relivia because I know what it feels like to carry all that pain in silence.
      I wanted to help build a space that doesn’t say “Get over it,” but gently says:
      
      “It’s okay. You’re safe here. Take your time.”
      
      Relivia is personal to me.
      It’s not just a project—it’s a small light for anyone walking through a dark tunnel.`,
    },
  ];

  const introParagraphs = [
    "We created Relivia with a dream in our hearts—to help people who feel lost, anxious, or overwhelmed. We’ve seen and experienced how hard panic attacks can be. Sometimes, it feels like the neurons in your brain are frying. Everything feels too much, and many people don’t know where to turn or what to do when that happens. That’s why we wanted to build something simple, free, and filled with gentle, daily guidance—so we can all take small steps toward making the world a better place.",
    "Relivia is not just a website. It’s a quiet, safe space for anyone who needs to breathe and feel okay again. We’re not just developers—we’re human beings who want others to feel safe, supported, and heard. Whether it’s through calming sounds, guided meditations, or simple breathing tools, Relivia is built with love and care, with every person in mind.",
    "We hope that when someone visits Relivia during a hard moment, they feel a little lighter. A little stronger. And most importantly—not alone."
  ];

  return (
    <motion.section
      className="min-h-screen bg-gradient-to-br from-neutral-100 to-neutral-50 pt-20 pb-8 overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <FloatingBackground />
      <div className="container mx-auto p-6 max-w-4xl relative z-10">
        <motion.h1
          className="text-5xl md:text-6xl font-handwritten text-primary-700 text-center mb-8"
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut', type: 'spring', stiffness: 100 }}
        >
          Contact
        </motion.h1>
        <div className="mb-12">
          {introParagraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              className="text-lg md:text-xl font-body text-neutral-700 leading-relaxed text-center max-w-2xl mx-auto mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.5, duration: 1, ease: 'easeInOut' }}
            >
              {paragraph}
            </motion.p>
          ))}
          <motion.div
            className="flex justify-center mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
          >
            <motion.span
              className="text-primary-500 text-sm font-body animate-pulse"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              Scroll to explore
            </motion.span>
          </motion.div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <motion.h2
              className="text-3xl font-heading text-primary-600 mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }}
            >
              Why We Built Relivia
            </motion.h2>
            {stories.map((story, index) => (
              <StoryCard key={index} name={story.name} image={story.image} story={story.story} />
            ))}
          </div>
          <motion.div
            className="hidden md:block w-px bg-neutral-200"
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
          />
          <div className="flex-1">
            <motion.h2
              className="text-3xl font-heading text-primary-600 mb-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }}
            >
              Get in Touch
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactItems.map((item, index) => (
                <ContactItem key={index} icon={item.icon} text={item.text} link={item.link} />
              ))}
            </div>
          </div>
        </div>
        <motion.div
          className="text-center text-neutral-600 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: 'easeInOut' }}
        >
          We typically respond within 24 hours
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Contact;
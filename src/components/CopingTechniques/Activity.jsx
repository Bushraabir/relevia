import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowPathIcon, HeartIcon, CloudIcon, StarIcon } from '@heroicons/react/24/solid';

const BreathingExercise = () => {
  const [isInhaling, setIsInhaling] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsInhaling(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const circleVariants = {
    inhale: { scale: 1.5 },
    exhale: { scale: 1 }
  };

  return (
    <div className="flex flex-col items-center mb-12">
      <motion.div
        className="w-24 h-24 bg-blue-300 rounded-full"
        variants={circleVariants}
        animate={isInhaling ? 'inhale' : 'exhale'}
        transition={{ duration: 4, ease: 'easeInOut' }}
      />
      <div className="mt-4 text-lg font-medium text-primary-800">
        <motion.span
          animate={{ opacity: isInhaling ? 1 : 0 }}
          transition={{ duration: 0.1 }}
        >
          Inhale
        </motion.span>
        <motion.span
          animate={{ opacity: isInhaling ? 0 : 1 }}
          transition={{ duration: 0.1 }}
        >
          Exhale
        </motion.span>
      </div>
      <p className="mt-2 text-sm text-neutral-600">Follow the circle to guide your breathing.</p>
    </div>
  );
};

export default function Activity() {
  const benefits = [
    {
      title: 'Distraction',
      description: 'By focusing on your body\'s movements, you can break the cycle of anxious thoughts and ground yourself in the present moment.',
      icon: <ArrowPathIcon className="w-8 h-8 text-primary-600" />
    },
    {
      title: 'Endorphins',
      description: 'Activities like running or dancing can boost endorphin levels, leading to a natural high that combats anxiety.',
      icon: <HeartIcon className="w-8 h-8 text-primary-600" />
    },
    {
      title: 'Breathing',
      description: 'Practices like yoga emphasize breath control, which can help slow your heart rate and reduce the physical symptoms of panic.',
      icon: <CloudIcon className="w-8 h-8 text-primary-600" />
    },
    {
      title: 'Confidence',
      description: 'Achieving small fitness goals can build self-esteem and empower you to face anxiety with greater resilience.',
      icon: <StarIcon className="w-8 h-8 text-primary-600" />
    }
  ];

  const activities = [
    'Walking or jogging: A brisk walk in nature can be especially calming, as it combines physical movement with the soothing effects of the outdoors.',
    'Yoga or stretching: Focus on poses that open the chest and promote deep breathing, like the Cat-Cow stretch or Child\'s Pose.',
    'Dancing: Put on your favorite music and let loose. The combination of rhythm and movement can quickly lift your spirits.',
    'Swimming: The buoyancy of water can feel supportive and calming, while the repetitive strokes help focus the mind.',
    'Cycling: Whether on a stationary bike or outdoors, cycling can provide a sense of freedom and help clear mental fog.'
  ];

  const tips = [
    'Start small: Even a short walk can help ease anxiety.',
    'Find activities you enjoy: You\'re more likely to keep doing them.',
    'Incorporate movement into your day: Take the stairs or stretch during breaks.',
    'Listen to your body: Avoid overexertion, especially when feeling anxious.',
    'Set a regular schedule: Consistency can help make physical activity a habit and provide structure to your day.',
    'Track your progress: Use a journal or app to note how you feel before and after activity, reinforcing the positive effects.',
    'Find a buddy: Exercising with a friend can provide accountability and make the experience more enjoyable.',
    'Be kind to yourself: If you\'re having a tough day, even a few minutes of movement is a win.'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-soft py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-heading text-primary-900 mb-8 text-center"
        >
          Physical Activity and Panic Attacks
        </motion.h1>

        <BreathingExercise />

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-heading text-primary-800 mb-4">Introduction</h2>
          <p className="text-neutral-700">
            Physical activity is a powerful tool for managing panic attacks. It can help distract you from anxious thoughts, release mood-boosting endorphins, regulate your breathing, and build confidence over time. Engaging in physical activity can trigger the release of endorphins, which are natural mood lifters, and help regulate the body's stress response.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-heading text-primary-800 mb-4">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-soft p-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  {benefit.icon}
                  <h3 className="text-xl font-heading text-primary-800 ml-4">{benefit.title}</h3>
                </div>
                <p className="text-neutral-700">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-heading text-primary-800 mb-4">Suggested Activities</h2>
          <ul className="list-disc list-inside text-neutral-700">
            {activities.map((activity, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {activity}
              </motion.li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-2xl font-heading text-primary-800 mb-4">Tips</h2>
          <ul className="list-disc list-inside text-neutral-700">
            {tips.map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {tip}
              </motion.li>
            ))}
          </ul>
        </motion.section>
      </div>
    </div>
  );
}
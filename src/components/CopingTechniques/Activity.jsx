import { motion } from 'framer-motion';

export default function Activity() {
  return (
    <div className="min-h-screen bg-primary-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-heading text-primary-900 mb-8 text-center"
        >
          Physical Activity and Panic Attacks
        </motion.h1>

        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-heading text-primary-800 mb-4">Introduction</h2>
          <p className="text-neutral-700">
            Physical activity is a powerful tool for managing panic attacks. It can help distract you from anxious thoughts, release mood-boosting endorphins, regulate your breathing, and build confidence over time.
          </p>
        </motion.section>

        {/* Benefits */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-heading text-primary-800 mb-4">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-soft p-6">
              <h3 className="text-xl font-heading text-primary-800 mb-2">Distraction</h3>
              <p className="text-neutral-700">
                Physical activity can take your mind off anxious thoughts and provide a healthy outlet for stress, breaking the cycle of panic.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-soft p-6">
              <h3 className="text-xl font-heading text-primary-800 mb-2">Endorphins</h3>
              <p className="text-neutral-700">
                Exercise releases endorphins, natural chemicals in your brain that boost your mood and reduce feelings of anxiety.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-soft p-6">
              <h3 className="text-xl font-heading text-primary-800 mb-2">Breathing</h3>
              <p className="text-neutral-700">
                Activities like yoga or walking can help regulate your breathing, which often becomes rapid and shallow during a panic attack.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-soft p-6">
              <h3 className="text-xl font-heading text-primary-800 mb-2">Confidence</h3>
              <p className="text-neutral-700">
                Regular physical activity can improve self-esteem and confidence, empowering you to better manage anxiety and reduce the frequency of panic attacks.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Suggested Activities */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-heading text-primary-800 mb-4">Suggested Activities</h2>
          <ul className="list-disc list-inside text-neutral-700">
            <li>Walking or jogging: Low-impact and accessible, great for clearing your mind.</li>
            <li>Yoga or stretching: Promotes relaxation and improves breath control.</li>
            <li>Dancing: Fun and uplifting, quickly boosts your mood.</li>
            <li>Swimming: Soothing and meditative, helps reduce physical tension.</li>
            <li>Cycling: Invigorating and freeing, supports mental clarity.</li>
          </ul>
        </motion.section>

        {/* Tips */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-2xl font-heading text-primary-800 mb-4">Tips</h2>
          <ul className="list-disc list-inside text-neutral-700">
            <li>Start small: Even a short walk can help ease anxiety.</li>
            <li>Find activities you enjoy: You're more likely to keep doing them.</li>
            <li>Incorporate movement into your day: Take the stairs or stretch during breaks.</li>
            <li>Listen to your body: Avoid overexertion, especially when feeling anxious.</li>
          </ul>
        </motion.section>
      </div>
    </div>
  );
}
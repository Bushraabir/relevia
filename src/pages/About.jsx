import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Fluid from '../components/Fluid';

const sectionVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const cardVariants = {
  initial: { opacity: 0, y: 50, rotateX: -10 },
  animate: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  hover: { 
    scale: 1.03, 
    rotate: 0.5, 
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)', 
    transition: { type: 'spring', stiffness: 200, damping: 15 } 
  },
  tap: { scale: 0.98, transition: { duration: 0.2 } },
};

function About() {
  return (
    <div className="min-h-screen relative overflow-hidden">
   
      <Fluid />

   
      <div className="relative z-10 pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
          <motion.h1
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold mb-6 text-neutral-900 text-center tracking-tight"
          >
            What is it Actually?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="text-neutral-700 font-body mb-16 text-center max-w-3xl mx-auto text-lg sm:text-xl lg:text-2xl leading-relaxed"
          >
            Panic attacks are sudden surges of intense fear or discomfort, often paired with symptoms like a racing heart, sweating, or shortness of breath. They’re a natural reaction to stress or anxiety, touching millions globally. You’re not alone, and there’s a way through.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
            <div className="lg:col-span-1 lg:sticky lg:top-24 mb-12 lg:mb-0">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl sm:text-3xl font-heading font-semibold text-primary-700 mb-6"
              >
                Table of Contents
              </motion.h2>
              <ul className="list-none pl-0 text-neutral-600 font-body space-y-4">
                {[
                  { id: 'what-are-panic-attacks', text: 'What Are Panic Attacks?' },
                  { id: 'science-behind-panic-attacks', text: 'The Science Behind Panic Attacks' },
                  { id: 'traditional-advice', text: 'Why Traditional Advice Might Not Work' },
                  { id: 'new-approach', text: 'A New Approach: Accepting Panic' },
                  { id: 'practical-steps', text: 'Practical Steps to Manage Panic' },
                  { id: 'long-term-strategies', text: 'Long-Term Strategies' },
                  { id: 'conclusion', text: 'Conclusion' },
                ].map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <a
                      href={`#${item.id}`}
                      className="block py-2 px-4 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-all duration-300 ease-in-out"
                    >
                      {item.text}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-16">
              <motion.section
                id="what-are-panic-attacks"
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                whileTap="tap"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white/20 backdrop-blur-2xl border border-white/40 p-8 rounded-2xl shadow-lg transform-gpu"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6 text-neutral-900">What Are Panic Attacks?</h2>
                <p className="text-neutral-700 font-body mb-4 text-lg sm:text-xl leading-relaxed">
                  Imagine your heart pounding, chest constricting, and a sense that you might collapse—or worse, that you’re in mortal danger. Poets and writers have long painted panic attacks as overwhelming torrents of fear and physical chaos, often mistaken for emergencies like heart attacks. Research shows nearly one in three people will face this at least once—a shared human thread.
                </p>
                <p className="text-neutral-700 font-body text-lg sm:text-xl leading-relaxed">
                  While they leave no physical scars, their echo can unsettle daily life, sparking dread of the next wave. Distinct from “anxiety attacks”—a term for intense stress with physical overwhelm—panic attacks demand recognition to tame their grip.
                </p>
              </motion.section>

              <motion.section
                id="science-behind-panic-attacks"
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                whileTap="tap"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white/20 backdrop-blur-2xl border border-white/40 p-8 rounded-2xl shadow-lg transform-gpu"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6 text-neutral-900">The Science Behind Panic Attacks</h2>
                <p className="text-neutral-700 font-body mb-4 text-lg sm:text-xl leading-relaxed">
                  Panic attacks amplify the body’s fight-or-flight instinct. It starts in the amygdala, your brain’s alarm bell, which, sensing danger—real or not—triggers adrenaline via the sympathetic nervous system. Your heart races, breaths quicken, and muscles brace for action.
                </p>
                <p className="text-neutral-700 font-body text-lg sm:text-xl leading-relaxed">
                  But in panic, this escalates beyond reason. Hyperventilation slashes carbon dioxide, constricting blood vessels and mimicking heart attack-like pain, alongside dizziness or numbness. It peaks in 10 minutes, then the prefrontal cortex dials it back with acetylcholine, calming the storm.
                </p>
              </motion.section>

              <motion.section
                id="traditional-advice"
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                whileTap="tap"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white/20 backdrop-blur-2xl border border-white/40 p-8 rounded-2xl shadow-lg transform-gpu"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6 text-neutral-900">Why Traditional Advice Might Not Work</h2>
                <p className="text-neutral-700 font-body mb-4 text-lg sm:text-xl leading-relaxed">
                  “Calm down” or “breathe slow” sound wise, but they can backfire. Trying to tame a racing heart or gasping lungs tells your brain these are threats, spiking anxiety and tightening the panic loop.
                </p>
                <p className="text-neutral-700 font-body text-lg sm:text-xl leading-relaxed">
                  Fixating on breath control can sharpen focus on discomfort, fueling fear. Even “embracing” panic can flop if it’s just grudging tolerance, not true acceptance—leaving traditional tips shaky for many.
                </p>
              </motion.section>

              <motion.section
                id="new-approach"
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                whileTap="tap"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white/20 backdrop-blur-2xl border border-white/40 p-8 rounded-2xl shadow-lg transform-gpu"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6 text-neutral-900">A New Approach: Accepting Panic</h2>
                <p className="text-neutral-700 font-body mb-4 text-lg sm:text-xl leading-relaxed">
                  What if fighting panic isn’t the answer, but inviting it is? Inspired by *Dare* by Barry McDonagh, this flips the script. Jon, after 30 years of travel-triggered panic, found peace this way.
                </p>
                <p className="text-neutral-700 font-body text-lg sm:text-xl leading-relaxed">
                  On a UK-to-Austria flight, as dread crept in, Jon named his fears—“panic story number two”—and dared them to worsen. He pumped his legs, tapped his knees, and leaned in. Instead of growing, the panic shrank, letting him unwind with Netflix.
                </p>
              </motion.section>

              <motion.section
                id="practical-steps"
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                whileTap="tap"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white/20 backdrop-blur-2xl border border-white/40 p-8 rounded-2xl shadow-lg transform-gpu"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6 text-neutral-900">Practical Steps to Manage Panic</h2>
                <ul className="list-disc pl-6 text-neutral-700 font-body space-y-3 text-lg sm:text-xl leading-relaxed">
                  <li>Spot the Stories: Label thoughts like “I’m dying” as mere tales, not facts.</li>
                  <li>Drop the Fight: Let sensations flow—they’re normal and safe for millions.</li>
                  <li>Invite It In: Dare panic to ramp up, showing it’s harmless.</li>
                  <li>Ground Yourself: Name 5 sights, 4 touches, 3 sounds, 2 smells, 1 taste.</li>
                  <li>Engage Your Body: Grip ice, splash water, or taste sour to calm nerves.</li>
                </ul>
              </motion.section>

              <motion.section
                id="long-term-strategies"
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                whileTap="tap"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white/20 backdrop-blur-2xl border border-white/40 p-8 rounded-2xl shadow-lg transform-gpu"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6 text-neutral-900">Long-Term Strategies</h2>
                <ul className="list-disc pl-6 text-neutral-700 font-body space-y-3 text-lg sm:text-xl leading-relaxed">
                  <li>Guard Energy: Say no when you must.</li>
                  <li>Balance Life: Sort finances, heal wounds, rest well.</li>
                  <li>Nurture Body: Move, eat, skip caffeine, sleep.</li>
                  <li>Daily Peace: Meditate, breathe, journal triggers.</li>
                  <li>Own Control: Fix what you can, release what you can’t.</li>
                </ul>
              </motion.section>

              <motion.section
                id="conclusion"
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                whileTap="tap"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white/20 backdrop-blur-2xl border border-white/40 p-8 rounded-2xl shadow-lg transform-gpu"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6 text-neutral-900">Conclusion</h2>
                <p className="text-neutral-700 font-body text-lg sm:text-xl leading-relaxed">
                  Panic attacks might feel like betrayal, but they’re human—and conquerable. Knowing them and welcoming them cuts their power. You’re tougher than you know.
                </p>
              </motion.section>
            </div>
          </div>


          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold text-neutral-900 mb-6">Explore More Resources</h2>
            <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
              <motion.div whileHover={{ scale: 1.08, rotate: 2 }} whileTap={{ scale: 0.95 }}>
                <Link to="/relevia/resources" className="bg-primary-600 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-primary-700 transition-all duration-300 font-body text-lg">
                  Our Resources
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.08, rotate: -2 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="https://www.therapyinanutshell.com/panic-attacks-playlist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary-600 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-secondary-700 transition-all duration-300 font-body text-lg"
                >
                  Therapy in a Nutshell
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-100 to-secondary-100 pt-20 pb-8">
      <div className="container mx-auto p-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-heading font-bold mb-4 text-neutral-800 text-center"
        >
          What is it Actually?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-neutral-600 font-body mb-12 text-center max-w-3xl mx-auto text-lg"
        >
          Panic attacks are sudden episodes of intense fear or discomfort, often with physical symptoms like a racing heart, sweating, or shortness of breath. They’re a normal response to stress or anxiety and affect millions of people. You’re not alone, and they can be managed.
        </motion.p>

        <div className="md:grid md:grid-cols-4 md:gap-8">
          <div className="md:col-span-1 md:sticky md:top-20 mb-12 md:mb-0">
            <h2 className="text-2xl font-heading font-semibold text-primary-600 mb-4">Table of Contents</h2>
            <ul className="list-disc pl-6 text-neutral-600 font-body space-y-2">
              <li><a href="#what-are-panic-attacks" className="hover:underline hover:text-primary-500 transition duration-300">What Are Panic Attacks?</a></li>
              <li><a href="#science-behind-panic-attacks" className="hover:underline hover:text-primary-500 transition duration-300">The Science Behind Panic Attacks</a></li>
              <li><a href="#traditional-advice" className="hover:underline hover:text-primary-500 transition duration-300">Why Traditional Advice Might Not Work</a></li>
              <li><a href="#new-approach" className="hover:underline hover:text-primary-500 transition duration-300">A New Approach: Accepting and Welcoming Panic</a></li>
              <li><a href="#practical-steps" className="hover:underline hover:text-primary-500 transition duration-300">Practical Steps to Manage a Panic Attack</a></li>
              <li><a href="#long-term-strategies" className="hover:underline hover:text-primary-500 transition duration-300">Long-Term Strategies for Prevention</a></li>
              <li><a href="#conclusion" className="hover:underline hover:text-primary-500 transition duration-300">Conclusion</a></li>
            </ul>
          </div>
          <div className="md:col-span-3 space-y-16">
            <motion.section
              id="what-are-panic-attacks"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-md border border-white/30 p-8 rounded-xl"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-neutral-800">What Are Panic Attacks?</h2>
              <p className="text-neutral-600 font-body mb-4 text-lg">
                Picture this: your heart races, your chest tightens, and you feel like you might faint—or worse, that you’re facing a life-threatening emergency like a heart attack or stroke. That’s how countless poets and writers have described a panic attack—a sudden, intense wave of fear and physical symptoms so powerful that it’s often mistaken for a medical crisis. Studies indicate that nearly one-third of people will encounter at least one panic attack in their lifetime, making it a surprisingly common experience.
              </p>
              <p className="text-neutral-600 font-body text-lg">
                Though panic attacks don’t cause lasting physical damage, their aftermath can be debilitating. The fear of another episode can disrupt daily life, sometimes even triggering more attacks. They differ from what some call “anxiety attacks,” which refer to overwhelming stress or anxiety with intense physical sensations that hinder functioning. Understanding this distinction is the first step to managing them, as it sheds light on why they feel so consuming.
              </p>
            </motion.section>

            <motion.section
              id="science-behind-panic-attacks"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-md border border-white/30 p-8 rounded-xl"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-neutral-800">The Science Behind Panic Attacks</h2>
              <p className="text-neutral-600 font-body mb-4 text-lg">
                At their core, panic attacks are an exaggerated version of the body’s natural reaction to danger—the fight-or-flight response. This process begins in the amygdala, the brain’s fear-processing center. When it senses a threat, whether real or imagined, it signals the sympathetic nervous system to release adrenaline. This hormone ramps up your heart rate and breathing, sending blood and oxygen to your muscles and brain to prepare you for action.
              </p>
              <p className="text-neutral-600 font-body mb-4 text-lg">
                In a panic attack, however, this response goes into overdrive. Far beyond what’s needed for a genuine threat, it leads to symptoms like a pounding heart, rapid breathing (or hyperventilation), dizziness, and numbness in the hands and feet. This happens because hyperventilation reduces carbon dioxide in the blood, leaving too much oxygen and causing blood vessels to constrict—sometimes mimicking chest pain akin to a heart attack.
              </p>
              <p className="text-neutral-600 font-body text-lg">
                Typically, this intense reaction peaks within 10 minutes. Then, the prefrontal cortex steps in, activating the parasympathetic nervous system to release acetylcholine, which slows the heart rate and winds down the attack. Environmental cues tied to past trauma or anxiety disorders—like PTSD, OCD, or social anxiety—can spark this response, though the exact cause remains unclear.
              </p>
            </motion.section>

            <motion.section
              id="traditional-advice"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-md border border-white/30 p-8 rounded-xl"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-neutral-800">Why Traditional Advice Might Not Work</h2>
              <p className="text-neutral-600 font-body mb-4 text-lg">
                When a panic attack hits, the go-to advice is often to “calm down” or “take slow breaths.” But here’s the catch: this can make things worse. The more you try to control symptoms like a racing heart or shortness of breath, the more you signal to your brain that these sensations are dangerous. This fuels a vicious cycle—your anxiety spikes, your heart beats faster, and the panic intensifies.
              </p>
              <p className="text-neutral-600 font-body text-lg">
                For example, focusing on slowing your breathing might heighten your awareness of physical discomfort, amplifying the fear. Even attempts to “embrace” the panic in a zen-like way can backfire if you’re still treating the sensations as something to endure rather than accept. This paradox reveals why conventional wisdom often falls short for those grappling with panic disorder.
              </p>
            </motion.section>

            <motion.section
              id="new-approach"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-md border border-white/30 p-8 rounded-xl"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-neutral-800">A New Approach: Accepting and Welcoming Panic</h2>
              <p className="text-neutral-600 font-body mb-4 text-lg">
                What if the key to stopping a panic attack isn’t fighting it, but leaning into it? This unconventional strategy, inspired by Barry McDonagh’s book Dare, suggests welcoming the sensations instead of resisting them. Take Jon’s story: after 30 years of panic disorder triggered by travel, he found freedom by rethinking his approach.
              </p>
              <p className="text-neutral-600 font-body mb-4 text-lg">
                On a flight from the UK to Austria, Jon felt the familiar rise of anxiety as the plane door closed. Instead of trying to calm down, he labeled his fearful thoughts—“What if I have a panic attack? This is catastrophic!”—as “panic story number two.” Then, he did something radical: he turned off his headphones, pumped his legs, and tapped his knees, daring the panic to get worse. To his surprise, it didn’t. The more he tried to amplify it, the more it faded, leaving him relaxed enough to watch Netflix.
              </p>
              <p className="text-neutral-600 font-body text-lg">
                This works because inviting panic breaks the fear cycle. By showing your brain that these sensations aren’t a threat, you prove they’re safe to experience. It’s a shift from enduring to confronting—a paper tiger that loses its power when you face it head-on.
              </p>
            </motion.section>

            <motion.section
              id="practical-steps"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-md border border-white/30 p-8 rounded-xl"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-neutral-800">Practical Steps to Manage a Panic Attack</h2>
              <p className="text-neutral-600 font-body mb-4 text-lg">
                When panic strikes, having a toolkit can make all the difference. Here are practical steps, reimagined from various techniques, to navigate an attack:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 font-body space-y-2 text-lg">
                <li>Spot the Panic Stories: Recognize the lies your mind tells you—like “I’m having a heart attack” or “I’ll pass out”—and label them as stories, not truths.</li>
                <li>Let Go of the Fight: Stop battling the Lillienations like a racing heart or shortness of breath. They’re a normal response to stress or anxiety and affect millions of people. You’re not alone, and they can be managed.</li>
                <li>Invite the Sensations: Say, “Bring it on, panic!” Try to make your heart beat faster or your dizziness grow, proving these feelings can’t hurt you.</li>
                <li>Ground Yourself: Focus on your senses—name five things you see, four you can touch, three you hear, two you smell, and one you taste—to anchor yourself in the present.</li>
                <li>Engage Your Body: Hold an ice cube, splash cold water on your face, or suck on a sour candy to activate your calming parasympathetic response.</li>
                <li>Use Positive Self-Talk: Remind yourself, “This is uncomfortable, but not dangerous. It’ll pass like a wave.”</li>
                <li>Challenge the Fear: Avoid catastrophic thoughts like “Everything’s awful.” Acknowledge the difficulty without labeling it as hopeless.</li>
              </ul>
              <p className="text-neutral-600 font-body mt-4 text-lg">
                Moving around might ease symptoms slightly, a clue it’s anxiety, not a physical ailment. Walking can feel better than sitting still, reinforcing that you’re safe.
              </p>
            </motion.section>

            <motion.section
              id="long-term-strategies"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-md border border-white/30 p-8 rounded-xl"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-neutral-800">Long-Term Strategies for Prevention</h2>
              <p className="text-neutral-600 font-body mb-4 text-lg">
                Managing panic in the moment is vital, but preventing future attacks requires a broader approach. Two main treatments stand out: antidepressant medication and Cognitive Behavioral Therapy (CBT). Both help about 40% of people, though they work differently. Medications can have side effects, and half of users relapse after stopping, while CBT offers lasting results with only a 20% relapse rate.
              </p>
              <p className="text-neutral-600 font-body mb-4 text-lg">
                CBT teaches practical skills: understanding the physiology of panic, controlling breathing and muscle tension, restructuring fearful thoughts (e.g., replacing “I’ll die” with “This will pass”), and gradually facing triggering sensations or situations. Outside therapy, life management is key. This means:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 font-body space-y-2 text-lg">
                <li>Set Boundaries: Protect your energy by saying no when needed.</li>
                <li>Balance Your Life: Manage finances, process trauma, and keep a sustainable schedule with rest.</li>
                <li>Care for Your Body: Exercise, eat regularly, cut caffeine, and get enough sleep.</li>
                <li>Practice Daily Calm: Meditate, breathe deeply, or journal to track triggers and emotions.</li>
                <li>Know Your Control: Address what you can change and let go of what you can’t.</li>
              </ul>
              <p className="text-neutral-600 font-body mt-4 text-lg">
                Frequent attacks or constant worry about them might signal panic disorder, but these steps can reduce their grip over time.
              </p>
            </motion.section>

            <motion.section
              id="conclusion"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-md border border-white/30 p-8 rounded-xl"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-neutral-800">Conclusion</h2>
              <p className="text-neutral-600 font-body text-lg">
                Panic attacks may feel like your body’s turned against you, but they’re a common human experience—one you can learn to handle. By understanding their mechanics and embracing rather than fearing them, you can break free from their cycle. Whether it’s your first attack or your hundredth, you’re not alone, and you’re stronger than you think. For extra support, explore therapy, online resources like the “Therapy in a Nutshell” panic attack playlist, or courses on processing emotions. Each step forward is a victory over panic’s hold on your life.
              </p>
            </motion.section>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-neutral-800 mb-4">Explore More Resources</h2>
          <p className="text-neutral-600 font-body mb-8 text-lg">Deepen your understanding and find support with these tools and communities.</p>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/resources" className="bg-primary-500 text-white px-6 py-3 rounded-lg shadow-soft hover:bg-primary-600 transition duration-300 font-body">
                Our Resources
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href="https://www.therapyinanutshell.com/panic-attacks-playlist" target="_blank" rel="noopener noreferrer" className="bg-secondary-500 text-white px-6 py-3 rounded-lg shadow-soft hover:bg-secondary-600 transition duration-300 font-body">
                Therapy in a Nutshell
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/contact" className="bg-accent-500 text-white px-6 py-3 rounded-lg shadow-soft hover:bg-accent-600 transition duration-300 font-body">
                Contact Support
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
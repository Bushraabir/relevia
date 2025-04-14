import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Medication() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
    }),
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.2, ease: 'easeOut' },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-100 to-secondary-100 pt-20 pb-8 font-body">
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-heading text-primary-900 mb-4 md:mb-0"
          >
            Medication for Panic Attacks
          </motion.h1>
          <motion.button
            onClick={() => document.getElementById('emergency-support').scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent-500 text-white px-4 py-2 rounded-lg shadow-soft hover:bg-accent-600 transition duration-300"
          >
            Need Immediate Help?
          </motion.button>
        </div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto md:mx-0"
        >
          If you're experiencing panic attacks, know that you're not alone. Medications can play a crucial role in reducing the frequency and intensity of your symptoms, helping you regain control and improve your quality of life. Always work with a healthcare professional to find the treatment plan that’s right for you.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="mt-8"
        >
          <h2 className="text-2xl font-heading text-primary-900 mb-4">Types of Medications</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse shadow-soft rounded-lg overflow-hidden bg-white">
              <thead>
                <tr className="bg-primary-200">
                  <th className="p-3 font-semibold">Class</th>
                  <th className="p-3 font-semibold">Examples</th>
                  <th className="p-3 font-semibold">FDA Approved</th>
                  <th className="p-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                  {[
                    {
                      class: 'SSRIs',
                      examples: 'Fluoxetine (Prozac), Sertraline (Zoloft), Paroxetine (Paxil)',
                      fda: 'Yes',
                      notes: 'First choice; takes 4-6 weeks; side effects may include nausea, insomnia',
                    },
                    {
                      class: 'SNRIs',
                      examples: 'Venlafaxine (Effexor XR)',
                      fda: 'Yes',
                      notes: 'May cause dizziness, increased blood pressure',
                    },
                    {
                      class: 'Benzodiazepines',
                      examples: 'Alprazolam (Xanax), Clonazepam (Klonopin)',
                      fda: 'Yes',
                      notes: 'Rapid relief; risk of dependency with long-term use',
                    },
                    {
                      class: 'Other Antidepressants',
                      examples: 'Imipramine (Tofranil), Phenelzine (Nardil)',
                      fda: 'No',
                      notes: 'Less common; more side effects',
                    },
                  ].map((med, index) => (
                    <motion.tr
                      key={index}
                      custom={index}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={rowVariants}
                      className={index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}
                    >
                      <td className="p-3">{med.class}</td>
                      <td className="p-3">{med.examples}</td>
                      <td className="p-3">{med.fda}</td>
                      <td className="p-3">{med.notes}</td>
                    </motion.tr>
                  ))}
                </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="mt-8"
        >
          <h2 className="text-2xl font-heading text-primary-900 mb-4">How Medications Help</h2>
          <p className="text-neutral-700 max-w-3xl mx-auto md:mx-0">
            Medications balance brain chemicals to help manage panic attacks. SSRIs and SNRIs boost serotonin and norepinephrine levels to stabilize mood and reduce anxiety over time. Benzodiazepines enhance GABA, a calming neurotransmitter, providing immediate relief during acute episodes.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="mt-8"
        >
          <h2 className="text-2xl font-heading text-primary-900 mb-4">Important Considerations</h2>
          <ul className="list-disc list-inside text-neutral-700 space-y-2 max-w-3xl mx-auto md:mx-0">
            {[
              '<strong>Side Effects:</strong> Common with all medications—discuss with your doctor to weigh benefits and risks.',
              '<strong>Time to Effectiveness:</strong> Antidepressants may take 4-6 weeks; benzodiazepines work almost instantly.',
              '<strong>Therapy Boost:</strong> Combining medication with therapy, like CBT, often improves outcomes.',
              '<strong>Follow Medical Advice:</strong> Never start or stop medication without consulting your healthcare provider.',
            ].map((item, index) => (
              <motion.li
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={listItemVariants}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </ul>
        </motion.div>

        <motion.div
          id="emergency-support"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="mt-8 bg-secondary-100 p-6 rounded-lg shadow-soft"
        >
          <h2 className="text-2xl font-heading text-secondary-900 mb-2">Emergency Support</h2>
          <p className="text-secondary-700 mb-4">
            If you're having a severe panic attack or thoughts of self-harm, reach out immediately. Call the <strong>SAMHSA National Helpline</strong> at <strong>1-800-662-4357</strong> (24/7 support) or seek emergency medical attention if symptoms feel unmanageable.
          </p>
          <h3 className="text-xl font-heading text-secondary-900 mb-2">Emergency Support (Bangladesh)</h3>
          <ul className="list-disc list-inside text-secondary-700 space-y-2">
            <li>
              <strong>National Institute of Mental Health (NIMH)</strong> – Sher‑E‑Bangla Nagar, Dhaka‑1207;{' '}
              <strong>Phone:</strong> +8802‑223374409;{' '}
              <a href="http://nimh.gov.bd" target="_blank" rel="noopener noreferrer" className="underline hover:text-secondary-600">
                nimh.gov.bd
              </a>
            </li>
            <li>
              <strong>Psychological Health & Wellness Clinic (PHWC)</strong> – 1st Fl., House 4D, Road 73, Gulshan 2, Dhaka;{' '}
              <strong>Phone:</strong> +88017‑777‑2763;{' '}
              <a href="https://phwcbd.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-secondary-600">
                phwcbd.org
              </a>
            </li>
            <li>
              <strong>Moner Bondhu</strong> (24/7 counselling & crisis helpline):{' '}
              <strong>Phone:</strong> +88017‑7953‑3333;{' '}
              <a href="https://monerbondhu.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-secondary-600">
                monerbondhu.org
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="mt-8"
        >
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-500 text-white px-6 py-2 rounded-lg shadow-soft hover:bg-primary-600 transition duration-300"
          >
            Learn More About Medication
          </motion.button>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="mt-8"
        >
          <h2 className="text-2xl font-heading text-primary-900 mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto md:mx-0">
            {[
              { name: 'Mayo Clinic', url: 'https://www.mayoclinic.org/diseases-conditions/panic-attacks/diagnosis-treatment/drc-20376027' },
              { name: 'Verywell Mind', url: 'https://www.verywellmind.com/medications-for-panic-disorder-2584307' },
              { name: 'AAFP', url: 'https://www.aafp.org/pubs/afp/afp-community-blog/entry/what-are-the-best-medications-for-panic-disorder.html' },
              { name: 'WebMD', url: 'https://www.webmd.com/anxiety-panic/understanding-panic-attack-treatment' },
            ].map((resource, index) => (
              <motion.a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent-500 text-white px-4 py-2 rounded-lg shadow-soft hover:bg-accent-600 transition duration-300 text-center"
              >
                {resource.name}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={{
            boxShadow: [
              '0 0 10px rgba(0,0,0,0.1)',
              '0 0 20px rgba(0,0,0,0.2)',
              '0 0 10px rgba(0,0,0,0.1)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-12 bg-white p-6 rounded-lg"
        >
          <h2 className="text-2xl font-heading text-primary-900 mb-4">Expert Insight</h2>
          <blockquote className="text-neutral-700 italic">
            "Medications can be valuable in managing panic attacks when combined with therapy." - Dr. Jane Smith, Psychiatrist
          </blockquote>
        </motion.div>
      </div>

      {showBackToTop && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-4 right-4 bg-primary-500 text-white p-3 rounded-full shadow-soft hover:bg-primary-600 transition duration-300"
        >
          ↑
        </motion.button>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="bg-white p-4 md:p-8 rounded-lg shadow-xl max-w-lg max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-heading text-primary-900 mb-4">More About Medication</h2>
              <p className="text-neutral-700 mb-4">
                Here’s detailed information about medications commonly used for panic attacks. Each class has unique benefits and considerations to discuss with your doctor.
              </p>

              <h3 className="text-xl font-heading text-primary-700 mb-2">SSRIs</h3>
              <ul className="list-disc list-inside text-neutral-700 mb-4">
                <li><strong>How They Work:</strong> Increase serotonin to stabilize mood.</li>
                <li><strong>Examples:</strong> Fluoxetine, Sertraline, Paroxetine.</li>
                <li><strong>Side Effects:</strong> Nausea, insomnia, sexual dysfunction.</li>
                <li><strong>Special Notes:</strong> Takes 4-6 weeks; often first choice due to safety.</li>
              </ul>

              <h3 className="text-xl font-heading text-primary-700 mb-2">SNRIs</h3>
              <ul className="list-disc list-inside text-neutral-700 mb-4">
                <li><strong>How They Work:</strong> Boost serotonin and norepinephrine.</li>
                <li><strong>Examples:</strong> Venlafaxine.</li>
                <li><strong>Side Effects:</strong> Dizziness, increased blood pressure.</li>
                <li><strong>Special Notes:</strong> Similar onset to SSRIs; monitor blood pressure.</li>
              </ul>

              <h3 className="text-xl font-heading text-primary-700 mb-2">Benzodiazepines</h3>
              <ul className="list-disc list-inside text-neutral-700 mb-4">
                <li><strong>How They Work:</strong> Enhance GABA for rapid calming.</li>
                <li><strong>Examples:</strong> Alprazolam, Clonazepam.</li>
                <li><strong>Side Effects:</strong> Drowsiness, dependence risk.</li>
                <li><strong>Special Notes:</strong> Short-term use; not for those with substance abuse history.</li>
              </ul>

              <h3 className="text-xl font-heading text-primary-700 mb-2">Other Antidepressants</h3>
              <ul className="list-disc list-inside text-neutral-700 mb-4">
                <li><strong>How They Work:</strong> Varies (e.g., TCAs block reuptake; MAOIs affect multiple neurotransmitters).</li>
                <li><strong>Examples:</strong> Imipramine (TCA), Phenelzine (MAOI).</li>
                <li><strong>Side Effects:</strong> Dry mouth, dietary restrictions (MAOIs).</li>
                <li><strong>Special Notes:</strong> Less common; used if others fail.</li>
              </ul>

              <h3 className="text-xl font-heading text-primary-700 mb-2">Emergency Contacts</h3>
              <p className="text-neutral-700">
                For immediate help, call the <strong>SAMHSA National Helpline</strong> at <strong>1-800-662-4357</strong> or seek emergency care if you’re in crisis.
              </p>

              <motion.button
                onClick={() => setIsModalOpen(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 bg-primary-500 text-white px-6 py-2 rounded-lg shadow-soft hover:bg-primary-600 transition duration-300"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Medication;
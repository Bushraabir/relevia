import { useState } from 'react';
import { motion } from 'framer-motion';

function Medication() {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 pt-20 pb-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto p-4"
      >

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold mb-6 text-blue-800"
        >
          Medication for Panic Attacks
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg text-gray-700 mb-4"
        >
          If you're experiencing panic attacks, know that you're not alone. Medications can play a crucial role in reducing the frequency and intensity of your symptoms, helping you regain control and improve your quality of life. Always work with a healthcare professional to find the treatment plan that’s right for you.
        </motion.p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Types of Medications</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2">Class</th>
                <th className="p-2">Examples</th>
                <th className="p-2">FDA Approved</th>
                <th className="p-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="p-2">SSRIs</td>
                <td className="p-2">Fluoxetine (Prozac), Sertraline (Zoloft), Paroxetine (Paxil)</td>
                <td className="p-2">Yes</td>
                <td className="p-2">First choice; takes 4-6 weeks; side effects may include nausea, insomnia</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-2">SNRIs</td>
                <td className="p-2">Venlafaxine (Effexor XR)</td>
                <td className="p-2">Yes</td>
                <td className="p-2">May cause dizziness, increased blood pressure</td>
              </tr>
              <tr className="bg-white">
                <td className="p-2">Benzodiazepines</td>
                <td className="p-2">Alprazolam (Xanax), Clonazepam (Klonopin)</td>
                <td className="p-2">Yes</td>
                <td className="p-2">Rapid relief; risk of dependence; short-term use</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-2">Other Antidepressants</td>
                <td className="p-2">Imipramine (Tofranil), Phenelzine (Nardil)</td>
                <td className="p-2">No</td>
                <td className="p-2">Less common; more side effects</td>
              </tr>
            </tbody>
          </table>
        </div>


        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">How Medications Help</h2>
          <p className="text-gray-700">
            Medications balance brain chemicals to help manage panic attacks. SSRIs and SNRIs boost serotonin and norepinephrine levels to stabilize mood and reduce anxiety over time. Benzodiazepines enhance GABA, a calming neurotransmitter, providing immediate relief during acute episodes.
          </p>
        </div>


        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Important Considerations</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li><strong>Side Effects:</strong> Common with all medications—discuss with your doctor to weigh benefits and risks.</li>
            <li><strong>Time to Effectiveness:</strong> Antidepressants may take 4-6 weeks; benzodiazepines work almost instantly.</li>
            <li><strong>Therapy Boost:</strong> Combining medication with therapy, like CBT, often improves outcomes.</li>
            <li><strong>Follow Medical Advice:</strong> Never start or stop medication without consulting your healthcare provider.</li>
          </ul>
        </div>


        <div className="mt-8 bg-red-100 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold text-red-800 mb-2">Emergency Support</h2>
          <p className="text-red-700">
            If you're having a severe panic attack or thoughts of self-harm, reach out immediately. Call the <strong>SAMHSA National Helpline</strong> at <strong>1-800-662-4357</strong> (24/7 support) or seek emergency medical attention if symptoms feel unmanageable.
          </p>
        </div>
        <div className="mt-8 bg-red-100 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold text-red-800 mb-2">
            Emergency Support (Bangladesh)
          </h2>
          <ul className="list-disc list-inside text-red-700 space-y-2">

            <li>
              <strong>National Institute of Mental Health (NIMH)</strong> – Sher‑E‑Bangla Nagar, Dhaka‑1207;{' '}
              <strong>Phone:</strong> +8802‑223374409;{' '}
              <a
                href="http://nimh.gov.bd"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                nimh.gov.bd
              </a>{' '}
    
            </li>
            <li>
              <strong>Psychological Health & Wellness Clinic (PHWC)</strong> – 1st Fl., House 4D, Road 73, Gulshan 2, Dhaka;{' '}
              <strong>Phone:</strong> +88017‑777‑2763;{' '}
              <a
                href="https://phwcbd.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                phwcbd.org
              </a>{' '}
 
            </li>
            <li>
              <strong>Moner Bondhu</strong> (24/7 counselling & crisis helpline):{' '}
              <strong>Phone:</strong> +88017‑7953‑3333;{' '}
              <a
                href="https://monerbondhu.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                monerbondhu.org
              </a>{' '}
    
            </li>
          </ul>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Learn More About Medication
        </button>

      
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Additional Resources</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.mayoclinic.org/diseases-conditions/panic-attacks/diagnosis-treatment/drc-20376027"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Mayo Clinic
            </a>
            <a
              href="https://www.verywellmind.com/medications-for-panic-disorder-2584307"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Verywell Mind
            </a>
            <a
              href="https://www.aafp.org/pubs/afp/afp-community-blog/entry/what-are-the-best-medications-for-panic-disorder.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              AAFP
            </a>
            <a
              href="https://www.webmd.com/anxiety-panic/understanding-panic-attack-treatment"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              WebMD
            </a>
          </div>
        </div>

     
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
          className="mt-12 bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Expert Insight</h2>
          <blockquote className="text-gray-700 italic">
            "Medications can be valuable in managing panic attacks when combined with therapy." - Dr. Jane Smith, Psychiatrist
          </blockquote>
        </motion.div>
      </motion.div>


      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">More About Medication</h2>
            <p className="text-gray-700 mb-4">
              Here’s detailed information about medications commonly used for panic attacks. Each class has unique benefits and considerations to discuss with your doctor.
            </p>

            <h3 className="text-xl font-semibold text-blue-700 mb-2">SSRIs</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li><strong>How They Work:</strong> Increase serotonin to stabilize mood.</li>
              <li><strong>Examples:</strong> Fluoxetine, Sertraline, Paroxetine.</li>
              <li><strong>Side Effects:</strong> Nausea, insomnia, sexual dysfunction.</li>
              <li><strong>Special Notes:</strong> Takes 4-6 weeks; often first choice due to safety.</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-700 mb-2">SNRIs</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li><strong>How They Work:</strong> Boost serotonin and norepinephrine.</li>
              <li><strong>Examples:</strong> Venlafaxine.</li>
              <li><strong>Side Effects:</strong> Dizziness, increased blood pressure.</li>
              <li><strong>Special Notes:</strong> Similar onset to SSRIs; monitor blood pressure.</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-700 mb-2">Benzodiazepines</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li><strong>How They Work:</strong> Enhance GABA for rapid calming.</li>
              <li><strong>Examples:</strong> Alprazolam, Clonazepam.</li>
              <li><strong>Side Effects:</strong> Drowsiness, dependence risk.</li>
              <li><strong>Special Notes:</strong> Short-term use; not for those with substance abuse history.</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-700 mb-2">Other Antidepressants</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li><strong>How They Work:</strong> Varies (e.g., TCAs block reuptake; MAOIs affect multiple neurotransmitters).</li>
              <li><strong>Examples:</strong> Imipramine (TCA), Phenelzine (MAOI).</li>
              <li><strong>Side Effects:</strong> Dry mouth, dietary restrictions (MAOIs).</li>
              <li><strong>Special Notes:</strong> Less common; used if others fail.</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-700 mb-2">Emergency Contacts</h3>
            <p className="text-gray-700">
              For immediate help, call the <strong>SAMHSA National Helpline</strong> at <strong>1-800-662-4357</strong> or seek emergency care if you’re in crisis.
            </p>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Medication;
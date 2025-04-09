import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const prompts = [
  "Describe what you're feeling right now.",
  "Write about a peaceful place you can imagine.",
  "List three things you're grateful for.",
  "What is one thing you can do to take care of yourself right now?",
  "Describe a happy memory in detail.",
];

function getRandomPrompt() {
  return prompts[Math.floor(Math.random() * prompts.length)];
}

export default function Journaling() {
  const [text, setText] = useState('');
  const [showPrompt, setShowPrompt] = useState(true);
  const [currentPrompt, setCurrentPrompt] = useState(getRandomPrompt());

  // Load saved text from local storage on mount
  useEffect(() => {
    const savedText = localStorage.getItem('currentJournalEntry');
    if (savedText) {
      setText(savedText);
    }
  }, []);

  // Autosave to local storage with a 1-second debounce
  useEffect(() => {
    const saveToLocalStorage = setTimeout(() => {
      localStorage.setItem('currentJournalEntry', text);
    }, 1000);
    return () => clearTimeout(saveToLocalStorage);
  }, [text]);

  const handleClosePrompt = () => {
    setShowPrompt(false);
  };

  const handleShowPrompt = () => {
    setCurrentPrompt(getRandomPrompt());
    setShowPrompt(true);
  };

  const handleSave = () => {
    const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    const newEntry = { text, timestamp: new Date().toISOString() };
    localStorage.setItem('journalEntries', JSON.stringify([...entries, newEntry]));
    localStorage.removeItem('currentJournalEntry');
    setText('');
    console.log('Entry saved:', newEntry);
  };

  return (
    <div className="min-h-screen bg-primary-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-2xl"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl font-heading text-primary-800 mb-6 text-center"
        >
          Take a moment to write
        </motion.h1>

        {/* Prompt Section */}
        <AnimatePresence>
          {showPrompt && (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-4 p-4 bg-white rounded-lg shadow-soft relative"
            >
              <p className="text-lg text-neutral-700">{currentPrompt}</p>
              <button
                onClick={handleClosePrompt}
                className="absolute top-2 right-2 text-neutral-500 hover:text-neutral-700"
                aria-label="Close prompt"
              >
                &times;
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        {!showPrompt && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={handleShowPrompt}
            className="mb-4 px-4 py-2 bg-secondary-500 text-white rounded hover:bg-secondary-600"
          >
            Get a prompt
          </motion.button>
        )}

        {/* Text Area */}
        <motion.textarea
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-96 p-4 text-lg bg-white rounded-lg shadow-soft"
          style={{ fontFamily: 'Caveat, cursive' }}
          placeholder="Start writing here..."
        />

        {/* Save Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          onClick={handleSave}
          className="mt-4 px-6 py-2 bg-accent-500 text-white rounded hover:bg-accent-600"
        >
          Save Entry
        </motion.button>
      </motion.div>
    </div>
  );
}
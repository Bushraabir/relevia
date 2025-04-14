import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

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
  const [isSaving, setIsSaving] = useState(false);
  const [mood, setMood] = useState(null);

  useEffect(() => {
    const savedText = localStorage.getItem('currentJournalEntry');
    if (savedText) {
      setText(savedText);
    }
  }, []);

  useEffect(() => {
    if (text) {
      setIsSaving(true);
      const saveToLocalStorage = setTimeout(() => {
        localStorage.setItem('currentJournalEntry', text);
        setIsSaving(false);
      }, 1000);
      return () => clearTimeout(saveToLocalStorage);
    }
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
    const newEntry = { text, timestamp: new Date().toISOString(), mood };
    localStorage.setItem('journalEntries', JSON.stringify([...entries, newEntry]));
    localStorage.removeItem('currentJournalEntry');
    setText('');
    setMood(null);
    console.log('Entry saved:', newEntry);
  };

  const moods = ['😊 Happy', '😔 Sad', '😡 Angry', '😌 Calm', '😰 Anxious'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-2xl bg-white rounded-lg shadow-soft p-6"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl font-heading text-primary-800 mb-6 text-center"
        >
          Take a moment to express...
        </motion.h1>

        <div className="mb-6">
          <h2 className="text-xl font-heading text-primary-800 mb-2">I am feeling..</h2>
          <div className="flex gap-2">
            {moods.map((m, index) => (
              <motion.button
                key={index}
                onClick={() => setMood(m)}
                className={`px-4 py-2 rounded ${mood === m ? 'bg-primary-300 text-white' : 'bg-transparent text-gray-700'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {m}
              </motion.button>
            ))}
          </div>
        </div>


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
                ×
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

        <motion.textarea
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-96 p-4 text-lg bg-white rounded-lg shadow-soft focus:ring-2 focus:ring-primary-500"
          style={{ fontFamily: 'Caveat, cursive' }}
          placeholder="Start writing here..."
        />

        {isSaving && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-neutral-600 mt-2"
          >
            Saving...
          </motion.p>
        )}

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
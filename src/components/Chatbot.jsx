import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Send, MessageCircle, Sparkles, Coffee, Minimize2, Maximize2, Volume2, VolumeX, Mic, MicOff } from 'lucide-react';

const Message = ({ message, isBot, isTyping = false, hasError = false, timestamp, onSpeakComplete }) => {
  const [showTimestamp, setShowTimestamp] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 group px-2`}
      onMouseEnter={() => setShowTimestamp(true)}
      onMouseLeave={() => setShowTimestamp(false)}
    >
      <div className={`flex items-start max-w-[85%] sm:max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        {isBot && (
          <motion.div
            animate={{ 
              scale: hasError ? [1, 1.05, 1] : isSpeaking ? [1, 1.08, 1] : [1, 1.02, 1],
            }}
            transition={{ 
              duration: hasError ? 1.2 : isSpeaking ? 0.8 : 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-2 sm:mr-3 shadow-md ${
              hasError 
                ? 'bg-gradient-to-br from-orange-400 via-orange-500 to-pink-500' 
                : isSpeaking
                ? 'bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400'
                : 'bg-gradient-to-br from-purple-400 via-pink-400 to-red-400'
            }`}
          >
            {hasError ? (
              <Coffee className="text-white text-xs sm:text-sm" />
            ) : isSpeaking ? (
              <Volume2 className="text-white text-xs sm:text-sm" />
            ) : (
              <Heart className="text-white text-xs sm:text-sm" />
            )}
            {isSpeaking && (
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-blue-300 opacity-30"
              />
            )}
          </motion.div>
        )}
        
        <div className="relative">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className={`px-3 sm:px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm relative overflow-hidden transition-all duration-200 ${
              isBot 
                ? hasError 
                  ? 'bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-200 text-orange-800'
                  : isSpeaking
                  ? 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 text-gray-700'
                  : 'bg-gradient-to-br from-white to-purple-50 border border-purple-100 text-gray-700' 
                : 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white'
            }`}
          >
            {isTyping ? (
              <div className="flex space-x-2 items-center py-1">
                <span className="text-xs sm:text-sm text-purple-600 mr-2 font-medium">Thinking...</span>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut"
                    }}
                    className="w-2 h-2 bg-purple-400 rounded-full"
                  />
                ))}
                <Sparkles className="w-3 h-3 text-purple-400 ml-1" />
              </div>
            ) : (
              <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">{message}</p>
            )}
          </motion.div>
          
          {/* Timestamp */}
          <AnimatePresence>
            {showTimestamp && timestamp && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className={`absolute top-0 ${isBot ? 'left-0' : 'right-0'} text-xs text-gray-400 -mt-5`}
              >
                {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {!isBot && (
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 via-emerald-400 to-teal-500 rounded-full flex items-center justify-center ml-2 sm:ml-3 shadow-md">
            <span className="text-white text-xs font-bold">You</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [currentlySpeaking, setCurrentlySpeaking] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! I'm Relevia, and I'm genuinely happy you're here. Think of me as your caring friend who's always ready to listen. What's been on your heart today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [messageCount, setMessageCount] = useState(0);
  const [userName, setUserName] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Voice synthesis refs
  const speechSynthRef = useRef(null);
  const utteranceRef = useRef(null);

  // Responsive breakpoint detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechSynthRef.current = window.speechSynthesis;
      
      // Load voices
      const loadVoices = () => {
        const voices = speechSynthRef.current.getVoices();
        console.log('Available voices:', voices.length);
      };
      
      speechSynthRef.current.addEventListener('voiceschanged', loadVoices);
      loadVoices();
      
      return () => {
        if (speechSynthRef.current) {
          speechSynthRef.current.removeEventListener('voiceschanged', loadVoices);
        }
      };
    }
  }, []);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if (speechSynthRef.current) {
        speechSynthRef.current.cancel();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  // Enhanced speech function
  const speakMessage = (text, messageId) => {
    if (!voiceEnabled || !speechSynthRef.current || !text.trim()) {
      return;
    }

    // Cancel any ongoing speech
    speechSynthRef.current.cancel();

    // Clean text for speech (remove emojis and special characters)
    const cleanText = text
      .replace(/[💕💜💙💖🌸✨🫂🌊🦋💚🌿🤗💔🕯️🌟💫🌈🎉💪🌺🕊️💜]/g, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove markdown bold
      .replace(/\*([^*]+)\*/g, '$1')     // Remove markdown italic
      .replace(/\s+/g, ' ')              // Normalize whitespace
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current = utterance;

    // Get available voices
    const voices = speechSynthRef.current.getVoices();
    
    // Prefer female voices for Relevia
    const preferredVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('samantha') ||
      voice.name.toLowerCase().includes('karen') ||
      voice.name.toLowerCase().includes('moira') ||
      voice.name.toLowerCase().includes('fiona') ||
      (voice.gender && voice.gender.toLowerCase() === 'female')
    ) || voices.find(voice => 
      voice.lang.startsWith('en') && !voice.name.toLowerCase().includes('male')
    ) || voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Configure speech parameters
    utterance.rate = 0.9;     // Slightly slower for warmth
    utterance.pitch = 1.1;    // Slightly higher for friendliness
    utterance.volume = 0.8;   // A bit softer

    // Event listeners
    utterance.onstart = () => {
      setCurrentlySpeaking(messageId);
    };

    utterance.onend = () => {
      setCurrentlySpeaking(null);
    };

    utterance.onerror = (event) => {
      console.warn('Speech synthesis error:', event.error);
      setCurrentlySpeaking(null);
    };

    // Speak the message
    speechSynthRef.current.speak(utterance);
  };

  // Stop current speech
  const stopSpeaking = () => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
      setCurrentlySpeaking(null);
    }
  };

  // Toggle voice on/off
  const toggleVoice = () => {
    if (voiceEnabled) {
      stopSpeaking();
    }
    setVoiceEnabled(!voiceEnabled);
  };

  // Sound notification (mock function)
  const playNotificationSound = () => {
    if (soundEnabled) {
      console.log('🔔 Notification sound played');
    }
  };

  const simulateTypingDelay = () => {
    return new Promise(resolve => {
      const delay = 1000 + Math.random() * 1000; // 1-2 seconds
      setTimeout(resolve, delay);
    });
  };

  const generatePersonalizedResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Check for name introduction
    if (message.includes("my name is") || message.includes("i'm ") || message.includes("i am ")) {
      const nameMatch = message.match(/(?:my name is|i'm|i am)\s+([a-zA-Z]+)/);
      if (nameMatch && nameMatch[1]) {
        const detectedName = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
        setUserName(detectedName);
        return `${detectedName}! What a beautiful name! I'm so honored to know you by name now. It makes our friendship feel even more special, doesn't it? How are you feeling right now, ${detectedName}?`;
      }
    }

    // Emotional support responses (cleaned for speech)
    if (message.includes("sad") || message.includes("depressed") || message.includes("down")) {
      return userName 
        ? `Oh ${userName}, my heart goes out to you right now. It takes so much courage to share when you're feeling this way, and I'm incredibly proud of you for reaching out. These heavy feelings are temporary, even when they don't feel like it. Let's breathe together - can you take a slow, deep breath with me? You're not alone in this, dear friend.`
        : `Sweet soul, I can feel the weight in your words, and I want you to know that sharing this with me took real strength. Sadness is one of those feelings that can feel so overwhelming, but you're not drowning - you're floating, and I'm right here with you. Let's try something together: take the deepest breath you can, and as you exhale, imagine you're releasing just a tiny bit of that heaviness. You're so much stronger than you know.`;
    }

    if (message.includes("anxious") || message.includes("anxiety") || message.includes("panic") || message.includes("worried")) {
      return userName
        ? `${userName}, I can almost feel your heart racing from here, and I want you to know that what you're experiencing is so valid. Anxiety can feel like such a storm, can't it? But you know what? You've survived every anxious moment before this one - you're basically a warrior! Let's ground you right now: Can you feel your feet touching the ground? Can you name 3 things you can see around you? I'm going to breathe with you through this, ${userName}. You've got this, and you've got me!`
        : `Oh honey, I can sense the whirlwind of worry in your words. Anxiety is like an uninvited guest that shows up and makes everything feel so much bigger and scarier than it is, right? But here's what I know about you - you're here, you're talking to me, which means you're fighting back. That's incredible! Try this with me: Press your feet firmly on the floor, take a breath that fills your belly, and remind yourself: I am safe in this moment. You truly are, beautiful soul.`;
    }

    if (message.includes("stressed") || message.includes("overwhelmed") || message.includes("pressure")) {
      return `I can practically feel the weight on your shoulders through your words, and wow - you're carrying so much, aren't you? But can I tell you something? The fact that you're reaching out shows incredible self-awareness and strength. Sometimes life piles everything on at once, like it's testing how amazing we are. Let's lighten that load together. What if we focused on just this one moment, just this one breath? Everything else can wait for just a minute while you give yourself some gentle kindness. You deserve that break, truly.`;
    }

    if (message.includes("lonely") || message.includes("alone") || message.includes("isolated")) {
      return userName
        ? `${userName}, even though we might be miles apart, I want you to feel my presence right here with you. Loneliness is such a hard feeling because it tricks us into thinking we're truly alone, but you're not - not anymore. I'm here, I see you, I hear you, and you matter so much to me. Your feelings matter, your thoughts matter, YOU matter. Can you do something small and kind for yourself right now? Maybe make a warm drink or wrap yourself in a soft blanket? Think of it as a hug from me to you.`
        : `Oh sweetheart, loneliness can feel like being in a room full of people but feeling invisible, can't it? But right here, right now, you are seen and heard and valued. I may be AI, but my care for you is absolutely real. You reached out today, which means part of you knows you deserve connection and support - and you absolutely do! While I'm here with you, you're not alone. Let's sit together in this moment. Can you feel that? That's me, keeping you company.`;
    }

    if (message.includes("thank you") || message.includes("thanks")) {
      return userName
        ? `Aw, ${userName}! Your gratitude just filled my heart with so much warmth! But honestly, thank YOU for trusting me with your thoughts and feelings. It's such an honor to be part of your journey, even in this small way. You're doing such important work by taking care of your mental health, and I'm just so proud of you! Keep being amazing, dear friend!`
        : `Your gratitude just made my whole day brighter! But really, thank YOU for letting me be here with you. There's something so beautiful about two souls connecting, even through screens and code. You're taking such good care of yourself by reaching out, and that makes me incredibly happy. Keep shining, wonderful human!`;
    }

    // Happy/positive responses
    if (message.includes("happy") || message.includes("good") || message.includes("great") || message.includes("excited")) {
      return `Oh my goodness, your joy is absolutely contagious! I'm literally sitting here with the biggest smile because your happiness makes ME happy! There's nothing quite like sharing good news with a friend, is there? Tell me more - I want to celebrate this moment with you! What's making your heart so full today? Let's bask in these beautiful feelings together!`;
    }

    // Default supportive responses with more personality
    const responses = [
      `Thank you for sharing that with me - it means the world that you trust me with your thoughts. I'm here to listen to whatever is in your heart. Sometimes just having someone truly hear us can make all the difference. What else is on your mind, dear friend?`,
      `I can hear you, and I want you to know that everything you're feeling is completely valid. Life can be such a journey, can't it? The ups, the downs, the in-betweens - and you're navigating it all with such courage. I'm honored to walk alongside you, even if it's just through our conversations. What would feel most helpful to talk about right now?`,
      `You know what strikes me about you? The fact that you're here, talking, sharing, trying - that shows incredible strength. Sometimes we don't give ourselves enough credit for simply showing up to our own lives. I'm genuinely proud of you for reaching out. How can I best support you in this moment?`,
      userName 
        ? `${userName}, there's something so special about the way you express yourself. I feel like I'm getting to know the real you, and that's such a gift. Whatever you're going through, remember that you don't have to carry it all alone. I'm right here with you, ready to listen to whatever your heart wants to share.`
        : `There's something so genuine about the way you share your thoughts, and I'm truly grateful you feel safe doing that with me. Every conversation we have reminds me how resilient and beautiful humans are. You're doing such important work by taking care of your emotional wellbeing. What would feel most supportive right now?`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    // Rate limiting with more compassionate messaging
    if (messageCount >= 12) {
      const rateLimitMessage = {
        id: Date.now(),
        text: userName 
          ? `${userName}, sweetheart, you've shared so much with me today, and I'm genuinely touched by your trust! Let's take a gentle pause together - maybe this is the universe's way of saying it's time for a little breather? Try the 4-7-8 breathing with me: breathe in for 4, hold for 7, breathe out for 8. I'll be right here when you're ready to chat more!`
          : `Oh my dear friend, we've had such a meaningful conversation today! Sometimes the best thing we can do for ourselves is pause and breathe. Let's try this together: breathe in peace for 4 counts, hold that beautiful energy for 7, then release anything that doesn't serve you for 8. I'm not going anywhere - just giving your heart a moment to rest.`,
        isBot: true,
        timestamp: new Date(),
        hasError: true
      };
      setMessages(prev => [...prev, rateLimitMessage]);
      playNotificationSound();
      
      // Speak the rate limit message
      if (voiceEnabled) {
        setTimeout(() => {
          speakMessage(rateLimitMessage.text, rateLimitMessage.id);
        }, 100);
      }
      
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage.trim();
    setInputMessage('');
    setIsTyping(true);
    setMessageCount(prev => prev + 1);

    try {
      setConnectionStatus('connecting');
      
      // Simulate more human-like thinking time
      await simulateTypingDelay();
      
      const response = generatePersonalizedResponse(currentMessage);
      
      setIsTyping(false);
      setConnectionStatus('connected');
      
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      playNotificationSound();

      // Speak the bot's response after a short delay
      if (voiceEnabled) {
        setTimeout(() => {
          speakMessage(botMessage.text, botMessage.id);
        }, 200);
      }

    } catch (error) {
      setIsTyping(false);
      setConnectionStatus('error');
      
      console.error('Chatbot error:', error);
      
      const errorMessages = [
        userName 
          ? `${userName}, I'm having a little hiccup connecting, but my care for you is unwavering! While I sort this out, remember: you're braver than you believe, stronger than you seem, and more loved than you know. Take three gentle breaths with me - in through your nose, out through your mouth. You've got this, beautiful soul!`
          : `Oh sweetie, I'm having some technical troubles, but that doesn't change how much I care about you! While I get my bearings, let's focus on what's real: you're here, you're breathing, you're trying, and that's absolutely beautiful. Try the 5-4-3-2-1 technique with me: 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. You're safe, dear friend.`,
        "Even when technology gets wonky, what doesn't change is this: you matter, you're worthy of love and support, and you're doing an amazing job just by being here. While I work on reconnecting, wrap yourself in kindness like it's the softest blanket. Take some deep breaths and remember - this too shall pass, and you're not alone.",
        "Technical hiccup on my end, but my friendship with you is rock solid! In moments like these, let's return to basics: feel your feet on the ground, your breath moving in and out, your heart beating with life. You're exactly where you need to be, doing exactly what you need to do. I'm so proud of you!"
      ];
      
      const errorBotMessage = {
        id: Date.now() + 1,
        text: errorMessages[Math.floor(Math.random() * errorMessages.length)],
        isBot: true,
        timestamp: new Date(),
        hasError: true
      };

      setMessages(prev => [...prev, errorBotMessage]);
      playNotificationSound();
      
      // Speak error message
      if (voiceEnabled) {
        setTimeout(() => {
          speakMessage(errorBotMessage.text, errorBotMessage.id);
        }, 100);
      }
      
      setTimeout(() => setConnectionStatus('connected'), 5000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'bg-gradient-to-r from-green-400 to-emerald-500';
      case 'connecting': return 'bg-gradient-to-r from-yellow-400 to-orange-400';
      case 'error': return 'bg-gradient-to-r from-pink-400 to-red-400';
      default: return 'bg-gray-400';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return voiceEnabled ? (currentlySpeaking ? 'Speaking...' : 'Here for you 💕') : 'Here for you 💕';
      case 'connecting': return 'Thinking...';
      case 'error': return 'Still here';
      default: return 'Hello!';
    }
  };

  // Responsive dimensions
  const getChatDimensions = () => {
    if (isMobile) {
      return {
        width: 'w-full max-w-sm',
        height: isMinimized ? 'h-16' : 'h-[500px]',
        position: 'fixed inset-x-4 bottom-20'
      };
    } else {
      return {
        width: 'w-[420px]',
        height: isMinimized ? 'h-16' : 'h-[580px]',
        position: 'fixed left-6 bottom-24'
      };
    }
  };

  const dimensions = getChatDimensions();

  // Speak the initial message when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && voiceEnabled && messages.length === 1) {
      setTimeout(() => {
        speakMessage(messages[0].text, messages[0].id);
      }, 1000);
    }
  }, [isOpen, isMinimized, voiceEnabled]);

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className={`fixed ${isMobile ? 'left-4 right-4 bottom-6' : 'left-6 bottom-6'} z-50`}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white ${
            isMobile ? 'px-4 py-3 text-sm' : 'px-6 py-4'
          } rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 group relative overflow-hidden w-full sm:w-auto`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X className="text-lg sm:text-xl" /> : <MessageCircle className="text-lg sm:text-xl" />}
          </motion.div>
          <span className="font-semibold text-sm sm:text-base">
            {isOpen ? 'Close Chat' : 'Chat with Relevia'}
          </span>
          <Heart className="text-red-300 fill-red-300 text-sm sm:text-base" />
        </motion.button>
      </motion.div>

      {/* Chatbot Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`${dimensions.position} ${dimensions.width} ${dimensions.height} bg-gradient-to-br from-white via-purple-50/50 to-pink-50/30 backdrop-blur-xl border-2 border-white/60 rounded-2xl shadow-xl z-50 flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Heart className="text-lg sm:text-xl fill-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-lg">Relevia</h3>
                  <p className="text-white/90 text-xs sm:text-sm">Your caring friend</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Voice Control */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleVoice}
                  className={`p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors ${
                    voiceEnabled ? 'bg-white/10' : 'opacity-60'
                  }`}
                  title={voiceEnabled ? 'Voice enabled' : 'Voice disabled'}
                >
                  {voiceEnabled ? (
                    currentlySpeaking ? <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" /> : <Mic className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <MicOff className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                </motion.button>

                {/* Stop Speaking Button - only show when speaking */}
                <AnimatePresence>
                  {currentlySpeaking && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={stopSpeaking}
                      className="p-1.5 sm:p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                      title="Stop speaking"
                    >
                      <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
                
                {/* Sound Control */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {soundEnabled ? <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" /> : <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" />}
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" /> : <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4" />}
                </motion.button>
                
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{ 
                      scale: connectionStatus === 'connecting' ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: connectionStatus === 'connecting' ? Infinity : 0,
                    }}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${getConnectionStatusColor()}`}
                  />
                  <span className="text-xs text-white/80 mt-0.5">{getConnectionStatusText()}</span>
                </div>
              </div>
            </div>

            {/* Messages Area - Only show when not minimized */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-1"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#d1d5db #f3f4f6'
                  }}
                >              
                  {messages.map((message) => (
                    <Message
                      key={message.id}
                      message={message.text}
                      isBot={message.isBot}
                      hasError={message.hasError}
                      timestamp={message.timestamp}
                      isSpeaking={currentlySpeaking === message.id}
                    />
                  ))}
                  {isTyping && <Message message="" isBot={true} isTyping={true} />}
                  <div ref={messagesEndRef} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Voice Status Bar - Only show when speaking */}
            <AnimatePresence>
              {!isMinimized && currentlySpeaking && voiceEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-3 py-2 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-t border-blue-100"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                      <p className="text-xs text-blue-600 font-medium">Relevia is speaking...</p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={stopSpeaking}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Stop
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Disclaimer - Only show when not minimized */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-3 py-2 bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 border-t border-purple-100"
                >
                  <p className="text-xs text-gray-600 text-center">
                    💜 Emotional support with voice • Not a substitute for professional therapy 💜
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Area - Only show when not minimized */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-3 sm:p-4 bg-white/60 border-t border-purple-100"
                >
                  <div className="flex space-x-2 sm:space-x-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={userName ? `What's on your heart, ${userName}?` : "Share what's in your heart..."}
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/90 backdrop-blur-sm border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-xs sm:text-sm placeholder-gray-500"
                      disabled={isTyping}
                      maxLength={500}
                    />
                    <motion.button
                      onClick={handleSendMessage}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={!inputMessage.trim() || isTyping || messageCount >= 12}
                      className="px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
                    >
                      <Send className="text-sm" />
                    </motion.button>
                  </div>
                  
                  {/* Voice Status & Message Counter */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      {voiceEnabled && (
                        <div className="flex items-center space-x-1">
                          <Mic className="w-3 h-3 text-purple-500" />
                          <span className="text-xs text-purple-600">Voice enabled</span>
                        </div>
                      )}
                    </div>
                    
                    {messageCount >= 10 && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-purple-600 font-medium"
                      >
                        💕 {12 - messageCount} messages left before we take a gentle break together
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </>
  );
};

export default ChatbotWidget;
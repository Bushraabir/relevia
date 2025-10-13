import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Send, MessageCircle, Sparkles, Minimize2, Maximize2, Volume2, VolumeX, Mic, MicOff, AlertCircle } from 'lucide-react';

// Import optimized brain with streaming support
import { think, warmupEngine } from '../services/releviaBrain';
import { analyzeEmotionalTone } from '../services/memoryUtils';

const Message = ({ message, isBot, isTyping = false, hasError = false, isCrisis = false, timestamp, currentlySpeaking }) => {
  const [showTimestamp, setShowTimestamp] = useState(false);
  
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
              scale: isCrisis ? [1, 1.05, 1] : currentlySpeaking ? [1, 1.08, 1] : [1, 1.02, 1],
            }}
            transition={{ 
              duration: isCrisis ? 1.2 : currentlySpeaking ? 0.8 : 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-2 sm:mr-3 shadow-md ${
              isCrisis 
                ? 'bg-gradient-to-br from-red-400 via-orange-500 to-yellow-500' 
                : currentlySpeaking
                ? 'bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400'
                : 'bg-gradient-to-br from-purple-400 via-pink-400 to-red-400'
            }`}
          >
            {isCrisis ? (
              <AlertCircle className="text-white text-xs sm:text-sm" />
            ) : currentlySpeaking ? (
              <Volume2 className="text-white text-xs sm:text-sm" />
            ) : (
              <Heart className="text-white text-xs sm:text-sm" />
            )}
          </motion.div>
        )}
        
        <div className="relative">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className={`px-3 sm:px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm relative overflow-hidden transition-all duration-200 ${
              isBot 
                ? isCrisis
                  ? 'bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 text-red-900'
                  : currentlySpeaking
                  ? 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 text-gray-700'
                  : 'bg-gradient-to-br from-white to-purple-50 border border-purple-100 text-gray-700' 
                : 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white'
            }`}
          >
            {isTyping ? (
              <div className="flex space-x-2 items-center py-1">
                <span className="text-xs sm:text-sm text-purple-600 mr-2 font-medium">Typing...</span>
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
              </div>
            ) : (
              <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">{message}</p>
            )}
          </motion.div>
          
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
      text: "Hey there! I'm Relevia, and I'm genuinely here for you. Think of me as your caring friend who's always ready to listen. What's on your heart today?",
      isBot: true,
      timestamp: new Date(),
      isCrisis: false
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [messageCount, setMessageCount] = useState(0);
  const [userName, setUserName] = useState('');
  const [userId] = useState('anon');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const speechSynthRef = useRef(null);
  const utteranceRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Warm up WebGPU + LoRA weights on first render
  useEffect(() => {
    const warmupOnce = async () => {
      if (!window.releviaWarmed) {
        try {
          console.log('[Chat] Starting warmup...');
          await warmupEngine();
          window.releviaWarmed = true;
          console.log('[Chat] Warmup complete - ready for first message');
        } catch (err) {
          console.warn('[Chat] Warmup skipped:', err);
        }
      }
    };
    
    warmupOnce();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechSynthRef.current = window.speechSynthesis;
      
      const loadVoices = () => {
        const voices = speechSynthRef.current.getVoices();
        console.log('Voice synthesis ready:', voices.length, 'voices available');
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

  useEffect(() => {
    return () => {
      if (speechSynthRef.current) {
        speechSynthesis.cancel();
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

  const speakMessage = (text, messageId) => {
    if (!voiceEnabled || !speechSynthRef.current || !text.trim()) {
      return;
    }

    speechSynthRef.current.cancel();

    const cleanText = text
      .replace(/[💕💜💙💖🌸✨🫂🌊🦋💚🌿🤗💔🕯️🌟💫🌈🎉💪🌺🕊️]/g, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current = utterance;

    const voices = speechSynthRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('samantha')
    ) || voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;

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

    speechSynthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
      setCurrentlySpeaking(null);
    }
  };

  const toggleVoice = () => {
    if (voiceEnabled) {
      stopSpeaking();
    }
    setVoiceEnabled(!voiceEnabled);
  };

  const handleSendMessage = async () => {
    // Rate limit check
    if (messageCount >= 12) {
      const rateLimitMessage = {
        id: Date.now(),
        text: `${userName || 'friend'}, we've had a meaningful conversation. Consider taking a break and trying grounding techniques.`,
        isBot: true,
        timestamp: new Date(),
        hasError: true,
        isCrisis: false
      };
      setMessages(prev => [...prev, rateLimitMessage]);
      return;
    }

    if (!inputMessage.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      isBot: false,
      timestamp: new Date(),
      isCrisis: false
    };

    const currentMessage = inputMessage.trim();
    const nameMatch = currentMessage.match(/(?:my name is|i'm|i am)\s+([a-zA-Z]+)/i);
    if (nameMatch && nameMatch[1]) {
      const detectedName = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
      setUserName(detectedName);
    }

    setInputMessage('');
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setMessageCount(prev => prev + 1);

    try {
      setConnectionStatus('connecting');
      console.log('[Chat] Sending message:', currentMessage);
      
      let partialMessage = '';
      let botMessageId = Date.now() + 1;

      // OPTIMIZATION: Stream tokens live to UI
      const response = await think(currentMessage, userId, (token) => {
        partialMessage += token;
        
        // Update the last bot message with partial response
        setMessages(prev => {
          const newMessages = [...prev];
          const lastBotMsg = newMessages.findLast(m => m.isBot && m.id === botMessageId);
          if (lastBotMsg) {
            lastBotMsg.text = partialMessage;
          }
          return newMessages;
        });
      });

      setConnectionStatus('connected');
      console.log('[Chat] Response complete:', response.substring(0, 50));

      const isCrisisResponse = response.includes('988') || response.includes('116 123') || response.includes('findahelpline');

      // Final message with complete response
      const botMessage = {
        id: botMessageId,
        text: response,
        isBot: true,
        timestamp: new Date(),
        isCrisis: isCrisisResponse
      };

      setMessages(prev => [...prev, botMessage]);

      if (voiceEnabled) {
        setTimeout(() => {
          speakMessage(botMessage.text, botMessage.id);
        }, 200);
      }

    } catch (error) {
      console.error('[Chat] Error:', error);
      setConnectionStatus('error');
      
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm experiencing a technical difficulty. If you're in crisis: US 988, UK 116 123. Your wellbeing matters.",
        isBot: true,
        timestamp: new Date(),
        hasError: true,
        isCrisis: true
      };

      setMessages(prev => [...prev, errorMessage]);
      
      if (voiceEnabled) {
        setTimeout(() => {
          speakMessage(errorMessage.text, errorMessage.id);
        }, 100);
      }
      
      setTimeout(() => setConnectionStatus('connected'), 5000);

    } finally {
      console.log('[Chat] Message complete');
      setIsTyping(false);
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
      case 'connected': return 'Ready';
      case 'connecting': return 'Thinking...';
      case 'error': return 'Reconnecting...';
      default: return 'Hello!';
    }
  };

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

  return (
    <>
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
          } rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 w-full sm:w-auto`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X className="text-lg sm:text-xl" /> : <MessageCircle className="text-lg sm:text-xl" />}
          </motion.div>
          <span className="font-semibold text-sm sm:text-base">
            {isOpen ? 'Close' : 'Chat with Relevia'}
          </span>
          <Heart className="text-red-300 fill-red-300 text-sm sm:text-base" />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`${dimensions.position} ${dimensions.width} ${dimensions.height} bg-gradient-to-br from-white via-purple-50/50 to-pink-50/30 backdrop-blur-xl border-2 border-white/60 rounded-2xl shadow-xl z-50 flex flex-col overflow-hidden`}
          >
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Heart className="text-lg sm:text-xl fill-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-lg">Relevia</h3>
                  <p className="text-white/90 text-xs sm:text-sm">Fast & caring support</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleVoice}
                  className={`p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors`}
                >
                  {voiceEnabled ? <Mic className="w-3 h-3 sm:w-4 sm:h-4" /> : <MicOff className="w-3 h-3 sm:w-4 sm:h-4" />}
                </motion.button>

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

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-1 custom-scrollbar"
                >              
                  {messages.map((message) => (
                    <Message
                      key={message.id}
                      message={message.text}
                      isBot={message.isBot}
                      hasError={message.hasError}
                      isCrisis={message.isCrisis}
                      timestamp={message.timestamp}
                      currentlySpeaking={currentlySpeaking === message.id}
                    />
                  ))}
                  {isTyping && <Message message="" isBot={true} isTyping={true} />}
                  <div ref={messagesEndRef} />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-3 py-2 bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 border-t border-purple-100"
                >
                  <p className="text-xs text-gray-600 text-center">
                    Emotional support • Not therapy • In crisis? 988
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

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
                      placeholder={userName ? `What's on your mind, ${userName}?` : "Share what's on your heart..."}
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/90 backdrop-blur-sm border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-xs sm:text-sm placeholder-gray-500"
                      disabled={isTyping || messageCount >= 12}
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
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      {voiceEnabled && (
                        <div className="flex items-center space-x-1">
                          <Mic className="w-3 h-3 text-purple-500" />
                          <span className="text-xs text-purple-600">Voice on</span>
                        </div>
                      )}
                    </div>
                    
                    {messageCount >= 10 && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-purple-600 font-medium"
                      >
                        {12 - messageCount} messages left
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx={true}>{`
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
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane, FaRobot, FaHeart, FaExclamationTriangle } from 'react-icons/fa';
import { fetchGroqResponse, isApiKeyConfigured } from '../services/groqApi';

const Message = ({ message, isBot, isTyping = false, hasError = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`flex items-start max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        {isBot && (
          <motion.div
            animate={{ 
              scale: hasError ? [1, 1.1, 1] : [1, 1.05, 1],
              rotate: hasError ? [0, -5, 5, 0] : [0, 2, -2, 0]
            }}
            transition={{ 
              duration: hasError ? 1 : 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-soft ${
              hasError 
                ? 'bg-gradient-to-br from-orange-400 to-orange-600' 
                : 'bg-gradient-to-br from-blue-400 to-blue-600'
            }`}
          >
            {hasError ? (
              <FaExclamationTriangle className="text-white text-sm" />
            ) : (
              <FaRobot className="text-white text-sm" />
            )}
          </motion.div>
        )}
        
        <div className={`px-4 py-3 rounded-2xl shadow-soft ${
          isBot 
            ? hasError 
              ? 'bg-orange-50/80 backdrop-blur-sm border border-orange-200 text-orange-800'
              : 'bg-white/80 backdrop-blur-sm border border-blue-100 text-gray-700' 
            : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
        }`}>
          {isTyping ? (
            <div className="flex space-x-1 items-center">
              <span className="text-xs text-blue-500 mr-2">Rleva is thinking</span>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-2 bg-blue-400 rounded-full"
                />
              ))}
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
          )}
        </div>
        
        {!isBot && (
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center ml-3 shadow-soft">
            <span className="text-white text-xs font-semibold">You</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Rleva, your compassionate AI companion. I'm here to listen and support you through any difficult moments. How are you feeling right now?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Check API configuration on mount
  useEffect(() => {
    if (!isApiKeyConfigured()) {
      setConnectionStatus('no-api-key');
      console.warn('Groq API key not configured. Add VITE_GROQ_API_KEY to your .env file');
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    // Rate limiting check (basic)
    if (messageCount >= 10) {
      const rateLimitMessage = {
        id: Date.now(),
        text: "You've sent quite a few messages. Let's take a moment to breathe together. Try the 4-7-8 technique: breathe in for 4, hold for 7, breathe out for 8.",
        isBot: true,
        timestamp: new Date(),
        hasError: true
      };
      setMessages(prev => [...prev, rateLimitMessage]);
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setMessageCount(prev => prev + 1);

    try {
      setConnectionStatus('connecting');
      
      const response = await fetchGroqResponse(userMessage.text);
      
      setIsTyping(false);
      setConnectionStatus('connected');
      
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      setIsTyping(false);
      setConnectionStatus('error');
      
      console.error('Chatbot error:', error);
      
      let errorMessage = "I'm having trouble connecting right now, but I'm still here for you. Try taking three deep breaths: in through your nose, out through your mouth. You're stronger than you know.";
      
      // Customize error message based on error type
      if (error.message.includes('rate limit')) {
        errorMessage = "I'm getting a lot of requests right now. While you wait, try this: Take a slow breath in for 4 counts, hold for 4, then exhale for 6. You're doing great.";
      } else if (error.message.includes('API key')) {
        errorMessage = "I'm having trouble connecting. In the meantime, remember: breathe slowly, you're safe, and this feeling will pass. Try the 5-4-3-2-1 grounding technique.";
      }
      
      const errorBotMessage = {
        id: Date.now() + 1,
        text: errorMessage,
        isBot: true,
        timestamp: new Date(),
        hasError: true
      };

      setMessages(prev => [...prev, errorBotMessage]);
      
      // Reset connection status after a delay
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
      case 'connected': return 'bg-green-400';
      case 'connecting': return 'bg-yellow-400';
      case 'error': return 'bg-red-400';
      case 'no-api-key': return 'bg-orange-400';
      default: return 'bg-gray-400';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'Connected';
      case 'connecting': return 'Thinking...';
      case 'error': return 'Connection issue';
      case 'no-api-key': return 'Setup needed';
      default: return 'Unknown';
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed left-6 bottom-6 z-50"
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 group"
        >
          <motion.div
            animate={{ 
              rotate: isOpen ? 180 : 0,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 0.3,
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {isOpen ? <FaTimes className="text-xl" /> : <FaComments className="text-xl" />}
          </motion.div>
          <span className="font-medium">
            {isOpen ? 'Close Chat' : 'Chat with Rleva'}
          </span>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <FaHeart className="text-red-300" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Chatbot Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed left-6 bottom-24 w-96 h-[500px] bg-white/90 backdrop-blur-lg border border-white/50 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <FaRobot className="text-xl" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-lg">Rleva</h3>
                  <p className="text-blue-100 text-sm">Your compassionate AI companion</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <motion.div
                  animate={{ 
                    scale: connectionStatus === 'connecting' ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: connectionStatus === 'connecting' ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                  className={`w-3 h-3 rounded-full ${getConnectionStatusColor()}`}
                />
                <span className="text-xs text-blue-100 mt-1">{getConnectionStatusText()}</span>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2" style={{ scrollbarWidth: 'thin' }}>
              {!isApiKeyConfigured() && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-4"
                >
                  <p className="text-orange-800 text-xs">
                    <FaExclamationTriangle className="inline mr-1" />
                    API key not configured. Using fallback responses.
                  </p>
                </motion.div>
              )}
              
              {messages.map((message) => (
                <Message
                  key={message.id}
                  message={message.text}
                  isBot={message.isBot}
                  hasError={message.hasError}
                />
              ))}
              {isTyping && <Message message="" isBot={true} isTyping={true} />}
              <div ref={messagesEndRef} />
            </div>

            {/* Disclaimer */}
            <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-200/50">
              <p className="text-xs text-gray-500 text-center">
                Rleva provides support but isn't a substitute for professional therapy
              </p>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/50 border-t border-white/50">
              <div className="flex space-x-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind..."
                  className="flex-1 px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-sm"
                  disabled={isTyping}
                  maxLength={500}
                />
                <motion.button
                  onClick={handleSendMessage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputMessage.trim() || isTyping || messageCount >= 10}
                  className="px-4 py-3 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl transition-all duration-300 shadow-soft hover:shadow-lg disabled:cursor-not-allowed"
                >
                  <FaPaperPlane className="text-sm" />
                </motion.button>
              </div>
              {messageCount >= 8 && (
                <p className="text-xs text-orange-600 mt-2 text-center">
                  {10 - messageCount} messages remaining before cooldown
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Background Elements */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 pointer-events-none z-40">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 0.1,
                  scale: 1,
                  x: [0, 20, -20, 0],
                  y: [0, -30, 30, 0],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 1.5,
                }}
                className={`absolute w-20 h-20 rounded-full ${
                  i % 3 === 0 ? 'bg-blue-200' : 
                  i % 3 === 1 ? 'bg-green-200' : 'bg-purple-200'
                }`}
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${10 + Math.random() * 80}%`,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
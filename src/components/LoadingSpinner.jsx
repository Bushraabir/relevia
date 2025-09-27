import React, { useState, useEffect } from 'react';

/**
 * Advanced LoadingSpinner component with multiple animation styles and themes
 * Features:
 * - Multiple spinner types (circle, dots, waves, pulse)
 * - Customizable colors using Tailwind theme
 * - Optional loading messages with typewriter effect
 * - Accessibility features (ARIA labels, reduced motion)
 * - Size variants (sm, md, lg, xl)
 * - Overlay support for full-screen loading
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Spinner type: 'circle', 'dots', 'waves', 'pulse', 'breathing'
 * @param {string} props.size - Size variant: 'sm', 'md', 'lg', 'xl'
 * @param {string} props.color - Color theme: 'primary', 'secondary', 'accent'
 * @param {boolean} props.overlay - Whether to show as full-screen overlay
 * @param {string} props.message - Optional loading message
 * @param {Array} props.messages - Array of rotating messages
 * @param {boolean} props.showProgress - Show progress indicator (if applicable)
 * @param {number} props.progress - Progress percentage (0-100)
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} LoadingSpinner component
 */
const LoadingSpinner = ({
  type = 'circle',
  size = 'md',
  color = 'primary',
  overlay = false,
  message = '',
  messages = [],
  showProgress = false,
  progress = 0,
  className = '',
  ...props
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Size configurations
  const sizeConfig = {
    sm: {
      spinner: 'w-6 h-6',
      container: 'p-4',
      text: 'text-sm',
      dots: 'w-2 h-2',
      waves: 'w-1 h-8',
    },
    md: {
      spinner: 'w-8 h-8',
      container: 'p-6',
      text: 'text-base',
      dots: 'w-3 h-3',
      waves: 'w-1.5 h-12',
    },
    lg: {
      spinner: 'w-12 h-12',
      container: 'p-8',
      text: 'text-lg',
      dots: 'w-4 h-4',
      waves: 'w-2 h-16',
    },
    xl: {
      spinner: 'w-16 h-16',
      container: 'p-10',
      text: 'text-xl',
      dots: 'w-5 h-5',
      waves: 'w-3 h-20',
    },
  };

  // Color configurations
  const colorConfig = {
    primary: {
      main: 'text-primary-500',
      light: 'text-primary-300',
      bg: 'bg-primary-500',
      bgLight: 'bg-primary-300',
      border: 'border-primary-500',
      gradient: 'from-primary-400 to-primary-600',
    },
    secondary: {
      main: 'text-secondary-500',
      light: 'text-secondary-300',
      bg: 'bg-secondary-500',
      bgLight: 'bg-secondary-300',
      border: 'border-secondary-500',
      gradient: 'from-secondary-400 to-secondary-600',
    },
    accent: {
      main: 'text-accent-500',
      light: 'text-accent-300',
      bg: 'bg-accent-500',
      bgLight: 'bg-accent-300',
      border: 'border-accent-500',
      gradient: 'from-accent-400 to-accent-600',
    },
  };

  const currentSize = sizeConfig[size];
  const currentColor = colorConfig[color];

  // Typewriter effect for messages
  useEffect(() => {
    if (messages.length === 0 && !message) return;

    const messagesToShow = messages.length > 0 ? messages : [message];
    const currentMessage = messagesToShow[currentMessageIndex];

    let timeoutId;
    
    if (!isTyping) {
      setIsTyping(true);
      setDisplayedMessage('');
      
      // Typewriter effect
      for (let i = 0; i <= currentMessage.length; i++) {
        timeoutId = setTimeout(() => {
          setDisplayedMessage(currentMessage.slice(0, i));
          if (i === currentMessage.length) {
            setIsTyping(false);
            // Move to next message after 2 seconds
            if (messages.length > 1) {
              setTimeout(() => {
                setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
              }, 2000);
            }
          }
        }, i * 50);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [currentMessageIndex, messages, message, isTyping]);

  // Circle Spinner
  const CircleSpinner = () => (
    <div className={`relative ${currentSize.spinner}`}>
      <div 
        className={`absolute inset-0 rounded-full border-4 ${currentColor.bgLight} opacity-25`}
      />
      <div 
        className={`absolute inset-0 rounded-full border-4 border-transparent ${currentColor.border} border-t-transparent animate-spin`}
        style={{
          borderTopColor: 'transparent',
          borderRightColor: 'currentColor',
          borderBottomColor: 'currentColor',
          borderLeftColor: 'currentColor',
        }}
      />
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
    </div>
  );

  // Dots Spinner
  const DotsSpinner = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${currentSize.dots} ${currentColor.bg} rounded-full animate-pulse`}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1.4s',
          }}
        />
      ))}
    </div>
  );

  // Waves Spinner
  const WavesSpinner = () => (
    <div className="flex items-end space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`${currentSize.waves} ${currentColor.bg} rounded-full animate-pulse`}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1.2s',
            transformOrigin: 'bottom',
          }}
        />
      ))}
    </div>
  );

  // Pulse Spinner
  const PulseSpinner = () => (
    <div className="relative">
      <div className={`${currentSize.spinner} ${currentColor.bg} rounded-full animate-gentlePulse opacity-75`} />
      <div 
        className={`absolute inset-2 bg-gradient-to-br ${currentColor.gradient} rounded-full animate-gentlePulse`}
        style={{ animationDelay: '0.5s' }}
      />
      <div 
        className="absolute inset-4 bg-white rounded-full animate-gentlePulse"
        style={{ animationDelay: '1s' }}
      />
    </div>
  );

  // Breathing Spinner (Mental Health themed)
  const BreathingSpinner = () => (
    <div className="relative">
      <div 
        className={`${currentSize.spinner} rounded-full border-4 ${currentColor.border} animate-gentlePulse`}
        style={{
          background: `conic-gradient(from 0deg, transparent, ${colorConfig[color].bg.replace('bg-', '')}, transparent)`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-2 h-2 ${currentColor.bg} rounded-full animate-gentlePulse`} />
      </div>
      <div className="absolute -inset-2 rounded-full border border-dashed border-opacity-30 animate-gentlePulse" 
           style={{ animationDelay: '1.5s', borderColor: 'currentColor' }} />
    </div>
  );

  // Progress Bar
  const ProgressBar = () => (
    showProgress && (
      <div className="w-full bg-neutral-200 rounded-full h-2 mt-4">
        <div 
          className={`h-2 bg-gradient-to-r ${currentColor.gradient} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    )
  );

  // Render appropriate spinner type
  const renderSpinner = () => {
    switch (type) {
      case 'dots':
        return <DotsSpinner />;
      case 'waves':
        return <WavesSpinner />;
      case 'pulse':
        return <PulseSpinner />;
      case 'breathing':
        return <BreathingSpinner />;
      case 'circle':
      default:
        return <CircleSpinner />;
    }
  };

  const spinnerContent = (
    <div 
      className={`flex flex-col items-center justify-center ${currentSize.container} ${className}`}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <div className={`${currentColor.main} animate-fadeIn`}>
        {renderSpinner()}
      </div>
      
      {(message || messages.length > 0) && (
        <div className={`mt-4 ${currentSize.text} ${currentColor.main} font-body text-center animate-fadeIn`}>
          <span className="inline-block min-h-[1.5em]">
            {displayedMessage}
            {isTyping && (
              <span className="animate-pulse ml-1 text-neutral-400">|</span>
            )}
          </span>
        </div>
      )}

      <ProgressBar />

      <span className="sr-only">Loading, please wait...</span>
    </div>
  );

  // Render with or without overlay
  if (overlay) {
    return (
      <div 
        className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
        }}
      >
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

// Default messages for mental health context
LoadingSpinner.defaultProps = {
  messages: [
    "Taking a moment for yourself...",
    "Preparing your wellness tools...",
    "Loading peaceful content...",
    "Gathering supportive resources...",
  ]
};

export default LoadingSpinner;
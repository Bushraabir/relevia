import { useState, useEffect, useRef } from 'react';

function AdvancedMindfulness() {
  const [step, setStep] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [breathing, setBreathing] = useState(false);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathCount, setBreathCount] = useState(0);
  const [showEmergencyHelp, setShowEmergencyHelp] = useState(false);
  const [userResponses, setUserResponses] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('inhale');

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const emergencyTechniques = [
    { name: "Cold Water", instruction: "Hold cold water in your hands or splash on your face", icon: "❄️" },
    { name: "7-11 Breathing", instruction: "Breathe in for 7 counts, out for 11 counts", icon: "🫁" },
    { name: "Name & Describe", instruction: "Name 3 objects and describe them in detail", icon: "🔍" },
    { name: "Muscle Release", instruction: "Tense all muscles for 5 seconds, then release", icon: "💪" },
    { name: "Safe Place", instruction: "Visualize your most peaceful, safe space", icon: "🏡" },
    { name: "Hold Ice", instruction: "Hold an ice cube or cold object", icon: "🧊" }
  ];

  const steps = [
    { 
      instruction: '5 things you can see right now', 
      placeholder: 'A soft lamp casting warm light across my desk...', 
      icon: '👁️', 
      prompt: 'Look around slowly and notice each detail. Let your eyes rest gently on each object. You\'re anchoring yourself in this safe moment.',
      color: 'from-primary-100 to-primary-200',
      accentColor: 'primary-500',
      bgGradient: 'from-primary-50 to-primary-100',
      helpText: 'Focus on colors, shapes, textures. Notice shadows and light. This grounds you in reality.'
    },
    { 
      instruction: '4 things you can feel or touch', 
      placeholder: 'The soft fabric of my shirt against my skin, the cool surface of my phone...', 
      icon: '✋', 
      prompt: 'Feel the textures around you. Temperature, weight, smoothness, roughness. Your body is here and safe.',
      color: 'from-secondary-100 to-secondary-200',
      accentColor: 'secondary-500',
      bgGradient: 'from-secondary-50 to-secondary-100',
      helpText: 'Touch different textures. Feel your feet on the ground. You are physically present and safe.'
    },
    { 
      instruction: '3 sounds you can hear around you', 
      placeholder: 'The gentle hum of the air conditioner, distant traffic...', 
      icon: '👂', 
      prompt: 'Close your eyes if it helps. Let the sounds wash over you without judgment. You are here, you are safe.',
      color: 'from-accent-100 to-accent-200',
      accentColor: 'accent-500',
      bgGradient: 'from-accent-50 to-accent-100',
      helpText: 'Listen to both near and far sounds. Even silence has a quality. Sound connects you to the present.'
    },
    { 
      instruction: '2 scents you notice or can imagine', 
      placeholder: 'The comforting smell of coffee lingering in the air...', 
      icon: '👃', 
      prompt: 'Breathe in slowly and deeply. Scents can transport us to peaceful memories and ground us in the present.',
      color: 'from-primary-200 to-secondary-100',
      accentColor: 'primary-600',
      bgGradient: 'from-primary-50 to-secondary-50',
      helpText: 'If you can\'t smell anything, imagine a comforting scent. This engages your memory and calms your mind.'
    },
    { 
      instruction: '1 taste in your mouth right now', 
      placeholder: 'The lingering taste of mint tea, or the neutral taste of calm breathing...', 
      icon: '👅', 
      prompt: 'Focus on this final sense. You are fully present in your body, completely in this moment of growing calm.',
      color: 'from-secondary-200 to-accent-100',
      accentColor: 'secondary-600',
      bgGradient: 'from-secondary-50 to-accent-50',
      helpText: 'Even the taste of your mouth or breath counts. You are connected to your body and this moment.'
    },
  ];

  const startExercise = () => {
    setIsStarted(true);
    setStep(0);
    setCompleted(false);
    setBreathing(true);
    setUserResponses([]);
    setShowProgress(true);
    setTimeout(() => inputRef.current?.focus(), 1000);
  };

  const nextStep = () => {
    if (currentInput.trim()) {
      setUserResponses([...userResponses, currentInput.trim()]);
      setCurrentInput('');
    }
    
    if (step < steps.length - 1) {
      setStep(step + 1);
      setBreathing(true);
      setTimeout(() => inputRef.current?.focus(), 1000);
    } else {
      setCompleted(true);
      setBreathing(false);
      setShowProgress(false);
    }
  };

  const resetExercise = () => {
    setIsStarted(false);
    setStep(0);
    setCompleted(false);
    setBreathing(false);
    setUserResponses([]);
    setCurrentInput('');
    setShowEmergencyHelp(false);
    setShowProgress(false);
  };

  const startBreathing = () => {
    setIsBreathingActive(true);
    setBreathCount(0);
    setCurrentPhase('inhale');
  };

  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 500);
  };

  useEffect(() => {
    if (breathing) {
      const timer = setTimeout(() => setBreathing(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [step, breathing]);

  useEffect(() => {
    if (isBreathingActive) {
      const interval = setInterval(() => {
        setBreathCount(prev => {
          if (prev >= 12) {
            setIsBreathingActive(false);
            return 0;
          }
          setCurrentPhase(prev % 2 === 0 ? 'exhale' : 'inhale');
          return prev + 1;
        });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isBreathingActive]);

  const currentStepData = steps[step] || steps[0];
  const progressPercentage = ((step + 1) / steps.length) * 100;

  const BreathingCircle = ({ isActive, phase }) => (
    <div className={`w-32 h-32 rounded-full mx-auto mb-6 transition-all duration-4000 ease-in-out ${
      isActive 
        ? phase === 'inhale' 
          ? 'scale-125 bg-gradient-to-r from-secondary-400 to-secondary-500 shadow-lg shadow-secondary-300' 
          : 'scale-100 bg-gradient-to-r from-secondary-300 to-secondary-400 shadow-md shadow-secondary-200'
        : 'bg-gradient-to-r from-primary-300 to-primary-400 shadow-md shadow-primary-200'
    } flex items-center justify-center`}>
      <div className="text-white text-4xl">🫧</div>
    </div>
  );

  const EmergencyPanel = () => (
    <div className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 ${
      showEmergencyHelp ? 'opacity-100 visible' : 'opacity-0 invisible'
    }`}>
      <div className={`bg-white/95 backdrop-blur-sm rounded-3xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto transform transition-all duration-300 ${
        showEmergencyHelp ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
      }`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-heading text-2xl font-bold text-neutral-800">Quick Relief Techniques</h3>
          <button
            onClick={() => setShowEmergencyHelp(false)}
            className="w-8 h-8 bg-neutral-200 hover:bg-neutral-300 rounded-full flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          {emergencyTechniques.map((technique, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 hover:from-primary-100 hover:to-secondary-100 transition-all cursor-pointer group"
            >
              <div className="text-3xl group-hover:scale-110 transition-transform">{technique.icon}</div>
              <div>
                <p className="font-semibold text-neutral-800 mb-1">{technique.name}</p>
                <p className="text-neutral-600 text-sm leading-relaxed">{technique.instruction}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-secondary-100 to-primary-100 rounded-xl">
          <p className="text-neutral-700 text-center font-handwritten text-lg">
            Remember: This feeling will pass. You are safe. You are not alone.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-gradient-to-br from-accent-200/30 to-primary-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-secondary-200/20 to-accent-200/20 rounded-full blur-3xl animate-gentlePulse"></div>
      </div>

      {/* Emergency help button */}
      <button
        onClick={() => setShowEmergencyHelp(true)}
        className="fixed top-6 right-6 z-40 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-medium transform hover:scale-105"
      >
        🆘 Need Help Now?
      </button>

      {/* Progress bar */}
      {showProgress && (
        <div className="fixed top-0 left-0 w-full h-2 bg-white/20 backdrop-blur-sm z-30">
          <div 
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      )}

      <EmergencyPanel />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
        {!isStarted ? (
          <div className="text-center max-w-2xl transform transition-all duration-1000">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full flex items-center justify-center mb-6 shadow-soft animate-gentlePulse">
                <span className="text-6xl">🧘‍♀️</span>
              </div>
            </div>
            
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
              Find Your Calm
            </h1>
            
            <p className="text-neutral-600 text-xl sm:text-2xl mb-6 leading-relaxed max-w-xl mx-auto">
              You're safe here. Let's gently guide you back to peace with the 5-4-3-2-1 grounding technique.
            </p>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-lg mx-auto">
              <p className="text-neutral-700 font-handwritten text-lg leading-relaxed">
                "This moment will pass. You are stronger than you know. Take it one breath at a time."
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={startExercise}
                className="px-10 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-full shadow-soft focus:outline-none focus:ring-4 focus:ring-primary-200 text-xl font-medium transition-all duration-300 transform hover:scale-105"
              >
                Begin Your Journey to Calm
              </button>

              <button
                onClick={startBreathing}
                className="block mx-auto text-primary-600 hover:text-primary-700 transition-colors text-lg underline decoration-2 underline-offset-4 hover:underline-offset-8"
              >
                Just want to breathe for now?
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            {!completed ? (
              <div 
                key={step}
                className="transform transition-all duration-700 ease-in-out"
              >
                <div className={`bg-gradient-to-br ${currentStepData.bgGradient} rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl backdrop-blur-sm bg-opacity-90 border border-white/20`}>
                  {/* Step indicator */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center px-4 py-2 bg-${currentStepData.accentColor}/20 text-${currentStepData.accentColor} rounded-full text-sm font-medium mb-4`}>
                      <div className="w-2 h-2 bg-current rounded-full mr-2 animate-pulse"></div>
                      Step {step + 1} of 5
                    </div>
                  </div>

                  {/* Main icon */}
                  <div className="text-center mb-8">
                    <div className={`text-7xl sm:text-8xl mb-4 transform transition-all duration-1000 ${isTyping ? 'scale-110' : 'scale-100'}`}>
                      {currentStepData.icon}
                    </div>
                  </div>

                  {/* Instruction */}
                  <div className="text-center mb-8">
                    <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800 mb-6 leading-tight">
                      Notice {currentStepData.instruction}
                    </h2>
                    
                    <div className={`bg-${currentStepData.accentColor}/10 rounded-xl p-4 mb-6`}>
                      <p className="text-neutral-600 font-handwritten text-lg leading-relaxed">
                        {currentStepData.helpText}
                      </p>
                    </div>
                  </div>

                  {/* Input area */}
                  <div className="mb-8">
                    <div className="relative">
                      <textarea
                        ref={inputRef}
                        value={currentInput}
                        onChange={handleInputChange}
                        placeholder={currentStepData.placeholder}
                        className="w-full p-6 rounded-2xl border-2 border-transparent bg-white/70 backdrop-blur-sm focus:border-primary-400 focus:outline-none text-lg resize-none transition-all duration-300 placeholder-neutral-400"
                        rows="4"
                      />
                      <div className={`absolute bottom-4 right-4 text-xs text-neutral-400 transition-opacity ${currentInput.length > 0 ? 'opacity-100' : 'opacity-0'}`}>
                        {currentInput.length} characters
                      </div>
                    </div>
                  </div>

                  {/* Breathing guide */}
                  {breathing && (
                    <div className="text-center mb-8">
                      <BreathingCircle isActive={breathing} phase="inhale" />
                      <p className="text-neutral-600 font-handwritten text-lg">
                        Take a moment to breathe while you think...
                      </p>
                    </div>
                  )}

                  {/* Guidance text */}
                  <div className="text-center mb-8">
                    <p className="text-neutral-600 text-lg leading-relaxed font-handwritten max-w-2xl mx-auto">
                      {currentStepData.prompt}
                    </p>
                  </div>

                  {/* Action button */}
                  <div className="text-center mb-8">
                    <button
                      onClick={nextStep}
                      className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-full shadow-soft focus:outline-none focus:ring-4 focus:ring-primary-200 text-xl font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      {step < steps.length - 1 ? 'Continue' : 'Complete'}
                    </button>
                  </div>

                  {/* Progress dots */}
                  <div className="flex justify-center space-x-3">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index <= step 
                            ? 'bg-primary-500 scale-125 shadow-md' 
                            : 'bg-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="transform transition-all duration-1000 ease-out">
                <div className="bg-gradient-to-br from-secondary-100 via-white to-primary-100 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-sm border border-white/20 text-center">
                  <div className="text-8xl sm:text-9xl mb-8 animate-gentlePulse">✨</div>

                  <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent mb-6">
                    You Did It!
                  </h2>

                  <p className="text-neutral-700 text-xl sm:text-2xl mb-8 leading-relaxed max-w-2xl mx-auto">
                    You've taken a powerful step toward peace. Feel the calm settling into your body and mind. You are safe, you are present, and you are stronger than any storm.
                  </p>

                  <div className="bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl p-6 mb-8 max-w-lg mx-auto">
                    <p className="text-neutral-700 font-handwritten text-xl leading-relaxed">
                      "Peace comes from within. Do not seek it without." - Buddha
                    </p>
                  </div>

                  {/* Summary of responses */}
                  {userResponses.length > 0 && (
                    <div className="bg-white/50 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
                      <h3 className="font-heading text-lg font-semibold mb-4 text-neutral-700">Your Grounding Anchors:</h3>
                      <div className="space-y-2 text-left">
                        {userResponses.map((response, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <span className="text-primary-500 font-semibold">{steps[index]?.icon}</span>
                            <p className="text-neutral-600 text-sm leading-relaxed">{response}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <button
                      onClick={resetExercise}
                      className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-full shadow-soft focus:outline-none focus:ring-4 focus:ring-primary-200 text-xl font-medium transition-all duration-300 transform hover:scale-105 mr-4"
                    >
                      Practice Again
                    </button>

                    <button
                      onClick={startBreathing}
                      className="px-8 py-4 bg-gradient-to-r from-secondary-500 to-accent-500 hover:from-secondary-600 hover:to-accent-600 text-white rounded-full shadow-soft focus:outline-none focus:ring-4 focus:ring-secondary-200 text-xl font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      Continue Breathing
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Breathing exercise overlay */}
        {isBreathingActive && (
          <div className="fixed inset-0 z-40 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 backdrop-blur-lg flex items-center justify-center">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
              <BreathingCircle isActive={true} phase={currentPhase} />
              <h3 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
                {currentPhase === 'inhale' ? 'Breathe In Slowly...' : 'Breathe Out Gently...'}
              </h3>
              <p className="text-xl text-white/80 mb-6">
                {Math.floor(breathCount / 2) + 1} of 6 breaths
              </p>
              <button
                onClick={() => setIsBreathingActive(false)}
                className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-all duration-300 border border-white/30"
              >
                End Breathing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdvancedMindfulness;
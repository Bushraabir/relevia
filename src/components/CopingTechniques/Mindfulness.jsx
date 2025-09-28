import { useState, useEffect, useRef } from 'react';

function PanicAttackSupport() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [responses, setResponses] = useState([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [showEmergency, setShowEmergency] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);
  const inputRef = useRef(null);

  const emergencyResources = [
    { 
      title: "Cold Sensation Technique", 
      description: "Hold something cold or run cold water over your wrists",
      icon: "❄️",
      category: "Physical"
    },
    { 
      title: "Progressive Muscle Release", 
      description: "Tense and release each muscle group for 5 seconds",
      icon: "💪",
      category: "Physical"
    },
    { 
      title: "Safe Space Visualization", 
      description: "Picture yourself in the most peaceful place you know",
      icon: "🏞️",
      category: "Mental"
    },
    { 
      title: "Object Focus Method", 
      description: "Pick one object and describe every detail about it",
      icon: "🔍",
      category: "Mental"
    },
    { 
      title: "Temperature Change", 
      description: "Step outside or move to a different temperature room",
      icon: "🌡️",
      category: "Environmental"
    },
    { 
      title: "Gentle Movement", 
      description: "Slowly stretch your arms, roll your shoulders, wiggle fingers",
      icon: "🤸‍♀️",
      category: "Physical"
    }
  ];

  const inspirationalQuotes = [
    "You are braver than you believe, stronger than you seem, and more loved than you know.",
    "This too shall pass. Every storm runs out of rain.",
    "Peace comes from within. You have everything you need inside you right now.",
    "You've survived 100% of your difficult days. That's an incredible track record.",
    "Breathe in courage, breathe out fear. You are safe in this moment."
  ];

  const mindfulnessSteps = [
    {
      sense: "Sight",
      instruction: "5 things you can see around you",
      prompt: "Look slowly around your space. Notice colors, shapes, and textures. Let your eyes rest gently on each object, anchoring yourself in this present moment.",
      placeholder: "The warm sunlight streaming through the window, casting gentle shadows...",
      icon: "👁️",
      gradient: "from-primary-400 to-primary-600",
      bgGradient: "from-primary-50 to-primary-100",
      number: 5
    },
    {
      sense: "Touch",
      instruction: "4 things you can feel or touch",
      prompt: "Notice the textures around you - soft, rough, warm, cool. Feel the weight of your body supported by your chair or the ground beneath your feet.",
      placeholder: "The soft fabric of my sweater, the cool surface of my desk...",
      icon: "✋",
      gradient: "from-secondary-400 to-secondary-600",
      bgGradient: "from-secondary-50 to-secondary-100",
      number: 4
    },
    {
      sense: "Sound",
      instruction: "3 sounds you can hear right now",
      prompt: "Close your eyes if it feels comfortable. Listen to the world around you - both near and far sounds. Let them wash over you without judgment.",
      placeholder: "The gentle hum of the air conditioner, birds chirping outside...",
      icon: "👂",
      gradient: "from-accent-400 to-accent-600",
      bgGradient: "from-accent-50 to-accent-100",
      number: 3
    },
    {
      sense: "Smell",
      instruction: "2 scents you notice or remember",
      prompt: "Take a slow, deep breath. Notice any scents in the air, or bring to mind a comforting smell from your memory.",
      placeholder: "The lingering aroma of morning coffee, the fresh scent of rain...",
      icon: "👃",
      gradient: "from-primary-500 to-secondary-500",
      bgGradient: "from-primary-50 to-secondary-50",
      number: 2
    },
    {
      sense: "Taste",
      instruction: "1 taste in your mouth",
      prompt: "Notice any taste present, or simply the neutral taste of calm breathing. You are fully present in your body, completely here in this moment.",
      placeholder: "The refreshing taste of mint, or the clean taste of deep breathing...",
      icon: "👅",
      gradient: "from-secondary-500 to-accent-500",
      bgGradient: "from-secondary-50 to-accent-50",
      number: 1
    }
  ];

  const startExercise = () => {
    setIsActive(true);
    setCurrentStep(0);
    setIsCompleted(false);
    setResponses([]);
    setCurrentResponse('');
    setTimeout(() => inputRef.current?.focus(), 500);
  };

  const nextStep = () => {
    if (currentResponse.trim()) {
      setResponses([...responses, currentResponse.trim()]);
      setCurrentResponse('');
    }

    if (currentStep < mindfulnessSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimeout(() => inputRef.current?.focus(), 500);
    } else {
      setIsCompleted(true);
    }
  };

  const resetExercise = () => {
    setIsActive(false);
    setCurrentStep(0);
    setIsCompleted(false);
    setResponses([]);
    setCurrentResponse('');
    setShowEmergency(false);
  };

  const handleInputChange = (e) => {
    setCurrentResponse(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      nextStep();
    }
  };

  const currentStepData = mindfulnessSteps[currentStep];
  const progressPercentage = ((currentStep + 1) / mindfulnessSteps.length) * 100;

  const EmergencyModal = () => (
    <div className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 ${
      showEmergency ? 'opacity-100 visible' : 'opacity-0 invisible'
    }`}>
      <div className={`bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto transform transition-all duration-300 ${
        showEmergency ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
      }`}>
        <div className="sticky top-0 bg-gradient-to-r from-primary-500 to-secondary-500 p-6 rounded-t-3xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-heading font-bold text-white mb-1">Immediate Relief Techniques</h2>
              <p className="text-primary-100">Quick methods to help you feel grounded and safe</p>
            </div>
            <button
              onClick={() => setShowEmergency(false)}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors text-white"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {emergencyResources.map((resource, index) => (
              <div
                key={index}
                className="group p-5 rounded-2xl bg-gradient-to-br from-neutral-50 to-white hover:from-primary-50 hover:to-secondary-50 border border-neutral-200 hover:border-primary-200 transition-all duration-300 cursor-pointer hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {resource.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-heading font-semibold text-neutral-800">{resource.title}</h3>
                      <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                        {resource.category}
                      </span>
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed">{resource.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-secondary-100 via-primary-50 to-accent-100 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">💝</div>
            <h3 className="font-heading font-semibold text-neutral-800 mb-2">Remember</h3>
            <p className="text-neutral-700 font-handwritten text-lg">
              You are safe. This feeling will pass. You have overcome challenges before, and you will overcome this too.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const QuotesModal = () => (
    <div className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 ${
      showQuotes ? 'opacity-100 visible' : 'opacity-0 invisible'
    }`}>
      <div className={`bg-white rounded-3xl max-w-2xl w-full transform transition-all duration-300 ${
        showQuotes ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
      }`}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-heading font-bold text-neutral-800">Words of Comfort</h2>
            <button
              onClick={() => setShowQuotes(false)}
              className="w-8 h-8 bg-neutral-100 hover:bg-neutral-200 rounded-full flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            {inspirationalQuotes.map((quote, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100"
              >
                <p className="text-neutral-700 font-handwritten text-lg leading-relaxed text-center">
                  "{quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (!isActive && !isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-64 -left-64 w-96 h-96 bg-gradient-to-br from-primary-200/20 to-secondary-200/20 rounded-full blur-3xl animate-gentlePulse"></div>
          <div className="absolute -bottom-64 -right-64 w-96 h-96 bg-gradient-to-br from-accent-200/20 to-primary-200/20 rounded-full blur-3xl animate-gentlePulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-gradient-to-br from-secondary-200/15 to-accent-200/15 rounded-full blur-2xl animate-gentlePulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Header Actions */}
        <div className="absolute top-6 right-6 flex gap-3 z-20">
          <button
            onClick={() => setShowQuotes(true)}
            className="px-4 py-2 bg-white/80 backdrop-blur-sm hover:bg-white text-neutral-700 rounded-full shadow-soft transition-all duration-300 text-sm font-medium border border-white/50"
          >
            💭 Inspiring Words
          </button>
          <button
            onClick={() => setShowEmergency(true)}
            className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-full shadow-lg transition-all duration-300 text-sm font-medium transform hover:scale-105"
          >
            🆘 Need Help Now
          </button>
        </div>

        <EmergencyModal />
        <QuotesModal />

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="text-center max-w-4xl">
            {/* Hero Icon */}
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full shadow-2xl mb-6 animate-gentlePulse">
                <span className="text-6xl">🕊️</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Find Your Peace
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-neutral-600 text-xl sm:text-2xl lg:text-3xl mb-8 leading-relaxed max-w-3xl mx-auto font-light">
              You're in a safe space. Let's gently guide you back to calm with the proven 5-4-3-2-1 grounding technique.
            </p>

            {/* Comfort Message */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 mb-12 max-w-2xl mx-auto shadow-soft border border-white/50">
              <div className="text-4xl mb-4">✨</div>
              <p className="text-neutral-700 font-handwritten text-2xl leading-relaxed">
                "This moment of difficulty will pass. You are stronger than you know, and you're not alone in this journey."
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-6">
              <button
                onClick={startExercise}
                className="group px-12 py-5 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 hover:from-primary-600 hover:via-secondary-600 hover:to-accent-600 text-white rounded-full shadow-xl hover:shadow-2xl text-xl font-medium transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
              >
                <span className="flex items-center justify-center gap-3">
                  <span>Begin Your Journey to Calm</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>

              <p className="text-neutral-500 text-sm max-w-md mx-auto">
                A gentle, step-by-step process that takes about 5-10 minutes
              </p>
            </div>

            {/* Feature Preview */}
            <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
              {[
                { icon: "🎯", title: "Focused Guidance", desc: "Step-by-step mindfulness practice" },
                { icon: "🛡️", title: "Safe Environment", desc: "Your privacy and comfort protected" },
                { icon: "💪", title: "Proven Method", desc: "Clinically-backed grounding technique" }
              ].map((feature, index) => (
                <div key={index} className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/30 hover:bg-white/70 transition-all duration-300">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-heading font-semibold text-neutral-800 mb-2">{feature.title}</h3>
                  <p className="text-neutral-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-accent-50 relative overflow-hidden flex items-center justify-center p-4">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-48 -left-48 w-96 h-96 bg-gradient-to-br from-secondary-200/20 to-accent-200/20 rounded-full blur-3xl animate-gentlePulse"></div>
          <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-gradient-to-br from-primary-200/20 to-secondary-200/20 rounded-full blur-3xl animate-gentlePulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50">
            {/* Success Icon */}
            <div className="text-8xl mb-8 animate-gentlePulse">🌟</div>

            {/* Success Message */}
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-600 bg-clip-text text-transparent mb-6">
              Beautiful Work!
            </h2>

            <p className="text-neutral-700 text-xl sm:text-2xl mb-8 leading-relaxed max-w-2xl mx-auto">
              You've successfully completed the grounding exercise. Feel the calm settling into your body and mind. You are safe, present, and incredibly strong.
            </p>

            {/* Inspirational Quote */}
            <div className="bg-gradient-to-r from-primary-100 via-secondary-100 to-accent-100 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
              <p className="text-neutral-700 font-handwritten text-xl leading-relaxed">
                "Peace comes from within. Do not seek it without." - Buddha
              </p>
            </div>

            {/* Summary */}
            {responses.length > 0 && (
              <div className="bg-white/60 rounded-2xl p-6 mb-8 max-w-3xl mx-auto text-left">
                <h3 className="font-heading text-xl font-semibold mb-4 text-neutral-800 text-center">Your Grounding Journey:</h3>
                <div className="space-y-4">
                  {responses.map((response, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary-400 to-secondary-400 text-white rounded-full font-semibold text-sm flex-shrink-0">
                        {mindfulnessSteps[index]?.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-neutral-700 mb-1">{mindfulnessSteps[index]?.sense}</p>
                        <p className="text-neutral-600 text-sm leading-relaxed">{response}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetExercise}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-full shadow-lg hover:shadow-xl text-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Practice Again
              </button>
              <button
                onClick={() => setShowQuotes(true)}
                className="px-8 py-4 bg-white/80 backdrop-blur-sm hover:bg-white text-neutral-700 border border-neutral-200 rounded-full shadow-lg hover:shadow-xl text-lg font-medium transition-all duration-300"
              >
                Read More Comfort
              </button>
            </div>
          </div>
        </div>

        <QuotesModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 relative overflow-hidden">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-neutral-200/50 backdrop-blur-sm z-30">
        <div 
          className={`h-full bg-gradient-to-r ${currentStepData.gradient} transition-all duration-1000 ease-out`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Emergency Button */}
      <button
        onClick={() => setShowEmergency(true)}
        className="fixed top-6 right-6 z-40 px-4 py-2 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-full shadow-lg transition-all duration-300 text-sm font-medium transform hover:scale-105"
      >
        🆘 Emergency Help
      </button>

      <EmergencyModal />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4 pt-12">
        <div className="w-full max-w-4xl">
          <div 
            key={currentStep}
            className={`bg-gradient-to-br ${currentStepData.bgGradient} rounded-3xl shadow-2xl border border-white/30 backdrop-blur-sm transform transition-all duration-700 ease-out`}
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${currentStepData.gradient} p-8 rounded-t-3xl text-white relative overflow-hidden`}>
              <div className="absolute inset-0 bg-white/10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                      {currentStepData.icon}
                    </div>
                    <div>
                      <p className="text-white/80 text-sm font-medium">Step {currentStep + 1} of 5</p>
                      <p className="text-xl font-heading font-semibold">{currentStepData.sense}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{currentStepData.number}</div>
                    <div className="text-sm text-white/80">items</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 sm:p-12">
              {/* Main Instruction */}
              <div className="text-center mb-8">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-800 mb-4 leading-tight">
                  Notice {currentStepData.instruction}
                </h2>
                
                <div className="bg-white/70 rounded-xl p-6 max-w-2xl mx-auto">
                  <p className="text-neutral-600 font-handwritten text-lg leading-relaxed">
                    {currentStepData.prompt}
                  </p>
                </div>
              </div>

              {/* Input Area */}
              <div className="mb-8">
                <div className="relative max-w-3xl mx-auto">
                  <textarea
                    ref={inputRef}
                    value={currentResponse}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder={currentStepData.placeholder}
                    className="w-full p-6 rounded-2xl border-2 border-transparent bg-white/70 backdrop-blur-sm focus:border-primary-400 focus:bg-white focus:outline-none text-lg resize-none transition-all duration-300 placeholder-neutral-400 shadow-soft min-h-[120px]"
                    rows="4"
                  />
                  <div className={`absolute bottom-4 right-4 text-xs transition-all duration-300 ${
                    currentResponse.length > 0 
                      ? 'text-neutral-500 opacity-100' 
                      : 'text-neutral-300 opacity-0'
                  }`}>
                    {currentResponse.length} characters • Press Ctrl+Enter to continue
                  </div>
                </div>
              </div>

              {/* Progress Dots */}
              <div className="flex justify-center gap-3 mb-8">
                {mindfulnessSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-3 rounded-full transition-all duration-500 ${
                      index < currentStep 
                        ? 'w-8 bg-gradient-to-r from-secondary-400 to-secondary-500 shadow-md' 
                        : index === currentStep
                        ? 'w-8 bg-gradient-to-r from-primary-400 to-primary-500 shadow-md animate-pulse'
                        : 'w-3 bg-neutral-300'
                    }`}
                  />
                ))}
              </div>

              {/* Action Button */}
              <div className="text-center">
                <button
                  onClick={nextStep}
                  disabled={!currentResponse.trim()}
                  className={`px-10 py-4 rounded-full text-xl font-medium transition-all duration-300 transform ${
                    currentResponse.trim()
                      ? `bg-gradient-to-r ${currentStepData.gradient} hover:shadow-xl text-white hover:scale-105 hover:-translate-y-1`
                      : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  }`}
                >
                  {currentStep < mindfulnessSteps.length - 1 ? 'Continue Journey' : 'Complete Exercise'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanicAttackSupport;
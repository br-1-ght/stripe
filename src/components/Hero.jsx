import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const useTypewriter = (text, delay = 100, startDelay = 0, pauseDuration = 2000) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [isTyping, setIsTyping] = useState(true);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
      if (!isLoaded) return;

      const startTimer = setTimeout(() => {
        setIsStarted(true);
      }, startDelay);

      return () => clearTimeout(startTimer);
    }, [isLoaded, startDelay]);

    useEffect(() => {
      if (!isStarted) return;

      let timer;

      if (isTyping) {
        if (currentIndex < text.length) {
          timer = setTimeout(() => {
            setDisplayText(prev => prev + text[currentIndex]);
            setCurrentIndex(prev => prev + 1);
          }, delay);
        } else {
          
          timer = setTimeout(() => {
            setIsTyping(false);
          }, pauseDuration);
        }
      } else {
        if (currentIndex > 0) {
          timer = setTimeout(() => {
            setDisplayText(prev => prev.slice(0, -1));
            setCurrentIndex(prev => prev - 1);
          }, delay / 2);
        } else {
          timer = setTimeout(() => {
            setIsTyping(true);
          }, pauseDuration / 2);
        }
      }

      return () => clearTimeout(timer);
    }, [currentIndex, delay, text, isStarted, isTyping, pauseDuration]);

    useEffect(() => {
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);

      return () => clearInterval(cursorTimer);
    }, []);

    return { displayText, showCursor };
  };

  const AnimatedBackground = () => (
    <div 
      ref={backgroundRef}
      className="absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full animate-pulse"
            style={{
              width: Math.random() * 120 + 40,
              height: Math.random() * 120 + 40,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 4 + 3 + 's',
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>
      
      <div className="absolute inset-0 opacity-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className={`absolute ${
              i % 3 === 0 ? 'rotate-45' : i % 3 === 1 ? 'rotate-12' : '-rotate-12'
            } animate-bounce`}
            style={{
              top: Math.random() * 80 + 10 + '%',
              left: Math.random() * 80 + 10 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: Math.random() * 2 + 4 + 's',
            }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg opacity-60" />
          </div>
        ))}
      </div>
    </div>
  );

  const FloatingCodeCard = ({ code, delay, position, typewriterDelay = 50, pauseDuration = 2000 }) => {
    const { displayText, showCursor } = useTypewriter(code, typewriterDelay, delay, pauseDuration);
    
    return (
      <div 
        className={`absolute ${position} bg-gray-900 text-green-400 p-2 sm:p-3 lg:p-4 rounded-lg shadow-2xl font-mono text-xs sm:text-sm transform transition-all duration-1000 max-w-[280px] sm:max-w-[320px] lg:max-w-none ${
          isLoaded ? 'translate-y-0 opacity-70' : 'translate-y-8 opacity-0'
        } hover:scale-105 hover:opacity-90 z-20`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        <pre className="text-xs sm:text-sm min-h-[3rem] sm:min-h-[4rem] overflow-hidden">
          {displayText}
          {showCursor && (
            <span className="bg-green-400 inline-block w-1.5 h-3 sm:w-2 sm:h-4 ml-1"></span>
          )}
        </pre>
      </div>
    );
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      <AnimatedBackground />
      
      <FloatingCodeCard 
        code={`stripe.charges.create({
  amount: 2000,
  currency: 'usd',
  source: 'tok_visa'
});`}
        delay={1200}
        position="top-20 left-2 sm:left-4 lg:left-10"
        typewriterDelay={30}
        pauseDuration={3000}
      />
      
      <FloatingCodeCard 
        code={`const session = await stripe
  .checkout.sessions
  .create({
    payment_method_types: ['card'],
    line_items: [{...}]
  });`}
        delay={1500}
        position="top-32 right-2 sm:right-4 lg:right-10"
        typewriterDelay={40}
        pauseDuration={2500}
      />
      
      <FloatingCodeCard 
        code={`curl https://api.stripe.com/v1/charges \\
  -u sk_test_... \\
  -d amount=2000 \\
  -d currency=usd`}
        delay={1800}
        position="bottom-32 left-2 sm:left-8 lg:left-20"
        typewriterDelay={35}
        pauseDuration={2800}
      />

      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={heroRef}
            className="text-center"
          >
            <div className="space-y-4 mb-8">
              <h1 
                ref={titleRef}
                className={`text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight transition-all duration-1000 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                Financial
              </h1>
              <h1 
                className={`text-5xl md:text-7xl lg:text-8xl font-bold leading-tight transition-all duration-1000 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                  infrastructure
                </span>
              </h1>
              <h1 
                className={`text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight transition-all duration-1000 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                for the internet
              </h1>
            </div>

            <p 
              ref={subtitleRef}
              className={`text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              Millions of businesses of all sizes—from startups to large enterprises—use Stripe's 
              software and APIs to accept payments, send payouts, and manage their businesses online.
            </p>

            <div 
              ref={buttonsRef}
              className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              <Link 
                to="/auth" 
                className="group bg-gradient-to-r from-blue-300 to-blue-900 text-white px-10 py-5 rounded-full text-lg font-semibold hover:from-blue-400 hover:to-blue-900 transition-all transform hover:scale-105 hover:shadow-2xl flex items-center space-x-2"
              >
                <span>Start now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-full text-lg font-semibold hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <a href="https://www.youtube.com/watch?v=7edR32QVp_A&t=67s">Watch Demo</a>
              </button>
            </div>

            <div 
              className={`mt-16 transition-all duration-1000 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '1200ms' }}
            >
              <p className="text-sm text-gray-500 mb-6">Trusted by millions of businesses worldwide</p>
              <div className="flex justify-center items-center space-x-12 opacity-50">
                {['Amazon', 'Google', 'Salesforce', 'Zoom', 'Shopify'].map((company, index) => (
                  <div 
                    key={company}
                    className={`text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer transform hover:scale-110 ${
                      isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${1400 + index * 100}ms` }}
                  >
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-60' : 'translate-y-4 opacity-0'
        }`}
        style={{ transitionDelay: '1600ms' }}
      >
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-xs text-gray-400 font-medium">Scroll</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
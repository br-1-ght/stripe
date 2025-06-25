import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, CreditCard, Check, Loader, Zap, Shield, Globe } from 'lucide-react';

const InteractiveDemoSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(49.99);
  const [processingTime, setProcessingTime] = useState(2.3);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const steps = [
    { title: 'Payment initiated', desc: 'Customer clicks pay', icon: <CreditCard className="w-5 h-5" /> },
    { title: 'Fraud analysis', desc: 'AI powered detection', icon: <Shield className="w-5 h-5" /> },
    { title: 'Global routing', desc: 'Optimized processing', icon: <Globe className="w-5 h-5" /> },
    { title: 'Payment success', desc: 'Instant confirmation', icon: <Check className="w-5 h-5" /> }
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Demo animation logic
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
      setPaymentAmount(prev => Number((Math.random() * 100 + 10).toFixed(2)));
      setProcessingTime(prev => Number((Math.random() * 2 + 1.5).toFixed(1)));
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const PaymentCard = () => (
    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Payment Demo</h3>
        <div className="flex space-x-2">
          <div className="w-8 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-sm flex items-center justify-center text-white text-xs font-bold">
            VISA
          </div>
          <div className="w-8 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded-sm flex items-center justify-center text-white text-xs font-bold">
            MC
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Amount</span>
          <span className="text-2xl font-bold text-gray-900">${paymentAmount}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Processing time</span>
          <span className="text-lg font-semibold text-green-600">
            {isPlaying ? <span className="animate-pulse">{processingTime}s</span> : `${processingTime}s`}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Status</span>
          <div className="flex items-center space-x-2">
            {isPlaying ? (
              <Loader className="w-4 h-4 animate-spin text-blue-500" />
            ) : (
              <Check className="w-4 h-4 text-green-500" />
            )}
            <span className={`font-medium ${isPlaying ? 'text-blue-500' : 'text-green-500'}`}>
              {isPlaying ? 'Processing' : 'Success'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl animate-pulse"
            style={{
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: Math.random() * 4 + 4 + 's',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See Stripe in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">action</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our payment flow with this interactive demo. Watch how Stripe processes payments 
            in real-time with industry-leading speed and security.
          </p>
        </div>
        
        {/* Main demo container */}
        <div className={`bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`} style={{ transitionDelay: '200ms' }}>
          
          {/* Terminal header */}
          <div className="absolute top-4 left-4 flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          
          {/* Demo controls */}
          <div className="flex items-center justify-between mb-8 mt-4">
            <h3 className="text-2xl md:text-3xl font-bold">Live Payment Processing</h3>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/20 transition-all transform hover:scale-105"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span className="font-medium">{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left side - Payment flow */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold mb-4">Payment Flow</h4>
              
              {/* Step indicators */}
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 ${
                      currentStep === index && isPlaying 
                        ? 'bg-blue-500/20 border-2 border-blue-400 scale-105' 
                        : 'bg-white/5 border-2 border-transparent'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep === index && isPlaying 
                        ? 'bg-blue-500 text-white' 
                        : currentStep > index || !isPlaying 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white/10 text-gray-400'
                    }`}>
                      {currentStep === index && isPlaying ? (
                        <Loader className="w-5 h-5 animate-spin" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <div>
                      <div className="font-semibold">{step.title}</div>
                      <div className="text-sm text-gray-300">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Progress bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Right side - Stats and metrics */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold mb-4">Real-time Metrics</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-sm text-gray-300 mb-2">Success Rate</div>
                  <div className="text-2xl font-bold text-green-400">99.7%</div>
                  <div className="text-xs text-gray-400 mt-1">Industry leading</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-sm text-gray-300 mb-2">Avg. Time</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {isPlaying ? <span className="animate-pulse">{processingTime}s</span> : `${processingTime}s`}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Lightning fast</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-sm text-gray-300 mb-2">Global Coverage</div>
                  <div className="text-2xl font-bold text-purple-400">195+</div>
                  <div className="text-xs text-gray-400 mt-1">Countries</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-sm text-gray-300 mb-2">Uptime</div>
                  <div className="text-2xl font-bold text-yellow-400">99.99%</div>
                  <div className="text-xs text-gray-400 mt-1">SLA guaranteed</div>
                </div>
              </div>
              
              {/* Live transaction feed */}
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-sm font-medium text-gray-300 mb-3">Live Transactions</div>
                <div className="space-y-2 text-xs font-mono">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i}
                      className={`flex justify-between items-center py-1 ${
                        isPlaying && i === 0 ? 'text-green-400 animate-pulse' : 'text-gray-400'
                      }`}
                    >
                      <span>txn_{Math.random().toString(36).substr(2, 8)}</span>
                      <span className="text-green-400">✓ ${(Math.random() * 200 + 10).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">Ready to integrate? Start with our APIs</span>
            </div>
          </div>
        </div>
        
        {/* Bottom feature cards */}
        <div className={`grid md:grid-cols-3 gap-8 mt-16 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '400ms' }}>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Accept any payment</h3>
            <p className="text-gray-600">Support for 135+ currencies and popular payment methods worldwide</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise security</h3>
            <p className="text-gray-600">Bank-level security with advanced fraud protection and compliance</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Global scale</h3>
            <p className="text-gray-600">Process payments in 195+ countries with local payment methods</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemoSection;
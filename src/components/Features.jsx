import { useState, useEffect, useRef } from 'react';
import { 
  CreditCard, Smartphone, Shield, BarChart3, ChevronRight
} from 'lucide-react';

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Accept payments",
      description: "Process payments from around the world with local payment methods",
      color: "blue",
      demo: "💳 Card Processing"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile optimization",
      description: "Seamless checkout experience across all devices and platforms",
      color: "green",
      demo: "📱 Mobile Ready"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Advanced security",
      description: "Bank-level security with fraud detection and prevention",
      color: "purple",
      demo: "🔒 Secure & Safe"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-time analytics",
      description: "Track performance with detailed reporting and insights",
      color: "orange",
      demo: "📊 Live Dashboard"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Everything you need to accept payments
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A complete commerce platform with all the tools you need to start, run, and scale your business
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Feature List */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeFeature === index 
                    ? 'bg-slate-50 border-2 border-indigo-200' 
                    : 'hover:bg-slate-50'
                } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    feature.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    feature.color === 'green' ? 'bg-green-100 text-green-600' :
                    feature.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${
                    activeFeature === index ? 'rotate-90' : ''
                  }`} />
                </div>
              </div>
            ))}
          </div>

          {/* Demo Area */}
          <div className={`bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="text-center text-white">
              <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {features[activeFeature].demo}
              </h3>
              <p className="text-slate-300 mb-8">
                Experience the power of modern payment processing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
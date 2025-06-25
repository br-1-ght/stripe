import { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, Globe, Clock, DollarSign, Shield, Award } from 'lucide-react';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({});
  const sectionRef = useRef(null);

  const stats = [
    { 
      id: 'volume',
      value: 817,
      suffix: 'B',
      label: 'Payment volume in 2023',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'green',
      prefix: '$'
    },
    { 
      id: 'businesses',
      value: 4,
      suffix: 'M+',
      label: 'Businesses worldwide',
      icon: <Users className="w-6 h-6" />,
      color: 'blue',
      prefix: ''
    },
    { 
      id: 'countries',
      value: 195,
      suffix: '+',
      label: 'Countries supported',
      icon: <Globe className="w-6 h-6" />,
      color: 'purple',
      prefix: ''
    },
    { 
      id: 'uptime',
      value: 99.99,
      suffix: '%',
      label: 'Uptime SLA',
      icon: <Shield className="w-6 h-6" />,
      color: 'yellow',
      prefix: ''
    }
  ];

  const additionalStats = [
    { 
      value: '2.3s', 
      label: 'Average processing time',
      icon: <Clock className="w-5 h-5" />,
      color: 'blue'
    },
    { 
      value: '135+', 
      label: 'Currencies supported',
      icon: <Globe className="w-5 h-5" />,
      color: 'green'
    },
    { 
      value: '99.7%', 
      label: 'Authorization rate',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'purple'
    },
    { 
      value: '24/7', 
      label: 'Developer support',
      icon: <Award className="w-5 h-5" />,
      color: 'orange'
    }
  ];

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startAnimation();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startAnimation = () => {
    stats.forEach((stat, index) => {
      setTimeout(() => {
        animateValue(stat.id, 0, stat.value, 2000);
      }, index * 200);
    });
  };

  const animateValue = (id, start, end, duration) => {
    const startTimestamp = performance.now();
    
    const step = (timestamp) => {
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = start + (end - start) * easeOutQuart;
      
      setAnimatedStats(prev => ({
        ...prev,
        [id]: current
      }));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  };

  const formatValue = (stat) => {
    const value = animatedStats[stat.id] || 0;
    if (stat.id === 'uptime') {
      return value.toFixed(2);
    }
    return Math.floor(value);
  };

  const getColorClasses = (color, type = 'gradient') => {
    const colorMap = {
      green: {
        gradient: 'from-emerald-400 to-teal-500',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/20',
        glow: 'shadow-emerald-500/20',
        border: 'border-emerald-500/20'
      },
      blue: {
        gradient: 'from-blue-400 to-cyan-500',
        text: 'text-blue-400',
        bg: 'bg-blue-500/20',
        glow: 'shadow-blue-500/20',
        border: 'border-blue-500/20'
      },
      purple: {
        gradient: 'from-purple-400 to-pink-500',
        text: 'text-purple-400',
        bg: 'bg-purple-500/20',
        glow: 'shadow-purple-500/20',
        border: 'border-purple-500/20'
      },
      yellow: {
        gradient: 'from-yellow-400 to-orange-500',
        text: 'text-yellow-400',
        bg: 'bg-yellow-500/20',
        glow: 'shadow-yellow-500/20',
        border: 'border-yellow-500/20'
      },
      orange: {
        gradient: 'from-orange-400 to-red-500',
        text: 'text-orange-400',
        bg: 'bg-orange-500/20',
        glow: 'shadow-orange-500/20',
        border: 'border-orange-500/20'
      }
    };
    return colorMap[color]?.[type] || colorMap.blue[type];
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-24 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Floating dots */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60 animate-pulse"
            style={{
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: Math.random() * 2 + 2 + 's',
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 text-sm font-medium">Trusted by millions</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-6 leading-tight">
            The numbers speak for themselves
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Join millions of businesses that trust Stripe to handle their payments, 
            from startups to Fortune 500 companies.
          </p>
        </div>

        {/* Main stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative group">
                {/* Background glow */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${getColorClasses(stat.color, 'gradient')} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                
                {/* Card */}
                <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/80 transition-all duration-500 group-hover:border-slate-600/50">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${getColorClasses(stat.color, 'gradient')} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {stat.icon}
                    </div>
                  </div>
                  
                  {/* Value */}
                  <div className="space-y-2">
                    <div className={`text-4xl font-bold ${getColorClasses(stat.color, 'text')}`}>
                      {stat.prefix}{formatValue(stat)}{stat.suffix}
                    </div>
                    <div className="text-slate-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional stats */}
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Performance that scales with your business
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {additionalStats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center group"
                >
                  <div className="space-y-3">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${getColorClasses(stat.color, 'bg')} group-hover:scale-110 transition-transform duration-300`}>
                      <div className={getColorClasses(stat.color, 'text')}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className={`text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1000ms' }}>
          <p className="text-slate-400 text-lg">
            No setup fees, no monthly fees, pay only for what you use.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
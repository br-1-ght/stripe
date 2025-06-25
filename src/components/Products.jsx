import React, { useState, useEffect, useRef } from 'react';
import { 
  CreditCard, Users, PieChart, Briefcase, Layers, Check
} from 'lucide-react';

const ProductsSection = () => {
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

  const products = [
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Payments",
      description: "Accept payments online, in person, or through your platform",
      features: ["Online payments", "Point of sale", "Invoicing"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Connect",
      description: "Build a marketplace or platform and pay sellers globally",
      features: ["Marketplace", "Multi-party payments", "Global payouts"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Billing",
      description: "Manage subscriptions and recurring billing with ease",
      features: ["Subscription management", "Usage billing", "Revenue optimization"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Corporate Card",
      description: "Issue cards to employees and control spending in real-time",
      features: ["Expense management", "Real-time controls", "Automated reporting"],
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full mb-6">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span className="text-slate-700 text-sm font-medium">Products</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            A fully integrated suite of financial services
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From payments to corporate cards, Stripe's financial infrastructure helps you grow your business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500 group cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${product.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {product.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {product.title}
              </h3>
              
              <p className="text-slate-600 mb-6 leading-relaxed">
                {product.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
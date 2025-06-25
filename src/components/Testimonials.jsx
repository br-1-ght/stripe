import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
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

  const testimonials = [
    {
      quote: "Stripe has been instrumental in our growth. The platform is incredibly reliable and the developer experience is second to none.",
      author: "Sarah Chen",
      role: "CTO",
      company: "TechFlow",
      avatar: "SC",
      rating: 5
    },
    {
      quote: "The analytics and reporting features help us understand our business better. We've increased our conversion rate by 23% since switching to Stripe.",
      author: "Michael Rodriguez",
      role: "Head of Product",
      company: "GrowthLabs",
      avatar: "MR",
      rating: 5
    },
    {
      quote: "Stripe's global payment processing capabilities allowed us to expand internationally without worrying about payment infrastructure.",
      author: "Emma Thompson",
      role: "VP of Operations",
      company: "GlobalCorp",
      avatar: "ET",
      rating: 5
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Trusted by businesses worldwide
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See what our customers have to say about their experience with Stripe
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-slate-50 rounded-2xl p-8 transition-all duration-700 hover:shadow-lg ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-slate-300 mb-4" />
              
              <p className="text-slate-700 leading-relaxed mb-6 text-lg">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">
                    {testimonial.author}
                  </div>
                  <div className="text-slate-600 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
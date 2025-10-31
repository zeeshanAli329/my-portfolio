'use client'
import { useState, useEffect, useRef } from 'react';

const Services = () => {
  const [currentService, setCurrentService] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  const services = [
    {
      title: "Frontend Development",
      description: "Building responsive and interactive user interfaces using React, Next.js, and modern JavaScript frameworks.",
      features: ["React & Next.js", "Responsive Design", "Performance Optimization", "Cross-browser Compatibility"]
    },
    {
      title: "UI/UX Design",
      description: "Creating intuitive and engaging user experiences with modern design principles and tools like Figma.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
    },
    {
      title: "Web Performance",
      description: "Optimizing web applications for speed, accessibility, and better user experience.",
      features: ["Performance Audits", "Code Splitting", "Lazy Loading", "Caching Strategies"]
    },
    {
      title: "Technical Consulting",
      description: "Providing expert advice on frontend architecture, technology stack, and development best practices.",
      features: ["Code Reviews", "Architecture Planning", "Team Mentoring", "Best Practices"]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? 'slide-in-down' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            I offer comprehensive frontend development services to help bring your digital ideas to life.
          </p>
        </div>

        {/* Animated Service Display */}
        <div className={`mb-12 ${isVisible ? 'slide-in-up' : 'opacity-0'}`}>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center bounce-slow">
              {services[currentService].title}
            </h3>
            <p className="text-gray-600 text-center mb-6 text-lg fade-in">
              {services[currentService].description}
            </p>
            <div className="flex justify-center space-x-4 flex-wrap">
              {services[currentService].features.map((feature, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-2 shake"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* All Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger-animation">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`
                bg-white rounded-lg shadow-lg p-6 transition-all duration-300 transform
                ${index === currentService ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-105'}
                hover:shadow-xl
              `}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 shake">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700 slide-in-left">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 pulse-slow"></span>
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

export default Services;
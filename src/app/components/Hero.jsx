'use client'
import { useState, useEffect, useRef } from 'react';
import DottedBackground from './DottedBackground';
import ParticleNetwork from './ParticleNetwork';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  const texts = [
    'Frontend Developer',
    'React Specialist',
    'UI/UX Enthusiast',
    'Next.js Expert'
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
    const currentText = texts[currentIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, texts]);

  return (
    <section ref={sectionRef} id="home" className="min-h-screen flex items-center pt-16 ">
      <ParticleNetwork />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Content */}
          <div className={`md:w-1/2 mb-8 md:mb-0 ${isVisible ? 'slide-in-left' : 'opacity-0'}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Hi, I'm <span className="text-blue-600 bounce-slow">Zeeshan <span className='italic'>Malik</span></span>
            </h1>
            <div className="text-xl md:text-2xl text-gray-700 mb-6 h-8">
              <span className="font-semibold border-r-2 border-black pr-1">
                {displayText}
              </span>
            </div>
            <p className="text-gray-600 mb-8 text-lg fade-in">
              Passionate frontend developer with expertise in React, Next.js, and modern web technologies. 
              Creating beautiful, responsive, and user-friendly web applications.
            </p>
            <div className="flex space-x-4 stagger-animation">
              <a href="#projects" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ">
                View Projects
              </a>
              <button className="border cursor-pointer border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition duration-300">
                Download CV
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className={`md:w-1/2 flex justify-center ${isVisible ? 'slide-in-right' : 'opacity-0'}`}>
            <div className="relative">
              <div className="w-80 h-80 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-xl float">
                {/* Replace with your actual image */}
                <div className="w-full h-full  flex items-center justify-center">
                  <img src='/me.jpg'></img>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-yellow-400 rounded-lg transform rotate-12 opacity-80 pulse-slow"></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-400 rounded-full opacity-80 rotate-slow"></div>
              <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-red-400 rounded-lg opacity-80 bounce-slow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
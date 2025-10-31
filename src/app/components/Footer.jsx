'use client'
import { useState, useEffect, useRef } from 'react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  return (
    <footer ref={sectionRef} className="bg-gray-900 text-white py-12">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isVisible ? 'slide-in-up' : 'opacity-0'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 stagger-animation">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 ">
              <span className="italic">Portfolio</span>
            </h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Frontend Developer specializing in React, Next.js, and modern web technologies. 
              Creating beautiful, responsive, and user-friendly web applications.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/zeeshan-ali-aa55b3340/" className="text-gray-400 hover:text-white transition duration-300 shake">LinkedIn</a>
              <a href="https://github.com/zeeshanAli329" className="text-gray-400 hover:text-white transition duration-300 shake">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300 shake">Twitter</a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 shake">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition duration-300 slide-in-left">Home</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-white transition duration-300 slide-in-left">Projects</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition duration-300 slide-in-left">Services</a></li>
              <li><a href="#experience" className="text-gray-400 hover:text-white transition duration-300 slide-in-left">Experience</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 shake">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="slide-in-right">Email: zeeshanali3297624@gamil.com</li>
              <li className="slide-in-right">Phone: +92 (327) 9430520</li>
              <li className="slide-in-right">Location: Kasur, Pakistan</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 fade-in">
          <p>&copy; 2025  Zeeshan <span className='italic'>Malik</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
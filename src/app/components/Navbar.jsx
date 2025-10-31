'use client'
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white shadow-lg py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-black">
              <span className="italic">Portfolio</span>
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:scale-110">
              Home
            </a>
            <a href="#projects" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:scale-110">
              Projects
            </a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:scale-110">
              Services
            </a>
            <a href="#experience" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:scale-110">
              Experience
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition duration-300"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <a href="#home" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300">
                Home
              </a>
              <a href="#projects" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300">
                Projects
              </a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300">
                Services
              </a>
              <a href="#experience" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300">
                Experience
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
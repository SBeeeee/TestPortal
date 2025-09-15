
"use client"
import React, { useState, useEffect } from 'react';
import { ChevronRight, BookOpen, Users, TrendingUp, Shield, Clock, Award, Menu, X, CheckCircle } from 'lucide-react';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
   
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <nav className="fixed top-0 w-full z-50 bg-white
    ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/"  className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-3">
            <BookOpen className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold text-gray-900">ExamPortal</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="/students" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Features
          </a>
          <a href="/students" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Student Dashboard
          </a>
          <a href="/teacher" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Teacher Dashboard
          </a>
          <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
          <a href="/auth/login" className="px-5 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Student Login
            </a>
            <a href="/auth/login"className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Teacher Login
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg">
          <div className="px-6 py-4 space-y-4">
            <a href="#features" className="block text-gray-700 hover:text-blue-600 transition-colors">Features</a>
            <a href="#about" className="block text-gray-700 hover:text-blue-600 transition-colors">About</a>
            <a href="#contact" className="block text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            <hr className="border-gray-200" />
            <button className="w-full text-left px-0 py-2 text-blue-600 font-medium">
              Student Login
            </button>
            <button className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg font-medium">
              Teacher Login
            </button>
          </div>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;
"use client"
import React, { useState, useEffect } from 'react';
import { ChevronRight, BookOpen, Users, TrendingUp, Shield, Clock, Award, Menu, X, CheckCircle } from 'lucide-react';

// Navbar Component


// Hero Component
const Hero = () => {
  return (
    <section className="relative pt-20 pb-16 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-100 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-50 rounded-full"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Award className="mr-2" size={16} />
              Trusted by 10,000+ Educational Institutions
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Modern Exam
              <span className="text-blue-600"> Management</span>
              <br />Made Simple
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              Streamline your examination process with our comprehensive platform designed for educational excellence and administrative efficiency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
                Get Started as Student
                <ChevronRight className="ml-2" size={20} />
              </button>
              
              <button className="flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors">
                Teacher Dashboard
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={16} />
                ISO 27001 Certified
              </div>
              <div className="flex items-center">
                <Shield className="text-blue-500 mr-2" size={16} />
                GDPR Compliant
              </div>
              <div className="flex items-center">
                <Clock className="text-orange-500 mr-2" size={16} />
                99.9% Uptime
              </div>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Mathematics Quiz</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 mb-3">What is the value of x in the equation: 2x + 5 = 15?</p>
                    <div className="space-y-2">
                      {['x = 5', 'x = 10', 'x = 7.5', 'x = 2.5'].map((option, idx) => (
                        <label key={idx} className="flex items-center space-x-3 cursor-pointer">
                          <input type="radio" name="question" className="text-blue-600" />
                          <span className="text-gray-600">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Question 3 of 20</span>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Previous
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600">Live Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Component
const Features = () => {
  const features = [
    {
      title: "Comprehensive Test Management",
      desc: "Create, schedule, and manage examinations with our intuitive interface. Support for multiple question types, time limits, and automated grading.",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Real-time Analytics",
      desc: "Monitor student progress with detailed analytics, performance tracking, and comprehensive reporting tools for data-driven insights.",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Secure & Reliable",
      desc: "Enterprise-grade security with encrypted data transmission, secure user authentication, and reliable infrastructure with 99.9% uptime.",
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Multi-User Support",
      desc: "Seamlessly manage multiple user roles including students, teachers, and administrators with appropriate access controls and permissions.",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Modern Examinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines powerful functionality with user-friendly design to deliver 
            an exceptional examination experience for both educators and students.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className={`w-12 h-12 ${feature.bgColor} ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                <feature.icon size={24} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats Component
const Stats = () => {
  const stats = [
    { number: '50,000+', label: 'Active Students', subtext: 'Across 500+ institutions' },
    { number: '2,500+', label: 'Educators', subtext: 'Trust our platform' },
    { number: '1M+', label: 'Tests Completed', subtext: 'With 99.9% reliability' },
    { number: '45%', label: 'Time Saved', subtext: 'On average per exam cycle' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform Your Examination Process?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of educational institutions that trust ExamPortal for their examination needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg">
            Start Free Trial
          </button>
          <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <BookOpen className="text-white" size={18} />
              </div>
              <span className="text-xl font-bold text-white">ExamPortal</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering educational institutions with modern examination management solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ExamPortal. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
export default function LandingPage() {
  return (
    <main className="min-h-screen">
     
      <Hero />
      <Stats />
      <Features />
      <CallToAction />
      <Footer />
    </main>
  );
}
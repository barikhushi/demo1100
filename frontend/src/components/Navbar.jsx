import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Education', id: 'education' },
    { name: 'Certifications', id: 'certifications' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleScrollTo = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-darkBg/75 backdrop-blur-md py-4 border-b border-slate-800/40 shadow-lg' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-2 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accentIndigo to-accentViolet flex items-center justify-center font-bold text-lg text-slate-100 shadow-lg group-hover:shadow-accentIndigo/20 transition-all duration-300">
            KB
          </div>
          <span className="font-bold text-xl tracking-wide group-hover:text-accentTeal transition-colors duration-300">
            Khushi<span className="text-accentTeal font-extrabold">.</span>Bari
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className={`text-sm font-medium tracking-wide transition-all duration-300 focus:outline-none relative py-1 ${
                activeSection === item.id 
                  ? 'text-accentTeal' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.name}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accentTeal rounded-full shadow-[0_0_8px_#0df2c9]" />
              )}
            </button>
          ))}
          <button 
            onClick={() => handleScrollTo('contact')}
            className="flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-accentTeal border border-accentTeal/30 hover:border-accentTeal hover:bg-accentTeal/5 transition-all duration-300"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburguer Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-400 hover:text-slate-100 focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 border-b border-slate-800/80 backdrop-blur-lg flex flex-col py-6 px-6 space-y-4 shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className={`text-left text-base font-semibold py-2 border-b border-slate-800/40 ${
                activeSection === item.id ? 'text-accentTeal' : 'text-slate-400'
              }`}
            >
              {item.name}
            </button>
          ))}
          <button 
            onClick={() => handleScrollTo('contact')}
            className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-gradient-to-r from-accentIndigo to-accentViolet text-slate-100 font-semibold shadow-lg focus:outline-none"
          >
            <span>Get In Touch</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </nav>
  );
}

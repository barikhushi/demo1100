import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Download } from 'lucide-react';

export default function Hero({ profile = {} }) {
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'React Developer Intern',
    'Full-Stack Developer',
    'AI/ML & Automation Enthusiast',
    'Microsoft 365 Developer'
  ];

  const TYPING_SPEED = 100;
  const DELETING_SPEED = 50;
  const DELAY_BETWEEN = 2000;

  useEffect(() => {
    let timer;
    const currentFullText = roles[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setRoleText(currentFullText.substring(0, roleText.length - 1));
      }, DELETING_SPEED);
    } else {
      timer = setTimeout(() => {
        setRoleText(currentFullText.substring(0, roleText.length + 1));
      }, TYPING_SPEED);
    }

    // Handlers
    if (!isDeleting && roleText === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), DELAY_BETWEEN);
    } else if (isDeleting && roleText === '') {
      setIsDeleting(false);
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [roleText, isDeleting, roleIndex]);

  const handleScrollTo = (id) => {
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
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center relative px-6 pt-24 pb-12 overflow-hidden">
      
      {/* Decorative center grid light */}
      <div className="absolute top-[40%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[35rem] h-[35rem] rounded-full bg-accentIndigo/10 blur-[130px] -z-10" />

      <div className="max-w-4xl text-center space-y-6 z-10 flex flex-col items-center">
        
        {/* Profile intern tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-accentTeal animate-pulse" />
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">
            {profile.title || 'React Developer Intern'}
          </span>
        </motion.div>

        {/* Hero headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-100"
        >
          Hi, I'm <span className="bg-gradient-to-r from-accentTeal via-accentIndigo to-accentViolet bg-clip-text text-transparent glow-text-teal">{profile.name || 'Khushi Bari'}</span>
        </motion.h1>

        {/* Dynamic Typing Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-8 text-xl md:text-2xl font-medium text-slate-400 font-mono flex items-center justify-center"
        >
          <span>I am a </span>
          <span className="text-accentTeal ml-2 glow-text-teal">{roleText}</span>
          <span className="w-[3px] h-6 bg-accentTeal ml-1 animate-pulse" />
        </motion.div>

        {/* Summary pitch */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed font-sans"
        >
          {profile.summary || 'Innovative full-stack developer specializing in building modern web interfaces and smart AI-integrated server solutions.'}
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 pt-6"
        >
          <button
            onClick={() => handleScrollTo('contact')}
            className="btn-gradient flex items-center justify-center space-x-2 text-slate-100 font-semibold"
          >
            <Mail className="w-4.5 h-4.5" />
            <span>Connect With Me</span>
          </button>
          
          <button
            onClick={() => handleScrollTo('projects')}
            className="btn-outline flex items-center justify-center space-x-2 text-accentTeal font-semibold"
          >
            <span>View My Work</span>
            <ArrowDown className="w-4.5 h-4.5 animate-bounce mt-0.5" />
          </button>
        </motion.div>

      </div>

      {/* Floating indicators for scrolls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-[50%] -translate-x-[50%] hidden md:flex flex-col items-center cursor-pointer hover:opacity-100 transition-opacity duration-300"
        onClick={() => handleScrollTo('about')}
      >
        <span className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-medium">Scroll Down</span>
        <div className="w-6 h-10 rounded-full border-2 border-slate-700 p-1 flex justify-center">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-2 rounded-full bg-accentTeal" 
          />
        </div>
      </motion.div>

    </section>
  );
}

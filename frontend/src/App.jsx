import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import { getPortfolioData } from './utils/api';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function App() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPortfolioData();
      setPortfolio(data);
    } catch (err) {
      console.error('Failed to retrieve portfolio configuration:', err);
      setError('Unable to fetch portfolio data. Make sure the Node.js backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Track active section for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080C14] flex flex-col items-center justify-center space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-accentIndigo/20 border-t-accentTeal animate-spin" />
          <div className="absolute font-mono font-bold text-xs text-accentTeal animate-pulse">KB</div>
        </div>
        <p className="text-xs uppercase tracking-widest text-slate-500 font-bold animate-pulse">
          Loading Portfolio Assets...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#080C14] flex flex-col items-center justify-center px-6">
        <div className="glass-panel max-w-md p-8 border-red-500/20 text-center space-y-6 shadow-neon-indigo">
          <div className="w-14 h-14 rounded-full bg-red-950/30 border border-red-900/40 flex items-center justify-center text-red-500 mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-100">Connection Error</h2>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">{error}</p>
          </div>
          <button
            onClick={loadData}
            className="btn-gradient inline-flex items-center space-x-2 text-slate-100 text-sm font-semibold"
          >
            <RefreshCw className="w-4 h-4 mt-0.5" />
            <span>Try Reconnecting</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Background Effect Layer */}
      <ParticleBackground />

      {/* Global Navigation Header */}
      <Navbar activeSection={activeSection} />

      {/* Section Wrappers */}
      <main className="relative z-10 pt-16">
        <Hero profile={portfolio.profile} />
        
        <div className="max-w-7xl mx-auto">
          {/* Visual gradient separators between page boundaries */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-800/40 to-transparent my-4" />
          <About profile={portfolio.profile} />
          
          <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-800/40 to-transparent my-4" />
          <Skills skills={portfolio.skills} />
          
          <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-800/40 to-transparent my-4" />
          <Experience experience={portfolio.experience} />
          
          <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-800/40 to-transparent my-4" />
          <Projects projects={portfolio.projects} />
          
          <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-800/40 to-transparent my-4" />
          <Education education={portfolio.education} />
          
          <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-800/40 to-transparent my-4" />
          <Certifications 
            certifications={portfolio.certifications} 
            awards={portfolio.awards} 
          />
          
          <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-800/40 to-transparent my-4" />
          <Contact profile={portfolio.profile} />
        </div>
      </main>

      {/* Global Footer */}
      <Footer profile={portfolio.profile} />
    </>
  );
}

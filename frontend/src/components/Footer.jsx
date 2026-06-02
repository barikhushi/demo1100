import React from 'react';
import { Linkedin, Github, Mail, ArrowUp } from 'lucide-react';

export default function Footer({ profile = {} }) {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950/60 py-12 relative overflow-hidden">
      {/* Visual Accent line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Branding block */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg tracking-wide">
              Khushi<span className="text-accentTeal font-extrabold">.</span>Bari
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Professional Portfolio © {currentYear} • Built with React & Node.js
          </p>
        </div>

        {/* Social interactions */}
        <div className="flex items-center space-x-5">
          {profile.linkedin && (
            <a 
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800/60 flex items-center justify-center text-slate-400 hover:text-accentTeal hover:border-accentTeal/30 hover:scale-105 active:scale-95 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {profile.github && (
            <a 
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800/60 flex items-center justify-center text-slate-400 hover:text-accentTeal hover:border-accentTeal/30 hover:scale-105 active:scale-95 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {profile.email && (
            <a 
              href={`mailto:${profile.email}`}
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800/60 flex items-center justify-center text-slate-400 hover:text-accentTeal hover:border-accentTeal/30 hover:scale-105 active:scale-95 transition-all duration-300"
              aria-label="Email Contact"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Action Button: Scroll back up */}
        <button
          onClick={handleScrollTop}
          className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800/60 flex items-center justify-center text-slate-400 hover:text-accentTeal hover:border-accentTeal/40 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

      </div>
    </footer>
  );
}

import React, { useEffect } from 'react';

export default function ParticleBackground() {
  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Avoid ripples on inputs or buttons to allow their own hover/active animations
      const tagName = e.target.tagName.toLowerCase();
      if (tagName === 'input' || tagName === 'textarea' || tagName === 'button' || e.target.closest('button')) {
        return;
      }

      const ripple = document.createElement('div');
      ripple.className = 'ripple-effect';
      
      // Calculate coordinates relative to document scroll
      const size = 60; // Base size of the ripple
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${e.pageX - size / 2}px`;
      ripple.style.top = `${e.pageY - size / 2}px`;

      document.body.appendChild(ripple);

      // Remove after animation completes
      setTimeout(() => {
        ripple.remove();
      }, 750);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Dynamic Liquid Glowing Orbs */}
      <div 
        className="absolute w-[35rem] h-[35rem] rounded-full bg-gradient-to-tr from-accentIndigo/10 to-accentViolet/5 blur-[90px] -top-40 -left-40 animate-blob-1 animate-pulse-slow"
      />
      <div 
        className="absolute w-[40rem] h-[40rem] rounded-full bg-gradient-to-bl from-accentTeal/5 to-accentIndigo/10 blur-[110px] -bottom-60 -right-60 animate-blob-2"
      />
      <div 
        className="absolute w-[30rem] h-[30rem] rounded-full bg-accentViolet/5 blur-[80px] top-[40%] left-[30%] animate-blob-1"
        style={{ animationDelay: '2s' }}
      />
      
      {/* Fine grid background texture for premium feel */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, #94a3b8 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
    </div>
  );
}

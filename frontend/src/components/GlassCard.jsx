import React, { useState, useRef } from 'react';

export default function GlassCard({ children, className = '', glowColor = 'indigo' }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('rotateX(0deg) rotateY(0deg) scale(1)');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Position of cursor relative to card
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;

    // Center point of card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angle (max 10 degrees)
    const rotateX = ((centerY - y) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransformStyle(`rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.02)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('rotateX(0deg) rotateY(0deg) scale(1)');
  };

  const shadowClass = glowColor === 'teal' 
    ? 'hover:shadow-neon-teal hover:border-accentTeal/30' 
    : 'hover:shadow-neon-indigo hover:border-accentIndigo/30';

  return (
    <div
      ref={cardRef}
      className={`glass-panel glass-panel-hover p-6 ${shadowClass} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease, border-color 0.3s ease',
        transformStyle: 'preserve-3d',
      }}
    >
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </div>
  );
}

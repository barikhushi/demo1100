import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { Award, ShieldCheck, Trophy, Calendar } from 'lucide-react';

export default function Certifications({ certifications = [], awards = [] }) {
  const [activeTab, setActiveTab] = useState('certifications');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <section id="certifications" className="py-20 px-6 max-w-7xl mx-auto relative">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
          Accomplishments & <span className="bg-gradient-to-r from-accentTeal to-accentIndigo bg-clip-text text-transparent">Recognitions</span>
        </h2>
        <div className="w-16 h-1 bg-accentTeal rounded-full mt-3 shadow-[0_0_8px_#0df2c9]" />
      </div>

      {/* Dual Tab Buttons */}
      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setActiveTab('certifications')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-300 focus:outline-none ${
            activeTab === 'certifications'
              ? 'bg-gradient-to-r from-accentIndigo to-accentViolet border-transparent text-slate-100 shadow-md shadow-accentIndigo/25 scale-[1.02]'
              : 'bg-slate-900/40 border-slate-800/60 text-slate-400 hover:text-slate-200 hover:border-slate-700/50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Professional Certifications ({certifications.length})</span>
        </button>
        
        <button
          onClick={() => setActiveTab('awards')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-300 focus:outline-none ${
            activeTab === 'awards'
              ? 'bg-gradient-to-r from-accentIndigo to-accentViolet border-transparent text-slate-100 shadow-md shadow-accentIndigo/25 scale-[1.02]'
              : 'bg-slate-900/40 border-slate-800/60 text-slate-400 hover:text-slate-200 hover:border-slate-700/50'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Honors & Awards ({awards.length})</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'certifications' ? (
          <motion.div
            key="certifications"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certifications.map((cert, index) => (
              <motion.div key={index} variants={itemVariants}>
                <GlassCard className="h-full flex flex-col justify-between p-6" glowColor="indigo">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-accentIndigo">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">{cert.date}</span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-200 leading-snug tracking-wide line-clamp-2 hover:line-clamp-none transition-all">{cert.name}</h3>
                      <p className="text-xs font-semibold text-accentTeal mt-1.5">{cert.issuer}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="awards"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {awards.map((award, index) => (
              <motion.div key={index} variants={itemVariants}>
                <GlassCard className="h-full flex flex-col justify-between p-7" glowColor="teal">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-accentTeal">
                        <Award className="w-6 h-6" />
                      </div>
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-accentTeal/10 border border-accentTeal/20 text-[10px] font-bold text-accentTeal uppercase tracking-wider">
                        Honored Recipient
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-100 tracking-wide">{award.name}</h3>
                      <p className="text-xs font-semibold text-slate-400 mt-1">{award.issuer}</p>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed font-sans mt-2">
                      {award.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

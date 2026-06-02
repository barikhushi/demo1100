import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export default function Experience({ experience = [] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="experience" className="py-20 px-6 max-w-5xl mx-auto relative">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
          Internship <span className="bg-gradient-to-r from-accentTeal to-accentIndigo bg-clip-text text-transparent">Journey</span>
        </h2>
        <div className="w-16 h-1 bg-accentTeal rounded-full mt-3 shadow-[0_0_8px_#0df2c9]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative border-l border-slate-800/80 pl-8 ml-4 space-y-12"
      >
        {/* Visual vertical gradient overlay */}
        <div className="absolute top-0 left-0 w-[2px] h-full timeline-gradient -translate-x-[50%] -z-10" />

        {experience.map((exp, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="relative"
          >
            {/* Pulsing timelines indicator node */}
            <span className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-accentIndigo flex items-center justify-center shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-accentTeal animate-pulse" />
            </span>

            <GlassCard className="space-y-4" glowColor={index === 0 ? 'teal' : 'indigo'}>
              {/* Job title metadata */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800/40 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-100 tracking-wide">{exp.role}</h3>
                  <div className="flex items-center space-x-2 text-slate-400 mt-1 font-medium">
                    <span className="text-accentTeal font-semibold">{exp.company}</span>
                    <span>•</span>
                    <span className="flex items-center text-xs text-slate-500 font-sans">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      {exp.location}
                    </span>
                  </div>
                </div>
                
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-950/60 border border-slate-900 text-xs font-semibold text-slate-400 self-start md:self-center">
                  <Calendar className="w-3.5 h-3.5 text-accentIndigo" />
                  <span>{exp.duration}</span>
                </div>
              </div>

              {/* Responsibilities list */}
              <ul className="space-y-2.5 pt-2">
                {exp.highlights.map((highlight, hIndex) => (
                  <li key={hIndex} className="flex items-start text-sm text-slate-400 leading-relaxed font-sans">
                    <span className="text-accentTeal mr-2 mt-1.5 shrink-0 text-[10px]">■</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { GraduationCap, Calendar, BookOpen } from 'lucide-react';

export default function Education({ education = [] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="education" className="py-20 px-6 max-w-7xl mx-auto relative">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
          Academic <span className="bg-gradient-to-r from-accentTeal to-accentIndigo bg-clip-text text-transparent">Background</span>
        </h2>
        <div className="w-16 h-1 bg-accentTeal rounded-full mt-3 shadow-[0_0_8px_#0df2c9]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {education.map((edu, index) => (
          <motion.div key={index} variants={itemVariants}>
            <GlassCard className="h-full flex flex-col justify-between p-8" glowColor={index === 0 ? 'teal' : 'indigo'}>
              
              <div className="space-y-5">
                {/* Visual cap header */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-accentTeal">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-950/60 border border-slate-900 text-xs font-semibold text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-accentIndigo" />
                    <span>{edu.duration}</span>
                  </div>
                </div>

                {/* Degree and school details */}
                <div>
                  <h3 className="text-xl font-bold text-slate-100 tracking-wide">{edu.degree}</h3>
                  <p className="text-sm font-semibold text-accentTeal mt-1.5">{edu.institution}</p>
                </div>

                {/* Additional syllabus or status details */}
                <p className="text-slate-400 text-sm leading-relaxed font-sans">
                  {edu.details}
                </p>
              </div>

              {/* Status footer inside card */}
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 pt-5 border-t border-slate-800/40 mt-6">
                <BookOpen className="w-4 h-4 text-accentIndigo" />
                <span className="uppercase tracking-wider">Full-Time Degree Program</span>
              </div>

            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';

export default function Skills({ skills = [] }) {
  const [activeCategory, setActiveCategory] = useState(skills[0]?.category || 'Frontend');

  // Set initial category safely if skills array loaded asynchronously
  React.useEffect(() => {
    if (skills.length > 0 && !skills.some(s => s.category === activeCategory)) {
      setActiveCategory(skills[0].category);
    }
  }, [skills]);

  const activeSkillsList = skills.find(s => s.category === activeCategory)?.items || [];

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
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section id="skills" className="py-20 px-6 max-w-7xl mx-auto relative">
      
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
          Technical <span className="bg-gradient-to-r from-accentTeal to-accentIndigo bg-clip-text text-transparent">Expertise</span>
        </h2>
        <div className="w-16 h-1 bg-accentTeal rounded-full mt-3 shadow-[0_0_8px_#0df2c9]" />
      </div>

      {/* Categories Tab Selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {skills.map((categoryObj) => (
          <button
            key={categoryObj.category}
            onClick={() => setActiveCategory(categoryObj.category)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-300 focus:outline-none ${
              activeCategory === categoryObj.category
                ? 'bg-gradient-to-r from-accentIndigo to-accentViolet border-transparent text-slate-100 shadow-md shadow-accentIndigo/25 scale-[1.02]'
                : 'bg-slate-900/40 border-slate-800/60 text-slate-400 hover:text-slate-200 hover:border-slate-700/50'
            }`}
          >
            {categoryObj.category}
          </button>
        ))}
      </div>

      {/* Skills Grid Layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activeSkillsList.map((skill) => (
            <motion.div key={skill.name} variants={itemVariants}>
              <GlassCard glowColor={activeCategory === 'Frontend' ? 'teal' : 'indigo'} className="h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200 tracking-wide text-base">{skill.name}</span>
                    <span className="text-xs font-mono font-bold text-accentTeal">{skill.level}%</span>
                  </div>
                  
                  {/* Custom animated neon progress bar */}
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900 relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        activeCategory === 'Frontend'
                          ? 'bg-gradient-to-r from-accentTeal to-teal-400 shadow-[0_0_8px_rgba(13,242,201,0.5)]'
                          : 'bg-gradient-to-r from-accentIndigo to-accentViolet shadow-[0_0_8px_rgba(99,102,241,0.5)]'
                      }`}
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

    </section>
  );
}

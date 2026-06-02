import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { Github, ExternalLink, Code } from 'lucide-react';

export default function Projects({ projects = [] }) {
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto relative">
      
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
          Featured <span className="bg-gradient-to-r from-accentTeal to-accentIndigo bg-clip-text text-transparent">Projects</span>
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
        {projects.map((project, index) => (
          <motion.div key={index} variants={itemVariants}>
            <GlassCard glowColor={index === 0 ? 'teal' : 'indigo'} className="h-full flex flex-col justify-between gap-6 p-8">
              
              <div className="space-y-4">
                {/* Visual card header icon */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-accentTeal">
                    <Code className="w-5 h-5" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <a 
                      href={project.githubUrl || '#'}
                      className="text-slate-400 hover:text-slate-200 p-2 rounded-xl bg-slate-950/60 border border-slate-900 hover:border-slate-800 transition-all duration-300"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a 
                      href={project.demoUrl || '#'}
                      className="text-slate-400 hover:text-slate-200 p-2 rounded-xl bg-slate-950/60 border border-slate-900 hover:border-slate-800 transition-all duration-300"
                      aria-label="Live Demo Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Subtitle & Title */}
                <div>
                  <p className="text-xs font-mono font-bold text-accentTeal tracking-wider uppercase">{project.subtitle}</p>
                  <h3 className="text-2xl font-bold text-slate-100 tracking-wide mt-1">{project.title}</h3>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed font-sans">
                  {project.description}
                </p>
              </div>

              {/* Technologies tags list */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/30 mt-auto">
                {project.tech.map((techItem) => (
                  <span 
                    key={techItem}
                    className="px-3 py-1 rounded-lg text-xs font-semibold font-mono bg-slate-950/60 border border-slate-900 text-slate-400 hover:text-accentTeal hover:border-accentTeal/30 transition-all duration-300"
                  >
                    {techItem}
                  </span>
                ))}
              </div>

            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}

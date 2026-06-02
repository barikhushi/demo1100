import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { MapPin, Mail, GraduationCap, Globe, Phone } from 'lucide-react';

export default function About({ profile = {} }) {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" className="py-20 px-6 max-w-7xl mx-auto relative">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
          About <span className="bg-gradient-to-r from-accentTeal to-accentIndigo bg-clip-text text-transparent">Me</span>
        </h2>
        <div className="w-16 h-1 bg-accentTeal rounded-full mt-3 shadow-[0_0_8px_#0df2c9]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
      >
        
        {/* Left Side: Summary text */}
        <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <h3 className="text-2xl font-bold text-slate-200">
            Fusing Engineering with Modern Art & Intelligent Automation
          </h3>
          <p className="text-slate-400 leading-relaxed font-sans">
            I am a full-stack developer intern centered in Pune, India. With an academic background combining computer applications (BCA & MCA), I have developed a strong foundation in modern coding practices, software development lifecycle, and cloud automation.
          </p>
          <p className="text-slate-400 leading-relaxed font-sans">
            My core interest circles around constructing high-performing frontends in <span className="text-accentTeal font-medium">React.js</span>, reliable APIs in <span className="text-accentIndigo font-medium">Django & Node.js</span>, and embedding modern smart technologies like <span className="text-accentViolet font-medium">Generative AI, RAG, and Agentic AI workflows</span>.
          </p>
          <p className="text-slate-400 leading-relaxed font-sans">
            I also bring a depth of expertise in utilizing <span className="text-slate-200 font-semibold">Microsoft Power Platform tools</span> (PowerApps, Power Automate, and Power BI) to automate enterprise systems, compile detailed insights, and coordinate cross-team business logic efficiently.
          </p>
        </motion.div>

        {/* Right Side: Key Metadata Cards */}
        <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col justify-between">
          <GlassCard className="h-full flex flex-col justify-between gap-6" glowColor="teal">
            <h4 className="text-lg font-bold text-accentTeal uppercase tracking-wider mb-2">Personal Directory</h4>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3.5">
                <MapPin className="w-5 h-5 text-accentTeal mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Current Location</p>
                  <p className="text-sm text-slate-300 font-medium">{profile.location || 'Pune, India 411057'}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Native: {profile.nativeLocation || 'Shirpur, India'}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Mail className="w-5 h-5 text-accentTeal mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Email Address</p>
                  <a href={`mailto:${profile.email}`} className="text-sm text-slate-300 font-medium hover:text-accentTeal transition-colors">{profile.email || 'khushibari2421@gmail.com'}</a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Phone className="w-5 h-5 text-accentTeal mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Phone Number</p>
                  <a href={`tel:${profile.phone}`} className="text-sm text-slate-300 font-medium hover:text-accentTeal transition-colors">{profile.phone || '+919422905210'}</a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <GraduationCap className="w-5 h-5 text-accentTeal mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Education Status</p>
                  <p className="text-sm text-slate-300 font-medium">MCA expected June 2026</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Globe className="w-5 h-5 text-accentTeal mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Spoken Languages</p>
                  <p className="text-sm text-slate-300 font-medium">
                    {profile.languages ? profile.languages.join(' • ') : 'English • Hindi • Marathi'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid inside card */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/60 mt-auto">
              <div className="text-center p-2 rounded-xl bg-slate-950/40 border border-slate-900">
                <p className="text-xl font-bold text-accentTeal">React</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-0.5">Frontend</p>
              </div>
              <div className="text-center p-2 rounded-xl bg-slate-950/40 border border-slate-900">
                <p className="text-xl font-bold text-accentIndigo">Django</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-0.5">Backend</p>
              </div>
              <div className="text-center p-2 rounded-xl bg-slate-950/40 border border-slate-900">
                <p className="text-xl font-bold text-accentViolet">Agentic</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-0.5">AI/ML</p>
              </div>
            </div>

          </GlassCard>
        </motion.div>

      </motion.div>
    </section>
  );
}

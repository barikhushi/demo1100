import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { submitContactForm } from '../utils/api';
import { Mail, Phone, MapPin, Linkedin, Github, Send, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Contact({ profile = {} }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic client validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus({
        loading: false,
        success: null,
        error: 'Please fill in all the required form fields.'
      });
      return;
    }

    setStatus({ loading: true, success: null, error: null });

    try {
      const response = await submitContactForm(formData);
      setStatus({
        loading: false,
        success: response.message || 'Your message has been sent successfully.',
        error: null
      });
      // Clear form on success
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({
        loading: false,
        success: null,
        error: err.message || 'Failed to submit form. Please check your connection and try again.'
      });
    }
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-7xl mx-auto relative">
      
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
          Get In <span className="bg-gradient-to-r from-accentTeal to-accentIndigo bg-clip-text text-transparent">Touch</span>
        </h2>
        <div className="w-16 h-1 bg-accentTeal rounded-full mt-3 shadow-[0_0_8px_#0df2c9]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Contact directory & cards */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-100 tracking-wide">Let's build something epic!</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-sans">
              Have a project idea, an open internship opportunity, or simply want to connect to talk about React development, Python APIs, Generative AI, or cloud automation? Drop a line and I will get back to you shortly.
            </p>
          </div>

          <div className="space-y-4 my-6">
            
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/40">
              <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-accentTeal shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Email Address</p>
                <a href={`mailto:${profile.email}`} className="text-sm font-semibold text-slate-300 hover:text-accentTeal transition-colors">
                  {profile.email || 'khushibari2421@gmail.com'}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/40">
              <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-accentTeal shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Phone number</p>
                <a href={`tel:${profile.phone}`} className="text-sm font-semibold text-slate-300 hover:text-accentTeal transition-colors">
                  {profile.phone || '+919422905210'}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/40">
              <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-accentTeal shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Location</p>
                <p className="text-sm font-semibold text-slate-300">
                  {profile.location || 'Pune, India 411057'}
                </p>
              </div>
            </div>

          </div>

          {/* Social connections links */}
          <div className="flex items-center space-x-4 pt-4 border-t border-slate-900 mt-auto">
            {profile.linkedin && (
              <a 
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-900 hover:border-accentTeal/30 text-xs font-semibold text-slate-400 hover:text-accentTeal transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            )}
            {profile.github && (
              <a 
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-900 hover:border-accentTeal/30 text-xs font-semibold text-slate-400 hover:text-accentTeal transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            )}
          </div>

        </div>

        {/* Right Side: Form Card */}
        <div className="lg:col-span-7">
          <GlassCard glowColor="teal" className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Form header */}
              <div>
                <h4 className="text-lg font-bold text-slate-200">Send an Direct Message</h4>
                <p className="text-xs text-slate-500 mt-0.5 font-sans">Required fields are marked *</p>
              </div>

              {/* Status Notifications Alerts */}
              {status.error && (
                <div className="flex items-start space-x-2 p-4 rounded-xl bg-red-950/20 border border-red-900/40 text-red-400 text-sm font-medium">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{status.error}</span>
                </div>
              )}
              {status.success && (
                <div className="flex items-start space-x-2 p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-emerald-400 text-sm font-medium animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{status.success}</span>
                </div>
              )}

              {/* Input Group fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold text-slate-400">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="glass-input"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-400">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                    className="glass-input"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="subject" className="text-xs font-semibold text-slate-400">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  required
                  className="glass-input"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="message" className="text-xs font-semibold text-slate-400">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                  className="glass-input resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full btn-gradient flex items-center justify-center space-x-2 text-slate-100 font-semibold disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none"
              >
                {status.loading ? (
                  <>
                    <span className="w-5 h-5 rounded-full border-2 border-slate-300 border-t-transparent animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mt-0.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>
          </GlassCard>
        </div>

      </div>

    </section>
  );
}

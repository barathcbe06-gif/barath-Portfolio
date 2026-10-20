import React, { useState } from 'react';
import { personalInfo } from '../../data/portfolioData';
import { soundEngine } from '../ui/AudioController';
import { Mail, Send, CheckCircle2, Shield, Copy, Check, Radio } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../ui/Icons';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmitted, setTransmitted] = useState(false);

  const handleCopyEmail = () => {
    soundEngine.playHologramChime();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    soundEngine.playRepulsorBlast();
    setIsTransmitting(true);

    setTimeout(() => {
      soundEngine.playHologramChime();
      setIsTransmitting(false);
      setTransmitted(true);

      // Trigger Avengers celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#00f0ff', '#e62429', '#f5b041']
      });

      setTimeout(() => {
        setFormState({ name: '', email: '', message: '' });
        setTransmitted(false);
      }, 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#02050e] overflow-hidden border-t border-cyan-500/30">
      
      {/* Background Cyan & Crimson Uplink Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/50 text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>S.H.I.E.L.D. SECURE SUB-SPACE UPLINK // EARTH-616</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Orbitron'] text-white tracking-wide">
            INITIATE SECURE TRANSMISSION
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-['Rajdhani'] leading-relaxed">
            Ready to collaborate on high-impact AI systems, machine learning engineering, or data science challenges? Send an encrypted dispatch or connect via official channels.
          </p>
        </div>

        {/* 2-Column: Left = Direct Channels & Clearance Dossier, Right = Interactive Transmission Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Clearance Card */}
            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-['Orbitron'] font-bold text-white text-sm">
                    BARATH // AI ENGINEER
                  </h4>
                  <span className="text-[11px] font-mono text-cyan-400">
                    {personalInfo.starkDivision}
                  </span>
                </div>
              </div>

              <div className="text-xs font-mono text-slate-300 space-y-1.5 pt-2 border-t border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">LOCATION:</span>
                  <span className="text-slate-200">{personalInfo.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">STATUS:</span>
                  <span className="text-emerald-400 font-bold">AVAILABLE FOR HIRE / COLLABORATION</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">RESPONSE LATENCY:</span>
                  <span className="text-cyan-300 font-bold">&lt; 24 HOURS</span>
                </div>
              </div>
            </div>

            {/* Direct Channel Links */}
            <div className="space-y-3">
              
              {/* Email */}
              <div className="glass-panel p-4 rounded-xl border border-cyan-500/20 hover:border-cyan-400 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">DIRECT EMAIL</span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-xs sm:text-sm font-mono text-cyan-300 hover:underline"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-black/40 hover:bg-cyan-950/60 text-slate-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-all"
                  title="Copy email address"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* LinkedIn */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playHudClick()}
                className="glass-panel p-4 rounded-xl border border-blue-500/20 hover:border-blue-400 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">PROFESSIONAL NETWORK</span>
                    <span className="text-xs sm:text-sm font-['Orbitron'] font-semibold text-white group-hover:text-blue-300">
                      LinkedIn // Barath
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-blue-400 group-hover:translate-x-1 transition-transform">
                  CONNECT →
                </span>
              </a>

              {/* GitHub */}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playHudClick()}
                className="glass-panel p-4 rounded-xl border border-slate-700 hover:border-cyan-400 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-200">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">OPEN-SOURCE ARSENAL</span>
                    <span className="text-xs sm:text-sm font-['Orbitron'] font-semibold text-white group-hover:text-cyan-300">
                      GitHub // barath-datascience
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform">
                  EXPLORE →
                </span>
              </a>

            </div>

          </div>

          {/* Right: Encrypted Transmission Terminal */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border-2 border-cyan-500/40 relative shadow-[0_0_40px_rgba(0,240,255,0.15)]">
              
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-6">
                <span className="text-xs font-['Orbitron'] font-bold text-cyan-300 tracking-wider">
                  TRANSMISSION TERMINAL
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  QUANTUM ENCRYPTED
                </span>
              </div>

              {transmitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-cyan-950/80 border-2 border-cyan-400 mx-auto flex items-center justify-center text-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.6)]">
                    <CheckCircle2 className="w-8 h-8 text-cyan-400 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold font-['Orbitron'] text-white">
                    DISPATCH DELIVERED TO BARATH
                  </h3>
                  <p className="text-xs font-mono text-cyan-400 max-w-sm mx-auto">
                    Signal routed to primary communicator. S.H.I.E.L.D. confirmation protocol triggered.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                      OPERATIVE / SENDER NAME:
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Tony Stark / Recruiter / Collaborator"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm font-mono text-slate-100 placeholder-slate-600 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                      RETURN UPLINK FREQUENCY (EMAIL):
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. operative@organization.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm font-mono text-slate-100 placeholder-slate-600 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                      TACTICAL MISSION BRIEF (MESSAGE):
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Describe your project, role, or collaboration scope..."
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm font-mono text-slate-100 placeholder-slate-600 transition-all outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isTransmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-white font-['Orbitron'] text-xs font-bold tracking-widest transition-all shadow-[0_0_25px_rgba(0,240,255,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send className={`w-4 h-4 ${isTransmitting ? 'animate-spin' : ''}`} />
                    <span>{isTransmitting ? 'TRANSMITTING ENCRYPTED PACKET...' : 'TRANSMIT SECURE DISPATCH'}</span>
                  </button>

                  <div className="text-[10px] font-mono text-center text-slate-500">
                    256-Bit Quantum Encryption Standard • Zero Data Leakage
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Futuristic Avengers Footer */}
      <footer className="mt-24 pt-8 border-t border-slate-900 text-center text-xs font-mono text-slate-400 space-y-2">
        <div className="flex items-center justify-center gap-2 text-cyan-400 font-bold font-['Orbitron']">
          <span>BARATH PORTFOLIO</span>
          <span>//</span>
          <span>AVENGERS-INSPIRED DATA SCIENCE ARCHITECTURE</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Designed & Engineered with React, Three.js, Tailwind CSS & Procedural Web Audio.
        </p>
        <p className="text-[10px] text-slate-400">
          Earth-616 • All Rights Reserved • Building Intelligence. Creating Impact.
        </p>
      </footer>
    </section>
  );
}

import React, { lazy, Suspense } from 'react';
import { personalInfo } from '../../data/portfolioData';
import { Shield, GraduationCap, Target, Compass, Sparkles } from 'lucide-react';
import Hero3DFallback from '../3d/Hero3DFallback';

const VibraniumShieldCanvas = lazy(() => import('../3d/VibraniumShieldCanvas'));

export default function CaptainAmericaSection() {
  return (
    <section id="about" className="relative py-28 bg-[#040813] overflow-hidden border-t border-blue-900/40">
      
      {/* Background Vibranium Blue & Crimson Glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/40 text-xs font-mono text-blue-300">
            <Shield className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>STRATEGIC TACTICAL DOSSIER // CAPTAIN AMERICA INITIATIVE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Orbitron'] text-white tracking-wide">
            INTELLIGENCE, RESILIENCE & MISSION ETHOS
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-['Rajdhani'] leading-relaxed">
            "I can do this all day." Driven by relentless curiosity, ethical engineering, and an unshakeable commitment to real-world AI impact.
          </p>
        </div>

        {/* 2-Column Section: Left = 3D Vibranium Shield Canvas, Right = Tactical Dossier Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 3D Interactive Vibranium Shield */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full glass-panel rounded-3xl p-4 border border-blue-500/30 shadow-[0_0_50px_rgba(46,134,222,0.2)]">
              <Suspense fallback={<Hero3DFallback type="shield" />}>
                <VibraniumShieldCanvas />
              </Suspense>
              <div className="text-center text-[11px] font-mono text-slate-400 mt-2">
                DEFENSIVE ARCHITECTURE • UNBREAKABLE DETERMINATION
              </div>
            </div>
          </div>

          {/* Right: Tactical Dossier & Verified Bio */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* The Verified Bio Quote Box */}
            <div className="glass-panel p-6 sm:p-7 rounded-2xl border-2 border-cyan-500/40 relative">
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                VERIFIED BIOGRAPHICAL RECORD
              </div>
              
              <blockquote className="text-base sm:text-lg text-slate-100 font-['Rajdhani'] font-semibold leading-relaxed border-l-4 border-cyan-400 pl-4 py-1 italic">
                "{personalInfo.bio}"
              </blockquote>

              <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <span className="text-slate-400">STATUS: ACTIVE IN RESEARCH</span>
                <span className="text-emerald-400 font-bold">● S.H.I.E.L.D. CLEARANCE: LEVEL 8</span>
              </div>
            </div>

            {/* Strategic Pillars (Education, Interests, Career Goals) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Education */}
              <div className="glass-panel p-5 rounded-xl border border-blue-500/20 hover:border-blue-400/50 transition-all">
                <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-500/40 flex items-center justify-center mb-3">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                </div>
                <h4 className="text-xs font-mono uppercase text-slate-400">EDUCATION</h4>
                <div className="text-sm font-['Orbitron'] font-bold text-white mt-1">
                  B.E. Computer Science
                </div>
                <p className="text-xs text-slate-300 font-mono mt-1">
                  Specialization in Artificial Intelligence & Data Science foundations.
                </p>
              </div>

              {/* Interests */}
              <div className="glass-panel p-5 rounded-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center mb-3">
                  <Compass className="w-4 h-4 text-cyan-400" />
                </div>
                <h4 className="text-xs font-mono uppercase text-slate-400">INTERESTS</h4>
                <div className="text-sm font-['Orbitron'] font-bold text-white mt-1">
                  Applied Intelligence
                </div>
                <p className="text-xs text-slate-300 font-mono mt-1">
                  Geospatial climate AI, automated EDA, speech-vision multimodal processing.
                </p>
              </div>

              {/* Career Goals */}
              <div className="glass-panel p-5 rounded-xl border border-red-500/20 hover:border-red-400/50 transition-all">
                <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center mb-3">
                  <Target className="w-4 h-4 text-red-400" />
                </div>
                <h4 className="text-xs font-mono uppercase text-slate-400">CAREER GOALS</h4>
                <div className="text-sm font-['Orbitron'] font-bold text-white mt-1">
                  AI / Data Science
                </div>
                <p className="text-xs text-slate-300 font-mono mt-1">
                  Building high-impact production ML systems that solve mission-critical data bottlenecks.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { timelineData } from '../../data/portfolioData';
import { soundEngine } from '../ui/AudioController';
import { Clock, CheckCircle2, Award, Calendar, BookOpen, Shield } from 'lucide-react';

export default function TimelineSection() {
  const [filter, setFilter] = useState('ALL');

  const filteredData = filter === 'ALL'
    ? timelineData
    : timelineData.filter((item) => item.category.toUpperCase().includes(filter));

  return (
    <section id="timeline" className="relative py-28 bg-[#040714] overflow-hidden border-t border-cyan-900/40">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono text-cyan-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>AVENGERS OPERATIONS LOG // VERIFIED TIMELINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Orbitron'] text-white tracking-wide">
            EXPERIENCE & MILESTONE ARCHIVES
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-['Rajdhani'] leading-relaxed">
            Verified chronological records of education, project milestones, and engineering deployments.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {['ALL', 'ACADEMIC', 'PROJECT', 'INITIATIVE'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  soundEngine.playHudClick();
                  setFilter(tab);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                  filter === tab
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-32 space-y-12">
          {filteredData.map((item, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-10 group">
              
              {/* Timeline Node Point (Glowing Arc Reactor Dot) */}
              <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-[#030712] border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 group-hover:shadow-[0_0_15px_#00f0ff] transition-all">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>

              {/* Year Stamp on Desktop (Left of line) */}
              <div className="hidden sm:block absolute -left-36 top-1 text-right w-28 text-xs font-mono font-bold text-cyan-400">
                {item.year}
              </div>

              {/* Card Body */}
              <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 group-hover:border-cyan-400/60 transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.08)]">
                
                {/* Year Stamp for Mobile */}
                <div className="sm:hidden text-xs font-mono font-bold text-cyan-400 mb-2">
                  {item.year}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg sm:text-xl font-bold font-['Orbitron'] text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-500/30">
                    {item.heroBadge}
                  </span>
                </div>

                <div className="text-xs font-mono text-amber-400 mb-3">
                  {item.subtitle}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-['Inter'] leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">{item.category}</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {item.status}
                  </span>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

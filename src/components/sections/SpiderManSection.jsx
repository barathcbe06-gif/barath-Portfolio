import React, { useState } from 'react';
import { skillsData } from '../../data/portfolioData';
import SpiderWebCanvas from '../3d/SpiderWebCanvas';
import { soundEngine } from '../ui/AudioController';
import { Bug, CheckCircle, Zap, Shield, Sparkles } from 'lucide-react';

export default function SpiderManSection() {
  const [selectedSkill, setSelectedSkill] = useState(skillsData[0]);

  const handleSelect = (skill) => {
    soundEngine.playHologramChime();
    setSelectedSkill(skill);
  };

  return (
    <section id="skills" className="relative py-28 bg-[#030612] overflow-hidden border-t border-red-950/40">
      
      {/* Spider-Man Crimson & Cyan Ambient Lighting */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-xs font-mono text-red-300 shadow-[0_0_15px_rgba(230,36,41,0.25)]">
            <Bug className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>SYNAPTIC NANO-WEB MATRIX // SPIDER-MAN INITIATIVE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Orbitron'] text-white tracking-wide">
            INTERCONNECTED SKILLS & TECHNOLOGIES
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-['Rajdhani'] leading-relaxed">
            "With great data comes great responsibility." 
            Drag the neural tech nodes to interact with the elastic web lattice or select any skill to inspect architectural proficiencies.
          </p>
        </div>

        {/* 2-Column: Left = Interactive Spider Web Canvas, Right = Deep Skill Telemetry Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Physics Web */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-3 sm:p-5 rounded-3xl border border-red-500/30 relative shadow-[0_0_40px_rgba(230,36,41,0.15)]">
              <SpiderWebCanvas onSelectSkill={handleSelect} />
            </div>
          </div>

          {/* Right: Selected Skill Detail Dossier */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Quick Skill Selector Pills */}
            <div className="flex flex-wrap gap-1.5">
              {skillsData.map((skill) => {
                const isSelected = selectedSkill.name === skill.name;
                return (
                  <button
                    key={skill.name}
                    onClick={() => handleSelect(skill)}
                    className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                      isSelected
                        ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.6)]'
                        : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {skill.name}
                  </button>
                );
              })}
            </div>

            {/* Selected Skill Card */}
            <div className="glass-panel p-6 sm:p-7 rounded-2xl border-2 border-cyan-500/40 relative space-y-5 shadow-[0_0_35px_rgba(0,240,255,0.15)]">
              
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 block uppercase">
                    {selectedSkill.category}
                  </span>
                  <h3 className="text-2xl font-bold font-['Orbitron'] text-white mt-0.5">
                    {selectedSkill.name}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block">PROFICIENCY</span>
                  <span className="text-xl font-bold font-['Orbitron'] text-cyan-300">
                    {selectedSkill.proficiency}%
                  </span>
                </div>
              </div>

              {/* Superhero Analogy Pill */}
              <div className="p-3 bg-red-950/30 border border-red-500/30 rounded-xl flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-red-400 flex-shrink-0" />
                <div>
                  <div className="text-[10px] font-mono text-red-300 uppercase">SUPERHERO TACTICAL ANALOGY</div>
                  <div className="text-xs font-mono font-semibold text-white">{selectedSkill.heroRole}</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                {selectedSkill.description}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>TELEMETRY BENCHMARK</span>
                  <span className="text-cyan-400 font-bold">{selectedSkill.proficiency}% MASTERY</span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${selectedSkill.proficiency}%` }}
                  />
                </div>
              </div>

              {/* Tool Arsenal */}
              <div>
                <span className="text-[11px] font-mono text-slate-400 block mb-2">DEPLOYED TOOLS & FRAMEWORKS:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSkill.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded bg-black/60 border border-slate-800 text-[11px] font-mono text-cyan-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

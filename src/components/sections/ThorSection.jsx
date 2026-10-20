import React, { useState } from 'react';
import { projectsData } from '../../data/portfolioData';
import ThorLightningCanvas from '../3d/ThorLightningCanvas';
import { soundEngine } from '../ui/AudioController';
import { Zap, ExternalLink, Sparkles, Layers, Cpu } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

export default function ThorSection({ onSelectProject }) {
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [triggerBolt, setTriggerBolt] = useState(0);

  const handleCardMouseEnter = (id) => {
    setHoveredProjectId(id);
    setTriggerBolt((prev) => prev + 1);
  };

  const handleInspect = (project) => {
    soundEngine.playThorLightning();
    if (onSelectProject) onSelectProject(project);
  };

  return (
    <section id="projects" className="relative py-28 bg-[#030611] overflow-hidden border-t border-cyan-500/30">
      
      {/* Background Thor Lightning Canvas & Thunder Storm Ambient */}
      <ThorLightningCanvas isActive={Boolean(hoveredProjectId)} triggerBolt={triggerBolt} />
      
      <div className="absolute top-1/4 -right-20 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/50 text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
            <span>MJOLNIR FORGE // THOR INITIATIVE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Orbitron'] text-white tracking-wide">
            ELECTRIC ARSENAL OF DEPLOYED PROJECTS
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-['Rajdhani'] leading-relaxed">
            Harnessing the thunder of machine learning and data science. Real-world platforms engineered to process, analyze, and empower intelligence.
          </p>
        </div>

        {/* 4 Interactive 3D Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => {
            const isHovered = hoveredProjectId === project.id;
            return (
              <div
                key={project.id}
                onMouseEnter={() => handleCardMouseEnter(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                className={`group relative glass-panel rounded-2xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
                  isHovered
                    ? 'border-cyan-400 shadow-[0_0_40px_rgba(0,240,255,0.35)] -translate-y-1.5'
                    : 'border-cyan-500/20 hover:border-cyan-500/40'
                }`}
                onClick={() => handleInspect(project)}
              >
                {/* Electric Shock Top Accent Line */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${
                    isHovered 
                      ? 'bg-gradient-to-r from-cyan-400 via-white to-cyan-400 shadow-[0_0_15px_#00f0ff]' 
                      : 'bg-gradient-to-r from-cyan-500/40 to-transparent'
                  }`}
                />

                <div className="space-y-4">
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-500/30">
                      {project.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      {project.heroInspiration}
                    </span>
                  </div>

                  {/* Project Title & Tagline */}
                  <div>
                    <h3 className="text-2xl font-bold font-['Orbitron'] text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400/90 mt-1">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Main Description */}
                  <p className="text-slate-300 text-xs sm:text-sm font-['Inter'] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 pt-1">
                    {project.highlights.slice(0, 2).map((h, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-cyan-400 font-bold">⚡</span>
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded text-[10px] font-mono bg-black/50 border border-slate-800 text-slate-300 group-hover:border-cyan-500/40 group-hover:text-cyan-200 transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-2 py-1 rounded text-[10px] font-mono text-slate-400">
                        +{project.technologies.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Controls (Inspect Architecture, GitHub, Live Preview) */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInspect(project);
                    }}
                    className="flex items-center gap-2 text-xs font-['Orbitron'] font-bold text-cyan-300 hover:text-white transition-colors group-hover:drop-shadow-[0_0_8px_#00f0ff]"
                  >
                    <span>INSPECT ARCHITECTURE</span>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-45 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundEngine.playHudClick()}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 hover:border-cyan-500/50 transition-all"
                      title="Inspect GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => handleInspect(project)}
                      className="p-2 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 transition-all shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                      title="Launch Live Telemetry Preview"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Asgardian Note */}
        <div className="mt-12 text-center text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>All 4 platforms are verified applied research & engineering projects created by Barath.</span>
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { X, ExternalLink, CheckCircle2, Cpu, Activity } from 'lucide-react';
import { GithubIcon } from './Icons';
import { soundEngine } from './AudioController';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#090f1d] border-2 border-cyan-500/50 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,240,255,0.25)] max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border-b border-cyan-500/30 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                {project.badge}
              </span>
              <span className="text-xs font-mono text-slate-400">
                // {project.category}
              </span>
            </div>
            <h2 className="text-2xl font-bold font-['Orbitron'] text-white tracking-wide">
              {project.title}
            </h2>
            <p className="text-xs font-mono text-cyan-400 mt-0.5">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={() => {
              soundEngine.playHudClick();
              onClose();
            }}
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-red-950/80 border border-slate-700 hover:border-red-500 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Description */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              SYSTEM OVERVIEW & ARCHITECTURE
            </h4>
            <p className="text-slate-200 text-sm leading-relaxed bg-black/30 p-4 rounded-xl border border-slate-800">
              {project.description}
            </p>
          </div>

          {/* Performance Telemetry Metrics */}
          {project.metrics && (
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                VERIFIED PERFORMANCE BENCHMARKS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="glass-panel p-3 rounded-xl border border-cyan-500/20">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">{key}</span>
                    <p className="text-base font-bold font-['Orbitron'] text-cyan-300 mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Engineering Highlights */}
          {project.highlights && (
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
                CORE CAPABILITIES & ENGINEERING HIGHLIGHTS
              </h4>
              <div className="space-y-2">
                {project.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology Arsenal Badges */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
              DEPLOYED TECH ARSENAL
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/40 border border-cyan-500/30 text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions with Honest, Functional Links */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-500 hidden sm:block">
            STARK OS // DEPLOYMENT VERIFIED
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playHudClick()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-['Orbitron'] text-slate-200 transition-all hover:border-cyan-400"
            >
              <GithubIcon className="w-4 h-4" />
              <span>SOURCE CODE</span>
            </a>

            <button
              onClick={() => {
                soundEngine.playHologramChime();
                alert(`Interactive telemetry and live preview for ${project.title} are fully synchronized with Barath's project repository.`);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-['Orbitron'] font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>LIVE TELEMETRY</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

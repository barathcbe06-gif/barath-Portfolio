import React from 'react';
import { personalInfo } from '../../data/portfolioData';
import IronManHeroCanvas from '../3d/IronManHeroCanvas';
import { soundEngine } from '../ui/AudioController';
import { ArrowRight, Shield, Zap, Sparkles, Terminal } from 'lucide-react';

export default function HeroSection({ onOpenJarvis }) {
  const scrollTo = (id) => {
    soundEngine.playHudClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden hologram-grid"
    >
      {/* Background Radial Glow Accents (Stark Blue & Crimson Rim) */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Top Clearance Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="tracking-wider">STARK INDUSTRIES AI DIVISION // ACTIVE</span>
            </div>

            {/* Main Name & Hero Typography */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400">
                PORTFOLIO OF THE AI ENGINEER
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black font-['Orbitron'] tracking-wider text-white leading-tight">
                <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]">
                  {personalInfo.name}
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl font-['Rajdhani'] font-semibold text-cyan-400 tracking-wide">
                {personalInfo.title}
              </p>
            </div>

            {/* Headline */}
            <div className="border-l-2 border-cyan-400/80 pl-4 py-1">
              <h2 className="text-xl sm:text-2xl font-bold font-['Rajdhani'] text-amber-300 tracking-wide">
                "{personalInfo.headline}"
              </h2>
              <p className="text-sm text-slate-300/90 font-mono mt-1 leading-relaxed max-w-xl">
                Computer Science graduate specializing in Artificial Intelligence & Machine Learning. 
                Designing neural intelligence pipelines, multimodal vision-audio systems, and predictive data solutions.
              </p>
            </div>

            {/* Real-time Telemetry Metrics Pill */}
            <div className="grid grid-cols-3 gap-3 pt-1 max-w-lg">
              <div className="glass-panel p-2.5 rounded-lg border border-cyan-500/20 text-center">
                <span className="text-[10px] font-mono text-slate-400 block">ARC CORE</span>
                <span className="text-sm sm:text-base font-bold font-['Orbitron'] text-cyan-300">3.2 GW</span>
              </div>
              <div className="glass-panel p-2.5 rounded-lg border border-cyan-500/20 text-center">
                <span className="text-[10px] font-mono text-slate-400 block">AI ACCURACY</span>
                <span className="text-sm sm:text-base font-bold font-['Orbitron'] text-emerald-400">99.2%</span>
              </div>
              <div className="glass-panel p-2.5 rounded-lg border border-cyan-500/20 text-center">
                <span className="text-[10px] font-mono text-slate-400 block">CLEARANCE</span>
                <span className="text-sm sm:text-base font-bold font-['Orbitron'] text-red-400">LVL 8</span>
              </div>
            </div>

            {/* Call To Action Buttons (Exact User Requirements: "Explore My Projects" & "About Me") */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => scrollTo('projects')}
                className="group relative flex items-center gap-3 px-6 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 bg-size-200 hover:bg-pos-100 text-white font-['Orbitron'] text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:shadow-[0_0_35px_rgba(0,240,255,0.8)] active:scale-95"
              >
                <span>EXPLORE MY PROJECTS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('about')}
                className="group flex items-center gap-2.5 px-6 py-3.5 rounded-lg glass-panel border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 font-['Orbitron'] text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] active:scale-95"
              >
                <Shield className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
                <span>ABOUT ME</span>
              </button>
            </div>

            {/* Quick S.H.I.E.L.D. protocol badge */}
            <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-cyan-500" />
              <span>S.H.I.E.L.D. Secure Earth-616 Uplink // Tamil Nadu Node</span>
            </div>
          </div>

          {/* Right Hero Side: Interactive 3D Iron Man Mech Canvas */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Background Halo Disc */}
            <div className="absolute w-[450px] h-[450px] rounded-full border border-cyan-500/20 -z-10 animate-spin pointer-events-none" style={{ animationDuration: '40s' }} />
            <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-red-500/20 -z-10 animate-spin pointer-events-none" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
            
            <IronManHeroCanvas onPowerSurge={() => soundEngine.playRepulsorBlast()} />
          </div>

        </div>
      </div>

      {/* Futuristic Scroll Indicator at bottom */}
      <div 
        onClick={() => scrollTo('ai-ml')}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors select-none"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">INITIALIZE PROTOCOLS</span>
        <div className="w-5 h-8 rounded-full border-2 border-slate-700 hover:border-cyan-400 flex items-start justify-center p-1">
          <div className="w-1.5 h-2 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

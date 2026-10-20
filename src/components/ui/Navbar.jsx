import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Shield, Cpu, Zap, Activity } from 'lucide-react';
import { soundEngine } from './AudioController';

export default function Navbar({ onOpenJarvis }) {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 50;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));

          const sections = ['hero', 'ai-ml', 'data-science', 'projects', 'about', 'skills', 'timeline', 'contact'];
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 250) {
                setActiveSection((prev) => (prev !== sections[i] ? sections[i] : prev));
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = soundEngine.toggleSound();
    setIsAudioEnabled(newState);
  };

  const navLinks = [
    { id: 'hero', label: 'HERO', icon: Cpu },
    { id: 'ai-ml', label: 'AI & ML', icon: Zap },
    { id: 'data-science', label: 'MYSTIC DATA', icon: Activity },
    { id: 'projects', label: 'PROJECTS', icon: Zap },
    { id: 'about', label: 'ABOUT', icon: Shield },
    { id: 'skills', label: 'SKILLS', icon: Cpu },
    { id: 'timeline', label: 'TIMELINE', icon: Activity },
    { id: 'contact', label: 'UPLINK', icon: Zap },
  ];

  const handleNavClick = (id) => {
    soundEngine.playHudClick();
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#030712]/90 backdrop-blur-md border-b border-cyan-500/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand / Stark Arc Reactor Logo */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
          className="group flex items-center gap-3 select-none"
        >
          {/* Animated Mini Arc Reactor Icon */}
          <div className="relative w-9 h-9 rounded-full flex items-center justify-center bg-cyan-950/60 border border-cyan-400 group-hover:border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] transition-all">
            <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f0ff]" />
            <div className="absolute inset-0 rounded-full border border-dashed border-cyan-300/60 animate-spin" style={{ animationDuration: '8s' }} />
          </div>

          <div>
            <div className="font-extrabold tracking-widest text-lg font-['Orbitron'] bg-gradient-to-r from-cyan-400 via-white to-amber-400 bg-clip-text text-transparent">
              BARATH
            </div>
            <div className="text-[10px] font-mono tracking-wider text-cyan-400/80 -mt-1 hidden sm:block">
              STARK AI // LEVEL 8
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800/80">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-1 text-xs font-['Orbitron'] tracking-wider rounded-full transition-all relative ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-950/70 shadow-[0_0_12px_rgba(0,240,255,0.4)] border border-cyan-500/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Bar (Audio Equalizer + JARVIS HUD + Mobile Hamburger) */}
        <div className="flex items-center gap-3">
          
          {/* JARVIS Telemetry Trigger */}
          <button
            onClick={() => {
              soundEngine.playHologramChime();
              if (onOpenJarvis) onOpenJarvis();
            }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md glass-panel border border-cyan-500/40 hover:border-cyan-400 text-xs font-mono text-cyan-300 transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] active:scale-95"
            title="Launch JARVIS AI Diagnostic Telemetry"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="tracking-wider">JARVIS HUD</span>
          </button>

          {/* Sound Synthesizer Equalizer Toggle */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-mono transition-all ${
              isAudioEnabled
                ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-500'
            }`}
            title={isAudioEnabled ? "Mute Avengers Soundscape" : "Enable Authentic Marvel Sci-Fi Sound FX"}
          >
            {isAudioEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-1 bg-cyan-400 animate-bounce" style={{ height: '80%', animationDelay: '0ms' }} />
                  <span className="w-1 bg-cyan-400 animate-bounce" style={{ height: '100%', animationDelay: '150ms' }} />
                  <span className="w-1 bg-cyan-400 animate-bounce" style={{ height: '60%', animationDelay: '300ms' }} />
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden md:inline">AUDIO FX</span>
              </>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-md bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#030712]/95 backdrop-blur-xl border-b border-cyan-500/30 px-6 py-5 mt-3 space-y-2 animate-fadeIn">
          <div className="text-[11px] font-mono text-cyan-400/70 border-b border-cyan-900/50 pb-2 mb-3">
            AVENGERS PROTOCOL // TACTICAL NAVIGATION
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-['Orbitron'] text-slate-200 hover:text-cyan-300 hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/30 transition-all text-left"
            >
              <span>{link.label}</span>
              <link.icon className="w-4 h-4 text-cyan-400" />
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-400 font-mono">JARVIS Telemetry:</span>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenJarvis) onOpenJarvis();
              }}
              className="px-3 py-1 bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 rounded text-xs font-mono"
            >
              LAUNCH HUD
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

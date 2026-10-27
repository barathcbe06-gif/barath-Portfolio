import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TechStackSection } from './components/TechStackSection';
import { ProjectsSection } from './components/ProjectsSection';
import { GitHubTelemetrySection } from './components/GitHubTelemetrySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CyberCursor } from './components/CyberCursor';

export function App() {
  const [lowQuality, setLowQuality] = useState(false);

  const handleSummonLightning = () => {
    window.dispatchEvent(new CustomEvent('thor:summon-lightning'));
  };

  const handleToggleQuality = () => {
    setLowQuality((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-200">
      {/* Custom Targeting Crosshair Cursor */}
      <CyberCursor />

      {/* Futuristic HUD Navigation */}
      <Navbar
        lowQuality={lowQuality}
        onToggleQuality={handleToggleQuality}
        onSummonLightning={handleSummonLightning}
      />

      {/* Main Content Sections */}
      <main>
        {/* 01: Hero with Real-Time 3D Thor & Mjölnir Experience */}
        <Hero
          lowQuality={lowQuality}
          onSummonLightning={handleSummonLightning}
        />

        {/* 02: About Me // The Person Behind The Thunder */}
        <AboutSection />

        {/* 03: System / Technology // Animated LED Bars & Holographic Radar */}
        <TechStackSection />

        {/* 04: My Missions // Real Verified Repositories & 3D Cards */}
        <ProjectsSection />

        {/* 05: GitHub Telemetry // Real Stats & Harmonic Oscilloscope Waveforms */}
        <GitHubTelemetrySection />

        {/* 06: Transmit // Ready to Build Something Extraordinary? */}
        <ContactSection />
      </main>

      {/* Footer with Norse Runes and Asgardian Coordinates */}
      <Footer />
    </div>
  );
}

export default App;

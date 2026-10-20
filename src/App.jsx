import React, { useState } from 'react';
import Navbar from './components/ui/Navbar';
import ParticleBackground from './components/ui/ParticleBackground';
import JarvisVoiceHUD from './components/ui/JarvisVoiceHUD';
import ProjectModal from './components/ui/ProjectModal';

import HeroSection from './components/sections/HeroSection';
import IronManSection from './components/sections/IronManSection';
import DoctorStrangeSection from './components/sections/DoctorStrangeSection';
import ThorSection from './components/sections/ThorSection';
import CaptainAmericaSection from './components/sections/CaptainAmericaSection';
import SpiderManSection from './components/sections/SpiderManSection';
import TimelineSection from './components/sections/TimelineSection';
import ContactSection from './components/sections/ContactSection';

function App() {
  const [isJarvisOpen, setIsJarvisOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Background Star & Arc Particle Field */}
      <ParticleBackground />

      {/* Futuristic Stark HUD Top Navigation */}
      <Navbar onOpenJarvis={() => setIsJarvisOpen(true)} />

      {/* Main Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section (Iron Man Armored Hero Canvas, Arc Reactor, Headline) */}
        <HeroSection onOpenJarvis={() => setIsJarvisOpen(true)} />

        {/* 2. Iron Man AI & Machine Learning Section */}
        <IronManSection />

        {/* 3. Doctor Strange Data Science Section (Mystic Rings Canvas) */}
        <DoctorStrangeSection />

        {/* 4. Thor Projects Section (DataLens AI, TerraMind AI, Presentation Evaluator, Placement IQ) */}
        <ThorSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* 5. Captain America About Me Section (Vibranium Shield Canvas) */}
        <CaptainAmericaSection />

        {/* 6. Spider-Man Skills Section (Interactive Physics Web Canvas) */}
        <SpiderManSection />

        {/* 7. Experience & Achievements Timeline */}
        <TimelineSection />

        {/* 8. S.H.I.E.L.D. Secure Uplink & Contact Section */}
        <ContactSection />
      </main>

      {/* Modals */}
      <JarvisVoiceHUD
        isOpen={isJarvisOpen}
        onClose={() => setIsJarvisOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;

import React, { useState, useCallback, lazy, Suspense } from 'react';
import Navbar from './components/ui/Navbar';
import ParticleBackground from './components/ui/ParticleBackground';

import HeroSection from './components/sections/HeroSection';
import IronManSection from './components/sections/IronManSection';
import DoctorStrangeSection from './components/sections/DoctorStrangeSection';
import ThorSection from './components/sections/ThorSection';
import CaptainAmericaSection from './components/sections/CaptainAmericaSection';
import SpiderManSection from './components/sections/SpiderManSection';
import TimelineSection from './components/sections/TimelineSection';
import ContactSection from './components/sections/ContactSection';

// Lazy load dialog modals to keep initial bundle lean
const JarvisVoiceHUD = lazy(() => import('./components/ui/JarvisVoiceHUD'));
const ProjectModal = lazy(() => import('./components/ui/ProjectModal'));

function App() {
  const [isJarvisOpen, setIsJarvisOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenJarvis = useCallback(() => setIsJarvisOpen(true), []);
  const handleCloseJarvis = useCallback(() => setIsJarvisOpen(false), []);
  const handleSelectProject = useCallback((project) => setSelectedProject(project), []);
  const handleCloseProject = useCallback(() => setSelectedProject(null), []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Background Star & Arc Particle Field */}
      <ParticleBackground />

      {/* Futuristic Stark HUD Top Navigation */}
      <Navbar onOpenJarvis={handleOpenJarvis} />

      {/* Main Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section (Iron Man Armored Hero Canvas, Arc Reactor, Headline) */}
        <HeroSection onOpenJarvis={handleOpenJarvis} />

        {/* 2. Iron Man AI & Machine Learning Section */}
        <IronManSection />

        {/* 3. Doctor Strange Data Science Section (Mystic Rings Canvas) */}
        <DoctorStrangeSection />

        {/* 4. Thor Projects Section (DataLens AI, TerraMind AI, Presentation Evaluator, Placement IQ) */}
        <ThorSection onSelectProject={handleSelectProject} />

        {/* 5. Captain America About Me Section (Vibranium Shield Canvas) */}
        <CaptainAmericaSection />

        {/* 6. Spider-Man Skills Section (Interactive Physics Web Canvas) */}
        <SpiderManSection />

        {/* 7. Experience & Achievements Timeline */}
        <TimelineSection />

        {/* 8. S.H.I.E.L.D. Secure Uplink & Contact Section */}
        <ContactSection />
      </main>

      {/* Modals - rendered only when triggered and wrapped with Suspense */}
      {isJarvisOpen && (
        <Suspense fallback={null}>
          <JarvisVoiceHUD
            isOpen={isJarvisOpen}
            onClose={handleCloseJarvis}
          />
        </Suspense>
      )}

      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            onClose={handleCloseProject}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;

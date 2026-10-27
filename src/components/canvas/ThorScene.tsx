import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { MjolnirHammer } from './MjolnirHammer';
import { ThorWarrior } from './ThorWarrior';
import { LightningStorm, LightningHandle } from './LightningStorm';
import { VolumetricClouds } from './VolumetricClouds';
import { Sparkles } from '@react-three/drei';

interface ThorSceneProps {
  onLightningTrigger?: () => void;
  lowQuality?: boolean;
}

export const ThorScene: React.FC<ThorSceneProps> = ({ onLightningTrigger, lowQuality = false }) => {
  const lightningRef = useRef<LightningHandle>(null);
  const [isStriking, setIsStriking] = useState(false);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebglSupported(Boolean(gl));
    } catch {
      setWebglSupported(false);
    }
  }, []);

  const triggerStrike = () => {
    setIsStriking(true);
    if (lightningRef.current) {
      lightningRef.current.strike();
    }
    if (onLightningTrigger) {
      onLightningTrigger();
    }
    setTimeout(() => {
      setIsStriking(false);
    }, 400);
  };

  // Expose global strike summoner
  useEffect(() => {
    const handleGlobalSummon = () => triggerStrike();
    window.addEventListener('thor:summon-lightning', handleGlobalSummon);
    return () => window.removeEventListener('thor:summon-lightning', handleGlobalSummon);
  }, []);

  if (webglSupported === false) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-950 p-6 text-center text-cyan-400">
        <div className="font-hud text-lg mb-2">⚡ ASGARDIAN SYSTEM NOTICE</div>
        <p className="text-sm text-gray-400 max-w-md">
          Hardware WebGL acceleration unavailable in this display mode. Running tactical telemetry and high-performance profile view.
        </p>
      </div>
    );
  }

  return (
    <div 
      className={`relative w-full h-full select-none transition-all duration-150 ${
        isFlashActive ? 'filter brightness-125' : ''
      }`}
      onClick={triggerStrike}
      title="Click anywhere to summon Asgardian Lightning"
    >
      {/* Screen flash overlay */}
      <div 
        className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-100 ${
          isFlashActive ? 'bg-cyan-200/20 opacity-100' : 'opacity-0'
        }`} 
      />

      {/* Screen Shake Container */}
      <div className={`w-full h-full ${isStriking ? 'animate-pulse' : ''}`}>
        <Canvas
          shadows
          camera={{ position: [0, 0.4, 4.6], fov: 46 }}
          gl={{
            antialias: !lowQuality,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ width: '100%', height: '100%' }}
        >
          {/* ================= LIGHTING SETUP ================= */}
          {/* Deep ambient dark blue lighting */}
          <ambientLight intensity={0.4} color="#0d1b33" />

          {/* Main Key Rim Light from top-left storm */}
          <directionalLight
            position={[-4, 6, 2]}
            intensity={1.2}
            color="#38bdf8"
            castShadow={!lowQuality}
            shadow-mapSize={[1024, 1024]}
          />

          {/* Fill Light from right for metallic reflections */}
          <directionalLight
            position={[4, -2, 2]}
            intensity={0.6}
            color="#1e293b"
          />

          {/* Bottom ground bounce */}
          <pointLight
            position={[0, -3, 2]}
            intensity={0.8}
            color="#0284c7"
            distance={10}
          />

          {/* ================= ATMOSPHERE & PARTICLES ================= */}
          <VolumetricClouds lowQuality={lowQuality} />
          <Sparkles
            count={lowQuality ? 40 : 100}
            scale={[8, 6, 6]}
            size={lowQuality ? 2 : 3}
            speed={0.4}
            color="#38bdf8"
          />

          {/* ================= 3D HERO WARRIOR & MJÖLNIR ================= */}
          <ThorWarrior isStriking={isStriking} />
          <MjolnirHammer onStrike={triggerStrike} isStriking={isStriking} />

          {/* ================= PROCEDURAL LIGHTNING STORM ================= */}
          <LightningStorm
            ref={lightningRef}
            onFlash={(active) => setIsFlashActive(active)}
          />
        </Canvas>
      </div>

      {/* Interactive Helper Prompt */}
      <div 
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          right: '1.5rem',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)',
          color: 'rgba(56, 189, 248, 0.75)',
          background: 'rgba(7, 12, 24, 0.65)',
          padding: '0.35rem 0.75rem',
          borderRadius: '4px',
          border: '1px solid rgba(56, 189, 248, 0.2)',
          pointerEvents: 'none'
        }}
      >
        <span style={{ color: '#00f0ff' }}>⚡</span>
        <span>INTERACTIVE: CLICK TO SUMMON THUNDER</span>
      </div>
    </div>
  );
};

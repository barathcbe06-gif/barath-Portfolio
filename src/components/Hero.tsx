import React, { useEffect, useState } from 'react';
import { ArrowDown, Zap, Terminal, Code2, Sparkles, Database, Layers } from 'lucide-react';
import { ThorScene } from './canvas/ThorScene';
import { SoundToggle } from './SoundToggle';
import { sound } from '../utils/audio';

interface HeroProps {
  lowQuality: boolean;
  onSummonLightning: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lowQuality, onSummonLightning }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '68px',
        overflow: 'hidden',
      }}
    >
      {/* ================= 3D CANVAS BACKGROUND ================= */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <ThorScene lowQuality={lowQuality} />
      </div>

      {/* Atmospheric gradient vignetting to seamlessly merge 3D canvas with content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `
            radial-gradient(circle at 75% 45%, transparent 20%, rgba(3, 7, 18, 0.45) 60%, rgba(3, 7, 18, 0.95) 90%),
            linear-gradient(180deg, rgba(3, 7, 18, 0.3) 0%, transparent 40%, rgba(3, 7, 18, 0.85) 85%, #030712 100%)
          `,
          zIndex: 1,
        }}
      />

      {/* Glowing horizontal light beam divider (matching video intro frame 00:02-00:03!) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '1400px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.8) 50%, transparent 100%)',
          boxShadow: '0 0 15px rgba(0, 240, 255, 0.6)',
          pointerEvents: 'none',
          opacity: 0.35,
          zIndex: 2,
        }}
      />

      {/* ================= HERO CONTENT OVERLAY ================= */}
      <div
        className="max-w-content"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          pointerEvents: 'none', // Allow clicking through to 3D canvas except on interactive elements
        }}
      >
        <div style={{ maxWidth: '680px' }}>
          {/* Eyebrow Status Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(15, 28, 56, 0.75)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              padding: '0.35rem 0.85rem',
              borderRadius: '20px',
              marginBottom: '1.25rem',
              pointerEvents: 'auto',
            }}
          >
            <Zap size={14} className="text-cyan-400" />
            <span
              style={{
                fontFamily: 'var(--font-hud)',
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                color: '#38bdf8',
                fontWeight: 700,
              }}
            >
              NORSENET V2.4 // ASGARDIAN PROTOCOL
            </span>
          </div>

          {/* Main Title: BARATH (Matching Video Big Typography) */}
          <h1
            style={{
              fontFamily: 'var(--font-mythic)',
              fontSize: 'clamp(2.8rem, 7vw, 5.8rem)',
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: '0.04em',
              color: '#ffffff',
              textShadow: '0 0 30px rgba(56, 189, 248, 0.45)',
              marginBottom: '0.85rem',
            }}
          >
            BARATH
          </h1>

          {/* Subtitle with Glowing Cyan Accent */}
          <div
            style={{
              fontFamily: 'var(--font-hud)',
              fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#38bdf8',
              textShadow: '0 0 16px rgba(0, 240, 255, 0.5)',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              flexWrap: 'wrap',
            }}
          >
            <span>DATA SCIENTIST</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
            <span>MACHINE LEARNING</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
            <span style={{ color: '#ffffff' }}>AI ARCHITECT</span>
          </div>

          {/* Bio Description */}
          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(203, 213, 225, 0.85)',
              lineHeight: 1.7,
              marginBottom: '2rem',
              maxWidth: '560px',
            }}
          >
            Forging high-performance predictive intelligence, machine learning pipelines, and environmental AI architectures. Channeling the thunderous precision of raw data into practical, battle-tested solutions.
          </p>

          {/* Call-to-Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              pointerEvents: 'auto',
            }}
          >
            <a
              href="#missions"
              className="btn-thor-primary"
              onClick={() => sound.playSelectClick()}
              onMouseEnter={() => sound.playHoverBlip()}
            >
              <Terminal size={17} />
              <span>EXPLORE MISSIONS</span>
            </a>

            <a
              href="#transmit"
              className="btn-thor-ghost"
              onClick={() => sound.playSelectClick()}
              onMouseEnter={() => sound.playHoverBlip()}
            >
              <Code2 size={17} />
              <span>CONTACT ME</span>
            </a>

            <button
              onClick={() => {
                sound.playPowerSurge();
                onSummonLightning();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                color: '#38bdf8',
                fontFamily: 'var(--font-hud)',
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '0.85rem 1.4rem',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              className="hover:border-cyan-300 hover:bg-sky-900/30"
              title="Summon Real-Time Thunder Bolt"
            >
              <Zap size={16} className="text-cyan-400" />
              <span>SUMMON THUNDER</span>
            </button>
          </div>

          {/* Real-time Telemetry Badges */}
          <div
            style={{
              display: 'flex',
              gap: '1.25rem',
              marginTop: '2.5rem',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'rgba(148, 163, 184, 0.85)',
              }}
            >
              <Database size={13} className="text-cyan-400" />
              <span>M.Sc Data Science</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'rgba(148, 163, 184, 0.85)',
              }}
            >
              <Layers size={13} className="text-emerald-400" />
              <span>7 Verified Repos</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'rgba(148, 163, 184, 0.85)',
              }}
            >
              <Sparkles size={13} className="text-amber-400" />
              <span>AI Crop & Risk Intelligence</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Bar: Sound Toggle & Scroll Indicator */}
      <div
        className="max-w-content"
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        {/* Bottom Left Sound Indicator (matching reference video!) */}
        <div>
          <SoundToggle />
        </div>

        {/* Scroll Indicator */}
        <a
          href="#origin"
          onClick={() => sound.playSelectClick()}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.35rem',
            color: 'rgba(148, 163, 184, 0.7)',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.15em',
            transition: 'all 0.2s ease',
          }}
          className="hover:text-cyan-400"
        >
          <span>SCROLL TO COMMENCE</span>
          <ArrowDown size={14} className="animate-bounce text-cyan-400" />
        </a>

        {/* Coordinates / Version Stamp */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'rgba(100, 116, 139, 0.8)',
            letterSpacing: '0.08em',
          }}
          className="hidden sm:block"
        >
          COORD: 11.0168° N, 76.9558° E // ASGARD
        </div>
      </div>
    </section>
  );
};

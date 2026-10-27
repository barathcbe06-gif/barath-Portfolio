import React from 'react';
import { ArrowUp, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playPowerSurge();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#02050e',
        borderTop: '1px solid rgba(56, 189, 248, 0.25)',
        paddingTop: '4rem',
        paddingBottom: '3.5rem',
      }}
    >
      <div className="max-w-content">
        {/* Runic Divider Line */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            color: 'rgba(56, 189, 248, 0.5)',
            fontFamily: 'serif',
            fontSize: '1.25rem',
            letterSpacing: '0.4em',
            marginBottom: '2.5rem',
          }}
        >
          <div style={{ height: '1px', flex: 1, background: 'rgba(56, 189, 248, 0.2)' }} />
          <span>ᚦ ᚢ ᚱ ᛁ ᛋ ᚨ ᛉ ᛏ ᛒ ᛖ ᛗ ᛚ</span>
          <div style={{ height: '1px', flex: 1, background: 'rgba(56, 189, 248, 0.2)' }} />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          {/* Logo & Identity */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '4px',
                  background: 'linear-gradient(135deg, #0284c7, #00f0ff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Zap size={16} color="#030712" />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-hud)',
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  color: '#ffffff',
                }}
              >
                BARATH
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'rgba(148, 163, 184, 0.8)',
                maxWidth: '400px',
              }}
            >
              God of Thunder & Code. Transforming raw data streams into predictive machine learning architectures.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['#origin', '#arsenal', '#missions', '#telemetry', '#transmit'].map((hash) => (
              <a
                key={hash}
                href={hash}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#cbd5e1',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
                className="hover:text-cyan-400"
                onClick={() => sound.playSelectClick()}
              >
                {hash.replace('#', '// ')}
              </a>
            ))}
          </div>

          {/* Return to Valhalla / Top Button */}
          <button
            onClick={scrollToTop}
            className="btn-thor-ghost interactive-target"
            style={{ fontSize: '0.75rem', padding: '0.6rem 1.1rem' }}
            title="Return to Asgard Summit"
          >
            <span>RETURN TO SUMMIT</span>
            <ArrowUp size={14} className="text-cyan-400" />
          </button>
        </div>

        {/* Bottom Sub-footer */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'rgba(100, 116, 139, 0.8)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Barath (barathcbe06-gif). All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Forged with React, Three.js & Asgardian Lightning</span>
            <span style={{ color: '#00f0ff' }}>⚡</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

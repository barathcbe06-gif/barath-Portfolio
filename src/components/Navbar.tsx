import React, { useState } from 'react';
import { Shield, Zap, Terminal, ExternalLink, Menu, X, Cpu } from 'lucide-react';
import { SoundToggle } from './SoundToggle';
import { sound } from '../utils/audio';

interface NavbarProps {
  lowQuality: boolean;
  onToggleQuality: () => void;
  onSummonLightning: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lowQuality,
  onToggleQuality,
  onSummonLightning,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '01 // ORIGIN', href: '#origin' },
    { label: '02 // ARSENAL', href: '#arsenal' },
    { label: '03 // MISSIONS', href: '#missions' },
    { label: '04 // TELEMETRY', href: '#telemetry' },
    { label: '05 // TRANSMIT', href: '#transmit' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    sound.playSelectClick();
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        background: 'rgba(7, 12, 24, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(56, 189, 248, 0.22)',
      }}
    >
      <div
        className="max-w-content"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
        }}
      >
        {/* ================= LEFT: SYS LOGO & STATUS ================= */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              textDecoration: 'none',
              color: '#ffffff',
            }}
            onClick={() => sound.playHoverBlip()}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '4px',
                background: 'linear-gradient(135deg, #0284c7, #00f0ff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(0, 240, 255, 0.5)',
              }}
            >
              <Zap size={18} color="#030712" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-hud)',
                  fontSize: '0.95rem',
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  color: '#ffffff',
                }}
              >
                BARATH
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'rgba(56, 189, 248, 0.85)',
                  letterSpacing: '0.08em',
                }}
              >
                SYS.ONLINE // THOR-3D
              </div>
            </div>
          </a>

          {/* Status Indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(15, 28, 56, 0.6)',
              padding: '0.2rem 0.6rem',
              borderRadius: '3px',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              fontSize: '0.68rem',
              fontFamily: 'var(--font-mono)',
              color: '#38bdf8',
            }}
            className="hidden md:flex"
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 8px #10b981',
              }}
            />
            <span>MJÖLNIR LINKED</span>
          </div>
        </div>

        {/* ================= CENTER: HUD SECTION NAVIGATION ================= */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
          }}
          className="hidden lg:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              onMouseEnter={() => sound.playHoverBlip()}
              style={{
                fontFamily: 'var(--font-hud)',
                fontSize: '0.74rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: 'rgba(203, 213, 225, 0.8)',
                textDecoration: 'none',
                padding: '0.4rem 0.6rem',
                borderRadius: '3px',
                transition: 'all 0.2s ease',
              }}
              className="hover:text-cyan-400 hover:bg-sky-950/40"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ================= RIGHT: ACTIONS & CONTROLS ================= */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Summon Lightning Button */}
          <button
            onClick={() => {
              sound.playPowerSurge();
              onSummonLightning();
            }}
            className="hidden sm:inline-flex"
            style={{
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(14, 165, 233, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              color: '#38bdf8',
              fontFamily: 'var(--font-hud)',
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '0.4rem 0.8rem',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            title="Summon Real-Time Thunder Bolt"
          >
            <Zap size={14} className="text-cyan-300 animate-bounce" />
            <span>SUMMON</span>
          </button>

          {/* Sound Toggle */}
          <div className="hidden sm:block">
            <SoundToggle />
          </div>

          {/* Quality Mode Toggle */}
          <button
            onClick={() => {
              sound.playSelectClick();
              onToggleQuality();
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: lowQuality ? 'rgba(245, 158, 11, 0.15)' : 'rgba(15, 28, 56, 0.7)',
              border: `1px solid ${lowQuality ? 'rgba(245, 158, 11, 0.4)' : 'rgba(56, 189, 248, 0.25)'}`,
              color: lowQuality ? '#fbbf24' : '#cbd5e1',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              padding: '0.4rem 0.65rem',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            title="Toggle Graphic Quality (High / Lite for lower GPU load)"
          >
            <Cpu size={13} />
            <span>{lowQuality ? 'LITE' : 'ULTRA'}</span>
          </button>

          {/* GitHub Verified Link */}
          <a
            href="https://github.com/barathcbe06-gif"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playSelectClick()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'rgba(2, 132, 199, 0.2)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              padding: '0.4rem 0.75rem',
              borderRadius: '4px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            className="hover:border-cyan-400 hover:shadow-cyan-glow"
          >
            <span>@barath</span>
            <ExternalLink size={12} />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-cyan-400"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'rgba(3, 7, 18, 0.98)',
            borderBottom: '1px solid rgba(56, 189, 248, 0.3)',
            padding: '1.25rem 1.5rem',
          }}
          className="lg:hidden flex flex-col gap-3"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              style={{
                fontFamily: 'var(--font-hud)',
                fontSize: '0.85rem',
                color: '#e2e8f0',
                textDecoration: 'none',
                padding: '0.6rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex items-center justify-between">
            <SoundToggle />
            <button
              onClick={() => {
                sound.playPowerSurge();
                onSummonLightning();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-mono text-cyan-400 border border-cyan-500/40 px-3 py-1.5 rounded"
            >
              ⚡ SUMMON LIGHTNING
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

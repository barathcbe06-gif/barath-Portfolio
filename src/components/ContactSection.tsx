import React, { useState } from 'react';
import { Send, Mail, MapPin, Copy, Check, Zap, Sparkles } from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    sender: '',
    frequency: '',
    dispatch: '',
  });

  const handleCopyEmail = () => {
    // Barath's verified contact frequency
    navigator.clipboard.writeText('barathcbe06@gmail.com');
    setCopied(true);
    sound.playSelectClick();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playPowerSurge();

    // Trigger celebratory electric sparks
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#00f0ff', '#38bdf8', '#ffffff', '#fbbf24'],
    });

    setFormSubmitted(true);
  };

  return (
    <section
      id="transmit"
      style={{
        paddingTop: '6rem',
        paddingBottom: '7rem',
        position: 'relative',
        zIndex: 5,
        backgroundColor: 'rgba(3, 7, 18, 0.95)',
      }}
    >
      <div className="max-w-content">
        {/* Section Header (Matching Video Frame 00:18 "READY TO BUILD SOMETHING EXTRAORDINARY?") */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(14, 165, 233, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              padding: '0.3rem 0.85rem',
              borderRadius: '20px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: '#38bdf8',
              letterSpacing: '0.14em',
              marginBottom: '1.25rem',
            }}
          >
            <Zap size={14} className="text-cyan-400" />
            <span>[ SECTION 05 // TRANSMIT ]</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-mythic)',
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              color: '#ffffff',
              letterSpacing: '0.04em',
              lineHeight: 1.15,
              maxWidth: '850px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            READY TO BUILD <span className="text-cyan-glow">SOMETHING EXTRAORDINARY?</span>
          </h2>

          <p
            style={{
              color: 'rgba(148, 163, 184, 0.9)',
              maxWidth: '620px',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '1rem',
              fontSize: '1.05rem',
            }}
          >
            Seeking impactful collaborations in data science, environmental intelligence, predictive AI, or fullstack software engineering.
          </p>
        </div>

        {/* Transmission Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
            gap: '3rem',
            alignItems: 'start',
          }}
          className="grid-cols-1 lg:grid-cols-2"
        >
          {/* ================= LEFT: TRANSMISSION FORM ================= */}
          <div className="hud-panel hud-corners p-8">
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#38bdf8',
                marginBottom: '1.5rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>// DISPATCH CONDUIT // ASGARDIAN UPLINK</span>
              <span style={{ color: '#10b981' }}>● READY</span>
            </div>

            {formSubmitted ? (
              <div
                style={{
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  background: 'rgba(14, 165, 233, 0.08)',
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 240, 255, 0.4)',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(0, 240, 255, 0.15)',
                    border: '2px solid #00f0ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
                  }}
                >
                  <Sparkles size={28} className="text-cyan-300" />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-hud)',
                    fontSize: '1.35rem',
                    color: '#ffffff',
                    marginBottom: '0.5rem',
                  }}
                >
                  TRANSMISSION RECEIVED!
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'rgba(203, 213, 225, 0.85)',
                    lineHeight: 1.6,
                    maxWidth: '420px',
                    margin: '0 auto 1.5rem',
                  }}
                >
                  Your dispatch has been successfully recorded in Barath's telemetry stream. An asynchronous response will be initiated shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="btn-thor-ghost"
                  style={{ fontSize: '0.75rem' }}
                >
                  TRANSMIT ANOTHER SIGNAL
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'rgba(148, 163, 184, 0.9)',
                      marginBottom: '0.4rem',
                      letterSpacing: '0.08em',
                    }}
                  >
                    IDENTIFIER // YOUR NAME OR ORGANIZATION *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Commander Erik / Asgard Labs"
                    value={formData.sender}
                    onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(7, 12, 24, 0.8)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      borderRadius: '4px',
                      padding: '0.75rem 1rem',
                      color: '#ffffff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                    onFocus={() => sound.playHoverBlip()}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'rgba(148, 163, 184, 0.9)',
                      marginBottom: '0.4rem',
                      letterSpacing: '0.08em',
                    }}
                  >
                    FREQUENCY // RETURN EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. yourname@domain.com"
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(7, 12, 24, 0.8)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      borderRadius: '4px',
                      padding: '0.75rem 1rem',
                      color: '#ffffff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                    onFocus={() => sound.playHoverBlip()}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'rgba(148, 163, 184, 0.9)',
                      marginBottom: '0.4rem',
                      letterSpacing: '0.08em',
                    }}
                  >
                    DISPATCH BRIEF // MISSION DESCRIPTION *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Brief description of the collaboration, project, or technical challenge..."
                    value={formData.dispatch}
                    onChange={(e) => setFormData({ ...formData, dispatch: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(7, 12, 24, 0.8)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      borderRadius: '4px',
                      padding: '0.75rem 1rem',
                      color: '#ffffff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                    onFocus={() => sound.playHoverBlip()}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-thor-primary interactive-target"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  <Send size={16} />
                  <span>TRANSMIT SIGNAL // DISPATCH</span>
                </button>
              </form>
            )}
          </div>

          {/* ================= RIGHT: VERIFIED DIRECT CHANNELS ================= */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* GitHub Card */}
            <div className="hud-panel hud-corners p-6" onMouseEnter={() => sound.playHoverBlip()}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '6px',
                    background: 'rgba(14, 165, 233, 0.15)',
                    border: '1px solid #38bdf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <GithubIcon size={24} className="text-cyan-400" />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-hud)', fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                    GITHUB PROFILE
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#38bdf8' }}>
                    @barathcbe06-gif
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'rgba(203, 213, 225, 0.85)', marginBottom: '1.25rem' }}>
                Explore live repositories, codebases, commits, and starred data science projects directly on GitHub.
              </p>

              <a
                href="https://github.com/barathcbe06-gif"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-thor-ghost"
                style={{ width: '100%', fontSize: '0.75rem' }}
                onClick={() => sound.playSelectClick()}
              >
                <span>VISIT GITHUB REPOSITORIES</span>
              </a>
            </div>

            {/* Direct Email Channel Card */}
            <div className="hud-panel hud-corners p-6" onMouseEnter={() => sound.playHoverBlip()}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '6px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid #10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Mail size={24} className="text-emerald-400" />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-hud)', fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                    DIRECT FREQUENCY
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#10b981' }}>
                    Electronic Dispatch
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'rgba(203, 213, 225, 0.85)', marginBottom: '1.25rem' }}>
                For technical discussions, research proposals, or professional opportunities:
              </p>

              <button
                onClick={handleCopyEmail}
                className="btn-thor-ghost"
                style={{
                  width: '100%',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                <span>{copied ? 'EMAIL COPIED TO CLIPBOARD' : 'COPY DIRECT EMAIL ADDRESS'}</span>
              </button>
            </div>

            {/* Geographical Coordinates */}
            <div
              className="hud-panel p-5"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: 'rgba(15, 28, 56, 0.4)',
              }}
            >
              <MapPin size={22} className="text-cyan-400 shrink-0" />
              <div>
                <div style={{ fontFamily: 'var(--font-hud)', fontSize: '0.85rem', color: '#ffffff', fontWeight: 700 }}>
                  OPERATIONAL BASE
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(148, 163, 184, 0.9)' }}>
                  Coimbatore, Tamil Nadu, India • UTC +05:30
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

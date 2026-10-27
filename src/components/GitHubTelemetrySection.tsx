import React, { useEffect, useState, useRef } from 'react';
import { GitBranch, GitCommit, GitPullRequest, Star, Layers, Activity, ShieldCheck, Terminal, ExternalLink } from 'lucide-react';
import { sound } from '../utils/audio';

export const GitHubTelemetrySection: React.FC = () => {
  const [stats, setStats] = useState({
    login: 'barathcbe06-gif',
    name: 'BARATH P',
    public_repos: 7,
    followers: 0,
    following: 0,
    bio: 'M.Sc Data Science Student | Python | SQL | Data Analytics | Machine Learning | Building Practical Projects',
    avatar_url: 'https://avatars.githubusercontent.com/u/324159579?v=4',
  });
  const [isLive, setIsLive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live GitHub API Fetch with cached fallback
  useEffect(() => {
    fetch('https://api.github.com/users/barathcbe06-gif')
      .then((res) => {
        if (!res.ok) throw new Error('Rate limit or network');
        return res.json();
      })
      .then((data) => {
        setStats({
          login: data.login || 'barathcbe06-gif',
          name: data.name || 'BARATH P',
          public_repos: data.public_repos || 7,
          followers: data.followers || 0,
          following: data.following || 0,
          bio: data.bio || stats.bio,
          avatar_url: data.avatar_url || stats.avatar_url,
        });
        setIsLive(true);
      })
      .catch(() => {
        // Fallback to verified cached data
        setIsLive(false);
      });
  }, []);

  // Telemetry Waveform Canvas (Matching Reference Video Frame 00:17!)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.025;

      const w = canvas.width;
      const h = canvas.height;
      const midY = h / 2;

      // Draw subtle background grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Waveform 1: Electric Cyan (Education / Machine Learning)
      ctx.beginPath();
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 8;
      for (let x = 0; x < w; x++) {
        const y = midY - 25 + Math.sin(x * 0.02 + time * 1.5) * 18 + Math.cos(x * 0.01 - time) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Waveform 2: Crimson / Asgardian Energy (Technology / Python Pipelines)
      ctx.beginPath();
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 6;
      for (let x = 0; x < w; x++) {
        const y = midY + Math.sin(x * 0.015 - time * 1.2) * 22 + Math.sin(x * 0.03 + time) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Waveform 3: Soft Blue (Development / Telemetry Frequency)
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 4;
      for (let x = 0; x < w; x++) {
        const y = midY + 28 + Math.sin(x * 0.025 + time * 2.0) * 14;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Reset shadow for performance
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const languages = [
    { name: 'Python', percentage: 58, color: '#38bdf8' },
    { name: 'JavaScript / React', percentage: 24, color: '#f59e0b' },
    { name: 'HTML & CSS', percentage: 12, color: '#ef4444' },
    { name: 'SQL & Shell', percentage: 6, color: '#10b981' },
  ];

  return (
    <section
      id="telemetry"
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
        zIndex: 5,
        backgroundColor: 'rgba(7, 12, 24, 0.65)',
      }}
    >
      <div className="max-w-content">
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: '#38bdf8',
              letterSpacing: '0.14em',
              marginBottom: '0.5rem',
            }}
          >
            <span>[ SECTION 04 // TELEMETRY ]</span>
            <div style={{ height: '1px', flex: 1, background: 'rgba(56, 189, 248, 0.25)' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', flexWrap: 'wrap' }}>
            <h2
              style={{
                fontFamily: 'var(--font-mythic)',
                fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
                color: '#ffffff',
                letterSpacing: '0.04em',
                lineHeight: 1,
              }}
            >
              GITHUB <span className="text-cyan-glow">OVERVIEW</span>
            </h2>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: isLive ? '#10b981' : '#38bdf8',
                background: isLive ? 'rgba(16, 185, 129, 0.12)' : 'rgba(56, 189, 248, 0.12)',
                border: `1px solid ${isLive ? 'rgba(16, 185, 129, 0.35)' : 'rgba(56, 189, 248, 0.35)'}`,
                padding: '0.2rem 0.65rem',
                borderRadius: '3px',
              }}
            >
              {isLive ? '● LIVE GITHUB API SYNC' : '● VERIFIED PROFILE DATA'}
            </span>
          </div>

          <p
            style={{
              color: 'rgba(148, 163, 184, 0.9)',
              maxWidth: '650px',
              marginTop: '0.85rem',
              fontSize: '1rem',
            }}
          >
            Real-time developer telemetry, repository index, language distributions, and continuous operational momentum.
          </p>
        </div>

        {/* Big Metrics Counters (Matching Video Frame 00:15 "300") */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          <div className="hud-panel hud-corners p-6" onMouseEnter={() => sound.playHoverBlip()}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#38bdf8', marginBottom: '0.5rem' }}>
              // TOTAL REPOSITORIES
            </div>
            <div style={{ fontFamily: 'var(--font-hud)', fontSize: '3rem', fontWeight: 900, color: '#ffffff' }}>
              0{stats.public_repos}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(148, 163, 184, 0.85)' }}>
              Data Science, AI & IoT Systems
            </div>
          </div>

          <div className="hud-panel hud-corners p-6" onMouseEnter={() => sound.playHoverBlip()}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#00f0ff', marginBottom: '0.5rem' }}>
              // COMMIT OPERATIONS
            </div>
            <div style={{ fontFamily: 'var(--font-hud)', fontSize: '3rem', fontWeight: 900, color: '#00f0ff' }}>
              300+
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(148, 163, 184, 0.85)' }}>
              Continuous Codebase Iterations
            </div>
          </div>

          <div className="hud-panel hud-corners p-6" onMouseEnter={() => sound.playHoverBlip()}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#10b981', marginBottom: '0.5rem' }}>
              // CORE DOMAIN
            </div>
            <div style={{ fontFamily: 'var(--font-hud)', fontSize: '2.4rem', fontWeight: 900, color: '#ffffff' }}>
              M.SC
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(148, 163, 184, 0.85)' }}>
              Data Science & Analytics Scholar
            </div>
          </div>

          <div className="hud-panel hud-corners p-6" onMouseEnter={() => sound.playHoverBlip()}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#fbbf24', marginBottom: '0.5rem' }}>
              // PROFILE STATUS
            </div>
            <div style={{ fontFamily: 'var(--font-hud)', fontSize: '2.4rem', fontWeight: 900, color: '#fbbf24' }}>
              ACTIVE
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(148, 163, 184, 0.85)' }}>
              @barathcbe06-gif Verified
            </div>
          </div>
        </div>

        {/* Telemetry Waveform Oscilloscope & Profile Card (Matching Video Frame 00:17!) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)',
            gap: '2rem',
            marginBottom: '3rem',
          }}
          className="grid-cols-1 lg:grid-cols-2"
        >
          {/* Real-time Oscilloscope Telemetry Waveforms */}
          <div className="hud-panel hud-corners p-6">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={16} className="text-cyan-400" />
                <span
                  style={{
                    fontFamily: 'var(--font-hud)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '0.1em',
                  }}
                >
                  TELEMETRY HARMONICS
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'rgba(56, 189, 248, 0.8)',
                }}
              >
                FREQ: 432 Hz // SINE FLUX
              </span>
            </div>

            {/* Canvas Waveform */}
            <div
              style={{
                width: '100%',
                height: '180px',
                background: 'rgba(3, 7, 18, 0.9)',
                borderRadius: '4px',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <canvas
                ref={canvasRef}
                width={560}
                height={180}
                style={{ width: '100%', height: '100%', display: 'block' }}
              />
            </div>

            {/* Legend Indicators (Matching Reference Video Frame 00:17!) */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.8rem',
                marginTop: '1.25rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#00f0ff' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00f0ff' }} />
                <span>EDUCATION (M.Sc)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                <span>TECHNOLOGY (Python/ML)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8' }} />
                <span>CAREER DEVELOPMENT</span>
              </div>
            </div>
          </div>

          {/* Language Breakdown & Profile Dossier */}
          <div className="hud-panel hud-corners p-6 flex flex-col justify-between">
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-hud)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '0.08em',
                  }}
                >
                  LANGUAGE DISTRIBUTION
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#38bdf8' }}>
                  CORE CODEBASES
                </span>
              </div>

              {/* Multi-segmented Language Bar */}
              <div
                style={{
                  height: '10px',
                  width: '100%',
                  borderRadius: '5px',
                  overflow: 'hidden',
                  display: 'flex',
                  marginBottom: '1.5rem',
                  background: 'rgba(30, 41, 59, 0.5)',
                }}
              >
                {languages.map((l) => (
                  <div
                    key={l.name}
                    style={{
                      width: `${l.percentage}%`,
                      backgroundColor: l.color,
                      boxShadow: `0 0 8px ${l.color}`,
                    }}
                    title={`${l.name}: ${l.percentage}%`}
                  />
                ))}
              </div>

              {/* Language Breakdown Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {languages.map((l) => (
                  <div
                    key={l.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: l.color,
                        }}
                      />
                      <span style={{ color: '#e2e8f0', fontFamily: 'var(--font-mono)' }}>{l.name}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#38bdf8' }}>
                      {l.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Action Bar */}
            <div
              style={{
                marginTop: '1.75rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'rgba(148, 163, 184, 0.85)', fontFamily: 'var(--font-mono)' }}>
                github.com/barathcbe06-gif
              </div>
              <a
                href="https://github.com/barathcbe06-gif"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-thor-ghost"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.72rem' }}
                onClick={() => sound.playSelectClick()}
              >
                <span>OPEN GITHUB</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

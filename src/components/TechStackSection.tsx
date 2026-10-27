import React, { useState } from 'react';
import { Cpu, Terminal, Sparkles, Layers, Activity, Radio, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/audio';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: number; // 0 - 100
  levelText: string;
  tools: string[];
  description: string;
}

export const TechStackSection: React.FC = () => {
  const [activeSkillId, setActiveSkillId] = useState<string>('python');

  // Barath's verified skillset aligned with reference video style
  const skills: SkillItem[] = [
    {
      id: 'python',
      name: 'PYTHON',
      category: 'CORE INTELLIGENCE',
      level: 95,
      levelText: '95%',
      tools: ['NumPy', 'Pandas', 'Scikit-Learn', 'Matplotlib', 'Seaborn'],
      description: 'Primary computational weapon. High-throughput data processing, scientific computing, algorithmic feature extraction, and ML pipelines.',
    },
    {
      id: 'ml',
      name: 'MACHINE LEARNING',
      category: 'AI / ALGORITHMS',
      level: 92,
      levelText: '92%',
      tools: ['Supervised Learning', 'Regression', 'Classification', 'Random Forest', 'XGBoost'],
      description: 'Predictive intelligence modeling for crop health diagnostics, student placement probability scoring, and geospatial climate risk.',
    },
    {
      id: 'sql',
      name: 'SQL & RELATIONAL DB',
      category: 'DATA STORAGE',
      level: 88,
      levelText: '88%',
      tools: ['PostgreSQL', 'MySQL', 'Complex Joins', 'Window Functions', 'Query Optimization'],
      description: 'Structural database query execution, ETL pipeline ingestion, data integrity constraints, and analytics reporting.',
    },
    {
      id: 'fastapi',
      name: 'FASTAPI & BACKEND',
      category: 'API & SERVICES',
      level: 85,
      levelText: '85%',
      tools: ['FastAPI', 'Flask', 'RESTful Endpoints', 'Async IO', 'Pydantic'],
      description: 'Ultra-low latency microservice deployment for serving machine learning inferences, predictive endpoints, and telemetry feeds.',
    },
    {
      id: 'react',
      name: 'REACT & MODERN WEB',
      category: 'INTERFACE MATRIX',
      level: 84,
      levelText: '84%',
      tools: ['React', 'TypeScript', 'Vite', 'Three.js / WebGL', 'Responsive UI'],
      description: 'Crafting responsive, high-impact data visualization dashboards, interactive charts, and immersive 3D interfaces.',
    },
    {
      id: 'git',
      name: 'GIT & GITHUB',
      category: 'DEV OPERATIONS',
      level: 90,
      levelText: '90%',
      tools: ['Branching Workflows', 'Actions CI/CD', 'Open Source', 'Version Control'],
      description: 'Disciplined repository architecture, semantic commit trees, release workflows, and automated profile telemetry.',
    },
    {
      id: 'iot',
      name: 'IOT & SENSOR TELEMETRY',
      category: 'HARDWARE INTELLIGENCE',
      level: 86,
      levelText: '86%',
      tools: ['Soil Moisture Sensors', 'Camera Feeds', 'Edge Telemetry', 'Crop Health Metrics'],
      description: 'Sensor data acquisition protocols powering real-time smart rice crop monitoring and agricultural early-warning systems.',
    },
    {
      id: 'genai',
      name: 'AI / GENERATIVE AI',
      category: 'NEXT-GEN INTELLIGENCE',
      level: 82,
      levelText: '82%',
      tools: ['LLM Orchestration', 'Prompt Engineering', 'Automated Insights', 'Insight Generation'],
      description: 'Synthesizing raw multi-variable datasets into human-readable strategic summaries and automated executive reporting.',
    },
  ];

  const activeSkill = skills.find((s) => s.id === activeSkillId) || skills[0];

  return (
    <section
      id="arsenal"
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
        zIndex: 5,
        backgroundColor: 'rgba(7, 12, 24, 0.4)',
      }}
    >
      <div className="max-w-content">
        {/* Section Header with Giant Typography (Matching Video Frame 00:05-00:06) */}
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
            <span>[ SECTION 02 // ARSENAL ]</span>
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
              SYSTEM // <span className="text-cyan-glow">TECHNOLOGY</span>
            </h2>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: '#10b981',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '0.2rem 0.6rem',
                borderRadius: '3px',
              }}
            >
              ● 8 MODULES ONLINE
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
            Verified technical arsenal powering predictive models, data analytics pipelines, and scalable software systems.
          </p>
        </div>

        {/* ================= CYBERNETIC HUD LAYOUT (MATCHING VIDEO) ================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: '2.5rem',
            alignItems: 'start',
          }}
          className="grid-cols-1 lg:grid-cols-2"
        >
          {/* ================= LEFT SIDE: SKILL LED PROGRESS LIST ================= */}
          <div
            className="hud-panel hud-corners"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'rgba(148, 163, 184, 0.8)',
              }}
            >
              <span>// DISCIPLINE / SYSTEM MODULE</span>
              <span>EFFICIENCY RATING</span>
            </div>

            {skills.map((skill) => {
              const isActive = skill.id === activeSkillId;
              const totalBlocks = 20;
              const activeBlocks = Math.round((skill.level / 100) * totalBlocks);

              return (
                <div
                  key={skill.id}
                  onClick={() => {
                    sound.playSelectClick();
                    setActiveSkillId(skill.id);
                  }}
                  onMouseEnter={() => {
                    sound.playHoverBlip();
                    setActiveSkillId(skill.id);
                  }}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '4px',
                    background: isActive ? 'rgba(14, 165, 233, 0.12)' : 'rgba(15, 28, 56, 0.3)',
                    border: `1px solid ${isActive ? 'rgba(56, 189, 248, 0.5)' : 'rgba(255, 255, 255, 0.05)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  className="interactive-target hover:border-cyan-400"
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: isActive ? '#00f0ff' : '#64748b',
                          boxShadow: isActive ? '0 0 8px #00f0ff' : 'none',
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-hud)',
                          fontSize: '0.92rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          color: isActive ? '#ffffff' : '#cbd5e1',
                        }}
                      >
                        {skill.name}
                      </span>
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: isActive ? '#00f0ff' : 'rgba(148, 163, 184, 0.8)',
                      }}
                    >
                      {skill.levelText}
                    </span>
                  </div>

                  {/* Segmented LED Bar (Matching Reference Video Frame 00:06-00:07) */}
                  <div className="led-bar-container">
                    {Array.from({ length: totalBlocks }).map((_, bIdx) => {
                      const isBlockActive = bIdx < activeBlocks;
                      const isPeak = isBlockActive && bIdx === activeBlocks - 1;
                      return (
                        <div
                          key={bIdx}
                          className={`led-block ${
                            isBlockActive ? (isPeak ? 'peak' : 'active') : ''
                          }`}
                          style={{
                            background: isBlockActive
                              ? isPeak
                                ? '#ffffff'
                                : isActive
                                ? '#00f0ff'
                                : '#0284c7'
                              : 'rgba(30, 41, 59, 0.6)',
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= RIGHT SIDE: HOLOGRAPHIC RADAR GAUGE (MATCHING VIDEO) ================= */}
          <div
            className="hud-panel hud-corners"
            style={{
              padding: '2.25rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              background: 'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.08) 0%, rgba(7, 12, 24, 0.95) 75%)',
            }}
          >
            {/* Top Gauge Telemetry Header */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#38bdf8',
                marginBottom: '1.5rem',
              }}
            >
              <span>TELEMETRY_SCAN // REALTIME</span>
              <span>SEC_CLEARANCE: ALPHA</span>
            </div>

            {/* Rotating Circular HUD Radar */}
            <div
              style={{
                position: 'relative',
                width: '260px',
                height: '260px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem',
              }}
            >
              {/* Outer Dashed Orbit Ring */}
              <div
                className="animate-radar"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '1.5px dashed rgba(56, 189, 248, 0.45)',
                }}
              />

              {/* Reverse Inner Ring */}
              <div
                className="animate-radar-reverse"
                style={{
                  position: 'absolute',
                  inset: '22px',
                  borderRadius: '50%',
                  border: '1px solid rgba(0, 240, 255, 0.25)',
                  borderTopColor: '#00f0ff',
                  borderBottomColor: '#00f0ff',
                }}
              />

              {/* Radar Crosshairs */}
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'rgba(56, 189, 248, 0.2)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '1px',
                  backgroundColor: 'rgba(56, 189, 248, 0.2)',
                }}
              />

              {/* Central Glowing Core Display (Matching "GT" from video!) */}
              <div
                style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  background: 'rgba(7, 12, 24, 0.9)',
                  border: '2px solid #00f0ff',
                  boxShadow: '0 0 25px rgba(0, 240, 255, 0.4), inset 0 0 15px rgba(0, 240, 255, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-hud)',
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    lineHeight: 1,
                    textShadow: '0 0 10px #00f0ff',
                  }}
                >
                  {activeSkill.level}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: '#38bdf8',
                    letterSpacing: '0.1em',
                    marginTop: '0.2rem',
                  }}
                >
                  RATING
                </div>
              </div>
            </div>

            {/* Active Skill Telemetry Inspection Box */}
            <div
              style={{
                width: '100%',
                background: 'rgba(15, 28, 56, 0.7)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '6px',
                padding: '1.25rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-hud)',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '0.08em',
                  }}
                >
                  {activeSkill.name}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: '#00f0ff',
                    background: 'rgba(0, 240, 255, 0.1)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '2px',
                  }}
                >
                  {activeSkill.category}
                </span>
              </div>

              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'rgba(203, 213, 225, 0.85)',
                  lineHeight: 1.55,
                  marginBottom: '1rem',
                }}
              >
                {activeSkill.description}
              </p>

              {/* Sub-tools badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {activeSkill.tools.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: '#cbd5e1',
                      background: 'rgba(255, 255, 255, 0.06)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '3px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

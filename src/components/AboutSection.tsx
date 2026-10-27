import React from 'react';
import { Shield, Sparkles, Terminal, Cpu, Database, Compass, Eye, Flame } from 'lucide-react';
import { sound } from '../utils/audio';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'M.SC DATA SCIENCE SCHOLAR',
      subtitle: 'Theoretical Rigor Meets Practical Systems',
      description:
        'Pursuing advanced data science with a laser focus on machine learning algorithms, statistical inference, predictive modeling, and scalable data architectures.',
      icon: Database,
      tag: 'ACADEMIC & R&D',
    },
    {
      num: '02',
      title: 'ENVIRONMENTAL & AGRI-TECH AI',
      subtitle: 'IoT Telemetry & Computer Vision',
      description:
        'Architect of AI & IoT-based Smart Rice Crop Monitoring System for early disease detection, crop health scoring, and precision agricultural insights in South India.',
      icon: Compass,
      tag: 'REAL-WORLD IMPACT',
    },
    {
      num: '03',
      title: 'PREDICTIVE MODELING ARCHITECT',
      subtitle: 'From Raw Datasets to Deployed Intelligence',
      description:
        'Creating platforms like PlacementIQ and DataLens AI that demystify complex datasets, delivering instant automated EDA and predictive insights for real humans.',
      icon: Cpu,
      tag: 'PREDICTIVE ML',
    },
    {
      num: '04',
      title: 'THE CODE WEAPONSMITH',
      subtitle: 'Python, SQL, APIs & Modern Frontends',
      description:
        'Believes that machine learning without reliable software craftsmanship is powerless. Builds sturdy pipelines with Python, FastAPI, React, and automated version control.',
      icon: Terminal,
      tag: 'FULL PIPELINE',
    },
  ];

  return (
    <section
      id="origin"
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div className="max-w-content">
        {/* Section Header with Cybernetic Markers (Matching Video Frame 00:04) */}
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
            <span>[ SECTION 01 // DOSSIER ]</span>
            <div style={{ height: '1px', flex: 1, background: 'rgba(56, 189, 248, 0.25)' }} />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-mythic)',
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              color: '#ffffff',
              letterSpacing: '0.05em',
            }}
          >
            THE PERSON BEHIND <span className="text-cyan-glow">THE THUNDER</span>
          </h2>
          <p
            style={{
              color: 'rgba(148, 163, 184, 0.9)',
              maxWidth: '650px',
              marginTop: '0.75rem',
              fontSize: '1.05rem',
            }}
          >
            Turning chaotic data into crystalline insights. Dedicated to building solutions with tangible, positive impact on agriculture, climate intelligence, and predictive decision-making.
          </p>
        </div>

        {/* Dossier Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3.5rem',
          }}
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="hud-panel hud-corners interactive-target"
                onMouseEnter={() => sound.playHoverBlip()}
                style={{
                  padding: '2rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
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
                        fontSize: '1.4rem',
                        fontWeight: 900,
                        color: 'rgba(56, 189, 248, 0.35)',
                      }}
                    >
                      {pillar.num}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: 'rgba(14, 165, 233, 0.12)',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '3px',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#38bdf8',
                      }}
                    >
                      <Icon size={12} />
                      <span>{pillar.tag}</span>
                    </div>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-hud)',
                      fontSize: '1rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      letterSpacing: '0.08em',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: '#38bdf8',
                      marginBottom: '1rem',
                    }}
                  >
                    {pillar.subtitle}
                  </div>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'rgba(203, 213, 225, 0.8)',
                      lineHeight: 1.65,
                    }}
                  >
                    {pillar.description}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'rgba(100, 116, 139, 0.8)',
                  }}
                >
                  <span style={{ color: '#00f0ff' }}>●</span>
                  <span>SYSTEM NODE ACTIVE</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Philosophy Quotation Banner */}
        <div
          className="hud-panel"
          style={{
            padding: '2rem 2.5rem',
            background: 'linear-gradient(135deg, rgba(15, 28, 56, 0.85), rgba(7, 12, 24, 0.95))',
            borderColor: 'rgba(56, 189, 248, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#38bdf8',
                letterSpacing: '0.12em',
                marginBottom: '0.4rem',
              }}
            >
              // BARATH'S CORE CODEC
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mythic)',
                fontSize: 'clamp(1.1rem, 2.4vw, 1.6rem)',
                color: '#ffffff',
                lineHeight: 1.4,
              }}
            >
              "Small steps today. Bigger impact tomorrow. Built with curiosity, data, and thunder."
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid #38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(0, 240, 255, 0.35)',
              }}
            >
              <Flame size={22} className="text-cyan-400" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-hud)', fontSize: '0.85rem', color: '#ffffff', fontWeight: 700 }}>
                BARATH P
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(148, 163, 184, 0.8)' }}>
                Coimbatore, TN, India
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { ExternalLink, Terminal, Sparkles, Compass, ShieldAlert, Cpu } from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { sound } from '../utils/audio';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Barath's genuine projects from his GitHub account
  const projects: Project[] = [
    {
      id: 'smart-rice-crop-monitoring',
      missionNumber: 'MISSION 01',
      title: 'SMART RICE CROP MONITORING',
      codename: 'PROJECT CERES-THOR',
      description:
        'AI and IoT-based smart agricultural ecosystem for rice paddy health scoring, early blast/blight disease detection, and environmental soil intelligence.',
      extendedDescription:
        'Engineered to empower farmers and agricultural scientists with automated early detection of rice crop diseases and soil moisture volatility. Combines IoT edge sensor data with computer vision classification to safeguard yield stability.',
      technologies: ['Python', 'Computer Vision', 'IoT Telemetry', 'Machine Learning', 'Data Analytics'],
      status: 'ACTIVE MISSION',
      githubUrl: 'https://github.com/barathcbe06-gif/smart-rice-crop-monitoring',
      metrics: {
        accuracy: '94.6%',
        impact: 'Early Disease Detection & Yield Protection',
      },
      highlights: [
        'Automated leaf disease diagnosis using feature extraction and classification',
        'Real-time IoT telemetry pipelines for soil moisture, humidity, and temperature',
        'Data-driven advisory generation for localized agricultural treatment cycles',
      ],
      color: '#00f0ff',
    },
    {
      id: 'datalens-ai',
      missionNumber: 'MISSION 02',
      title: 'DATALENS AI',
      codename: 'PROJECT HEIMDALL-LENS',
      description:
        'AI-powered dataset analysis and insight platform built with Python, FastAPI, and React for automated EDA, correlation discovery, and visual synthesis.',
      extendedDescription:
        'Transforms raw, multi-column tabular datasets into structured statistical summaries, outlier anomaly detections, and visual distribution curves. Designed for rapid data exploration with a modern, high-performance web dashboard.',
      technologies: ['Python', 'FastAPI', 'React', 'Pandas', 'Data Analytics', 'Scikit-Learn'],
      status: 'CORE SYSTEM',
      githubUrl: 'https://github.com/barathcbe06-gif/datalens-ai',
      metrics: {
        accuracy: 'Instant EDA',
        impact: 'Automated Insight Platform',
      },
      highlights: [
        'High-performance async FastAPI backend processing multi-megabyte CSV and Excel files',
        'Automated statistical distribution analysis, null handling, and correlation matrices',
        'Interactive React analytics interface with customizable charting modules',
      ],
      color: '#38bdf8',
    },
    {
      id: 'placementiq',
      missionNumber: 'MISSION 03',
      title: 'PLACEMENTIQ',
      codename: 'PROJECT VALKYRIE-PREDICT',
      description:
        'AI/ML-based student placement prediction and competency modeling system utilizing multi-factor classification to identify employment readiness.',
      extendedDescription:
        'Predictive classification framework trained on academic scores, technical domain tests, internships, and soft skills to forecast student placement probability and recommend targeted skill improvements.',
      technologies: ['Python', 'Machine Learning', 'Classification', 'Scikit-Learn', 'Feature Engineering'],
      status: 'DEPLOYED',
      githubUrl: 'https://github.com/barathcbe06-gif/PlacementIQ',
      metrics: {
        accuracy: '91.2%',
        impact: 'Student Career Readiness Scoring',
      },
      highlights: [
        'Supervised machine learning classification models evaluated across multiple metrics',
        'Feature importance ranking to pinpoint high-leverage curriculum improvements',
        'Streamlined prediction interface for instant candidate profile assessment',
      ],
      color: '#fbbf24',
    },
    {
      id: 'ecoserve-ai',
      missionNumber: 'MISSION 04',
      title: 'ECOSERVE-AI',
      codename: 'PROJECT MIDGARD-SUSTAIN',
      description:
        'Environmental intelligence platform designed to track environmental metrics, resource allocation, and sustainable intelligence workflows.',
      extendedDescription:
        'Explores the nexus of data science, web services, and ecological sustainability. Implements automated processing for resource metrics and environmental indicators.',
      technologies: ['JavaScript', 'Python', 'Environmental Data', 'Full-Stack', 'Data Pipelines'],
      status: 'ACTIVE MISSION',
      githubUrl: 'https://github.com/barathcbe06-gif/EcoServe-AI',
      metrics: {
        impact: 'Sustainability & Resource Tracking',
      },
      highlights: [
        'Modular architectural stack for environmental metrics and tracking',
        'Scalable data schema for recurring environmental assessment logs',
        'Clean API interface for downstream analytics dashboards',
      ],
      color: '#10b981',
    },
    {
      id: 'terramind-ai',
      missionNumber: 'MISSION 05',
      title: 'TERRAMIND AI',
      codename: 'PROJECT YGGDRASIL-GEO',
      description:
        'Environmental risk intelligence concept focused on rainfall patterns, geospatial information, and flood risk prediction for Tamil Nadu.',
      extendedDescription:
        'Geospatial data science framework mapping rainfall historical distribution, elevation topographies, and seasonal flood vulnerability zones across districts of Tamil Nadu.',
      technologies: ['Geospatial Analytics', 'Python', 'Rainfall Modeling', 'Risk Assessment'],
      status: 'CLASSIFIED',
      githubUrl: 'https://github.com/barathcbe06-gif?tab=repositories',
      metrics: {
        impact: 'District-Level Climate Intelligence',
      },
      highlights: [
        'Geospatial risk mapping for precipitation and drainage corridors',
        'Historical rainfall anomaly detection for monsoon surge preparation',
        'Modular design ready for sensor integration and municipal alerts',
      ],
      color: '#a855f7',
    },
  ];

  return (
    <section
      id="missions"
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div className="max-w-content">
        {/* Section Header with Giant Typography (Matching Video Frame 00:09-00:11) */}
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
            <span>[ SECTION 03 // MISSIONS ]</span>
            <div style={{ height: '1px', flex: 1, background: 'rgba(56, 189, 248, 0.25)' }} />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-mythic)',
              fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
              color: '#ffffff',
              letterSpacing: '0.04em',
              lineHeight: 1,
            }}
          >
            MY <span className="text-cyan-glow">MISSIONS</span>
          </h2>

          <div
            style={{
              fontFamily: 'var(--font-hud)',
              fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
              color: 'rgba(203, 213, 225, 0.75)',
              letterSpacing: '0.12em',
              marginTop: '0.6rem',
            }}
          >
            EVERY MISSION STARTS WITH A THUNDERBOLT.
          </div>
        </div>

        {/* Missions Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2rem',
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="hud-panel hud-corners interactive-target group"
              onMouseEnter={() => sound.playHoverBlip()}
              style={{
                padding: '2.25rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div>
                {/* Mission Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-hud)',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      color: project.color,
                      letterSpacing: '0.14em',
                    }}
                  >
                    {project.missionNumber}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'rgba(148, 163, 184, 0.9)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '3px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Mission Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-mythic)',
                    fontSize: '1.45rem',
                    color: '#ffffff',
                    letterSpacing: '0.04em',
                    marginBottom: '0.4rem',
                    lineHeight: 1.25,
                  }}
                >
                  {project.title}
                </h3>

                <div
                  style={{
                    fontFamily: 'var(--font-hud)',
                    fontSize: '0.75rem',
                    color: '#38bdf8',
                    letterSpacing: '0.1em',
                    marginBottom: '1rem',
                  }}
                >
                  {project.codename}
                </div>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'rgba(203, 213, 225, 0.85)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                  }}
                >
                  {project.description}
                </p>

                {/* Technologies List */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    marginBottom: '2rem',
                  }}
                >
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'rgba(226, 232, 240, 0.9)',
                        background: 'rgba(14, 165, 233, 0.12)',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '3px',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'rgba(148, 163, 184, 0.8)',
                        padding: '0.2rem 0.4rem',
                      }}
                    >
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <button
                  onClick={() => {
                    sound.playSelectClick();
                    setSelectedProject(project);
                  }}
                  className="btn-thor-ghost"
                  style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.75rem' }}
                >
                  <span>INSPECT MISSION</span>
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playSelectClick()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '38px',
                    height: '38px',
                    borderRadius: '4px',
                    background: 'rgba(14, 165, 233, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    color: '#38bdf8',
                    transition: 'all 0.2s ease',
                  }}
                  className="hover:border-cyan-400 hover:text-white"
                  title="View on GitHub"
                >
                  <GithubIcon size={17} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Inspector Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

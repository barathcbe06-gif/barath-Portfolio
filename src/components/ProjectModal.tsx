import React from 'react';
import { X, ExternalLink, Zap, Shield, CheckCircle2, Layers } from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';
import { Project } from '../types';
import { sound } from '../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'rgba(3, 7, 18, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      onClick={onClose}
    >
      <div
        className="hud-panel hud-corners"
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2.5rem',
          background: 'rgba(10, 17, 36, 0.95)',
          border: '1px solid rgba(56, 189, 248, 0.45)',
          boxShadow: '0 0 50px rgba(0, 240, 255, 0.25)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playSelectClick();
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '4px',
            padding: '0.4rem',
            color: '#cbd5e1',
            cursor: 'pointer',
          }}
          className="hover:text-cyan-400 hover:border-cyan-400"
        >
          <X size={20} />
        </button>

        {/* Mission Dossier Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-hud)',
              fontSize: '0.75rem',
              fontWeight: 800,
              color: '#00f0ff',
              background: 'rgba(0, 240, 255, 0.1)',
              padding: '0.2rem 0.6rem',
              borderRadius: '3px',
              border: '1px solid rgba(0, 240, 255, 0.3)',
            }}
          >
            {project.missionNumber}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: '#10b981',
            }}
          >
            ● {project.status}
          </span>
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-mythic)',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            color: '#ffffff',
            letterSpacing: '0.04em',
            marginBottom: '0.5rem',
          }}
        >
          {project.title}
        </h3>

        <div
          style={{
            fontFamily: 'var(--font-hud)',
            fontSize: '0.85rem',
            color: '#38bdf8',
            letterSpacing: '0.1em',
            marginBottom: '1.5rem',
          }}
        >
          CODENAME: {project.codename}
        </div>

        {/* Overview Description */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h4
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'rgba(148, 163, 184, 0.8)',
              letterSpacing: '0.12em',
              marginBottom: '0.5rem',
            }}
          >
            // MISSION OBJECTIVE
          </h4>
          <p
            style={{
              fontSize: '0.95rem',
              color: 'rgba(226, 232, 240, 0.9)',
              lineHeight: 1.7,
            }}
          >
            {project.extendedDescription}
          </p>
        </div>

        {/* Key Highlights */}
        <div style={{ marginBottom: '2rem' }}>
          <h4
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'rgba(148, 163, 184, 0.8)',
              letterSpacing: '0.12em',
              marginBottom: '0.75rem',
            }}
          >
            // ARCHITECTURAL CAPABILITIES
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {project.highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.6rem',
                  fontSize: '0.88rem',
                  color: 'rgba(203, 213, 225, 0.85)',
                }}
              >
                <CheckCircle2 size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Stack */}
        <div style={{ marginBottom: '2rem' }}>
          <h4
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'rgba(148, 163, 184, 0.8)',
              letterSpacing: '0.12em',
              marginBottom: '0.75rem',
            }}
          >
            // DEPLOYED TECHNOLOGIES
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#ffffff',
                  background: 'rgba(14, 165, 233, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  padding: '0.3rem 0.7rem',
                  borderRadius: '3px',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Direct Action Links */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-thor-primary"
            onClick={() => sound.playSelectClick()}
          >
            <GithubIcon size={16} />
            <span>OPEN GITHUB REPOSITORY</span>
            <ExternalLink size={14} />
          </a>
          <button
            onClick={onClose}
            className="btn-thor-ghost"
          >
            DISMISS DOSSIER
          </button>
        </div>
      </div>
    </div>
  );
};

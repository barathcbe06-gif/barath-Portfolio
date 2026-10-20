import React, { useEffect, useRef } from 'react';
import { isMobileDevice } from '../../utils/webglHelper';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = null;
    let isHidden = false;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize, { passive: true });

    const isMobile = isMobileDevice();
    const particleCount = isMobile ? 22 : Math.min(48, Math.floor(window.innerWidth / 32));
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.2 - Math.random() * 0.35,
        alpha: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.4 ? 'rgba(0, 240, 255,' : 'rgba(245, 176, 65,',
      });
    }

    const animate = () => {
      if (isHidden) {
        animationId = null;
        return;
      }

      animationId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        // Removed expensive ctx.shadowBlur which forces CPU-GPU raster passes on every particle
        ctx.fill();
      }
    };

    const handleVisibility = () => {
      isHidden = document.hidden;
      if (!isHidden && !animationId) {
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
    />
  );
}

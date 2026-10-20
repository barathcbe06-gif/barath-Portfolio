import React, { useEffect, useRef } from 'react';
import { soundEngine } from '../ui/AudioController';
import { observeVisibility } from '../../utils/webglHelper';

export default function ThorLightningCanvas({ isActive = false, triggerBolt = 0 }) {
  const canvasRef = useRef(null);
  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = null;
    let isVisible = true;

    const parent = canvas.parentElement;
    let width = (canvas.width = parent ? parent.clientWidth : 800);
    let height = (canvas.height = parent ? parent.clientHeight : 600);

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', onResize, { passive: true });

    // Lightning Bolt Generator
    class LightningBolt {
      constructor(startX, startY, endX, endY, branchLevel = 0) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.branchLevel = branchLevel;
        this.points = [];
        this.alpha = 1.0;
        this.branches = [];
        this.generate();
      }

      generate() {
        this.points = [{ x: this.startX, y: this.startY }];
        const dx = this.endX - this.startX;
        const dy = this.endY - this.startY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.max(6, Math.floor(dist / 30));

        for (let i = 1; i < steps; i++) {
          const t = i / steps;
          const normalX = -dy / dist;
          const normalY = dx / dist;
          const jitter = (Math.random() - 0.5) * 35;

          const px = this.startX + dx * t + normalX * jitter;
          const py = this.startY + dy * t + normalY * jitter;
          this.points.push({ x: px, y: py });

          // Branching
          if (this.branchLevel < 2 && Math.random() < 0.2) {
            const branchAngle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.9;
            const branchDist = dist * 0.45;
            const bx = px + Math.cos(branchAngle) * branchDist;
            const by = py + Math.sin(branchAngle) * branchDist;
            this.branches.push(new LightningBolt(px, py, bx, by, this.branchLevel + 1));
          }
        }
        this.points.push({ x: this.endX, y: this.endY });
      }

      draw(context) {
        if (this.alpha <= 0) return;
        context.save();
        context.strokeStyle = `rgba(100, 230, 255, ${this.alpha})`;
        context.shadowColor = '#00f0ff';
        context.shadowBlur = 14;
        context.lineWidth = Math.max(1, (3 - this.branchLevel * 0.8) * this.alpha);
        context.beginPath();

        for (let i = 0; i < this.points.length; i++) {
          const pt = this.points[i];
          if (i === 0) context.moveTo(pt.x, pt.y);
          else context.lineTo(pt.x, pt.y);
        }
        context.stroke();

        // Inner hot core
        context.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
        context.lineWidth = Math.max(0.5, 1 * this.alpha);
        context.stroke();

        context.restore();

        for (let i = 0; i < this.branches.length; i++) {
          this.branches[i].draw(context);
        }
        this.alpha -= 0.05;
      }
    }

    let bolts = [];
    let lastBoltTime = 0;

    const spawnAmbientBolt = () => {
      const startX = Math.random() * width;
      const startY = 0;
      const endX = startX + (Math.random() - 0.5) * 200;
      const endY = height * (0.4 + Math.random() * 0.6);
      bolts.push(new LightningBolt(startX, startY, endX, endY));
    };

    const animate = (timestamp) => {
      if (!isVisible) {
        animationId = null;
        return;
      }

      animationId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);

      const active = isActiveRef.current;
      if (timestamp - lastBoltTime > (active ? 700 : 2500)) {
        if (Math.random() < (active ? 0.8 : 0.4)) {
          spawnAmbientBolt();
        }
        lastBoltTime = timestamp;
      }

      bolts = bolts.filter((b) => b.alpha > 0);
      for (let i = 0; i < bolts.length; i++) {
        bolts[i].draw(ctx);
      }
    };

    // Pause/Resume loop on scroll & visibility
    const disconnectObserver = observeVisibility(canvas, (visible) => {
      isVisible = visible;
      if (visible && !animationId) {
        animationId = requestAnimationFrame(animate);
      }
    });

    animationId = requestAnimationFrame(animate);

    return () => {
      disconnectObserver();
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Trigger manual lightning surge on prop change
  useEffect(() => {
    if (triggerBolt > 0 && canvasRef.current) {
      soundEngine.playThorLightning();
    }
  }, [triggerBolt]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-60"
    />
  );
}

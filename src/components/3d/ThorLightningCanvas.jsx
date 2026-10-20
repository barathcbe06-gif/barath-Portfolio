import React, { useEffect, useRef } from 'react';
import { soundEngine } from '../ui/AudioController';

export default function ThorLightningCanvas({ isActive = false, triggerBolt = 0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', onResize);

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
        const steps = Math.max(8, Math.floor(dist / 25));

        for (let i = 1; i < steps; i++) {
          const t = i / steps;
          const normalX = -dy / dist;
          const normalY = dx / dist;
          const jitter = (Math.random() - 0.5) * 35;

          const px = this.startX + dx * t + normalX * jitter;
          const py = this.startY + dy * t + normalY * jitter;
          this.points.push({ x: px, y: py });

          // Branching
          if (this.branchLevel < 2 && Math.random() < 0.22) {
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
        context.shadowBlur = 18;
        context.lineWidth = Math.max(1, (3 - this.branchLevel * 0.8) * this.alpha);
        context.beginPath();

        this.points.forEach((pt, idx) => {
          if (idx === 0) context.moveTo(pt.x, pt.y);
          else context.lineTo(pt.x, pt.y);
        });
        context.stroke();

        // Inner hot core
        context.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
        context.lineWidth = Math.max(0.5, 1 * this.alpha);
        context.stroke();

        context.restore();

        this.branches.forEach((b) => b.draw(context));
        this.alpha -= 0.045;
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
      animationId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);

      if (timestamp - lastBoltTime > (isActive ? 700 : 2500)) {
        if (Math.random() < (isActive ? 0.8 : 0.4)) {
          spawnAmbientBolt();
        }
        lastBoltTime = timestamp;
      }

      bolts = bolts.filter((b) => b.alpha > 0);
      bolts.forEach((b) => b.draw(ctx));
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    };
  }, [isActive]);

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

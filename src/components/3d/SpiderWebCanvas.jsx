import React, { useEffect, useRef, useState } from 'react';
import { skillsData } from '../../data/portfolioData';
import { soundEngine } from '../ui/AudioController';

export default function SpiderWebCanvas({ onSelectSkill }) {
  const canvasRef = useRef(null);
  const [activeSkill, setActiveSkill] = useState(skillsData[0]);
  const [hoveredSkill, setHoveredSkill] = useState(null);

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
      layoutNodes();
    };
    window.addEventListener('resize', onResize);

    // Node Positions
    let nodes = [];
    const layoutNodes = () => {
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.36;

      nodes = skillsData.map((skill, index) => {
        // Special center node for Python or distribution
        if (index === 0) {
          return {
            ...skill,
            x: centerX,
            y: centerY,
            baseX: centerX,
            baseY: centerY,
            vx: 0,
            vy: 0,
            radius: 28,
            isCenter: true,
          };
        }
        const angle = ((index - 1) / (skillsData.length - 1)) * Math.PI * 2 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        return {
          ...skill,
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          radius: 22,
          isCenter: false,
        };
      });
    };

    layoutNodes();

    // Mouse Interaction
    let mouse = { x: -1000, y: -1000, isDown: false, draggedNode: null };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      let found = null;
      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        if (Math.hypot(dx, dy) < node.radius + 6) {
          found = node;
        }
      });
      setHoveredSkill(found);
    };

    const onMouseDown = (e) => {
      soundEngine.playHudClick();
      mouse.isDown = true;
      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        if (Math.hypot(dx, dy) < node.radius + 8) {
          mouse.draggedNode = node;
          setActiveSkill(node);
          if (onSelectSkill) onSelectSkill(node);
          soundEngine.playHologramChime();
        }
      });
    };

    const onMouseUp = () => {
      mouse.isDown = false;
      mouse.draggedNode = null;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop with Spring Tension Physics
    let step = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      step += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Physics: drag & spring return
      nodes.forEach((node) => {
        if (mouse.draggedNode === node) {
          node.x = mouse.x;
          node.y = mouse.y;
        } else {
          // Spring force back to base position
          const k = 0.08;
          const damping = 0.82;
          const fx = (node.baseX - node.x) * k;
          const fy = (node.baseY - node.y) * k;

          node.vx = (node.vx + fx) * damping;
          node.vy = (node.vy + fy) * damping;

          node.x += node.vx;
          node.y += node.vy;

          // Mouse push repulsion
          const mdx = node.x - mouse.x;
          const mdy = node.y - mouse.y;
          const mdist = Math.hypot(mdx, mdy);
          if (mdist < 80 && mdist > 0) {
            const push = (80 - mdist) * 0.08;
            node.x += (mdx / mdist) * push;
            node.y += (mdy / mdist) * push;
          }
        }
      });

      // 1. Draw Spider Web Strands (Concentric Spiral Web)
      const center = nodes[0];
      if (center) {
        // Radial Web Lines
        for (let i = 1; i < nodes.length; i++) {
          const target = nodes[i];
          const isConnectedToActive = activeSkill && (activeSkill.name === center.name || activeSkill.name === target.name);

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(center.x, center.y);

          // Elastic curved web sag
          const midX = (center.x + target.x) / 2;
          const midY = (center.y + target.y) / 2 + Math.sin(step + i) * 3;
          ctx.quadraticCurveTo(midX, midY, target.x, target.y);

          if (isConnectedToActive) {
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.85)';
            ctx.lineWidth = 2.5;
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 12;
          } else {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
            ctx.lineWidth = 1;
            ctx.shadowBlur = 0;
          }
          ctx.stroke();
          ctx.restore();
        }

        // Perimeter Lattice Strands
        for (let i = 1; i < nodes.length; i++) {
          const next = i === nodes.length - 1 ? nodes[1] : nodes[i + 1];
          const curr = nodes[i];
          const isLatticeActive = activeSkill && (activeSkill.name === curr.name || activeSkill.name === next.name);

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(curr.x, curr.y);
          const midX = (curr.x + next.x) / 2;
          const midY = (curr.y + next.y) / 2 + Math.cos(step + i) * 2;
          ctx.quadraticCurveTo(midX, midY, next.x, next.y);

          if (isLatticeActive) {
            ctx.strokeStyle = 'rgba(230, 36, 41, 0.8)';
            ctx.lineWidth = 2;
            ctx.shadowColor = '#e62429';
            ctx.shadowBlur = 10;
          } else {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = 1;
          }
          ctx.stroke();
          ctx.restore();
        }

        // Concentric Inner Spiral Rings
        [0.35, 0.65].forEach((ratio, ringIdx) => {
          ctx.save();
          ctx.beginPath();
          for (let i = 1; i < nodes.length; i++) {
            const next = i === nodes.length - 1 ? nodes[1] : nodes[i + 1];
            const curr = nodes[i];

            const p1x = center.x + (curr.x - center.x) * ratio;
            const p1y = center.y + (curr.y - center.y) * ratio;
            const p2x = center.x + (next.x - center.x) * ratio;
            const p2y = center.y + (next.y - center.y) * ratio;

            if (i === 1) ctx.moveTo(p1x, p1y);
            ctx.lineTo(p2x, p2y);
          }
          ctx.closePath();
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.18)';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.restore();
        });
      }

      // 2. Draw Interactive Tech Orbs
      nodes.forEach((node) => {
        const isSelected = activeSkill && activeSkill.name === node.name;
        const isHovered = hoveredSkill && hoveredSkill.name === node.name;

        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        // Core Gradient Fill
        const gradient = ctx.createRadialGradient(
          node.x - node.radius * 0.3,
          node.y - node.radius * 0.3,
          node.radius * 0.1,
          node.x,
          node.y,
          node.radius
        );

        if (isSelected) {
          gradient.addColorStop(0, '#ffffff');
          gradient.addColorStop(0.4, '#00f0ff');
          gradient.addColorStop(1, '#034159');
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 24;
        } else if (isHovered) {
          gradient.addColorStop(0, '#ffffff');
          gradient.addColorStop(0.5, '#e62429');
          gradient.addColorStop(1, '#2c0b0e');
          ctx.shadowColor = '#e62429';
          ctx.shadowBlur = 18;
        } else {
          gradient.addColorStop(0, '#1e293b');
          gradient.addColorStop(0.7, '#0f172a');
          gradient.addColorStop(1, '#020617');
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(0, 240, 255, 0.2)';
        }

        ctx.fillStyle = gradient;
        ctx.fill();

        // Border
        ctx.strokeStyle = isSelected ? '#00f0ff' : isHovered ? '#ff4d4d' : 'rgba(255,255,255,0.25)';
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.stroke();

        // Node Label
        ctx.fillStyle = '#ffffff';
        ctx.font = `${node.isCenter ? 'bold 12px' : '11px'} Orbitron, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 4;

        // Truncate if long on mobile
        const displayLabel = node.name.length > 13 ? node.name.substring(0, 11) + '..' : node.name;
        ctx.fillText(displayLabel, node.x, node.y);

        ctx.restore();
      });
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [activeSkill, onSelectSkill]);

  return (
    <div className="relative w-full h-[460px] md:h-[540px] select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer touch-none"
        title="Drag tech orbs to pull web fibers, click to inspect"
      />
      <div className="absolute top-2 left-2 text-[11px] font-mono text-cyan-400 bg-black/60 px-2.5 py-1 rounded border border-cyan-500/30">
        NANO-WEB MESH // ELASTIC TENSION PHYSICS
      </div>
      <div className="absolute bottom-2 right-2 text-[11px] font-mono text-slate-400 bg-black/60 px-2.5 py-1 rounded border border-slate-800">
        Drag or click orbs to inspect proficiency
      </div>
    </div>
  );
}

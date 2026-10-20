import React, { useEffect, useRef, useState } from 'react';
import { skillsData } from '../../data/portfolioData';
import { soundEngine } from '../ui/AudioController';
import { observeVisibility } from '../../utils/webglHelper';

export default function SpiderWebCanvas({ onSelectSkill, activeSkill: parentActiveSkill }) {
  const canvasRef = useRef(null);
  const [internalActiveSkill, setInternalActiveSkill] = useState(skillsData[0]);

  const activeSkill = parentActiveSkill || internalActiveSkill;
  const activeSkillRef = useRef(activeSkill);
  useEffect(() => {
    activeSkillRef.current = activeSkill;
  }, [activeSkill]);

  const onSelectSkillRef = useRef(onSelectSkill);
  useEffect(() => {
    onSelectSkillRef.current = onSelectSkill;
  }, [onSelectSkill]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = null;
    let isVisible = true;

    const parent = canvas.parentElement;
    let width = (canvas.width = parent ? parent.clientWidth : 400);
    let height = (canvas.height = parent ? parent.clientHeight : 460);

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      layoutNodes();
    };
    window.addEventListener('resize', onResize, { passive: true });

    // Node Positions
    let nodes = [];
    const layoutNodes = () => {
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.36;

      nodes = skillsData.map((skill, index) => {
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

    // Mouse & Touch Interaction without React state updates in loop
    const mouse = { x: -1000, y: -1000, isDown: false, draggedNode: null, hoveredNode: null };

    const updatePointerPos = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;

      let found = null;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        if (dx * dx + dy * dy < (node.radius + 6) * (node.radius + 6)) {
          found = node;
          break;
        }
      }
      mouse.hoveredNode = found;
    };

    const handlePointerDown = (clientX, clientY) => {
      updatePointerPos(clientX, clientY);
      soundEngine.playHudClick();
      mouse.isDown = true;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        if (dx * dx + dy * dy < (node.radius + 10) * (node.radius + 10)) {
          mouse.draggedNode = node;
          setInternalActiveSkill(node);
          if (onSelectSkillRef.current) onSelectSkillRef.current(node);
          soundEngine.playHologramChime();
          break;
        }
      }
    };

    const handlePointerUp = () => {
      mouse.isDown = false;
      mouse.draggedNode = null;
    };

    // Mouse Event Listeners
    const onMouseMove = (e) => updatePointerPos(e.clientX, e.clientY);
    const onMouseDown = (e) => handlePointerDown(e.clientX, e.clientY);
    const onMouseUp = () => handlePointerUp();

    // Touch Event Listeners (Enables full mobile interactivity!)
    const onTouchStart = (e) => {
      if (e.touches.length > 0) {
        handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        updatePointerPos(e.touches[0].clientX, e.touches[0].clientY);
        if (mouse.draggedNode) {
          e.preventDefault(); // Prevent page scroll while dragging a web node
        }
      }
    };
    const onTouchEnd = () => handlePointerUp();

    canvas.addEventListener('mousemove', onMouseMove, { passive: true });
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    // Animation Loop with Spring Tension Physics
    let step = 0;
    const animate = () => {
      if (!isVisible) {
        animationId = null;
        return;
      }

      animationId = requestAnimationFrame(animate);
      step += 0.03;
      ctx.clearRect(0, 0, width, height);

      const currentActive = activeSkillRef.current;
      const hovered = mouse.hoveredNode;

      // Physics: drag & spring return
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (mouse.draggedNode === node) {
          node.x = mouse.x;
          node.y = mouse.y;
        } else {
          const k = 0.08;
          const damping = 0.82;
          const fx = (node.baseX - node.x) * k;
          const fy = (node.baseY - node.y) * k;

          node.vx = (node.vx + fx) * damping;
          node.vy = (node.vy + fy) * damping;

          node.x += node.vx;
          node.y += node.vy;

          const mdx = node.x - mouse.x;
          const mdy = node.y - mouse.y;
          const mdistSq = mdx * mdx + mdy * mdy;
          if (mdistSq < 6400 && mdistSq > 0) {
            const mdist = Math.sqrt(mdistSq);
            const push = (80 - mdist) * 0.08;
            node.x += (mdx / mdist) * push;
            node.y += (mdy / mdist) * push;
          }
        }
      }

      // 1. Draw Spider Web Strands
      const center = nodes[0];
      if (center) {
        // Radial Web Lines
        for (let i = 1; i < nodes.length; i++) {
          const target = nodes[i];
          const isConnectedToActive = currentActive && (currentActive.name === center.name || currentActive.name === target.name);

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(center.x, center.y);

          const midX = (center.x + target.x) * 0.5;
          const midY = (center.y + target.y) * 0.5 + Math.sin(step + i) * 3;
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
          const isLatticeActive = currentActive && (currentActive.name === curr.name || currentActive.name === next.name);

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(curr.x, curr.y);
          const midX = (curr.x + next.x) * 0.5;
          const midY = (curr.y + next.y) * 0.5 + Math.cos(step + i) * 2;
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
        const ratios = [0.35, 0.65];
        for (let rIdx = 0; rIdx < ratios.length; rIdx++) {
          const ratio = ratios[rIdx];
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
        }
      }

      // 2. Draw Interactive Tech Orbs
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const isSelected = currentActive && currentActive.name === node.name;
        const isHovered = hovered && hovered.name === node.name;

        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

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
          ctx.shadowBlur = 20;
        } else if (isHovered) {
          gradient.addColorStop(0, '#ffffff');
          gradient.addColorStop(0.5, '#e62429');
          gradient.addColorStop(1, '#2c0b0e');
          ctx.shadowColor = '#e62429';
          ctx.shadowBlur = 16;
        } else {
          gradient.addColorStop(0, '#1e293b');
          gradient.addColorStop(0.7, '#0f172a');
          gradient.addColorStop(1, '#020617');
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(0, 240, 255, 0.2)';
        }

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = isSelected ? '#00f0ff' : isHovered ? '#ff4d4d' : 'rgba(255,255,255,0.25)';
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = `${node.isCenter ? 'bold 12px' : '11px'} Orbitron, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 4;

        const displayLabel = node.name.length > 13 ? node.name.substring(0, 11) + '..' : node.name;
        ctx.fillText(displayLabel, node.x, node.y);

        ctx.restore();
      }
    };

    // Pause/Resume loop on scroll & visibility
    const disconnectObserver = observeVisibility(canvas, (visible) => {
      isVisible = visible;
      if (visible && !animationId) {
        animate();
      }
    });

    animate();

    return () => {
      disconnectObserver();
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

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

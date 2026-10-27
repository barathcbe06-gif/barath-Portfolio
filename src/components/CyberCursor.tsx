import React, { useEffect, useState } from 'react';

export const CyberCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop mouse devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('[role="button"]') ||
        target?.closest('.interactive-target')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="cyber-cursor-target"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
    >
      {/* Outer Reticle Ring */}
      <div
        style={{
          width: isHovered ? '48px' : isClicking ? '26px' : '36px',
          height: isHovered ? '48px' : isClicking ? '26px' : '36px',
          borderRadius: '50%',
          border: isHovered
            ? '1.5px solid #00f0ff'
            : '1px dashed rgba(239, 68, 68, 0.75)',
          boxShadow: isHovered
            ? '0 0 12px rgba(0, 240, 255, 0.75)'
            : '0 0 8px rgba(239, 68, 68, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
        }}
      >
        {/* Center Target Dot */}
        <div
          style={{
            width: isClicking ? '8px' : '4px',
            height: isClicking ? '8px' : '4px',
            borderRadius: '50%',
            backgroundColor: isHovered ? '#00f0ff' : '#ef4444',
            boxShadow: isHovered
              ? '0 0 8px #00f0ff'
              : '0 0 6px #ef4444',
            transition: 'all 0.12s ease',
          }}
        />

        {/* Crosshair Ticks */}
        <div
          style={{
            position: 'absolute',
            top: '-4px',
            width: '1px',
            height: '4px',
            backgroundColor: isHovered ? '#00f0ff' : '#ef4444',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-4px',
            width: '1px',
            height: '4px',
            backgroundColor: isHovered ? '#00f0ff' : '#ef4444',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '-4px',
            width: '4px',
            height: '1px',
            backgroundColor: isHovered ? '#00f0ff' : '#ef4444',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '-4px',
            width: '4px',
            height: '1px',
            backgroundColor: isHovered ? '#00f0ff' : '#ef4444',
          }}
        />
      </div>

      {/* Target Label: BARATH */}
      <div
        style={{
          position: 'absolute',
          top: isHovered ? '28px' : '22px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-hud)',
          fontSize: '0.58rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          color: isHovered ? '#00f0ff' : 'rgba(239, 68, 68, 0.85)',
          textShadow: isHovered
            ? '0 0 6px rgba(0, 240, 255, 0.8)'
            : '0 0 4px rgba(239, 68, 68, 0.6)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        BARATH
      </div>
    </div>
  );
};

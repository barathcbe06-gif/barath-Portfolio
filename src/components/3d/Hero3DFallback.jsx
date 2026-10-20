import React from 'react';

/**
 * Lightweight, GPU-efficient SVG/CSS superhero visual fallback
 * Displays if WebGL is unavailable, fails, or during initial Suspense hydration.
 * Matches exact styling, theme colors, and aesthetic fidelity of the 3D canvases.
 */
export default function Hero3DFallback({ type = 'iron-man', label }) {
  if (type === 'iron-man') {
    return (
      <div className="relative w-full h-[540px] md:h-[640px] lg:h-[700px] flex items-center justify-center select-none overflow-hidden">
        {/* Holographic Glowing Outer Rings */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
          {/* Animated SVG Arc Reactor */}
          <svg className="w-full h-full animate-spin" style={{ animationDuration: '24s' }} viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.6" />
            <circle cx="100" cy="100" r="75" fill="none" stroke="#e62429" strokeWidth="2" strokeDasharray="12,8" opacity="0.5" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#f5b041" strokeWidth="1.5" opacity="0.7" />
          </svg>

          {/* Core Arc Reactor Emblem */}
          <div className="absolute inset-0 m-auto w-36 h-36 rounded-full bg-gradient-to-tr from-cyan-950 via-[#041d2c] to-cyan-900 border-2 border-cyan-400 shadow-[0_0_50px_rgba(0,240,255,0.7)] flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-amber-300 animate-spin" style={{ animationDuration: '10s' }} />
            <div className="absolute w-10 h-10 rounded-full bg-cyan-300 shadow-[0_0_25px_#00f0ff] animate-pulse" />
          </div>

          {/* Mark LXXXV Crest */}
          <div className="absolute -bottom-8 px-4 py-1 rounded-full bg-black/60 border border-cyan-500/40 text-[11px] font-mono text-cyan-300">
            {label || 'MARK LXXXV // ARC CORE ONLINE'}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'mystic-rings') {
    return (
      <div className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center select-none">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          <svg className="w-full h-full animate-spin" style={{ animationDuration: '16s' }} viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="85" fill="none" stroke="#ff8c00" strokeWidth="2" strokeDasharray="8,6" opacity="0.8" />
            <circle cx="100" cy="100" r="68" fill="none" stroke="#ffd700" strokeWidth="1.5" strokeDasharray="14,10" opacity="0.9" />
            <polygon points="100,20 180,100 100,180 20,100" fill="none" stroke="#ffaa00" strokeWidth="1.5" opacity="0.7" />
            <polygon points="43,43 157,43 157,157 43,157" fill="none" stroke="#ff8c00" strokeWidth="1" opacity="0.6" />
          </svg>
          <div className="absolute w-12 h-12 rounded-full bg-amber-400/30 border border-amber-400 animate-pulse shadow-[0_0_30px_#ff8c00]" />
          <div className="absolute bottom-2 text-center text-[11px] font-mono text-amber-300/80">
            ✦ KAMAR-TAJ ELDRITCH MANDALA MATRIX ✦
          </div>
        </div>
      </div>
    );
  }

  if (type === 'shield') {
    return (
      <div className="relative w-full h-[360px] md:h-[440px] flex items-center justify-center select-none">
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#b5121b] border-4 border-slate-300 shadow-[0_0_40px_rgba(46,134,222,0.4)] flex items-center justify-center">
            <div className="w-4/5 h-4/5 rounded-full bg-[#d8dde3] flex items-center justify-center">
              <div className="w-3/5 h-3/5 rounded-full bg-[#b5121b] flex items-center justify-center">
                <div className="w-2/5 h-2/5 rounded-full bg-[#0f3460] flex items-center justify-center shadow-inner">
                  <span className="text-2xl text-slate-100 drop-shadow-[0_0_8px_#00f0ff]">★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-72 flex items-center justify-center bg-black/40 rounded-2xl border border-cyan-500/20">
      <div className="text-xs font-mono text-cyan-400 animate-pulse">
        STARK HUD VISUAL ENGINE READY
      </div>
    </div>
  );
}

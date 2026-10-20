import React, { useState } from 'react';
import MysticRingsCanvas from '../3d/MysticRingsCanvas';
import { soundEngine } from '../ui/AudioController';
import { Compass, Sparkles, Database, BarChart3, Binary, Layers } from 'lucide-react';

export default function DoctorStrangeSection() {
  const [activeDimension, setActiveDimension] = useState('TENSORS');

  const dimensions = [
    {
      id: 'TENSORS',
      name: 'MULTIVARIATE TENSORS',
      desc: 'Multidimensional array manipulation with NumPy and Pandas. Matrix decomposition, dot products, and high-rank tensor transformations.',
      icon: Binary,
      formula: 'T_{ijk} = \\sum W_{il} X_{ljk}'
    },
    {
      id: 'EDA',
      name: 'EXPLORATORY DATA ANALYSIS',
      desc: 'Decoding chaotic raw data through statistical distributions, kurtosis, skewness normalization, and variance inflation factor analysis.',
      icon: BarChart3,
      formula: '\\sigma = \\sqrt{\\frac{1}{N}\\sum (x_i - \\mu)^2}'
    },
    {
      id: 'SPATIAL',
      name: 'GEOSPATIAL INTELLIGENCE',
      desc: 'Spatial-temporal modeling for environmental risk. Coordinate projection, satellite raster classification, and climate anomaly mapping.',
      icon: Compass,
      formula: 'I = \\frac{N}{\\sum w_{ij}} \\frac{\\sum w_{ij}(x_i - \\bar{x})(x_j - \\bar{x})}{\\sum(x_i - \\bar{x})^2}'
    },
    {
      id: 'LATENT',
      name: 'DIMENSIONALITY REDUCTION',
      desc: 'Compressing complex high-dimensional feature spaces into orthogonal principal components (PCA, t-SNE) preserving 95%+ variance.',
      icon: Layers,
      formula: 'X = U \\Sigma V^T'
    }
  ];

  const currentDim = dimensions.find((d) => d.id === activeDimension) || dimensions[0];

  const handleSelectDimension = (id) => {
    soundEngine.playMysticRing();
    setActiveDimension(id);
  };

  return (
    <section id="data-science" className="relative py-24 bg-[#05060f] overflow-hidden border-t border-amber-900/40">
      {/* Mystic Orange & Gold Mandala Ambient Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/40 text-xs font-mono text-amber-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>KAMAR-TAJ ARCHIVES // DOCTOR STRANGE INITIATIVE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Orbitron'] text-white tracking-wide">
            MYSTIC ARTS OF DATA SCIENCE
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-['Rajdhani'] leading-relaxed">
            "I went forward in time... to view 14,000,605 data permutations." 
            Translating complex statistical chaos into crystallized, predictive clarity through exploratory analysis and mathematical tensors.
          </p>
        </div>

        {/* 2-Column Section: Left = 3D Mystic Rings Canvas, Right = Dimension Selector & Mathematical Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 3D Eldritch Data Rings Canvas */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="w-full glass-panel-gold rounded-3xl p-4 border border-amber-500/30 relative overflow-hidden shadow-[0_0_50px_rgba(255,140,0,0.15)]">
              {/* Background Runes Glow */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-amber-400/60">
                SLING-RING DATA MATRIX // EYE OF AGAMOTTO ACTIVE
              </div>
              <MysticRingsCanvas activeDimension={activeDimension} />
            </div>
          </div>

          {/* Right: Dimension Selector & Statistical Dossier */}
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400" />
              SELECT DATA DIMENSION
            </div>

            {/* Dimension Selection Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              {dimensions.map((dim) => {
                const isSelected = activeDimension === dim.id;
                const Icon = dim.icon;
                return (
                  <button
                    key={dim.id}
                    onClick={() => handleSelectDimension(dim.id)}
                    className={`p-3 rounded-xl text-left border transition-all duration-200 flex items-center gap-3 ${
                      isSelected
                        ? 'bg-amber-950/60 border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(255,140,0,0.3)]'
                        : 'bg-black/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isSelected ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
                    <div>
                      <div className="text-xs font-['Orbitron'] font-bold">{dim.id}</div>
                      <div className="text-[10px] font-mono opacity-80 truncate">{dim.name}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Dimension Deep Dive Card */}
            <div className="glass-panel-gold p-6 rounded-2xl border-2 border-amber-500/40 space-y-4">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                <span className="text-sm font-['Orbitron'] font-bold text-amber-300">
                  {currentDim.name}
                </span>
                <span className="text-[11px] font-mono text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-500/40">
                  14,000,605 SIMS
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                {currentDim.desc}
              </p>

              {/* Mathematical Formula Rune */}
              <div className="p-3 bg-black/60 rounded-xl border border-amber-900/60 font-mono text-center">
                <div className="text-[10px] text-amber-500 uppercase tracking-widest mb-1">
                  EVALUATED MATHEMATICAL FORMULA
                </div>
                <code className="text-sm font-bold text-amber-300">
                  {currentDim.formula}
                </code>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="p-2 bg-black/30 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">CONFIDENCE</span>
                  <span className="text-amber-400 font-bold">99.4%</span>
                </div>
                <div className="p-2 bg-black/30 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">P-VALUE</span>
                  <span className="text-emerald-400 font-bold">&lt; 0.001</span>
                </div>
                <div className="p-2 bg-black/30 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">TENSORS</span>
                  <span className="text-cyan-400 font-bold">RANK-4</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

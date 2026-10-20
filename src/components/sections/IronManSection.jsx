import React, { useState } from 'react';
import { aiProtocols } from '../../data/portfolioData';
import { soundEngine } from '../ui/AudioController';
import { Cpu, Zap, Activity, Sliders, Shield, Play } from 'lucide-react';

export default function IronManSection() {
  const [learningRate, setLearningRate] = useState(0.001);
  const [epochs, setEpochs] = useState(50);
  const [batchSize, setBatchSize] = useState(32);
  const [isTraining, setIsTraining] = useState(false);
  const [lossValue, setLossValue] = useState(0.024);
  const [accuracy, setAccuracy] = useState(98.8);

  const simulateTraining = () => {
    soundEngine.playArcReactorSurge();
    setIsTraining(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setLossValue((prev) => Math.max(0.005, Number((prev * 0.88).toFixed(4))));
      setAccuracy((prev) => Math.min(99.6, Number((prev + 0.15).toFixed(1))));
      if (step > 6) {
        clearInterval(interval);
        setIsTraining(false);
        soundEngine.playHologramChime();
      }
    }, 200);
  };

  return (
    <section id="ai-ml" className="relative py-24 bg-[#040814] overflow-hidden border-t border-cyan-900/40">
      {/* Ambient Arc Core & Crimson Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/40 border border-red-500/40 text-xs font-mono text-red-400">
            <Cpu className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>STARK R&D AI PROTOCOLS // IRON MAN INITIATIVE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Orbitron'] text-white tracking-wide">
            NEURAL INTELLIGENCE & MACHINE LEARNING
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-['Rajdhani'] leading-relaxed">
            Engineering cognitive AI architectures, deep learning models, and automated predictive algorithms with mathematical rigor and production efficiency.
          </p>
        </div>

        {/* 2-Column Hologram Dashboard: Left = Architecture Pillars, Right = Live Training Simulator HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: AI & ML Architecture Pillars */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono text-cyan-400/80 uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              DEPLOYED NEURAL CAPABILITIES
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aiProtocols.map((protocol) => (
                <div
                  key={protocol.id}
                  className="group relative glass-panel p-5 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-500/30">
                      {protocol.level}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-cyan-400 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                  </div>

                  <h3 className="text-base font-bold font-['Orbitron'] text-white group-hover:text-cyan-300 transition-colors">
                    {protocol.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-mono mt-2 leading-relaxed">
                    {protocol.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-1.5">
                    {protocol.specs.map((spec) => (
                      <span key={spec} className="text-[10px] font-mono text-cyan-400/90 bg-cyan-950/40 px-2 py-0.5 rounded">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Stark AI Model Simulator */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 rounded-2xl border-2 border-cyan-500/40 shadow-[0_0_35px_rgba(0,240,255,0.15)] relative space-y-6">
              
              {/* Simulator Header */}
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span className="font-['Orbitron'] text-xs font-bold text-cyan-300 tracking-wider">
                    JARVIS MODEL TRAINING HUD
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                  {isTraining ? 'TRAINING ACTIVE' : 'READY'}
                </span>
              </div>

              {/* Live Neural Metrics Display */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/50 p-3 rounded-xl border border-cyan-500/30">
                  <div className="text-[10px] font-mono text-slate-400">LOSS FUNCTION</div>
                  <div className="text-2xl font-bold font-['Orbitron'] text-amber-400 mt-1">
                    {lossValue}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Categorical Cross-Entropy</div>
                </div>

                <div className="bg-black/50 p-3 rounded-xl border border-cyan-500/30">
                  <div className="text-[10px] font-mono text-slate-400">ACCURACY</div>
                  <div className="text-2xl font-bold font-['Orbitron'] text-emerald-400 mt-1">
                    {accuracy}%
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Validation Split: 0.2</div>
                </div>
              </div>

              {/* Interactive Parameter Sliders */}
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>LEARNING RATE (η):</span>
                    <span className="text-cyan-300 font-bold">{learningRate}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0001"
                    max="0.01"
                    step="0.0001"
                    value={learningRate}
                    onChange={(e) => setLearningRate(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>EPOCHS:</span>
                    <span className="text-cyan-300 font-bold">{epochs}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="10"
                    value={epochs}
                    onChange={(e) => setEpochs(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>BATCH SIZE:</span>
                    <span className="text-cyan-300 font-bold">{batchSize}</span>
                  </div>
                  <input
                    type="range"
                    min="16"
                    max="128"
                    step="16"
                    value={batchSize}
                    onChange={(e) => setBatchSize(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={simulateTraining}
                disabled={isTraining}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-cyan-600 hover:from-red-500 hover:to-cyan-500 text-white font-['Orbitron'] text-xs font-bold tracking-widest transition-all shadow-[0_0_20px_rgba(230,36,41,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Play className={`w-3.5 h-3.5 ${isTraining ? 'animate-spin' : ''}`} />
                <span>{isTraining ? 'OPTIMIZING WEIGHTS...' : 'RUN NEURAL SIMULATION'}</span>
              </button>

              <div className="text-[11px] font-mono text-center text-slate-400">
                Simulates real-time SGD backpropagation & gradient descent
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

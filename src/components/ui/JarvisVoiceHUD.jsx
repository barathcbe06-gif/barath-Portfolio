import React, { useState } from 'react';
import { X, Zap, ShieldCheck, Terminal, RefreshCw } from 'lucide-react';
import { soundEngine } from './AudioController';

export default function JarvisVoiceHUD({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('SYSTEM');
  const [simRunning, setSimRunning] = useState(false);
  const [logMessages, setLogMessages] = useState([
    "INITIALIZING STARK INDUSTRIES PROTOCOL...",
    "ARC CORE ONLINE // 3.2 GIGAWATTS",
    "NEURAL WEIGHTS LOADED: PYTORCH & SCIKIT-LEARN",
    "BARATH PORTFOLIO ARCHITECTURE: VERIFIED",
    "S.H.I.E.L.D. DATA CLEARANCE: LEVEL 8 CONFIRMED"
  ]);

  if (!isOpen) return null;

  const runSimulation = () => {
    soundEngine.playRepulsorBlast();
    setSimRunning(true);
    setLogMessages((prev) => [...prev, ">> INITIATING MULTIMODAL INFERENCE CYCLE..."]);

    setTimeout(() => {
      soundEngine.playHologramChime();
      setLogMessages((prev) => [
        ...prev,
        ">> OPTIMIZING TENSOR BACKPROPAGATION GRADIENTS...",
        ">> CONVERGENCE REACHED: ACCURACY 99.1%",
        ">> DATALENS & TERRAMIND TELEMETRY SYNCED"
      ]);
      setSimRunning(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#070d18] border-2 border-cyan-500/60 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.3)]">
        
        {/* Hologram Header */}
        <div className="bg-gradient-to-r from-cyan-950 via-[#0a1628] to-slate-900 px-6 py-4 border-b border-cyan-500/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-cyan-400 animate-ping" />
            <div>
              <h3 className="font-['Orbitron'] text-base font-bold text-cyan-300 tracking-wider">
                J.A.R.V.I.S. // TACTICAL DIAGNOSTIC HUD
              </h3>
              <p className="text-[11px] font-mono text-cyan-500">
                STARK INDUSTRIES ADVANCED TELEMETRY OS v8.5
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playHudClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-cyan-950/40 text-cyan-400 hover:text-white hover:bg-red-950/60 transition-all border border-cyan-500/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-cyan-500/20 bg-black/40 px-6 pt-2 gap-4 text-xs font-mono">
          {['SYSTEM', 'NEURAL MODEL', 'PROTOCOLS'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                soundEngine.playHudClick();
                setActiveTab(tab);
              }}
              className={`pb-2.5 tracking-wider transition-all border-b-2 ${
                activeTab === tab
                  ? 'border-cyan-400 text-cyan-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {activeTab === 'SYSTEM' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="glass-panel p-3 rounded-lg border border-cyan-500/30">
                  <div className="text-[10px] font-mono text-slate-400">REACTOR OUTPUT</div>
                  <div className="text-xl font-bold font-['Orbitron'] text-cyan-300">3.2 GW</div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-1">● 99.8% Efficiency</div>
                </div>
                <div className="glass-panel p-3 rounded-lg border border-cyan-500/30">
                  <div className="text-[10px] font-mono text-slate-400">NEURAL TENSORS</div>
                  <div className="text-xl font-bold font-['Orbitron'] text-amber-300">1.8M OPS</div>
                  <div className="text-[10px] text-cyan-400 font-mono mt-1">● Low Latency</div>
                </div>
                <div className="glass-panel p-3 rounded-lg border border-cyan-500/30 col-span-2 sm:col-span-1">
                  <div className="text-[10px] font-mono text-slate-400">CLEARANCE</div>
                  <div className="text-xl font-bold font-['Orbitron'] text-red-400">LEVEL 8</div>
                  <div className="text-[10px] text-slate-300 font-mono mt-1">● S.H.I.E.L.D. Approved</div>
                </div>
              </div>

              {/* Live Terminal Log */}
              <div className="bg-black/80 rounded-lg p-3 border border-cyan-900/60 font-mono text-xs text-cyan-400 h-36 overflow-y-auto space-y-1">
                <div className="flex items-center gap-2 text-slate-500 pb-1 border-b border-slate-800">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>J.A.R.V.I.S. REAL-TIME LOGS</span>
                </div>
                {logMessages.map((msg, i) => (
                  <div key={i} className="leading-relaxed">
                    <span className="text-cyan-600 font-semibold">[{i+1}]</span> {msg}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'NEURAL MODEL' && (
            <div className="space-y-4">
              <div className="glass-panel p-4 rounded-lg border border-cyan-500/30 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300">Barath AI Pipeline Architecture</span>
                  <span className="text-emerald-400">ACTIVE IN MEMORY</span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-cyan-900">
                  <div className="bg-gradient-to-r from-cyan-500 to-amber-500 h-full w-[94%] animate-pulse" />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Data Ingestion: 100%</span>
                  <span>Feature Extraction: 98%</span>
                  <span>Inference: 99.2%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-black/40 rounded border border-slate-800">
                  <span className="text-slate-400 block">Primary Stack:</span>
                  <span className="text-cyan-300 font-semibold">Python, PyTorch, Scikit-Learn</span>
                </div>
                <div className="p-3 bg-black/40 rounded border border-slate-800">
                  <span className="text-slate-400 block">Database Layer:</span>
                  <span className="text-amber-300 font-semibold">SQL, Relational DBMS</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'PROTOCOLS' && (
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 bg-cyan-950/30 border border-cyan-500/30 rounded flex items-center justify-between">
                <div>
                  <div className="text-cyan-300 font-bold">HOUSE PARTY PROTOCOL</div>
                  <div className="text-slate-400 text-[11px]">Deploy automated predictive models across all nodes</div>
                </div>
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded flex items-center justify-between">
                <div>
                  <div className="text-amber-300 font-bold">VERONICA SATELLITE LINK</div>
                  <div className="text-slate-400 text-[11px]">Orbital environmental tracking for TerraMind AI</div>
                </div>
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-black/60 px-6 py-3 border-t border-cyan-500/30 flex items-center justify-between">
          <button
            onClick={runSimulation}
            disabled={simRunning}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white rounded font-['Orbitron'] text-xs font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${simRunning ? 'animate-spin' : ''}`} />
            <span>{simRunning ? 'CALCULATING...' : 'RUN INFERENCE CYCLE'}</span>
          </button>

          <span className="text-[11px] font-mono text-cyan-400/80 hidden sm:inline">
            Status: ALL SYSTEMS GO
          </span>
        </div>
      </div>
    </div>
  );
}

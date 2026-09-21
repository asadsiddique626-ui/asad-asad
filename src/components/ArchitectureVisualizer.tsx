import React, { useState } from 'react';
import { ARCHITECTURE_NODES } from '../data/protocolData';
import { ArchitectureNode } from '../types';
import { ArrowRight, Play, CheckCircle2, Shield, Cpu, Database, Network, Scale, Zap, Info, Terminal } from 'lucide-react';

export const ArchitectureVisualizer: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(ARCHITECTURE_NODES[0]);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const handleSimulateFlow = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStepIndex(0);
    setSelectedNode(ARCHITECTURE_NODES[0]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < ARCHITECTURE_NODES.length) {
        setActiveStepIndex(step);
        setSelectedNode(ARCHITECTURE_NODES[step]);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1400);
  };

  const getLayerIcon = (layer: string) => {
    switch (layer) {
      case 'Client': return <Terminal className="w-4 h-4 text-sky-400" />;
      case 'Protocol': return <Shield className="w-4 h-4 text-indigo-400" />;
      case 'Blockchain': return <Database className="w-4 h-4 text-purple-400" />;
      case 'Oracle': return <Network className="w-4 h-4 text-amber-400" />;
      case 'AI': return <Cpu className="w-4 h-4 text-emerald-400" />;
      case 'Governance': return <Scale className="w-4 h-4 text-pink-400" />;
      default: return <Zap className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <section id="architecture" className="py-16 border-b border-slate-800/80 bg-[#07090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
              <span>SYSTEM ARCHITECTURE & PROTOCOL LIFECYCLE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              End-to-End Arbitration Topology
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              How decentralized smart contracts, Chainlink off-chain compute oracles, multi-modal AI models, and staked DAO juries interlock seamlessly.
            </p>
          </div>

          <button
            onClick={handleSimulateFlow}
            disabled={isSimulating}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 border ${
              isSimulating
                ? 'bg-indigo-950/50 text-indigo-300 border-indigo-500/40 cursor-wait'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400/30 shadow-lg shadow-indigo-600/20'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Simulating Pipeline Flow...' : 'Simulate Protocol Flow'}</span>
          </button>
        </div>

        {/* Interactive Architecture Flow Ribbon */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
          {/* Node Grid Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {ARCHITECTURE_NODES.map((node, idx) => {
              const isSelected = selectedNode.id === node.id;
              const isStepActive = activeStepIndex === idx;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3.5 rounded-xl cursor-pointer border transition-all text-left relative flex flex-col justify-between ${
                    isSelected || isStepActive
                      ? 'bg-indigo-950/60 border-indigo-400 shadow-md shadow-indigo-500/20 ring-2 ring-indigo-500/30'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  {/* Step number badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
                      0{idx + 1}
                    </span>
                    {getLayerIcon(node.layer)}
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                      {node.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{node.role}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-indigo-300">{node.latency}</span>
                    <span className="text-slate-500 font-sans">{node.layer}</span>
                  </div>

                  {isStepActive && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Node Deep Dive Panel */}
          {selectedNode && (
            <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-2 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {selectedNode.layer} Layer
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Latency Benchmark: {selectedNode.latency}</span>
                </div>

                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {selectedNode.title}
                  <span className="text-xs text-slate-400 font-normal">({selectedNode.role})</span>
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedNode.description}
                </p>

                {/* Technical specifics based on selected node */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
                  <div className="text-slate-400 font-semibold uppercase text-[10px]">Protocol Specifications:</div>
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400">Core Technology:</span>
                    <span className="text-white">{selectedNode.tech}</span>
                  </div>
                  {selectedNode.id === 'client-app' && (
                    <div className="text-slate-400">Integration: Embed via <code>@witness-protocol/sdk</code> with auto-escrow hooks.</div>
                  )}
                  {selectedNode.id === 'witness-contract' && (
                    <div className="text-slate-400">Security: OpenZeppelin ReentrancyGuard + 72hr inactivity timelock recovery.</div>
                  )}
                  {selectedNode.id === 'chainlink-oracle' && (
                    <div className="text-slate-400">Oracle: Off-chain computation with DON cryptographic threshold signatures.</div>
                  )}
                  {selectedNode.id === 'ai-arbiter' && (
                    <div className="text-slate-400">Model: Gemini 3.8 Flash / Claude API returning structured verdict JSON + confidence score.</div>
                  )}
                  {selectedNode.id === 'routing-router' && (
                    <div className="text-slate-400">Condition: <code>if (confidence &gt; 85% &amp;&amp; amount &lt; $1,000) autoExecute() else escalate()</code></div>
                  )}
                  {selectedNode.id === 'jury-pool' && (
                    <div className="text-slate-400">Incentive: Majority voters earn dispute fees; incoherent voters face 5% stake slashing.</div>
                  )}
                  {selectedNode.id === 'execution-layer' && (
                    <div className="text-slate-400">Settlement: Automated on-chain atomic payout on Polygon PoS in USDC/USDT/MATIC.</div>
                  )}
                </div>
              </div>

              {/* Protocol Flow Logic Summary */}
              <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/40 text-xs space-y-3">
                <div className="flex items-center gap-2 text-indigo-300 font-bold">
                  <Info className="w-4 h-4" />
                  <span>The Routing Decision Gate</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40">
                    <span className="text-emerald-300 font-bold block text-[11px]">Path A: Instant AI Execution</span>
                    <span className="text-slate-300 text-[11px]">
                      Confidence &gt; 85% <strong className="text-white">AND</strong> Amount &lt; $1,000 USD. Resolves in 1.8 seconds.
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-800/40">
                    <span className="text-purple-300 font-bold block text-[11px]">Path B: Staked DAO Escalation</span>
                    <span className="text-slate-300 text-[11px]">
                      Confidence &le; 85% <strong className="text-white">OR</strong> Amount &ge; $1,000 USD. Vetted human jurors deliberate.
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  This dual-routing structure eliminates 88% of human jury bottleneck while preserving ironclad neutrality for high-stakes sums.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

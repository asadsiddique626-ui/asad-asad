import React from 'react';
import { CheckCircle2, Circle, Clock, ArrowRight, Shield, Zap, Layers, Network } from 'lucide-react';

export const Roadmap: React.FC = () => {
  const phases = [
    {
      phase: 'Phase 1',
      tag: 'COMPLETED & LIVE',
      title: 'Core Protocol MVP & Testnet',
      status: 'completed',
      timeframe: 'Q1 – Q2 2026',
      icon: <Zap className="w-4 h-4 text-emerald-400" />,
      items: [
        'Minimal Proxy EscrowFactory.sol deployed on Polygon Amoy testnet',
        'Chainlink Functions DON off-chain compute bridge connection',
        'AI Arbiter zero-bias prompt schema with structured JSON verdict output',
        'Autonomous fund execution for clear disputes under $1,000 USD',
      ],
    },
    {
      phase: 'Phase 2',
      tag: 'CURRENT FOCUS',
      title: 'Human Jury Chamber & Staking',
      status: 'active',
      timeframe: 'Q3 2026',
      icon: <Shield className="w-4 h-4 text-indigo-400" />,
      items: [
        '$WTNS ERC-20 staking contract with commit-reveal secret balloting',
        'Chainlink VRF randomized juror selection lotteries',
        'Economic slashing mechanism (5% penalty on outlier minority votes)',
        'Juror staking dashboard and yield distribution contracts',
      ],
    },
    {
      phase: 'Phase 3',
      tag: 'UPCOMING',
      title: 'Multi-Chain & Soulbound Reputation',
      status: 'upcoming',
      timeframe: 'Q4 2026',
      icon: <Network className="w-4 h-4 text-purple-400" />,
      items: [
        'Multi-chain contract deployments on Base, Arbitrum One, and Optimism',
        'ReputationRegistry.sol: Soulbound NFT badges tracking dispute win rates',
        'Decentralized IPFS pinning cluster redundancy with Web3.Storage and Pinata',
        'Dynamic escrow fee rebate curves based on on-chain trust scores',
      ],
    },
    {
      phase: 'Phase 4',
      tag: 'ENTERPRISE EXPANSION',
      title: 'B2B SDK & Embedded Arbitration',
      status: 'upcoming',
      timeframe: '2027',
      icon: <Layers className="w-4 h-4 text-sky-400" />,
      items: [
        'General availability of @witness-protocol/sdk for Web2 & Web3 marketplaces',
        'White-label hosted resolution portals for freelance boards and NFT shops',
        'Enterprise fiat ramp integration for non-crypto consumer escrows',
        'Decentralized DAO transition for protocol fee parameters and governance',
      ],
    },
  ];

  return (
    <section id="roadmap" className="py-16 border-b border-slate-800/80 bg-[#07090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>DEVELOPMENT TIMELINE</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white mt-2">
            Protocol Engineering Roadmap
          </h2>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            From testnet MVP to the universal B2B arbitration standard for the decentralized web economy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {phases.map((p, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border flex flex-col justify-between ${
                p.status === 'completed'
                  ? 'bg-slate-900/50 border-emerald-900/40'
                  : p.status === 'active'
                  ? 'bg-indigo-950/30 border-indigo-500/50 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/30'
                  : 'bg-slate-950/40 border-slate-800/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-slate-400">{p.phase}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      p.status === 'completed'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : p.status === 'active'
                        ? 'bg-indigo-950 text-indigo-300 border border-indigo-700'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {p.tag}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  {p.icon}
                  <h3 className="text-base font-bold text-white leading-tight">{p.title}</h3>
                </div>

                <div className="text-[11px] font-mono text-slate-500 mb-4">{p.timeframe}</div>

                <ul className="space-y-2 text-xs text-slate-300">
                  {p.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-1.5">
                      <span className="text-indigo-400 font-bold mt-0.5">•</span>
                      <span className="text-slate-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Milestone 0{idx + 1}</span>
                {p.status === 'completed' && <span className="text-emerald-400 font-semibold">100% Shipped</span>}
                {p.status === 'active' && <span className="text-indigo-400 font-semibold">In Development</span>}
                {p.status === 'upcoming' && <span>Scheduled</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

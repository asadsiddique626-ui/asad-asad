import React from 'react';
import { Shield, Sparkles, Scale, Zap, ArrowRight, CheckCircle2, Clock, DollarSign, Lock, AlertTriangle, Layers } from 'lucide-react';

interface HeroProps {
  onExploreSimulator: () => void;
  onExploreSdk: () => void;
  onExploreArchitecture: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreSimulator,
  onExploreSdk,
  onExploreArchitecture,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-800/60">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-indigo-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[300px] bg-purple-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Eyebrow badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-medium backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
            <span>The Dispute Resolution Primitive for Web3 & Marketplaces</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 font-semibold">Like Stripe for Payments, Witness for Disputes</span>
          </div>
        </div>

        {/* Main headline */}
        <div className="mt-6 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            AI-Assisted Decentralized{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200">
              Arbitration Network
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Small disputes ($50–$5,000) are broken. Traditional courts are unaffordable, marketplace support is biased, and legacy DAO juries take days. Witness resolves clear disputes in <span className="text-indigo-300 font-semibold">seconds with verifiable AI</span>, escalating complex cases to <span className="text-purple-300 font-semibold">staked human juries</span>.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            id="hero-launch-simulator-btn"
            onClick={onExploreSimulator}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/25 hover:shadow-indigo-500/35 transition-all flex items-center justify-center gap-2 group border border-indigo-400/30"
          >
            <Sparkles className="w-4 h-4 text-indigo-200 group-hover:rotate-12 transition-transform" />
            <span>Test Live Dispute Simulator</span>
            <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            id="hero-explore-sdk-btn"
            onClick={onExploreSdk}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-all flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4 text-slate-400" />
            <span>Integrate B2B SDK</span>
          </button>

          <button
            id="hero-architecture-btn"
            onClick={onExploreArchitecture}
            className="w-full sm:w-auto px-5 py-3 rounded-xl text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View Architecture</span>
            <span className="text-slate-600">→</span>
          </button>
        </div>

        {/* Live Protocol Metric Ticker */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Avg AI Verdict Time</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-1 text-2xl font-bold text-white font-mono">1.8s</div>
            <p className="text-[11px] text-emerald-400 mt-0.5">Sub-second via Chainlink DON</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Auto-Execution Rate</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-1 text-2xl font-bold text-white font-mono">88.4%</div>
            <p className="text-[11px] text-slate-400 mt-0.5">For cases &lt; $1,000 &gt; 85% conf.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Total Value Secured</span>
              <Lock className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="mt-1 text-2xl font-bold text-white font-mono">$54.2M</div>
            <p className="text-[11px] text-indigo-300 mt-0.5">Across 42+ partner platforms</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Staked Jury Pool</span>
              <Scale className="w-4 h-4 text-purple-400" />
            </div>
            <div className="mt-1 text-2xl font-bold text-white font-mono">2,840</div>
            <p className="text-[11px] text-purple-300 mt-0.5">Active $WTNS staked jurors</p>
          </div>
        </div>

        {/* 3-Way Problem vs Witness Protocol Solution Matrix */}
        <div className="mt-14 pt-10 border-t border-slate-800/80">
          <div className="text-center mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              The Fundamental Flaw in $50–$5,000 Dispute Resolution
            </h2>
            <p className="text-xl font-bold text-white mt-1">Why Current Alternatives Fail Digital Commerce</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Small Claims Court */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-red-900/30">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Small Claims Courts</span>
              </div>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Filing fees $150–$600 + physical summons</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Takes 3 to 9 months for a trial date</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Border/jurisdiction boundaries prevent cross-border gig enforcement</span>
                </li>
              </ul>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-rose-300/80 font-mono">
                Verdict: Economically impossible
              </div>
            </div>

            {/* Centralized Marketplace Support */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-amber-900/30">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Platform Support (Upwork/Fiverr)</span>
              </div>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">✕</span>
                  <span>Accused of systemic buyer bias to preserve consumer retention</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">✕</span>
                  <span>Opaque customer support tickets with zero on-chain proof</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">✕</span>
                  <span>Arbitrary account freezes without legal recourse</span>
                </li>
              </ul>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-amber-300/80 font-mono">
                Verdict: Conflict of interest
              </div>
            </div>

            {/* Legacy DAO Juries */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-blue-900/30">
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                <Clock className="w-4 h-4" />
                <span>Legacy DAO Juries (Kleros)</span>
              </div>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-500 font-bold">✕</span>
                  <span>Every simple $50 dispute requires 3–7 days of human voting</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-500 font-bold">✕</span>
                  <span>High juror gas overhead on basic binary disputes</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-500 font-bold">✕</span>
                  <span>Slow settlement creates terrible UX for fast e-commerce</span>
                </li>
              </ul>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-blue-300/80 font-mono">
                Verdict: Too slow for internet scale
              </div>
            </div>

            {/* Witness Protocol Solution */}
            <div className="p-5 rounded-2xl bg-indigo-950/40 border-2 border-indigo-500/50 shadow-xl shadow-indigo-950/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-2 py-0.5 bg-indigo-500 text-white text-[9px] font-bold uppercase tracking-wider rounded-bl-lg">
                The Solution
              </div>
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Witness Protocol</span>
              </div>
              <ul className="mt-3 space-y-2 text-xs text-slate-200">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong className="text-white">AI First Filter (1.8s):</strong> Clear cases auto-settle on-chain</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong className="text-white">Staked DAO Escalation:</strong> High-value (&gt;$1K) or ambiguous cases get vetted jurors</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong className="text-white">B2B API Primitive:</strong> Any marketplace plugs in with 3 lines of code</span>
                </li>
              </ul>
              <div className="mt-4 pt-3 border-t border-indigo-500/30 text-[11px] text-emerald-300 font-mono font-semibold">
                Verdict: Instant, neutral & scalable
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

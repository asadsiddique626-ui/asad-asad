import React, { useState } from 'react';
import { Coins, Flame, Percent, TrendingUp, ShieldAlert, Award, ArrowUpRight, Scale } from 'lucide-react';

export const TokenomicsCalculator: React.FC = () => {
  const [stakedAmount, setStakedAmount] = useState<number>(35000);
  const [monthlyCases, setMonthlyCases] = useState<number>(24);
  const [accuracyRate, setAccuracyRate] = useState<number>(94);

  // Math models
  // Average dispute fee pool per case: $35 USDC
  // Reward per correct vote: ~$28 USDC + 15 WTNS
  // Incorrect vote penalty: 5% slash of allocated stake partition
  const correctCases = Math.round((monthlyCases * accuracyRate) / 100);
  const incorrectCases = monthlyCases - correctCases;

  const monthlyUsdcYield = correctCases * 28;
  const monthlyWtnsBonus = correctCases * 15;
  const monthlySlashingLoss = incorrectCases * ((stakedAmount * 0.05) / 50); // small fractional partition

  const netMonthlyUsd = Math.max(0, monthlyUsdcYield + monthlyWtnsBonus * 0.18 - monthlySlashingLoss * 0.18);
  const annualUsd = netMonthlyUsd * 12;
  const estimatedStakedValueUsd = stakedAmount * 0.18; // Assumed $0.18/WTNS reference price
  const apyPercent = estimatedStakedValueUsd > 0 ? ((annualUsd / estimatedStakedValueUsd) * 100).toFixed(1) : '0.0';

  const getTier = (stake: number) => {
    if (stake >= 100000) return { name: 'Chief Arbiter', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
    if (stake >= 50000) return { name: 'Senior Fellow', color: 'text-purple-300 bg-purple-500/10 border-purple-500/30' };
    if (stake >= 20000) return { name: 'Certified Juror', color: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/30' };
    return { name: 'Associate Juror', color: 'text-slate-300 bg-slate-800 border-slate-700' };
  };

  const currentTier = getTier(stakedAmount);

  return (
    <section id="tokenomics" className="py-16 border-b border-slate-800/80 bg-[#07090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Coins className="w-3.5 h-3.5" />
            <span>ECONOMIC MODEL & REVENUE FLYWHEEL</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white mt-2">
            $WTNS Tokenomics & Juror Staking Engine
          </h2>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            A self-sustaining token economy where platform fees fuel continuous buyback-and-burn, while staked jurors earn high-yield arbitration fees for honest consensus.
          </p>
        </div>

        {/* 3 Pillars of $WTNS Utility */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 mb-3">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">1. Jury Staking & Slashing</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Jurors stake $WTNS to be eligible for case selection. Voting with the Schelling majority earns USDC arbitration fees. Voting incoherently slashes 5% of the allocated stake.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-3">
              <Percent className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">2. Low Transaction Take Rate</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Marketplaces pay only 0.5%–0.75% per escrow deal (vs. 3.25%+ on Escrow.com / PayPal). Staking $WTNS provides tiered platform discounts down to 0.25%.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400 mb-3">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">3. Deflationary Fee Burn</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Arbitration filing fees from losing parties are split: 70% to correct jurors, 15% to protocol treasury, and 15% permanently burned from the $WTNS circulating supply.
            </p>
          </div>
        </div>

        {/* Interactive Calculator Section */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-6 border-b border-slate-800 gap-4">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">Interactive Simulator</span>
              <h3 className="text-xl font-bold text-white mt-0.5">Juror APY & Earnings Calculator</h3>
              <p className="text-xs text-slate-400 mt-1">Estimate your staking yields based on accuracy, dispute volume, and stake weight.</p>
            </div>

            <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-2 ${currentTier.color}`}>
              <Award className="w-4 h-4" />
              <span>Status: {currentTier.name}</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Slider 1: Staked Amount */}
              <div>
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span className="text-slate-300 font-semibold">Your $WTNS Staked Balance</span>
                  <span className="font-mono text-indigo-300 font-bold text-sm">
                    {stakedAmount.toLocaleString()} WTNS (~${(stakedAmount * 0.18).toLocaleString()} USD)
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="250000"
                  step="5000"
                  value={stakedAmount}
                  onChange={(e) => setStakedAmount(Number(e.target.value))}
                  className="w-full accent-indigo-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>5,000 (Min Stake)</span>
                  <span>100,000 (Senior)</span>
                  <span>250,000+ (Master)</span>
                </div>
              </div>

              {/* Slider 2: Monthly Cases */}
              <div>
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span className="text-slate-300 font-semibold">Assigned Disputes Judged per Month</span>
                  <span className="font-mono text-purple-300 font-bold text-sm">{monthlyCases} Cases</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="60"
                  step="1"
                  value={monthlyCases}
                  onChange={(e) => setMonthlyCases(Number(e.target.value))}
                  className="w-full accent-purple-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>3 Cases/mo</span>
                  <span>30 Cases/mo</span>
                  <span>60 Cases/mo</span>
                </div>
              </div>

              {/* Slider 3: Accuracy Rate */}
              <div>
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span className="text-slate-300 font-semibold">Juror Consensus Accuracy Alignment</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm">{accuracyRate}% Majority Match</span>
                </div>
                <input
                  type="range"
                  min="65"
                  max="100"
                  step="1"
                  value={accuracyRate}
                  onChange={(e) => setAccuracyRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>65% (Slashing risk)</span>
                  <span>85% (Average)</span>
                  <span>100% (Perfect)</span>
                </div>
              </div>
            </div>

            {/* Live Yield Card (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Projected Staking Returns
              </span>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-mono">
                  ${netMonthlyUsd.toFixed(0)}
                </span>
                <span className="text-xs text-slate-400">/ month net</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Estimated APY</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">{apyPercent}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Annualized Yield</span>
                  <span className="text-lg font-bold text-indigo-300 font-mono">${annualUsd.toFixed(0)}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-900/30 text-[11px] text-slate-300 space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>USDC Arbitration Fees:</span>
                  <span className="text-slate-200 font-mono">+${monthlyUsdcYield}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>WTNS Protocol Bonus:</span>
                  <span className="text-slate-200 font-mono">+{monthlyWtnsBonus} WTNS</span>
                </div>
                {incorrectCases > 0 && (
                  <div className="flex justify-between text-rose-400">
                    <span>Estimated Slashing Penalty:</span>
                    <span className="font-mono">-${(monthlySlashingLoss * 0.18).toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Competitor Fee Comparison Table */}
        <div className="mt-12 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4 font-semibold">Service Provider</th>
                <th className="py-3 px-4 font-semibold">Escrow / Processing Fee</th>
                <th className="py-3 px-4 font-semibold">Avg Resolution Speed</th>
                <th className="py-3 px-4 font-semibold">Dispute Objectivity</th>
                <th className="py-3 px-4 font-semibold">Chargeback Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="bg-indigo-950/30 border-l-2 border-l-indigo-500 font-semibold text-white">
                <td className="py-3.5 px-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>Witness Protocol</span>
                </td>
                <td className="py-3.5 px-4 font-mono text-emerald-400">0.5% – 0.75%</td>
                <td className="py-3.5 px-4 font-mono text-indigo-300">1.8s (AI) / 12h (Jury)</td>
                <td className="py-3.5 px-4">Cryptographic + Staked Consensus</td>
                <td className="py-3.5 px-4 text-emerald-400">0% (Final on Polygon)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-slate-400">Escrow.com</td>
                <td className="py-3 px-4 font-mono">3.25% + Wire Fees ($25)</td>
                <td className="py-3 px-4">3 to 7 Days</td>
                <td className="py-3 px-4">Centralized Staff</td>
                <td className="py-3 px-4 text-slate-400">Low</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-slate-400">PayPal / Stripe Chargeback</td>
                <td className="py-3 px-4 font-mono">3.49% + $0.49 + $15 Dispute Fee</td>
                <td className="py-3 px-4">30 to 90 Days</td>
                <td className="py-3 px-4">Bank Opaque Algorithms</td>
                <td className="py-3 px-4 text-rose-400">Severe (Friendly Fraud)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-slate-400">Kleros (Legacy DAO)</td>
                <td className="py-3 px-4 font-mono">Variable Gas ($30+)</td>
                <td className="py-3 px-4">4 to 8 Days</td>
                <td className="py-3 px-4">Human Voting Only</td>
                <td className="py-3 px-4 text-emerald-400">0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

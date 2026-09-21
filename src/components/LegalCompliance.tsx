import React, { useState } from 'react';
import { LEGAL_CLAUSE_TEMPLATE } from '../data/protocolData';
import { Shield, FileCheck, AlertCircle, Copy, Check, Scale, BookOpen } from 'lucide-react';

export const LegalCompliance: React.FC = () => {
  const [platformName, setPlatformName] = useState<string>('MyPlatform Marketplace');
  const [copiedClause, setCopiedClause] = useState<boolean>(false);

  const dynamicClause = `WITNESS PROTOCOL STANDARD ARBITRATION CLAUSE FOR ${platformName.toUpperCase()}:
"Any dispute, controversy, or claim arising out of or relating to transactions, gig contracts, digital deliverables, or milestone escrows conducted upon ${platformName} shall be submitted to and conclusively resolved by decentralized binding arbitration administered by Witness Protocol (https://witness.network).

The parties irrevocably agree that:
1. For disputes where the total sum in escrow is less than $1,000 USD and where the Witness Protocol AI Arbiter generates a verdict confidence score exceeding eighty-five percent (85%), the decision issued by the off-chain oracle shall be final, non-appealable, and immediately executed on-chain;
2. For claims exceeding $1,000 USD or where the automated confidence threshold is not satisfied, the dispute shall automatically escalate to a panel of vetted decentralized jurors selected from the Witness Staked Juror Pool;
3. Pursuant to the Federal Arbitration Act (9 U.S.C. § 1 et seq.) and the 1958 New York Convention on the Recognition and Enforcement of Foreign Arbitral Awards, this agreement constitutes an express written agreement to arbitrate, and both parties waive all rights to trial by jury or participation in class-action proceedings."`;

  const handleCopy = () => {
    navigator.clipboard.writeText(dynamicClause);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 2000);
  };

  return (
    <section id="legal" className="py-16 border-b border-slate-800/80 bg-[#090b10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5" />
            <span>REGULATORY COMPLIANCE & LEGAL ENFORCEABILITY</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white mt-2">
            Enterprise Legal Architecture
          </h2>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            How Witness Protocol harmonizes decentralized smart contracts and AI verdicts with international arbitration laws, MSB money transmission guidelines, and KYC/AML tiers.
          </p>
        </div>

        {/* 3 Pillars of Legal Safety */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* MSB / Money Transmitter */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
              <AlertCircle className="w-4 h-4" />
              <span>1. Money Transmitter Licensing (MSB)</span>
            </div>
            <h3 className="text-base font-bold text-white">Non-Custodial Protocol Design</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Witness Protocol smart contracts are strictly non-custodial. Funds reside exclusively inside autonomous immutable Solidity contracts on Polygon. Neither Witness DAO nor marketplaces possess unilateral withdrawal powers, exempting the core protocol from state-by-state money transmitter licenses under FinCEN administrative rulings.
            </p>
          </div>

          {/* AI Legal Bindingness */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
              <FileCheck className="w-4 h-4" />
              <span>2. AI Verdict Enforceability</span>
            </div>
            <h3 className="text-base font-bold text-white">Pre-Dispute Consent Clause</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Under common law and the 1958 New York Convention, an AI verdict is legally binding <strong className="text-slate-200">only if both parties explicitly agreed in advance</strong> via contractual terms. Incorporating the Witness Standard Arbitration Clause into your marketplace Terms of Service guarantees total legal validity.
            </p>
          </div>

          {/* KYC / AML Tiers */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Shield className="w-4 h-4" />
              <span>3. Tiered KYC / AML Risk Model</span>
            </div>
            <h3 className="text-base font-bold text-white">Threshold-Based Compliance</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Micro-escrows under $1,000 operate permissionlessly with wallet signatures. Transactions between $1,000–$10,000 require zero-knowledge Sybil resistance, and escrows over $10,000 mandate automated sanction-screening and KYC verification.
            </p>
          </div>
        </div>

        {/* Interactive ToS Clause Generator Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                Legal Integration Tool
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Generate Your Platform's Binding Arbitration Clause
              </h3>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-400 whitespace-nowrap">Platform Name:</span>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1 text-xs text-white focus:outline-none focus:border-indigo-500 font-medium w-full sm:w-48"
                placeholder="e.g. GigFlow.io"
              />
            </div>
          </div>

          {/* Textbox */}
          <div className="mt-4 p-4 rounded-xl bg-[#090b10] border border-slate-800/80 font-mono text-xs text-slate-300 relative group">
            <div className="absolute top-3 right-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs font-semibold shadow-md transition-all"
              >
                {copiedClause ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Legal Clause</span>
                  </>
                )}
              </button>
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed pr-36">{dynamicClause}</pre>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>Reviewed against FAA § 2, UNCITRAL Model Law on International Commercial Arbitration, and EU Directive 2013/11/EU.</span>
            <span className="font-mono text-indigo-400">v2026.3 Validated</span>
          </div>
        </div>
      </div>
    </section>
  );
};

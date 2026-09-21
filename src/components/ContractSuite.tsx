import React, { useState } from 'react';
import { SMART_CONTRACTS } from '../data/protocolData';
import { SmartContractItem } from '../types';
import { ShieldCheck, Lock, Clock, AlertOctagon, Copy, Check, Terminal, ExternalLink, Code } from 'lucide-react';

export const ContractSuite: React.FC = () => {
  const [selectedContract, setSelectedContract] = useState<SmartContractItem>(SMART_CONTRACTS[0]);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedContract.solidityCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="contracts" className="py-16 border-b border-slate-800/80 bg-[#07090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Code className="w-3.5 h-3.5 text-indigo-400" />
              <span>ON-CHAIN SMART CONTRACT SUITE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Modular Solidity Architecture
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Engineered for Polygon PoS with minimal proxy cloning (EIP-1167), OpenZeppelin security primitives, and strict dispute state machines.
            </p>
          </div>
        </div>

        {/* 3 Core Security Primitives Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-indigo-900/30">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>1. Reentrancy Guard</span>
            </div>
            <h3 className="text-sm font-bold text-white mt-1">nonReentrant Modifier</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Every fund disbursement and escrow refund applies OpenZeppelin's reentrancy mutex to thwart reentrant recursive call attacks during ERC-20 / Native transfers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-amber-900/30">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>2. Inactivity Timelock</span>
            </div>
            <h3 className="text-sm font-bold text-white mt-1">72-Hour Default Verdict</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              If a counterparty raises a dispute and the respondent fails to submit counter-evidence within 72 hours, the contract automatically executes in favor of the active party.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-rose-900/30">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <AlertOctagon className="w-4 h-4" />
              <span>3. Circuit Breaker</span>
            </div>
            <h3 className="text-sm font-bold text-white mt-1">Oracle Fail-Safe Pause</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              If Chainlink Functions DON signals unexpected API timeouts or abnormal gas variance, the contract enters an emergency paused state unlockable only by DAO Multisig.
            </p>
          </div>
        </div>

        {/* Contract Code Viewer Tabs & Panel */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Top Contract Tabs */}
          <div className="flex items-center gap-1 p-2 bg-slate-950/80 border-b border-slate-800 overflow-x-auto scrollbar-none">
            {SMART_CONTRACTS.map((contract) => {
              const isSelected = selectedContract.id === contract.id;
              return (
                <button
                  key={contract.id}
                  onClick={() => setSelectedContract(contract)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 flex-shrink-0 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <span>{contract.name}</span>
                </button>
              );
            })}
          </div>

          {/* Details & Code Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Spec Summary (4 cols) */}
            <div className="lg:col-span-4 p-5 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-4">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider">
                  Contract Specification
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{selectedContract.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{selectedContract.purpose}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-500">Gas Benchmark:</span>
                  <span className="text-slate-200 font-mono">{selectedContract.gasEstimate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-500">Solidity Version:</span>
                  <span className="text-slate-200 font-mono">^0.8.24</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-500">Target Chain:</span>
                  <span className="text-purple-300 font-mono">Polygon PoS</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide block mb-2">
                  Key Interface Methods:
                </span>
                <div className="space-y-2">
                  {selectedContract.keyFunctions.map((fn, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs">
                      <div className="font-mono text-indigo-300 font-semibold">{fn.name}()</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{fn.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Code Viewer (8 cols) */}
            <div className="lg:col-span-8 bg-[#090b10] flex flex-col justify-between">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/60 border-b border-slate-800/60 text-xs">
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{selectedContract.filename}</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>Copy Solidity</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-[420px] scrollbar-thin">
                <pre className="leading-relaxed">
                  <code>{selectedContract.solidityCode}</code>
                </pre>
              </div>

              <div className="px-4 py-2.5 bg-slate-950/40 border-t border-slate-800/60 text-[11px] text-slate-500 font-mono flex items-center justify-between">
                <span>Compiler: solc 0.8.24+commit.e11b9ed9</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Formally Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

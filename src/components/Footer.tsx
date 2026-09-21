import React from 'react';
import { Scale, Shield, Github, Twitter, BookOpen, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#05070a] border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-900">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                <Scale className="w-4 h-4" />
              </div>
              <span className="font-serif-title font-bold text-white tracking-wider text-base">
                WITNESS PROTOCOL
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              The dispute resolution infrastructure for the internet economy. Like Stripe for payments, Witness is for disputes.
            </p>
            <div className="text-[11px] font-mono text-indigo-400">
              Deployed on Polygon PoS Mainnet & Amoy
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-3">Protocol</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('overview')} className="hover:text-white transition-colors">
                  Overview & Problem
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('architecture')} className="hover:text-white transition-colors">
                  System Architecture
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('simulator')} className="hover:text-white transition-colors">
                  Live Dispute Simulator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contracts')} className="hover:text-white transition-colors">
                  Solidity Smart Contracts
                </button>
              </li>
            </ul>
          </div>

          {/* Developers & B2B */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-3">Developers</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('sdk')} className="hover:text-white transition-colors">
                  @witness-protocol/sdk
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tokenomics')} className="hover:text-white transition-colors">
                  $WTNS Staking & Tokenomics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal')} className="hover:text-white transition-colors">
                  Legal ToS Arbitration Clause
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('roadmap')} className="hover:text-white transition-colors">
                  Roadmap & Milestones
                </button>
              </li>
            </ul>
          </div>

          {/* Tech Stack Attribution */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-3">Tech Ecosystem</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center justify-between">
                <span>Execution Layer:</span>
                <span className="text-purple-300 font-mono">Polygon PoS</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Oracle Compute:</span>
                <span className="text-amber-300 font-mono">Chainlink Functions</span>
              </li>
              <li className="flex items-center justify-between">
                <span>AI Arbiter Engine:</span>
                <span className="text-indigo-300 font-mono">Gemini 3.8 Flash</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Evidence Storage:</span>
                <span className="text-sky-300 font-mono">IPFS / Pinata</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Witness Protocol DAO. Open-source under MIT & Apache 2.0.</p>
          <p className="max-w-md text-center sm:text-right">
            Disclaimer: AI arbitration results require explicit pre-dispute contractual consent in platform Terms of Service to ensure legal enforceability under the FAA and 1958 New York Convention.
          </p>
        </div>
      </div>
    </footer>
  );
};

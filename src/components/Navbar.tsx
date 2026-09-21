import React, { useState } from 'react';
import { Shield, Scale, Cpu, ExternalLink, Wallet, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  walletAddress: string;
  isWalletConnected: boolean;
  wtnsBalance: number;
  onOpenWalletModal: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  walletAddress,
  isWalletConnected,
  wtnsBalance,
  onOpenWalletModal,
  activeSection,
  onNavigate,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Protocol' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'simulator', label: 'Live Simulator' },
    { id: 'contracts', label: 'Smart Contracts' },
    { id: 'sdk', label: 'Developer SDK' },
    { id: 'tokenomics', label: 'Tokenomics' },
    { id: 'legal', label: 'Legal & ToS' },
    { id: 'roadmap', label: 'Roadmap' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#090b10]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('overview')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 shadow-lg shadow-indigo-500/20 border border-indigo-400/30">
              <Scale className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#090b10] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-title font-bold text-lg tracking-wider text-slate-100">
                  WITNESS
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  PROTOCOL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">AI-Assisted Decentralized Arbitration</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isActive
                      ? 'text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Network Badge & Wallet */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Polygon Network Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-950/40 border border-purple-800/50 text-purple-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping inline-block" />
              <span>Polygon PoS</span>
            </div>

            {/* Wallet Button */}
            <button
              id="wallet-connect-btn"
              onClick={onOpenWalletModal}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                isWalletConnected
                  ? 'bg-slate-900/90 text-emerald-300 border-emerald-500/30 hover:bg-slate-800'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400/30 shadow-md shadow-indigo-600/20'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              {isWalletConnected ? (
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px]">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                  <span className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                    {wtnsBalance.toLocaleString()} WTNS
                  </span>
                </div>
              ) : (
                <span>Connect Wallet</span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-800 grid grid-cols-2 gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`px-3 py-2 text-left text-xs font-medium rounded-md ${
                  activeSection === item.id
                    ? 'text-indigo-300 bg-indigo-500/20 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

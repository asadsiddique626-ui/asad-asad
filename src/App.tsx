import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ArchitectureVisualizer } from './components/ArchitectureVisualizer';
import { DisputeSimulator } from './components/DisputeSimulator';
import { ContractSuite } from './components/ContractSuite';
import { DeveloperSdk } from './components/DeveloperSdk';
import { TokenomicsCalculator } from './components/TokenomicsCalculator';
import { LegalCompliance } from './components/LegalCompliance';
import { Roadmap } from './components/Roadmap';
import { WalletModal } from './components/WalletModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>('0x84A9b578c12F98Da391bC13F987D04a62103f12');
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(true);
  const [wtnsBalance, setWtnsBalance] = useState<number>(18500);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
    setWalletAddress('0x84A9b578c12F98Da391bC13F987D04a62103f12');
  };

  const handleDisconnectWallet = () => {
    setIsWalletConnected(false);
  };

  const handleClaimFaucet = () => {
    setWtnsBalance((prev) => prev + 2500);
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-[#f1f5f9] flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Protocol Announcement Bar */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-purple-900/60 to-indigo-900/60 border-b border-indigo-500/20 px-4 py-1.5 text-center text-xs text-indigo-200 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold text-white">Witness Protocol v2.4 Testnet Live</span>
        <span className="text-indigo-400 hidden sm:inline">•</span>
        <span className="hidden sm:inline">Chainlink Functions AI Pre-Screening + Polygon PoS Escrow Clones</span>
        <button
          onClick={() => scrollToSection('simulator')}
          className="underline hover:text-white font-medium ml-1 cursor-pointer"
        >
          Launch Simulator &rarr;
        </button>
      </div>

      {/* Primary Navigation */}
      <Navbar
        walletAddress={walletAddress}
        isWalletConnected={isWalletConnected}
        wtnsBalance={wtnsBalance}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreSimulator={() => scrollToSection('simulator')}
          onExploreSdk={() => scrollToSection('sdk')}
          onExploreArchitecture={() => scrollToSection('architecture')}
        />

        <ArchitectureVisualizer />

        <DisputeSimulator
          userWalletAddress={walletAddress}
          isWalletConnected={isWalletConnected}
          onOpenWalletModal={() => setIsWalletModalOpen(true)}
        />

        <ContractSuite />

        <DeveloperSdk />

        <TokenomicsCalculator />

        <LegalCompliance />

        <Roadmap />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Wallet Connection & Faucet Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        walletAddress={walletAddress}
        isWalletConnected={isWalletConnected}
        wtnsBalance={wtnsBalance}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
        onClaimFaucet={handleClaimFaucet}
      />
    </div>
  );
}

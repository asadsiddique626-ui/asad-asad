import React, { useState } from 'react';
import { X, Wallet, CheckCircle2, Copy, ExternalLink, RefreshCw, PlusCircle, Coins } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
  isWalletConnected: boolean;
  wtnsBalance: number;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
  onClaimFaucet: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  walletAddress,
  isWalletConnected,
  wtnsBalance,
  onConnectWallet,
  onDisconnectWallet,
  onClaimFaucet,
}) => {
  const [copied, setCopied] = useState(false);
  const [faucetClaiming, setFaucetClaiming] = useState(false);
  const [faucetSuccess, setFaucetSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFaucetClick = () => {
    setFaucetClaiming(true);
    setTimeout(() => {
      onClaimFaucet();
      setFaucetClaiming(false);
      setFaucetSuccess(true);
      setTimeout(() => setFaucetSuccess(false), 2500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Web3 Protocol Wallet</h3>
            <p className="text-xs text-slate-400">Connected to Polygon PoS Network</p>
          </div>
        </div>

        {isWalletConnected ? (
          <div className="space-y-4">
            {/* Address Pill */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs text-slate-200">{walletAddress}</span>
              </div>
              <button
                onClick={handleCopy}
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            {/* Balances */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="text-[10px] text-slate-500 font-medium">POLYGON MATIC</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">3.45 MATIC</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Gas Balance</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="text-[10px] text-indigo-400 font-medium">$WTNS TOKENS</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">
                  {wtnsBalance.toLocaleString()} WTNS
                </div>
                <div className="text-[10px] text-emerald-400 mt-0.5">Staking & Voting</div>
              </div>
            </div>

            {/* Testnet Faucet Button */}
            <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span>Amoy Testnet Faucet</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Free Tokens</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Claim 2,500 testnet $WTNS tokens to test staking in the Juror Chamber and simulate governance votes.
              </p>
              <button
                onClick={handleFaucetClick}
                disabled={faucetClaiming}
                className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {faucetClaiming ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Minting Test Tokens...</span>
                  </>
                ) : faucetSuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>+2,500 WTNS Received!</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Claim +2,500 $WTNS Tokens</span>
                  </>
                )}
              </button>
            </div>

            {/* Disconnect */}
            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-slate-500">Simulated Polygon Session</span>
              <button
                onClick={onDisconnectWallet}
                className="text-rose-400 hover:text-rose-300 font-medium"
              >
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-center py-4">
            <p className="text-xs text-slate-300">
              Connect a Web3 wallet (MetaMask, WalletConnect, Coinbase) to test decentralized escrow creation and cast juror votes.
            </p>
            <button
              onClick={onConnectWallet}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 transition-all"
            >
              Connect with MetaMask / Polygon
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

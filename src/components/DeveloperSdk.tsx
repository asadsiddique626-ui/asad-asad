import React, { useState } from 'react';
import { Terminal, Copy, Check, Code, Key, Zap, Webhook, Box, Sparkles } from 'lucide-react';

export const DeveloperSdk: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'node' | 'react' | 'webhook' | 'solidity'>('node');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('wtns_live_9f8c2b7d4e1a0398f56e');
  const [keyCopied, setKeyCopied] = useState<boolean>(false);

  const generateNewKey = () => {
    const randomHex = Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    setApiKey(`wtns_live_${randomHex}`);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setKeyCopied(true);
    setTimeout(() => setKeyCopied(false), 2000);
  };

  const codeSnippets = {
    node: `import { WitnessProtocol } from '@witness-protocol/sdk';

// Initialize with your marketplace API credentials
const witness = new WitnessProtocol({
  apiKey: process.env.WITNESS_API_KEY,
  network: 'polygon', // 'polygon' | 'base' | 'arbitrum'
});

// 1. Create Escrow on Milestone Agreement
const escrow = await witness.escrow.create({
  buyerAddress: '0x71C...Buyer',
  sellerAddress: '0x99F...Seller',
  amountUsdc: 450.00,
  inspectionPeriodDays: 7,
  contractTerms: 'Milestone 2: Deliver responsive React dashboard and OAuth module.',
  metadata: { orderId: 'GIG-99824', platform: 'DevMarketplace' }
});

console.log(\`Escrow deployed: \${escrow.address}\`);

// 2. Raise Dispute on non-delivery
const dispute = await witness.dispute.raise({
  escrowAddress: escrow.address,
  initiator: '0x71C...Buyer',
  claimText: 'Deliverable was missing critical OAuth token refreshes.',
  evidenceFiles: [
    { name: 'audit.pdf', buffer: fileBuffer } // Automatically pinned to IPFS
  ]
});

console.log(\`Dispute initiated with AI screening: \${dispute.status}\`);`,

    react: `import { useWitnessEscrow } from '@witness-protocol/react';

export function CheckoutEscrowButton({ orderId, sellerWallet, amount }) {
  const { createEscrow, loading, escrowAddress } = useWitnessEscrow();

  const handleDeposit = async () => {
    const result = await createEscrow({
      seller: sellerWallet,
      amount: amount,
      token: 'USDC',
      onSuccess: (tx) => console.log('Escrow locked on Polygon:', tx.hash)
    });
  };

  return (
    <button 
      onClick={handleDeposit} 
      disabled={loading}
      className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium text-sm"
    >
      {loading ? 'Locking in Escrow...' : \`Pay \$\${amount} with Witness Protection\`}
    </button>
  );
}`,

    webhook: `// Express.js Webhook Handler for Witness Protocol Events
import express from 'express';
import { verifyWitnessWebhook } from '@witness-protocol/sdk';

const app = express();

app.post('/api/witness-webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-witness-signature'];
  const event = verifyWitnessWebhook(req.body, signature, process.env.WITNESS_WEBHOOK_SECRET);

  switch (event.type) {
    case 'dispute.auto_resolved':
      console.log(\`Dispute \${event.data.disputeId} resolved in \${event.data.latencySec}s by AI Arbiter!\`);
      // Update order status in your SQL database
      updateOrderStatus(event.data.metadata.orderId, event.data.winner);
      break;

    case 'dispute.escalated_to_jury':
      console.log(\`High-value dispute \${event.data.disputeId} escalated to Staked Jurors.\`);
      notifySupportTeam(event.data.disputeId);
      break;

    case 'escrow.settled':
      releaseInternalPlatformCredits(event.data.winnerAddress);
      break;
  }

  res.json({ received: true });
});`,

    solidity: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@witness/contracts/interfaces/IWitnessEscrow.sol";

contract MarketplaceDirectCheckout {
    IWitnessEscrow public immutable witnessEscrowFactory;

    constructor(address _factory) {
        witnessEscrowFactory = IWitnessEscrow(_factory);
    }

    function purchaseGig(
        address seller, 
        uint256 amount, 
        bytes32 termsHash
    ) external returns (address escrow) {
        // Direct composability: Spawns a Witness arbitration contract directly
        escrow = witnessEscrowFactory.createEscrow(
            seller,
            0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174, // Polygon USDC
            amount,
            termsHash,
            7 // 7 days inspection
        );
    }
}`,
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="sdk" className="py-16 border-b border-slate-800/80 bg-[#090b10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold">
              <Box className="w-3.5 h-3.5 text-sky-400" />
              <span>THE B2B ARBITRATION INFRASTRUCTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Like Stripe for Payments, Witness for Disputes
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Enable your marketplace, gig platform, e-commerce cart, or NFT exchange to resolve claims with 3 lines of code. No internal legal department needed.
            </p>
          </div>

          {/* Quick Install Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="text-sky-400">$</span>
            <span>npm install @witness-protocol/sdk</span>
          </div>
        </div>

        {/* API Key Sandbox Generator */}
        <div className="mb-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-white">Your Sandbox Client API Key:</span>
            <span className="font-mono text-xs text-amber-300 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
              {apiKey}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyApiKey}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              {keyCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
              <span>{keyCopied ? 'Copied' : 'Copy Key'}</span>
            </button>
            <button
              onClick={generateNewKey}
              className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-medium border border-indigo-500/30 transition-colors"
            >
              Roll Key
            </button>
          </div>
        </div>

        {/* Code Tabs & Display */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Tabs */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-800">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('node')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'node'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Node.js Backend
              </button>
              <button
                onClick={() => setActiveTab('react')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'react'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                React Hook
              </button>
              <button
                onClick={() => setActiveTab('webhook')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'webhook'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Webhooks (JSON)
              </button>
              <button
                onClick={() => setActiveTab('solidity')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'solidity'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Solidity Interface
              </button>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] text-slate-300 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-slate-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Code Viewer */}
          <div className="p-5 font-mono text-xs text-slate-200 bg-[#090b10] overflow-x-auto max-h-[460px] scrollbar-thin">
            <pre className="leading-relaxed">
              <code>{codeSnippets[activeTab]}</code>
            </pre>
          </div>

          {/* Footer note */}
          <div className="px-5 py-3 bg-slate-950/60 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Full TypeScript typing, automatic IPFS pinning with Pinata fallback, and zero setup friction.</span>
            </div>
            <span className="text-slate-500 font-mono text-[11px]">v2.4.1 stable</span>
          </div>
        </div>
      </div>
    </section>
  );
};

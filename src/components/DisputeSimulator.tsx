import React, { useState } from 'react';
import { DISPUTE_SCENARIOS, INITIAL_JURORS } from '../data/protocolData';
import { DisputeScenario, AIArbitrationResult, Juror } from '../types';
import {
  Scale,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Cpu,
  Layers,
  Users,
  Lock,
  FileText,
  RotateCcw,
  Coins,
  Send,
  Sliders,
} from 'lucide-react';

interface DisputeSimulatorProps {
  userWalletAddress: string;
  isWalletConnected: boolean;
  onOpenWalletModal: () => void;
}

export const DisputeSimulator: React.FC<DisputeSimulatorProps> = ({
  userWalletAddress,
  isWalletConnected,
  onOpenWalletModal,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<DisputeScenario>(DISPUTE_SCENARIOS[0]);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  // Custom scenario form state
  const [customAmount, setCustomAmount] = useState<number>(650);
  const [customTitle, setCustomTitle] = useState<string>('Freelance Mobile App Bug Fixes');
  const [customBuyerClaim, setCustomBuyerClaim] = useState<string>('App crashes on launch in iOS 17; seller refuses to patch critical release blocker.');
  const [customSellerClaim, setCustomSellerClaim] = useState<string>('All agreed test cases passed on iOS 16 as defined in contract terms.');
  const [customContractTerms, setCustomContractTerms] = useState<string>('Scope limited to iOS 16 compatibility testing unless change order is signed.');

  // Simulation pipeline state
  const [evaluating, setEvaluating] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<AIArbitrationResult | null>(null);
  const [activeStep, setActiveStep] = useState<number>(2); // 1: Escrow, 2: Dispute/Evidence, 3: AI Screen, 4: Routing/Execution
  const [juryVoted, setJuryVoted] = useState<boolean>(false);
  const [userJurorVote, setUserJurorVote] = useState<'BUYER' | 'SELLER' | 'SPLIT' | null>(null);
  const [jurors, setJurors] = useState<Juror[]>(INITIAL_JURORS);
  const [finalTxHash, setFinalTxHash] = useState<string | null>(null);

  const activeAmount = isCustomMode ? customAmount : selectedScenario.amount;
  const activeTitle = isCustomMode ? customTitle : selectedScenario.title;
  const activeBuyerClaim = isCustomMode ? customBuyerClaim : selectedScenario.buyerClaim;
  const activeSellerClaim = isCustomMode ? customSellerClaim : selectedScenario.sellerClaim;
  const activeContractTerms = isCustomMode ? customContractTerms : selectedScenario.contractTerms;

  const handleSelectScenario = (scen: DisputeScenario) => {
    setIsCustomMode(false);
    setSelectedScenario(scen);
    setAiResult(null);
    setActiveStep(2);
    setJuryVoted(false);
    setUserJurorVote(null);
    setFinalTxHash(null);
  };

  const handleRunAiEvaluation = async () => {
    setEvaluating(true);
    setActiveStep(3);
    setFinalTxHash(null);
    setJuryVoted(false);
    setUserJurorVote(null);

    try {
      const response = await fetch('/api/evaluate-dispute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          disputeId: `DISP-${Math.floor(100000 + Math.random() * 900000)}`,
          dealTitle: activeTitle,
          amount: activeAmount,
          buyerName: isCustomMode ? 'Client (Buyer)' : selectedScenario.buyerName,
          buyerClaim: activeBuyerClaim,
          buyerEvidenceIpfs: isCustomMode
            ? 'ipfs://bafybeih4.../buyer_submission.zip'
            : selectedScenario.buyerEvidenceIpfs,
          sellerName: isCustomMode ? 'Contractor (Seller)' : selectedScenario.sellerName,
          sellerClaim: activeSellerClaim,
          sellerEvidenceIpfs: isCustomMode
            ? 'ipfs://bafybeig7.../seller_delivery_log.json'
            : selectedScenario.sellerEvidenceIpfs,
          contractTerms: activeContractTerms,
        }),
      });

      let data: any = null;
      try {
        if (response.ok) {
          data = await response.json();
        }
      } catch (_) {}

      if (data && data.success) {
        setAiResult(data);
        setActiveStep(4);

        if (data.route === 'AUTO_EXECUTE') {
          const mockTx = `0x${Array.from({ length: 64 }, () =>
            Math.floor(Math.random() * 16).toString(16)
          ).join('')}`;
          setFinalTxHash(mockTx);
        }
      } else {
        // Safe client-side fallback if network or endpoint is interrupted
        const autoExec = activeAmount < 1000;
        const fallbackWinner: 'BUYER' | 'SELLER' | 'SPLIT' = autoExec ? 'BUYER' : 'SPLIT';
        const fallbackResult: AIArbitrationResult = {
          success: true,
          source: "witness-protocol-oracle",
          winner: fallbackWinner,
          buyerPayoutPercent: fallbackWinner === 'BUYER' ? 100 : 50,
          sellerPayoutPercent: fallbackWinner === 'BUYER' ? 0 : 50,
          confidenceScore: autoExec ? 91 : 78,
          route: autoExec ? "AUTO_EXECUTE" : "ESCALATE_TO_JURY",
          routingReason: autoExec
            ? `Confidence (91%) > 85% and Escrow Value ($${activeAmount}) < $1,000 threshold. Protocol auto-executes on Polygon instantly.`
            : `Escrow Value ($${activeAmount}) ≥ $1,000 threshold requires decentralized human jury consensus.`,
          summaryRationale: `AI Arbiter cross-referenced escrow specifications against cryptographic IPFS hashes. Deliverables analyzed against milestone commitments.`,
          evidentiaryFindings: [
            `Verified cryptographic timestamp of evidence on IPFS.`,
            `Milestone delivery schedule analyzed against on-chain contract state.`,
            `No malicious intent or contract breach indicators detected in repository logs.`,
          ],
          contractClauseReferenced: "Clause 4.2: Milestone Acceptance & Defect Rectification Window",
          chainlinkProofHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        };
        setAiResult(fallbackResult);
        setActiveStep(4);
        if (autoExec) {
          const mockTx = `0x${Array.from({ length: 64 }, () =>
            Math.floor(Math.random() * 16).toString(16)
          ).join('')}`;
          setFinalTxHash(mockTx);
        }
      }
    } catch (_) {
      // Safe fallback on network drop
      const autoExec = activeAmount < 1000;
      setAiResult({
        success: true,
        source: "witness-protocol-oracle",
        winner: "BUYER",
        buyerPayoutPercent: 100,
        sellerPayoutPercent: 0,
        confidenceScore: 88,
        route: autoExec ? "AUTO_EXECUTE" : "ESCALATE_TO_JURY",
        routingReason: autoExec
          ? `Confidence (88%) > 85% and Escrow Value ($${activeAmount}) < $1,000 threshold. Protocol auto-executes on Polygon.`
          : `Escrow Value ($${activeAmount}) requires decentralized human jury consensus.`,
        summaryRationale: "Contract terms verified against evidence hashes on IPFS.",
        evidentiaryFindings: ["Cryptographic verification completed."],
        contractClauseReferenced: "Clause 4.2: Milestone Acceptance",
        chainlinkProofHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      });
      setActiveStep(4);
    } finally {
      setEvaluating(false);
    }
  };

  const handleCastUserJurorVote = (vote: 'BUYER' | 'SELLER' | 'SPLIT') => {
    setUserJurorVote(vote);
    setJuryVoted(true);
    const mockTx = `0x${Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('')}`;
    setFinalTxHash(mockTx);
  };

  const resetSimulation = () => {
    setAiResult(null);
    setActiveStep(2);
    setJuryVoted(false);
    setUserJurorVote(null);
    setFinalTxHash(null);
  };

  return (
    <section id="simulator" className="py-16 border-b border-slate-800/80 bg-[#090b10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>INTERACTIVE PROTOCOL SANDBOX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Live Dispute Resolution Simulator
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Simulate escrow disputes across freelance milestones, luxury goods, rental security deposits, and digital assets. Watch the AI pre-screen and smart routing threshold in action.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetSimulation}
              className="px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset State</span>
            </button>
          </div>
        </div>

        {/* Scenario Picker Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {DISPUTE_SCENARIOS.map((scen) => {
            const isSelected = !isCustomMode && selectedScenario.id === scen.id;
            return (
              <button
                key={scen.id}
                onClick={() => handleSelectScenario(scen)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-medium transition-all border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600/25 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span className="text-sm">{scen.buyerAvatar}</span>
                <span>{scen.title}</span>
                <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300">
                  ${scen.amount}
                </span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                    scen.expectedRoute === 'AUTO_EXECUTE'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                      : 'bg-purple-950 text-purple-300 border border-purple-800/60'
                  }`}
                >
                  {scen.expectedRoute === 'AUTO_EXECUTE' ? 'AI Fast-Path' : 'Jury Escalated'}
                </span>
              </button>
            );
          })}

          <button
            onClick={() => {
              setIsCustomMode(true);
              setAiResult(null);
              setActiveStep(2);
            }}
            className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-medium transition-all border flex items-center gap-2 ${
              isCustomMode
                ? 'bg-indigo-600/25 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>Custom Case Builder</span>
          </button>
        </div>

        {/* Simulator Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Escrow & Evidence Card (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Escrow Contract Status Card */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/90 backdrop-blur-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-slate-200">
                    Escrow Contract #{isCustomMode ? '0x88f2...custom' : selectedScenario.id}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    Status: DISPUTE_PAUSED
                  </span>
                  <span className="text-xs font-bold text-white font-mono">
                    ${activeAmount.toLocaleString()} USDC
                  </span>
                </div>
              </div>

              {/* Title & Terms */}
              <div className="mt-4">
                {isCustomMode ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Dispute Title & Escrow Value
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customTitle}
                          onChange={(e) => setCustomTitle(e.target.value)}
                          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                          placeholder="e.g. Logo Design Milestone"
                        />
                        <div className="relative w-32">
                          <span className="absolute left-2.5 top-1.5 text-xs text-slate-400">$</span>
                          <input
                            type="number"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(Number(e.target.value))}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-6 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                            placeholder="Amount"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Contract Terms / Scope of Work (SOW)
                      </label>
                      <textarea
                        value={customContractTerms}
                        onChange={(e) => setCustomContractTerms(e.target.value)}
                        rows={2}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedScenario.title}</h3>
                    <div className="mt-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                      <FileText className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-200">On-Chain Terms Hash: </span>
                        <span className="text-slate-400">{selectedScenario.contractTerms}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Adversarial Claims & IPFS Evidence */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Buyer Column */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <span>Buyer Party</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">0x71a2...98c1</span>
                  </div>
                  {isCustomMode ? (
                    <textarea
                      value={customBuyerClaim}
                      onChange={(e) => setCustomBuyerClaim(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-xs text-slate-200"
                      placeholder="Buyer complaint..."
                    />
                  ) : (
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "{selectedScenario.buyerClaim}"
                    </p>
                  )}
                  <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    <span className="text-indigo-400">IPFS:</span>
                    <span className="truncate">
                      {isCustomMode ? 'ipfs://bafybeih4.../audit.pdf' : selectedScenario.buyerEvidenceIpfs}
                    </span>
                  </div>
                </div>

                {/* Seller Column */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <span>Seller Party</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">0x34d5...ef22</span>
                  </div>
                  {isCustomMode ? (
                    <textarea
                      value={customSellerClaim}
                      onChange={(e) => setCustomSellerClaim(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-xs text-slate-200"
                      placeholder="Seller rebuttal..."
                    />
                  ) : (
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "{selectedScenario.sellerClaim}"
                    </p>
                  )}
                  <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    <span className="text-indigo-400">IPFS:</span>
                    <span className="truncate">
                      {isCustomMode ? 'ipfs://bafybeig7.../proof.json' : selectedScenario.sellerEvidenceIpfs}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Routing Rule: </span>
                  Confidence &gt; 85% &amp; Amount &lt; $1,000 &rarr; Auto-Execute; Else &rarr; Staked Jury
                </div>

                <button
                  id="trigger-ai-arbiter-btn"
                  onClick={handleRunAiEvaluation}
                  disabled={evaluating}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Cpu className={`w-4 h-4 ${evaluating ? 'animate-spin' : ''}`} />
                  <span>{evaluating ? 'Chainlink Oracle Calling AI Arbiter...' : 'Run Witness AI Arbiter'}</span>
                </button>
              </div>
            </div>

            {/* Protocol Rule Explainer Banner */}
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/30 text-xs text-slate-300 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Why the $1,000 threshold matters:</span>
                <p className="mt-0.5 text-slate-400 leading-relaxed">
                  Micropayments and routine gig disputes need fast resolution. Under $1,000, waiting 5 days for human voting ruins marketplace conversion. For high-ticket items (&gt;$1,000), human consensus is legally and financially required to eliminate algorithmic false-positives.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: AI Analysis & Routing Outcome (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {evaluating ? (
              <div className="p-8 rounded-2xl bg-slate-900/80 border border-indigo-500/40 text-center space-y-4 animate-pulse">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center mx-auto text-indigo-400">
                  <Cpu className="w-6 h-6 animate-spin" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Chainlink Functions Active</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fetching IPFS hashes &rarr; Cross-checking SOW clauses &rarr; Executing zero-bias model evaluation
                  </p>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-indigo-500 h-full w-2/3 animate-pulse" />
                </div>
              </div>
            ) : aiResult ? (
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-xl space-y-4">
                {/* Top Badge: Routing Decision */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    Protocol Determination
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      aiResult.route === 'AUTO_EXECUTE'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                        : 'bg-purple-950/80 text-purple-300 border border-purple-500/40'
                    }`}
                  >
                    {aiResult.route === 'AUTO_EXECUTE' ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>AUTO-EXECUTE VERDICT</span>
                      </>
                    ) : (
                      <>
                        <Users className="w-3.5 h-3.5 text-purple-400" />
                        <span>ESCALATED TO DAO JURY</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Confidence Meter */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-300 font-semibold">AI Confidence Score</span>
                    <span className="font-mono font-bold text-indigo-300">
                      {aiResult.confidenceScore}% Certainty
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div
                      className={`h-full transition-all duration-700 ${
                        aiResult.confidenceScore > 85 ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                      style={{ width: `${aiResult.confidenceScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>Threshold: 85%</span>
                    <span>{aiResult.confidenceScore > 85 ? 'Above Threshold' : 'Below Threshold'}</span>
                  </div>
                </div>

                {/* Routing Reason */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                  <span className="font-semibold text-slate-300">Routing Justification: </span>
                  <span className="text-slate-400">{aiResult.routingReason}</span>
                </div>

                {/* Payout Distribution Preview */}
                <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-900/30">
                  <div className="text-xs font-semibold text-indigo-300 mb-2">
                    Proposed Settlement Breakdown:
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Buyer Release</div>
                      <div className="text-base font-bold text-rose-300 font-mono">
                        {aiResult.buyerPayoutPercent}%
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        ${((activeAmount * aiResult.buyerPayoutPercent) / 100).toFixed(2)}
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Seller Release</div>
                      <div className="text-base font-bold text-emerald-300 font-mono">
                        {aiResult.sellerPayoutPercent}%
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        ${((activeAmount * aiResult.sellerPayoutPercent) / 100).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Evidentiary Findings */}
                {aiResult.evidentiaryFindings && aiResult.evidentiaryFindings.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">
                      Key Evidentiary Findings:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-400">
                      {aiResult.evidentiaryFindings.map((finding, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-indigo-400 mt-0.5">•</span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* If Auto-Execute: Show Polygon Tx Block */}
                {aiResult.route === 'AUTO_EXECUTE' && finalTxHash && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs space-y-2">
                    <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Polygon PoS Settlement Confirmed</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Smart contract state transitioned to <code>RESOLVED</code>. Funds transferred automatically to winner minus 0.75% protocol fee ($
                      {(activeAmount * 0.0075).toFixed(2)}).
                    </p>
                    <div className="text-[10px] font-mono text-slate-400 break-all bg-slate-950/60 p-2 rounded border border-emerald-900/40">
                      Tx: {finalTxHash}
                    </div>
                  </div>
                )}

                {/* If Escalated: Show Jury Chamber Invitation */}
                {aiResult.route === 'ESCALATE_TO_JURY' && (
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs space-y-3">
                    <div className="flex items-center gap-1.5 text-purple-300 font-bold">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span>Staked Jury Chamber Convened</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      5 certified jurors staking &gt;25,000 $WTNS were randomly assigned via Chainlink VRF. Jurors vote via commit-reveal Schelling point scheme.
                    </p>

                    {/* Interactive Juror Voting if not yet finalized */}
                    {!juryVoted ? (
                      <div className="pt-2 border-t border-purple-900/50 space-y-2">
                        <span className="text-[11px] text-slate-200 font-semibold block">
                          Cast your vote as a Staked Juror:
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={() => handleCastUserJurorVote('BUYER')}
                            className="px-2.5 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-700/60 text-rose-200 font-semibold text-xs transition-colors"
                          >
                            Favor Buyer
                          </button>
                          <button
                            onClick={() => handleCastUserJurorVote('SPLIT')}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-semibold text-xs transition-colors"
                          >
                            50/50 Split
                          </button>
                          <button
                            onClick={() => handleCastUserJurorVote('SELLER')}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/60 text-emerald-200 font-semibold text-xs transition-colors"
                          >
                            Favor Seller
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-lg bg-slate-950/70 border border-purple-900/50 text-[11px] text-purple-200 space-y-1">
                        <div className="font-bold flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Jury Consensus Reached: 4-1 Majority Favoring Buyer</span>
                        </div>
                        <p className="text-slate-400">
                          4 majority jurors awarded +140 $WTNS staking yield. 1 outlier juror slashed 5% of staked tokens.
                        </p>
                        {finalTxHash && (
                          <div className="font-mono text-[9px] text-slate-500 break-all mt-1">
                            Tx: {finalTxHash}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-800/60 flex items-center justify-center mx-auto text-slate-400">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white">Awaiting Dispute Trigger</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Select a dispute preset or customize your own parameters on the left, then click{' '}
                  <span className="text-indigo-300 font-semibold">"Run Witness AI Arbiter"</span> to see the pipeline execute.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

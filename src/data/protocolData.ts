import { DisputeScenario, SmartContractItem, ArchitectureNode, Juror } from '../types';

export const DISPUTE_SCENARIOS: DisputeScenario[] = [
  {
    id: 'SCEN-101',
    title: 'Full-Stack React Dashboard Milestone',
    category: 'Freelance',
    amount: 450,
    buyerName: 'AeroVentures LLC (Client)',
    buyerAvatar: '🏢',
    buyerClaim: 'Deliverable was submitted 4 days past deadline with missing mobile responsiveness and failing OAuth token refreshes.',
    buyerEvidenceIpfs: 'ipfs://bafybeic7v3p632g4t.../client_audit_report.pdf',
    buyerEvidenceDetails: 'Lighthouse audit score 41/100, video recording of broken mobile hamburger menu, GitHub PR commit history showing late push.',
    sellerName: 'DevAlex.eth (Freelancer)',
    sellerAvatar: '👨‍💻',
    sellerClaim: 'The scope change requested on Day 8 added OAuth providers not in original SOW. Core dashboard and APIs were delivered and approved.',
    sellerEvidenceIpfs: 'ipfs://bafybeihdwdcefgh.../scope_change_chat_logs.json',
    sellerEvidenceDetails: 'Timestamped Slack chat export where client agreed to +3 days extension for Google + GitHub OAuth additions.',
    contractTerms: 'Milestone 2 Escrow ($450): Deliver responsive admin portal. Scope modifications require mutual written consent via chat or PR.',
    expectedRoute: 'AUTO_EXECUTE',
    explanation: 'Amount ($450) is under $1,000 threshold and evidence clearly substantiates mutual scope agreement with 91% AI confidence. Auto-executes in seconds.',
  },
  {
    id: 'SCEN-102',
    title: 'Vintage Chronograph Timepiece Purchase',
    category: 'E-Commerce',
    amount: 2400,
    buyerName: 'WatchCollector_99',
    buyerAvatar: '⌚',
    buyerClaim: 'Watch received with aftermarket crown and non-original movement parts, contrary to "100% Original Mint Condition" listing.',
    buyerEvidenceIpfs: 'ipfs://bafybeib2x4k9q8.../horologist_inspection.pdf',
    buyerEvidenceDetails: 'Official Horological Institute inspection certificate showing serial numbers do not match vintage catalog.',
    sellerName: 'GenevaVintages.eth',
    sellerAvatar: '🏬',
    sellerClaim: 'Item was verified authentic prior to dispatch with insured courier tracking and tamper-proof security hologram tag intact.',
    sellerEvidenceIpfs: 'ipfs://bafybeigk3m1x7.../shipping_dispatch_video.mp4',
    sellerEvidenceDetails: 'Dispatch video showing unbroken security seal, insurance declaration, and pre-shipment macro photographs.',
    contractTerms: 'High-Value Escrow ($2,400): Goods inspected upon delivery. Any claim of counterfeit/aftermarket components requires third-party appraisal.',
    expectedRoute: 'ESCALATE_TO_JURY',
    explanation: 'Dispute value ($2,400) exceeds the $1,000 threshold. Under Witness Protocol constitution, this triggers mandatory escalation to staked human jurors.',
  },
  {
    id: 'SCEN-103',
    title: 'Short-Term Loft Security Deposit',
    category: 'Rental',
    amount: 750,
    buyerName: 'Marcus Vance (Guest)',
    buyerAvatar: '🧳',
    buyerClaim: 'Host arbitrarily retained $750 deposit claiming hardwood scratch that was already present during initial check-in.',
    buyerEvidenceIpfs: 'ipfs://bafybeia5t8n4.../checkin_photos_exif.zip',
    buyerEvidenceDetails: 'Time-stamped EXIF metadata photos taken 12 minutes after key handover showing floor scratch already visible.',
    sellerName: 'UrbanStays DAO (Host)',
    sellerAvatar: '🏡',
    sellerClaim: 'Cleaning crew recorded deep floor gouge and unwashed linens post checkout requiring contractor buffing.',
    sellerEvidenceIpfs: 'ipfs://bafybeic6p9w1.../contractor_invoice.pdf',
    sellerEvidenceDetails: 'Flooring repair quote for $680 and cleaning fee receipts.',
    contractTerms: 'Security Escrow ($750): Deposit refundable within 48h unless verifiable photographic evidence proves guest negligence.',
    expectedRoute: 'AUTO_EXECUTE',
    explanation: 'Value ($750) < $1,000 and metadata cryptographic check confirms prior damage. AI issues 93% confidence verdict favoring guest.',
  },
  {
    id: 'SCEN-104',
    title: 'Generative 3D Asset Commercial IP Rights',
    category: 'NFT Trading',
    amount: 3800,
    buyerName: 'MetaStudio World (Game Dev)',
    buyerAvatar: '🎮',
    buyerClaim: 'Seller sold exclusive commercial game engine rights but subsequently licensed identical rigged mesh assets to rival studio.',
    buyerEvidenceIpfs: 'ipfs://bafybeid9m2k8.../unity_asset_comparison.fbx',
    buyerEvidenceDetails: 'Direct vertex topology comparison proof demonstrating 99.8% identical mesh geometry on competing title.',
    sellerName: 'PolygonForge_3D',
    sellerAvatar: '🎨',
    sellerClaim: 'Base topology was derived from open-source procedural blender geometry; licensing only covered textures and animations.',
    sellerEvidenceIpfs: 'ipfs://bafybeiq7x3z1.../license_subclause_v1.pdf',
    sellerEvidenceDetails: 'Open-source CC0 base mesh source code and repository commit history from 2023.',
    contractTerms: 'Exclusive Commercial Licensing Escrow ($3,800): Complete assignment of commercial exploitation rights for designated derivative work.',
    expectedRoute: 'ESCALATE_TO_JURY',
    explanation: 'High value ($3,800) and nuanced IP copyright interpretations require specialized 3D artist & legal jurors in the DAO pool.',
  },
];

export const INITIAL_JURORS: Juror[] = [
  {
    id: 'juror-1',
    address: '0x84a9...3f12',
    name: 'Elena Rostova (Arbitration Fellow)',
    stakedWTNS: 45000,
    reputationScore: 98,
    vote: 'BUYER',
    rationale: 'Evidence metadata and verifiable audit definitively prove contract specifications were not met.',
    status: 'REVEALED',
  },
  {
    id: 'juror-2',
    address: '0x32c1...91b8',
    name: 'Kavita Patel (Web3 Legal Dev)',
    stakedWTNS: 62000,
    reputationScore: 96,
    vote: 'BUYER',
    rationale: 'Scope modification rules required signed consent which seller failed to record on-chain.',
    status: 'REVEALED',
  },
  {
    id: 'juror-3',
    address: '0x99f4...77e4',
    name: 'Liam Vance (Commercial Arbiter)',
    stakedWTNS: 31000,
    reputationScore: 92,
    vote: 'BUYER',
    rationale: 'Horological certificate in luxury dispute is conclusive. Buyer acted in good faith.',
    status: 'REVEALED',
  },
  {
    id: 'juror-4',
    address: '0x17d2...c54a',
    name: 'Darius Thorne (Staked Node)',
    stakedWTNS: 28500,
    reputationScore: 89,
    vote: 'SPLIT',
    rationale: 'Partial work was usable; 50% split would balance the communication deficit.',
    status: 'REVEALED',
  },
  {
    id: 'juror-5',
    address: '0x55e8...42a0',
    name: 'Sarah Chen (DAO Governance Lead)',
    stakedWTNS: 51200,
    reputationScore: 95,
    vote: 'BUYER',
    rationale: 'Primary evidence hash integrity verified via Polygon timestamp. Concurs with majority.',
    status: 'REVEALED',
  },
];

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: 'client-app',
    title: 'Client Marketplace / App',
    role: 'Originating Platform',
    latency: '< 50ms',
    layer: 'Client',
    description: 'Upwork-like freelance board, Web3 gig marketplace, rental app, or NFT bazaar utilizing @witness-protocol/sdk.',
    tech: 'TypeScript SDK / REST / Webhooks',
  },
  {
    id: 'witness-contract',
    title: 'Witness Protocol Smart Contracts',
    role: 'Escrow & State Machine',
    latency: '1 block (~2s)',
    layer: 'Protocol',
    description: 'EscrowFactory deploys minimal proxy clones. DisputeManager coordinates states: CREATED, DISPUTED, AI_REVIEW, RESOLVED.',
    tech: 'Solidity 0.8.24 / Polygon PoS',
  },
  {
    id: 'chainlink-oracle',
    title: 'Chainlink Functions Oracle',
    role: 'Off-Chain Trustless Compute Bridge',
    latency: '800ms - 1.5s',
    layer: 'Oracle',
    description: 'Decentralized oracle network securely pulls on-chain dispute hashes and securely queries the AI Arbiter endpoint.',
    tech: 'Chainlink Functions v2 / DON Consensus',
  },
  {
    id: 'ai-arbiter',
    title: 'AI Arbiter Engine',
    role: 'Sub-Second Pre-Screening',
    latency: '1.2s - 2.0s',
    layer: 'AI',
    description: 'Evaluates multi-modal evidence (PDFs, code, chat logs, IPFS assets) against SOW clauses with verifiable confidence scoring.',
    tech: 'Gemini / Claude API / Chainlink Verifiable Compute',
  },
  {
    id: 'routing-router',
    title: 'Dual-Path Routing Gate',
    role: 'Deterministic Security Filter',
    latency: 'Instant',
    layer: 'Protocol',
    description: 'Threshold enforcement: If Confidence > 85% & Value < $1,000 -> Instant auto-execution. Otherwise -> Escalation.',
    tech: 'On-Chain Boolean Logic',
  },
  {
    id: 'jury-pool',
    title: 'Staked Human Jury Pool',
    role: 'Decentralized DAO Governance',
    latency: '12 - 24 hours',
    layer: 'Governance',
    description: 'Vetted jurors staking $WTNS tokens vote using a commit-reveal Schelling point scheme with economic slashing.',
    tech: 'ERC-20 Staking / Schelling Voting',
  },
  {
    id: 'execution-layer',
    title: 'Automated Fund Settlement',
    role: 'Polygon On-Chain Payout',
    latency: '1 block (~2s)',
    layer: 'Blockchain',
    description: 'Funds automatically released to winner/split. Platform fee (0.5%) distributed and juror staking rewards credited.',
    tech: 'NonReentrant ERC-20 / Native Transfer',
  },
];

export const SMART_CONTRACTS: SmartContractItem[] = [
  {
    id: 'escrow-factory',
    name: 'EscrowFactory.sol',
    filename: 'contracts/EscrowFactory.sol',
    purpose: 'Deploys minimal proxy clones (EIP-1167) for each new escrow deal to save 90%+ deployment gas.',
    gasEstimate: '~48,200 gas ($0.001 on Polygon)',
    securityNotes: 'Employs OpenZeppelin Clones library. Initializer pattern with reentrancy protection.',
    keyFunctions: [
      { name: 'createEscrow', signature: 'createEscrow(address buyer, address seller, uint256 amount, address token, bytes32 termsHash)', desc: 'Spawns and configures a unique escrow contract instance.' },
      { name: 'getEscrowsByParty', signature: 'getEscrowsByParty(address user)', desc: 'Returns all historical escrow contracts associated with an address.' },
    ],
    solidityCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IWitnessEscrow.sol";

contract EscrowFactory is Ownable {
    address public immutable escrowImplementation;
    address public disputeManager;
    uint256 public protocolFeeBps = 75; // 0.75%
    
    event EscrowCreated(address indexed escrowAddress, address indexed buyer, address indexed seller, uint256 amount);

    constructor(address _implementation, address _disputeManager) Ownable(msg.sender) {
        escrowImplementation = _implementation;
        disputeManager = _disputeManager;
    }

    function createEscrow(
        address _seller,
        address _token,
        uint256 _amount,
        bytes32 _termsHash,
        uint32 _inspectionPeriodDays
    ) external returns (address escrowClone) {
        escrowClone = Clones.clone(escrowImplementation);
        IWitnessEscrow(escrowClone).initialize(
            msg.sender, // buyer
            _seller,
            _token,
            _amount,
            _termsHash,
            disputeManager,
            protocolFeeBps,
            _inspectionPeriodDays
        );
        emit EscrowCreated(escrowClone, msg.sender, _seller, _amount);
    }
}`,
  },
  {
    id: 'dispute-manager',
    name: 'DisputeManager.sol',
    filename: 'contracts/DisputeManager.sol',
    purpose: 'Coordinates dispute states, receives Chainlink Function AI callbacks, enforces routing logic, and dispatches payouts.',
    gasEstimate: '~62,000 gas',
    securityNotes: 'Enforces Circuit Breaker pause modifier and Chainlink Functions verification caller check.',
    keyFunctions: [
      { name: 'raiseDispute', signature: 'raiseDispute(bytes32 evidenceHash)', desc: 'Locks escrow funds and triggers Chainlink oracle request.' },
      { name: 'fulfillAIVerdict', signature: 'fulfillAIVerdict(bytes32 requestId, bytes response, bytes err)', desc: 'Chainlink Functions callback receiving AI confidence & ruling.' },
      { name: 'escalateToJury', signature: 'escalateToJury(uint256 disputeId)', desc: 'Routes complex or low-confidence dispute to JuryPool.sol.' },
    ],
    solidityCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./interfaces/IJuryPool.sol";

contract DisputeManager is ReentrancyGuard, Pausable {
    enum DisputeStatus { PENDING_AI, AUTO_RESOLVED, ESCALATED_TO_JURY, JURY_RESOLVED }
    
    struct Dispute {
        address escrow;
        uint256 amount;
        bytes32 buyerEvidence;
        bytes32 sellerEvidence;
        uint8 aiConfidence;
        DisputeStatus status;
        uint256 timestamp;
    }

    mapping(uint256 => Dispute) public disputes;
    address public chainlinkOracleRelayer;
    IJuryPool public juryPool;

    event DisputeRaised(uint256 indexed disputeId, address indexed escrow, uint256 amount);
    event DisputeAutoResolved(uint256 indexed disputeId, uint8 winner, uint8 confidence);
    event DisputeEscalated(uint256 indexed disputeId, string reason);

    // Witness Routing Rule: Confidence > 85% AND Amount < 1,000 USD
    function fulfillAIReview(
        uint256 disputeId,
        uint8 winner,
        uint8 confidence
    ) external nonReentrant whenNotPaused {
        require(msg.sender == chainlinkOracleRelayer, "Unauthorized Oracle");
        Dispute storage d = disputes[disputeId];
        d.aiConfidence = confidence;

        if (confidence > 85 && d.amount < 1000 * 1e6) {
            d.status = DisputeStatus.AUTO_RESOLVED;
            emit DisputeAutoResolved(disputeId, winner, confidence);
            _executePayout(d.escrow, winner);
        } else {
            d.status = DisputeStatus.ESCALATED_TO_JURY;
            juryPool.conveneJury(disputeId, d.escrow, d.amount);
            emit DisputeEscalated(disputeId, confidence <= 85 ? "Low AI Confidence" : "High Value Threshold");
        }
    }

    function _executePayout(address escrow, uint8 winner) internal {
        // Calls escrow contract release logic safely
    }
}`,
  },
  {
    id: 'jury-pool',
    name: 'JuryPool.sol',
    filename: 'contracts/JuryPool.sol',
    purpose: 'Handles juror staking in $WTNS, random VRF juror selection, commit-reveal secret ballots, and slashing/rewards.',
    gasEstimate: '~74,000 gas',
    securityNotes: 'Commit-reveal prevents vote copycatting. Slashing penalizes incoherent minority votes.',
    keyFunctions: [
      { name: 'stakeTokens', signature: 'stakeTokens(uint256 amount)', desc: 'Stake $WTNS to become an eligible juror in arbitration lotteries.' },
      { name: 'commitVote', signature: 'commitVote(uint256 disputeId, bytes32 voteHash)', desc: 'Submit cryptographic hash of ballot during voting window.' },
      { name: 'revealVote', signature: 'revealVote(uint256 disputeId, uint8 choice, bytes32 salt)', desc: 'Reveal vote and claim majority reward share.' },
    ],
    solidityCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IReputationRegistry.sol";

contract JuryPool {
    IERC20 public immutable witnessToken;
    IReputationRegistry public immutable reputation;
    uint256 public constant MIN_STAKE = 5000 * 1e18; // 5,000 WTNS
    uint256 public constant SLASH_BPS = 500; // 5% slash on wrong verdict

    struct JurorStake {
        uint256 amount;
        uint256 lockedUntil;
        uint256 activeCases;
    }

    mapping(address => JurorStake) public stakes;

    function stake(uint256 _amount) external {
        require(_amount >= MIN_STAKE, "Insufficient stake");
        witnessToken.transferFrom(msg.sender, address(this), _amount);
        stakes[msg.sender].amount += _amount;
    }

    function settleCase(uint256 disputeId, uint8 majorityChoice) external {
        // Distribute arbitration fees to majority jurors
        // Slash 5% from coherent minority and boost reputation
    }
}`,
  },
  {
    id: 'reputation-registry',
    name: 'ReputationRegistry.sol',
    filename: 'contracts/ReputationRegistry.sol',
    purpose: 'Maintains tamper-proof on-chain trust scores for marketplace participants and certified jurors.',
    gasEstimate: '~35,000 gas',
    securityNotes: 'Soulbound scores calculated deterministically from successful transactions & arbitration outcomes.',
    keyFunctions: [
      { name: 'getTrustScore', signature: 'getTrustScore(address user)', desc: 'Returns 0-100 composite trust rating based on on-chain history.' },
      { name: 'recordDisputeResult', signature: 'recordDisputeResult(address participant, bool won)', desc: 'Updates historical win/loss ratio and dispute frequency.' },
    ],
    solidityCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ReputationRegistry {
    struct Profile {
        uint32 completedDeals;
        uint32 disputeCount;
        uint32 favorableVerdicts;
        uint32 juryCasesJudged;
        uint32 majorityConcurrences;
    }

    mapping(address => Profile) public profiles;

    function getReputationScore(address account) external view returns (uint8) {
        Profile memory p = profiles[account];
        if (p.completedDeals == 0) return 50; // default baseline
        
        uint32 successRate = (p.completedDeals * 100) / (p.completedDeals + p.disputeCount);
        return uint8(successRate > 100 ? 100 : successRate);
    }
}`,
  },
  {
    id: 'witness-token',
    name: 'WitnessToken.sol',
    filename: 'contracts/WitnessToken.sol',
    purpose: 'Standard ERC-20 token ($WTNS) powering jury staking, DAO governance proposals, and marketplace fee rebates.',
    gasEstimate: '~42,000 gas',
    securityNotes: 'Fixed total supply (100,000,000 WTNS). Deflationary burn mechanism on dispute filing fees.',
    keyFunctions: [
      { name: 'burn', signature: 'burn(uint256 amount)', desc: 'Permanent burn mechanism for arbitration fee deflation.' },
      { name: 'delegate', signature: 'delegate(address delegatee)', desc: 'ERC20Votes checkpointing for protocol governance votes.' },
    ],
    solidityCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract WitnessToken is ERC20Burnable, ERC20Votes {
    uint256 public constant TOTAL_SUPPLY = 100_000_000 * 1e18; // 100M WTNS

    constructor() ERC20("Witness Protocol", "WTNS") EIP712("Witness Protocol", "1") {
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    // Required overrides for ERC20Votes
    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Votes) {
        super._update(from, to, value);
    }
}`,
  },
];

export const LEGAL_CLAUSE_TEMPLATE = `WITNESS PROTOCOL STANDARD ARBITRATION CLAUSE (ToS INTEGRATION):
"Any dispute, controversy, or claim arising out of or relating to this digital contract, milestone, or purchase, including the formation, interpretation, performance, or breach thereof, shall be submitted to and finally resolved by decentralized binding arbitration administered by Witness Protocol (https://witness.network) in accordance with the Witness Protocol Decentralized Arbitration Rules in force on the date on which the dispute is raised. 

The parties hereby expressly agree that:
(a) For disputes where the total sum in escrow is less than $1,000 USD (or cryptocurrency equivalent) and where the Witness Protocol AI Arbiter generates a verdict confidence level exceeding eighty-five percent (85%), the verdict rendered by the automated off-chain oracle shall be legally binding, non-appealable, and immediately self-executed upon the underlying blockchain network;
(b) For disputes exceeding $1,000 USD or failing the automated confidence threshold, the matter shall automatically escalate to a panel of decentralized jurors selected from the Witness Staked Juror Pool;
(c) The parties waive any right to litigate claims in court or before a jury, or to participate in a class action or representative proceeding with respect to any claim subject to arbitration hereunder."`;

export type RouteDecision = 'AUTO_EXECUTE' | 'ESCALATE_TO_JURY';

export interface DisputeScenario {
  id: string;
  title: string;
  category: 'Freelance' | 'E-Commerce' | 'Rental' | 'NFT Trading';
  amount: number;
  buyerName: string;
  buyerAvatar: string;
  buyerClaim: string;
  buyerEvidenceIpfs: string;
  buyerEvidenceDetails: string;
  sellerName: string;
  sellerAvatar: string;
  sellerClaim: string;
  sellerEvidenceIpfs: string;
  sellerEvidenceDetails: string;
  contractTerms: string;
  expectedRoute: RouteDecision;
  explanation: string;
}

export interface AIArbitrationResult {
  success?: boolean;
  winner: 'BUYER' | 'SELLER' | 'SPLIT';
  buyerPayoutPercent: number;
  sellerPayoutPercent: number;
  confidenceScore: number;
  route: RouteDecision;
  routingReason: string;
  summaryRationale: string;
  evidentiaryFindings: string[];
  contractClauseReferenced: string;
  chainlinkProofHash: string;
  source?: string;
}

export interface Juror {
  id: string;
  address: string;
  name: string;
  stakedWTNS: number;
  reputationScore: number;
  vote?: 'BUYER' | 'SELLER' | 'SPLIT';
  rationale?: string;
  status: 'PENDING' | 'COMMITTED' | 'REVEALED';
}

export interface SmartContractItem {
  id: string;
  name: string;
  filename: string;
  purpose: string;
  solidityCode: string;
  keyFunctions: { name: string; signature: string; desc: string }[];
  gasEstimate: string;
  securityNotes: string;
}

export interface ArchitectureNode {
  id: string;
  title: string;
  role: string;
  latency: string;
  layer: 'Client' | 'Protocol' | 'Blockchain' | 'Oracle' | 'AI' | 'Governance';
  description: string;
  tech: string;
}

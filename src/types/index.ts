export type Language = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh' | 'pt';

export type UserRole = 'super_admin' | 'devops' | 'editor' | 'billing' | 'auditor';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  team: string;
}

export interface Project {
  id: string;
  name: string;
  domain: string;
  framework: 'Next.js' | 'Vite React' | 'Astro' | 'Remix' | 'Static HTML';
  status: 'ready' | 'building' | 'error';
  region: string;
  lastDeployedAt: string;
  gitRepo: string;
  gitBranch: string;
  plan: 'Enterprise Pro';
}

export interface Deployment {
  id: string;
  projectId: string;
  url: string;
  branch: string;
  commitHash: string;
  commitMessage: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  durationSeconds: number;
  environment: 'production' | 'preview';
  status: 'ready' | 'building' | 'failed' | 'queued';
  buildLogs: string[];
}

export interface ServerMetrics {
  cpuUsagePercent: number;
  memoryUsedMb: number;
  memoryTotalMb: number;
  diskUsedGb: number;
  diskTotalGb: number;
  networkInMbps: number;
  networkOutMbps: number;
  requestsPerSec: number;
  p50LatencyMs: number;
  p95LatencyMs: number;
  p99LatencyMs: number;
  activeConnections: number;
  edgeCacheHitRatio: number;
  uptimePercentage: number;
}

export interface LiveRequestLog {
  id: string;
  timestamp: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  status: number;
  latencyMs: number;
  country: string;
  countryCode: string;
  ip: string;
  cached: boolean;
}

export interface GeoTraffic {
  country: string;
  code: string;
  requests: number;
  percentage: number;
  latencyMs: number;
}

// Visual Website Builder Types
export type BlockType = 
  | 'header'
  | 'hero'
  | 'features'
  | 'showcase'
  | 'pricing'
  | 'testimonials'
  | 'contact'
  | 'faq'
  | 'cta'
  | 'footer';

export interface BlockContent {
  headline?: string;
  subheadline?: string;
  badge?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  paddingY?: 'compact' | 'normal' | 'generous';
  alignment?: 'left' | 'center';
  items?: Array<{
    id: string;
    title: string;
    description: string;
    icon?: string;
    price?: string;
    period?: string;
    featured?: boolean;
    author?: string;
    role?: string;
    avatar?: string;
  }>;
}

export interface BuilderBlock {
  id: string;
  type: BlockType;
  label: string;
  content: BlockContent;
}

export interface BuilderPage {
  id: string;
  title: string;
  slug: string;
  publishedUrl?: string;
  lastSavedAt: string;
  isPublished: boolean;
  blocks: BuilderBlock[];
}

// Domain Management Types
export type DnsRecordType = 'A' | 'AAAA' | 'CNAME' | 'MX' | 'TXT' | 'SRV';

export interface DnsRecord {
  id: string;
  type: DnsRecordType;
  name: string;
  value: string;
  ttl: number;
  proxied: boolean;
  priority?: number;
}

export interface DomainItem {
  id: string;
  name: string;
  status: 'valid' | 'pending_verification' | 'action_required';
  sslStatus: 'active' | 'issuing' | 'expired';
  sslIssuer: string;
  sslExpiresAt: string;
  isApex: boolean;
  isPrimary: boolean;
  autoRenew: boolean;
  nameservers: string[];
  records: DnsRecord[];
}

// Automated Backups Types
export interface BackupSnapshot {
  id: string;
  name: string;
  createdAt: string;
  sizeMb: number;
  type: 'automated_daily' | 'system_pre_deploy' | 'manual_snapshot';
  status: 'verified' | 'creating' | 'restoring';
  checksumSha256: string;
  storageTier: 'Multi-Region Encrypted (AES-256)';
  databaseCount: number;
  filesCount: number;
}

export interface BackupScheduleConfig {
  enabled: boolean;
  frequency: 'hourly' | 'daily' | 'weekly';
  executionTimeUtc: string;
  retentionDays: number;
  replicateToColdStorage: boolean;
  notifyOnFailure: boolean;
  lockProtection: boolean;
}

// Security & Threat Detection Types
export interface WafRule {
  id: string;
  name: string;
  description: string;
  category: 'owasp' | 'ddos' | 'rate_limit' | 'bot_protection' | 'geo_ip';
  enabled: boolean;
  action: 'block' | 'challenge' | 'log';
  triggersLast24h: number;
}

export interface ThreatEvent {
  id: string;
  timestamp: string;
  attackType: string;
  sourceIp: string;
  targetUri: string;
  country: string;
  countryCode: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  mitigationAction: string;
  signatureMatch: string;
}

export interface SecurityScanResult {
  lastScannedAt: string;
  sslGrade: 'A+' | 'A' | 'B';
  tlsVersion: 'TLS 1.3 (RFC 8446)';
  malwareFound: number;
  fileIntegrityStatus: 'clean' | 'modified';
  vulnerabilitiesResolved: number;
  owaspTop10Score: '100% Mitigated';
}

// Vercel Capabilities: Environment Variables, Serverless Functions & Storage
export interface EnvVariable {
  id: string;
  key: string;
  value: string;
  targets: ('production' | 'preview' | 'development')[];
  isSecret: boolean;
  updatedAt: string;
}

export interface EdgeServerlessFunction {
  id: string;
  name: string;
  route: string;
  runtime: 'Edge Runtime' | 'Node.js 20.x' | 'Python 3.11';
  region: string;
  invocations24h: number;
  avgDurationMs: number;
  memoryAllocatedMb: number;
  errorRate: number;
}

export interface StorageBucketItem {
  id: string;
  type: 'KV Redis' | 'Serverless Postgres' | 'Edge Blob' | 'Edge Config';
  name: string;
  region: string;
  usedBytes: number;
  totalLimitBytes: number;
  connectionUrl: string;
  reads24h: number;
  writes24h: number;
}

// 24/7 Live Support Types
export interface SupportChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'bot' | 'system';
  authorName: string;
  avatar?: string;
  text: string;
  timestamp: string;
  isDiagnostic?: boolean;
  diagnosticData?: {
    serverStatus: string;
    cpu: string;
    memory: string;
    dnsStatus: string;
    sslStatus: string;
    threatsMitigated: number;
  };
}

export interface SupportTicket {
  id: string;
  subject: string;
  priority: 'urgent' | 'high' | 'medium';
  status: 'investigating' | 'open' | 'resolved';
  slaResponseTimeMinutes: number;
  assignedEngineer: string;
  createdAt: string;
}

// RBAC & Team Management Types
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  twoFactorEnabled: boolean;
  joinedAt: string;
  lastActiveAt: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actorName: string;
  actorEmail: string;
  role: UserRole;
  action: string;
  category: 'deployment' | 'security' | 'dns' | 'backup' | 'access' | 'billing';
  targetResource: string;
  ipAddress: string;
  status: 'success' | 'warning' | 'denied';
}

// Paystack Payment & Billing Types
export interface PaystackConfig {
  publicKey: string;
  callbackUrl: string;
  webhookUrl: string;
  environment: 'live' | 'test';
  currency: 'NGN' | 'USD' | 'GHS' | 'ZAR' | 'KES';
  channels: ('card' | 'bank' | 'ussd' | 'qr' | 'mobile_money' | 'bank_transfer')[];
}

export interface PaystackTransaction {
  id: string;
  reference: string;
  amount: number;
  currency: string;
  customerEmail: string;
  channel: string;
  status: 'success' | 'failed' | 'abandoned';
  paidAt: string;
  planOrDescription: string;
  callbackUrl: string;
  verifiedSignature: string;
}

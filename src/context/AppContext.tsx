import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Language,
  UserRole,
  UserProfile,
  Project,
  Deployment,
  ServerMetrics,
  LiveRequestLog,
  GeoTraffic,
  BuilderPage,
  BuilderBlock,
  BlockType,
  DomainItem,
  DnsRecord,
  BackupSnapshot,
  BackupScheduleConfig,
  WafRule,
  ThreatEvent,
  SecurityScanResult,
  EnvVariable,
  EdgeServerlessFunction,
  StorageBucketItem,
  SupportChatMessage,
  SupportTicket,
  TeamMember,
  AuditEvent,
  PaystackConfig,
  PaystackTransaction
} from '../types';
import { translations, Translations } from '../i18n/translations';

export type ActiveTab =
  | 'overview'
  | 'deployments'
  | 'builder'
  | 'domains'
  | 'backups'
  | 'security'
  | 'functions'
  | 'analytics'
  | 'storage'
  | 'envvars'
  | 'billing'
  | 'team'
  | 'audit'
  | 'support';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  currentUser: UserProfile;
  projects: Project[];
  activeProject: Project;
  setActiveProject: (p: Project) => void;
  serverMetrics: ServerMetrics;
  isLiveMonitoring: boolean;
  setIsLiveMonitoring: (val: boolean) => void;
  liveRequests: LiveRequestLog[];
  geoTraffic: GeoTraffic[];
  
  // Deployments
  deployments: Deployment[];
  triggerDeployment: (branch?: string) => void;
  rollbackDeployment: (deploymentId: string) => void;
  selectedDeploymentForLogs: Deployment | null;
  setSelectedDeploymentForLogs: (d: Deployment | null) => void;

  // Visual Website Builder
  builderPage: BuilderPage;
  addBlockToBuilder: (type: BlockType) => void;
  updateBlockContent: (blockId: string, contentUpdates: Partial<BuilderBlock['content']>) => void;
  removeBlock: (blockId: string) => void;
  moveBlock: (blockId: string, direction: 'up' | 'down') => void;
  loadBuilderTemplate: (templateName: string) => void;
  publishBuilderSite: () => void;
  isPreviewModalOpen: boolean;
  setIsPreviewModalOpen: (open: boolean) => void;
  builderDeviceMode: 'desktop' | 'tablet' | 'mobile';
  setBuilderDeviceMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;

  // Domains & DNS
  domains: DomainItem[];
  addDnsRecord: (domainId: string, record: Omit<DnsRecord, 'id'>) => void;
  deleteDnsRecord: (domainId: string, recordId: string) => void;
  toggleProxyDnsRecord: (domainId: string, recordId: string) => void;
  simulateDomainPurchase: (domainName: string) => void;

  // Backups
  backups: BackupSnapshot[];
  backupSchedule: BackupScheduleConfig;
  updateBackupSchedule: (cfg: Partial<BackupScheduleConfig>) => void;
  createManualSnapshot: (name: string) => void;
  restoreSnapshot: (snapshotId: string) => void;
  activeRestoringSnapshot: BackupSnapshot | null;
  restoreProgress: number;

  // Security
  wafRules: WafRule[];
  toggleWafRule: (id: string) => void;
  threatEvents: ThreatEvent[];
  securityScanResult: SecurityScanResult;
  isScanningSecurity: boolean;
  runDeepSecurityScan: () => void;

  // Vercel Capabilities: Env Vars, Edge Functions, Storage
  envVars: EnvVariable[];
  addEnvVar: (key: string, value: string, targets: ('production' | 'preview' | 'development')[]) => void;
  deleteEnvVar: (id: string) => void;
  edgeFunctions: EdgeServerlessFunction[];
  storageBuckets: StorageBucketItem[];

  // 24/7 Live Support
  isSupportChatOpen: boolean;
  setIsSupportChatOpen: (open: boolean) => void;
  chatMessages: SupportChatMessage[];
  sendChatMessage: (text: string) => void;
  runChatDiagnostics: () => void;
  escalateToEngineer: () => void;
  supportTickets: SupportTicket[];

  // RBAC & Team
  teamMembers: TeamMember[];
  addTeamMember: (name: string, email: string, role: UserRole) => void;
  updateMemberRole: (id: string, role: UserRole) => void;
  auditLogs: AuditEvent[];
  addAuditLog: (action: string, category: AuditEvent['category'], target: string, status?: AuditEvent['status']) => void;

  // Paystack Payments & Billing
  paystackConfig: PaystackConfig;
  updatePaystackConfig: (cfg: Partial<PaystackConfig>) => void;
  paystackTransactions: PaystackTransaction[];
  initiatePaystackPayment: (amount: number, description: string, email?: string) => void;
  isPaystackModalOpen: boolean;
  setIsPaystackModalOpen: (open: boolean) => void;
  activeCheckoutPlan: { name: string; price: string; amount: number } | null;
  setActiveCheckoutPlan: (plan: { name: string; price: string; amount: number } | null) => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [activeRole, setActiveRole] = useState<UserRole>('super_admin');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const t = translations[language] || translations.en;

  const currentUser: UserProfile = {
    id: 'usr_enterprise_01',
    name: 'Alex Rivera',
    email: 'alex.rivera@enterprise-aether.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    role: activeRole,
    team: 'Global Infrastructure Core'
  };

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'prj_01',
      name: 'acme-edge-storefront',
      domain: 'acme-store.aetherhost.app',
      framework: 'Next.js',
      status: 'ready',
      region: 'iad1 (US East Anycast)',
      lastDeployedAt: 'Just now',
      gitRepo: 'github.com/acme/storefront-next',
      gitBranch: 'main',
      plan: 'Enterprise Pro'
    },
    {
      id: 'prj_02',
      name: 'hyperion-api-gateway',
      domain: 'api.hyperion.aetherhost.app',
      framework: 'Vite React',
      status: 'ready',
      region: 'lhr1 (EU West London)',
      lastDeployedAt: '2 hours ago',
      gitRepo: 'github.com/acme/hyperion-edge',
      gitBranch: 'staging',
      plan: 'Enterprise Pro'
    }
  ]);

  const [activeProject, setActiveProject] = useState<Project>(projects[0]);

  // Live Server Metrics
  const [isLiveMonitoring, setIsLiveMonitoring] = useState(true);
  const [serverMetrics, setServerMetrics] = useState<ServerMetrics>({
    cpuUsagePercent: 24.8,
    memoryUsedMb: 6144,
    memoryTotalMb: 16384,
    diskUsedGb: 142.4,
    diskTotalGb: 512,
    networkInMbps: 382.4,
    networkOutMbps: 844.1,
    requestsPerSec: 1420,
    p50LatencyMs: 12.4,
    p95LatencyMs: 38.6,
    p99LatencyMs: 84.2,
    activeConnections: 9420,
    edgeCacheHitRatio: 98.4,
    uptimePercentage: 99.998
  });

  // Simulated Live Request Stream
  const [liveRequests, setLiveRequests] = useState<LiveRequestLog[]>([
    { id: 'req_1', timestamp: '14:28:01.042', method: 'GET', path: '/api/v1/products?limit=24', status: 200, latencyMs: 14, country: 'United States', countryCode: 'US', ip: '108.162.245.88', cached: true },
    { id: 'req_2', timestamp: '14:28:00.892', method: 'POST', path: '/api/checkout/session', status: 201, latencyMs: 42, country: 'Germany', countryCode: 'DE', ip: '194.154.212.19', cached: false },
    { id: 'req_3', timestamp: '14:28:00.720', method: 'GET', path: '/_next/static/chunks/main.js', status: 304, latencyMs: 6, country: 'Japan', countryCode: 'JP', ip: '133.242.18.91', cached: true },
    { id: 'req_4', timestamp: '14:28:00.412', method: 'GET', path: '/images/hero-banner.webp', status: 200, latencyMs: 9, country: 'United Kingdom', countryCode: 'GB', ip: '82.165.197.1', cached: true },
    { id: 'req_5', timestamp: '14:28:00.104', method: 'GET', path: '/blog/enterprise-edge-computing', status: 200, latencyMs: 18, country: 'France', countryCode: 'FR', ip: '51.15.24.110', cached: true },
    { id: 'req_6', timestamp: '14:27:59.810', method: 'POST', path: '/api/auth/token', status: 200, latencyMs: 35, country: 'Canada', countryCode: 'CA', ip: '142.44.215.82', cached: false }
  ]);

  const [geoTraffic, setGeoTraffic] = useState<GeoTraffic[]>([
    { country: 'United States (North America)', code: 'US', requests: 489200, percentage: 42.5, latencyMs: 12 },
    { country: 'Germany & EU Central', code: 'DE', requests: 284100, percentage: 24.7, latencyMs: 16 },
    { country: 'Japan & East Asia', code: 'JP', requests: 172400, percentage: 15.0, latencyMs: 24 },
    { country: 'United Kingdom', code: 'GB', requests: 114900, percentage: 10.0, latencyMs: 14 },
    { country: 'Brazil & South America', code: 'BR', requests: 52100, percentage: 4.5, latencyMs: 46 },
    { country: 'Australia & Oceania', code: 'AU', requests: 38200, percentage: 3.3, latencyMs: 62 }
  ]);

  // Metric fluctuation loop
  useEffect(() => {
    if (!isLiveMonitoring) return;
    const interval = setInterval(() => {
      setServerMetrics(prev => {
        const deltaRps = Math.floor(Math.random() * 80) - 40;
        const newRps = Math.max(900, Math.min(2400, prev.requestsPerSec + deltaRps));
        const deltaCpu = (Math.random() * 4 - 2);
        const newCpu = Math.max(12, Math.min(78, Number((prev.cpuUsagePercent + deltaCpu).toFixed(1))));
        const deltaMem = Math.floor(Math.random() * 32) - 16;
        const newMem = Math.max(4800, Math.min(12000, prev.memoryUsedMb + deltaMem));
        const deltaP95 = (Math.random() * 2 - 1);
        const newP95 = Math.max(22, Math.min(65, Number((prev.p95LatencyMs + deltaP95).toFixed(1))));

        return {
          ...prev,
          requestsPerSec: newRps,
          cpuUsagePercent: newCpu,
          memoryUsedMb: newMem,
          p95LatencyMs: newP95,
          activeConnections: prev.activeConnections + Math.floor(Math.random() * 20 - 10)
        };
      });

      // Add fresh request log
      const paths = ['/api/products', '/checkout/pay', '/assets/app.css', '/api/user/me', '/pricing', '/graphql'];
      const methods: ('GET' | 'POST')[] = ['GET', 'GET', 'GET', 'POST'];
      const countries = [
        { name: 'United States', code: 'US', ip: '108.162.' + Math.floor(Math.random() * 255) + '.12' },
        { name: 'Germany', code: 'DE', ip: '194.154.' + Math.floor(Math.random() * 255) + '.44' },
        { name: 'Japan', code: 'JP', ip: '133.242.' + Math.floor(Math.random() * 255) + '.9' },
        { name: 'United Kingdom', code: 'GB', ip: '82.165.' + Math.floor(Math.random() * 255) + '.71' }
      ];
      const pickC = countries[Math.floor(Math.random() * countries.length)];
      const pickPath = paths[Math.floor(Math.random() * paths.length)];
      const pickMethod = methods[Math.floor(Math.random() * methods.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');

      setLiveRequests(prev => [
        {
          id: 'req_' + Date.now(),
          timestamp: timeStr,
          method: pickMethod,
          path: pickPath,
          status: Math.random() > 0.04 ? 200 : 304,
          latencyMs: Math.floor(Math.random() * 28) + 8,
          country: pickC.name,
          countryCode: pickC.code,
          ip: pickC.ip,
          cached: Math.random() > 0.15
        },
        ...prev.slice(0, 19)
      ]);
    }, 2800);

    return () => clearInterval(interval);
  }, [isLiveMonitoring]);

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>([
    {
      id: 'aud_01',
      timestamp: '2026-10-14 07:54:12 UTC',
      actorName: 'Alex Rivera',
      actorEmail: 'alex.rivera@enterprise-aether.io',
      role: 'super_admin',
      action: 'DNS Record Updated (A @ -> 76.76.21.21)',
      category: 'dns',
      targetResource: 'acme-store.com',
      ipAddress: '192.0.2.14',
      status: 'success'
    },
    {
      id: 'aud_02',
      timestamp: '2026-10-14 06:12:00 UTC',
      actorName: 'System Scheduler',
      actorEmail: 'cron-engine@aetherhost.internal',
      role: 'super_admin',
      action: 'Automated Snapshot Created (snap-daily-0200)',
      category: 'backup',
      targetResource: 'vol-nvme-iad1-0941',
      ipAddress: '127.0.0.1',
      status: 'success'
    },
    {
      id: 'aud_03',
      timestamp: '2026-10-14 04:30:19 UTC',
      actorName: 'Alex Rivera',
      actorEmail: 'alex.rivera@enterprise-aether.io',
      role: 'super_admin',
      action: 'WAF Rule Enabled (OWASP CRS v3.3.4)',
      category: 'security',
      targetResource: 'waf-policy-global',
      ipAddress: '192.0.2.14',
      status: 'success'
    },
    {
      id: 'aud_04',
      timestamp: '2026-10-13 23:15:44 UTC',
      actorName: 'Elena Rostova',
      actorEmail: 'elena@enterprise-aether.io',
      role: 'devops',
      action: 'Production Edge Deployment Promoted (c81df3a)',
      category: 'deployment',
      targetResource: 'acme-edge-storefront',
      ipAddress: '198.51.100.8',
      status: 'success'
    }
  ]);

  const addAuditLog = (action: string, category: AuditEvent['category'], target: string, status: AuditEvent['status'] = 'success') => {
    const newLog: AuditEvent = {
      id: 'aud_' + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      actorName: currentUser.name,
      actorEmail: currentUser.email,
      role: activeRole,
      action,
      category,
      targetResource: target,
      ipAddress: '192.0.2.89',
      status
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Deployments (Vercel Style)
  const [deployments, setDeployments] = useState<Deployment[]>([
    {
      id: 'dpl_01_prod',
      projectId: 'prj_01',
      url: 'https://acme-edge-storefront-aether.vercel.app',
      branch: 'main',
      commitHash: '8b9c4f1',
      commitMessage: 'feat(cart): optimize checkout edge caching & brotli compression',
      author: 'Alex Rivera',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
      createdAt: '12 minutes ago',
      durationSeconds: 28,
      environment: 'production',
      status: 'ready',
      buildLogs: [
        '[14:15:02] Cloning git repository: github.com/acme/storefront-next (branch: main)',
        '[14:15:04] Detected Framework: Next.js 15.1.0 with Turbopack',
        '[14:15:07] Running build command: `npm run build`',
        '[14:15:14] Generating static pages (34/34) in 6.4s',
        '[14:15:19] Prerendered 12 dynamic Serverless functions to 14 Edge regions (iad1, lhr1, nrt1)',
        '[14:15:24] Build completed in 28.14s. Uploading edge assets...',
        '[14:15:28] Deployed to production at https://acme-store.aetherhost.app with SSL/TLS active'
      ]
    },
    {
      id: 'dpl_02_prev',
      projectId: 'prj_01',
      url: 'https://acme-edge-storefront-git-feature-redesign.aetherhost.app',
      branch: 'feature/redesign-hero',
      commitHash: 'a71e29c',
      commitMessage: 'design: update hero typography & interactive product showcase',
      author: 'Marcus Vance',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
      createdAt: '1 hour ago',
      durationSeconds: 32,
      environment: 'preview',
      status: 'ready',
      buildLogs: [
        '[13:22:01] Pull Request #144 verified from branch feature/redesign-hero',
        '[13:22:05] Running tests & lint checks: PASSED (142 suites)',
        '[13:22:18] Compiled successfully with Turbopack',
        '[13:22:32] Preview deployment ready at https://acme-edge-storefront-git-feature-redesign.aetherhost.app'
      ]
    },
    {
      id: 'dpl_03_prev',
      projectId: 'prj_01',
      url: 'https://acme-edge-storefront-git-refactor-db.aetherhost.app',
      branch: 'refactor/postgres-pool',
      commitHash: '4f03d12',
      commitMessage: 'perf: connection pooling for Serverless Postgres',
      author: 'Elena Rostova',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
      createdAt: '4 hours ago',
      durationSeconds: 24,
      environment: 'preview',
      status: 'ready',
      buildLogs: [
        '[10:04:10] Inspecting Prisma client schema & Edge connection pool',
        '[10:04:18] Build cache restored (84% cache hit)',
        '[10:04:24] Deployed to preview successfully'
      ]
    }
  ]);

  const [selectedDeploymentForLogs, setSelectedDeploymentForLogs] = useState<Deployment | null>(null);

  const triggerDeployment = (branch = 'main') => {
    if (activeRole === 'billing' || activeRole === 'auditor') {
      showToast('Action Denied: Your current role lacks deployment privileges.');
      addAuditLog(`Deployment Attempt Blocked (Unauthorized Role: ${activeRole})`, 'access', activeProject.name, 'denied');
      return;
    }

    const newDepId = 'dpl_' + Date.now().toString(36);
    const newDep: Deployment = {
      id: newDepId,
      projectId: activeProject.id,
      url: `https://${activeProject.name}-${newDepId.slice(0, 5)}.aetherhost.app`,
      branch,
      commitHash: Math.random().toString(36).substring(2, 9),
      commitMessage: `chore(release): instant deployment triggered via AetherHost Console`,
      author: currentUser.name,
      authorAvatar: currentUser.avatar,
      createdAt: 'Building now...',
      durationSeconds: 0,
      environment: branch === 'main' ? 'production' : 'preview',
      status: 'building',
      buildLogs: [
        `[${new Date().toLocaleTimeString()}] Triggering cloud build worker in region ${activeProject.region}`,
        `[${new Date().toLocaleTimeString()}] Fetching source code from ${activeProject.gitRepo}`,
        `[${new Date().toLocaleTimeString()}] Installing dependencies with bun/npm...`,
        `[${new Date().toLocaleTimeString()}] Executing production optimization passes...`
      ]
    };

    setDeployments(prev => [newDep, ...prev]);
    showToast('Deployment initiated on Global Edge network...');
    addAuditLog(`New Deployment Initiated (${branch})`, 'deployment', activeProject.name);

    setTimeout(() => {
      setDeployments(prev =>
        prev.map(d =>
          d.id === newDepId
            ? {
                ...d,
                status: 'ready',
                createdAt: 'Just now',
                durationSeconds: 18,
                buildLogs: [
                  ...d.buildLogs,
                  `[${new Date().toLocaleTimeString()}] Static assets optimized & distributed across 312 edge PoPs.`,
                  `[${new Date().toLocaleTimeString()}] Deployment live and verified with TLS 1.3.`
                ]
              }
            : d
        )
      );
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      showToast('Deployment complete! Live on all Edge nodes.');
      addAuditLog(`Deployment Published Successfully (${branch})`, 'deployment', activeProject.name);
    }, 3200);
  };

  const rollbackDeployment = (deploymentId: string) => {
    if (activeRole !== 'super_admin' && activeRole !== 'devops') {
      showToast('Action Denied: Rollbacks require DevOps or Super Admin permissions.');
      return;
    }
    const target = deployments.find(d => d.id === deploymentId);
    if (!target) return;

    showToast(`Initiating instant zero-downtime rollback to ${target.commitHash}...`);
    setTimeout(() => {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
      showToast(`Rollback complete! Production traffic now pointing to ${target.commitHash}.`);
      addAuditLog(`Rollback Executed to ${target.commitHash}`, 'deployment', activeProject.name);
    }, 2000);
  };

  // Drag-and-Drop Visual Website Builder State
  const initialBlocks: BuilderBlock[] = [
    {
      id: 'blk_nav',
      type: 'header',
      label: 'Navigation Bar',
      content: {
        headline: 'AetherEdge Studio',
        primaryButtonText: 'Get Started Free',
        primaryButtonLink: '#signup',
        secondaryButtonText: 'Explore Features',
        secondaryButtonLink: '#features',
        backgroundColor: '#030712',
        textColor: '#f8fafc',
        accentColor: '#38bdf8'
      }
    },
    {
      id: 'blk_hero',
      type: 'hero',
      label: 'Hero Section',
      content: {
        badge: 'NEW: Edge Compute v4.2 Live',
        headline: 'Ship High-Performance Web Apps with Edge Speed',
        subheadline: 'The enterprise hosting platform engineered for blistering speed, zero-configuration SSL, automated disaster recovery, and visual drag-and-drop creation.',
        primaryButtonText: 'Launch Live Site',
        primaryButtonLink: '#builder',
        secondaryButtonText: 'Read Documentation',
        secondaryButtonLink: '#docs',
        backgroundColor: '#090d16',
        textColor: '#f8fafc',
        accentColor: '#0ea5e9',
        alignment: 'center',
        paddingY: 'generous'
      }
    },
    {
      id: 'blk_feat',
      type: 'features',
      label: 'Core Features Grid',
      content: {
        headline: 'Architected for 99.999% Availability',
        subheadline: 'Everything required to run mission-critical web applications without managing servers.',
        backgroundColor: '#030712',
        textColor: '#f8fafc',
        accentColor: '#38bdf8',
        items: [
          {
            id: 'f1',
            title: 'Automated Snapshot Backups',
            description: 'Hourly differential backups replicated across 3 multi-cloud zones with 1-click restore.',
            icon: 'HardDrive'
          },
          {
            id: 'f2',
            title: 'Anycast DNS & Auto-SSL',
            description: 'Instant propagation in < 5 seconds with zero-touch wildcard Let’s Encrypt certificates.',
            icon: 'Globe'
          },
          {
            id: 'f3',
            title: 'OWASP Threat Mitigation',
            description: 'Deep packet inspection scrubbing Layer 7 DDoS, SQLi, and malicious bot traffic in real time.',
            icon: 'ShieldCheck'
          }
        ]
      }
    },
    {
      id: 'blk_pricing',
      type: 'pricing',
      label: 'Pricing & Plans',
      content: {
        headline: 'Transparent, Predictable Cloud Hosting',
        subheadline: 'Scale seamlessly from prototype to enterprise without surprise bandwidth overages.',
        backgroundColor: '#0b1120',
        textColor: '#f8fafc',
        accentColor: '#0284c7',
        items: [
          {
            id: 'p1',
            title: 'Starter Edge',
            price: '$0',
            period: '/mo forever',
            description: 'For hobbyists and independent creators.',
            featured: false
          },
          {
            id: 'p2',
            title: 'Pro Scale',
            price: '$20',
            period: '/mo per member',
            description: 'For growing web projects & fast startups.',
            featured: true
          },
          {
            id: 'p3',
            title: 'Enterprise Dedicated',
            price: '$180',
            period: '/mo custom SLA',
            description: 'Dedicated cloud clusters with 24/7 phone SLA.',
            featured: false
          }
        ]
      }
    },
    {
      id: 'blk_cta',
      type: 'cta',
      label: 'Call to Action Banner',
      content: {
        headline: 'Ready to elevate your web presence?',
        subheadline: 'Join over 250,000 developers hosting fast, secure websites with AetherHost.',
        primaryButtonText: 'Deploy Site in 60s',
        primaryButtonLink: '#deploy',
        backgroundColor: '#0f172a',
        textColor: '#f8fafc',
        accentColor: '#38bdf8',
        alignment: 'center'
      }
    },
    {
      id: 'blk_footer',
      type: 'footer',
      label: 'Site Footer',
      content: {
        headline: 'AetherHost Global Cloud Platform',
        subheadline: '© 2026 AetherHost Inc. All rights reserved. SOC 2 Type II Certified.',
        backgroundColor: '#020617',
        textColor: '#94a3b8'
      }
    }
  ];

  const [builderPage, setBuilderPage] = useState<BuilderPage>({
    id: 'page_home',
    title: 'Landing Page (Homepage)',
    slug: '/',
    publishedUrl: 'https://acme-store.aetherhost.app',
    lastSavedAt: 'Just now',
    isPublished: true,
    blocks: initialBlocks
  });

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [builderDeviceMode, setBuilderDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const addBlockToBuilder = (type: BlockType) => {
    const newId = 'blk_' + Date.now();
    let newBlock: BuilderBlock;

    switch (type) {
      case 'testimonials':
        newBlock = {
          id: newId,
          type: 'testimonials',
          label: 'Customer Testimonials',
          content: {
            headline: 'Trusted by High-Velocity Engineering Teams',
            subheadline: 'Here is what lead architects say about AetherHost.',
            backgroundColor: '#030712',
            textColor: '#f8fafc',
            accentColor: '#38bdf8',
            items: [
              {
                id: 't1',
                title: 'Cut our page load time by 68%',
                description: 'The edge caching and automated image compression took our Core Web Vitals to a straight 100 on desktop and mobile.',
                author: 'Sarah Chen',
                role: 'VP of Engineering at FinScale'
              },
              {
                id: 't2',
                title: 'The automated backups saved us during a database migration',
                description: 'One-click snapshot restore rolled back a corrupt index in under 15 seconds with zero data loss.',
                author: 'Liam O’Connor',
                role: 'Principal DevOps Architect'
              }
            ]
          }
        };
        break;
      case 'contact':
        newBlock = {
          id: newId,
          type: 'contact',
          label: 'Contact & Lead Capture',
          content: {
            headline: 'Get in Touch with Our Team',
            subheadline: 'We reply within 15 minutes during standard working hours.',
            primaryButtonText: 'Send Message',
            backgroundColor: '#090d16',
            textColor: '#f8fafc',
            accentColor: '#0ea5e9'
          }
        };
        break;
      case 'faq':
        newBlock = {
          id: newId,
          type: 'faq',
          label: 'Frequently Asked Questions',
          content: {
            headline: 'Frequently Asked Questions',
            subheadline: 'Everything you need to know about our webhosting and site builder.',
            backgroundColor: '#030712',
            textColor: '#f8fafc',
            items: [
              {
                id: 'q1',
                title: 'How do automated backups work?',
                description: 'We take hourly incremental snapshots of your database and code. You can revert any snapshot with 1 click.'
              },
              {
                id: 'q2',
                title: 'Can I connect my own custom domain?',
                description: 'Yes! Full DNS record management with automatic Let’s Encrypt wildcard certificates is included on all plans.'
              }
            ]
          }
        };
        break;
      default:
        newBlock = {
          id: newId,
          type,
          label: type.charAt(0).toUpperCase() + type.slice(1) + ' Section',
          content: {
            headline: 'Custom ' + type.charAt(0).toUpperCase() + type.slice(1),
            subheadline: 'Customize this block in the settings panel to the right.',
            backgroundColor: '#090d16',
            textColor: '#f8fafc',
            accentColor: '#38bdf8'
          }
        };
    }

    setBuilderPage(prev => ({
      ...prev,
      blocks: [...prev.blocks.slice(0, -1), newBlock, prev.blocks[prev.blocks.length - 1]] // insert right before footer
    }));
    showToast(`Added ${newBlock.label} to site builder!`);
    addAuditLog(`Website Builder: Added Block (${newBlock.label})`, 'deployment', builderPage.slug);
  };

  const updateBlockContent = (blockId: string, contentUpdates: Partial<BuilderBlock['content']>) => {
    setBuilderPage(prev => ({
      ...prev,
      lastSavedAt: 'Just now',
      blocks: prev.blocks.map(b => b.id === blockId ? { ...b, content: { ...b.content, ...contentUpdates } } : b)
    }));
  };

  const removeBlock = (blockId: string) => {
    setBuilderPage(prev => ({
      ...prev,
      blocks: prev.blocks.filter(b => b.id !== blockId)
    }));
    showToast('Block removed');
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    setBuilderPage(prev => {
      const idx = prev.blocks.findIndex(b => b.id === blockId);
      if (idx === -1) return prev;
      if (direction === 'up' && idx === 0) return prev;
      if (direction === 'down' && idx === prev.blocks.length - 1) return prev;

      const newBlocks = [...prev.blocks];
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      const temp = newBlocks[idx];
      newBlocks[idx] = newBlocks[targetIdx];
      newBlocks[targetIdx] = temp;

      return { ...prev, blocks: newBlocks };
    });
  };

  const loadBuilderTemplate = (templateName: string) => {
    showToast(`Loading "${templateName}" template...`);
    // Pre-populate with curated templates
    if (templateName === 'SaaS Startup') {
      setBuilderPage(prev => ({ ...prev, blocks: initialBlocks }));
    } else if (templateName === 'Portfolio & Agency') {
      setBuilderPage(prev => ({
        ...prev,
        blocks: [
          initialBlocks[0],
          {
            ...initialBlocks[1],
            content: {
              ...initialBlocks[1].content,
              badge: 'Visual Design & Engineering',
              headline: 'Crafting Brand Experiences That Convert',
              subheadline: 'Award-winning digital consultancy partnering with ambitious leaders.'
            }
          },
          initialBlocks[2],
          initialBlocks[4],
          initialBlocks[5]
        ]
      }));
    } else {
      setBuilderPage(prev => ({ ...prev, blocks: initialBlocks }));
    }
  };

  const publishBuilderSite = () => {
    if (activeRole === 'auditor') {
      showToast('Action Denied: Read-only auditors cannot publish changes.');
      return;
    }
    showToast('Compiling visual blocks & deploying to Edge CDN...');
    setTimeout(() => {
      setBuilderPage(prev => ({
        ...prev,
        isPublished: true,
        lastSavedAt: 'Just now'
      }));
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      showToast('Site published successfully to https://acme-store.aetherhost.app!');
      addAuditLog('Visual Site Builder: Published Changes to Edge', 'deployment', builderPage.slug);
    }, 1500);
  };

  // Domain Management & DNS State
  const [domains, setDomains] = useState<DomainItem[]>([
    {
      id: 'dom_01',
      name: 'acme-store.com',
      status: 'valid',
      sslStatus: 'active',
      sslIssuer: "Let's Encrypt Authority X3 (Auto-Renewed)",
      sslExpiresAt: '2027-04-18',
      isApex: true,
      isPrimary: true,
      autoRenew: true,
      nameservers: ['ns1.aetherdns.net', 'ns2.aetherdns.net'],
      records: [
        { id: 'rec_1', type: 'A', name: '@', value: '76.76.21.21', ttl: 300, proxied: true },
        { id: 'rec_2', type: 'CNAME', name: 'www', value: 'cname.aetherhost.app', ttl: 300, proxied: true },
        { id: 'rec_3', type: 'MX', name: '@', value: 'mail.protection.outlook.com', ttl: 3600, proxied: false, priority: 10 },
        { id: 'rec_4', type: 'TXT', name: '@', value: 'v=spf1 include:spf.protection.outlook.com ~all', ttl: 3600, proxied: false },
        { id: 'rec_5', type: 'AAAA', name: '@', value: '2606:4700:4700::1111', ttl: 300, proxied: true }
      ]
    },
    {
      id: 'dom_02',
      name: 'shop.hyperion-corp.io',
      status: 'valid',
      sslStatus: 'active',
      sslIssuer: "AetherHost Managed Wildcard CA",
      sslExpiresAt: '2027-02-10',
      isApex: false,
      isPrimary: false,
      autoRenew: true,
      nameservers: ['ns1.aetherdns.net', 'ns2.aetherdns.net'],
      records: [
        { id: 'rec_6', type: 'CNAME', name: 'shop', value: 'cname.aetherhost.app', ttl: 300, proxied: true },
        { id: 'rec_7', type: 'TXT', name: '_aether-verify', value: 'token_991823abfd930', ttl: 300, proxied: false }
      ]
    }
  ]);

  const addDnsRecord = (domainId: string, record: Omit<DnsRecord, 'id'>) => {
    if (activeRole === 'editor' || activeRole === 'billing' || activeRole === 'auditor') {
      showToast('Action Denied: You do not have permission to modify DNS records.');
      return;
    }
    const newRecord: DnsRecord = {
      ...record,
      id: 'rec_' + Date.now().toString(36)
    };
    setDomains(prev =>
      prev.map(d => (d.id === domainId ? { ...d, records: [...d.records, newRecord] } : d))
    );
    showToast(`Added ${record.type} record for ${record.name}`);
    addAuditLog(`DNS Record Added (${record.type} ${record.name} -> ${record.value})`, 'dns', domainId);
  };

  const deleteDnsRecord = (domainId: string, recordId: string) => {
    if (activeRole !== 'super_admin' && activeRole !== 'devops') {
      showToast('Action Denied: Deleting DNS records requires DevOps or Admin privileges.');
      return;
    }
    setDomains(prev =>
      prev.map(d =>
        d.id === domainId ? { ...d, records: d.records.filter(r => r.id !== recordId) } : d
      )
    );
    showToast('DNS record deleted');
    addAuditLog(`DNS Record Removed (Record ID: ${recordId})`, 'dns', domainId);
  };

  const toggleProxyDnsRecord = (domainId: string, recordId: string) => {
    setDomains(prev =>
      prev.map(d =>
        d.id === domainId
          ? {
              ...d,
              records: d.records.map(r =>
                r.id === recordId ? { ...r, proxied: !r.proxied } : r
              )
            }
          : d
      )
    );
    showToast('Toggled Cloudflare / Edge Proxy status');
  };

  const simulateDomainPurchase = (domainName: string) => {
    const newDomain: DomainItem = {
      id: 'dom_' + Date.now().toString(36),
      name: domainName,
      status: 'valid',
      sslStatus: 'active',
      sslIssuer: "Let's Encrypt Wildcard Automated",
      sslExpiresAt: '2027-10-14',
      isApex: true,
      isPrimary: false,
      autoRenew: true,
      nameservers: ['ns1.aetherdns.net', 'ns2.aetherdns.net'],
      records: [
        { id: 'rec_auto_1', type: 'A', name: '@', value: '76.76.21.21', ttl: 300, proxied: true },
        { id: 'rec_auto_2', type: 'CNAME', name: 'www', value: 'cname.aetherhost.app', ttl: 300, proxied: true }
      ]
    };
    setDomains(prev => [...prev, newDomain]);
    confetti({ particleCount: 45, spread: 60 });
    showToast(`Domain "${domainName}" registered and configured with Auto-SSL!`);
    addAuditLog(`Domain Registered (${domainName})`, 'dns', domainName);
  };

  // Automated Backups State
  const [backups, setBackups] = useState<BackupSnapshot[]>([
    {
      id: 'snap_01',
      name: 'automated-daily-20261014-0200',
      createdAt: 'Today at 02:00 UTC',
      sizeMb: 1840,
      type: 'automated_daily',
      status: 'verified',
      checksumSha256: '9f83a219bc894efc8930129fbc8012da73921bce89',
      storageTier: 'Multi-Region Encrypted (AES-256)',
      databaseCount: 3,
      filesCount: 42100
    },
    {
      id: 'snap_02',
      name: 'pre-deploy-release-v4.2',
      createdAt: 'Yesterday at 18:45 UTC',
      sizeMb: 1825,
      type: 'system_pre_deploy',
      status: 'verified',
      checksumSha256: '38a9bc714f2e881023a890bcfe4421aa09841bb271',
      storageTier: 'Multi-Region Encrypted (AES-256)',
      databaseCount: 3,
      filesCount: 41850
    },
    {
      id: 'snap_03',
      name: 'manual-migration-safeguard',
      createdAt: '3 days ago at 10:12 UTC',
      sizeMb: 1790,
      type: 'manual_snapshot',
      status: 'verified',
      checksumSha256: 'e81024bc019a823cfb890123efca4912bb09230198',
      storageTier: 'Multi-Region Encrypted (AES-256)',
      databaseCount: 3,
      filesCount: 40920
    }
  ]);

  const [backupSchedule, setBackupSchedule] = useState<BackupScheduleConfig>({
    enabled: true,
    frequency: 'daily',
    executionTimeUtc: '02:00 UTC',
    retentionDays: 30,
    replicateToColdStorage: true,
    notifyOnFailure: true,
    lockProtection: true
  });

  const updateBackupSchedule = (cfg: Partial<BackupScheduleConfig>) => {
    if (activeRole !== 'super_admin' && activeRole !== 'devops') {
      showToast('Action Denied: Modifying backup policies requires DevOps/Admin permissions.');
      return;
    }
    setBackupSchedule(prev => ({ ...prev, ...cfg }));
    showToast('Backup policy schedule updated');
    addAuditLog('Backup Policy Configuration Updated', 'backup', 'cluster-retention-policy');
  };

  const createManualSnapshot = (name: string) => {
    const snapId = 'snap_' + Date.now().toString(36);
    const newSnap: BackupSnapshot = {
      id: snapId,
      name: name || `manual-snapshot-${new Date().toISOString().slice(0, 10)}`,
      createdAt: 'Creating snapshot...',
      sizeMb: 1845,
      type: 'manual_snapshot',
      status: 'creating',
      checksumSha256: 'Computing SHA-256 hash...',
      storageTier: 'Multi-Region Encrypted (AES-256)',
      databaseCount: 3,
      filesCount: 42350
    };

    setBackups(prev => [newSnap, ...prev]);
    showToast('Creating immutable multi-region encrypted snapshot...');

    setTimeout(() => {
      setBackups(prev =>
        prev.map(b =>
          b.id === snapId
            ? {
                ...b,
                status: 'verified',
                createdAt: 'Just now',
                checksumSha256: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
              }
            : b
        )
      );
      showToast('Snapshot created and verified across secondary regions!');
      addAuditLog(`Manual Snapshot Created (${newSnap.name})`, 'backup', snapId);
    }, 2400);
  };

  const [activeRestoringSnapshot, setActiveRestoringSnapshot] = useState<BackupSnapshot | null>(null);
  const [restoreProgress, setRestoreProgress] = useState(0);

  const restoreSnapshot = (snapshotId: string) => {
    if (activeRole !== 'super_admin' && activeRole !== 'devops') {
      showToast('Action Denied: Restoring system backups requires DevOps or Admin role.');
      return;
    }
    const snap = backups.find(b => b.id === snapshotId);
    if (!snap) return;

    setActiveRestoringSnapshot(snap);
    setRestoreProgress(5);

    const stepInterval = setInterval(() => {
      setRestoreProgress(prev => {
        if (prev >= 100) {
          clearInterval(stepInterval);
          setTimeout(() => {
            setActiveRestoringSnapshot(null);
            confetti({ particleCount: 50, spread: 60 });
            showToast(`System state restored to ${snap.name}! All services nominal.`);
            addAuditLog(`Disaster Recovery: System Restored to Snapshot (${snap.name})`, 'backup', snap.id);
          }, 800);
          return 100;
        }
        return prev + 20;
      });
    }, 600);
  };

  // Security & Threat Detection State
  const [wafRules, setWafRules] = useState<WafRule[]>([
    { id: 'waf_owasp', name: 'OWASP Core Rule Set (CRS 3.3.4)', description: 'Mitigate SQL Injection, XSS, RCE, and Path Traversal attacks', category: 'owasp', enabled: true, action: 'block', triggersLast24h: 342 },
    { id: 'waf_ddos', name: 'Layer 7 HTTP Flood & DDoS Scrubbing', description: 'Real-time challenge for traffic surges exceeding 5,000 req/min/IP', category: 'ddos', enabled: true, action: 'challenge', triggersLast24h: 1840 },
    { id: 'waf_bot', name: 'AI & Malicious Bot Scraper Blocker', description: 'Block known content scrapers, spam bots, and vulnerability probes', category: 'bot_protection', enabled: true, action: 'block', triggersLast24h: 924 },
    { id: 'waf_rate', name: 'API Rate Limiting (120 req/min)', description: 'Prevent brute-force authentication and API resource exhaustion', category: 'rate_limit', enabled: true, action: 'block', triggersLast24h: 58 }
  ]);

  const toggleWafRule = (id: string) => {
    if (activeRole !== 'super_admin' && activeRole !== 'devops') {
      showToast('Action Denied: WAF modifications require DevOps privileges.');
      return;
    }
    setWafRules(prev =>
      prev.map(r => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
    showToast('WAF rule toggled');
    addAuditLog(`WAF Rule Toggled (ID: ${id})`, 'security', id);
  };

  const [threatEvents, setThreatEvents] = useState<ThreatEvent[]>([
    {
      id: 'thr_1',
      timestamp: '14:24:19 UTC',
      attackType: 'SQL Injection in Query Param (?id=1 UNION SELECT)',
      sourceIp: '185.220.101.4',
      targetUri: '/api/v1/catalog/item',
      country: 'Netherlands (Tor Exit)',
      countryCode: 'NL',
      severity: 'critical',
      mitigationAction: 'Immediate 403 Forbidden & IP Tarpit',
      signatureMatch: 'CRS-942100-SQLI-DETECT'
    },
    {
      id: 'thr_2',
      timestamp: '14:18:02 UTC',
      attackType: 'Credential Stuffing Brute Force (54 req/s)',
      sourceIp: '45.154.255.89',
      targetUri: '/api/auth/login',
      country: 'Russia',
      countryCode: 'RU',
      severity: 'high',
      mitigationAction: 'Rate Limit Block & CAPTCHA Enforcement',
      signatureMatch: 'RATE-BURST-AUTH-01'
    },
    {
      id: 'thr_3',
      timestamp: '14:02:44 UTC',
      attackType: 'Cross-Site Scripting (XSS) in Form Body',
      sourceIp: '103.145.75.12',
      targetUri: '/contact/submit',
      country: 'Vietnam',
      countryCode: 'VN',
      severity: 'high',
      mitigationAction: 'Payload Sanitized & Request Dropped',
      signatureMatch: 'CRS-941100-XSS-SCRIPT-TAG'
    },
    {
      id: 'thr_4',
      timestamp: '13:45:10 UTC',
      attackType: 'Path Traversal Attempt (../../etc/passwd)',
      sourceIp: '198.98.54.120',
      targetUri: '/static/../../etc/passwd',
      country: 'United States',
      countryCode: 'US',
      severity: 'medium',
      mitigationAction: '404 Synthetic Masking',
      signatureMatch: 'CRS-930100-LFI-DETECT'
    }
  ]);

  const [securityScanResult, setSecurityScanResult] = useState<SecurityScanResult>({
    lastScannedAt: 'Today at 12:30 UTC',
    sslGrade: 'A+',
    tlsVersion: 'TLS 1.3 (RFC 8446)',
    malwareFound: 0,
    fileIntegrityStatus: 'clean',
    vulnerabilitiesResolved: 18,
    owaspTop10Score: '100% Mitigated'
  });

  const [isScanningSecurity, setIsScanningSecurity] = useState(false);

  const runDeepSecurityScan = () => {
    setIsScanningSecurity(true);
    showToast('Running deep vulnerability, malware, and SSL cipher scan...');
    setTimeout(() => {
      setIsScanningSecurity(false);
      setSecurityScanResult({
        lastScannedAt: 'Just now',
        sslGrade: 'A+',
        tlsVersion: 'TLS 1.3 (RFC 8446)',
        malwareFound: 0,
        fileIntegrityStatus: 'clean',
        vulnerabilitiesResolved: 21,
        owaspTop10Score: '100% Mitigated'
      });
      confetti({ particleCount: 35, spread: 50 });
      showToast('Security audit complete: Grade A+, 0 threats, SSL verified!');
      addAuditLog('Deep Security Audit Run (Result: Grade A+ Clean)', 'security', 'waf-engine');
    }, 2800);
  };

  // Vercel Capabilities: Environment Variables, Edge Functions, Storage
  const [envVars, setEnvVars] = useState<EnvVariable[]>([
    { id: 'env_1', key: 'DATABASE_URL', value: 'postgres://aether_usr:p_948fha0@ep-frost-38.us-east-2.postgres.aetherhost.net/prod_db?sslmode=require', targets: ['production'], isSecret: true, updatedAt: '3 days ago' },
    { id: 'env_2', key: 'PAYSTACK_PUBLIC_KEY', value: 'pk_live_1ce038da68ee109f5e603f5b816613d9cf261be5', targets: ['production', 'preview', 'development'], isSecret: false, updatedAt: 'Just now' },
    { id: 'env_3', key: 'PAYSTACK_SECRET_KEY', value: 'sk_live_389ab41029dfea89102cba394812a', targets: ['production'], isSecret: true, updatedAt: 'Just now' },
    { id: 'env_4', key: 'PAYSTACK_CALLBACK_URL', value: 'https://www.africanremotejob.com', targets: ['production', 'preview'], isSecret: false, updatedAt: 'Just now' },
    { id: 'env_5', key: 'PAYSTACK_WEBHOOK_URL', value: 'https://www.africanremotejob.com/api/webhook', targets: ['production'], isSecret: false, updatedAt: 'Just now' },
    { id: 'env_6', key: 'NEXT_PUBLIC_API_URL', value: 'https://acme-store.com/api', targets: ['production', 'preview', 'development'], isSecret: false, updatedAt: '2 weeks ago' },
    { id: 'env_7', key: 'REDIS_KV_REST_API_TOKEN', value: 'AetherKV_token_9f8120ab8f7739', targets: ['production', 'preview'], isSecret: true, updatedAt: 'Yesterday' }
  ]);

  // Paystack Live Configuration & Transactions
  const [paystackConfig, setPaystackConfig] = useState<PaystackConfig>({
    publicKey: 'pk_live_1ce038da68ee109f5e603f5b816613d9cf261be5',
    callbackUrl: 'https://www.africanremotejob.com',
    webhookUrl: 'https://www.africanremotejob.com/api/webhook',
    environment: 'live',
    currency: 'USD',
    channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer']
  });

  const [isPaystackModalOpen, setIsPaystackModalOpen] = useState(false);
  const [activeCheckoutPlan, setActiveCheckoutPlan] = useState<{ name: string; price: string; amount: number } | null>(null);

  const [paystackTransactions, setPaystackTransactions] = useState<PaystackTransaction[]>([
    {
      id: 'pstk_tx_01',
      reference: 'pstk_live_981249bce',
      amount: 180,
      currency: 'USD',
      customerEmail: 'alex.rivera@enterprise-aether.io',
      channel: 'card',
      status: 'success',
      paidAt: '2026-10-14 02:40 UTC',
      planOrDescription: 'Enterprise Dedicated Cluster (Monthly Renewal)',
      callbackUrl: 'https://www.africanremotejob.com',
      verifiedSignature: 'sha512_89f02cba3819dfea8910'
    },
    {
      id: 'pstk_tx_02',
      reference: 'pstk_live_382109afe',
      amount: 12.99,
      currency: 'USD',
      customerEmail: 'billing@enterprise-aether.io',
      channel: 'bank_transfer',
      status: 'success',
      paidAt: '2026-10-13 18:22 UTC',
      planOrDescription: 'Domain Registration (acme-store.com Anycast DNS)',
      callbackUrl: 'https://www.africanremotejob.com',
      verifiedSignature: 'sha512_394812ae89bc714f2e88'
    },
    {
      id: 'pstk_tx_03',
      reference: 'pstk_live_110948cda',
      amount: 20,
      currency: 'USD',
      customerEmail: 'elena@enterprise-aether.io',
      channel: 'apple_pay',
      status: 'success',
      paidAt: '2026-10-12 11:15 UTC',
      planOrDescription: 'Edge Compute Bandwidth Booster (1TB Egress)',
      callbackUrl: 'https://www.africanremotejob.com',
      verifiedSignature: 'sha512_4f03d12aa09841bb271'
    }
  ]);

  const updatePaystackConfig = (cfg: Partial<PaystackConfig>) => {
    setPaystackConfig(prev => ({ ...prev, ...cfg }));
    showToast('Paystack Live configuration updated successfully!');
    addAuditLog('Paystack Gateway Configuration Updated', 'billing', 'paystack-live');
  };

  const initiatePaystackPayment = (amount: number, description: string, email?: string) => {
    const customer = email || currentUser.email;
    const ref = 'pstk_live_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    showToast(`Initializing Paystack Live Checkout (${paystackConfig.currency} ${amount})...`);

    // Simulate Paystack Live Handshake with Callback & Webhook Dispatch
    setTimeout(() => {
      const newTx: PaystackTransaction = {
        id: 'pstk_tx_' + Date.now(),
        reference: ref,
        amount,
        currency: paystackConfig.currency,
        customerEmail: customer,
        channel: 'card',
        status: 'success',
        paidAt: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
        planOrDescription: description,
        callbackUrl: paystackConfig.callbackUrl,
        verifiedSignature: 'sha512_' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
      };

      setPaystackTransactions(prev => [newTx, ...prev]);
      setIsPaystackModalOpen(false);
      confetti({ particleCount: 65, spread: 70, origin: { y: 0.6 } });
      showToast(`Payment of ${paystackConfig.currency} ${amount} verified via Paystack! Webhook delivered to ${paystackConfig.webhookUrl}`);
      addAuditLog(`Paystack Charge Succeeded (Ref: ${ref}, Amount: ${paystackConfig.currency} ${amount})`, 'billing', ref);
    }, 1800);
  };

  const addEnvVar = (key: string, value: string, targets: ('production' | 'preview' | 'development')[]) => {
    if (activeRole !== 'super_admin' && activeRole !== 'devops') {
      showToast('Action Denied: Setting environment variables requires DevOps/Admin role.');
      return;
    }
    const newEnv: EnvVariable = {
      id: 'env_' + Date.now().toString(36),
      key: key.trim().toUpperCase(),
      value: value.trim(),
      targets,
      isSecret: true,
      updatedAt: 'Just now'
    };
    setEnvVars(prev => [newEnv, ...prev]);
    showToast(`Environment variable ${newEnv.key} added successfully!`);
    addAuditLog(`Environment Variable Added (${newEnv.key})`, 'deployment', newEnv.key);
  };

  const deleteEnvVar = (id: string) => {
    if (activeRole !== 'super_admin' && activeRole !== 'devops') {
      showToast('Action Denied: Removing secrets requires DevOps/Admin role.');
      return;
    }
    setEnvVars(prev => prev.filter(e => e.id !== id));
    showToast('Environment variable removed');
    addAuditLog(`Environment Variable Removed (${id})`, 'deployment', id);
  };

  const [edgeFunctions] = useState<EdgeServerlessFunction[]>([
    { id: 'fn_1', name: 'api/checkout/create-intent', route: '/api/checkout/create-intent', runtime: 'Edge Runtime', region: 'iad1, lhr1, nrt1', invocations24h: 38400, avgDurationMs: 14.2, memoryAllocatedMb: 128, errorRate: 0.01 },
    { id: 'fn_2', name: 'api/auth/session-verify', route: '/api/auth/session-verify', runtime: 'Edge Runtime', region: 'Global Anycast (All 312 PoPs)', invocations24h: 182400, avgDurationMs: 6.8, memoryAllocatedMb: 128, errorRate: 0.00 },
    { id: 'fn_3', name: 'api/og-image-generator', route: '/api/og', runtime: 'Node.js 20.x', region: 'iad1 (US East)', invocations24h: 12900, avgDurationMs: 82.4, memoryAllocatedMb: 512, errorRate: 0.02 },
    { id: 'fn_4', name: 'api/search/typeahead', route: '/api/search', runtime: 'Edge Runtime', region: 'Global Anycast', invocations24h: 94100, avgDurationMs: 9.1, memoryAllocatedMb: 128, errorRate: 0.00 }
  ]);

  const [storageBuckets] = useState<StorageBucketItem[]>([
    { id: 'stg_kv', type: 'KV Redis', name: 'acme-edge-session-kv', region: 'Global Edge Distributed', usedBytes: 142000000, totalLimitBytes: 1073741824, connectionUrl: 'redis://default:token@kv.aetherhost.internal:6379', reads24h: 940000, writes24h: 48000 },
    { id: 'stg_pg', type: 'Serverless Postgres', name: 'acme-production-pg-db', region: 'us-east-1 (N. Virginia)', usedBytes: 4294967296, totalLimitBytes: 53687091200, connectionUrl: 'postgres://app:sec@pg.aetherhost.internal:5432/main', reads24h: 2480000, writes24h: 124000 },
    { id: 'stg_blob', type: 'Edge Blob', name: 'acme-public-user-uploads', region: 'Multi-Region CDN', usedBytes: 18253611008, totalLimitBytes: 107374182400, connectionUrl: 'https://blob.aetherhost.app/acme-uploads', reads24h: 8400000, writes24h: 8200 },
    { id: 'stg_cfg', type: 'Edge Config', name: 'acme-feature-flags', region: 'Ultra-low latency (< 1ms read)', usedBytes: 32000, totalLimitBytes: 1048576, connectionUrl: 'edge-config://ecfg_acme_production', reads24h: 14200000, writes24h: 12 }
  ]);

  // 24/7 Live Support Chat & AI Diagnostics State
  const [isSupportChatOpen, setIsSupportChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<SupportChatMessage[]>([
    {
      id: 'msg_0',
      sender: 'bot',
      authorName: 'AetherBot AI Diagnostics',
      text: 'Hello Alex! I am your 24/7 automated hosting diagnostic assistant. I have live telemetry access to your cluster. How can I help you today?',
      timestamp: '14:15'
    }
  ]);

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    { id: 'tkt_01', subject: 'Automated Snapshot verification across EU PoP', priority: 'medium', status: 'resolved', slaResponseTimeMinutes: 1, assignedEngineer: 'Sarah Jenkins (L3 Cloud)', createdAt: 'Yesterday' }
  ]);

  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: SupportChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      authorName: currentUser.name,
      avatar: currentUser.avatar,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, userMsg]);

    // Bot automated response based on context
    setTimeout(() => {
      let botReply = '';
      const lower = text.toLowerCase();
      if (lower.includes('slow') || lower.includes('performance') || lower.includes('cpu') || lower.includes('latency')) {
        botReply = `I analyzed your active cluster (us-east-prod-cluster-01). CPU is at ${serverMetrics.cpuUsagePercent}%, global p95 latency is ${serverMetrics.p95LatencyMs}ms, and your Edge Cache Hit Ratio is ${serverMetrics.edgeCacheHitRatio}%. Everything is well within SLA limits. Would you like me to purge the edge asset cache?`;
      } else if (lower.includes('backup') || lower.includes('restore') || lower.includes('snapshot')) {
        botReply = `Your last automated backup was taken at 02:00 UTC and verified with SHA-256. All 3 databases and 42,100 files are safeguarded. You can revert to any point in the Backups tab.`;
      } else if (lower.includes('dns') || lower.includes('ssl') || lower.includes('domain')) {
        botReply = `Your primary domain acme-store.com has active Let's Encrypt Wildcard SSL expiring in April 2027 with HTTP/3 QUIC enabled. Anycast DNS propagation is healthy.`;
      } else if (lower.includes('agent') || lower.includes('human') || lower.includes('engineer') || lower.includes('help')) {
        escalateToEngineer();
        return;
      } else {
        botReply = `Thank you for your inquiry. I have inspected your edge cluster telemetry. All 312 Anycast edge nodes are nominal. Feel free to ask me to run diagnostics or escalate to a senior cloud engineer.`;
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: 'msg_bot_' + Date.now(),
          sender: 'bot',
          authorName: 'AetherBot AI Diagnostics',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 900);
  };

  const runChatDiagnostics = () => {
    setChatMessages(prev => [
      ...prev,
      {
        id: 'msg_diag_' + Date.now(),
        sender: 'bot',
        authorName: 'AetherBot Auto-Diagnostics',
        text: 'Automated 1-Click Server & Network Health Audit complete:',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDiagnostic: true,
        diagnosticData: {
          serverStatus: '100% HEALTHY',
          cpu: `${serverMetrics.cpuUsagePercent}% (Nominal)`,
          memory: `${serverMetrics.memoryUsedMb}MB / ${serverMetrics.memoryTotalMb}MB`,
          dnsStatus: 'Anycast Distributed (0.2ms resolution)',
          sslStatus: 'TLS 1.3 Valid (Let\'s Encrypt)',
          threatsMitigated: 3164
        }
      }
    ]);
    showToast('Diagnostics report inserted into live chat!');
  };

  const escalateToEngineer = () => {
    showToast('Escalating to Tier-3 Cloud Infrastructure Engineer...');
    const newTkt: SupportTicket = {
      id: 'tkt_' + Date.now().toString(36),
      subject: 'Live Escalation from Console: Cluster Diagnostics',
      priority: 'urgent',
      status: 'investigating',
      slaResponseTimeMinutes: 2,
      assignedEngineer: 'Marcus Thorne (Tier 3 Staff SRE)',
      createdAt: 'Just now'
    };
    setSupportTickets(prev => [newTkt, ...prev]);

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          id: 'msg_eng_' + Date.now(),
          sender: 'agent',
          authorName: 'Marcus Thorne (Tier 3 Staff SRE)',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
          text: 'Hi Alex, Marcus here from the 24/7 Enterprise Tier-3 Operations team. I see your cluster telemetry and I am on standby to assist with any infrastructure tuning or emergency restore.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      showToast('Senior Engineer Marcus Thorne joined the live chat.');
    }, 1800);
  };

  // Team & RBAC Management State
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 'mem_1',
      name: 'Alex Rivera',
      email: 'alex.rivera@enterprise-aether.io',
      role: 'super_admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
      twoFactorEnabled: true,
      joinedAt: 'Jan 2025',
      lastActiveAt: 'Active now'
    },
    {
      id: 'mem_2',
      name: 'Elena Rostova',
      email: 'elena@enterprise-aether.io',
      role: 'devops',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
      twoFactorEnabled: true,
      joinedAt: 'Mar 2025',
      lastActiveAt: '12m ago'
    },
    {
      id: 'mem_3',
      name: 'Marcus Vance',
      email: 'marcus.v@enterprise-aether.io',
      role: 'editor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
      twoFactorEnabled: true,
      joinedAt: 'May 2025',
      lastActiveAt: '1h ago'
    },
    {
      id: 'mem_4',
      name: 'Claire Dupont',
      email: 'claire.d@enterprise-aether.io',
      role: 'billing',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80',
      twoFactorEnabled: false,
      joinedAt: 'Aug 2025',
      lastActiveAt: 'Yesterday'
    },
    {
      id: 'mem_5',
      name: 'David Kim',
      email: 'david.kim@compliance-auditors.org',
      role: 'auditor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
      twoFactorEnabled: true,
      joinedAt: 'Sep 2025',
      lastActiveAt: '3h ago'
    }
  ]);

  const addTeamMember = (name: string, email: string, role: UserRole) => {
    if (activeRole !== 'super_admin') {
      showToast('Action Denied: Only Super Admins can invite team members.');
      return;
    }
    const newMember: TeamMember = {
      id: 'mem_' + Date.now().toString(36),
      name,
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
      twoFactorEnabled: true,
      joinedAt: 'Just now',
      lastActiveAt: 'Invited'
    };
    setTeamMembers(prev => [...prev, newMember]);
    showToast(`Invitation sent to ${email} as ${role}!`);
    addAuditLog(`Team Member Invited (${email} as ${role})`, 'access', email);
  };

  const updateMemberRole = (id: string, role: UserRole) => {
    if (activeRole !== 'super_admin') {
      showToast('Action Denied: Role modifications require Super Admin.');
      return;
    }
    setTeamMembers(prev =>
      prev.map(m => (m.id === id ? { ...m, role } : m))
    );
    showToast('Team member role updated');
    addAuditLog(`Member Role Changed (ID: ${id} to ${role})`, 'access', id);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        activeTab,
        setActiveTab,
        activeRole,
        setActiveRole,
        currentUser,
        projects,
        activeProject,
        setActiveProject,
        serverMetrics,
        isLiveMonitoring,
        setIsLiveMonitoring,
        liveRequests,
        geoTraffic,

        deployments,
        triggerDeployment,
        rollbackDeployment,
        selectedDeploymentForLogs,
        setSelectedDeploymentForLogs,

        builderPage,
        addBlockToBuilder,
        updateBlockContent,
        removeBlock,
        moveBlock,
        loadBuilderTemplate,
        publishBuilderSite,
        isPreviewModalOpen,
        setIsPreviewModalOpen,
        builderDeviceMode,
        setBuilderDeviceMode,

        domains,
        addDnsRecord,
        deleteDnsRecord,
        toggleProxyDnsRecord,
        simulateDomainPurchase,

        backups,
        backupSchedule,
        updateBackupSchedule,
        createManualSnapshot,
        restoreSnapshot,
        activeRestoringSnapshot,
        restoreProgress,

        wafRules,
        toggleWafRule,
        threatEvents,
        securityScanResult,
        isScanningSecurity,
        runDeepSecurityScan,

        envVars,
        addEnvVar,
        deleteEnvVar,
        edgeFunctions,
        storageBuckets,

        isSupportChatOpen,
        setIsSupportChatOpen,
        chatMessages,
        sendChatMessage,
        runChatDiagnostics,
        escalateToEngineer,
        supportTickets,

        teamMembers,
        addTeamMember,
        updateMemberRole,
        auditLogs,
        addAuditLog,

        // Paystack & Billing
        paystackConfig,
        updatePaystackConfig,
        paystackTransactions,
        initiatePaystackPayment,
        isPaystackModalOpen,
        setIsPaystackModalOpen,
        activeCheckoutPlan,
        setActiveCheckoutPlan,

        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

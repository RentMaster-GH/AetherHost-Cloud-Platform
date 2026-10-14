import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  // Nav tabs
  navOverview: string;
  navDeployments: string;
  navBuilder: string;
  navDomains: string;
  navBackups: string;
  navSecurity: string;
  navFunctions: string;
  navAnalytics: string;
  navStorage: string;
  navEnvVars: string;
  navBilling: string;
  navTeam: string;
  navAudit: string;
  navSupport: string;
  
  // Header
  projectLabel: string;
  activeRole: string;
  liveStatus: string;
  deployButton: string;
  supportChat: string;

  // Overview
  serverPerformance: string;
  realTimeTraffic: string;
  cpuUtilization: string;
  memoryLoad: string;
  diskIo: string;
  bandwidthOut: string;
  requestsPerSec: string;
  edgeLatency: string;
  cacheHitRatio: string;
  uptimeTitle: string;
  liveVisitors: string;
  geoDistribution: string;
  recentDeployments: string;

  // Builder
  builderTitle: string;
  builderSubtitle: string;
  addBlock: string;
  publishSite: string;
  previewLive: string;
  deviceDesktop: string;
  deviceTablet: string;
  deviceMobile: string;
  loadTemplate: string;
  savedDraft: string;
  publishedToEdge: string;

  // Domains & DNS
  domainsTitle: string;
  domainsSubtitle: string;
  addRecord: string;
  searchDomain: string;
  sslCertStatus: string;
  autoRenew: string;
  nameservers: string;

  // Backups
  backupsTitle: string;
  backupsSubtitle: string;
  createSnapshot: string;
  restorePoint: string;
  scheduleConfig: string;
  retentionPolicy: string;
  downloadArchive: string;
  verifyChecksum: string;

  // Security
  securityTitle: string;
  securitySubtitle: string;
  wafShield: string;
  threatLog: string;
  runSecurityScan: string;
  owaspTop10: string;
  ddosMitigation: string;
  blockedAttacks: string;

  // Roles & RBAC
  roleSuperAdmin: string;
  roleDevOps: string;
  roleEditor: string;
  roleBilling: string;
  roleAuditor: string;
  rbacNotice: string;
  switchRoleHelp: string;

  // Support
  supportTitle: string;
  supportSubtitle: string;
  startLiveChat: string;
  runDiagnostics: string;
  escalateEngineer: string;
  slaResponseGuarantee: string;
  typeMessagePlaceholder: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "AetherHost",
    tagline: "Enterprise Edge Cloud & Hosting Platform",
    navOverview: "Performance & Traffic",
    navDeployments: "Deployments",
    navBuilder: "Website Builder",
    navDomains: "Domain & DNS",
    navBackups: "Automated Backups",
    navSecurity: "Threat Detection & WAF",
    navFunctions: "Edge Functions",
    navAnalytics: "Speed Insights",
    navStorage: "Storage & Databases",
    navEnvVars: "Environment Variables",
    navBilling: "Paystack & Billing",
    navTeam: "Team & RBAC",
    navAudit: "Audit Logs",
    navSupport: "24/7 Live Support",

    projectLabel: "Active Cluster",
    activeRole: "Current Role",
    liveStatus: "All Edge Nodes Operational",
    deployButton: "New Deployment",
    supportChat: "Live Support",

    serverPerformance: "Compute & Server Performance",
    realTimeTraffic: "Real-Time Edge Traffic Statistics",
    cpuUtilization: "CPU Utilization",
    memoryLoad: "Memory Load",
    diskIo: "NVMe Storage I/O",
    bandwidthOut: "Egress Bandwidth",
    requestsPerSec: "Requests / Sec",
    edgeLatency: "Global p95 Latency",
    cacheHitRatio: "Edge Cache Hit Ratio",
    uptimeTitle: "SLA Uptime (Last 90d)",
    liveVisitors: "Live Request Stream",
    geoDistribution: "Global Traffic by Region",
    recentDeployments: "Recent Deployments",

    builderTitle: "Drag-and-Drop Website Builder",
    builderSubtitle: "Build and deploy production-ready web interfaces with zero coding",
    addBlock: "Add Section Block",
    publishSite: "Publish to Edge",
    previewLive: "Live View",
    deviceDesktop: "Desktop",
    deviceTablet: "Tablet",
    deviceMobile: "Mobile",
    loadTemplate: "Load Template",
    savedDraft: "Draft Auto-Saved",
    publishedToEdge: "Published to Global Edge CDN",

    domainsTitle: "Domain Management & Anycast DNS",
    domainsSubtitle: "Manage root domains, subdomains, SSL/TLS certificates and routing rules",
    addRecord: "Add DNS Record",
    searchDomain: "Search Domain Registry",
    sslCertStatus: "Automated SSL/TLS Certificate",
    autoRenew: "Auto-Renew Active",
    nameservers: "Authoritative Nameservers",

    backupsTitle: "Automated Backups & Recovery",
    backupsSubtitle: "Multi-region encrypted snapshots with point-in-time instant rollbacks",
    createSnapshot: "Create Manual Snapshot",
    restorePoint: "Restore System State",
    scheduleConfig: "Backup Frequency & Time",
    retentionPolicy: "Retention Rules",
    downloadArchive: "Download Archive (.tar.gz)",
    verifyChecksum: "SHA-256 Checksum Verified",

    securityTitle: "Enterprise Threat Detection & WAF",
    securitySubtitle: "OWASP Top 10 mitigation, Layer 7 DDoS scrubbing, and deep malware auditing",
    wafShield: "Active Web Application Firewall",
    threatLog: "Neutralized Threat Log",
    runSecurityScan: "Run Deep Security Audit",
    owaspTop10: "OWASP Ruleset",
    ddosMitigation: "DDoS Mitigation Scrubbing",
    blockedAttacks: "Threats Neutralized (24h)",

    roleSuperAdmin: "Super Admin",
    roleDevOps: "DevOps Engineer",
    roleEditor: "Content Editor",
    roleBilling: "Billing Specialist",
    roleAuditor: "Read-Only Auditor",
    rbacNotice: "Role-Based Access Control enforced. Switch active role to test access boundaries.",
    switchRoleHelp: "Simulate RBAC views",

    supportTitle: "24/7 Enterprise Support Hub",
    supportSubtitle: "Sub-2 minute response guarantee with integrated server diagnostics",
    startLiveChat: "Start Live Chat",
    runDiagnostics: "Run Instant Health Diagnostics",
    escalateEngineer: "Escalate to Senior Engineer",
    slaResponseGuarantee: "Enterprise SLA: < 120s Live Agent Response",
    typeMessagePlaceholder: "Ask about hosting, DNS, backups, or request an engineer..."
  },

  es: {
    appName: "AetherHost",
    tagline: "Plataforma de Alojamiento y Nube Enterprise",
    navOverview: "Rendimiento y Tráfico",
    navDeployments: "Despliegues",
    navBuilder: "Constructor Web",
    navDomains: "Dominios y DNS",
    navBackups: "Copias de Seguridad",
    navSecurity: "Detección de Amenazas",
    navFunctions: "Funciones Edge",
    navAnalytics: "Velocidad y Métricas",
    navStorage: "Almacenamiento y BD",
    navEnvVars: "Variables de Entorno",
    navBilling: "Pagos y Paystack",
    navTeam: "Equipo y RBAC",
    navAudit: "Registro de Auditoría",
    navSupport: "Soporte 24/7 en Vivo",

    projectLabel: "Clúster Activo",
    activeRole: "Rol Actual",
    liveStatus: "Nodos Edge Operativos",
    deployButton: "Nuevo Despliegue",
    supportChat: "Soporte en Vivo",

    serverPerformance: "Rendimiento de Cómputo y Servidores",
    realTimeTraffic: "Tráfico Edge en Tiempo Real",
    cpuUtilization: "Uso de CPU",
    memoryLoad: "Carga de Memoria",
    diskIo: "E/S Almacenamiento NVMe",
    bandwidthOut: "Ancho de Banda de Salida",
    requestsPerSec: "Peticiones / Seg",
    edgeLatency: "Latencia Global p95",
    cacheHitRatio: "Tasa de Aciertos de Caché",
    uptimeTitle: "Disponibilidad SLA (90 días)",
    liveVisitors: "Flujo de Peticiones en Vivo",
    geoDistribution: "Tráfico Global por Región",
    recentDeployments: "Despliegues Recientes",

    builderTitle: "Constructor Visual Arrastrar y Soltar",
    builderSubtitle: "Crea y despliega interfaces web profesionales sin escribir código",
    addBlock: "Añadir Sección",
    publishSite: "Publicar en Edge",
    previewLive: "Vista en Vivo",
    deviceDesktop: "Escritorio",
    deviceTablet: "Tableta",
    deviceMobile: "Móvil",
    loadTemplate: "Cargar Plantilla",
    savedDraft: "Borrador Guardado",
    publishedToEdge: "Publicado en CDN Edge Global",

    domainsTitle: "Gestión de Dominios y DNS Anycast",
    domainsSubtitle: "Administra dominios principales, subdominios, certificados SSL y reglas",
    addRecord: "Añadir Registro DNS",
    searchDomain: "Buscar Dominio",
    sslCertStatus: "Certificado SSL/TLS Automático",
    autoRenew: "Auto-Renovación Activa",
    nameservers: "Servidores de Nombres",

    backupsTitle: "Copias de Seguridad Automatizadas",
    backupsSubtitle: "Instantáneas cifradas multi-región con restauración inmediata",
    createSnapshot: "Crear Instantánea Manual",
    restorePoint: "Restaurar Estado",
    scheduleConfig: "Frecuencia y Hora",
    retentionPolicy: "Reglas de Retención",
    downloadArchive: "Descargar Archivo (.tar.gz)",
    verifyChecksum: "Suma SHA-256 Verificada",

    securityTitle: "Detección de Amenazas y WAF",
    securitySubtitle: "Mitigación OWASP Top 10, filtrado DDoS Capa 7 y auditoría de malware",
    wafShield: "Firewall WAF Activo",
    threatLog: "Registro de Amenazas Mitigadas",
    runSecurityScan: "Ejecutar Auditoría de Seguridad",
    owaspTop10: "Reglas OWASP",
    ddosMitigation: "Filtrado Anti-DDoS",
    blockedAttacks: "Ataques Neutralizados (24h)",

    roleSuperAdmin: "Super Administrador",
    roleDevOps: "Ingeniero DevOps",
    roleEditor: "Editor de Contenido",
    roleBilling: "Especialista de Pagos",
    roleAuditor: "Auditor de Lectura",
    rbacNotice: "Control de acceso basado en roles activo. Cambia de rol para probar permisos.",
    switchRoleHelp: "Simular vistas RBAC",

    supportTitle: "Centro de Soporte 24/7 Enterprise",
    supportSubtitle: "Respuesta garantizada en menos de 2 minutos con diagnósticos integrados",
    startLiveChat: "Iniciar Chat en Vivo",
    runDiagnostics: "Ejecutar Diagnóstico Inmediato",
    escalateEngineer: "Escalar a Ingeniero Senior",
    slaResponseGuarantee: "SLA Enterprise: Respuesta en < 120s",
    typeMessagePlaceholder: "Pregunta sobre hosting, DNS, backups o solicita un ingeniero..."
  },

  fr: {
    appName: "AetherHost",
    tagline: "Plateforme d'Hébergement et Cloud Entreprise",
    navOverview: "Performance & Trafic",
    navDeployments: "Déploiements",
    navBuilder: "Créateur de Site",
    navDomains: "Domaines & DNS",
    navBackups: "Sauvegardes Auto",
    navSecurity: "Sécurité & WAF",
    navFunctions: "Fonctions Edge",
    navAnalytics: "Analytique & Vitesse",
    navStorage: "Stockage & Bases",
    navEnvVars: "Variables d'Env",
    navBilling: "Facturation & Paystack",
    navTeam: "Équipe & RBAC",
    navAudit: "Journal d'Audit",
    navSupport: "Support 24/7 Direct",

    projectLabel: "Cluster Actif",
    activeRole: "Rôle Actuel",
    liveStatus: "Tous les Nœuds Edge Actifs",
    deployButton: "Nouveau Déploiement",
    supportChat: "Support Direct",

    serverPerformance: "Performances Serveurs & Cœur",
    realTimeTraffic: "Trafic Edge en Temps Réel",
    cpuUtilization: "Utilisation Processeur",
    memoryLoad: "Charge Mémoire",
    diskIo: "E/S Disque NVMe",
    bandwidthOut: "Bande Passante Egress",
    requestsPerSec: "Requêtes / Sec",
    edgeLatency: "Latence Mondiale p95",
    cacheHitRatio: "Taux de Succès Cache Edge",
    uptimeTitle: "Disponibilité SLA (90j)",
    liveVisitors: "Flux de Requêtes Direct",
    geoDistribution: "Trafic Mondial par Région",
    recentDeployments: "Déploiements Récents",

    builderTitle: "Créateur de Site Glisser-Déposer",
    builderSubtitle: "Créez et publiez des interfaces web de production sans programmation",
    addBlock: "Ajouter un Bloc",
    publishSite: "Déployer sur l'Edge",
    previewLive: "Aperçu Direct",
    deviceDesktop: "Bureau",
    deviceTablet: "Tablette",
    deviceMobile: "Mobile",
    loadTemplate: "Charger Modèle",
    savedDraft: "Brouillon Enregistré",
    publishedToEdge: "Publié sur le CDN Edge Mondial",

    domainsTitle: "Gestion des Domaines & DNS Anycast",
    domainsSubtitle: "Gérez vos domaines, sous-domaines, certificats SSL/TLS et règles",
    addRecord: "Ajouter Enregistrement DNS",
    searchDomain: "Rechercher un Domaine",
    sslCertStatus: "Certificat SSL/TLS Automatique",
    autoRenew: "Renouvellement Automatique",
    nameservers: "Serveurs de Noms",

    backupsTitle: "Sauvegardes Automatisées & Reprise",
    backupsSubtitle: "Instantanés chiffrés multi-régions avec restaurations immédiates",
    createSnapshot: "Créer Instantané Manuel",
    restorePoint: "Restaurer l'État",
    scheduleConfig: "Fréquence et Horaire",
    retentionPolicy: "Règles de Rétention",
    downloadArchive: "Télécharger l'Archive (.tar.gz)",
    verifyChecksum: "Somme SHA-256 Validée",

    securityTitle: "Détection des Menaces & WAF",
    securitySubtitle: "Protection OWASP Top 10, absorption DDoS Niveau 7 et scan de fichiers",
    wafShield: "Pare-feu Applicatif Actif",
    threatLog: "Journal des Menaces Bloquées",
    runSecurityScan: "Lancer Audit de Sécurité",
    owaspTop10: "Règles OWASP",
    ddosMitigation: "Atténuation DDoS",
    blockedAttacks: "Attaques Neutralisées (24h)",

    roleSuperAdmin: "Super Administrateur",
    roleDevOps: "Ingénieur DevOps",
    roleEditor: "Éditeur de Contenu",
    roleBilling: "Spécialiste Facturation",
    roleAuditor: "Auditeur Lecture Seule",
    rbacNotice: "Contrôle d'accès RBAC actif. Changez de rôle pour tester les permissions.",
    switchRoleHelp: "Simuler les rôles RBAC",

    supportTitle: "Centre de Support Entreprise 24/7",
    supportSubtitle: "Garantie de réponse en moins de 2 minutes avec diagnostics serveurs",
    startLiveChat: "Démarrer le Chat",
    runDiagnostics: "Lancer Diagnostic Immédiat",
    escalateEngineer: "Escalader vers Ingénieur Senior",
    slaResponseGuarantee: "SLA Entreprise : Réponse < 120s",
    typeMessagePlaceholder: "Posez une question sur l'hébergement, le DNS ou demandez un ingénieur..."
  },

  de: {
    appName: "AetherHost",
    tagline: "Enterprise Cloud- & Hosting-Plattform",
    navOverview: "Leistung & Datenverkehr",
    navDeployments: "Bereitstellungen",
    navBuilder: "Website-Builder",
    navDomains: "Domains & DNS",
    navBackups: "Automatische Backups",
    navSecurity: "Bedrohungserkennung & WAF",
    navFunctions: "Edge-Funktionen",
    navAnalytics: "Geschwindigkeit & Vitals",
    navStorage: "Speicher & Datenbanken",
    navEnvVars: "Umgebungsvariablen",
    navBilling: "Abrechnung & Paystack",
    navTeam: "Team & RBAC",
    navAudit: "Audit-Protokoll",
    navSupport: "24/7 Live-Support",

    projectLabel: "Aktiver Cluster",
    activeRole: "Aktuelle Rolle",
    liveStatus: "Alle Edge-Knoten Betriebsbereit",
    deployButton: "Neue Bereitstellung",
    supportChat: "Live-Support",

    serverPerformance: "Rechen- & Serverleistung",
    realTimeTraffic: "Echtzeit-Edge-Datenverkehr",
    cpuUtilization: "CPU-Auslastung",
    memoryLoad: "Arbeitsspeicher",
    diskIo: "NVMe-Speicher-E/A",
    bandwidthOut: "Ausgangs-Bandbreite",
    requestsPerSec: "Anfragen / Sek",
    edgeLatency: "Globale p95-Latenz",
    cacheHitRatio: "Edge-Cache-Trefferquote",
    uptimeTitle: "SLA-Verfügbarkeit (90T)",
    liveVisitors: "Live-Anfragenstrom",
    geoDistribution: "Globaler Datenverkehr nach Region",
    recentDeployments: "Aktuelle Bereitstellungen",

    builderTitle: "Drag-and-Drop Website-Builder",
    builderSubtitle: "Erstellen und veröffentlichen Sie professionelle Web-Seiten ohne Programmierkenntnisse",
    addBlock: "Abschnitt Hinzufügen",
    publishSite: "Auf Edge Veröffentlichen",
    previewLive: "Live-Vorschau",
    deviceDesktop: "Desktop",
    deviceTablet: "Tablet",
    deviceMobile: "Mobil",
    loadTemplate: "Vorlage Laden",
    savedDraft: "Entwurf Gespeichert",
    publishedToEdge: "Auf Globalem Edge-CDN Veröffentlicht",

    domainsTitle: "Domain-Verwaltung & Anycast-DNS",
    domainsSubtitle: "Verwalten Sie Stamm-Domains, Subdomains, SSL/TLS-Zertifikate und Routing",
    addRecord: "DNS-Eintrag Hinzufügen",
    searchDomain: "Domain Suchen",
    sslCertStatus: "Automatisches SSL/TLS-Zertifikat",
    autoRenew: "Automatische Verlängerung Aktiv",
    nameservers: "Autoritative Nameserver",

    backupsTitle: "Automatisierte Backups & Wiederherstellung",
    backupsSubtitle: "Verschlüsselte Snapshots über mehrere Regionen mit Point-in-Time-Rollbacks",
    createSnapshot: "Manuellen Snapshot Erstellen",
    restorePoint: "Zustand Wiederherstellen",
    scheduleConfig: "Backup-Frequenz & Zeit",
    retentionPolicy: "Aufbewahrungsregeln",
    downloadArchive: "Archiv Herunterladen (.tar.gz)",
    verifyChecksum: "SHA-256 Prüfsumme Verifiziert",

    securityTitle: "Bedrohungserkennung & WAF",
    securitySubtitle: "OWASP Top 10-Schutz, Layer-7-DDoS-Bereinigung und Malware-Prüfung",
    wafShield: "Aktive Web Application Firewall",
    threatLog: "Protokoll Abgewehrter Angriffe",
    runSecurityScan: "Sicherheitsprüfung Starten",
    owaspTop10: "OWASP-Regelsatz",
    ddosMitigation: "DDoS-Abschwächung",
    blockedAttacks: "Neutralisierte Angriffe (24h)",

    roleSuperAdmin: "Super-Administrator",
    roleDevOps: "DevOps-Ingenieur",
    roleEditor: "Inhalts-Editor",
    roleBilling: "Abrechnungs-Spezialist",
    roleAuditor: "Nur-Lese-Auditor",
    rbacNotice: "Rollenbasierte Zugriffskontrolle aktiv. Wechseln Sie die Rolle zur Rechteprüfung.",
    switchRoleHelp: "RBAC-Ansichten simulieren",

    supportTitle: "24/7 Enterprise Support-Zentrum",
    supportSubtitle: "Garantierte Antwortzeit unter 2 Minuten mit automatischer Systemdiagnose",
    startLiveChat: "Live-Chat Starten",
    runDiagnostics: "Sofort-Diagnose Ausführen",
    escalateEngineer: "An Leitenden Ingenieur Eskalieren",
    slaResponseGuarantee: "Enterprise SLA: Antwort in < 120s",
    typeMessagePlaceholder: "Frage zu Hosting, DNS oder Backups stellen..."
  },

  ja: {
    appName: "AetherHost",
    tagline: "エンタープライズ クラウド & ホスティング プラットフォーム",
    navOverview: "パフォーマンス & トラフィック",
    navDeployments: "デプロイ一覧",
    navBuilder: "Webサイトビルダー",
    navDomains: "ドメイン & DNS管理",
    navBackups: "自動バックアップ",
    navSecurity: "脅威検知 & WAF",
    navFunctions: "Edge Functions",
    navAnalytics: "速度分析 & Vitals",
    navStorage: "ストレージ & DB",
    navEnvVars: "環境変数設定",
    navBilling: "Paystack決済 & 請求",
    navTeam: "チーム & RBAC",
    navAudit: "監査ログ",
    navSupport: "24時間365日 サポート",

    projectLabel: "稼働中クラスター",
    activeRole: "現在の権限ロール",
    liveStatus: "全エッジノード正常稼働中",
    deployButton: "新規デプロイ",
    supportChat: "ライブサポート",

    serverPerformance: "サーバー & コンピュート性能監視",
    realTimeTraffic: "リアルタイム Edgeトラフィック統計",
    cpuUtilization: "CPU使用率",
    memoryLoad: "メモリ使用量",
    diskIo: "NVMe ストレージ I/O",
    bandwidthOut: "送信帯域幅",
    requestsPerSec: "秒間リクエスト数 (RPS)",
    edgeLatency: "グローバル p95 レイテンシ",
    cacheHitRatio: "エッジキャッシュ ヒット率",
    uptimeTitle: "SLA 稼働率 (過去90日)",
    liveVisitors: "リアルタイム リクエスト ストリーム",
    geoDistribution: "地域別グローバルトラフィック",
    recentDeployments: "最近のデプロイ履歴",

    builderTitle: "ドラッグ＆ドロップ Webサイトビルダー",
    builderSubtitle: "コーディング不要で本番仕様のWebサイトを構築して即時公開",
    addBlock: "セクションブロック追加",
    publishSite: "エッジへ即時公開",
    previewLive: "ライブプレビュー",
    deviceDesktop: "デスクトップ",
    deviceTablet: "タブレット",
    deviceMobile: "モバイル",
    loadTemplate: "テンプレート読み込み",
    savedDraft: "下書き自動保存済み",
    publishedToEdge: "グローバル Edge CDN へデプロイ完了",

    domainsTitle: "ドメイン管理 & Anycast DNS",
    domainsSubtitle: "独自ドメイン、サブドメイン、SSL/TLS証明書、ルーティングの統合管理",
    addRecord: "DNSレコード追加",
    searchDomain: "ドメイン検索・取得",
    sslCertStatus: "自動更新 SSL/TLS 証明書",
    autoRenew: "自動更新 有効",
    nameservers: "権威ネームサーバー",

    backupsTitle: "自動バックアップ & 災害復旧",
    backupsSubtitle: "マルチリージョン暗号化スナップショットとポイントインタイム復元",
    createSnapshot: "手動スナップショット作成",
    restorePoint: "この時点へ復元実行",
    scheduleConfig: "バックアップ周期設定",
    retentionPolicy: "保持ポリシー",
    downloadArchive: "アーカイブ ダウンロード (.tar.gz)",
    verifyChecksum: "SHA-256 チェックサム検証済",

    securityTitle: "エンタープライズ 脅威検知 & WAF",
    securitySubtitle: "OWASP Top 10対策、レイヤー7 DDoSスクラビング、マルウェア監査",
    wafShield: "Web Application Firewall 稼働中",
    threatLog: "阻止された攻撃ログ",
    runSecurityScan: "完全セキュリティ診断を実行",
    owaspTop10: "OWASP ルールセット",
    ddosMitigation: "DDoS 緩和防御",
    blockedAttacks: "ブロックされた脅威 (24時間)",

    roleSuperAdmin: "スーパー管理者",
    roleDevOps: "DevOps エンジニア",
    roleEditor: "コンテンツ編集者",
    roleBilling: "請求スペシャリスト",
    roleAuditor: "閲覧専用監査者",
    rbacNotice: "ロールベース アクセス制御が有効です。ロールを切り替えて権限を確認できます。",
    switchRoleHelp: "RBACロール表示シミュレーション",

    supportTitle: "24/7 エンタープライズ サポートハブ",
    supportSubtitle: "自動サーバー診断付き・2分以内返答保証の専任サポート",
    startLiveChat: "ライブチャット開始",
    runDiagnostics: "サーバー自己診断を実行",
    escalateEngineer: "シニアエンジニアへエスカレーション",
    slaResponseGuarantee: "エンタープライズSLA: 120秒以内即答保証",
    typeMessagePlaceholder: "ホスティング設定、DNS、復元について質問するか担当者を呼び出す..."
  },

  zh: {
    appName: "AetherHost",
    tagline: "企业级边缘云与高可用托管平台",
    navOverview: "性能与实时流量",
    navDeployments: "部署记录",
    navBuilder: "可视化建站器",
    navDomains: "域名与 Anycast DNS",
    navBackups: "自动化备份与容灾",
    navSecurity: "威胁检测与 WAF",
    navFunctions: "Edge 边缘函数",
    navAnalytics: "速度洞察与指标",
    navStorage: "存储与数据库",
    navEnvVars: "环境变量配置",
    navBilling: "Paystack 支付与账单",
    navTeam: "团队与 RBAC",
    navAudit: "审计日志",
    navSupport: "7x24 小时全天候支持",

    projectLabel: "当前活跃集群",
    activeRole: "当前角色",
    liveStatus: "全球边缘节点正常运行",
    deployButton: "发起新部署",
    supportChat: "在线支持",

    serverPerformance: "服务器算力与性能监控",
    realTimeTraffic: "边缘实时网络流量监控",
    cpuUtilization: "CPU 使用率",
    memoryLoad: "内存占用",
    diskIo: "NVMe 磁盘 I/O",
    bandwidthOut: "出站带宽",
    requestsPerSec: "每秒请求数 (RPS)",
    edgeLatency: "全球 p95 延迟",
    cacheHitRatio: "边缘缓存命中率",
    uptimeTitle: "SLA 正常运行率 (90天)",
    liveVisitors: "实时请求数据流",
    geoDistribution: "全球访问地域分布",
    recentDeployments: "最新部署列表",

    builderTitle: "拖拽式零代码建站器",
    builderSubtitle: "轻松构建并一键发布生产级现代化企业网站",
    addBlock: "添加页面区块",
    publishSite: "一键发布到全球边缘",
    previewLive: "实时在线预览",
    deviceDesktop: "桌面端",
    deviceTablet: "平板端",
    deviceMobile: "移动端",
    loadTemplate: "加载行业模板",
    savedDraft: "草稿已自动保存",
    publishedToEdge: "已部署至全球 Edge CDN",

    domainsTitle: "域名解析与 Anycast DNS 管理",
    domainsSubtitle: "主域名、二级域名绑定、免费自动化 SSL/TLS 证书与重定向",
    addRecord: "添加解析记录",
    searchDomain: "域名注册查询",
    sslCertStatus: "自动化 SSL/TLS 证书",
    autoRenew: "已开启自动续期",
    nameservers: "权威名称服务器",

    backupsTitle: "自动化备份与快照恢复",
    backupsSubtitle: "跨区域加密快照、秒级精准回滚与完整性校验",
    createSnapshot: "立即创建手动快照",
    restorePoint: "执行系统还原",
    scheduleConfig: "备份计划配置",
    retentionPolicy: "保留策略",
    downloadArchive: "下载备份包 (.tar.gz)",
    verifyChecksum: "SHA-256 校验通过",

    securityTitle: "企业级威胁防御与 WAF",
    securitySubtitle: "OWASP Top 10 防护、Layer 7 DDoS 流量清洗与深度安全扫描",
    wafShield: "应用防火墙防护中",
    threatLog: "拦截威胁日志",
    runSecurityScan: "执行深度安全审计",
    owaspTop10: "OWASP 核心防护规则",
    ddosMitigation: "DDoS 流量清洗",
    blockedAttacks: "24小时拦截攻击数",

    roleSuperAdmin: "超级管理员",
    roleDevOps: "DevOps 运维工程师",
    roleEditor: "内容设计师",
    roleBilling: "财务管理",
    roleAuditor: "只读审计员",
    rbacNotice: "已启用基于角色的访问控制 (RBAC)。可自由切换当前角色测试权限隔离。",
    switchRoleHelp: "模拟 RBAC 角色视图",

    supportTitle: "7x24 小时企业级支持中心",
    supportSubtitle: "专属技术专家 2 分钟响应保障，内置全自动服务器一键诊断",
    startLiveChat: "开启在线对话",
    runDiagnostics: "一键检测服务器健康状态",
    escalateEngineer: "转接高级云架构工程师",
    slaResponseGuarantee: "企业级 SLA 保证：120 秒内真人接入",
    typeMessagePlaceholder: "咨询托管配置、DNS 解析、备份回滚或呼叫工程师..."
  },

  pt: {
    appName: "AetherHost",
    tagline: "Plataforma de Hospedagem e Nuvem Enterprise",
    navOverview: "Desempenho e Tráfego",
    navDeployments: "Implantações",
    navBuilder: "Construtor de Sites",
    navDomains: "Domínios e DNS",
    navBackups: "Backups Automáticos",
    navSecurity: "Detecção de Ameaças",
    navFunctions: "Funções Edge",
    navAnalytics: "Velocidade e Vitals",
    navStorage: "Armazenamento & BD",
    navEnvVars: "Variáveis de Ambiente",
    navBilling: "Pagamentos & Paystack",
    navTeam: "Equipe e RBAC",
    navAudit: "Logs de Auditoria",
    navSupport: "Suporte 24/7 ao Vivo",

    projectLabel: "Cluster Ativo",
    activeRole: "Função Atual",
    liveStatus: "Todos os Nós Edge Operacionais",
    deployButton: "Nova Implantação",
    supportChat: "Suporte ao Vivo",

    serverPerformance: "Desempenho de Servidores e Computação",
    realTimeTraffic: "Tráfego Edge em Tempo Real",
    cpuUtilization: "Uso de CPU",
    memoryLoad: "Carga de Memória",
    diskIo: "E/S de Armazenamento NVMe",
    bandwidthOut: "Largura de Banda de Saída",
    requestsPerSec: "Requisições / Seg",
    edgeLatency: "Latência Global p95",
    cacheHitRatio: "Taxa de Acerto de Cache",
    uptimeTitle: "Disponibilidade SLA (90d)",
    liveVisitors: "Fluxo de Requisições ao Vivo",
    geoDistribution: "Tráfego Global por Região",
    recentDeployments: "Implantações Recentes",

    builderTitle: "Construtor de Sites Arraste e Solte",
    builderSubtitle: "Crie e publique interfaces web prontas para produção sem codificar",
    addBlock: "Adicionar Bloco",
    publishSite: "Publicar no Edge",
    previewLive: "Visualização ao Vivo",
    deviceDesktop: "Desktop",
    deviceTablet: "Tablet",
    deviceMobile: "Mobile",
    loadTemplate: "Carregar Modelo",
    savedDraft: "Rascunho Salvo",
    publishedToEdge: "Publicado no Edge CDN Global",

    domainsTitle: "Gerenciamento de Domínios e Anycast DNS",
    domainsSubtitle: "Gerencie domínios raiz, subdomínios, certificados SSL/TLS e regras",
    addRecord: "Adicionar Registro DNS",
    searchDomain: "Pesquisar Domínio",
    sslCertStatus: "Certificado SSL/TLS Automático",
    autoRenew: "Renovação Automática Ativa",
    nameservers: "Servidores de Nomes",

    backupsTitle: "Backups Automatizados e Recuperação",
    backupsSubtitle: "Snapshots criptografados multirregionais com restaurações imediatas",
    createSnapshot: "Criar Snapshot Manual",
    restorePoint: "Restaurar Estado",
    scheduleConfig: "Frequência e Horário",
    retentionPolicy: "Regras de Retenção",
    downloadArchive: "Baixar Arquivo (.tar.gz)",
    verifyChecksum: "Soma SHA-256 Verificada",

    securityTitle: "Detecção de Ameaças e WAF",
    securitySubtitle: "Mitigação OWASP Top 10, proteção DDoS Camada 7 e auditoria profunda",
    wafShield: "Firewall de Aplicação Ativo",
    threatLog: "Registro de Ameaças Neutralizadas",
    runSecurityScan: "Executar Auditoria de Segurança",
    owaspTop10: "Conjunto de Regras OWASP",
    ddosMitigation: "Atenuação de DDoS",
    blockedAttacks: "Ameaças Neutralizadas (24h)",

    roleSuperAdmin: "Super Administrador",
    roleDevOps: "Engenheiro DevOps",
    roleEditor: "Editor de Conteúdo",
    roleBilling: "Especialista Financeiro",
    roleAuditor: "Auditor Somente Leitura",
    rbacNotice: "Controle de acesso por função ativo. Alterne a função para testar permissões.",
    switchRoleHelp: "Simular visualizações RBAC",

    supportTitle: "Central de Suporte 24/7 Enterprise",
    supportSubtitle: "Resposta garantida em menos de 2 minutos com diagnóstico integrado",
    startLiveChat: "Iniciar Chat ao Vivo",
    runDiagnostics: "Executar Diagnóstico Imediato",
    escalateEngineer: "Transferir para Engenheiro Sênior",
    slaResponseGuarantee: "SLA Enterprise: Resposta em < 120s",
    typeMessagePlaceholder: "Pergunte sobre hospedagem, DNS, backups ou chame um engenheiro..."
  }
};

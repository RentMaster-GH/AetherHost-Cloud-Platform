/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { DeploymentsManager } from './components/deployments/DeploymentsManager';
import { WebsiteBuilder } from './components/builder/WebsiteBuilder';
import { DomainManager } from './components/domains/DomainManager';
import { BackupManager } from './components/backups/BackupManager';
import { SecurityManager } from './components/security/SecurityManager';
import { EdgeFunctionsManager } from './components/functions/EdgeFunctionsManager';
import { AnalyticsManager } from './components/analytics/AnalyticsManager';
import { StorageManager } from './components/storage/StorageManager';
import { EnvVarsManager } from './components/envvars/EnvVarsManager';
import { PaystackBillingManager } from './components/billing/PaystackBillingManager';
import { TeamRbacManager } from './components/team/TeamRbacManager';
import { AuditLogViewer } from './components/audit/AuditLogViewer';
import { LiveSupportChat } from './components/support/LiveSupportChat';
import { LiveSiteModal } from './components/preview/LiveSiteModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, toastMessage } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewDashboard />;
      case 'deployments':
        return <DeploymentsManager />;
      case 'builder':
        return <WebsiteBuilder />;
      case 'domains':
        return <DomainManager />;
      case 'backups':
        return <BackupManager />;
      case 'security':
        return <SecurityManager />;
      case 'functions':
        return <EdgeFunctionsManager />;
      case 'analytics':
        return <AnalyticsManager />;
      case 'storage':
        return <StorageManager />;
      case 'envvars':
        return <EnvVarsManager />;
      case 'billing':
        return <PaystackBillingManager />;
      case 'team':
        return <TeamRbacManager />;
      case 'audit':
        return <AuditLogViewer />;
      case 'support':
        return <LiveSupportChat isEmbeddedPage={true} />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Application Header */}
      <Header />

      {/* Main Workspace: Sidebar + Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Viewport Content Area */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Floating 24/7 Support Chat Widget */}
      <LiveSupportChat isEmbeddedPage={false} />

      {/* Live Site Preview Full-Screen Modal */}
      <LiveSiteModal />

      {/* Global Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-slate-700 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

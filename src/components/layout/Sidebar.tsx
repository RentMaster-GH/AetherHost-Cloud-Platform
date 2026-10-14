import React from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import {
  Activity,
  Layers,
  Layout,
  Globe,
  HardDrive,
  ShieldAlert,
  Zap,
  BarChart3,
  Database,
  KeyRound,
  CreditCard,
  Users,
  ScrollText,
  LifeBuoy
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, t, activeRole } = useApp();

  interface NavItem {
    id: ActiveTab;
    label: string;
    icon: React.ElementType;
    badge?: string;
    badgeColor?: string;
    restrictedRoles?: string[];
  }

  interface NavSection {
    heading: string;
    items: NavItem[];
  }

  const sections: NavSection[] = [
    {
      heading: 'CORE HOSTING',
      items: [
        { id: 'overview', label: t.navOverview, icon: Activity },
        { id: 'deployments', label: t.navDeployments, icon: Layers, badge: 'Live', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-800/40' },
        { id: 'builder', label: t.navBuilder, icon: Layout, badge: 'Visual', badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-800/40' },
        { id: 'domains', label: t.navDomains, icon: Globe },
        { id: 'backups', label: t.navBackups, icon: HardDrive, badge: 'Auto', badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-800/40' }
      ]
    },
    {
      heading: 'SECURITY & EDGE',
      items: [
        { id: 'security', label: t.navSecurity, icon: ShieldAlert, badge: 'WAF', badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-800/40' },
        { id: 'functions', label: t.navFunctions, icon: Zap },
        { id: 'analytics', label: t.navAnalytics, icon: BarChart3 }
      ]
    },
    {
      heading: 'STORAGE & BILLING',
      items: [
        { id: 'storage', label: t.navStorage, icon: Database },
        { id: 'envvars', label: t.navEnvVars, icon: KeyRound },
        { id: 'billing', label: t.navBilling, icon: CreditCard, badge: 'Live', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-800/40' }
      ]
    },
    {
      heading: 'ENTERPRISE & ACCESS',
      items: [
        { id: 'team', label: t.navTeam, icon: Users },
        { id: 'audit', label: t.navAudit, icon: ScrollText },
        { id: 'support', label: t.navSupport, icon: LifeBuoy, badge: '24/7', badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-800/40' }
      ]
    }
  ];

  return (
    <aside className="w-64 shrink-0 bg-slate-950/80 border-r border-slate-800/80 flex flex-col min-h-[calc(100vh-53px)] select-none">
      <div className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {sections.map((sec, sIdx) => (
          <div key={sIdx}>
            <div className="px-3 mb-2 text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
              {sec.heading}
            </div>
            <div className="space-y-0.5">
              {sec.items.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const isRestricted = item.restrictedRoles?.includes(activeRole);

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-slate-900 text-cyan-400 border border-slate-800 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-300'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono border px-1.5 py-0.5 rounded leading-none shrink-0 ${
                          item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer System Status Snippet */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
        <div className="px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-800/60 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Cluster SLA</span>
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">99.998%</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">
            PoPs: 312 Anycast Nodes Active
          </div>
        </div>
      </div>
    </aside>
  );
};

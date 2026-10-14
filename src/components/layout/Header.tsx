import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Globe,
  Shield,
  Rocket,
  MessageSquare,
  ChevronDown,
  CheckCircle,
  Sparkles,
  Server,
  UserCheck,
  Lock,
  Unlock,
  KeyRound,
  Star
} from 'lucide-react';
import { Language, UserRole } from '../../types';

export const Header: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    activeRole,
    setActiveRole,
    projects,
    activeProject,
    setActiveProject,
    triggerDeployment,
    setIsSupportChatOpen,
    isSupportChatOpen,
    currentUser,
    setActiveTab,
    workspaceKey,
    setIsWorkspaceModalOpen,
    isSuperAdminUnlocked,
    setIsAuthModalOpen,
    lockSuperAdmin
  } = useApp();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English (US)', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'zh', label: '中文 (简体)', flag: '🇨🇳' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' }
  ];

  const roles: { role: UserRole; title: string; desc: string }[] = [
    { role: 'super_admin', title: t.roleSuperAdmin, desc: 'Unrestricted control across all infrastructure, billing, and team' },
    { role: 'devops', title: t.roleDevOps, desc: 'Full deploy, backup restore, DNS & security management' },
    { role: 'editor', title: t.roleEditor, desc: 'Website Builder & preview only (DNS & server locked)' },
    { role: 'billing', title: t.roleBilling, desc: 'Invoices, plans, domain renewal (Deployments locked)' },
    { role: 'auditor', title: t.roleAuditor, desc: 'Read-only access to audit logs and compliance charts' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 py-2.5 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Brand & Active Project Selector */}
        <div className="flex items-center gap-4 lg:gap-6 min-w-0">
          <div 
            onClick={() => setActiveTab('overview')} 
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Server className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5 font-display">
                AetherHost
                <span className="text-[10px] tracking-normal font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 rounded px-1.5 py-0.2">
                  ENTERPRISE
                </span>
              </span>
            </div>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          {/* Project Switcher */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-slate-900 border border-slate-800/60 text-xs font-medium text-slate-200 transition-colors"
            >
              <span className="text-slate-400 font-mono text-[11px]">{t.projectLabel}:</span>
              <span className="font-semibold text-white">{activeProject.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isProjectMenuOpen && (
              <div 
                className="absolute left-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setIsProjectMenuOpen(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  Select Infrastructure Target
                </div>
                {projects.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActiveProject(p);
                      setIsProjectMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                      p.id === activeProject.id ? 'bg-cyan-950/30 text-cyan-300' : 'text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-white">{p.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{p.domain}</div>
                    </div>
                    {p.id === activeProject.id && <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Workspace Key Badge (No Email Needed) */}
          <button
            onClick={() => setIsWorkspaceModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 transition-colors"
            title="Unique Workspace Key for cross-device persistence without email. Click to view/copy/restore."
          >
            <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] text-slate-400 font-sans uppercase">Access ID:</span>
            <span className="font-bold">{workspaceKey.length > 15 ? workspaceKey.slice(0, 15) + '...' : workspaceKey}</span>
          </button>

          {/* Operational Status Indicator */}
          <div className="hidden xl:flex items-center gap-2 text-xs text-slate-400 pl-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] text-slate-300 font-mono">{t.liveStatus}</span>
          </div>
        </div>

        {/* Right Controls: Workspace Key (mobile), Super Admin Gate, Language, Support, Deploy */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mobile Workspace Key Icon */}
          <button
            onClick={() => setIsWorkspaceModalOpen(true)}
            className="md:hidden p-1.5 rounded-md bg-slate-900 border border-slate-800 text-cyan-400"
            title="View Workspace Identifier"
          >
            <KeyRound className="w-3.5 h-3.5" />
          </button>

          {/* Super Admin Access Gate */}
          {isSuperAdminUnlocked ? (
            <div className="relative">
              <button
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-gradient-to-r from-amber-950/80 to-slate-900 border border-amber-500/70 text-xs text-amber-300 shadow-sm hover:border-amber-400 transition-all"
                title="Super Admin Mode Unlocked · Lifetime Free Access"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <div className="text-left hidden sm:block">
                  <span className="text-[9px] block text-emerald-400 font-mono font-bold leading-none">FREE ACCESS ACTIVE</span>
                  <span className="font-bold text-white text-[11px]">Super Admin</span>
                </div>
                <ChevronDown className="w-3 h-3 text-amber-400" />
              </button>

              {isRoleMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setIsRoleMenuOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-amber-400" />
                        Super Admin Privileges
                      </div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">
                        Lifetime Free Enterprise Access
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        lockSuperAdmin();
                        setIsRoleMenuOpen(false);
                      }}
                      className="text-[10px] font-mono text-rose-400 hover:text-rose-300 px-2 py-0.5 rounded bg-rose-950 border border-rose-800"
                    >
                      Lock Admin
                    </button>
                  </div>
                  {roles.map(r => (
                    <button
                      key={r.role}
                      onClick={() => {
                        setActiveRole(r.role);
                        setIsRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-800 transition-colors ${
                        activeRole === r.role ? 'bg-amber-950/20 text-amber-200' : 'text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{r.title}</span>
                        {activeRole === r.role && <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">ACTIVE</span>}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{r.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/80 transition-all shadow-sm"
              title="Enter superadminmode to gain complete access without payment"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Unlock Super Admin</span>
              <span className="sm:hidden">Admin</span>
            </button>
          )}

          {/* 24/7 Live Support Chat Trigger */}
          <button
            onClick={() => setIsSupportChatOpen(!isSupportChatOpen)}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">{t.supportChat}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          {/* Vercel-Style Trigger Deployment Primary Button */}
          <button
            onClick={() => triggerDeployment('main')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>{t.deployButton}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

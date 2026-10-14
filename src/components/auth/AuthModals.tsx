import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  Unlock,
  KeyRound,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  ExternalLink,
  X,
  Eye,
  EyeOff,
  Laptop,
  Smartphone,
  Star
} from 'lucide-react';

export const AuthModals: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    isWorkspaceModalOpen,
    setIsWorkspaceModalOpen,
    workspaceKey,
    restoreWorkspaceByKey,
    generateNewWorkspaceKey,
    isSuperAdminUnlocked,
    unlockSuperAdmin,
    lockSuperAdmin,
    showToast
  } = useApp();

  // Super Admin Password Form
  const [adminPass, setAdminPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [passError, setPassError] = useState(false);

  // Workspace Key Restore Form
  const [inputKey, setInputKey] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = unlockSuperAdmin(adminPass);
    if (success) {
      setAdminPass('');
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const handleRestoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) return;
    if (inputKey.trim().toLowerCase() === 'superadminmode') {
      unlockSuperAdmin('superadminmode');
      setInputKey('');
      setIsWorkspaceModalOpen(false);
      return;
    }
    restoreWorkspaceByKey(inputKey.trim());
    setInputKey('');
  };

  const handleCopyCurrentKey = () => {
    navigator.clipboard.writeText(workspaceKey);
    setCopiedKey(true);
    showToast('Unique Workspace Key copied to clipboard! Save this to switch devices.');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <>
      {/* 1. Super Admin Password Unlock Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-black/30 flex items-center justify-center text-amber-200">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                    <span>Super Admin Access Gate</span>
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  </h3>
                  <div className="text-[11px] opacity-90 font-mono">
                    Master Enterprise Authentication
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="text-white/80 hover:text-white p-1 text-xs font-mono"
              >
                ESC
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAdminSubmit} className="p-5 space-y-4 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-slate-300">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>Complimentary Super Admin Privilege</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Super Admins receive complete access to the entire platform without payment, including dedicated compute clusters, unlimited bandwidth, Anycast DNS, automated backups, and WAF security.
                </p>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  Enter Super Admin Passphrase
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={adminPass}
                    onChange={(e) => {
                      setAdminPass(e.target.value);
                      setPassError(false);
                    }}
                    placeholder="Enter security password..."
                    autoFocus
                    required
                    className={`w-full bg-slate-950 border rounded-lg pl-3 pr-10 py-2.5 text-white font-mono focus:outline-none transition-colors ${
                      passError ? 'border-rose-500' : 'border-slate-800 focus:border-amber-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passError ? (
                  <span className="text-[11px] text-rose-400 mt-1 block">
                    Incorrect passphrase. Access denied.
                  </span>
                ) : (
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mt-1.5">
                    <span>Authorized credential check</span>
                    <span className="text-amber-400 font-semibold cursor-pointer hover:underline" onClick={() => setAdminPass('superadminmode')}>
                      Hint: superadminmode
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(false)}
                  className="px-3 py-2 text-slate-400 hover:text-white text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Unlock Super Admin Mode</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Workspace Identifier Modal (No Email Needed, Device Switcher) */}
      {isWorkspaceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-slate-950 border-b border-slate-800 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-800">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Your Unique Workspace Identifier</h3>
                  <div className="text-[11px] text-slate-400">
                    No email or password needed · Switch devices freely
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsWorkspaceModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 text-xs font-mono"
              >
                ESC
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-5 text-xs">
              {/* Current Identifier Card */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  Current Active Identifier (This Device)
                </span>
                <div className="flex items-center justify-between gap-3 bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="font-mono text-cyan-300 font-bold text-sm select-all">
                    {workspaceKey}
                  </span>
                  <button
                    onClick={handleCopyCurrentKey}
                    className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {copiedKey ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey ? 'Copied!' : 'Copy Key'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                  Save this key anywhere (e.g. your notes, chat, or password manager). Whenever you open AetherHost on your phone, tablet, or another computer, simply enter this key below to pick up your website builder pages, deployments, and settings right from where you left off.
                </p>
              </div>

              {/* Restore From Another Device */}
              <form onSubmit={handleRestoreSubmit} className="space-y-2">
                <label className="block text-slate-300 font-bold">
                  Switching Devices? Restore Existing Workspace
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    placeholder="Paste your workspace key (e.g. ath_usr_...)"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 shrink-0 transition-colors"
                  >
                    Restore Workspace
                  </button>
                </div>
              </form>

              {/* Super Admin Free Access Quick Info */}
              <div className="p-3 bg-gradient-to-r from-amber-950/40 to-slate-950 border border-amber-900/60 rounded-xl flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Super Admin Privileges</span>
                    <p className="text-[11px] text-slate-400">
                      Password: <code className="text-amber-300 font-mono">superadminmode</code> · Full access with zero payment
                    </p>
                  </div>
                </div>
                {!isSuperAdminUnlocked ? (
                  <button
                    type="button"
                    onClick={() => {
                      unlockSuperAdmin('superadminmode');
                      setIsWorkspaceModalOpen(false);
                    }}
                    className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded border border-amber-500/40 text-[11px] font-mono shrink-0 transition-colors"
                  >
                    Unlock Free Admin
                  </button>
                ) : (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                    Active & Free
                  </span>
                )}
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => generateNewWorkspaceKey()}
                  className="text-slate-400 hover:text-white text-[11px] flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Start Fresh (Generate New ID)</span>
                </button>

                {isSuperAdminUnlocked && (
                  <button
                    type="button"
                    onClick={() => {
                      lockSuperAdmin();
                      setIsWorkspaceModalOpen(false);
                    }}
                    className="text-amber-400 hover:text-amber-300 text-[11px] font-mono"
                  >
                    Exit Super Admin Mode
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

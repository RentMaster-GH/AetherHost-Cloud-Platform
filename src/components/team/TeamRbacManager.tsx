import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Shield,
  UserCheck,
  Plus,
  CheckCircle2,
  XCircle,
  Mail,
  Lock,
  ArrowRight
} from 'lucide-react';
import { UserRole } from '../../types';

export const TeamRbacManager: React.FC = () => {
  const {
    teamMembers,
    addTeamMember,
    updateMemberRole,
    activeRole,
    setActiveRole,
    t,
    showToast
  } = useApp();

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('editor');

  const permissionsMatrix = [
    { feature: 'Deploy to Production / Rollbacks', super_admin: true, devops: true, editor: false, billing: false, auditor: false },
    { feature: 'Visual Website Builder & Pages', super_admin: true, devops: true, editor: true, billing: false, auditor: false },
    { feature: 'Anycast DNS & Auto-SSL Certificates', super_admin: true, devops: true, editor: false, billing: false, auditor: false },
    { feature: 'Automated Backups & Restore Point', super_admin: true, devops: true, editor: false, billing: false, auditor: false },
    { feature: 'WAF Rules & Threat Mitigation', super_admin: true, devops: true, editor: false, billing: false, auditor: false },
    { feature: 'Team Invitations & Role Assignment', super_admin: true, devops: false, editor: false, billing: false, auditor: false },
    { feature: 'Audit Logs & Compliance Export', super_admin: true, devops: true, editor: false, billing: false, auditor: true },
    { feature: 'Billing, Domain Purchase & Invoices', super_admin: true, devops: false, editor: false, billing: true, auditor: false }
  ];

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;

    addTeamMember(inviteName.trim(), inviteEmail.trim(), inviteRole);
    setIsInviteOpen(false);
    setInviteName('');
    setInviteEmail('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>{t.navTeam}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Enterprise role-based access control (RBAC), multi-factor enforcement, and member permissions.
          </p>
        </div>

        <button
          onClick={() => setIsInviteOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* RBAC Active Role Simulation Notice */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 to-slate-900 border border-amber-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-950 text-amber-400 flex items-center justify-center border border-amber-800">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase font-mono">
              Live RBAC Simulator
            </h3>
            <p className="text-xs text-slate-300">
              {t.rbacNotice}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Simulate Role:</span>
          <select
            value={activeRole}
            onChange={(e) => {
              setActiveRole(e.target.value as UserRole);
              showToast(`Switched active view to ${e.target.value}. RBAC restrictions applied.`);
            }}
            className="bg-slate-950 border border-slate-700 text-amber-300 text-xs font-mono font-semibold rounded-lg px-3 py-1.5 focus:outline-none"
          >
            <option value="super_admin">Super Admin (Full Access)</option>
            <option value="devops">DevOps Engineer</option>
            <option value="editor">Content Editor</option>
            <option value="billing">Billing Specialist</option>
            <option value="auditor">Read-Only Auditor</option>
          </select>
        </div>
      </div>

      {/* Team Roster Table */}
      <div className="rounded-xl bg-slate-900/40 border border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white">Active Team Members ({teamMembers.length})</h3>
          <span className="text-xs text-slate-400 font-mono">2FA Enforced Globally</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800/80">
                <th className="pb-2.5 font-medium">User Profile</th>
                <th className="pb-2.5 font-medium">Assigned Role</th>
                <th className="pb-2.5 font-medium">Security 2FA</th>
                <th className="pb-2.5 font-medium">Joined Date</th>
                <th className="pb-2.5 font-medium">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {teamMembers.map(member => (
                <tr key={member.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-800 text-cyan-300 flex items-center justify-center font-bold text-xs">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white font-sans">{member.name}</div>
                        <div className="text-[11px] text-slate-400">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <select
                      value={member.role}
                      onChange={(e) => updateMemberRole(member.id, e.target.value as UserRole)}
                      disabled={activeRole !== 'super_admin'}
                      className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-200 text-xs font-mono focus:outline-none disabled:opacity-60"
                    >
                      <option value="super_admin">Super Admin</option>
                      <option value="devops">DevOps</option>
                      <option value="editor">Editor</option>
                      <option value="billing">Billing</option>
                      <option value="auditor">Auditor</option>
                    </select>
                  </td>
                  <td className="py-3">
                    {member.twoFactorEnabled ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-sans text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Enabled
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1 font-sans text-xs">
                        Pending SMS/TOTP
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-slate-400">{member.joinedAt}</td>
                  <td className="py-3 text-slate-300">{member.lastActiveAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="rounded-xl bg-slate-900/40 border border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white">Granular Permission Matrix by Role</h3>
          <span className="text-xs text-slate-400 font-mono">SOC 2 Compliant</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800/80">
                <th className="pb-2.5 font-medium font-sans">Capability / Action</th>
                <th className="pb-2.5 font-medium text-center">Super Admin</th>
                <th className="pb-2.5 font-medium text-center">DevOps</th>
                <th className="pb-2.5 font-medium text-center">Editor</th>
                <th className="pb-2.5 font-medium text-center">Billing</th>
                <th className="pb-2.5 font-medium text-center">Auditor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {permissionsMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/20">
                  <td className="py-2.5 font-sans font-medium text-slate-300">{row.feature}</td>
                  <td className="py-2.5 text-center">
                    {row.super_admin ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                  <td className="py-2.5 text-center">
                    {row.devops ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                  <td className="py-2.5 text-center">
                    {row.editor ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                  <td className="py-2.5 text-center">
                    {row.billing ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                  <td className="py-2.5 text-center">
                    {row.auditor ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Invite Team Member</h3>
              <button
                onClick={() => setIsInviteOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ESC
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Jordan Miller"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Corporate Email Address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="e.g. jordan@company.com"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Select Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as UserRole)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                >
                  <option value="editor">Content Editor (Website Builder only)</option>
                  <option value="devops">DevOps Engineer (Deploy, DNS, Backups)</option>
                  <option value="billing">Billing Specialist</option>
                  <option value="auditor">Auditor (Read-Only)</option>
                  <option value="super_admin">Super Admin (Full Access)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-sm"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

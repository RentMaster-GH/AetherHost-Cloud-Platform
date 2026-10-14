import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCw,
  Lock,
  Globe,
  Plus,
  Trash2,
  Sliders,
  Terminal,
  Zap
} from 'lucide-react';
import { ThreatEvent } from '../../types';

export const SecurityManager: React.FC = () => {
  const {
    t,
    wafRules,
    toggleWafRule,
    threatEvents,
    securityScanResult,
    isScanningSecurity,
    runDeepSecurityScan,
    showToast,
    addAuditLog
  } = useApp();

  const [ipList, setIpList] = useState<Array<{ id: string; ip: string; action: 'block' | 'allow'; note: string }>>([
    { id: 'ip_1', ip: '185.220.101.0/24', action: 'block', note: 'Known malicious Tor exit node block' },
    { id: 'ip_2', ip: '198.51.100.4', action: 'allow', note: 'Corporate office VPN static gateway' }
  ]);

  const [newIp, setNewIp] = useState('');
  const [newIpAction, setNewIpAction] = useState<'block' | 'allow'>('block');
  const [newIpNote, setNewIpNote] = useState('');

  const handleAddIpRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIp.trim()) return;

    setIpList(prev => [
      { id: 'ip_' + Date.now(), ip: newIp.trim(), action: newIpAction, note: newIpNote.trim() || 'Custom security policy' },
      ...prev
    ]);
    showToast(`IP rule created for ${newIp.trim()}`);
    addAuditLog(`IP Access Rule Added (${newIpAction.toUpperCase()} ${newIp.trim()})`, 'security', newIp.trim());
    setNewIp('');
    setNewIpNote('');
  };

  const handleDeleteIpRule = (id: string) => {
    setIpList(prev => prev.filter(i => i.id !== id));
    showToast('IP rule deleted');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>{t.securityTitle}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.securitySubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runDeepSecurityScan}
            disabled={isScanningSecurity}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 shadow-sm transition-colors disabled:opacity-60"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isScanningSecurity ? 'animate-spin' : ''}`} />
            <span>{isScanningSecurity ? 'Scanning Systems...' : t.runSecurityScan}</span>
          </button>
        </div>
      </div>

      {/* Security Health & Grade Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* SSL Grade */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <span className="text-xs font-medium text-slate-400">SSL/TLS Security Grade</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold font-mono text-emerald-400">
              {securityScanResult.sslGrade}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Qualys SSL Labs</span>
          </div>
          <div className="text-[11px] text-emerald-400 font-mono mt-2">
            {securityScanResult.tlsVersion}
          </div>
        </div>

        {/* Threats Neutralized */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <span className="text-xs font-medium text-slate-400">{t.blockedAttacks}</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold font-mono text-amber-400">3,164</span>
            <span className="text-[11px] text-slate-400 font-mono">Requests Dropped</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-2">
            Layer 7 Edge Scrubber Active
          </div>
        </div>

        {/* Malware Scanner */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <span className="text-xs font-medium text-slate-400">File Integrity & Malware</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold font-mono text-emerald-400">0 FOUND</span>
            <span className="text-[11px] text-emerald-400 font-mono">100% Clean</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-2">
            {securityScanResult.lastScannedAt}
          </div>
        </div>

        {/* OWASP Coverage */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <span className="text-xs font-medium text-slate-400">OWASP Top 10 Posture</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold font-mono text-cyan-400">A+ HARDENED</span>
          </div>
          <div className="text-[11px] text-cyan-400 font-mono mt-2">
            Zero known vulnerabilities
          </div>
        </div>
      </div>

      {/* WAF Rule Engine Switches */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">{t.wafShield}</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Anycast Edge Packet Scrubbing
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {wafRules.map(rule => (
            <div
              key={rule.id}
              className={`p-3 rounded-lg border transition-all flex items-start justify-between gap-3 ${
                rule.enabled
                  ? 'bg-slate-950 border-slate-700/80 text-white'
                  : 'bg-slate-950/40 border-slate-900 text-slate-400'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{rule.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-900 rounded text-amber-400 border border-slate-800">
                    {rule.triggersLast24h} blocked
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{rule.description}</p>
              </div>

              <button
                onClick={() => toggleWafRule(rule.id)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  rule.enabled ? 'bg-amber-500' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    rule.enabled ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Neutralized Threat Log Table */}
      <div className="rounded-xl bg-slate-900/40 border border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <h3 className="text-sm font-bold text-white">{t.threatLog}</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Real-time WAF telemetry
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800/80">
                <th className="pb-2.5 font-medium">Timestamp (UTC)</th>
                <th className="pb-2.5 font-medium">Attack Signature & Type</th>
                <th className="pb-2.5 font-medium">Target Route</th>
                <th className="pb-2.5 font-medium">Source IP & Geo</th>
                <th className="pb-2.5 font-medium">Severity</th>
                <th className="pb-2.5 font-medium">Mitigation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {threatEvents.map(event => (
                <tr key={event.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 text-slate-400 tabular-nums">{event.timestamp}</td>
                  <td className="py-2.5">
                    <div className="font-semibold text-rose-300">{event.attackType}</div>
                    <div className="text-[10px] text-slate-400">{event.signatureMatch}</div>
                  </td>
                  <td className="py-2.5 text-slate-300">{event.targetUri}</td>
                  <td className="py-2.5 text-slate-400">
                    <span className="text-white font-mono">{event.sourceIp}</span>
                    <span className="block text-[10px] text-slate-400">{event.country}</span>
                  </td>
                  <td className="py-2.5">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        event.severity === 'critical'
                          ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                          : 'bg-amber-950/80 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {event.severity.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-2.5 text-emerald-400 flex items-center gap-1 font-sans text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{event.mitigationAction}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* IP Access Control Rules (Allow / Deny list) */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="text-sm font-bold text-white">Custom IP Firewalls & Country Restrictions</h3>
          <span className="text-xs text-slate-400 font-mono">BGP Anycast Enforcement</span>
        </div>

        <form onSubmit={handleAddIpRule} className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
          <input
            type="text"
            value={newIp}
            onChange={(e) => setNewIp(e.target.value)}
            placeholder="IP or CIDR (e.g. 192.0.2.0/24)"
            required
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500"
          />
          <select
            value={newIpAction}
            onChange={(e) => setNewIpAction(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none"
          >
            <option value="block">BLOCK (Immediate Drop)</option>
            <option value="allow">ALLOW (Bypass Rate Limiting)</option>
          </select>
          <input
            type="text"
            value={newIpNote}
            onChange={(e) => setNewIpNote(e.target.value)}
            placeholder="Rule description or ticket reference"
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 transition-colors"
          >
            Add Rule
          </button>
        </form>

        <div className="space-y-1.5 pt-1">
          {ipList.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs font-mono"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.action === 'block'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}
                >
                  {item.action.toUpperCase()}
                </span>
                <span className="text-white font-semibold">{item.ip}</span>
                <span className="text-slate-400 font-sans text-[11px] truncate">{item.note}</span>
              </div>
              <button
                onClick={() => handleDeleteIpRule(item.id)}
                className="text-slate-400 hover:text-rose-400 p-1"
                title="Remove rule"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

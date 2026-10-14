import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScrollText, Search, Filter, Download, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export const AuditLogViewer: React.FC = () => {
  const { auditLogs, showToast, t } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredLogs = auditLogs.filter(log => {
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    const matchesSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.actorName.toLowerCase().includes(search.toLowerCase()) ||
      log.targetResource.toLowerCase().includes(search.toLowerCase()) ||
      log.ipAddress.includes(search);
    return matchesCategory && matchesSearch;
  });

  const handleExport = (format: 'json' | 'csv') => {
    const dataStr =
      format === 'json'
        ? 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredLogs, null, 2))
        : 'data:text/csv;charset=utf-8,' +
          encodeURIComponent(
            'Timestamp,Actor,Role,Action,Category,Target,IP,Status\n' +
              filteredLogs
                .map(l => `"${l.timestamp}","${l.actorName}","${l.role}","${l.action}","${l.category}","${l.targetResource}","${l.ipAddress}","${l.status}"`)
                .join('\n')
          );

    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `aetherhost-audit-trail-${Date.now()}.${format}`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast(`Audit log exported as ${format.toUpperCase()} successfully.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>{t.navAudit}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tamper-evident append-only event log for enterprise compliance (SOC 2, ISO 27001, HIPAA).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('csv')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => handleExport('json')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by actor, action description, resource, or IP address..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 shrink-0 font-medium">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="deployment">Deployment</option>
            <option value="dns">DNS Records</option>
            <option value="backup">Backups & Disaster Recovery</option>
            <option value="security">WAF & Security</option>
            <option value="access">Access & RBAC</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-xl bg-slate-900/40 border border-slate-800 p-4 space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800/80">
                <th className="pb-2.5 font-medium">Timestamp (UTC)</th>
                <th className="pb-2.5 font-medium">Actor & Role</th>
                <th className="pb-2.5 font-medium">Action Performed</th>
                <th className="pb-2.5 font-medium">Target Resource</th>
                <th className="pb-2.5 font-medium">Source IP</th>
                <th className="pb-2.5 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 text-slate-400 tabular-nums">{log.timestamp}</td>
                  <td className="py-2.5">
                    <span className="font-bold text-white block font-sans">{log.actorName}</span>
                    <span className="text-[10px] text-slate-400 uppercase">{log.role}</span>
                  </td>
                  <td className="py-2.5 font-semibold text-slate-200">{log.action}</td>
                  <td className="py-2.5 text-cyan-300 truncate max-w-[180px]">{log.targetResource}</td>
                  <td className="py-2.5 text-slate-400">{log.ipAddress}</td>
                  <td className="py-2.5 text-right">
                    {log.status === 'success' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Success
                      </span>
                    ) : log.status === 'denied' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-rose-400 font-semibold font-sans">
                        <XCircle className="w-3.5 h-3.5" />
                        Blocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-semibold font-sans">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Warning
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

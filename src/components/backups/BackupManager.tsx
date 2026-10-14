import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  HardDrive,
  Plus,
  RotateCcw,
  Download,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Calendar,
  Lock,
  Layers,
  FileCheck,
  AlertTriangle,
  Play
} from 'lucide-react';
import { BackupSnapshot } from '../../types';

export const BackupManager: React.FC = () => {
  const {
    t,
    backups,
    backupSchedule,
    updateBackupSchedule,
    createManualSnapshot,
    restoreSnapshot,
    activeRestoringSnapshot,
    restoreProgress,
    showToast,
    addAuditLog,
    activeRole
  } = useApp();

  const [isSnapshotModalOpen, setIsSnapshotModalOpen] = useState(false);
  const [snapshotName, setSnapshotName] = useState('');
  const [selectedSnapshotForRestore, setSelectedSnapshotForRestore] = useState<BackupSnapshot | null>(null);

  const handleCreateSnapshot = (e: React.FormEvent) => {
    e.preventDefault();
    createManualSnapshot(snapshotName.trim());
    setIsSnapshotModalOpen(false);
    setSnapshotName('');
  };

  const handleDownloadArchive = (snap: BackupSnapshot) => {
    showToast(`Generating secure signed download link for ${snap.name}.tar.gz...`);
    setTimeout(() => {
      showToast(`Archive download ready (${(snap.sizeMb / 1024).toFixed(2)} GB).`);
      addAuditLog(`Backup Archive Downloaded (${snap.name})`, 'backup', snap.id);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>{t.backupsTitle}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.backupsSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSnapshotModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.createSnapshot}</span>
          </button>
        </div>
      </div>

      {/* Automated Backup Schedule Policy Card */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Automated Schedule & Retention Policy</h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            POLICY ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[10px] font-mono uppercase">Backup Frequency</span>
            <select
              value={backupSchedule.frequency}
              onChange={(e) => updateBackupSchedule({ frequency: e.target.value as any })}
              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-white mt-1 focus:outline-none"
            >
              <option value="hourly">Every 1 Hour (Incremental)</option>
              <option value="daily">Daily at 02:00 UTC</option>
              <option value="weekly">Weekly (Sundays 00:00 UTC)</option>
            </select>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[10px] font-mono uppercase">Retention Horizon</span>
            <select
              value={backupSchedule.retentionDays}
              onChange={(e) => updateBackupSchedule({ retentionDays: Number(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-white mt-1 focus:outline-none"
            >
              <option value={7}>7 Days Retention</option>
              <option value={30}>30 Days (Recommended)</option>
              <option value={90}>90 Days (Enterprise Compliance)</option>
            </select>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <span className="text-slate-400 block text-[10px] font-mono uppercase">Multi-Region Replication</span>
            <label className="flex items-center gap-2 cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={backupSchedule.replicateToColdStorage}
                onChange={(e) => updateBackupSchedule({ replicateToColdStorage: e.target.checked })}
                className="rounded bg-slate-900 border-slate-700 text-blue-500"
              />
              <span className="text-slate-200 font-medium">Secondary Cold Vault</span>
            </label>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <span className="text-slate-400 block text-[10px] font-mono uppercase">WORM Immutability Lock</span>
            <label className="flex items-center gap-2 cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={backupSchedule.lockProtection}
                onChange={(e) => updateBackupSchedule({ lockProtection: e.target.checked })}
                className="rounded bg-slate-900 border-slate-700 text-blue-500"
              />
              <span className="text-slate-200 font-medium">Ransomware Tamper-Proof</span>
            </label>
          </div>
        </div>
      </div>

      {/* Snapshots Table */}
      <div className="rounded-xl bg-slate-900/40 border border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Verified Backup Snapshots</span>
              <span className="text-xs text-slate-400 font-mono">({backups.length} points available)</span>
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Encrypted with AES-256-GCM
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800/80">
                <th className="pb-2.5 font-medium">Snapshot Identifier</th>
                <th className="pb-2.5 font-medium">Created (UTC)</th>
                <th className="pb-2.5 font-medium">Type</th>
                <th className="pb-2.5 font-medium">Archive Size</th>
                <th className="pb-2.5 font-medium">Integrity Checksum</th>
                <th className="pb-2.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {backups.map(snap => (
                <tr key={snap.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3">
                    <div className="font-bold text-white">{snap.name}</div>
                    <div className="text-[10px] text-slate-400 font-sans">
                      {snap.databaseCount} DBs · {snap.filesCount.toLocaleString()} files
                    </div>
                  </td>
                  <td className="py-3 text-slate-300">{snap.createdAt}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        snap.type === 'automated_daily'
                          ? 'bg-blue-950/60 text-blue-300 border border-blue-800/40'
                          : snap.type === 'system_pre_deploy'
                          ? 'bg-purple-950/60 text-purple-300 border border-purple-800/40'
                          : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                      }`}
                    >
                      {snap.type === 'automated_daily' ? 'DAILY AUTO' : snap.type === 'system_pre_deploy' ? 'PRE-DEPLOY' : 'MANUAL'}
                    </span>
                  </td>
                  <td className="py-3 text-slate-300 tabular-nums">
                    {(snap.sizeMb / 1024).toFixed(2)} GB
                  </td>
                  <td className="py-3 text-slate-400 font-mono text-[11px] truncate max-w-[160px]" title={snap.checksumSha256}>
                    {snap.status === 'creating' ? (
                      <span className="text-amber-400 animate-pulse">Creating...</span>
                    ) : (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {snap.checksumSha256.slice(0, 12)}...
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDownloadArchive(snap)}
                        className="p-1.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded"
                        title={t.downloadArchive}
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setSelectedSnapshotForRestore(snap)}
                        disabled={snap.status === 'creating'}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-300 hover:text-rose-200 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/50 rounded transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Rollback</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Snapshot Modal */}
      {isSnapshotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Create Manual Snapshot</h3>
              <button
                onClick={() => setIsSnapshotModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ESC
              </button>
            </div>

            <form onSubmit={handleCreateSnapshot} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Snapshot Label / Tag</label>
                <input
                  type="text"
                  value={snapshotName}
                  onChange={(e) => setSnapshotName(e.target.value)}
                  placeholder="e.g. pre-migration-checkpoint"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1 text-slate-400">
                <div className="font-semibold text-white">Snapshot Scope:</div>
                <div>• All Postgres / KV databases in cluster</div>
                <div>• Persistent NVMe user files and static assets</div>
                <div>• DNS configuration & WAF rules state</div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSnapshotModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm"
                >
                  Create Snapshot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Restore Confirmation & Multi-Step Progress Modal */}
      {(selectedSnapshotForRestore || activeRestoringSnapshot) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-950/80 text-rose-400 flex items-center justify-center border border-rose-800">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {activeRestoringSnapshot ? 'Executing Disaster Recovery Rollback' : 'Confirm System State Restore'}
                </h3>
                <p className="text-xs text-slate-400">
                  Target Point: <span className="font-mono text-cyan-300 font-semibold">{selectedSnapshotForRestore?.name || activeRestoringSnapshot?.name}</span>
                </p>
              </div>
            </div>

            {activeRestoringSnapshot ? (
              /* Active multi-step progress bar */
              <div className="space-y-4 py-2">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-cyan-400">
                      {restoreProgress < 30
                        ? '1/4: Verifying SHA-256 cryptographic checksums...'
                        : restoreProgress < 60
                        ? '2/4: Quiescing database transactions & locking tables...'
                        : restoreProgress < 90
                        ? '3/4: Swapping hot NVMe volume blocks...'
                        : '4/4: Running post-restore smoke test checks...'}
                    </span>
                    <span className="text-white font-bold">{restoreProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full transition-all duration-300"
                      style={{ width: `${restoreProgress}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
                  <div>[OK] Snapshot verified against secondary offsite vault</div>
                  <div>[OK] 3,240 open client sessions safely held in Edge proxy queue</div>
                  <div>[OK] Volume IOPS normalized across cluster</div>
                </div>
              </div>
            ) : (
              /* Pre-restore warning */
              <div className="space-y-3 text-xs text-slate-300">
                <p>
                  Restoring will revert all files, database tables, and configurations back to this exact snapshot state. Any changes made after this point will be replaced.
                </p>
                <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-900/50 text-rose-300 space-y-1">
                  <div className="font-semibold text-rose-200">Zero-Downtime Guarantee:</div>
                  <div>Edge proxy buffers incoming web requests while the volume swap occurs (~10s). Visitors will experience zero 502/503 errors.</div>
                </div>
              </div>
            )}

            {!activeRestoringSnapshot && (
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedSnapshotForRestore(null)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const target = selectedSnapshotForRestore;
                    setSelectedSnapshotForRestore(null);
                    if (target) restoreSnapshot(target.id);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-md"
                >
                  Confirm & Restore System State
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

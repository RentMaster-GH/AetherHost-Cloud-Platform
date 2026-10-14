import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  GitBranch,
  GitCommit,
  Clock,
  RotateCcw,
  Terminal,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Plus,
  RefreshCw,
  Copy,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Deployment } from '../../types';

export const DeploymentsManager: React.FC = () => {
  const {
    t,
    deployments,
    triggerDeployment,
    rollbackDeployment,
    selectedDeploymentForLogs,
    setSelectedDeploymentForLogs,
    activeProject,
    showToast
  } = useApp();

  const [envFilter, setEnvFilter] = useState<'all' | 'production' | 'preview'>('all');
  const [branchInput, setBranchInput] = useState('main');

  const filteredDeployments = deployments.filter(d => {
    if (envFilter === 'all') return true;
    return d.environment === envFilter;
  });

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast('Deployment URL copied to clipboard');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>{t.navDeployments}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Zero-configuration Edge deployments with instant git integration and atomic rollbacks.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs">
            <GitBranch className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
            <select
              value={branchInput}
              onChange={(e) => setBranchInput(e.target.value)}
              className="bg-transparent text-white font-mono focus:outline-none"
            >
              <option value="main" className="bg-slate-900">main (Production)</option>
              <option value="staging" className="bg-slate-900">staging (Preview)</option>
              <option value="feature/cart" className="bg-slate-900">feature/cart</option>
            </select>
          </div>

          <button
            onClick={() => triggerDeployment(branchInput)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Deploy Branch</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-900/60 rounded-lg border border-slate-800/80 w-fit">
        <button
          onClick={() => setEnvFilter('all')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            envFilter === 'all'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          All Environments ({deployments.length})
        </button>
        <button
          onClick={() => setEnvFilter('production')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            envFilter === 'production'
              ? 'bg-slate-800 text-cyan-300 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Production
        </button>
        <button
          onClick={() => setEnvFilter('preview')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            envFilter === 'preview'
              ? 'bg-slate-800 text-purple-300 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Previews
        </button>
      </div>

      {/* Deployments List (Vercel Style) */}
      <div className="space-y-3">
        {filteredDeployments.map(dep => {
          const isProd = dep.environment === 'production';

          return (
            <div
              key={dep.id}
              className={`p-4 rounded-xl border transition-all hover:border-slate-700 bg-slate-900/40 ${
                isProd ? 'border-cyan-900/40' : 'border-slate-800'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left: Commit info & environment badge */}
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                        isProd
                          ? 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60'
                          : 'bg-purple-950/80 text-purple-300 border-purple-800/60'
                      }`}
                    >
                      {dep.environment}
                    </span>

                    <span className="text-sm font-bold text-white truncate max-w-md">
                      {dep.commitMessage}
                    </span>
                  </div>

                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1 text-slate-300">
                      <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{dep.branch}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <GitCommit className="w-3.5 h-3.5 text-purple-400" />
                      <span>{dep.commitHash}</span>
                    </span>
                    <span>·</span>
                    <span>{dep.createdAt}</span>
                    {dep.durationSeconds > 0 && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{dep.durationSeconds}s build</span>
                        </span>
                      </>
                    )}
                  </div>

                  {/* Target URL */}
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={dep.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1 hover:underline truncate max-w-lg"
                    >
                      <span>{dep.url}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                    <button
                      onClick={() => handleCopyUrl(dep.url)}
                      className="text-slate-400 hover:text-white p-0.5"
                      title="Copy URL"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Right: Status badge & Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="mr-2">
                    {dep.status === 'ready' ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        Ready
                      </span>
                    ) : dep.status === 'building' ? (
                      <span className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-semibold animate-pulse">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Building...
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-rose-400 font-mono font-semibold">
                        <AlertCircle className="w-4 h-4" />
                        Failed
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedDeploymentForLogs(dep)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-colors"
                  >
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View Logs</span>
                  </button>

                  {isProd && (
                    <button
                      onClick={() => rollbackDeployment(dep.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
                      title="Rollback production to this deployment"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                      <span>Instant Rollback</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Terminal Build Logs Modal */}
      {selectedDeploymentForLogs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white font-mono">
                  Build & Deployment Output: {selectedDeploymentForLogs.commitHash}
                </span>
              </div>
              <button
                onClick={() => setSelectedDeploymentForLogs(null)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                CLOSE [ESC]
              </button>
            </div>

            {/* Log Terminal body */}
            <div className="p-4 overflow-y-auto space-y-1 font-mono text-xs text-slate-300 bg-slate-950 flex-1">
              <div className="text-slate-400">=== AetherHost Edge Cloud Builder v4.2 ===</div>
              <div className="text-slate-400">Target Region: {activeProject.region}</div>
              <div className="text-slate-400">Commit: {selectedDeploymentForLogs.commitHash} ({selectedDeploymentForLogs.commitMessage})</div>
              <div className="h-2" />
              {selectedDeploymentForLogs.buildLogs.map((line, idx) => (
                <div key={idx} className="leading-relaxed hover:bg-slate-900/60 px-1 rounded">
                  <span className="text-cyan-400">{line.slice(0, 10)}</span>
                  <span className="text-slate-200">{line.slice(10)}</span>
                </div>
              ))}
              <div className="h-2" />
              <div className="text-emerald-400 font-bold">
                ✔ Build successful. Edge function routes ready in 14 edge clusters.
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-900 border-t border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Exit Code: 0 (Success)</span>
              <button
                onClick={() => setSelectedDeploymentForLogs(null)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

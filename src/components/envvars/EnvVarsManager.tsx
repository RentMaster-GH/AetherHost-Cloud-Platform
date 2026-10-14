import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KeyRound, Eye, EyeOff, Plus, Trash2, Lock, ShieldCheck, Copy } from 'lucide-react';

export const EnvVarsManager: React.FC = () => {
  const { envVars, addEnvVar, deleteEnvVar, showToast } = useApp();

  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [targetProd, setTargetProd] = useState(true);
  const [targetPrev, setTargetPrev] = useState(true);
  const [targetDev, setTargetDev] = useState(true);

  const toggleReveal = (id: string) => {
    setRevealedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.trim() || !newValue.trim()) return;

    const targets: ('production' | 'preview' | 'development')[] = [];
    if (targetProd) targets.push('production');
    if (targetPrev) targets.push('preview');
    if (targetDev) targets.push('development');

    addEnvVar(newKey, newValue, targets);
    setIsAddOpen(false);
    setNewKey('');
    setNewValue('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Environment Variables</span>
            <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded">
              ENCRYPTED
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Scoped secrets injected at build-time and runtime into production and preview deployments.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Variable</span>
        </button>
      </div>

      {/* Security notice */}
      <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
        <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          Secrets are encrypted with hardware-backed AES-256 keys. Values are never exposed in client bundles unless prefixed with <code className="text-cyan-400 font-mono">NEXT_PUBLIC_</code>.
        </span>
      </div>

      {/* Variables Table */}
      <div className="rounded-xl bg-slate-900/40 border border-slate-800 p-4 space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800/80">
                <th className="pb-2.5 font-medium">Variable Key</th>
                <th className="pb-2.5 font-medium">Target Environments</th>
                <th className="pb-2.5 font-medium">Value</th>
                <th className="pb-2.5 font-medium">Updated</th>
                <th className="pb-2.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {envVars.map(env => {
                const isRevealed = revealedIds[env.id];

                return (
                  <tr key={env.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 font-bold text-white font-mono">{env.key}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        {env.targets.map(t => (
                          <span
                            key={t}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase ${
                              t === 'production'
                                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                                : t === 'preview'
                                ? 'bg-purple-950 text-purple-300 border border-purple-800'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 font-mono text-slate-300">
                      {isRevealed ? (
                        <span className="text-cyan-300 truncate max-w-xs block select-all">{env.value}</span>
                      ) : (
                        <span className="text-slate-500 tracking-wider">••••••••••••••••••••</span>
                      )}
                    </td>
                    <td className="py-3 text-slate-400">{env.updatedAt}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => toggleReveal(env.id)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                          title={isRevealed ? 'Hide secret' : 'Reveal secret'}
                        >
                          {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => deleteEnvVar(env.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                          title="Delete variable"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Add Environment Variable</h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ESC
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Key (Identifier)</label>
                <input
                  type="text"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  placeholder="e.g. PAYSTACK_SECRET_KEY"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Value</label>
                <textarea
                  rows={3}
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="Enter secret payload..."
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1.5">Environment Scopes</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={targetProd}
                      onChange={(e) => setTargetProd(e.target.checked)}
                      className="rounded bg-slate-950 border-slate-700 text-cyan-500"
                    />
                    <span className="text-slate-300">Production</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={targetPrev}
                      onChange={(e) => setTargetPrev(e.target.checked)}
                      className="rounded bg-slate-950 border-slate-700 text-cyan-500"
                    />
                    <span className="text-slate-300">Preview</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={targetDev}
                      onChange={(e) => setTargetDev(e.target.checked)}
                      className="rounded bg-slate-950 border-slate-700 text-cyan-500"
                    />
                    <span className="text-slate-300">Development</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-sm"
                >
                  Save Secret
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

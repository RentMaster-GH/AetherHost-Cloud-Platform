import React from 'react';
import { useApp } from '../../context/AppContext';
import { Zap, Clock, Cpu, AlertCircle, Play, CheckCircle2, Globe } from 'lucide-react';

export const EdgeFunctionsManager: React.FC = () => {
  const { edgeFunctions, showToast } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Edge & Serverless Functions</span>
            <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded">
              V8 ISOLATES
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Zero-cold-start edge compute executed in 312 worldwide Points of Presence within microseconds of visitors.
          </p>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <span className="text-xs text-slate-400">Total Invocations (24h)</span>
          <div className="text-2xl font-bold font-mono text-white mt-1">327,800</div>
          <span className="text-[11px] text-emerald-400 font-mono">+18.2% vs yesterday</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <span className="text-xs text-slate-400">Median Execution Duration</span>
          <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">8.4 ms</div>
          <span className="text-[11px] text-slate-400 font-mono">Zero cold starts</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <span className="text-xs text-slate-400">Error Rate (5xx)</span>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">0.004%</div>
          <span className="text-[11px] text-slate-400 font-mono">Within 99.99% SLA</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <span className="text-xs text-slate-400">Anycast Distribution</span>
          <div className="text-2xl font-bold font-mono text-purple-400 mt-1">14 Regions</div>
          <span className="text-[11px] text-slate-400 font-mono">Auto-routed via BGP</span>
        </div>
      </div>

      {/* Functions Table */}
      <div className="rounded-xl bg-slate-900/40 border border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white">Active Serverless & Edge Routes</h3>
          <span className="text-xs text-slate-400 font-mono">Runtime: Edge V8 Engine</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800/80">
                <th className="pb-2.5 font-medium">Function Route</th>
                <th className="pb-2.5 font-medium">Runtime</th>
                <th className="pb-2.5 font-medium">Target Region</th>
                <th className="pb-2.5 font-medium">Invocations (24h)</th>
                <th className="pb-2.5 font-medium">Avg Duration</th>
                <th className="pb-2.5 font-medium">Memory</th>
                <th className="pb-2.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {edgeFunctions.map(fn => (
                <tr key={fn.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3">
                    <div className="font-bold text-white">{fn.route}</div>
                    <div className="text-[10px] text-slate-400 font-sans">{fn.name}</div>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {fn.runtime}
                    </span>
                  </td>
                  <td className="py-3 text-slate-300">{fn.region}</td>
                  <td className="py-3 text-white font-bold tabular-nums">
                    {fn.invocations24h.toLocaleString()}
                  </td>
                  <td className="py-3 text-cyan-300 tabular-nums">
                    {fn.avgDurationMs} ms
                  </td>
                  <td className="py-3 text-slate-400 tabular-nums">{fn.memoryAllocatedMb} MB</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => showToast(`Invoking test ping to ${fn.route}... Result: 200 OK (${fn.avgDurationMs}ms)`)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition-colors"
                    >
                      Test Ping
                    </button>
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

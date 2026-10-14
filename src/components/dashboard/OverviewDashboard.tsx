import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Cpu,
  HardDrive,
  Wifi,
  Gauge,
  Globe,
  Radio,
  Play,
  Pause,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Clock,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const OverviewDashboard: React.FC = () => {
  const {
    t,
    serverMetrics,
    isLiveMonitoring,
    setIsLiveMonitoring,
    liveRequests,
    geoTraffic,
    deployments,
    setActiveTab,
    showToast,
    addAuditLog
  } = useApp();

  const handlePurgeCache = () => {
    showToast('Purging Edge Cache across 312 global Anycast PoPs...');
    setTimeout(() => {
      showToast('Global edge cache purged! Fresh requests hitting origin.');
      addAuditLog('Edge Cache Purged (All Regions)', 'deployment', 'global-cache');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Cluster Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>{t.serverPerformance}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time telemetry and edge analytics for high-availability enterprise workloads.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Pause / Play Live Stream Toggle */}
          <button
            onClick={() => setIsLiveMonitoring(!isLiveMonitoring)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors ${
              isLiveMonitoring
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60 hover:bg-emerald-900/50'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {isLiveMonitoring ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>STREAM: LIVE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>STREAM: PAUSED</span>
              </>
            )}
          </button>

          <button
            onClick={handlePurgeCache}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Purge Edge Cache</span>
          </button>
        </div>
      </div>

      {/* 4 Core Resource Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CPU Utilization */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium text-slate-300">{t.cpuUtilization}</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-white">
              {serverMetrics.cpuUsagePercent}%
            </span>
            <span className="text-[11px] text-emerald-400 font-mono">16 vCPUs (AMD EPYC)</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                serverMetrics.cpuUsagePercent > 80
                  ? 'bg-rose-500'
                  : serverMetrics.cpuUsagePercent > 50
                  ? 'bg-amber-400'
                  : 'bg-cyan-500'
              }`}
              style={{ width: `${serverMetrics.cpuUsagePercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-2">
            <span>Load Avg: 0.34, 0.41, 0.38</span>
            <span>Temp: 39°C</span>
          </div>
        </div>

        {/* Memory Load */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium text-slate-300">{t.memoryLoad}</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-white">
              {(serverMetrics.memoryUsedMb / 1024).toFixed(1)} GB
            </span>
            <span className="text-[11px] text-slate-400 font-mono">/ {(serverMetrics.memoryTotalMb / 1024).toFixed(0)} GB DDR5</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-500"
              style={{ width: `${(serverMetrics.memoryUsedMb / serverMetrics.memoryTotalMb) * 100}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-2">
            <span>Buffers: 480 MB</span>
            <span>Cached: 2.4 GB</span>
          </div>
        </div>

        {/* NVMe Storage I/O */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium text-slate-300">{t.diskIo}</span>
            <HardDrive className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-white">
              {serverMetrics.diskUsedGb} GB
            </span>
            <span className="text-[11px] text-slate-400 font-mono">/ {serverMetrics.diskTotalGb} GB (27.8%)</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${(serverMetrics.diskUsedGb / serverMetrics.diskTotalGb) * 100}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-2">
            <span>Read: 4,800 IOPS</span>
            <span>Write: 3,200 IOPS</span>
          </div>
        </div>

        {/* Egress Bandwidth */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium text-slate-300">{t.bandwidthOut}</span>
            <Wifi className="w-4 h-4 text-sky-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-white">
              {serverMetrics.networkOutMbps} Mbps
            </span>
            <span className="text-[11px] text-emerald-400 font-mono">10 Gbps Port</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-sky-500 transition-all duration-500"
              style={{ width: `${Math.min(100, (serverMetrics.networkOutMbps / 1500) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-2">
            <span>Ingress: {serverMetrics.networkInMbps} Mbps</span>
            <span>Anycast: 312 PoPs</span>
          </div>
        </div>
      </div>

      {/* Real-time Edge Traffic & Latency Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800">
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 font-medium">{t.requestsPerSec}</span>
          <div className="flex items-center gap-2 mt-1">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-2xl font-bold font-mono tabular-nums text-white">
              {serverMetrics.requestsPerSec.toLocaleString()}
            </span>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono mt-0.5">+14% vs last hour</span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs text-slate-400 font-medium">{t.edgeLatency}</span>
          <div className="flex items-center gap-2 mt-1">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <span className="text-2xl font-bold font-mono tabular-nums text-white">
              {serverMetrics.p95LatencyMs} ms
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-0.5">p50: {serverMetrics.p50LatencyMs}ms · p99: {serverMetrics.p99LatencyMs}ms</span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs text-slate-400 font-medium">{t.cacheHitRatio}</span>
          <div className="flex items-center gap-2 mt-1">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-2xl font-bold font-mono tabular-nums text-white">
              {serverMetrics.edgeCacheHitRatio}%
            </span>
          </div>
          <span className="text-[11px] text-purple-400 font-mono mt-0.5">Brotli & WebP compression</span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs text-slate-400 font-medium">{t.uptimeTitle}</span>
          <div className="flex items-center gap-2 mt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-2xl font-bold font-mono tabular-nums text-white">
              {serverMetrics.uptimePercentage}%
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-0.5">0 incidents in last 90 days</span>
        </div>
      </div>

      {/* Two Column Grid: Live Request Stream & Global Geo Traffic */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Request Stream (2 cols) */}
        <div className="lg:col-span-2 rounded-xl bg-slate-900/40 border border-slate-800 p-4">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <h2 className="text-sm font-semibold text-white">{t.liveVisitors}</h2>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Auto-updating HTTP / HTTP3 streams
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800/80">
                  <th className="pb-2 font-medium">Time (UTC)</th>
                  <th className="pb-2 font-medium">Method</th>
                  <th className="pb-2 font-medium">Route / Endpoint</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Latency</th>
                  <th className="pb-2 font-medium">Origin Country</th>
                  <th className="pb-2 font-medium">Cache</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {liveRequests.map(r => (
                  <tr key={r.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2 text-slate-400 tabular-nums">{r.timestamp}</td>
                    <td className="py-2">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          r.method === 'GET'
                            ? 'bg-blue-950/60 text-blue-400 border border-blue-800/40'
                            : r.method === 'POST'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                            : 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                        }`}
                      >
                        {r.method}
                      </span>
                    </td>
                    <td className="py-2 text-slate-200 truncate max-w-[200px]" title={r.path}>
                      {r.path}
                    </td>
                    <td className="py-2">
                      <span
                        className={`tabular-nums font-semibold ${
                          r.status < 300
                            ? 'text-emerald-400'
                            : r.status < 400
                            ? 'text-cyan-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="py-2 text-slate-300 tabular-nums">{r.latencyMs}ms</td>
                    <td className="py-2 text-slate-400 flex items-center gap-1.5">
                      <span>{r.country}</span>
                    </td>
                    <td className="py-2">
                      {r.cached ? (
                        <span className="text-[10px] bg-purple-950/40 text-purple-300 px-1.5 py-0.5 rounded border border-purple-800/40">HIT</span>
                      ) : (
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">ORIGIN</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Geo Traffic Distribution (1 col) */}
        <div className="rounded-xl bg-slate-900/40 border border-slate-800 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-semibold text-white">{t.geoDistribution}</h2>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Top PoPs</span>
            </div>

            <div className="space-y-3.5">
              {geoTraffic.map(g => (
                <div key={g.code} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-200 font-medium truncate max-w-[170px]">{g.country}</span>
                    <span className="text-slate-400 font-mono tabular-nums">
                      {g.percentage}% ({g.latencyMs}ms)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${g.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Anycast Route Optimization</span>
              <span className="text-emerald-400 font-semibold">Active (BGP)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Launch Cards / Vercel Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quick Builder Launch */}
        <div 
          onClick={() => setActiveTab('builder')}
          className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 hover:border-cyan-500/50 cursor-pointer group transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-cyan-400 font-mono">VISUAL BUILDER</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
            Drag-and-Drop Website Studio
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Build and edit complete landing pages, pricing blocks, and customer galleries without writing code.
          </p>
        </div>

        {/* Quick Backup Launch */}
        <div 
          onClick={() => setActiveTab('backups')}
          className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 hover:border-blue-500/50 cursor-pointer group transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-blue-400 font-mono">DISASTER RECOVERY</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
            Automated Snapshots & 1-Click Rollback
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Verified hourly differential snapshots stored across encrypted multi-cloud cold storage.
          </p>
        </div>

        {/* Quick Security Launch */}
        <div 
          onClick={() => setActiveTab('security')}
          className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 hover:border-amber-500/50 cursor-pointer group transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-amber-400 font-mono">WAF & THREAT DEFENSE</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
            3,164 Threats Neutralized (24h)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            OWASP CRS 3.3.4, real-time Layer 7 DDoS scrubbing, and deep file integrity auditing.
          </p>
        </div>
      </div>
    </div>
  );
};

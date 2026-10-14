import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  Zap,
  TrendingUp,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Gauge,
  Layers,
  Sparkles
} from 'lucide-react';

export const AnalyticsManager: React.FC = () => {
  const { t, showToast, addAuditLog } = useApp();

  const [brotliEnabled, setBrotliEnabled] = useState(true);
  const [imageOptimization, setImageOptimization] = useState(true);
  const [http3Enabled, setHttp3Enabled] = useState(true);
  const [minification, setMinification] = useState(true);
  const [cacheTtl, setCacheTtl] = useState('86400');

  const handleSaveOptimization = () => {
    showToast('Edge optimization headers updated and deployed across CDN PoPs.');
    addAuditLog('Edge Optimization Rules Updated', 'deployment', 'cdn-optimizer');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Speed Insights & Web Vitals</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-User Monitoring (RUM) and automatic edge compiler optimizations to guarantee 99+ PageSpeed scores.
          </p>
        </div>

        <button
          onClick={handleSaveOptimization}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 shadow-sm transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Apply Edge Optimizations</span>
        </button>
      </div>

      {/* Core Web Vitals 4-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* LCP */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Largest Contentful Paint</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">GOOD</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-white mt-1">1.18 s</div>
          <p className="text-[11px] text-slate-400 mt-2">Target &le; 2.5s. 94% of visitors experience optimal load.</p>
        </div>

        {/* INP */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Interaction to Next Paint</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">GOOD</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">42 ms</div>
          <p className="text-[11px] text-slate-400 mt-2">Target &le; 200ms. Immediate UI feedback responsiveness.</p>
        </div>

        {/* CLS */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Cumulative Layout Shift</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">GOOD</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-white mt-1">0.012</div>
          <p className="text-[11px] text-slate-400 mt-2">Target &le; 0.1. Zero disruptive visual layout jumps.</p>
        </div>

        {/* TTFB */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Time to First Byte (TTFB)</span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800">ULTRA FAST</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-cyan-400 mt-1">64 ms</div>
          <p className="text-[11px] text-slate-400 mt-2">Anycast Edge response directly from visitor's nearest PoP.</p>
        </div>
      </div>

      {/* Edge Optimization Rules & Controls */}
      <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-4">
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Edge Performance Pipeline Settings</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Brotli 11 & HTTP/3 Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start justify-between">
            <div className="space-y-1 pr-3">
              <span className="font-bold text-white block">Brotli & Gzip Maximum Compression</span>
              <p className="text-slate-400 leading-normal">
                Compresses HTML, CSS, JavaScript, and JSON payloads by up to 82% over the wire.
              </p>
            </div>
            <input
              type="checkbox"
              checked={brotliEnabled}
              onChange={(e) => setBrotliEnabled(e.target.checked)}
              className="mt-1 rounded bg-slate-900 border-slate-700 text-cyan-500"
            />
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start justify-between">
            <div className="space-y-1 pr-3">
              <span className="font-bold text-white block">Next-Gen Image Transcoding (WebP / AVIF)</span>
              <p className="text-slate-400 leading-normal">
                Dynamically scales and converts PNG/JPEG to AVIF on the fly based on client Accept header.
              </p>
            </div>
            <input
              type="checkbox"
              checked={imageOptimization}
              onChange={(e) => setImageOptimization(e.target.checked)}
              className="mt-1 rounded bg-slate-900 border-slate-700 text-cyan-500"
            />
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start justify-between">
            <div className="space-y-1 pr-3">
              <span className="font-bold text-white block">HTTP/3 QUIC Protocol Acceleration</span>
              <p className="text-slate-400 leading-normal">
                Zero-RTT connection handshakes over UDP with multiplexed stream delivery without head-of-line blocking.
              </p>
            </div>
            <input
              type="checkbox"
              checked={http3Enabled}
              onChange={(e) => setHttp3Enabled(e.target.checked)}
              className="mt-1 rounded bg-slate-900 border-slate-700 text-cyan-500"
            />
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start justify-between">
            <div className="space-y-1 pr-3">
              <span className="font-bold text-white block">CSS & JS Minification & Tree-Shaking</span>
              <p className="text-slate-400 leading-normal">
                Strips unused code and whitespace on edge compilation before sending assets to browser.
              </p>
            </div>
            <input
              type="checkbox"
              checked={minification}
              onChange={(e) => setMinification(e.target.checked)}
              className="mt-1 rounded bg-slate-900 border-slate-700 text-cyan-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Default Static Edge Cache TTL:</span>
            <select
              value={cacheTtl}
              onChange={(e) => setCacheTtl(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-white font-mono"
            >
              <option value="3600">1 Hour (s-maxage=3600)</option>
              <option value="86400">24 Hours (Recommended)</option>
              <option value="604800">7 Days (Immutable assets)</option>
            </select>
          </div>

          <button
            onClick={() => showToast('Speed audit run: Overall Score is 98/100!')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
          >
            Run Lighthouse Audit
          </button>
        </div>
      </div>
    </div>
  );
};

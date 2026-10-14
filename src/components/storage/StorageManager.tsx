import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Database, HardDrive, KeyRound, Copy, Check, ExternalLink, Plus, RefreshCw } from 'lucide-react';
import { StorageBucketItem } from '../../types';

export const StorageManager: React.FC = () => {
  const { storageBuckets, showToast, addAuditLog } = useApp();
  const [selectedStorage, setSelectedStorage] = useState<StorageBucketItem>(storageBuckets[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyConnection = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast('Connection string copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Storage & Databases</span>
            <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded">
              SERVERLESS
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Global KV Redis cache, Serverless Postgres, and S3-compatible Edge Blob storage.
          </p>
        </div>

        <button
          onClick={() => showToast('New Database Store provisioned in cluster.')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Store</span>
        </button>
      </div>

      {/* Storage Catalog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {storageBuckets.map(bucket => {
          const isSelected = bucket.id === selectedStorage.id;
          const usedMb = (bucket.usedBytes / (1024 * 1024)).toFixed(1);
          const totalMb = (bucket.totalLimitBytes / (1024 * 1024)).toFixed(0);
          const percent = ((bucket.usedBytes / bucket.totalLimitBytes) * 100).toFixed(1);

          return (
            <div
              key={bucket.id}
              onClick={() => setSelectedStorage(bucket)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800">
                  {bucket.type}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{percent}% used</span>
              </div>

              <h3 className="text-sm font-bold text-white truncate">{bucket.name}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{bucket.region}</p>

              <div className="w-full bg-slate-950 h-1.5 rounded-full mt-3 overflow-hidden border border-slate-800">
                <div
                  className="bg-cyan-500 h-full rounded-full transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-2">
                <span>{usedMb} MB</span>
                <span>{totalMb} MB</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Storage Detail Inspector */}
      {selectedStorage && (
        <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">{selectedStorage.name}</h3>
                <span className="text-xs text-slate-400 font-mono">({selectedStorage.type})</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Region: {selectedStorage.region}</p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-emerald-400">Reads: {selectedStorage.reads24h.toLocaleString()}</span>
              <span>·</span>
              <span className="text-purple-400">Writes: {selectedStorage.writes24h.toLocaleString()}</span>
            </div>
          </div>

          {/* Connection String Copy */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium">Connection URL / Secret String</label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-slate-200">
              <span className="flex-1 truncate select-all">{selectedStorage.connectionUrl}</span>
              <button
                onClick={() => handleCopyConnection(selectedStorage.connectionUrl, selectedStorage.id)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1 transition-colors shrink-0"
              >
                {copiedId === selectedStorage.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === selectedStorage.id ? 'Copied' : 'Copy URI'}</span>
              </button>
            </div>
          </div>

          {/* Sample Usage Snippet */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium">Integration Code Snippet</label>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-slate-300 overflow-x-auto">
              <div className="text-slate-400">// Automatically injected into edge functions & serverless routes</div>
              <div className="text-cyan-400">import <span className="text-white">&#123; createClient &#125;</span> from '@aetherhost/storage';</div>
              <div className="text-white">const client = createClient(process.env.DATABASE_URL);</div>
              <div className="text-emerald-400">const result = await client.get('session:user_123');</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

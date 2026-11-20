import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
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
  UploadCloud,
  Globe,
  FileArchive
} from 'lucide-react';

const AETHER_API = 'https://' + 'api.' + 'credibleartisans.com' + '/public/aetherhost';

interface LiveEdgeSite {
  id: string;
  domain: string;
  projectName: string;
  publishedAt: string;
  liveUrl: string;
}

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
  const [bundleDomain, setBundleDomain] = useState('digitalremoteservices.aetherhost.app');
  const [bundleProject, setBundleProject] = useState('Digital Remote Services');
  const [bundleFile, setBundleFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [liveSites, setLiveSites] = useState<LiveEdgeSite[]>([]);

  const loadLiveSites = () => {
    fetch(`${AETHER_API}/published`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && Array.isArray(d.sites)) setLiveSites(d.sites);
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadLiveSites();
  }, []);

  const handleBundleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bundleDomain.trim()) {
      showToast('Enter a target domain (e.g. mysite.aetherhost.app)');
      return;
    }
    if (!bundleFile) {
      showToast('Select an .html or .zip bundle file first');
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('domain', bundleDomain.trim().toLowerCase());
      fd.append('projectName', bundleProject.trim() || bundleDomain.trim());
      fd.append('bundle', bundleFile);

      const res = await fetch(`${AETHER_API}/upload-bundle`, {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        showToast(data.error || 'Bundle deployment failed');
      } else {
        showToast(`Deployed live to ${data.domain}!`);
        setBundleFile(null);
        loadLiveSites();
      }
    } catch {
      showToast('Network error connecting to AetherHost Edge node');
    } finally {
      setUploading(false);
    }
  };

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{t.navDeployments}</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Zero-configuration Edge deployments with direct HTML/ZIP bundle uploads and instant rollbacks.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs">
            <GitBranch className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
            <select value={branchInput} onChange={(e) => setBranchInput(e.target.value)} className="bg-transparent text-white font-mono focus:outline-none">
              <option value="main" className="bg-slate-900">main (Production)</option>
              <option value="staging" className="bg-slate-900">staging (Preview)</option>
            </select>
          </div>
          <button onClick={() => triggerDeployment(branchInput)} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500">
            <Plus className="w-3.5 h-3.5" /><span>Deploy Branch</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleBundleUpload} className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-cyan-500/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400"><UploadCloud className="w-5 h-5" /></div>
            <div>
              <h2 className="text-sm font-bold text-white">Deploy Static Site / ZIP Bundle to Edge</h2>
              <p className="text-xs text-slate-400">Upload a built .zip folder or single .html file to host live on your self-hosted Edge node</p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">HP EDGE NODE ONLINE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">TARGET DOMAIN (.aetherhost.app)</label>
            <input type="text" value={bundleDomain} onChange={(e) => setBundleDomain(e.target.value)} placeholder="myapp.aetherhost.app" className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">PROJECT LABEL</label>
            <input type="text" value={bundleProject} onChange={(e) => setBundleProject(e.target.value)} placeholder="My Production Site" className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">SITE BUNDLE (.ZIP OR .HTML)</label>
            <label className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-950 border border-dashed border-slate-700 hover:border-cyan-500/60 text-xs text-slate-300 cursor-pointer">
              <span className="truncate flex items-center gap-1.5"><FileArchive className="w-3.5 h-3.5 text-cyan-400 shrink-0" /><span>{bundleFile ? bundleFile.name : 'Choose .zip or .html...'}</span></span>
              <input type="file" accept=".zip,.html,.htm" onChange={(e) => setBundleFile(e.target.files?.[0] || null)} className="hidden" />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-slate-400">Supports multi-page HTML/CSS/JS ZIP archives &amp; Vite <code className="text-cyan-300">dist.zip</code> builds</span>
          <button type="submit" disabled={uploading} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 transition cursor-pointer">
            <UploadCloud className="w-4 h-4" /><span>{uploading ? 'Deploying to Edge...' : 'Upload & Deploy to Edge'}</span>
          </button>
        </div>
        {liveSites.length > 0 && (
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Live Edge-Hosted Bundles ({liveSites.length})</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {liveSites.map((site) => (
                <div key={site.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/90 border border-slate-800">
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" /><span>{site.domain}</span></div>
                    <div className="text-[10px] text-slate-400 truncate">{site.projectName}</div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <button type="button" onClick={() => handleCopyUrl(site.liveUrl)} className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700" title="Copy Live URL"><Copy className="w-3.5 h-3.5" /></button>
                    <a href={site.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold"><span>Open</span><ExternalLink className="w-3 h-3" /></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>

      <div className="flex items-center gap-1 p-1 bg-slate-900/60 rounded-lg border border-slate-800/80 w-fit">
        {(['all', 'production', 'preview'] as const).map((env) => (
          <button key={env} onClick={() => setEnvFilter(env)} className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${envFilter === env ? 'bg-slate-800 text-cyan-300 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>
            {env === 'all' ? `All (${deployments.length})` : env}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredDeployments.map((dep) => {
          const isProd = dep.environment === 'production';
          return (
            <div key={dep.id} className={`p-4 rounded-xl border transition-all hover:border-slate-700 bg-slate-900/40 ${isProd ? 'border-cyan-900/40' : 'border-slate-800'}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${isProd ? 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60' : 'bg-purple-950/80 text-purple-300 border-purple-800/60'}`}>{dep.environment}</span>
                    <span className="text-sm font-bold text-white truncate max-w-md">{dep.commitMessage}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1 text-slate-300"><GitBranch className="w-3.5 h-3.5 text-cyan-400" /><span>{dep.branch}</span></span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-slate-300"><GitCommit className="w-3.5 h-3.5 text-purple-400" /><span>{dep.commitHash}</span></span>
                    <span>·</span><span>{dep.createdAt}</span>
                    {dep.durationSeconds > 0 && <><span>·</span><span className="flex items-center gap-1"><Clock className="w-3 h-3" /><span>{dep.durationSeconds}s</span></span></>}
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <a href={dep.url} target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:underline font-mono flex items-center gap-1 truncate max-w-lg"><span>{dep.url}</span><ExternalLink className="w-3 h-3 shrink-0" /></a>
                    <button onClick={() => handleCopyUrl(dep.url)} className="text-slate-400 hover:text-white p-0.5"><Copy className="w-3 h-3" /></button>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono font-semibold mr-2">
                    {dep.status === 'building' ? <><RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" /><span className="text-amber-400">Building...</span></> : dep.status === 'failed' ? <><AlertCircle className="w-4 h-4 text-rose-400" /><span className="text-rose-400">Failed</span></> : <><CheckCircle2 className="w-4 h-4" /><span>Ready</span></>}
                  </span>
                  <button onClick={() => setSelectedDeploymentForLogs(dep)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-800 border border-slate-700"><Terminal className="w-3.5 h-3.5 text-cyan-400" /><span>Logs</span></button>
                  {isProd && <button onClick={() => rollbackDeployment(dep.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-slate-300 bg-slate-900 border border-slate-800"><RotateCcw className="w-3.5 h-3.5" /><span>Rollback</span></button>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedDeploymentForLogs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
              <span className="text-xs font-bold text-white font-mono">Build Output: {selectedDeploymentForLogs.commitHash}</span>
              <button onClick={() => setSelectedDeploymentForLogs(null)} className="text-slate-400 hover:text-white text-xs font-mono">CLOSE</button>
            </div>
            <div className="p-4 overflow-y-auto space-y-1 font-mono text-xs text-slate-300 bg-slate-950 flex-1">
              <div className="text-slate-400">=== AetherHost Edge Cloud Builder v4.2 ({activeProject.region}) ===</div>
              {selectedDeploymentForLogs.buildLogs.map((line, idx) => <div key={idx}>{line}</div>)}
              <div className="text-emerald-400 font-bold pt-2">✔ Build successful. Edge function routes ready.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

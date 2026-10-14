import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Globe,
  Plus,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  Search,
  Lock,
  ExternalLink,
  Zap,
  ArrowRight,
  RefreshCw,
  SlidersHorizontal,
  Server
} from 'lucide-react';
import { DnsRecordType } from '../../types';

export const DomainManager: React.FC = () => {
  const {
    t,
    domains,
    addDnsRecord,
    deleteDnsRecord,
    toggleProxyDnsRecord,
    simulateDomainPurchase,
    showToast,
    addAuditLog,
    activeRole
  } = useApp();

  const [selectedDomainId, setSelectedDomainId] = useState<string>(domains[0]?.id || '');
  const activeDomain = domains.find(d => d.id === selectedDomainId) || domains[0];

  // Add Record Modal / Form state
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false);
  const [recType, setRecType] = useState<DnsRecordType>('A');
  const [recName, setRecName] = useState('');
  const [recValue, setRecValue] = useState('');
  const [recTtl, setRecTtl] = useState(300);
  const [recProxied, setRecProxied] = useState(true);

  // Domain search query state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedDomain, setSearchedDomain] = useState<{ name: string; available: boolean; price: string } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // SSL and HTTPS toggles
  const [forceHttps, setForceHttps] = useState(true);
  const [hstsEnabled, setHstsEnabled] = useState(true);
  const [tlsVersion, setTlsVersion] = useState('1.3');

  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recName.trim() || !recValue.trim()) {
      showToast('Please provide both host name and target value.');
      return;
    }

    addDnsRecord(activeDomain.id, {
      type: recType,
      name: recName.trim(),
      value: recValue.trim(),
      ttl: Number(recTtl),
      proxied: recProxied
    });

    setIsAddRecordOpen(false);
    setRecName('');
    setRecValue('');
  };

  const handleSearchDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      let queryClean = searchQuery.toLowerCase().trim();
      if (!queryClean.includes('.')) {
        queryClean += '.com';
      }
      setSearchedDomain({
        name: queryClean,
        available: !domains.some(d => d.name === queryClean),
        price: '$12.99 / year'
      });
    }, 600);
  };

  const handleRenewCertificate = () => {
    showToast(`Contacting Let's Encrypt ACME server to test wildcard challenge...`);
    setTimeout(() => {
      showToast(`SSL/TLS certificate renewed and distributed to 312 Edge nodes.`);
      addAuditLog(`SSL Certificate Manual Renew (${activeDomain.name})`, 'security', activeDomain.name);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>{t.domainsTitle}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.domainsSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddRecordOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addRecord}</span>
          </button>
        </div>
      </div>

      {/* Domain Search & Register Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            {t.searchDomain}
          </h3>
        </div>
        <form onSubmit={handleSearchDomain} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search available domains (e.g. acme-cloud.io, mybrand.com)..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg border border-slate-700 transition-colors shrink-0"
          >
            {isSearching ? 'Checking...' : 'Check Availability'}
          </button>
        </form>

        {searchedDomain && (
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-white">{searchedDomain.name}</span>
              {searchedDomain.available ? (
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                  AVAILABLE · {searchedDomain.price}
                </span>
              ) : (
                <span className="text-[10px] bg-rose-950 text-rose-400 border border-rose-800 px-2 py-0.5 rounded font-mono">
                  ALREADY REGISTERED
                </span>
              )}
            </div>

            {searchedDomain.available && (
              <button
                onClick={() => {
                  simulateDomainPurchase(searchedDomain.name);
                  setSearchedDomain(null);
                  setSearchQuery('');
                }}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded shadow-sm"
              >
                Register & Bind to Cluster
              </button>
            )}
          </div>
        )}
      </div>

      {/* Domain Selector & SSL Certificate Status Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Domain List Tabs */}
        <div className="rounded-xl bg-slate-900/40 border border-slate-800 p-3 space-y-2">
          <span className="text-[11px] font-mono font-semibold uppercase text-slate-400 px-2">
            Active Domains ({domains.length})
          </span>
          {domains.map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedDomainId(d.id)}
              className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                d.id === activeDomain?.id
                  ? 'bg-slate-800 border-cyan-500/80 text-white shadow-sm'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white text-sm">{d.name}</span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  VALID
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <span>{d.records.length} DNS records</span>
                <span>·</span>
                <span className="text-cyan-400 font-mono">Anycast BGP</span>
              </div>
            </button>
          ))}
        </div>

        {/* SSL / Security Status */}
        <div className="lg:col-span-2 rounded-xl bg-slate-900/40 border border-slate-800 p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">{t.sslCertStatus}</h3>
            </div>
            <button
              onClick={handleRenewCertificate}
              className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-mono"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Force Renew Test</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
              <span className="text-slate-400 block text-[10px] font-mono uppercase">Certificate Authority</span>
              <span className="font-semibold text-white mt-1 block">{activeDomain?.sslIssuer}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
              <span className="text-slate-400 block text-[10px] font-mono uppercase">Expiration Date</span>
              <span className="font-semibold text-emerald-400 font-mono mt-1 block">{activeDomain?.sslExpiresAt} (Auto-renews in 60d)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
              <span className="text-slate-400 block text-[10px] font-mono uppercase">Cipher Suite</span>
              <span className="font-semibold text-white font-mono mt-1 block">TLS_AES_128_GCM_SHA256</span>
            </div>
          </div>

          {/* Quick SSL security toggles */}
          <div className="flex flex-wrap items-center gap-6 pt-1 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={forceHttps}
                onChange={(e) => setForceHttps(e.target.checked)}
                className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
              />
              <span className="text-slate-300">Force HTTPS 301 Redirect</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hstsEnabled}
                onChange={(e) => setHstsEnabled(e.target.checked)}
                className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
              />
              <span className="text-slate-300">Strict-Transport-Security (HSTS 1 Year)</span>
            </label>

            <div className="flex items-center gap-1.5 ml-auto text-slate-400 font-mono text-[11px]">
              <span>Min TLS:</span>
              <select
                value={tlsVersion}
                onChange={(e) => setTlsVersion(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded px-2 py-0.5 text-white"
              >
                <option value="1.2">TLS 1.2</option>
                <option value="1.3">TLS 1.3 (Recommended)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* DNS Records Management Table */}
      <div className="rounded-xl bg-slate-900/40 border border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Authoritative DNS Zone:</span>
              <span className="font-mono text-cyan-400">{activeDomain?.name}</span>
            </h3>
            <span className="text-xs text-slate-400">
              Nameservers: {activeDomain?.nameservers.join(', ')}
            </span>
          </div>

          <button
            onClick={() => setIsAddRecordOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add Record</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800/80">
                <th className="pb-2.5 font-medium">Type</th>
                <th className="pb-2.5 font-medium">Name (Host)</th>
                <th className="pb-2.5 font-medium">Target / Content</th>
                <th className="pb-2.5 font-medium">TTL</th>
                <th className="pb-2.5 font-medium">Edge Proxy</th>
                <th className="pb-2.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {activeDomain?.records.map(rec => (
                <tr key={rec.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-800 text-cyan-300 border border-slate-700">
                      {rec.type}
                    </span>
                  </td>
                  <td className="py-2.5 font-bold text-white">{rec.name}</td>
                  <td className="py-2.5 text-slate-300 truncate max-w-[280px]" title={rec.value}>
                    {rec.value}
                  </td>
                  <td className="py-2.5 text-slate-400">{rec.ttl}s (Auto)</td>
                  <td className="py-2.5">
                    <button
                      onClick={() => toggleProxyDnsRecord(activeDomain.id, rec.id)}
                      className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold border transition-colors ${
                        rec.proxied
                          ? 'bg-amber-950/40 text-amber-300 border-amber-800/50 hover:bg-amber-900/50'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-300'
                      }`}
                    >
                      <Zap className={`w-3 h-3 ${rec.proxied ? 'text-amber-400' : 'text-slate-500'}`} />
                      <span>{rec.proxied ? 'Proxied (Edge CDN)' : 'DNS Only'}</span>
                    </button>
                  </td>
                  <td className="py-2.5 text-right">
                    <button
                      onClick={() => deleteDnsRecord(activeDomain.id, rec.id)}
                      className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add DNS Record Modal */}
      {isAddRecordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Add DNS Record to {activeDomain.name}</h3>
              <button
                onClick={() => setIsAddRecordOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ESC
              </button>
            </div>

            <form onSubmit={handleCreateRecord} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Record Type</label>
                <select
                  value={recType}
                  onChange={(e) => setRecType(e.target.value as DnsRecordType)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                >
                  <option value="A">A (Address IPv4)</option>
                  <option value="AAAA">AAAA (Address IPv6)</option>
                  <option value="CNAME">CNAME (Canonical Alias)</option>
                  <option value="MX">MX (Mail Exchange)</option>
                  <option value="TXT">TXT (Text / SPF / DKIM)</option>
                  <option value="SRV">SRV (Service Record)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Host Name (@ for root, www, api, blog)</label>
                <input
                  type="text"
                  value={recName}
                  onChange={(e) => setRecName(e.target.value)}
                  placeholder="e.g. @"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Target / IPv4 / Value</label>
                <input
                  type="text"
                  value={recValue}
                  onChange={(e) => setRecValue(e.target.value)}
                  placeholder="e.g. 76.76.21.21 or cname.aetherhost.app"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={recProxied}
                    onChange={(e) => setRecProxied(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-700 text-cyan-500"
                  />
                  <span className="text-slate-300">Enable Edge Proxy & DDoS Protection</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddRecordOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-sm"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

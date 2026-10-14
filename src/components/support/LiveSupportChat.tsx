import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  UserCheck,
  CheckCircle2,
  Clock,
  Zap,
  ShieldCheck,
  HardDrive,
  Headphones,
  X,
  Minimize2,
  Activity,
  AlertCircle
} from 'lucide-react';

export const LiveSupportChat: React.FC<{ isEmbeddedPage?: boolean }> = ({ isEmbeddedPage = false }) => {
  const {
    t,
    isSupportChatOpen,
    setIsSupportChatOpen,
    chatMessages,
    sendChatMessage,
    runChatDiagnostics,
    escalateToEngineer,
    supportTickets,
    serverMetrics
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendChatMessage(inputMessage);
    setInputMessage('');
  };

  const quickPrompts = [
    { label: 'Run Instant Diagnostics', action: runChatDiagnostics },
    { label: 'Analyze CPU & Latency', action: () => sendChatMessage('Can you analyze my cluster CPU and edge latency?') },
    { label: 'Check Backup Health', action: () => sendChatMessage('Are all automated backup snapshots healthy and verified?') },
    { label: 'Speak to Senior Engineer', action: escalateToEngineer }
  ];

  const chatContent = (
    <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>{t.supportTitle}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </h3>
            <p className="text-[10px] text-purple-400 font-mono">
              {t.slaResponseGuarantee}
            </p>
          </div>
        </div>

        {!isEmbeddedPage && (
          <button
            onClick={() => setIsSupportChatOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* SLA & Quick Prompts Bar */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-3 py-2 flex items-center gap-2 overflow-x-auto select-none">
        <span className="text-[10px] text-slate-400 font-mono uppercase shrink-0">Quick Run:</span>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={qp.action}
            className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/80 shrink-0 transition-colors"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-slate-950">
        {chatMessages.map(msg => {
          const isUser = msg.sender === 'user';
          const isAgent = msg.sender === 'agent';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400">
                {!isUser && (
                  <span className="font-bold text-slate-300 flex items-center gap-1">
                    {isAgent ? (
                      <UserCheck className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Bot className="w-3 h-3 text-cyan-400" />
                    )}
                    {msg.authorName}
                  </span>
                )}
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                  isUser
                    ? 'bg-cyan-600 text-white rounded-br-none'
                    : isAgent
                    ? 'bg-slate-900 border border-emerald-800/80 text-slate-200 rounded-bl-none shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>

                {/* Render embedded automated diagnostic report */}
                {msg.isDiagnostic && msg.diagnosticData && (
                  <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-[11px]">
                    <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-slate-800 pb-1.5">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        SYSTEM HEALTH: {msg.diagnosticData.serverStatus}
                      </span>
                      <span>SLA: 99.998%</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-slate-300">
                      <div>
                        <span className="text-slate-500 block text-[10px]">CPU Utilization:</span>
                        <span>{msg.diagnosticData.cpu}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Active Memory:</span>
                        <span>{msg.diagnosticData.memory}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Anycast DNS:</span>
                        <span>{msg.diagnosticData.dnsStatus}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">SSL/TLS Cipher:</span>
                        <span>{msg.diagnosticData.sslStatus}</span>
                      </div>
                    </div>

                    <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px] text-cyan-400">
                      <span>WAF Layer 7 Protected</span>
                      <span>{msg.diagnosticData.threatsMitigated} Threats Blocked</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={t.typeMessagePlaceholder}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
          title="Send Message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );

  // If viewed on dedicated support hub view
  if (isEmbeddedPage) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>{t.supportTitle}</span>
              <span className="text-[10px] font-mono bg-purple-950 text-purple-400 border border-purple-800/60 px-2 py-0.5 rounded">
                ENTERPRISE SLA
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {t.supportSubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Chat Console (8 cols) */}
          <div className="lg:col-span-8 h-[640px]">
            {chatContent}
          </div>

          {/* Right Column: Support Tickets & SLA guarantee (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* SLA Commitment Card */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-purple-950/30 border border-purple-900/40 space-y-3">
              <div className="flex items-center gap-2 text-purple-300">
                <Clock className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase font-mono">Guaranteed Response SLA</h3>
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                &lt; 120 Seconds
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct access to Tier-3 Site Reliability Engineers with cluster root diagnostics and automated rollback authority.
              </p>
            </div>

            {/* Support Tickets */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-xs font-bold text-white font-mono uppercase">Open Escalation Tickets</h3>
                <span className="text-[10px] text-emerald-400 font-mono">24/7 ACTIVE</span>
              </div>

              <div className="space-y-2">
                {supportTickets.map(tkt => (
                  <div key={tkt.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white truncate max-w-[180px]">{tkt.subject}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {tkt.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Assigned: <span className="text-slate-200">{tkt.assignedEngineer}</span>
                    </div>
                    <div className="text-[10px] text-purple-400 font-mono">
                      Target SLA: &le; {tkt.slaResponseTimeMinutes} min response
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Floating Chat Widget
  if (!isSupportChatOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 h-[540px] max-w-[calc(100vw-2rem)] animate-in slide-in-from-bottom-5 duration-200">
      {chatContent}
    </div>
  );
};

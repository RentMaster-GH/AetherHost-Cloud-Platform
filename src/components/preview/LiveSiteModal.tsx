import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Tablet,
  Monitor,
  HardDrive,
  Globe,
  Quote,
  Send,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const LiveSiteModal: React.FC = () => {
  const { isPreviewModalOpen, setIsPreviewModalOpen, builderPage, showToast, initiatePaystackPayment } = useApp();
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  if (!isPreviewModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-6xl h-[92vh] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Browser Top Navigation Frame */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          </div>

          {/* Browser Address Bar */}
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800/80 rounded-lg px-3 py-1 text-xs font-mono text-slate-300 max-w-md w-full mx-4 truncate">
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-emerald-400 select-none">https://</span>
            <span className="text-white select-all">acme-store.aetherhost.app</span>
            <span className="text-slate-400 ml-auto text-[10px] bg-slate-900 px-1.5 py-0.2 rounded border border-slate-800 shrink-0">
              TLS 1.3
            </span>
          </div>

          {/* Device Controls & Close */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setDevice('desktop')}
                className={`p-1.5 rounded ${device === 'desktop' ? 'bg-slate-800 text-cyan-300' : 'text-slate-400'}`}
                title="Desktop"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDevice('tablet')}
                className={`p-1.5 rounded ${device === 'tablet' ? 'bg-slate-800 text-cyan-300' : 'text-slate-400'}`}
                title="Tablet"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`p-1.5 rounded ${device === 'mobile' ? 'bg-slate-800 text-cyan-300' : 'text-slate-400'}`}
                title="Mobile"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => setIsPreviewModalOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport Canvas Frame */}
        <div className="flex-1 overflow-y-auto bg-slate-950 flex justify-center p-2 sm:p-4">
          <div
            className={`w-full transition-all duration-300 rounded-xl overflow-hidden shadow-2xl ${
              device === 'tablet'
                ? 'max-w-[768px]'
                : device === 'mobile'
                ? 'max-w-[375px]'
                : 'max-w-full'
            }`}
          >
            {/* Rendered Live Website compiled from builder */}
            <div className="space-y-0 text-slate-100">
              {builderPage.blocks.map(block => (
                <div
                  key={block.id}
                  style={{ backgroundColor: block.content.backgroundColor || '#030712' }}
                  className="p-6 sm:p-10 transition-colors"
                >
                  {/* HEADER */}
                  {block.type === 'header' && (
                    <header className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                      <span className="text-xl font-bold tracking-tight text-white">
                        {block.content.headline}
                      </span>
                      <nav className="hidden md:flex items-center gap-6 text-xs text-slate-300 font-medium">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                        <a href="#reviews" className="hover:text-white transition-colors">Testimonials</a>
                      </nav>
                      {block.content.primaryButtonText && (
                        <button
                          onClick={() => showToast('Action triggered from live site: ' + block.content.primaryButtonText)}
                          className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
                        >
                          {block.content.primaryButtonText}
                        </button>
                      )}
                    </header>
                  )}

                  {/* HERO */}
                  {block.type === 'hero' && (
                    <div className="text-center py-12 space-y-4 max-w-3xl mx-auto">
                      {block.content.badge && (
                        <span className="inline-block text-xs font-mono font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/80 px-3 py-1 rounded-full">
                          {block.content.badge}
                        </span>
                      )}
                      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                        {block.content.headline}
                      </h1>
                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
                        {block.content.subheadline}
                      </p>
                      <div className="flex items-center justify-center gap-3 pt-3">
                        {block.content.primaryButtonText && (
                          <button
                            onClick={() => showToast('Clicked ' + block.content.primaryButtonText)}
                            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all hover:scale-105"
                          >
                            {block.content.primaryButtonText}
                          </button>
                        )}
                        {block.content.secondaryButtonText && (
                          <button
                            onClick={() => showToast('Clicked ' + block.content.secondaryButtonText)}
                            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 font-semibold text-sm border border-slate-800 transition-colors"
                          >
                            {block.content.secondaryButtonText}
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* FEATURES */}
                  {block.type === 'features' && (
                    <div className="space-y-8 py-6" id="features">
                      <div className="text-center space-y-2 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-white">{block.content.headline}</h2>
                        <p className="text-xs sm:text-sm text-slate-400">{block.content.subheadline}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {block.content.items?.map((item, i) => (
                          <div key={item.id || i} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center">
                              {i === 0 ? <HardDrive className="w-5 h-5" /> : i === 1 ? <Globe className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                            </div>
                            <h3 className="text-sm font-bold text-white">{item.title}</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PRICING */}
                  {block.type === 'pricing' && (
                    <div className="space-y-8 py-6" id="pricing">
                      <div className="text-center space-y-2 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-white">{block.content.headline}</h2>
                        <p className="text-xs sm:text-sm text-slate-400">{block.content.subheadline}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {block.content.items?.map((tier, i) => (
                          <div
                            key={tier.id || i}
                            className={`p-6 rounded-2xl border flex flex-col justify-between ${
                              tier.featured
                                ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-500/10'
                                : 'bg-slate-950/60 border-slate-800'
                            }`}
                          >
                            <div>
                              {tier.featured && (
                                <span className="text-[10px] font-mono font-bold bg-cyan-500 text-slate-950 px-2 py-0.5 rounded-full inline-block mb-3">
                                  POPULAR CHOICE
                                </span>
                              )}
                              <h3 className="text-base font-bold text-white">{tier.title}</h3>
                              <div className="flex items-baseline gap-1 my-3">
                                <span className="text-3xl font-extrabold font-mono text-white">{tier.price}</span>
                                <span className="text-xs text-slate-400 font-mono">{tier.period}</span>
                              </div>
                              <p className="text-xs text-slate-400 mb-6">{tier.description}</p>
                            </div>
                            <button
                              onClick={() => {
                                const priceStr = tier.price || '';
                                const numericAmount = priceStr.includes('20') ? 20 : priceStr.includes('180') ? 180 : 0;
                                if (numericAmount > 0) {
                                  initiatePaystackPayment(numericAmount, `${tier.title} Subscription`);
                                } else {
                                  showToast('Starter plan active! No payment required.');
                                }
                              }}
                              className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                tier.featured
                                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                              }`}
                            >
                              <span>Pay with Paystack · {tier.title}</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TESTIMONIALS */}
                  {block.type === 'testimonials' && (
                    <div className="space-y-8 py-6" id="reviews">
                      <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold text-white">{block.content.headline}</h2>
                        <p className="text-xs sm:text-sm text-slate-400">{block.content.subheadline}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {block.content.items?.map((t, idx) => (
                          <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                            <Quote className="w-6 h-6 text-cyan-400/80" />
                            <p className="text-sm text-slate-300 italic leading-relaxed">"{t.description}"</p>
                            <div className="pt-2 border-t border-slate-800">
                              <div className="text-xs font-bold text-white">{t.author}</div>
                              <div className="text-[11px] text-slate-400">{t.role}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  {block.type === 'cta' && (
                    <div className="text-center space-y-4 py-10 px-6 rounded-3xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-800/40 max-w-3xl mx-auto">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{block.content.headline}</h2>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                        {block.content.subheadline}
                      </p>
                      {block.content.primaryButtonText && (
                        <button
                          onClick={() => showToast('Action triggered: ' + block.content.primaryButtonText)}
                          className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/20"
                        >
                          {block.content.primaryButtonText}
                        </button>
                      )}
                    </div>
                  )}

                  {/* FOOTER */}
                  {block.type === 'footer' && (
                    <footer className="text-center text-xs text-slate-400 py-6 border-t border-slate-800/80">
                      <div className="font-semibold text-slate-200">{block.content.headline}</div>
                      <div className="text-[11px] text-slate-400 mt-1">{block.content.subheadline}</div>
                    </footer>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

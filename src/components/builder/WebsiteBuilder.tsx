import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Monitor,
  Tablet,
  Smartphone,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Eye,
  Rocket,
  Check,
  Palette,
  AlignLeft,
  AlignCenter,
  Layers,
  HelpCircle,
  HardDrive,
  Globe,
  ShieldCheck,
  Send,
  Star,
  Quote
} from 'lucide-react';
import { BlockType, BuilderBlock } from '../../types';

export const WebsiteBuilder: React.FC = () => {
  const {
    t,
    builderPage,
    addBlockToBuilder,
    updateBlockContent,
    removeBlock,
    moveBlock,
    loadBuilderTemplate,
    publishBuilderSite,
    setIsPreviewModalOpen,
    builderDeviceMode,
    setBuilderDeviceMode,
    showToast
  } = useApp();

  const [selectedBlockId, setSelectedBlockId] = useState<string>(builderPage.blocks[1]?.id || builderPage.blocks[0]?.id || '');
  const selectedBlock = builderPage.blocks.find(b => b.id === selectedBlockId);

  const blockTemplates: { type: BlockType; label: string; icon: string }[] = [
    { type: 'hero', label: 'Hero Header', icon: 'Sparkles' },
    { type: 'features', label: 'Feature Cards', icon: 'Layers' },
    { type: 'pricing', label: 'Pricing Tables', icon: 'Tag' },
    { type: 'testimonials', label: 'Client Reviews', icon: 'Quote' },
    { type: 'contact', label: 'Contact Form', icon: 'Send' },
    { type: 'faq', label: 'FAQ Accordion', icon: 'HelpCircle' },
    { type: 'cta', label: 'Call-to-Action', icon: 'Rocket' }
  ];

  return (
    <div className="space-y-4">
      {/* Builder Top Bar: Title, Device Switcher, Templates, Publish */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <span>{t.builderTitle}</span>
            <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded">
              WYSIWYG
            </span>
          </h1>
          <p className="text-xs text-slate-400">
            {t.builderSubtitle}
          </p>
        </div>

        {/* Center: Device Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 self-center">
          <button
            onClick={() => setBuilderDeviceMode('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              builderDeviceMode === 'desktop'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>{t.deviceDesktop}</span>
          </button>
          <button
            onClick={() => setBuilderDeviceMode('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              builderDeviceMode === 'tablet'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>{t.deviceTablet}</span>
          </button>
          <button
            onClick={() => setBuilderDeviceMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              builderDeviceMode === 'mobile'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{t.deviceMobile}</span>
          </button>
        </div>

        {/* Right: Template Selector & Actions */}
        <div className="flex items-center gap-2">
          {/* Template select */}
          <select
            onChange={(e) => loadBuilderTemplate(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500"
            defaultValue=""
          >
            <option value="" disabled>{t.loadTemplate}...</option>
            <option value="SaaS Startup">SaaS Startup Template</option>
            <option value="Portfolio & Agency">Portfolio & Agency Template</option>
          </select>

          {/* Live Preview Modal */}
          <button
            onClick={() => setIsPreviewModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.previewLive}</span>
          </button>

          {/* Publish to Edge button */}
          <button
            onClick={publishBuilderSite}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>{t.publishSite}</span>
          </button>
        </div>
      </div>

      {/* 3-Panel Builder Workspace: Left (Blocks), Center (Canvas), Right (Block Inspector) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Block Catalog (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
              {t.addBlock}
            </h3>
            <div className="space-y-1.5">
              {blockTemplates.map(bt => (
                <button
                  key={bt.type}
                  onClick={() => addBlockToBuilder(bt.type)}
                  className="w-full text-left px-2.5 py-2 rounded-lg bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 text-xs font-medium text-slate-300 hover:text-white flex items-center justify-between group transition-colors"
                >
                  <span className="truncate">{bt.label}</span>
                  <Plus className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-125 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {/* Page Structure Re-order view */}
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
              Section Order ({builderPage.blocks.length})
            </h3>
            <div className="space-y-1 max-h-56 overflow-y-auto">
              {builderPage.blocks.map((b, idx) => (
                <div
                  key={b.id}
                  onClick={() => setSelectedBlockId(b.id)}
                  className={`flex items-center justify-between p-1.5 rounded text-[11px] cursor-pointer transition-colors ${
                    selectedBlockId === b.id
                      ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 font-medium'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <span className="truncate max-w-[100px]">{b.label}</span>
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={(e) => { e.stopPropagation(); moveBlock(b.id, 'up'); }}
                      disabled={idx === 0}
                      className="p-1 hover:text-white disabled:opacity-30"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); moveBlock(b.id, 'down'); }}
                      disabled={idx === builderPage.blocks.length - 1}
                      className="p-1 hover:text-white disabled:opacity-30"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: Visual Live Canvas (7 cols) */}
        <div className="lg:col-span-7 flex justify-center">
          <div
            className={`w-full transition-all duration-300 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden min-h-[600px] ${
              builderDeviceMode === 'tablet'
                ? 'max-w-[768px]'
                : builderDeviceMode === 'mobile'
                ? 'max-w-[375px]'
                : 'max-w-full'
            }`}
          >
            {/* Canvas Browser Header Frame */}
            <div className="bg-slate-900 border-b border-slate-800 px-3 py-2 flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="px-3 py-0.5 bg-slate-950 rounded text-[11px] font-mono text-slate-400 truncate max-w-[240px] border border-slate-800/60">
                https://acme-store.aetherhost.app
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {builderDeviceMode.toUpperCase()}
              </div>
            </div>

            {/* Rendered Block Stack */}
            <div className="divide-y divide-slate-800/60">
              {builderPage.blocks.map(block => {
                const isSelected = block.id === selectedBlockId;

                return (
                  <div
                    key={block.id}
                    onClick={() => setSelectedBlockId(block.id)}
                    className={`relative cursor-pointer transition-all group ${
                      isSelected
                        ? 'ring-2 ring-cyan-500/80 ring-offset-2 ring-offset-slate-950'
                        : 'hover:ring-1 hover:ring-slate-700'
                    }`}
                    style={{ backgroundColor: block.content.backgroundColor || '#030712' }}
                  >
                    {/* Hover Floating Block Controls */}
                    <div className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-md border border-slate-700 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-mono text-slate-400 mr-1">{block.label}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 'up'); }}
                        className="p-1 hover:text-cyan-400 text-slate-300"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 'down'); }}
                        className="p-1 hover:text-cyan-400 text-slate-300"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeBlock(block.id); }}
                        className="p-1 hover:text-rose-400 text-slate-300"
                        title="Delete Block"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Block Render Engine */}
                    <div className="p-6 sm:p-8">
                      {/* HEADER BLOCK */}
                      {block.type === 'header' && (
                        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                          <span className="text-base font-bold tracking-tight text-white">
                            {block.content.headline || 'BrandName'}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-400 hidden sm:inline">Features</span>
                            <span className="text-xs text-slate-400 hidden sm:inline">Pricing</span>
                            <span className="text-xs text-slate-400 hidden sm:inline">Docs</span>
                            {block.content.primaryButtonText && (
                              <span className="text-xs font-semibold px-3 py-1 bg-cyan-500 text-slate-950 rounded-lg">
                                {block.content.primaryButtonText}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* HERO BLOCK */}
                      {block.type === 'hero' && (
                        <div className={`text-${block.content.alignment || 'center'} space-y-4 py-8`}>
                          {block.content.badge && (
                            <span className="inline-block text-[11px] font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 px-3 py-1 rounded-full">
                              {block.content.badge}
                            </span>
                          )}
                          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                            {block.content.headline}
                          </h2>
                          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
                            {block.content.subheadline}
                          </p>
                          <div className="flex items-center justify-center gap-3 pt-2">
                            {block.content.primaryButtonText && (
                              <button className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs shadow-lg shadow-cyan-500/20">
                                {block.content.primaryButtonText}
                              </button>
                            )}
                            {block.content.secondaryButtonText && (
                              <button className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-800">
                                {block.content.secondaryButtonText}
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* FEATURES GRID BLOCK */}
                      {block.type === 'features' && (
                        <div className="space-y-6">
                          <div className="text-center space-y-1">
                            <h3 className="text-lg font-bold text-white">{block.content.headline}</h3>
                            <p className="text-xs text-slate-400">{block.content.subheadline}</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {block.content.items?.map((item, i) => (
                              <div key={item.id || i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                                <div className="w-8 h-8 rounded-lg bg-cyan-950/80 text-cyan-400 flex items-center justify-center mb-3">
                                  {i === 0 ? <HardDrive className="w-4 h-4" /> : i === 1 ? <Globe className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                                </div>
                                <h4 className="text-xs font-bold text-white">{item.title}</h4>
                                <p className="text-[11px] text-slate-400 mt-1 leading-normal">{item.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* PRICING BLOCK */}
                      {block.type === 'pricing' && (
                        <div className="space-y-6">
                          <div className="text-center space-y-1">
                            <h3 className="text-lg font-bold text-white">{block.content.headline}</h3>
                            <p className="text-xs text-slate-400">{block.content.subheadline}</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {block.content.items?.map((tier, i) => (
                              <div
                                key={tier.id || i}
                                className={`p-4 rounded-xl border ${
                                  tier.featured
                                    ? 'bg-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-500/10'
                                    : 'bg-slate-950/60 border-slate-800'
                                }`}
                              >
                                {tier.featured && (
                                  <span className="text-[10px] font-mono bg-cyan-500 text-slate-950 font-bold px-2 py-0.5 rounded-full inline-block mb-2">
                                    MOST POPULAR
                                  </span>
                                )}
                                <h4 className="text-xs font-bold text-white">{tier.title}</h4>
                                <div className="flex items-baseline gap-1 my-2">
                                  <span className="text-2xl font-bold font-mono text-white">{tier.price}</span>
                                  <span className="text-[10px] text-slate-400 font-mono">{tier.period}</span>
                                </div>
                                <p className="text-[11px] text-slate-400 mb-3">{tier.description}</p>
                                <button className="w-full py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 transition-colors">
                                  Pay with Paystack
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* TESTIMONIALS BLOCK */}
                      {block.type === 'testimonials' && (
                        <div className="space-y-6">
                          <div className="text-center space-y-1">
                            <h3 className="text-lg font-bold text-white">{block.content.headline}</h3>
                            <p className="text-xs text-slate-400">{block.content.subheadline}</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {block.content.items?.map((t, idx) => (
                              <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                                <Quote className="w-5 h-5 text-cyan-400/60" />
                                <p className="text-xs text-slate-300 italic leading-relaxed">"{t.description}"</p>
                                <div>
                                  <div className="text-xs font-bold text-white">{t.author}</div>
                                  <div className="text-[10px] text-slate-400">{t.role}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CTA BANNER */}
                      {block.type === 'cta' && (
                        <div className="text-center space-y-3 py-6 px-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800">
                          <h3 className="text-xl font-bold text-white">{block.content.headline}</h3>
                          <p className="text-xs text-slate-400 max-w-md mx-auto">{block.content.subheadline}</p>
                          {block.content.primaryButtonText && (
                            <button className="px-5 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg shadow-md hover:bg-cyan-400 transition-colors">
                              {block.content.primaryButtonText}
                            </button>
                          )}
                        </div>
                      )}

                      {/* FOOTER BLOCK */}
                      {block.type === 'footer' && (
                        <div className="text-center text-xs text-slate-400 py-4 border-t border-slate-800/60">
                          <p className="font-semibold text-slate-300">{block.content.headline}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{block.content.subheadline}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Block Inspector & Settings (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          {selectedBlock ? (
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Block Inspector
                  </h3>
                  <span className="text-[11px] text-cyan-400 font-medium">
                    {selectedBlock.label}
                  </span>
                </div>
                <button
                  onClick={() => removeBlock(selectedBlock.id)}
                  className="text-rose-400 hover:text-rose-300 p-1"
                  title="Delete Block"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Form Controls */}
              <div className="space-y-3 text-xs">
                {/* Headline input */}
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Headline Text</label>
                  <input
                    type="text"
                    value={selectedBlock.content.headline || ''}
                    onChange={(e) => updateBlockContent(selectedBlock.id, { headline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Subheadline input */}
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Subheadline / Paragraph</label>
                  <textarea
                    rows={2}
                    value={selectedBlock.content.subheadline || ''}
                    onChange={(e) => updateBlockContent(selectedBlock.id, { subheadline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Badge input (if hero) */}
                {selectedBlock.type === 'hero' && (
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Pill Tag / Badge</label>
                    <input
                      type="text"
                      value={selectedBlock.content.badge || ''}
                      onChange={(e) => updateBlockContent(selectedBlock.id, { badge: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                )}

                {/* Primary CTA button label */}
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Primary Button Label</label>
                  <input
                    type="text"
                    value={selectedBlock.content.primaryButtonText || ''}
                    onChange={(e) => updateBlockContent(selectedBlock.id, { primaryButtonText: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-cyan-500"
                    placeholder="e.g. Get Started"
                  />
                </div>

                {/* Background color preset picker */}
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Background Surface</label>
                  <div className="flex items-center gap-2">
                    {['#030712', '#090d16', '#0f172a', '#111827', '#020617'].map(color => (
                      <button
                        key={color}
                        onClick={() => updateBlockContent(selectedBlock.id, { backgroundColor: color })}
                        className={`w-6 h-6 rounded-full border ${
                          selectedBlock.content.backgroundColor === color
                            ? 'border-cyan-400 scale-110'
                            : 'border-slate-700'
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Alignment */}
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Text Alignment</label>
                  <div className="flex gap-1">
                    <button
                      onClick={() => updateBlockContent(selectedBlock.id, { alignment: 'left' })}
                      className={`flex-1 py-1 px-2 rounded border text-center ${
                        selectedBlock.content.alignment === 'left' ? 'bg-slate-800 border-cyan-500 text-white' : 'border-slate-800 text-slate-400'
                      }`}
                    >
                      Left
                    </button>
                    <button
                      onClick={() => updateBlockContent(selectedBlock.id, { alignment: 'center' })}
                      className={`flex-1 py-1 px-2 rounded border text-center ${
                        selectedBlock.content.alignment === 'center' ? 'bg-slate-800 border-cyan-500 text-white' : 'border-slate-800 text-slate-400'
                      }`}
                    >
                      Center
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-slate-400 font-mono text-center">
                Modifications auto-save instantly to draft.
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
              Select any section on the canvas to configure its settings.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

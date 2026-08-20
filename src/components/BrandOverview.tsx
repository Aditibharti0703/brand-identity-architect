import React, { useState } from 'react';
import { Sparkles, Compass, Shield, Zap, Heart, Check, X, Target, Award, Layers, Download, Copy, ArrowRight, Eye, Sun, Moon } from 'lucide-react';
import { BrandBible } from '../types/brand';

interface BrandOverviewProps {
  brandBible: BrandBible;
  onNavigateTab?: (tab: string) => void;
}

export const BrandOverview: React.FC<BrandOverviewProps> = ({ brandBible, onNavigateTab }) => {
  const { brandCore, designPrinciples, primaryLogo, secondaryMarks, palette } = brandBible;
  const [logoPreviewMode, setLogoPreviewMode] = useState<'light' | 'dark'>('light');
  const [copied, setCopied] = useState(false);

  const valueIcons: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-4 h-4 text-[#C5A16F]" />,
    ShieldCheck: <Shield className="w-4 h-4 text-[#4A5D4E]" />,
    Zap: <Zap className="w-4 h-4 text-[#C5A16F]" />,
    HeartHandshake: <Heart className="w-4 h-4 text-[#4A5D4E]" />,
  };

  const handleCopyLogo = () => {
    const svg = logoPreviewMode === 'dark' && primaryLogo.darkVariantSvg ? primaryLogo.darkVariantSvg : primaryLogo.svgContent;
    navigator.clipboard.writeText(svg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadLogo = () => {
    const svg = logoPreviewMode === 'dark' && primaryLogo.darkVariantSvg ? primaryLogo.darkVariantSvg : primaryLogo.svgContent;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brandCore.name.toLowerCase().replace(/\s+/g, '-')}-logo.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Brand Hero Card with Integrated Master Vector Logo */}
      <div className="bg-[#1A1A1A] text-[#FDFCF5] p-6 sm:p-10 border border-[#1A1A1A] relative shadow-lg">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-1 bg-[#4A5D4E] text-[#FDFCF5] text-[10px] font-mono uppercase tracking-widest font-bold border border-[#1A1A1A]">
                Sector: {brandCore.industry}
              </span>
              <span className="px-2.5 py-1 bg-[#C5A16F] text-[#1A1A1A] text-[10px] font-mono uppercase tracking-widest font-bold border border-[#1A1A1A]">
                Archetype: {brandCore.brandArchetype}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#E6E4D9]/80 uppercase tracking-widest">
              Identity System ID: #{brandCore.name.slice(0, 3).toUpperCase()}-2026
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
            <div className="lg:col-span-7">
              <p className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#C5A16F] mb-1">
                Official Brand Manual // Master Lockup
              </p>
              <h2 className="text-3xl sm:text-5xl font-serif italic font-light tracking-tight text-[#FDFCF5] mb-3">
                {brandCore.name}
              </h2>
              <p className="text-base sm:text-xl font-light text-[#E6E4D9] tracking-wide mb-5">
                "{brandCore.tagline}"
              </p>

              {/* Mission Quote */}
              <div className="bg-[#242424] p-5 sm:p-6 border-l-3 border-[#C5A16F]">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#C5A16F] mb-2 flex items-center gap-2">
                  <Target className="w-3.5 h-3.5" />
                  <span>North Star Strategic Purpose</span>
                </div>
                <p className="font-serif italic text-base sm:text-xl text-[#FDFCF5] leading-relaxed">
                  "{brandCore.mission}"
                </p>
              </div>
            </div>

            {/* Live Master Vector Logo Card */}
            <div className="lg:col-span-5 bg-[#242424] border border-white/20 p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#C5A16F] font-bold">
                    Primary Vector Mark
                  </span>
                  <span className="text-[8px] font-mono bg-white/10 px-1.5 py-0.5 text-white/80">
                    Live SVG
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setLogoPreviewMode('light')}
                    className={`p-1 text-[10px] border transition ${logoPreviewMode === 'light' ? 'bg-[#FDFCF5] text-[#1A1A1A] border-[#FDFCF5]' : 'bg-transparent text-white/60 border-white/20'}`}
                    title="Paper Light"
                  >
                    <Sun className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setLogoPreviewMode('dark')}
                    className={`p-1 text-[10px] border transition ${logoPreviewMode === 'dark' ? 'bg-[#FDFCF5] text-[#1A1A1A] border-[#FDFCF5]' : 'bg-transparent text-white/60 border-white/20'}`}
                    title="Ink Dark"
                  >
                    <Moon className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Logo Preview Canvas */}
              <div
                className={`p-6 border border-white/10 flex items-center justify-center min-h-[140px] transition-colors rounded-sm ${logoPreviewMode === 'dark' ? 'bg-[#0B0F19]' : 'bg-[#FDFCF5]'}`}
              >
                <div
                  className="w-full max-w-[280px]"
                  dangerouslySetInnerHTML={{
                    __html: logoPreviewMode === 'dark' && primaryLogo.darkVariantSvg
                      ? primaryLogo.darkVariantSvg
                      : primaryLogo.svgContent,
                  }}
                />
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/15">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadLogo}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider font-bold bg-[#FDFCF5] text-[#1A1A1A] hover:bg-[#E6E4D9] transition"
                  >
                    <Download className="w-3 h-3" />
                    <span>SVG</span>
                  </button>
                  <button
                    onClick={handleCopyLogo}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider font-bold bg-white/10 text-white hover:bg-white/20 transition"
                  >
                    {copied ? <Check className="w-3 h-3 text-[#C5A16F]" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {onNavigateTab && (
                  <button
                    onClick={() => onNavigateTab('logos')}
                    className="text-[10px] font-mono text-[#C5A16F] hover:underline flex items-center gap-1 font-bold uppercase tracking-wider"
                  >
                    <span>Full Suite</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Elevator Pitch */}
          <div className="text-xs sm:text-sm text-[#E6E4D9] leading-relaxed max-w-4xl mb-6">
            <strong className="text-[#FDFCF5] font-semibold">Brand Thesis & Strategy: </strong>
            {brandCore.elevatorPitch}
          </div>

          {/* Personality Traits */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/15">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#E6E4D9]/70 mr-2">
              Aesthetic & Psychological Attributes:
            </span>
            {brandCore.personality.map(trait => (
              <span
                key={trait}
                className="px-2.5 py-1 bg-[#FDFCF5]/10 text-[#FDFCF5] text-xs font-mono border border-white/20"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values Grid */}
      <div>
        <div className="border-b border-[#1A1A1A] pb-3 mb-6 flex items-baseline justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 block">
              Core Principles // 01
            </span>
            <h3 className="text-2xl font-serif italic font-light text-[#1A1A1A] tracking-tight">
              Foundational Values & Axioms
            </h3>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">
            4 Calibrated Pillars
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {brandCore.values.map((val, idx) => (
            <div
              key={val.title}
              id={`card-value-${idx + 1}`}
              className="bg-[#FDFCF5] p-6 border border-[#1A1A1A] shadow-xs flex flex-col justify-between hover:bg-[#E6E4D9]/40 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 border border-[#1A1A1A] bg-[#E6E4D9] flex items-center justify-center">
                    {valueIcons[val.iconName || ''] || <Award className="w-4 h-4 text-[#1A1A1A]" />}
                  </div>
                  <span className="text-[10px] font-mono font-bold opacity-50">0{idx + 1}</span>
                </div>
                <h4 className="font-serif font-bold text-[#1A1A1A] text-lg mb-2">
                  {val.title}
                </h4>
                <p className="text-xs text-[#1A1A1A]/80 leading-relaxed">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tone of Voice Matrix & Do's / Don'ts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voice Gauges */}
        <div className="bg-[#FDFCF5] p-6 sm:p-8 border border-[#1A1A1A] shadow-xs">
          <div className="border-b border-[#1A1A1A] pb-3 mb-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 block">
              Calibration Matrix
            </span>
            <h3 className="text-xl font-serif italic text-[#1A1A1A] tracking-tight">
              Tone of Voice Parameters
            </h3>
          </div>

          <div className="space-y-5">
            {[
              { label: 'Formality', left: 'Intimate & Warm', right: 'Sovereign & Formal', value: brandCore.toneOfVoice.formality },
              { label: 'Boldness', left: 'Understated', right: 'Audacious & Provocative', value: brandCore.toneOfVoice.boldness },
              { label: 'Warmth', left: 'Analytical & Cool', right: 'Empathetic & Resonant', value: brandCore.toneOfVoice.warmth },
              { label: 'Modernity', left: 'Timeless Heritage', right: 'Avant-Garde Future', value: brandCore.toneOfVoice.modernity },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-xs font-mono font-bold text-[#1A1A1A] mb-1.5">
                  <span>{item.label}</span>
                  <span className="text-[#4A5D4E] font-mono">{item.value}%</span>
                </div>
                <div className="h-2 bg-[#E6E4D9] border border-[#1A1A1A]">
                  <div
                    className="h-full bg-[#1A1A1A] transition-all duration-500"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-mono uppercase tracking-wider opacity-60 mt-1">
                  <span>{item.left}</span>
                  <span>{item.right}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Do's & Don'ts */}
        <div className="bg-[#FDFCF5] p-6 sm:p-8 border border-[#1A1A1A] shadow-xs">
          <div className="border-b border-[#1A1A1A] pb-3 mb-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 block">
              Governance Standard
            </span>
            <h3 className="text-xl font-serif italic text-[#1A1A1A] tracking-tight">
              Verbal & Editorial Directives
            </h3>
          </div>

          <div className="space-y-5">
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#4A5D4E] mb-2 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Mandatory Directives (Do's)</span>
              </div>
              <ul className="space-y-2">
                {brandCore.toneOfVoice.doList.map((item, i) => (
                  <li key={i} className="text-xs text-[#1A1A1A] flex items-start gap-2 bg-[#E6E4D9]/40 p-2.5 border border-[#1A1A1A]/30">
                    <span className="w-1.5 h-1.5 bg-[#4A5D4E] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8A3A3A] mb-2 flex items-center gap-1.5">
                <X className="w-3.5 h-3.5" />
                <span>Prohibited Patterns (Don'ts)</span>
              </div>
              <ul className="space-y-2">
                {brandCore.toneOfVoice.dontList.map((item, i) => (
                  <li key={i} className="text-xs text-[#1A1A1A] flex items-start gap-2 bg-[#E6E4D9]/40 p-2.5 border border-[#1A1A1A]/30">
                    <span className="w-1.5 h-1.5 bg-[#8A3A3A] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Design Principles */}
      <div className="bg-[#E6E4D9]/40 p-6 sm:p-8 border border-[#1A1A1A]">
        <div className="border-b border-[#1A1A1A] pb-3 mb-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 block">
            System Logic
          </span>
          <h3 className="text-xl font-serif italic text-[#1A1A1A] tracking-tight flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#4A5D4E]" />
            <span>Visual Composition Axioms</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {designPrinciples.map((principle, idx) => {
            const [title, ...desc] = principle.split(':');
            return (
              <div key={idx} className="bg-[#FDFCF5] p-5 border border-[#1A1A1A]">
                <span className="text-[10px] font-mono font-bold text-[#4A5D4E] uppercase tracking-widest block mb-1">
                  Axiom 0{idx + 1} // {title}
                </span>
                <p className="text-xs text-[#1A1A1A]/85 leading-relaxed">
                  {desc.join(':').trim()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

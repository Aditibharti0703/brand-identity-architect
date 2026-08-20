import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  Sun,
  Moon,
  Grid,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { BrandBible, LogoConceptOption, SecondaryMark } from '../types/brand';

interface LogoSuiteSectionProps {
  brandBible: BrandBible;
  onSelectLogoConcept?: (concept: LogoConceptOption) => void;
  onRegenerateLogoConcepts?: () => void;
  isRegeneratingLogos?: boolean;
}

export const LogoSuiteSection: React.FC<LogoSuiteSectionProps> = ({
  brandBible,
  onSelectLogoConcept,
  onRegenerateLogoConcepts,
  isRegeneratingLogos = false,
}) => {
  const { primaryLogo, secondaryMarks, brandCore, logoOptions = [] } = brandBible;
  const [logoMode, setLogoMode] = useState<'light' | 'dark' | 'monochrome'>('light');
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(
    logoOptions[0]?.id || null
  );

  const getActivePrimarySvg = () => {
    if (logoMode === 'dark' && primaryLogo.darkVariantSvg) {
      return primaryLogo.darkVariantSvg;
    }
    if (logoMode === 'monochrome' && primaryLogo.monochromeVariantSvg) {
      return primaryLogo.monochromeVariantSvg;
    }
    return primaryLogo.svgContent;
  };

  const handleCopySvg = (svg: string, id: string) => {
    navigator.clipboard.writeText(svg);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadSingleSvg = (svgContent: string, fileName: string) => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSelectConcept = (concept: LogoConceptOption) => {
    setSelectedConceptId(concept.id);
    if (onSelectLogoConcept) {
      onSelectLogoConcept(concept);
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-[#1A1A1A] pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 block">
            Visual Geometry // 02
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif italic font-light text-[#1A1A1A] tracking-tight">
            Primary Logo & Adaptive Marks Suite
          </h2>
          <p className="text-xs text-[#1A1A1A]/70 mt-1">
            Choose between distinct geometric concept directions or generate additional algorithmic variations in real-time
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onRegenerateLogoConcepts && (
            <button
              id="btn-refresh-logo-concepts"
              onClick={onRegenerateLogoConcepts}
              disabled={isRegeneratingLogos}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A] bg-[#FDFCF5] hover:bg-[#E6E4D9] active:scale-98 border border-[#1A1A1A] transition shadow-xs disabled:opacity-50"
              title="Generate 3 new logo directions"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#C5A16F] ${isRegeneratingLogos ? 'animate-spin' : ''}`} />
              <span>{isRegeneratingLogos ? 'Synthesizing...' : 'Generate More Logo Options'}</span>
            </button>
          )}

          <button
            id="btn-download-primary-svg"
            onClick={() =>
              handleDownloadSingleSvg(
                getActivePrimarySvg(),
                `${brandCore.name.toLowerCase().replace(/\s+/g, '-')}-master-logo-${logoMode}`
              )
            }
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] uppercase tracking-widest font-bold text-[#FDFCF5] bg-[#1A1A1A] hover:bg-[#333333] border border-[#1A1A1A] transition shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Master SVG</span>
          </button>
        </div>
      </div>

      {/* 3 LOGO OPTIONS SELECTOR (Interactive Concept Directions) */}
      {logoOptions && logoOptions.length > 0 && (
        <div className="bg-[#FDFCF5] border border-[#1A1A1A] p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1A1A1A]/20 pb-3">
            <div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#4A5D4E] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#C5A16F]" />
                Selectable Brand Marks Direction (Choose 1 of {logoOptions.length})
              </span>
              <h3 className="text-lg font-serif italic text-[#1A1A1A]">
                Select Preferred Master Logo
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#1A1A1A]/70 hidden sm:inline">
                Click any option to apply as Master Logo & synchronize all collateral
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            {logoOptions.map((concept, idx) => {
              const isSelected = selectedConceptId === concept.id || (!selectedConceptId && idx === 0);

              return (
                <div
                  key={concept.id}
                  id={`logo-option-card-${idx}`}
                  onClick={() => handleSelectConcept(concept)}
                  className={`cursor-pointer border text-left p-4 transition-all duration-200 flex flex-col justify-between relative group ${
                    isSelected
                      ? 'bg-[#E6E4D9]/40 border-[#1A1A1A] ring-2 ring-[#1A1A1A] shadow-md'
                      : 'bg-[#FDFCF5] border-[#1A1A1A]/40 hover:border-[#1A1A1A] hover:bg-[#E6E4D9]/20'
                  }`}
                >
                  {/* Badge & Active Indicator */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 border border-[#1A1A1A] bg-[#FDFCF5] text-[#1A1A1A]">
                      {concept.style}
                    </span>

                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-[#4A5D4E] bg-[#FDFCF5] px-2 py-0.5 border border-[#1A1A1A]">
                        <CheckCircle2 className="w-3 h-3 text-[#4A5D4E]" />
                        Active Master
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono uppercase text-[#1A1A1A]/60 group-hover:text-[#1A1A1A]">
                        Click to Choose
                      </span>
                    )}
                  </div>

                  {/* SVG Preview Box */}
                  <div className="bg-[#FDFCF5] border border-[#1A1A1A] p-4 flex items-center justify-center min-h-[110px] my-2 transition-transform group-hover:scale-[1.02]">
                    <div
                      className="w-full max-h-20 flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: concept.primarySvg }}
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="mt-3 space-y-1">
                    <h4 className="font-serif italic font-bold text-sm text-[#1A1A1A] flex items-center justify-between">
                      <span>{concept.title}</span>
                    </h4>
                    <p className="text-[11px] text-[#1A1A1A]/75 line-clamp-2 leading-relaxed">
                      {concept.description}
                    </p>
                  </div>

                  {/* Selection Button */}
                  <div className="mt-4 pt-3 border-t border-[#1A1A1A]/20 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#1A1A1A]/60">Layout: {concept.layout}</span>
                    <button
                      type="button"
                      className={`px-2.5 py-1 uppercase font-bold border transition ${
                        isSelected
                          ? 'bg-[#1A1A1A] text-[#FDFCF5] border-[#1A1A1A]'
                          : 'bg-[#FDFCF5] text-[#1A1A1A] border-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-[#FDFCF5]'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Use Option'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Master Logo Showcase Stage */}
      <div className="bg-[#FDFCF5] border border-[#1A1A1A] shadow-xs">
        {/* Header Controls */}
        <div className="p-4 sm:p-5 border-b border-[#1A1A1A] flex flex-wrap items-center justify-between gap-3 bg-[#E6E4D9]/40">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#1A1A1A]">
              Active Master Lockup
            </span>
            <span className="text-[9px] font-mono font-bold px-2 py-0.5 border border-[#1A1A1A] bg-[#FDFCF5] text-[#1A1A1A]">
              Scalable Vector SVG
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Safe Zone Toggle */}
            <button
              id="btn-toggle-safe-zone"
              onClick={() => setShowSafeZone(!showSafeZone)}
              className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 border transition ${
                showSafeZone
                  ? 'bg-[#1A1A1A] border-[#1A1A1A] text-[#FDFCF5]'
                  : 'bg-[#FDFCF5] border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#E6E4D9]'
              }`}
            >
              <Grid className="w-3 h-3" />
              <span>Safe Zone Grid</span>
            </button>

            {/* Mode Switcher */}
            <div className="flex items-center bg-[#FDFCF5] border border-[#1A1A1A]">
              <button
                id="btn-mode-light"
                onClick={() => setLogoMode('light')}
                className={`px-2.5 py-1 text-[10px] font-mono uppercase font-bold flex items-center gap-1 transition ${
                  logoMode === 'light'
                    ? 'bg-[#1A1A1A] text-[#FDFCF5]'
                    : 'text-[#1A1A1A] hover:bg-[#E6E4D9]'
                }`}
                title="Light Background"
              >
                <Sun className="w-3 h-3" />
                <span className="hidden sm:inline">Paper</span>
              </button>
              <button
                id="btn-mode-dark"
                onClick={() => setLogoMode('dark')}
                className={`px-2.5 py-1 text-[10px] font-mono uppercase font-bold flex items-center gap-1 transition border-l border-r border-[#1A1A1A] ${
                  logoMode === 'dark'
                    ? 'bg-[#1A1A1A] text-[#FDFCF5]'
                    : 'text-[#1A1A1A] hover:bg-[#E6E4D9]'
                }`}
                title="Dark Background"
              >
                <Moon className="w-3 h-3" />
                <span className="hidden sm:inline">Ink</span>
              </button>
              <button
                id="btn-mode-mono"
                onClick={() => setLogoMode('monochrome')}
                className={`px-2.5 py-1 text-[10px] font-mono uppercase font-bold flex items-center gap-1 transition ${
                  logoMode === 'monochrome'
                    ? 'bg-[#1A1A1A] text-[#FDFCF5]'
                    : 'text-[#1A1A1A] hover:bg-[#E6E4D9]'
                }`}
                title="Monochrome Black & White"
              >
                <span className="w-2.5 h-2.5 bg-[#1A1A1A] border border-[#1A1A1A] inline-block" />
                <span className="hidden sm:inline">Mono</span>
              </button>
            </div>

            {/* Copy SVG code */}
            <button
              id="btn-copy-primary-svg"
              onClick={() => handleCopySvg(getActivePrimarySvg(), 'primary-logo')}
              className="p-1.5 bg-[#FDFCF5] border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FDFCF5] transition"
              title="Copy raw SVG code"
            >
              {copiedId === 'primary-logo' ? <Check className="w-3.5 h-3.5 text-[#4A5D4E]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Display Stage */}
        <div
          className={`relative p-8 sm:p-16 flex items-center justify-center min-h-[260px] transition-colors duration-300 ${
            logoMode === 'dark'
              ? 'bg-[#1A1A1A] text-[#FDFCF5]'
              : logoMode === 'monochrome'
              ? 'bg-[#E6E4D9]'
              : 'bg-[#FDFCF5] text-[#1A1A1A]'
          }`}
        >
          {/* Safe Zone Grid Overlay */}
          {showSafeZone && (
            <div className="absolute inset-6 border border-dashed border-[#C5A16F] pointer-events-none flex flex-col justify-between p-2">
              <span className="text-[9px] font-mono text-[#1A1A1A] font-bold bg-[#FDFCF5] px-1.5 py-0.5 border border-[#1A1A1A] self-start">
                Safe Zone: {primaryLogo.safeZoneRatio}
              </span>
              <span className="text-[9px] font-mono text-[#1A1A1A] font-bold bg-[#FDFCF5] px-1.5 py-0.5 border border-[#1A1A1A] self-end">
                Min Width: {primaryLogo.minimumSizePx}px
              </span>
            </div>
          )}

          {/* SVG Render Container */}
          <div
            className="w-full max-w-lg transition-transform duration-200"
            dangerouslySetInnerHTML={{ __html: getActivePrimarySvg() }}
          />
        </div>

        {/* Logo Specifications Footer */}
        <div className="p-6 bg-[#E6E4D9]/40 border-t border-[#1A1A1A] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div>
            <span className="font-mono font-bold uppercase tracking-wider text-[10px] text-[#1A1A1A] block mb-1">
              Symbol Geometry & Meaning
            </span>
            <p className="text-[#1A1A1A]/80 leading-relaxed">
              {primaryLogo.symbolMeaning}
            </p>
          </div>
          <div>
            <span className="font-mono font-bold uppercase tracking-wider text-[10px] text-[#1A1A1A] block mb-1">
              Concept & Architecture
            </span>
            <p className="text-[#1A1A1A]/80 leading-relaxed">
              {primaryLogo.conceptExplanation}
            </p>
          </div>
          <div className="bg-[#FDFCF5] p-4 border border-[#1A1A1A]">
            <span className="font-mono font-bold uppercase tracking-wider text-[10px] text-[#1A1A1A] block mb-1">
              Clearance & Sizing Governance
            </span>
            <ul className="space-y-1 text-[#1A1A1A]/80 text-[11px] font-mono">
              <li>• Clear Space: {primaryLogo.safeZoneRatio}</li>
              <li>• Digital Min: {primaryLogo.minimumSizePx}px width</li>
              <li>• Aspect: {primaryLogo.aspectRatio}</li>
              <li>• Do not distort, skew, or re-color</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Secondary Marks Suite Bento Grid */}
      <div>
        <div className="border-b border-[#1A1A1A] pb-3 mb-6 flex items-baseline justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 block">
              Adaptive Suite
            </span>
            <h3 className="text-2xl font-serif italic font-light text-[#1A1A1A] tracking-tight">
              Secondary Marks & Contextual Glyphs
            </h3>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">
            {secondaryMarks.length} System Marks
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryMarks.map(mark => (
            <div
              key={mark.id}
              id={`card-mark-${mark.id}`}
              className="bg-[#FDFCF5] border border-[#1A1A1A] shadow-xs overflow-hidden flex flex-col hover:bg-[#E6E4D9]/20 transition"
            >
              {/* Mark Canvas */}
              <div className="bg-[#E6E4D9]/40 p-8 flex items-center justify-center min-h-[180px] border-b border-[#1A1A1A] relative group">
                <div
                  className="w-32 h-32 flex items-center justify-center transition-transform group-hover:scale-105"
                  dangerouslySetInnerHTML={{ __html: mark.svgContent }}
                />

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <button
                    onClick={() => handleCopySvg(mark.svgContent, mark.id)}
                    className="p-1.5 bg-[#FDFCF5] border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FDFCF5] shadow-xs"
                    title="Copy SVG"
                  >
                    {copiedId === mark.id ? <Check className="w-3 h-3 text-[#4A5D4E]" /> : <Copy className="w-3 h-3" />}
                  </button>
                  <button
                    onClick={() =>
                      handleDownloadSingleSvg(
                        mark.svgContent,
                        `${brandCore.name.toLowerCase().replace(/\s+/g, '-')}-${mark.id}`
                      )
                    }
                    className="p-1.5 bg-[#FDFCF5] border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FDFCF5] shadow-xs"
                    title="Download SVG"
                  >
                    <Download className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-5 flex-1 flex flex-col justify-between text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="font-serif font-bold text-[#1A1A1A] text-base">
                      {mark.name}
                    </h4>
                    <span className="text-[9px] uppercase font-mono px-2 py-0.5 border border-[#1A1A1A] bg-[#E6E4D9] text-[#1A1A1A]">
                      {mark.type}
                    </span>
                  </div>
                  <p className="text-[#1A1A1A]/80 mb-3 leading-relaxed">
                    {mark.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1A1A1A]/20">
                  <span className="font-mono font-bold text-[10px] uppercase text-[#1A1A1A] block mb-0.5">
                    Application Rule:
                  </span>
                  <p className="text-[#1A1A1A]/70 text-[11px] leading-relaxed">
                    {mark.recommendedUsage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

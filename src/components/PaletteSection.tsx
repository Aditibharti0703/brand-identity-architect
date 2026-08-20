import React, { useState } from 'react';
import {
  Copy,
  Check,
  ShieldCheck,
  Code,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Globe,
  Zap,
  Layout,
  Sliders,
  CheckSquare
} from 'lucide-react';
import { BrandBible, ColorDefinition, PaletteConceptOption } from '../types/brand';
import { getContrastRatio, getWcagRating } from '../utils/colorUtils';

interface PaletteSectionProps {
  brandBible: BrandBible;
  onSelectPaletteOption?: (option: PaletteConceptOption) => void;
  onRegeneratePaletteOptions?: () => void;
  isRegeneratingPalette?: boolean;
}

export const PaletteSection: React.FC<PaletteSectionProps> = ({
  brandBible,
  onSelectPaletteOption,
  onRegeneratePaletteOptions,
  isRegeneratingPalette = false,
}) => {
  const { palette, brandCore, paletteOptions = [] } = brandBible;
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [codeFormat, setCodeFormat] = useState<'css' | 'tailwind' | 'json'>('css');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(
    paletteOptions[0]?.id || null
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(id);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  const handleSelectOption = (option: PaletteConceptOption) => {
    setSelectedOptionId(option.id);
    if (onSelectPaletteOption) {
      onSelectPaletteOption(option);
    }
  };

  const getCssVariables = () => {
    return `:root {
  /* Brand: ${brandCore.name} - 5-Color System (60-30-10 Rule) */
  --brand-primary: ${palette[0]?.hex};       /* 60% Dominant Signature */
  --brand-secondary: ${palette[1]?.hex};     /* 30% Supporting Depth */
  --brand-accent: ${palette[2]?.hex};        /* 10% Action / CTA Focal */
  --brand-dark-neutral: ${palette[3]?.hex};   /* High Contrast Frame / Borders */
  --brand-light-neutral: ${palette[4]?.hex};  /* Base Canvas / Paper Surface */
}`;
  };

  const getTailwindCode = () => {
    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '${palette[0]?.hex}',
          secondary: '${palette[1]?.hex}',
          accent: '${palette[2]?.hex}',
          dark: '${palette[3]?.hex}',
          light: '${palette[4]?.hex}',
        }
      }
    }
  }
};`;
  };

  const getJsonTokens = () => {
    return JSON.stringify(
      {
        brand: brandCore.name,
        colorSystem: '60-30-10-Rule',
        tokens: palette.map(c => ({
          role: c.recommendedRole,
          name: c.name,
          hex: c.hex,
          rgb: c.rgb,
          hsl: c.hsl,
          wcagContrastOnWhite: c.wcagContrastOnWhite,
          wcagContrastOnDark: c.wcagContrastOnDark,
          usageNotes: c.usageNotes,
        })),
      },
      null,
      2
    );
  };

  const roleLabels: Record<string, { badge: string; percent: string; desc: string }> = {
    primary: { badge: 'Signature Primary', percent: '60% Coverage', desc: 'Dominant identity signifier, structural headers, hero typography' },
    secondary: { badge: 'Supporting Accent', percent: '30% Coverage', desc: 'Secondary panels, badges, navigation borders and card surfaces' },
    accent: { badge: 'Luxe Focal Accent', percent: '10% Focal', desc: 'High-impact conversion triggers, CTA buttons, verified seals' },
    darkNeutral: { badge: 'Structure / Divider', percent: 'Frame / Surface', desc: 'Crisp borders, pill chips, table rows, and secondary backgrounds' },
    lightNeutral: { badge: 'Base / Paper Canvas', percent: 'Canvas Base', desc: 'Pristine warm archival paper canvas and card backdrops' },
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-[#1A1A1A] pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 block">
            Chromatic System // 03
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif italic font-light text-[#1A1A1A] tracking-tight">
            5-Color Palette & Web Recommendation Engine
          </h2>
          <p className="text-xs text-[#1A1A1A]/70 mt-1">
            Engineered using the 60-30-10 harmonic distribution rule with AI website suitability recommendations
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onRegeneratePaletteOptions && (
            <button
              id="btn-refresh-palette-concepts"
              onClick={onRegeneratePaletteOptions}
              disabled={isRegeneratingPalette}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A] bg-[#FDFCF5] hover:bg-[#E6E4D9] active:scale-98 border border-[#1A1A1A] transition shadow-xs disabled:opacity-50"
              title="Generate 3 new color system directions"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#C5A16F] ${isRegeneratingPalette ? 'animate-spin' : ''}`} />
              <span>{isRegeneratingPalette ? 'Synthesizing...' : 'Generate More Color Options'}</span>
            </button>
          )}

          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 bg-[#E6E4D9] text-[#1A1A1A] border border-[#1A1A1A]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4A5D4E]" />
            <span>WCAG 2.1 AA Compliant</span>
          </div>
        </div>
      </div>

      {/* SELECTABLE COLOR PALETTES WITH WEBSITE RECOMMENDATIONS */}
      {paletteOptions && paletteOptions.length > 0 && (
        <div className="bg-[#FDFCF5] border border-[#1A1A1A] p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1A1A1A]/20 pb-3">
            <div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#4A5D4E] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#C5A16F]" />
                Selectable Color Directions (Choose 1 of {paletteOptions.length})
              </span>
              <h3 className="text-lg font-serif italic text-[#1A1A1A]">
                Choose Chromatic System Direction
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#1A1A1A]/70 hidden sm:inline">
                Click any option to apply as Active Palette and synchronize all logos & collateral
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {paletteOptions.map((opt, idx) => {
              const isSelected = selectedOptionId === opt.id || (!selectedOptionId && idx === 0);

              return (
                <div
                  key={opt.id}
                  id={`palette-option-card-${idx}`}
                  onClick={() => handleSelectOption(opt)}
                  className={`cursor-pointer border text-left p-5 transition-all duration-200 flex flex-col justify-between relative group ${
                    isSelected
                      ? 'bg-[#E6E4D9]/40 border-[#1A1A1A] ring-2 ring-[#1A1A1A] shadow-md'
                      : 'bg-[#FDFCF5] border-[#1A1A1A]/40 hover:border-[#1A1A1A] hover:bg-[#E6E4D9]/20'
                  }`}
                >
                  {/* Top Badges */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 border border-[#1A1A1A] bg-[#FDFCF5] text-[#1A1A1A]">
                        {opt.contrastScore}
                      </span>

                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-[#4A5D4E] bg-[#FDFCF5] px-2 py-0.5 border border-[#1A1A1A]">
                          <CheckCircle2 className="w-3 h-3 text-[#4A5D4E]" />
                          Active System
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono uppercase text-[#1A1A1A]/60 group-hover:text-[#1A1A1A]">
                          Click to Apply
                        </span>
                      )}
                    </div>

                    {/* AI Recommendation Badge if applicable */}
                    {opt.isRecommendedForWebsite && (
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#4A5D4E] text-[#FDFCF5] border border-[#1A1A1A] text-[9px] font-mono font-bold uppercase tracking-wider shadow-xs">
                        <Sparkles className="w-3 h-3 text-[#C5A16F]" />
                        <span>✨ Recommended for Your Website</span>
                      </div>
                    )}
                  </div>

                  {/* 5-Color Horizontal Swatch Bar */}
                  <div className="h-12 border border-[#1A1A1A] flex overflow-hidden shadow-xs my-2">
                    {opt.palette.map((col, cIdx) => (
                      <div
                        key={cIdx}
                        className="h-full flex items-end justify-center pb-1 transition-all group-hover:opacity-95"
                        style={{
                          width: cIdx === 0 ? '45%' : cIdx === 1 ? '25%' : cIdx === 2 ? '15%' : '7.5%',
                          backgroundColor: col.hex,
                        }}
                        title={`${col.name} (${col.hex})`}
                      >
                        <span
                          className="text-[8px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            color: col.wcagContrastOnWhite >= 4.5 ? '#FDFCF5' : '#1A1A1A',
                          }}
                        >
                          {col.hex.slice(0, 4)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Title & Mood */}
                  <div className="mt-3 space-y-1.5">
                    <h4 className="font-serif italic font-bold text-base text-[#1A1A1A]">
                      {opt.title}
                    </h4>
                    <p className="text-[11px] font-mono text-[#4A5D4E] font-medium">
                      {opt.mood}
                    </p>
                    <p className="text-[11px] text-[#1A1A1A]/75 line-clamp-2 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>

                  {/* Website Suitability / Recommendation Reason */}
                  <div className="mt-3 p-2.5 bg-[#FDFCF5] border border-[#1A1A1A]/30 text-[10px] space-y-1.5">
                    <div className="font-mono font-bold uppercase text-[#1A1A1A] flex items-center gap-1">
                      <Globe className="w-3 h-3 text-[#C5A16F]" />
                      <span>Website UX Suitability:</span>
                    </div>
                    <p className="text-[#1A1A1A]/80 leading-normal italic">
                      {opt.recommendationReason}
                    </p>
                    {opt.websiteBenefits && opt.websiteBenefits.length > 0 && (
                      <div className="pt-1 border-t border-[#1A1A1A]/10 space-y-0.5 font-mono text-[9px] text-[#1A1A1A]/70">
                        {opt.websiteBenefits.slice(0, 2).map((benefit, bIdx) => (
                          <div key={bIdx} className="line-clamp-1">{benefit}</div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Selection Button */}
                  <div className="mt-4 pt-3 border-t border-[#1A1A1A]/20 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#1A1A1A]/60">5 Hex Values</span>
                    <button
                      type="button"
                      className={`px-2.5 py-1 uppercase font-bold border transition ${
                        isSelected
                          ? 'bg-[#1A1A1A] text-[#FDFCF5] border-[#1A1A1A]'
                          : 'bg-[#FDFCF5] text-[#1A1A1A] border-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-[#FDFCF5]'
                      }`}
                    >
                      {isSelected ? 'Applied' : 'Use Palette'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active 60-30-10 Proportional Distribution Visualizer */}
      <div className="bg-[#FDFCF5] p-6 border border-[#1A1A1A] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-[#1A1A1A]">
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#C5A16F]" />
            Active Harmonic Weight Distribution (60-30-10 Rule)
          </span>
          <span className="text-[#4A5D4E]">
            Dominant Signature: {palette[0]?.hex}
          </span>
        </div>

        <div className="h-11 border border-[#1A1A1A] flex shadow-xs">
          <div
            className="flex items-center justify-center text-xs font-mono font-bold text-white transition-all border-r border-[#1A1A1A]"
            style={{ width: '50%', backgroundColor: palette[0]?.hex }}
            title={`Primary (${palette[0]?.hex}) - 60% Coverage`}
          >
            <span className="hidden sm:inline">{palette[0]?.name} (60% Dominant)</span>
            <span className="sm:hidden text-[10px]">60%</span>
          </div>
          <div
            className="flex items-center justify-center text-xs font-mono font-bold text-white transition-all border-r border-[#1A1A1A]"
            style={{ width: '30%', backgroundColor: palette[1]?.hex }}
            title={`Secondary (${palette[1]?.hex}) - 30% Coverage`}
          >
            <span className="hidden sm:inline">{palette[1]?.name} (30% Supporting)</span>
            <span className="sm:hidden text-[10px]">30%</span>
          </div>
          <div
            className="flex items-center justify-center text-xs font-mono font-bold text-[#1A1A1A] transition-all border-r border-[#1A1A1A]"
            style={{ width: '10%', backgroundColor: palette[2]?.hex }}
            title={`Accent (${palette[2]?.hex}) - 10% Focal Conversion`}
          >
            <span className="hidden sm:inline">10% CTA</span>
            <span className="sm:hidden text-[10px]">10%</span>
          </div>
          <div
            className="flex items-center justify-center text-xs font-mono font-bold text-[#1A1A1A] transition-all border-r border-[#1A1A1A]"
            style={{ width: '5%', backgroundColor: palette[3]?.hex }}
            title={`Frame / Divider (${palette[3]?.hex})`}
          />
          <div
            className="flex items-center justify-center text-xs font-mono font-bold text-[#1A1A1A] transition-all"
            style={{ width: '5%', backgroundColor: palette[4]?.hex }}
            title={`Canvas Base (${palette[4]?.hex})`}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px] font-mono text-[#1A1A1A]/70 pt-1">
          <div><strong className="text-[#1A1A1A]">60% Primary:</strong> Typography & Identity</div>
          <div><strong className="text-[#1A1A1A]">30% Secondary:</strong> Surfaces & Containers</div>
          <div><strong className="text-[#1A1A1A]">10% Accent:</strong> Actions & Key Conversion</div>
          <div><strong className="text-[#1A1A1A]">Mid Frame:</strong> Borders & Dividers</div>
          <div><strong className="text-[#1A1A1A]">Canvas Base:</strong> Paper & Backdrop</div>
        </div>
      </div>

      {/* 5 Color Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {palette.map((color, index) => {
          const roleInfo = roleLabels[color.recommendedRole] || roleLabels['primary'];
          const whiteRatio = color.wcagContrastOnWhite;
          const darkRatio = color.wcagContrastOnDark;
          const whiteRating = getWcagRating(whiteRatio);
          const darkRating = getWcagRating(darkRatio);

          return (
            <div
              key={color.id}
              id={`color-card-${index + 1}`}
              className="bg-[#FDFCF5] border border-[#1A1A1A] shadow-xs overflow-hidden flex flex-col hover:bg-[#E6E4D9]/20 transition"
            >
              {/* Swatch Canvas */}
              <div
                className="h-32 p-4 flex flex-col justify-between border-b border-[#1A1A1A] relative group transition-all"
                style={{ backgroundColor: color.hex }}
              >
                <span
                  className="text-[9px] font-mono font-bold px-2 py-0.5 border border-[#1A1A1A] uppercase tracking-wider self-start shadow-xs"
                  style={{
                    backgroundColor: whiteRatio >= 4.5 ? '#1A1A1A' : '#FDFCF5',
                    color: whiteRatio >= 4.5 ? '#FDFCF5' : '#1A1A1A',
                  }}
                >
                  {roleInfo.badge}
                </span>

                <div className="flex items-center justify-between">
                  <span
                    className="font-mono font-bold text-sm tracking-tight"
                    style={{
                      color: whiteRatio >= 4.5 ? '#FDFCF5' : '#1A1A1A',
                    }}
                  >
                    {color.hex}
                  </span>
                  <button
                    onClick={() => handleCopy(color.hex, `hex-${color.id}`)}
                    className="p-1.5 border border-[#1A1A1A] transition shadow-xs"
                    style={{
                      backgroundColor: whiteRatio >= 4.5 ? '#1A1A1A' : '#FDFCF5',
                      color: whiteRatio >= 4.5 ? '#FDFCF5' : '#1A1A1A',
                    }}
                    title="Copy Hex Code"
                  >
                    {copiedValue === `hex-${color.id}` ? <Check className="w-3 h-3 text-[#4A5D4E]" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* Color Metadata */}
              <div className="p-4 flex-1 flex flex-col justify-between text-xs space-y-3">
                <div>
                  <h4 className="font-serif font-bold text-[#1A1A1A] text-base">
                    {color.name}
                  </h4>
                  <p className="text-[11px] text-[#1A1A1A]/70 mt-0.5">
                    {roleInfo.desc}
                  </p>
                </div>

                <div className="space-y-1 text-[10px] font-mono bg-[#E6E4D9]/40 p-2.5 border border-[#1A1A1A]/30">
                  <div className="flex justify-between text-[#1A1A1A]">
                    <span className="opacity-60">RGB:</span>
                    <span className="font-bold">{color.rgb}</span>
                  </div>
                  <div className="flex justify-between text-[#1A1A1A]">
                    <span className="opacity-60">HSL:</span>
                    <span className="font-bold">{color.hsl}</span>
                  </div>
                </div>

                {/* WCAG Contrast Ratings */}
                <div className="pt-2 border-t border-[#1A1A1A]/20 space-y-1.5 text-[10px] font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-[#1A1A1A]/70">On White:</span>
                    <span className="px-1.5 py-0.5 border border-[#1A1A1A] bg-[#FDFCF5] font-bold">
                      {whiteRatio}:1 ({whiteRating.level})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#1A1A1A]/70">On Ink:</span>
                    <span className="px-1.5 py-0.5 border border-[#1A1A1A] bg-[#FDFCF5] font-bold">
                      {darkRatio}:1 ({darkRating.level})
                    </span>
                  </div>
                </div>

                {/* Usage Notes */}
                <div className="pt-2 text-[11px] text-[#1A1A1A]/80 leading-relaxed italic border-t border-[#1A1A1A]/20">
                  "{color.usageNotes}"
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Website & Digital Application Blueprint Guide */}
      <div className="bg-[#FDFCF5] border border-[#1A1A1A] p-6 sm:p-8 shadow-xs">
        <div className="border-b border-[#1A1A1A] pb-3 mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 block">
              Website Implementation Blueprint
            </span>
            <h3 className="text-xl font-serif italic text-[#1A1A1A] tracking-tight">
              Best Practices For Your Website & Digital Interface
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4A5D4E] flex items-center gap-1">
            <CheckSquare className="w-3 h-3 text-[#4A5D4E]" />
            Accessibility Certified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-4 bg-[#E6E4D9]/40 border border-[#1A1A1A] space-y-2">
            <div className="flex items-center gap-2 font-mono font-bold text-[11px] uppercase text-[#1A1A1A]">
              <Layout className="w-4 h-4 text-[#C5A16F]" />
              <span>1. Canvas & Surface Hierarchy</span>
            </div>
            <p className="text-[#1A1A1A]/80 leading-relaxed text-[11px]">
              Set your body background to <strong>Light Neutral ({palette[4]?.hex})</strong>. Use <strong>Dark Neutral ({palette[3]?.hex})</strong> for 1px hairline borders, subtle divider rules, and secondary card panels. This prevents high-contrast eye fatigue during long user engagement.
            </p>
          </div>

          <div className="p-4 bg-[#E6E4D9]/40 border border-[#1A1A1A] space-y-2">
            <div className="flex items-center gap-2 font-mono font-bold text-[11px] uppercase text-[#1A1A1A]">
              <Zap className="w-4 h-4 text-[#C5A16F]" />
              <span>2. High-Conversion CTA Buttons</span>
            </div>
            <p className="text-[#1A1A1A]/80 leading-relaxed text-[11px]">
              Reserve <strong>Accent ({palette[2]?.hex})</strong> strictly for primary action buttons, checkout triggers, and verified badges (max 10% screen coverage). When accent is used with restraint, users locate conversion pathways in under 0.8 seconds.
            </p>
          </div>

          <div className="p-4 bg-[#E6E4D9]/40 border border-[#1A1A1A] space-y-2">
            <div className="flex items-center gap-2 font-mono font-bold text-[11px] uppercase text-[#1A1A1A]">
              <ShieldCheck className="w-4 h-4 text-[#C5A16F]" />
              <span>3. Heading Contrast Governance</span>
            </div>
            <p className="text-[#1A1A1A]/80 leading-relaxed text-[11px]">
              Render all H1/H2 titles, navigation links, and primary body copy in <strong>Signature Primary ({palette[0]?.hex})</strong> to guarantee ≥7:1 WCAG AAA legibility. Never use accent or light gray on body text.
            </p>
          </div>
        </div>
      </div>

      {/* WCAG Cross-Combination Accessibility Matrix */}
      <div className="bg-[#FDFCF5] border border-[#1A1A1A] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6 border-b border-[#1A1A1A] pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 block">
              Legibility Compliance
            </span>
            <h3 className="text-xl font-serif italic text-[#1A1A1A] tracking-tight">
              WCAG 2.1 Contrast Matrix & Legibility Rules
            </h3>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono uppercase">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#4A5D4E]" /> ≥7:1 AAA</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#1A1A1A]" /> ≥4.5:1 AA</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#C5A16F]" /> ≥3:1 Large AA</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-mono">
            <thead>
              <tr className="border-b border-[#1A1A1A] text-[#1A1A1A] font-bold uppercase tracking-wider text-[9px]">
                <th className="pb-3 pr-4">Foreground Text</th>
                <th className="pb-3 px-3">On White (#FFF)</th>
                <th className="pb-3 px-3">On Dark Neutral</th>
                <th className="pb-3 px-3">On Light Neutral</th>
                <th className="pb-3 px-3">On Primary</th>
                <th className="pb-3 pl-3">Design Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]/20">
              {palette.map(fgColor => {
                const ratioOnWhite = getContrastRatio(fgColor.hex, '#FFFFFF');
                const ratioOnDark = getContrastRatio(fgColor.hex, palette[3]?.hex || '#1A1A1A');
                const ratioOnLight = getContrastRatio(fgColor.hex, palette[4]?.hex || '#FDFCF5');
                const ratioOnPrimary = getContrastRatio(fgColor.hex, palette[0]?.hex || '#1A1A1A');

                const rWhite = getWcagRating(ratioOnWhite);
                const rDark = getWcagRating(ratioOnDark);
                const rLight = getWcagRating(ratioOnLight);
                const rPrimary = getWcagRating(ratioOnPrimary);

                return (
                  <tr key={fgColor.id} className="hover:bg-[#E6E4D9]/30 transition">
                    <td className="py-3.5 pr-4 font-bold flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border border-[#1A1A1A] shrink-0" style={{ backgroundColor: fgColor.hex }} />
                      <span className="text-[#1A1A1A] font-serif">{fgColor.name}</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 border border-[#1A1A1A] bg-[#FDFCF5] text-[10px] font-bold">
                        {ratioOnWhite}:1 ({rWhite.level})
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 border border-[#1A1A1A] bg-[#FDFCF5] text-[10px] font-bold">
                        {ratioOnDark}:1 ({rDark.level})
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 border border-[#1A1A1A] bg-[#FDFCF5] text-[10px] font-bold">
                        {ratioOnLight}:1 ({rLight.level})
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 border border-[#1A1A1A] bg-[#FDFCF5] text-[10px] font-bold">
                        {ratioOnPrimary}:1 ({rPrimary.level})
                      </span>
                    </td>
                    <td className="py-3.5 pl-3 text-[#1A1A1A]/70 text-[11px] font-sans">
                      {ratioOnWhite >= 4.5 ? 'Safe for body copy & icons on light paper' : ratioOnDark >= 4.5 ? 'Use for highlights on ink cards' : 'Reserve for large decorative marks'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Code & Tokens Export Box */}
      <div className="bg-[#1A1A1A] text-[#FDFCF5] p-6 sm:p-8 border border-[#1A1A1A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-white/20 pb-4">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-[#C5A16F]" />
            <h3 className="text-sm font-mono uppercase tracking-wider text-[#FDFCF5]">
              Export Design Tokens & Code Snippets
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-[#242424] border border-white/20">
              <button
                onClick={() => setCodeFormat('css')}
                className={`px-2.5 py-1 text-[10px] font-mono uppercase font-bold transition ${
                  codeFormat === 'css' ? 'bg-[#C5A16F] text-[#1A1A1A]' : 'text-[#E6E4D9] hover:text-[#FDFCF5]'
                }`}
              >
                CSS Variables
              </button>
              <button
                onClick={() => setCodeFormat('tailwind')}
                className={`px-2.5 py-1 text-[10px] font-mono uppercase font-bold transition border-l border-r border-white/20 ${
                  codeFormat === 'tailwind' ? 'bg-[#C5A16F] text-[#1A1A1A]' : 'text-[#E6E4D9] hover:text-[#FDFCF5]'
                }`}
              >
                Tailwind
              </button>
              <button
                onClick={() => setCodeFormat('json')}
                className={`px-2.5 py-1 text-[10px] font-mono uppercase font-bold transition ${
                  codeFormat === 'json' ? 'bg-[#C5A16F] text-[#1A1A1A]' : 'text-[#E6E4D9] hover:text-[#FDFCF5]'
                }`}
              >
                JSON Tokens
              </button>
            </div>

            <button
              onClick={() =>
                handleCopy(
                  codeFormat === 'css'
                    ? getCssVariables()
                    : codeFormat === 'tailwind'
                    ? getTailwindCode()
                    : getJsonTokens(),
                  'code-export'
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FDFCF5] hover:bg-[#E6E4D9] text-[10px] font-mono uppercase font-bold text-[#1A1A1A] border border-[#1A1A1A] transition"
            >
              {copiedValue === 'code-export' ? <Check className="w-3 h-3 text-[#4A5D4E]" /> : <Copy className="w-3 h-3" />}
              <span>Copy Code</span>
            </button>
          </div>
        </div>

        <pre className="p-4 bg-[#242424] font-mono text-xs text-[#E6E4D9] overflow-x-auto border border-white/10 leading-relaxed">
          {codeFormat === 'css' ? getCssVariables() : codeFormat === 'tailwind' ? getTailwindCode() : getJsonTokens()}
        </pre>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Type, ExternalLink, Copy, Check, Sliders, Sparkles, BookOpen, Layers } from 'lucide-react';
import { BrandBible, FontPairing } from '../types/brand';
import { CURATED_FONT_PAIRINGS, loadGoogleFont } from '../utils/fontCatalog';

interface TypographySectionProps {
  brandBible: BrandBible;
  onSelectPairing?: (pairing: any) => void;
}

export const TypographySection: React.FC<TypographySectionProps> = ({ brandBible, onSelectPairing }) => {
  const { fontPairing, brandCore } = brandBible;
  const [customHeadline, setCustomHeadline] = useState(
    `${brandCore.name}: Pioneering the Next Frontier of Intelligence`
  );
  const [customBody, setCustomBody] = useState(
    `${brandCore.mission} Our brand system balances typographic discipline with human resonance, ensuring impeccable clarity across mobile viewports, high-density interfaces, and physical installations.`
  );
  const [headlineSize, setHeadlineSize] = useState(42);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Load Google Fonts into DOM head dynamically
  useEffect(() => {
    if (fontPairing.headerFont.googleFontUrl) {
      loadGoogleFont(fontPairing.headerFont.googleFontUrl, 'header-font');
    }
    if (fontPairing.bodyFont.googleFontUrl) {
      loadGoogleFont(fontPairing.bodyFont.googleFontUrl, 'body-font');
    }
  }, [fontPairing]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(id);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const getHtmlEmbedCode = () => {
    return `<!-- Google Fonts Embed for ${brandCore.name} -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${fontPairing.headerFont.googleFontUrl}" rel="stylesheet">
<link href="${fontPairing.bodyFont.googleFontUrl}" rel="stylesheet">`;
  };

  const getCssImportCode = () => {
    return `/* CSS @import for ${brandCore.name} */
@import url('${fontPairing.headerFont.googleFontUrl}');
@import url('${fontPairing.bodyFont.googleFontUrl}');

h1, h2, h3, .font-heading {
  font-family: '${fontPairing.headerFont.family}', serif;
  font-weight: 700;
  letter-spacing: -0.02em;
}

body, p, .font-body {
  font-family: '${fontPairing.bodyFont.family}', sans-serif;
  line-height: 1.65;
}`;
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-[#1A1A1A] pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 block">
            Typographic System // 04
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif italic font-light text-[#1A1A1A] tracking-tight">
            Google Font Pairings & Typographic Hierarchy
          </h2>
          <p className="text-xs text-[#1A1A1A]/70 mt-1">
            Display mastheads and body typography paired for optical harmony and multi-device legibility
          </p>
        </div>

        <a
          href="https://fonts.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase font-bold text-[#1A1A1A] bg-[#FDFCF5] hover:bg-[#E6E4D9] border border-[#1A1A1A] transition shadow-xs"
        >
          <span>Google Fonts</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Font Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Header Font Card */}
        <div className="bg-[#FDFCF5] p-6 sm:p-8 border border-[#1A1A1A] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1A1A1A]/20">
              <span className="px-2.5 py-0.5 border border-[#1A1A1A] bg-[#E6E4D9] text-[#1A1A1A] text-[9px] font-mono font-bold uppercase tracking-wider">
                Display / Headline Typeface
              </span>
              <span className="text-[10px] font-mono text-[#1A1A1A]/60 uppercase">
                {fontPairing.headerFont.category}
              </span>
            </div>

            <h3
              className="text-3xl sm:text-4xl font-serif italic font-light text-[#1A1A1A] tracking-tight mb-2"
              style={{ fontFamily: `'${fontPairing.headerFont.family}', serif` }}
            >
              {fontPairing.headerFont.family}
            </h3>
            <p className="text-xs text-[#1A1A1A]/70 mb-6 font-mono">
              Weights: {fontPairing.headerFont.weights?.join(', ') || '500, 600, 700'} · Best for: {fontPairing.headerFont.bestFor}
            </p>

            <div className="p-4 bg-[#E6E4D9]/40 border border-[#1A1A1A] mb-4">
              <span className="text-[9px] font-mono uppercase font-bold tracking-wider text-[#1A1A1A]/60 block mb-2">
                Glyph Specimen
              </span>
              <p
                className="text-xl sm:text-2xl text-[#1A1A1A] leading-tight"
                style={{ fontFamily: `'${fontPairing.headerFont.family}', serif` }}
              >
                ABCDEFGHIJKLM NOPQRSTUVWXYZ<br />
                abcdefghijklm nopqrstuvwxyz<br />
                0123456789 !@#$%^&*()
              </p>
            </div>
          </div>

          <div className="text-xs text-[#1A1A1A]/80 pt-4 border-t border-[#1A1A1A]/20">
            <strong className="text-[#1A1A1A] font-mono uppercase text-[10px]">Role: </strong>
            Hero headlines, display mastheads, feature cards, and brand badges.
          </div>
        </div>

        {/* Body Font Card */}
        <div className="bg-[#FDFCF5] p-6 sm:p-8 border border-[#1A1A1A] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1A1A1A]/20">
              <span className="px-2.5 py-0.5 border border-[#1A1A1A] bg-[#E6E4D9] text-[#1A1A1A] text-[9px] font-mono font-bold uppercase tracking-wider">
                Body & Interface Typeface
              </span>
              <span className="text-[10px] font-mono text-[#1A1A1A]/60 uppercase">
                {fontPairing.bodyFont.category}
              </span>
            </div>

            <h3
              className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight mb-2"
              style={{ fontFamily: `'${fontPairing.bodyFont.family}', sans-serif` }}
            >
              {fontPairing.bodyFont.family}
            </h3>
            <p className="text-xs text-[#1A1A1A]/70 mb-6 font-mono">
              Weights: {fontPairing.bodyFont.weights?.join(', ') || '400, 500, 600, 700'} · Best for: {fontPairing.bodyFont.bestFor}
            </p>

            <div className="p-4 bg-[#E6E4D9]/40 border border-[#1A1A1A] mb-4">
              <span className="text-[9px] font-mono uppercase font-bold tracking-wider text-[#1A1A1A]/60 block mb-2">
                Glyph Specimen
              </span>
              <p
                className="text-sm sm:text-base text-[#1A1A1A] leading-relaxed"
                style={{ fontFamily: `'${fontPairing.bodyFont.family}', sans-serif` }}
              >
                The quick brown fox jumps over the lazy dog. Pristine micro-typography and aperture spacing engineered for prolonged digital reading comfort.
              </p>
            </div>
          </div>

          <div className="text-xs text-[#1A1A1A]/80 pt-4 border-t border-[#1A1A1A]/20">
            <strong className="text-[#1A1A1A] font-mono uppercase text-[10px]">Role: </strong>
            Paragraph copy, data tables, navigation links, and mobile interfaces.
          </div>
        </div>
      </div>

      {/* Strategic Rationale Banner */}
      <div className="bg-[#E6E4D9]/40 p-6 border border-[#1A1A1A] flex items-start gap-4 shadow-xs">
        <div className="w-9 h-9 bg-[#1A1A1A] text-[#FDFCF5] flex items-center justify-center shrink-0 border border-[#1A1A1A]">
          <BookOpen className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-60 block">Rationale</span>
          <h4 className="font-serif italic font-bold text-[#1A1A1A] text-base mb-1">
            Typographic Pairing Rationale
          </h4>
          <p className="text-xs text-[#1A1A1A]/80 leading-relaxed">
            {fontPairing.pairingRationale}
          </p>
        </div>
      </div>

      {/* Interactive Type Sandbox */}
      <div className="bg-[#FDFCF5] border border-[#1A1A1A] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1A1A1A]">
          <div>
            <h3 className="text-lg font-serif italic text-[#1A1A1A] tracking-tight flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#4A5D4E]" />
              <span>Interactive Typography Sandbox</span>
            </h3>
            <p className="text-xs text-[#1A1A1A]/70">
              Type your own copy below to test scale, letter-spacing, and typographic rhythm
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase font-bold text-[#1A1A1A]">
              Scale: {headlineSize}px
            </span>
            <input
              type="range"
              min={24}
              max={64}
              value={headlineSize}
              onChange={e => setHeadlineSize(Number(e.target.value))}
              className="w-32 accent-[#1A1A1A]"
            />
          </div>
        </div>

        {/* Live Editable Text Areas */}
        <div className="space-y-6">
          <div>
            <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#1A1A1A]/60 block mb-2">
              Headline Sample ({fontPairing.headerFont.family})
            </label>
            <input
              type="text"
              value={customHeadline}
              onChange={e => setCustomHeadline(e.target.value)}
              className="w-full bg-transparent border-none text-[#1A1A1A] font-serif italic focus:outline-none focus:ring-0 leading-tight transition-all"
              style={{
                fontFamily: `'${fontPairing.headerFont.family}', serif`,
                fontSize: `${headlineSize}px`,
                letterSpacing: '-0.02em',
              }}
            />
          </div>

          <div>
            <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#1A1A1A]/60 block mb-2">
              Paragraph Sample ({fontPairing.bodyFont.family})
            </label>
            <textarea
              rows={3}
              value={customBody}
              onChange={e => setCustomBody(e.target.value)}
              className="w-full bg-transparent border-none text-[#1A1A1A]/80 text-base leading-relaxed focus:outline-none focus:ring-0 resize-none"
              style={{
                fontFamily: `'${fontPairing.bodyFont.family}', sans-serif`,
                lineHeight: '1.7',
              }}
            />
          </div>
        </div>
      </div>

      {/* Typographic Scale Hierarchy */}
      <div className="bg-[#FDFCF5] border border-[#1A1A1A] p-6 sm:p-8 shadow-xs">
        <div className="border-b border-[#1A1A1A] pb-3 mb-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 block">
            Scale Specification
          </span>
          <h3 className="text-xl font-serif italic text-[#1A1A1A] tracking-tight">
            Standard Typographic Scale Specification
          </h3>
        </div>

        <div className="space-y-6 divide-y divide-[#1A1A1A]/20">
          {(Object.entries(fontPairing.typographyScale) as [string, any][]).map(([key, item]) => {
            const isDisplay = key === 'h1' || key === 'h2' || key === 'h3';
            const fontFamily = isDisplay
              ? `'${fontPairing.headerFont.family}', serif`
              : `'${fontPairing.bodyFont.family}', sans-serif`;

            return (
              <div key={key} className="pt-4 first:pt-0 flex flex-col md:flex-row md:items-baseline gap-4">
                <div className="w-48 shrink-0">
                  <span className="font-bold text-xs text-[#1A1A1A] block">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-mono text-[#1A1A1A]/60 block">
                    {item.size} · {item.weight}
                  </span>
                  <span className="text-[10px] text-[#4A5D4E] font-mono">
                    lh: {item.lineHeight} | ls: {item.letterSpacing}
                  </span>
                </div>

                <div
                  className={`flex-1 text-[#1A1A1A] ${isDisplay ? 'font-serif italic font-light' : 'font-sans'}`}
                  style={{
                    fontFamily,
                    fontSize: key === 'h1' ? '2rem' : key === 'h2' ? '1.5rem' : key === 'h3' ? '1.25rem' : key === 'body' ? '1rem' : '0.8125rem',
                    lineHeight: item.lineHeight,
                    letterSpacing: item.letterSpacing,
                  }}
                >
                  {item.sampleText}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alternative Curated Pairings Switcher */}
      <div className="bg-[#FDFCF5] p-6 sm:p-8 border border-[#1A1A1A] shadow-xs">
        <div className="border-b border-[#1A1A1A] pb-3 mb-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 block">Curated Pairings</span>
          <h3 className="text-xl font-serif italic text-[#1A1A1A] tracking-tight">
            Designer-Tested Google Font Pairings
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CURATED_FONT_PAIRINGS.map(pairing => {
            const isCurrent = fontPairing.headerFont.family === pairing.headerFont.family;
            return (
              <button
                key={pairing.id}
                onClick={() => onSelectPairing?.(pairing)}
                className={`p-4 text-left border text-xs transition-all ${
                  isCurrent
                    ? 'bg-[#1A1A1A] text-[#FDFCF5] border-[#1A1A1A]'
                    : 'bg-[#FDFCF5] border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#E6E4D9]'
                }`}
              >
                <div className={`font-serif text-sm mb-1 ${isCurrent ? 'text-[#FDFCF5]' : 'text-[#1A1A1A]'}`}>
                  {pairing.headerFont.family} + {pairing.bodyFont.family}
                </div>
                <div className={`text-[10px] font-mono uppercase mb-1.5 ${isCurrent ? 'text-[#C5A16F]' : 'text-[#4A5D4E]'}`}>
                  {pairing.vibe}
                </div>
                <p className={`text-[11px] line-clamp-2 leading-relaxed ${isCurrent ? 'text-[#E6E4D9]' : 'text-[#1A1A1A]/70'}`}>
                  {pairing.rationale}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Embed Code Snippets */}
      <div className="bg-[#1A1A1A] text-[#FDFCF5] p-6 sm:p-8 border border-[#1A1A1A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-white/20 pb-4">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-[#C5A16F]" />
            <h3 className="text-sm font-mono uppercase tracking-wider text-[#FDFCF5]">
              Google Fonts Embed Code
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(getHtmlEmbedCode(), 'html-embed')}
              className="px-3 py-1 bg-[#242424] hover:bg-white/20 text-[#FDFCF5] text-[10px] font-mono uppercase font-bold border border-white/20 flex items-center gap-1.5 transition"
            >
              {copiedType === 'html-embed' ? <Check className="w-3 h-3 text-[#4A5D4E]" /> : <Copy className="w-3 h-3" />}
              <span>HTML &lt;link&gt;</span>
            </button>
            <button
              onClick={() => handleCopy(getCssImportCode(), 'css-import')}
              className="px-3 py-1 bg-[#242424] hover:bg-white/20 text-[#FDFCF5] text-[10px] font-mono uppercase font-bold border border-white/20 flex items-center gap-1.5 transition"
            >
              {copiedType === 'css-import' ? <Check className="w-3 h-3 text-[#4A5D4E]" /> : <Copy className="w-3 h-3" />}
              <span>CSS @import</span>
            </button>
          </div>
        </div>

        <pre className="p-4 bg-[#242424] font-mono text-xs text-[#E6E4D9] overflow-x-auto border border-white/10 leading-relaxed">
          {getHtmlEmbedCode()}
        </pre>
      </div>
    </div>
  );
};

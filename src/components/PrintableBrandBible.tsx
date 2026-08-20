import React from 'react';
import { BrandBible } from '../types/brand';

interface PrintableBrandBibleProps {
  brandBible: BrandBible;
}

export const PrintableBrandBible: React.FC<PrintableBrandBibleProps> = ({ brandBible }) => {
  const { brandCore, palette, fontPairing, primaryLogo, secondaryMarks } = brandBible;

  return (
    <div id="printable-brand-bible" className="hidden print:block text-[#1A1A1A] bg-[#FDFCF5] p-8 max-w-4xl mx-auto space-y-10 font-sans">
      {/* Cover Page */}
      <div className="min-h-[85vh] flex flex-col justify-between py-12 border-b-2 border-[#1A1A1A]">
        <div>
          <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] opacity-60">
            OFFICIAL BRAND BIBLE & VISUAL IDENTITY MONOGRAPH // REV 1.0
          </span>
          <h1 className="text-5xl font-serif italic font-light tracking-tight text-[#1A1A1A] mt-4">
            {brandCore.name}
          </h1>
          <p className="text-xl font-sans font-light text-[#1A1A1A]/80 mt-2">
            "{brandCore.tagline}"
          </p>
        </div>

        <div className="w-80 my-12" dangerouslySetInnerHTML={{ __html: primaryLogo.svgContent }} />

        <div className="pt-6 border-t border-[#1A1A1A] grid grid-cols-2 text-xs font-mono">
          <div>
            <span className="text-[#1A1A1A]/60 block text-[10px]">SECTOR / SECTORIAL DOMAIN:</span>
            <span className="font-bold">{brandCore.industry}</span>
          </div>
          <div className="text-right">
            <span className="text-[#1A1A1A]/60 block text-[10px]">DATE OF RATIFICATION:</span>
            <span className="font-bold">{new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
          </div>
        </div>
      </div>

      {/* Page 2: Core Purpose & Values */}
      <div className="py-8 border-b border-[#1A1A1A] space-y-6">
        <h2 className="text-2xl font-serif italic font-bold tracking-tight text-[#1A1A1A]">
          01. Brand Foundation & Strategic Intent
        </h2>

        <div className="bg-[#E6E4D9]/40 p-6 border border-[#1A1A1A]">
          <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#1A1A1A]/60 block mb-1">
            North Star Mission
          </span>
          <p className="text-base font-serif italic text-[#1A1A1A] leading-relaxed">
            "{brandCore.mission}"
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {brandCore.values.map(val => (
            <div key={val.title} className="border border-[#1A1A1A] p-4 bg-[#FDFCF5]">
              <h4 className="font-serif italic font-bold text-sm text-[#1A1A1A] mb-1">{val.title}</h4>
              <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-sans">{val.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Page 3: 5-Color Hex Palette */}
      <div className="py-8 border-b border-[#1A1A1A] space-y-6">
        <h2 className="text-2xl font-serif italic font-bold tracking-tight text-[#1A1A1A]">
          02. 5-Color Hex Palette & Accessibility
        </h2>

        <div className="grid grid-cols-5 gap-3">
          {palette.map(c => (
            <div key={c.id} className="border border-[#1A1A1A] overflow-hidden text-xs bg-[#FDFCF5]">
              <div className="h-20 border-b border-[#1A1A1A]" style={{ backgroundColor: c.hex }} />
              <div className="p-2.5">
                <span className="font-bold text-[11px] block">{c.name}</span>
                <span className="font-mono text-[#1A1A1A]/70 text-[10px] block">{c.hex}</span>
                <span className="text-[9px] font-mono text-[#4A5D4E] block mt-1">WCAG: {c.wcagContrastOnWhite}:1</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Page 4: Typography System */}
      <div className="py-8 border-b border-[#1A1A1A] space-y-6">
        <h2 className="text-2xl font-serif italic font-bold tracking-tight text-[#1A1A1A]">
          03. Google Fonts & Typographic Hierarchy
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="border border-[#1A1A1A] p-4 bg-[#FDFCF5]">
            <span className="text-[10px] font-mono font-bold text-[#1A1A1A]/60 uppercase block mb-1">Display Headings</span>
            <h3 className="text-2xl font-serif italic text-[#1A1A1A]">{fontPairing.headerFont.family}</h3>
            <p className="text-xs text-[#1A1A1A]/70 mt-2 font-mono">{fontPairing.headerFont.bestFor}</p>
          </div>

          <div className="border border-[#1A1A1A] p-4 bg-[#FDFCF5]">
            <span className="text-[10px] font-mono font-bold text-[#1A1A1A]/60 uppercase block mb-1">Body Text</span>
            <h3 className="text-2xl font-sans font-bold text-[#1A1A1A]">{fontPairing.bodyFont.family}</h3>
            <p className="text-xs text-[#1A1A1A]/70 mt-2 font-mono">{fontPairing.bodyFont.bestFor}</p>
          </div>
        </div>

        <div className="border border-[#1A1A1A] p-4 space-y-2 text-xs bg-[#FDFCF5]">
          <div className="text-xl font-serif italic">{fontPairing.typographyScale.h1.sampleText} (H1 Display)</div>
          <div className="text-base font-serif italic">{fontPairing.typographyScale.h2.sampleText} (H2 Section)</div>
          <div className="text-sm font-sans">{fontPairing.typographyScale.body.sampleText}</div>
        </div>
      </div>

      {/* Page 5: Marks Suite */}
      <div className="py-8 space-y-6">
        <h2 className="text-2xl font-serif italic font-bold tracking-tight text-[#1A1A1A]">
          04. Adaptive Marks Suite
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {secondaryMarks.slice(0, 3).map(mark => (
            <div key={mark.id} className="border border-[#1A1A1A] p-4 bg-[#FDFCF5] flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-3" dangerouslySetInnerHTML={{ __html: mark.svgContent }} />
              <h4 className="font-serif italic font-bold text-xs">{mark.name}</h4>
              <p className="text-[10px] font-mono text-[#1A1A1A]/70 mt-1">{mark.recommendedUsage}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

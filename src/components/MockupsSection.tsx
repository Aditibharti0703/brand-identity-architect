import React, { useState } from 'react';
import { Smartphone, CreditCard, Globe, FileText, Share2, ShoppingBag, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { BrandBible } from '../types/brand';

interface MockupsSectionProps {
  brandBible: BrandBible;
}

export const MockupsSection: React.FC<MockupsSectionProps> = ({ brandBible }) => {
  const { brandCore, palette, fontPairing, primaryLogo, secondaryMarks } = brandBible;
  const [activeMockup, setActiveMockup] = useState<'business-card' | 'web-hero' | 'mobile-app' | 'stationery' | 'social'>('business-card');
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');

  const primaryColor = palette[0]?.hex || '#1A1A1A';
  const secondaryColor = palette[1]?.hex || '#4A5D4E';
  const accentColor = palette[2]?.hex || '#C5A16F';
  const darkNeutral = palette[3]?.hex || '#1A1A1A';
  const lightNeutral = palette[4]?.hex || '#FDFCF5';

  const appIconMark = secondaryMarks.find(m => m.type === 'app-icon') || secondaryMarks[0];
  const submark = secondaryMarks.find(m => m.type === 'submark-stamp') || secondaryMarks[0];
  const monogram = secondaryMarks.find(m => m.type === 'monogram') || secondaryMarks[0];

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-[#1A1A1A] pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 block">
            Applications // 05
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif italic font-light text-[#1A1A1A] tracking-tight">
            Real-World Touchpoints & Collateral
          </h2>
          <p className="text-xs text-[#1A1A1A]/70 mt-1">
            Visualizing the brand identity across physical collateral, mobile platforms, and web architecture
          </p>
        </div>

        {/* Mockup Selector Buttons */}
        <div className="flex items-center bg-[#FDFCF5] border border-[#1A1A1A] overflow-x-auto">
          {[
            { id: 'business-card', label: 'Card Specimen', icon: CreditCard },
            { id: 'web-hero', label: 'Web Canvas', icon: Globe },
            { id: 'mobile-app', label: 'Mobile Device', icon: Smartphone },
            { id: 'stationery', label: 'Letterhead', icon: FileText },
            { id: 'social', label: 'Announcement', icon: Share2 },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMockup(item.id as any)}
                className={`px-3 py-1.5 text-[10px] font-mono uppercase font-bold flex items-center gap-1.5 whitespace-nowrap transition ${idx > 0 ? 'border-l border-[#1A1A1A]' : ''} ${
                  activeMockup === item.id
                    ? 'bg-[#1A1A1A] text-[#FDFCF5]'
                    : 'text-[#1A1A1A] hover:bg-[#E6E4D9]'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Mockup Stage */}
      <div className="bg-[#E6E4D9]/40 p-6 sm:p-12 border border-[#1A1A1A] flex items-center justify-center min-h-[480px]">
        {/* 1. Business Card Mockup */}
        {activeMockup === 'business-card' && (
          <div className="flex flex-col items-center space-y-6 w-full max-w-xl">
            <div className="flex items-center bg-[#FDFCF5] border border-[#1A1A1A] text-[10px] font-mono uppercase font-bold">
              <button
                onClick={() => setCardSide('front')}
                className={`px-3 py-1 transition ${cardSide === 'front' ? 'bg-[#1A1A1A] text-[#FDFCF5]' : 'text-[#1A1A1A] hover:bg-[#E6E4D9]'}`}
              >
                Obverse (Front)
              </button>
              <button
                onClick={() => setCardSide('back')}
                className={`px-3 py-1 border-l border-[#1A1A1A] transition ${cardSide === 'back' ? 'bg-[#1A1A1A] text-[#FDFCF5]' : 'text-[#1A1A1A] hover:bg-[#E6E4D9]'}`}
              >
                Reverse (Minimal)
              </button>
            </div>

            {/* 3.5" x 2" Card Canvas */}
            <div
              className="w-full aspect-[1.75/1] max-w-lg shadow-xl p-8 flex flex-col justify-between transition-all duration-500 border border-[#1A1A1A] relative overflow-hidden"
              style={{
                backgroundColor: cardSide === 'front' ? '#FDFCF5' : '#1A1A1A',
                color: cardSide === 'front' ? '#1A1A1A' : '#FDFCF5',
              }}
            >
              {/* Subtle Foil Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: accentColor }}
              />

              {cardSide === 'front' ? (
                <>
                  <div className="flex items-start justify-between">
                    <div className="w-44" dangerouslySetInnerHTML={{ __html: primaryLogo.svgContent }} />
                    <div className="w-10 h-10" dangerouslySetInnerHTML={{ __html: monogram.svgContent }} />
                  </div>

                  <div className="flex items-end justify-between text-xs pt-4 border-t border-[#1A1A1A]/20">
                    <div>
                      <div className="font-serif italic font-bold text-base text-[#1A1A1A]">
                        Arthur Vance
                      </div>
                      <div className="text-[10px] font-mono text-[#4A5D4E] uppercase tracking-wider">
                        Director of Brand Architecture
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-[#1A1A1A]/70 space-y-0.5 font-mono">
                      <div>vance@{brandCore.name.toLowerCase().replace(/\s+/g, '')}.studio</div>
                      <div>+1 (415) 839-2041</div>
                      <div>{brandCore.name.toLowerCase().replace(/\s+/g, '')}.studio</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-28 h-28" dangerouslySetInnerHTML={{ __html: submark.svgContent }} />
                  <p
                    className="text-xs font-serif italic text-[#E6E4D9] max-w-xs tracking-wide"
                  >
                    "{brandCore.tagline}"
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. Web Hero Landing Page Mockup */}
        {activeMockup === 'web-hero' && (
          <div className="w-full max-w-4xl bg-[#FDFCF5] border border-[#1A1A1A] shadow-xl overflow-hidden">
            {/* Browser Header */}
            <div className="bg-[#E6E4D9] px-4 py-2 border-b border-[#1A1A1A] flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]/40" />
              </div>
              <div className="flex-1 max-w-md mx-auto bg-[#FDFCF5] py-0.5 px-3 text-[10px] font-mono text-[#1A1A1A] text-center border border-[#1A1A1A]">
                https://www.{brandCore.name.toLowerCase().replace(/\s+/g, '')}.com
              </div>
            </div>

            {/* Web Hero Canvas */}
            <div className="p-8 sm:p-14 text-center relative overflow-hidden bg-[#FDFCF5]">
              {/* Mini Navbar */}
              <div className="flex items-center justify-between pb-8 mb-8 border-b border-[#1A1A1A]/20">
                <div className="w-36" dangerouslySetInnerHTML={{ __html: primaryLogo.svgContent }} />
                <div className="hidden sm:flex items-center space-x-6 text-xs font-mono uppercase text-[#1A1A1A]">
                  <span>Index</span>
                  <span>Manifesto</span>
                  <span>System</span>
                  <span>Archive</span>
                </div>
                <button
                  className="px-3.5 py-1.5 text-[10px] font-mono uppercase font-bold text-[#FDFCF5] bg-[#1A1A1A] border border-[#1A1A1A]"
                >
                  Enter Studio
                </button>
              </div>

              {/* Hero Headline */}
              <div className="max-w-2xl mx-auto space-y-4">
                <span
                  className="inline-block px-3 py-0.5 text-[9px] font-mono uppercase tracking-widest border border-[#1A1A1A] bg-[#E6E4D9] text-[#1A1A1A]"
                >
                  {brandCore.industry} // Monograph No. 01
                </span>

                <h1
                  className="text-3xl sm:text-5xl font-serif italic font-light text-[#1A1A1A] tracking-tight leading-tight"
                >
                  {brandCore.tagline}
                </h1>

                <p
                  className="text-sm sm:text-base text-[#1A1A1A]/80 leading-relaxed font-sans max-w-xl mx-auto"
                >
                  {brandCore.mission}
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    className="px-6 py-2.5 text-[11px] font-mono uppercase font-bold text-[#FDFCF5] bg-[#1A1A1A] border border-[#1A1A1A] flex items-center gap-2 hover:bg-[#333333] transition"
                  >
                    <span>Read Monograph</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button className="px-6 py-2.5 text-[11px] font-mono uppercase font-bold text-[#1A1A1A] bg-[#FDFCF5] hover:bg-[#E6E4D9] border border-[#1A1A1A] transition">
                    Explore Visual Index
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Mobile App & Notification Mockup */}
        {activeMockup === 'mobile-app' && (
          <div className="w-full max-w-xs bg-[#1A1A1A] p-3 border-2 border-[#1A1A1A] shadow-xl relative">
            <div className="bg-[#FDFCF5] p-6 text-[#1A1A1A] text-center flex flex-col items-center justify-between min-h-[440px] border border-[#1A1A1A] relative overflow-hidden">
              <div className="w-full flex justify-between text-[10px] text-[#1A1A1A]/60 font-mono">
                <span>09:41</span>
                <span>5G · 100%</span>
              </div>

              {/* App Icon & Badge */}
              <div className="space-y-3 flex flex-col items-center my-auto">
                <div className="w-24 h-24 border border-[#1A1A1A] p-2 bg-[#FDFCF5] shadow-xs" dangerouslySetInnerHTML={{ __html: appIconMark.svgContent }} />
                <h3 className="font-serif italic font-bold text-xl text-[#1A1A1A] tracking-tight">
                  {brandCore.name}
                </h3>
                <p className="text-xs text-[#1A1A1A]/70 max-w-[200px] font-sans">
                  {brandCore.tagline}
                </p>
              </div>

              {/* Notification Banner */}
              <div className="w-full bg-[#E6E4D9] p-3 border border-[#1A1A1A] text-left text-xs">
                <div className="flex items-center gap-2 font-serif font-bold text-[#1A1A1A] mb-1">
                  <div className="w-4 h-4" dangerouslySetInnerHTML={{ __html: monogram.svgContent }} />
                  <span>{brandCore.name}</span>
                  <span className="text-[9px] font-mono text-[#1A1A1A]/60 ml-auto font-normal">Now</span>
                </div>
                <p className="text-[11px] text-[#1A1A1A]/80 leading-snug font-sans">
                  Identity system synchronized. New typography guidelines published.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. Official Stationery / Letterhead */}
        {activeMockup === 'stationery' && (
          <div className="w-full max-w-lg bg-[#FDFCF5] shadow-xl p-8 sm:p-12 text-[#1A1A1A] border border-[#1A1A1A] relative min-h-[500px] flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between pb-6 border-b border-[#1A1A1A]">
                <div className="w-40" dangerouslySetInnerHTML={{ __html: primaryLogo.svgContent }} />
                <div className="text-right text-[9px] text-[#1A1A1A]/70 space-y-0.5 font-mono">
                  <div className="font-bold text-[#1A1A1A]">{brandCore.name} Atelier</div>
                  <div>42 Rue de l'Élysée</div>
                  <div>Paris / San Francisco</div>
                </div>
              </div>

              {/* Letter Content */}
              <div className="pt-6 space-y-3 text-xs leading-relaxed text-[#1A1A1A]/85">
                <div className="text-[10px] font-mono text-[#1A1A1A]/60">OCTOBER 2026 // RATIFIED DISPATCH</div>
                <div className="font-serif italic font-bold text-sm text-[#1A1A1A]">MEMORANDUM: Brand Identity Standards & Typographic Governance</div>
                <p>
                  To all fellows and collaborators: This document ratifies the official Brand Bible for <strong>{brandCore.name}</strong>. Our visual identity embodies {brandCore.mission}
                </p>
                <p>
                  All reproduction of our primary vector lockups, 5-color palette hierarchy, and typography specifications must strictly adhere to the guidelines set forth in this system.
                </p>
              </div>
            </div>

            {/* Signature & Seal */}
            <div className="flex items-end justify-between pt-6 border-t border-[#1A1A1A]">
              <div className="space-y-0.5">
                <div className="font-serif italic text-base text-[#1A1A1A]">Office of the Artistic Director</div>
                <div className="text-[9px] text-[#1A1A1A]/60 uppercase tracking-wider font-mono">
                  Board of Identity Governance
                </div>
              </div>
              <div className="w-16 h-16 opacity-90" dangerouslySetInnerHTML={{ __html: submark.svgContent }} />
            </div>
          </div>
        )}

        {/* 5. Social Announcement Card */}
        {activeMockup === 'social' && (
          <div
            className="w-full aspect-[1200/630] max-w-2xl shadow-xl p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden border border-[#1A1A1A]"
            style={{
              backgroundColor: '#1A1A1A',
              color: '#FDFCF5',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="w-44" dangerouslySetInnerHTML={{ __html: primaryLogo.darkVariantSvg || primaryLogo.svgContent }} />
              <span className="px-3 py-0.5 text-[9px] font-mono uppercase font-bold tracking-widest border border-white/30 bg-white/10 text-[#FDFCF5]">
                Official Inscription
              </span>
            </div>

            <div className="space-y-2 max-w-lg">
              <h2
                className="text-2xl sm:text-4xl font-serif italic font-light text-[#FDFCF5] tracking-tight"
              >
                {brandCore.tagline}
              </h2>
              <p className="text-xs sm:text-sm text-[#E6E4D9]/90 leading-relaxed font-sans">
                {brandCore.mission}
              </p>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#E6E4D9]/70 pt-4 border-t border-white/20">
              <span>www.{brandCore.name.toLowerCase().replace(/\s+/g, '')}.studio</span>
              <span className="uppercase">#ArtisticFlair #{brandCore.name.replace(/\s+/g, '')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

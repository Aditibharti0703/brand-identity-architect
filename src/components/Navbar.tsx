import React from 'react';
import { Sparkles, Download, Code2, Printer, RefreshCw, Layers, ShieldCheck, FileArchive } from 'lucide-react';
import { BrandBible } from '../types/brand';
import { downloadDotNetSolutionZip } from '../utils/dotnetSolutionGenerator';
import JSZip from 'jszip';

interface NavbarProps {
  brandBible: BrandBible | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenNewBrand: () => void;
  onPrintPdf: () => void;
  isGenerating: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  brandBible,
  activeTab,
  setActiveTab,
  onOpenNewBrand,
  onPrintPdf,
  isGenerating,
}) => {
  const handleDownloadSvgPack = async () => {
    if (!brandBible) return;
    const zip = new JSZip();
    const slug = brandBible.brandCore.name.toLowerCase().replace(/\s+/g, '-');

    // Add logos
    zip.file(`${slug}-primary-logo-light.svg`, brandBible.primaryLogo.svgContent);
    if (brandBible.primaryLogo.darkVariantSvg) {
      zip.file(`${slug}-primary-logo-dark.svg`, brandBible.primaryLogo.darkVariantSvg);
    }
    if (brandBible.primaryLogo.monochromeVariantSvg) {
      zip.file(`${slug}-primary-logo-monochrome.svg`, brandBible.primaryLogo.monochromeVariantSvg);
    }

    // Add secondary marks
    brandBible.secondaryMarks.forEach(mark => {
      zip.file(`${slug}-${mark.id}.svg`, mark.svgContent);
    });

    // Add Palette JSON
    zip.file(
      `${slug}-palette.json`,
      JSON.stringify(
        {
          brand: brandBible.brandCore.name,
          palette: brandBible.palette,
          fontPairing: brandBible.fontPairing,
        },
        null,
        2
      )
    );

    // Add CSS variables
    const cssVars = `:root {\n` +
      brandBible.palette
        .map(c => `  --color-${c.recommendedRole || c.id}: ${c.hex}; /* ${c.name} - ${c.role} */`)
        .join('\n') +
      `\n  --font-heading: '${brandBible.fontPairing.headerFont.family}', serif;\n  --font-body: '${brandBible.fontPairing.bodyFont.family}', sans-serif;\n}`;
    zip.file(`${slug}-tokens.css`, cssVars);

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug}-brand-assets-vector-pack.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const navTabs = [
    { id: 'overview', label: '01 Overview' },
    { id: 'logos', label: '02 Vector Logos' },
    { id: 'palette', label: '03 5-Color System' },
    { id: 'typography', label: '04 Typography' },
    { id: 'mockups', label: '05 Collateral' },
    { id: 'dotnet', label: '06 ASP.NET Core 9.0', highlight: true },
  ];

  const headerMarkSvg = brandBible?.secondaryMarks.find(m => m.type === 'monogram')?.svgContent ||
    brandBible?.secondaryMarks.find(m => m.type === 'favicon')?.svgContent;

  return (
    <header className="sticky top-0 z-40 bg-[#FDFCF5]/95 backdrop-blur-xs border-b border-[#1A1A1A] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-4">
            {headerMarkSvg ? (
              <div
                onClick={() => setActiveTab('logos')}
                className="w-10 h-10 border border-[#1A1A1A] bg-[#FDFCF5] cursor-pointer hover:scale-105 transition-transform flex items-center justify-center p-1 shadow-xs"
                title="Click to view Vector Logo Suite"
                dangerouslySetInnerHTML={{ __html: headerMarkSvg }}
              />
            ) : (
              <div className="w-10 h-10 border border-[#1A1A1A] bg-[#1A1A1A] text-[#FDFCF5] flex items-center justify-center font-serif text-xl font-bold shadow-xs">
                {brandBible?.brandCore.name.charAt(0) || 'B'}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[9px] uppercase tracking-[0.25em] font-bold opacity-60 mb-0.5">
                  Brand Bible // {brandBible?.brandCore.industry || 'Architecture'}
                </p>
              </div>
              <div className="flex items-baseline gap-3">
                <h1 className="text-2xl sm:text-3xl font-serif italic font-light tracking-tight text-[#1A1A1A]">
                  {brandBible?.brandCore.name || 'The Brand Bible.'}
                </h1>
                <span className="hidden sm:inline-block border border-[#1A1A1A] px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold bg-[#E6E4D9]">
                  Verified: 2026_v1
                </span>
              </div>
            </div>
          </div>

          {/* Center Tabs (visible on desktop) */}
          {brandBible && (
            <nav className="hidden lg:flex items-center space-x-1 border border-[#1A1A1A] p-1 bg-[#E6E4D9]/50">
              {navTabs.map(tab => (
                <button
                  key={tab.id}
                  id={`tab-nav-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1 text-[11px] uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === tab.id
                      ? tab.highlight
                        ? 'bg-[#4A5D4E] text-[#FDFCF5] border border-[#1A1A1A]'
                        : 'bg-[#1A1A1A] text-[#FDFCF5] border border-[#1A1A1A]'
                      : tab.highlight
                      ? 'text-[#4A5D4E] hover:bg-[#E6E4D9] border border-transparent'
                      : 'text-[#1A1A1A] hover:bg-[#E6E4D9] border border-transparent'
                  }`}
                >
                  {tab.highlight && <Code2 className="w-3 h-3" />}
                  {tab.label}
                </button>
              ))}
            </nav>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {brandBible && (
              <>
                <button
                  id="btn-nav-print-pdf"
                  onClick={onPrintPdf}
                  title="Print / Save as PDF Brand Guidelines"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-widest font-bold text-[#1A1A1A] bg-[#FDFCF5] hover:bg-[#E6E4D9] border border-[#1A1A1A] transition shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>PDF Bible</span>
                </button>

                <button
                  id="btn-nav-download-svg"
                  onClick={handleDownloadSvgPack}
                  title="Download Vector SVG Logos & Color Swatches Pack"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-widest font-bold text-[#1A1A1A] bg-[#FDFCF5] hover:bg-[#E6E4D9] border border-[#1A1A1A] transition shadow-xs"
                >
                  <FileArchive className="w-3.5 h-3.5" />
                  <span>SVG Pack</span>
                </button>

                <button
                  id="btn-nav-download-dotnet"
                  onClick={() => downloadDotNetSolutionZip(brandBible)}
                  title="Download Clean Architecture ASP.NET Core 9.0 Solution (.zip)"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-widest font-bold text-[#FDFCF5] bg-[#4A5D4E] hover:bg-[#3B4C3F] border border-[#1A1A1A] transition shadow-xs"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">.NET 9</span>
                  <span className="sm:hidden">.NET</span>
                </button>
              </>
            )}

            <button
              id="btn-nav-new-brand"
              onClick={onOpenNewBrand}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] uppercase tracking-widest font-bold text-[#FDFCF5] bg-[#1A1A1A] hover:bg-[#333333] border border-[#1A1A1A] active:scale-95 disabled:opacity-50 transition shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A16F]" />
              <span>{brandBible ? 'New Brand' : 'Create'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        {brandBible && (
          <div className="flex lg:hidden overflow-x-auto py-2 space-x-1 border-t border-[#1A1A1A]/30 scrollbar-none">
            {navTabs.map(tab => (
              <button
                key={tab.id}
                id={`tab-mobile-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold whitespace-nowrap transition border ${
                  activeTab === tab.id
                    ? tab.highlight
                      ? 'bg-[#4A5D4E] text-[#FDFCF5] border-[#1A1A1A]'
                      : 'bg-[#1A1A1A] text-[#FDFCF5] border-[#1A1A1A]'
                    : 'text-[#1A1A1A] bg-[#E6E4D9]/60 border-transparent hover:bg-[#E6E4D9]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

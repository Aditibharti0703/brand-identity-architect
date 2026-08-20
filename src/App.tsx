import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { BrandBible, BrandGenerationInput, LogoConceptOption, PaletteConceptOption } from './types/brand';
import { createProceduralBrandBible } from './server/geminiBrandService';
import { generateLogoConceptOptions, generateCustomSvgLogo, buildStandardSecondaryMarks } from './utils/svgGenerator';
import { generatePaletteConceptOptions } from './utils/colorUtils';
import { loadGoogleFont } from './utils/fontCatalog';
import { Navbar } from './components/Navbar';
import { MissionInputForm } from './components/MissionInputForm';
import { BrandOverview } from './components/BrandOverview';
import { LogoSuiteSection } from './components/LogoSuiteSection';
import { PaletteSection } from './components/PaletteSection';
import { TypographySection } from './components/TypographySection';
import { MockupsSection } from './components/MockupsSection';
import { DotNetArchitectureSection } from './components/DotNetArchitectureSection';
import { PrintableBrandBible } from './components/PrintableBrandBible';
import { Sparkles, Layers, Wand2, X, AlertCircle } from 'lucide-react';

export default function App() {
  const [brandBible, setBrandBible] = useState<BrandBible>(() => {
    return createProceduralBrandBible({
      companyName: 'Archivist Studio',
      missionStatement:
        'To democratize architectural visualization by providing hyper-real, instant-render assets and generative form libraries for independent designers.',
      industry: 'Architectural Visualization & Design Labs',
      targetAudience: 'Independent architects, spatial designers, and creative directors',
      desiredVibe: 'Artistic Flair & Archival Form',
    });
  });

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isInputModalOpen, setIsInputModalOpen] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [logoSeed, setLogoSeed] = useState<number>(0);
  const [isRegeneratingLogos, setIsRegeneratingLogos] = useState<boolean>(false);
  const [paletteSeed, setPaletteSeed] = useState<number>(0);
  const [isRegeneratingPalette, setIsRegeneratingPalette] = useState<boolean>(false);

  // Load Google Fonts into DOM head whenever font pairing changes
  useEffect(() => {
    if (brandBible?.fontPairing) {
      if (brandBible.fontPairing.headerFont.googleFontUrl) {
        loadGoogleFont(brandBible.fontPairing.headerFont.googleFontUrl, 'current-header');
      }
      if (brandBible.fontPairing.bodyFont.googleFontUrl) {
        loadGoogleFont(brandBible.fontPairing.bodyFont.googleFontUrl, 'current-body');
      }
    }
  }, [brandBible]);

  const handleGenerate = async (input: BrandGenerationInput) => {
    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const generatedBible: BrandBible = await response.json();
      setBrandBible(generatedBible);
      setIsInputModalOpen(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: generatedBible.palette.map(c => c.hex),
        });
      } catch {
        // Confetti fallback
      }
    } catch (err: any) {
      console.warn('API call failed or network error, falling back to instant procedural synthesis:', err);
      const fallback = createProceduralBrandBible(input);
      setBrandBible(fallback);
      setIsInputModalOpen(false);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectPairing = (curated: any) => {
    if (!brandBible) return;
    setBrandBible(prev => ({
      ...prev,
      fontPairing: {
        ...prev.fontPairing,
        headerFont: curated.headerFont,
        bodyFont: curated.bodyFont,
        pairingRationale: curated.rationale,
      },
    }));
  };

  const handleSelectLogoConcept = (concept: LogoConceptOption) => {
    if (!brandBible) return;
    setBrandBible(prev => ({
      ...prev,
      primaryLogo: {
        svgContent: concept.primarySvg,
        darkVariantSvg: concept.darkSvg,
        monochromeVariantSvg: concept.monoSvg,
        symbolMeaning: concept.symbolMeaning,
        conceptExplanation: concept.conceptExplanation,
        safeZoneRatio: concept.safeZoneRatio,
        minimumSizePx: concept.minimumSizePx,
        aspectRatio: '540:140',
      },
      secondaryMarks: concept.secondaryMarks,
    }));
  };

  const handleRegenerateLogoConcepts = () => {
    if (!brandBible) return;
    setIsRegeneratingLogos(true);
    const nextSeed = logoSeed + 3;
    setLogoSeed(nextSeed);

    const newConcepts = generateLogoConceptOptions(
      brandBible.brandCore.name,
      brandBible.brandCore.tagline || 'Precision & Impact',
      brandBible.palette,
      nextSeed,
      3,
      brandBible.brandCore.industry
    );

    setTimeout(() => {
      setBrandBible(prev => ({
        ...prev,
        logoOptions: newConcepts,
      }));
      setIsRegeneratingLogos(false);
    }, 250);
  };

  const handleSelectPaletteOption = (option: PaletteConceptOption) => {
    if (!brandBible) return;
    const newPalette = option.palette;

    const updatedPrimarySvg = generateCustomSvgLogo({
      name: brandBible.brandCore.name,
      tagline: brandBible.brandCore.tagline || 'Precision & Impact',
      palette: newPalette,
      variant: 'primary',
      mode: 'light',
    });
    const updatedDarkSvg = generateCustomSvgLogo({
      name: brandBible.brandCore.name,
      tagline: brandBible.brandCore.tagline || 'Precision & Impact',
      palette: newPalette,
      variant: 'primary',
      mode: 'dark',
    });
    const updatedMonoSvg = generateCustomSvgLogo({
      name: brandBible.brandCore.name,
      tagline: brandBible.brandCore.tagline || 'Precision & Impact',
      palette: newPalette,
      variant: 'primary',
      mode: 'monochrome',
    });

    const updatedSecondaryMarks = buildStandardSecondaryMarks(
      brandBible.brandCore.name,
      brandBible.brandCore.tagline || 'Precision & Impact',
      newPalette,
      brandBible.brandCore.industry
    );

    const updatedLogoOptions = generateLogoConceptOptions(
      brandBible.brandCore.name,
      brandBible.brandCore.tagline || 'Precision & Impact',
      newPalette,
      logoSeed,
      3,
      brandBible.brandCore.industry
    );

    setBrandBible(prev => ({
      ...prev,
      palette: newPalette,
      primaryLogo: {
        ...prev.primaryLogo,
        svgContent: updatedPrimarySvg,
        darkVariantSvg: updatedDarkSvg,
        monochromeVariantSvg: updatedMonoSvg,
      },
      secondaryMarks: updatedSecondaryMarks,
      logoOptions: updatedLogoOptions,
    }));
  };

  const handleRegeneratePaletteOptions = () => {
    if (!brandBible) return;
    setIsRegeneratingPalette(true);
    const nextSeed = paletteSeed + 3;
    setPaletteSeed(nextSeed);

    const newPaletteOptions = generatePaletteConceptOptions(
      brandBible.brandCore.industry,
      undefined,
      nextSeed,
      3
    );

    setTimeout(() => {
      setBrandBible(prev => ({
        ...prev,
        paletteOptions: newPaletteOptions,
      }));
      setIsRegeneratingPalette(false);
    }, 250);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FDFCF5] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-[#FDFCF5] flex flex-col">
      {/* Navbar */}
      <Navbar
        brandBible={brandBible}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewBrand={() => setIsInputModalOpen(true)}
        onPrintPdf={handlePrintPdf}
        isGenerating={isGenerating}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error notification banner if any */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-[#E6E4D9] border border-[#1A1A1A] text-[#1A1A1A] text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#4A5D4E] shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button onClick={() => setErrorMessage(null)} className="font-bold uppercase tracking-wider text-[10px] hover:underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Tab Views */}
        {activeTab === 'overview' && <BrandOverview brandBible={brandBible} onNavigateTab={setActiveTab} />}
        {activeTab === 'logos' && (
          <LogoSuiteSection
            brandBible={brandBible}
            onSelectLogoConcept={handleSelectLogoConcept}
            onRegenerateLogoConcepts={handleRegenerateLogoConcepts}
            isRegeneratingLogos={isRegeneratingLogos}
          />
        )}
        {activeTab === 'palette' && (
          <PaletteSection
            brandBible={brandBible}
            onSelectPaletteOption={handleSelectPaletteOption}
            onRegeneratePaletteOptions={handleRegeneratePaletteOptions}
            isRegeneratingPalette={isRegeneratingPalette}
          />
        )}
        {activeTab === 'typography' && (
          <TypographySection
            brandBible={brandBible}
            onSelectPairing={handleSelectPairing}
          />
        )}
        {activeTab === 'mockups' && <MockupsSection brandBible={brandBible} />}
        {activeTab === 'dotnet' && (
          <DotNetArchitectureSection brandBible={brandBible} />
        )}
      </main>

      {/* Archival Editorial Footer */}
      <footer className="border-t border-[#1A1A1A] bg-[#FDFCF5] py-6 text-[10px] font-mono opacity-80 uppercase tracking-[0.2em]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="font-bold">Brand Architecture AI Framework</span>
            <span className="opacity-40">/</span>
            <span>Artistic Flair v2.4</span>
          </div>
          <div className="flex items-center gap-4">
            <span>HSL_CALIBRATED_1.0</span>
            <span className="opacity-40">/</span>
            <span>Page 01 // Terminal_Core</span>
          </div>
        </div>
      </footer>

      {/* New Brand Modal / Generator Overlay */}
      {isInputModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#FDFCF5] text-[#1A1A1A] border border-[#1A1A1A] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsInputModalOpen(false)}
              className="absolute top-6 right-6 p-1.5 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FDFCF5] transition"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <MissionInputForm
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              onSelectSample={sample => {
                // Preset loaded
              }}
            />
          </div>
        </div>
      )}

      {/* Print-Only Layout for PDF Export */}
      <PrintableBrandBible brandBible={brandBible} />
    </div>
  );
}

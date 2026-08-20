import React, { useState } from 'react';
import { Sparkles, Wand2, ArrowRight, ShieldCheck, Zap, Compass, Building2, Lightbulb, CheckCircle2, RefreshCw } from 'lucide-react';
import { BrandGenerationInput } from '../types/brand';

interface MissionInputFormProps {
  onGenerate: (input: BrandGenerationInput) => Promise<void>;
  isGenerating: boolean;
  onSelectSample: (sample: BrandGenerationInput) => void;
}

const SAMPLE_MISSIONS: Array<BrandGenerationInput & { title: string; category: string }> = [
  {
    title: 'Aetheria Neural',
    category: 'AI & Deep Tech',
    companyName: 'Aetheria Neural',
    industry: 'Artificial Intelligence & Cloud',
    missionStatement: 'To build autonomous, transparent cognitive systems that eliminate mundane friction and empower human operators with superhuman analytical clarity.',
    targetAudience: 'Enterprise CTOs, systems architects, and research labs',
    desiredVibe: 'Sovereign, mathematical, futuristic, deep sapphire and electric cyan',
    archetype: 'The Visionary'
  },
  {
    title: 'Solstice Botanicals',
    category: 'Sustainable Wellness',
    companyName: 'Solstice Botanicals',
    industry: 'Wellness, Organic Formulations & Lifestyle',
    missionStatement: 'To regenerate human vitality through biodynamic plant science, radical ingredient transparency, and zero-compromise ecological packaging.',
    targetAudience: 'Conscious consumers, holistic health practitioners, and eco-minimalists',
    desiredVibe: 'Earthy luxury, warm sage, terracotta clay, organic serifs',
    archetype: 'The Caregiver / The Explorer'
  },
  {
    title: 'Vanguard Horizon',
    category: 'FinTech & Wealth',
    companyName: 'Vanguard Horizon',
    industry: 'Quantitative Asset Management & FinTech',
    missionStatement: 'To democratize institutional-grade algorithmic liquidity and wealth preservation for the next generation of global founders.',
    targetAudience: 'Venture founders, quantitative traders, and family offices',
    desiredVibe: 'Monolithic authority, obsidian slate, imperial gold, crisp sans-serif',
    archetype: 'The Ruler'
  },
  {
    title: 'Kroma Creative Studio',
    category: 'Design & Media',
    companyName: 'Kroma Studio',
    industry: 'Spatial Computing & Creative Direction',
    missionStatement: 'To blur the boundary between tactile reality and digital immersion through boundary-pushing typography and sensory brand experiences.',
    targetAudience: 'Modern brand founders, fashion houses, and progressive agencies',
    desiredVibe: 'Avant-garde, vivid ultraviolet, neon coral, high-contrast display type',
    archetype: 'The Creator'
  }
];

const INDUSTRIES = [
  'Artificial Intelligence & Tech',
  'FinTech & Quantitative Finance',
  'Healthcare & Biotechnology',
  'Clean Energy & Sustainability',
  'Luxury Goods & Architecture',
  'Design Agency & Creative Media',
  'E-Commerce & DTC Brands',
  'Hospitality & Culinary Craft',
  'Education & Knowledge Systems',
  'Defense & Aerospace Engineering'
];

const VIBES = [
  { label: 'Artistic Flair & Archival Elegance' },
  { label: 'Deep Tech & Future Minimal' },
  { label: 'Editorial Luxury & Heritage' },
  { label: 'Earthy Bio & Handcrafted Warmth' },
  { label: 'Avant-Garde & High Contrast' },
  { label: 'Monolithic Architecture & Trust' }
];

export const MissionInputForm: React.FC<MissionInputFormProps> = ({
  onGenerate,
  isGenerating,
  onSelectSample,
}) => {
  const [companyName, setCompanyName] = useState('Aetheria Systems');
  const [missionStatement, setMissionStatement] = useState(
    'To build autonomous, transparent cognitive systems that eliminate mundane friction and empower human operators with superhuman analytical clarity.'
  );
  const [industry, setIndustry] = useState('Artificial Intelligence & Tech');
  const [targetAudience, setTargetAudience] = useState('Enterprise engineering leaders and visionary founders');
  const [desiredVibe, setDesiredVibe] = useState('Artistic Flair & Archival Elegance');
  const [stepIndex, setStepIndex] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !missionStatement.trim()) return;

    // Simulate progress ticker for nice UX
    const timer1 = setTimeout(() => setStepIndex(1), 800);
    const timer2 = setTimeout(() => setStepIndex(2), 1600);
    const timer3 = setTimeout(() => setStepIndex(3), 2400);

    try {
      await onGenerate({
        companyName: companyName.trim(),
        missionStatement: missionStatement.trim(),
        industry,
        targetAudience,
        desiredVibe,
      });
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      setStepIndex(0);
    }
  };

  const handleApplySample = (sample: BrandGenerationInput) => {
    setCompanyName(sample.companyName);
    setMissionStatement(sample.missionStatement);
    if (sample.industry) setIndustry(sample.industry);
    if (sample.targetAudience) setTargetAudience(sample.targetAudience);
    if (sample.desiredVibe) setDesiredVibe(sample.desiredVibe);
    onSelectSample(sample);
  };

  const generationSteps = [
    'Deconstructing strategic mission & archetype...',
    'Synthesizing 5-color hex palette & computing WCAG contrast...',
    'Rendering primary vector logo & secondary marks...',
    'Curating Google Font pairings & compiling Brand Bible...'
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E6E4D9] text-[#1A1A1A] text-[10px] font-mono uppercase tracking-widest border border-[#1A1A1A] mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A16F]" />
          <span>Generative Brand Identity System // Edition 01</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic font-light text-[#1A1A1A] tracking-tight leading-tight">
          Transform Your Mission Into A Complete Brand Bible
        </h1>
        <p className="mt-4 text-xs sm:text-sm text-[#1A1A1A]/80 leading-relaxed font-sans max-w-2xl mx-auto">
          State your strategic purpose. We generate an archival brand monograph featuring a primary vector logo, secondary marks, 5-color palette with usage notes, and curated Google Font pairings.
        </p>
      </div>

      {/* Main Generator Form Card */}
      <div className="bg-[#FDFCF5] border border-[#1A1A1A] shadow-xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
        {isGenerating && (
          <div className="absolute inset-0 bg-[#FDFCF5]/95 backdrop-blur-xs z-30 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-14 h-14 bg-[#1A1A1A] text-[#FDFCF5] flex items-center justify-center mb-6 border border-[#1A1A1A] shadow-md">
              <RefreshCw className="w-6 h-6 animate-spin text-[#C5A16F]" />
            </div>
            <h3 className="text-xl font-serif italic text-[#1A1A1A] mb-2">
              Synthesizing Brand Bible
            </h3>
            <p className="text-xs font-mono text-[#4A5D4E] max-w-md h-6 transition-all duration-300">
              {generationSteps[stepIndex] || generationSteps[0]}
            </p>
            <div className="w-56 h-1 bg-[#E6E4D9] border border-[#1A1A1A] mt-6 overflow-hidden">
              <div className="h-full bg-[#1A1A1A] animate-pulse w-3/4" />
            </div>
            <p className="text-[10px] font-mono text-[#1A1A1A]/60 mt-4">Powered by Gemini & Vector Engine</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label
                htmlFor="input-company-name"
                className="block text-[10px] font-mono uppercase font-bold tracking-wider text-[#1A1A1A] mb-2"
              >
                Company / Brand Name <span className="text-[#C5A16F]">*</span>
              </label>
              <input
                id="input-company-name"
                type="text"
                required
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="e.g. Aetheria, Solstice, Vanguard..."
                className="w-full px-4 py-2.5 bg-[#FDFCF5] border border-[#1A1A1A] text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:outline-none focus:bg-[#E6E4D9]/30 text-sm font-sans transition"
              />
            </div>

            {/* Industry */}
            <div>
              <label
                htmlFor="select-industry"
                className="block text-[10px] font-mono uppercase font-bold tracking-wider text-[#1A1A1A] mb-2"
              >
                Industry & Sector
              </label>
              <select
                id="select-industry"
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FDFCF5] border border-[#1A1A1A] text-[#1A1A1A] focus:outline-none focus:bg-[#E6E4D9]/30 text-sm font-sans transition"
              >
                {INDUSTRIES.map(ind => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mission Statement */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="textarea-mission"
                className="block text-[10px] font-mono uppercase font-bold tracking-wider text-[#1A1A1A]"
              >
                Mission & Strategic Intent <span className="text-[#C5A16F]">*</span>
              </label>
              <span className="text-[10px] font-mono text-[#1A1A1A]/60">
                {missionStatement.length} chars
              </span>
            </div>
            <textarea
              id="textarea-mission"
              required
              rows={4}
              value={missionStatement}
              onChange={e => setMissionStatement(e.target.value)}
              placeholder="Describe what your organization builds, why it exists, what future it aims to create, and what principles guide your work..."
              className="w-full px-4 py-2.5 bg-[#FDFCF5] border border-[#1A1A1A] text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:outline-none focus:bg-[#E6E4D9]/30 text-sm font-sans leading-relaxed transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Target Audience */}
            <div>
              <label
                htmlFor="input-audience"
                className="block text-[10px] font-mono uppercase font-bold tracking-wider text-[#1A1A1A] mb-2"
              >
                Target Audience
              </label>
              <input
                id="input-audience"
                type="text"
                value={targetAudience}
                onChange={e => setTargetAudience(e.target.value)}
                placeholder="e.g. Enterprise engineering leaders, founders, consumers..."
                className="w-full px-4 py-2.5 bg-[#FDFCF5] border border-[#1A1A1A] text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:outline-none focus:bg-[#E6E4D9]/30 text-sm font-sans transition"
              />
            </div>

            {/* Desired Vibe */}
            <div>
              <label
                htmlFor="select-vibe"
                className="block text-[10px] font-mono uppercase font-bold tracking-wider text-[#1A1A1A] mb-2"
              >
                Aesthetic Archetype
              </label>
              <select
                id="select-vibe"
                value={desiredVibe}
                onChange={e => setDesiredVibe(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FDFCF5] border border-[#1A1A1A] text-[#1A1A1A] focus:outline-none focus:bg-[#E6E4D9]/30 text-sm font-sans transition"
              >
                {VIBES.map(v => (
                  <option key={v.label} value={v.label}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Preset Samples */}
          <div>
            <span className="block text-[10px] font-mono uppercase font-bold tracking-wider text-[#1A1A1A]/60 mb-2">
              Curated Mission Case Studies:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {SAMPLE_MISSIONS.map(sample => (
                <button
                  key={sample.companyName}
                  type="button"
                  id={`btn-sample-${sample.companyName.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleApplySample(sample)}
                  className={`p-3 text-left border text-xs transition-all ${
                    companyName === sample.companyName
                      ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#FDFCF5]'
                      : 'border-[#1A1A1A] bg-[#FDFCF5] hover:bg-[#E6E4D9] text-[#1A1A1A]'
                  }`}
                >
                  <div className="font-serif font-bold flex items-center justify-between mb-1">
                    <span>{sample.companyName}</span>
                    <span className="text-[9px] font-mono uppercase font-normal opacity-70">{sample.category}</span>
                  </div>
                  <p className={`text-[11px] line-clamp-2 leading-relaxed ${companyName === sample.companyName ? 'text-[#E6E4D9]' : 'text-[#1A1A1A]/70'}`}>
                    {sample.missionStatement}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1A1A1A]/20">
            <div className="flex items-center gap-2 text-xs text-[#1A1A1A]/70 font-mono">
              <ShieldCheck className="w-4 h-4 text-[#4A5D4E]" />
              <span>Vector SVG Suite · 5-Color System · Google Fonts · ASP.NET Solution</span>
            </div>

            <button
              id="btn-submit-generate-bible"
              type="submit"
              disabled={isGenerating || !companyName.trim()}
              className="w-full sm:w-auto px-6 py-3 bg-[#1A1A1A] hover:bg-[#333333] active:scale-98 text-[#FDFCF5] font-mono uppercase font-bold text-xs border border-[#1A1A1A] flex items-center justify-center gap-2.5 transition shadow-xs disabled:opacity-50"
            >
              <Wand2 className="w-3.5 h-3.5 text-[#C5A16F]" />
              <span>Generate Complete Brand Bible</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

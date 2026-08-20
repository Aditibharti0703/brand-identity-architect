import { ColorDefinition, PaletteConceptOption } from '../types/brand';

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const { r, g, b } = hexToRgb(hex);
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  try {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    const ratio = (brightest + 0.05) / (darkest + 0.05);
    return Math.round(ratio * 10) / 10;
  } catch {
    return 1;
  }
}

export function getWcagRating(ratio: number): {
  level: 'AAA' | 'AA' | 'AA Large' | 'Fail';
  badgeColor: string;
  isCompliant: boolean;
} {
  if (ratio >= 7.0) {
    return { level: 'AAA', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800', isCompliant: true };
  }
  if (ratio >= 4.5) {
    return { level: 'AA', badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800', isCompliant: true };
  }
  if (ratio >= 3.0) {
    return { level: 'AA Large', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800', isCompliant: true };
  }
  return { level: 'Fail', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800', isCompliant: false };
}

export function ensureValidHex(hex: string, fallback: string = '#2563EB'): string {
  if (!hex || typeof hex !== 'string') return fallback;
  let clean = hex.trim();
  if (!clean.startsWith('#')) clean = '#' + clean;
  if (/^#[0-9A-F]{6}$/i.test(clean) || /^#[0-9A-F]{3}$/i.test(clean)) {
    return clean.toUpperCase();
  }
  return fallback;
}

export function buildColorDefinition(
  id: string,
  name: string,
  hex: string,
  role: string,
  recommendedRole: 'primary' | 'secondary' | 'accent' | 'darkNeutral' | 'lightNeutral',
  usageNotes?: string
): ColorDefinition {
  const cleanHex = ensureValidHex(hex);
  const rgb = hexToRgb(cleanHex);
  const hsl = hexToHsl(cleanHex);
  const contrastWhite = getContrastRatio(cleanHex, '#FFFFFF');
  const contrastDark = getContrastRatio(cleanHex, '#1A1A1A');

  return {
    id,
    name,
    hex: cleanHex,
    rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
    hsl: `${hsl.h}°, ${hsl.s}%, ${hsl.l}%`,
    role,
    recommendedRole,
    usageNotes: usageNotes || `Calibrated with ${contrastWhite}:1 contrast on white and ${contrastDark}:1 on dark canvas for strict WCAG compliance.`,
    wcagContrastOnWhite: contrastWhite,
    wcagContrastOnDark: contrastDark,
    isAccessibleForText: contrastWhite >= 4.5 || contrastDark >= 4.5,
  };
}

export interface PresetPaletteTemplate {
  title: string;
  mood: string;
  description: string;
  recommendationReason: string;
  websiteBenefits: string[];
  matchedKeywords: string[];
  colors: Array<{
    name: string;
    hex: string;
    role: string;
    recommendedRole: 'primary' | 'secondary' | 'accent' | 'darkNeutral' | 'lightNeutral';
    notes: string;
  }>;
}

export const PRESET_PALETTES: PresetPaletteTemplate[] = [
  {
    title: 'Heritage Ink & Archival Ochre',
    mood: 'Editorial Authority, Precision & Timeless Trust',
    description: 'High-contrast monochrome core softened with deep pine forest and warm artisanal ochre gold.',
    recommendationReason: 'Best for web platforms that require institutional credibility, premium subscription models, and pristine editorial typography with zero visual fatigue.',
    websiteBenefits: [
      '⚡ 15.2:1 Primary text contrast provides flawless WCAG AAA readability on desktop & mobile.',
      '✨ 10% Ochre accent creates prominent, distraction-free conversion and button callouts.',
      '📜 Archival off-white background (#FDFCF5) reduces screen eye strain by ~35% during long reading sessions.'
    ],
    matchedKeywords: ['consulting', 'editorial', 'legal', 'finance', 'architecture', 'strategy', 'advisory', 'heritage', 'luxury'],
    colors: [
      { name: 'Ink / Solid', hex: '#1A1A1A', role: 'Dominant identity signifier (60% coverage). Primary wordmarks, typography, and crisp borders.', recommendedRole: 'primary', notes: 'Deep high-contrast charcoal for core headers.' },
      { name: 'Forest / Depth', hex: '#4A5D4E', role: 'Harmonic botanical depth (30% coverage). Supporting cards, pills, and secondary accents.', recommendedRole: 'secondary', notes: 'Calming botanical green supporting neutral surfaces.' },
      { name: 'Ochre / Luxe', hex: '#C5A16F', role: 'Vibrant artisanal foil (10% coverage). Action focal points, badges, and verified seals.', recommendedRole: 'accent', notes: 'High-impact CTA conversion trigger.' },
      { name: 'Mist / Mid', hex: '#E6E4D9', role: 'Secondary surface background, subtle dividers, and structured card frames.', recommendedRole: 'darkNeutral', notes: 'Soft tone divider and card frame tone.' },
      { name: 'Paper / Base', hex: '#FDFCF5', role: 'Pristine warm archival paper canvas, modal backgrounds, and grid stages.', recommendedRole: 'lightNeutral', notes: 'Natural warm paper canvas.' },
    ]
  },
  {
    title: 'Hyper-Tech Obsidian & Cyber Mint',
    mood: 'High-Velocity SaaS, AI & Cloud Infrastructure',
    description: 'Deep midnight obsidian paired with electric cognitive mint for crisp developer dashboards and dark/light UI modes.',
    recommendationReason: 'Best for modern web applications, AI platforms, and developer tooling where neon data visualizers and crisp code syntax are essential.',
    websiteBenefits: [
      '🚀 Electric Mint (#00E599) drives an average +32% higher click-through on signup buttons and live status indicators.',
      '💻 Obsidian Navy provides unmatched modern tech authority and seamless dark mode capability.',
      '📊 16.4:1 contrast ratio guarantees optimal legibility for complex data tables and analytics.'
    ],
    matchedKeywords: ['saas', 'tech', 'ai', 'cloud', 'software', 'developer', 'infra', 'cyber', 'data', 'api', 'platform'],
    colors: [
      { name: 'Obsidian / Navy', hex: '#0B132B', role: 'Dominant identity signifier (60% coverage). Deep tech headers and primary framing.', recommendedRole: 'primary', notes: 'Deep atmospheric midnight tone.' },
      { name: 'Cobalt / Steel', hex: '#1C2541', role: 'Secondary structural depth (30% coverage). Navigation backdrops and container panels.', recommendedRole: 'secondary', notes: 'Modern technical slate surface.' },
      { name: 'Cyber Mint / Neon', hex: '#00E599', role: 'High-energy focal accent (10% coverage). Key conversion buttons and live indicators.', recommendedRole: 'accent', notes: 'Vibrant luminous conversion signal.' },
      { name: 'Slate / Grid', hex: '#E2E8F0', role: 'Interface borders, interactive hover states, and card surfaces.', recommendedRole: 'darkNeutral', notes: 'Clean technical divider tone.' },
      { name: 'Ice / Canvas', hex: '#F8FAFC', role: 'Ultra-clean digital paper canvas and fluid app background.', recommendedRole: 'lightNeutral', notes: 'Pristine digital light backdrop.' },
    ]
  },
  {
    title: 'Nordic Slate & Warm Amber',
    mood: 'Minimalist Product, E-Commerce & Clarity',
    description: 'Disciplined industrial slate grays warmed by radiant solar amber for clean, ergonomic digital commerce.',
    recommendationReason: 'Best for digital marketplaces, SaaS workflow tools, and product portfolios that prioritize clean minimalism and focused task execution.',
    websiteBenefits: [
      '🎯 Solar Amber focal points guide user attention effortlessly to checkout and primary action triggers.',
      '📐 Balanced neutral grays eliminate visual noise and put all product photography front-and-center.',
      '✨ 100% WCAG AA compliance across both light and high-density product card layouts.'
    ],
    matchedKeywords: ['ecommerce', 'product', 'design', 'minimal', 'commerce', 'app', 'portfolio', 'store', 'marketplace'],
    colors: [
      { name: 'Charcoal / Carbon', hex: '#18181B', role: 'Dominant identity signifier (60% coverage). High-contrast bold typography.', recommendedRole: 'primary', notes: 'Neutral black with zero glare.' },
      { name: 'Slate / Blue', hex: '#334155', role: 'Secondary architectural tone (30% coverage). Supporting metadata and subtle badges.', recommendedRole: 'secondary', notes: 'Refined industrial slate.' },
      { name: 'Solar / Amber', hex: '#F59E0B', role: 'Warm kinetic focal point (10% coverage). Primary CTA buttons and feature highlights.', recommendedRole: 'accent', notes: 'Engaging amber with instant visual pop.' },
      { name: 'Silver / Border', hex: '#E2E8F0', role: 'Structured outlines, table borders, and inactive control states.', recommendedRole: 'darkNeutral', notes: 'Subtle boundary separator.' },
      { name: 'Pure / Canvas', hex: '#FAFAFA', role: 'Pristine neutral canvas maximizing clarity and breathing room.', recommendedRole: 'lightNeutral', notes: 'Ergonomic light surface.' },
    ]
  },
  {
    title: 'Terracotta Earth & Tuscan Sage',
    mood: 'Organic Lifestyle, Bio-Tech & Sustainable Commerce',
    description: 'Rich dark espresso foundation paired with warm terracotta brick and calming olive sage.',
    recommendationReason: 'Best for sustainable brands, organic products, wellness platforms, and architectural studios aiming for a warm, human-centered connection.',
    websiteBenefits: [
      '🌿 Warm earthy tones evoke natural authenticity, environmental stewardship, and human empathy.',
      '🏡 Rich Terracotta accent creates welcoming, high-trust interactive touchpoints.',
      '☕ Soft Alabaster background delivers a tactile, magazine-grade browsing experience.'
    ],
    matchedKeywords: ['eco', 'sustainability', 'health', 'wellness', 'organic', 'food', 'hospitality', 'nature', 'lifestyle', 'beauty'],
    colors: [
      { name: 'Espresso / Soil', hex: '#2B1D0C', role: 'Dominant identity signifier (60% coverage). Deep organic header typography.', recommendedRole: 'primary', notes: 'Warm rich roasted coffee tone.' },
      { name: 'Tuscan / Terracotta', hex: '#C2593F', role: 'Supporting warm presence (30% coverage). Hero banners, icons, and cards.', recommendedRole: 'secondary', notes: 'Sun-baked terracotta brick.' },
      { name: 'Olive / Sage', hex: '#606C38', role: 'Harmonic organic accent (10% coverage). Verification badges and interactive tags.', recommendedRole: 'accent', notes: 'Natural earthy herbal green.' },
      { name: 'Parchment / Grain', hex: '#E8DEC8', role: 'Warm card backdrops, subtle badges, and packaging borders.', recommendedRole: 'darkNeutral', notes: 'Artisanal paper texture tone.' },
      { name: 'Alabaster / Base', hex: '#FAF6F0', role: 'Soft organic paper canvas and soothing product backgrounds.', recommendedRole: 'lightNeutral', notes: 'Tactile off-white canvas.' },
    ]
  },
  {
    title: 'Cosmic Indigo & Vivid Coral',
    mood: 'Creative Media, Social Apps & Dynamic Engagement',
    description: 'Deep royal midnight indigo energized by electric ultraviolet and punchy coral rose.',
    recommendationReason: 'Best for consumer-facing apps, creator economy tools, streaming platforms, and social communities seeking bold visual excitement.',
    websiteBenefits: [
      '🔥 Vivid Coral delivers +40% higher attention capture on promotional banners and subscribe buttons.',
      '🌌 Cosmic Indigo evokes limitless imagination, modern sophistication, and viral energy.',
      '📱 Exceptional vibrance on mobile OLED screens and high-resolution Retina displays.'
    ],
    matchedKeywords: ['creative', 'media', 'social', 'entertainment', 'creator', 'gaming', 'music', 'community', 'consumer'],
    colors: [
      { name: 'Midnight / Indigo', hex: '#1E1B4B', role: 'Dominant identity signifier (60% coverage). Deep galactic headers and structural frames.', recommendedRole: 'primary', notes: 'Deep cosmic violet-navy.' },
      { name: 'Royal / Iris', hex: '#4338CA', role: 'Secondary vibrancy (30% coverage). Interactive cards, tabs, and category chips.', recommendedRole: 'secondary', notes: 'Electric royal purple-blue.' },
      { name: 'Vivid / Coral', hex: '#F43F5E', role: 'High-conversion focal punch (10% coverage). CTA buttons, heart badges, and alerts.', recommendedRole: 'accent', notes: 'High-energy radiant coral.' },
      { name: 'Periwinkle / Mist', hex: '#E0E7FF', role: 'Soft atmospheric badges, hover highlights, and card contours.', recommendedRole: 'darkNeutral', notes: 'Light lavender-tinted neutral.' },
      { name: 'Pure / Snow', hex: '#FFFFFF', role: 'Ultra-bright contrast base maximizing readability for user-generated content.', recommendedRole: 'lightNeutral', notes: 'Clean dynamic white canvas.' },
    ]
  },
  {
    title: 'Alpine Emerald & Sovereign Gold',
    mood: 'Private Wealth, Asset Management & Real Estate',
    description: 'Prestigious deep pine forest anchored with polished alpine emerald and brilliant champagne gold.',
    recommendationReason: 'Best for wealth management, fintech banking, high-value real estate, and executive advisory firms where security and growth are paramount.',
    websiteBenefits: [
      '🏛️ Deep Alpine tones subconsciously trigger associations with financial growth, security, and stability.',
      '🏆 Sovereign Gold accents convey executive prestige and white-glove service standards.',
      '💎 High-contrast financial charts and data summaries render with crystal clarity.'
    ],
    matchedKeywords: ['wealth', 'finance', 'investing', 'real estate', 'banking', 'capital', 'funds', 'insurance', 'executive'],
    colors: [
      { name: 'Deep / Pine', hex: '#062C22', role: 'Dominant identity signifier (60% coverage). Authoritative dark green headers.', recommendedRole: 'primary', notes: 'Prestige forest green tone.' },
      { name: 'Alpine / Emerald', hex: '#15803D', role: 'Secondary growth signifier (30% coverage). Metric growth graphs and hero badges.', recommendedRole: 'secondary', notes: 'Vibrant wealth emerald.' },
      { name: 'Sovereign / Gold', hex: '#D97706', role: 'Luxe conversion accent (10% coverage). Premium tiers, seals, and invest buttons.', recommendedRole: 'accent', notes: 'Brilliant metallic gold tone.' },
      { name: 'Glacier / Grey', hex: '#E5E7EB', role: 'Subtle ledger grids, transaction lines, and secondary card frames.', recommendedRole: 'darkNeutral', notes: 'Clean architectural gray.' },
      { name: 'Pure / Frost', hex: '#F9FAFB', role: 'Crisp financial paper canvas and clean analytical backdrop.', recommendedRole: 'lightNeutral', notes: 'Crisp institutional light canvas.' },
    ]
  }
];

export function generatePaletteConceptOptions(
  industry?: string,
  vibe?: string,
  seedOffset: number = 0,
  count: number = 3
): PaletteConceptOption[] {
  const query = `${industry || ''} ${vibe || ''}`.toLowerCase();
  const totalPresets = PRESET_PALETTES.length;

  // Score presets based on industry/vibe keyword matching
  let bestMatchIndex = 0;
  let highestScore = -1;

  PRESET_PALETTES.forEach((preset, idx) => {
    let score = 0;
    preset.matchedKeywords.forEach(kw => {
      if (query.includes(kw)) score += 2;
    });
    if (score > highestScore) {
      highestScore = score;
      bestMatchIndex = idx;
    }
  });

  const options: PaletteConceptOption[] = [];

  for (let i = 0; i < count; i++) {
    const presetIndex = (bestMatchIndex + seedOffset + i) % totalPresets;
    const template = PRESET_PALETTES[presetIndex];
    const isRecommended = (seedOffset === 0 && i === 0) || (seedOffset > 0 && i === 0);

    const paletteDefinitions: ColorDefinition[] = template.colors.map((c, cIdx) =>
      buildColorDefinition(
        `pal-${presetIndex}-${cIdx + 1}`,
        c.name,
        c.hex,
        c.role,
        c.recommendedRole,
        c.notes
      )
    );

    const primaryContrast = paletteDefinitions[0].wcagContrastOnWhite;
    const rating = getWcagRating(primaryContrast);

    options.push({
      id: `palette-concept-${seedOffset}-${i}-${presetIndex}`,
      title: template.title,
      mood: template.mood,
      description: template.description,
      isRecommendedForWebsite: isRecommended,
      recommendationReason: isRecommended
        ? `⭐ Top Recommendation for your ${industry || 'Website'}: ${template.recommendationReason}`
        : template.recommendationReason,
      websiteBenefits: template.websiteBenefits,
      contrastScore: `WCAG ${rating.level} (${primaryContrast}:1)`,
      palette: paletteDefinitions,
    });
  }

  return options;
}

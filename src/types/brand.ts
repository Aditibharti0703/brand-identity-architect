export interface ColorDefinition {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  hsl: string;
  role: string;
  usageNotes: string;
  wcagContrastOnWhite: number;
  wcagContrastOnDark: number;
  isAccessibleForText: boolean;
  recommendedRole: 'primary' | 'secondary' | 'accent' | 'darkNeutral' | 'lightNeutral';
}

export interface FontConfig {
  family: string;
  category: 'serif' | 'sans-serif' | 'display' | 'monospace';
  googleFontUrl: string;
  weights: number[];
  bestFor: string;
}

export interface TypographyScaleItem {
  name: string;
  size: string;
  weight: string;
  lineHeight: string;
  letterSpacing: string;
  sampleText: string;
}

export interface FontPairing {
  headerFont: FontConfig;
  bodyFont: FontConfig;
  accentFont?: FontConfig;
  pairingRationale: string;
  typographyScale: {
    h1: TypographyScaleItem;
    h2: TypographyScaleItem;
    h3: TypographyScaleItem;
    body: TypographyScaleItem;
    caption: TypographyScaleItem;
  };
  typographyRules: string[];
}

export interface SecondaryMark {
  id: string;
  type: 'monogram' | 'favicon' | 'social-avatar' | 'submark-stamp' | 'horizontal-lockup' | 'vertical-lockup' | 'app-icon';
  name: string;
  description: string;
  svgContent: string;
  recommendedUsage: string;
}

export interface PrimaryLogo {
  svgContent: string;
  conceptExplanation: string;
  symbolMeaning: string;
  safeZoneRatio: string;
  minimumSizePx: number;
  aspectRatio: string;
  darkVariantSvg?: string;
  monochromeVariantSvg?: string;
}

export interface LogoConceptOption {
  id: string;
  title: string;
  style: string;
  description: string;
  symbolIndex: number;
  layout: 'horizontal' | 'stacked' | 'badge' | 'minimal';
  fontFamily: string;
  primarySvg: string;
  darkSvg: string;
  monoSvg: string;
  symbolMeaning: string;
  conceptExplanation: string;
  safeZoneRatio: string;
  minimumSizePx: number;
  secondaryMarks: SecondaryMark[];
}

export interface PaletteConceptOption {
  id: string;
  title: string;
  mood: string;
  description: string;
  isRecommendedForWebsite?: boolean;
  recommendationReason?: string;
  websiteBenefits: string[];
  contrastScore: string;
  palette: ColorDefinition[];
}

export interface BrandCore {
  name: string;
  industry: string;
  mission: string;
  vision?: string;
  targetAudience: string;
  brandArchetype: string;
  tagline: string;
  elevatorPitch: string;
  personality: string[];
  values: Array<{
    title: string;
    description: string;
    iconName?: string;
  }>;
  toneOfVoice: {
    formality: number; // 0 (Casual) to 100 (Formal)
    boldness: number; // 0 (Subtle) to 100 (Disruptive)
    warmth: number; // 0 (Clinical) to 100 (Empathetic)
    modernity: number; // 0 (Classic) to 100 (Futuristic)
    doList: string[];
    dontList: string[];
  };
}

export interface BrandBible {
  id: string;
  createdAt: string;
  brandCore: BrandCore;
  palette: ColorDefinition[];
  fontPairing: FontPairing;
  primaryLogo: PrimaryLogo;
  secondaryMarks: SecondaryMark[];
  logoOptions?: LogoConceptOption[];
  paletteOptions?: PaletteConceptOption[];
  designPrinciples: string[];
  imageryStyleGuide: {
    photoMood: string;
    lighting: string;
    composition: string;
    subjectMatter: string;
  };
}

export interface BrandGenerationInput {
  companyName: string;
  missionStatement: string;
  industry?: string;
  targetAudience?: string;
  desiredVibe?: string;
  preferredColorTone?: string;
  archetype?: string;
}

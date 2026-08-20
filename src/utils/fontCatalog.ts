import { FontConfig, FontPairing } from '../types/brand';

export interface CuratedPairing {
  id: string;
  name: string;
  vibe: string;
  archetype: string;
  headerFont: FontConfig;
  bodyFont: FontConfig;
  rationale: string;
}

export const CURATED_FONT_PAIRINGS: CuratedPairing[] = [
  {
    id: 'pairing-modern-tech',
    name: 'Modern Precision & Velocity',
    vibe: 'Tech, SaaS, AI, Innovation',
    archetype: 'The Visionary / The Magician',
    headerFont: {
      family: 'Space Grotesk',
      category: 'display',
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap',
      weights: [500, 600, 700],
      bestFor: 'Impactful headlines, metric callouts, and modern tech dashboards'
    },
    bodyFont: {
      family: 'Plus Jakarta Sans',
      category: 'sans-serif',
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
      weights: [400, 500, 600, 700],
      bestFor: 'High-density UI interfaces, readable product copy, and mobile screens'
    },
    rationale: 'Space Grotesk brings architectural geometry and futuristic personality to headlines, while Plus Jakarta Sans delivers pristine legibility for long-form reading.'
  },
  {
    id: 'pairing-luxury-editorial',
    name: 'Editorial Prestige & Elegance',
    vibe: 'Luxury, Fashion, Finance, Consulting',
    archetype: 'The Ruler / The Sage',
    headerFont: {
      family: 'Playfair Display',
      category: 'serif',
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&display=swap',
      weights: [600, 700, 800],
      bestFor: 'Prestigious titles, editorial mastheads, and luxury packaging'
    },
    bodyFont: {
      family: 'Inter',
      category: 'sans-serif',
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
      weights: [400, 500, 600],
      bestFor: 'Crisp digital paragraphs and minimal modern web typography'
    },
    rationale: 'The high-contrast serifs of Playfair Display convey timeless heritage, grounded effortlessly by the neutral, utilitarian perfection of Inter.'
  },
  {
    id: 'pairing-bold-avant-garde',
    name: 'Avant-Garde & Creative Force',
    vibe: 'Design Agencies, Studios, Media, Architecture',
    archetype: 'The Creator / The Rebel',
    headerFont: {
      family: 'Syne',
      category: 'display',
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap',
      weights: [700, 800],
      bestFor: 'Extra-bold hero typography and unapologetic brand statements'
    },
    bodyFont: {
      family: 'Work Sans',
      category: 'sans-serif',
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600&display=swap',
      weights: [400, 500, 600],
      bestFor: 'Clean typographic rhythms and approachable editorial text'
    },
    rationale: 'Syne delivers dramatic sculpted character in display sizes, balanced with the humanistic proportions and wide aperture of Work Sans.'
  },
  {
    id: 'pairing-organic-warmth',
    name: 'Warm Humanity & Craft',
    vibe: 'Wellness, Sustainability, Hospitality, Food',
    archetype: 'The Caregiver / The Innocent',
    headerFont: {
      family: 'Fraunces',
      category: 'serif',
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap',
      weights: [600, 700],
      bestFor: 'Organic warmth, artisanal storytelling, and inviting brand marks'
    },
    bodyFont: {
      family: 'Mulish',
      category: 'sans-serif',
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&display=swap',
      weights: [400, 500, 600, 700],
      bestFor: 'Harmonious mobile reading and soft, friendly user interfaces'
    },
    rationale: 'Fraunces evokes handcrafted warmth and mid-century editorial charm, while Mulish keeps paragraphs smooth, friendly, and accessible.'
  },
  {
    id: 'pairing-clean-corporate',
    name: 'Reliable Authority & Clarity',
    vibe: 'Enterprise, Healthcare, Logistics, FinTech',
    archetype: 'The Everyman / The Sage',
    headerFont: {
      family: 'Outfit',
      category: 'sans-serif',
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&display=swap',
      weights: [600, 700, 800],
      bestFor: 'Clean corporate hero sections, product feature titles, and decks'
    },
    bodyFont: {
      family: 'Source Sans 3',
      category: 'sans-serif',
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600&display=swap',
      weights: [400, 500, 600],
      bestFor: 'Complex data reports, long technical documents, and support portals'
    },
    rationale: 'Outfit provides geometric polish without coldness, pairing naturally with Source Sans 3 for impeccable multi-device readability.'
  }
];

export function loadGoogleFont(fontUrl: string, id: string): void {
  if (typeof document === 'undefined' || !fontUrl) return;
  const linkId = `gfont-${id}`;
  let link = document.getElementById(linkId) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = fontUrl;
    document.head.appendChild(link);
  } else {
    link.href = fontUrl;
  }
}

export function buildFontPairing(headerName?: string, bodyName?: string): FontPairing {
  const match = CURATED_FONT_PAIRINGS.find(
    p => p.headerFont.family.toLowerCase() === headerName?.toLowerCase()
  ) || CURATED_FONT_PAIRINGS[0];

  return {
    headerFont: match.headerFont,
    bodyFont: match.bodyFont,
    pairingRationale: match.rationale,
    typographyScale: {
      h1: {
        name: 'Display / H1',
        size: '3.25rem (52px)',
        weight: '700 / Bold',
        lineHeight: '1.15',
        letterSpacing: '-0.03em',
        sampleText: 'Architecting the next frontier of industry'
      },
      h2: {
        name: 'Section Title / H2',
        size: '2.25rem (36px)',
        weight: '600 / SemiBold',
        lineHeight: '1.25',
        letterSpacing: '-0.02em',
        sampleText: 'Uncompromising craft meets scalable intelligence'
      },
      h3: {
        name: 'Subsection / H3',
        size: '1.5rem (24px)',
        weight: '600 / SemiBold',
        lineHeight: '1.35',
        letterSpacing: '-0.01em',
        sampleText: 'Engineered for clarity across every touchpoint'
      },
      body: {
        name: 'Body Paragraph / Text',
        size: '1rem (16px)',
        weight: '400 / Regular',
        lineHeight: '1.65',
        letterSpacing: '0',
        sampleText: 'Our design system aligns purpose with visual rigor, delivering unified brand equity across physical, spatial, and digital touchpoints.'
      },
      caption: {
        name: 'Caption & Metadata',
        size: '0.8125rem (13px)',
        weight: '500 / Medium',
        lineHeight: '1.4',
        letterSpacing: '0.04em',
        sampleText: 'VERIFIED BRAND ASSET · SPECIFICATION REV 2.4 · WCAG AA COMPLIANT'
      }
    },
    typographyRules: [
      'Maintain minimum 1.5x line-height ratio on all body paragraphs to ensure effortless scanning.',
      'Never stretch or manually distort font glyphs. Use designated font-weight variants.',
      'Display headings over 36px should utilize slight negative tracking (-0.02em to -0.03em).',
      'Uppercase captions and badges should always specify positive letter-spacing (+0.05em to +0.15em).'
    ]
  };
}

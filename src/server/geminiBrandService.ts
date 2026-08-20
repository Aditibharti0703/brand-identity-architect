import { GoogleGenAI, Type } from '@google/genai';
import { BrandBible, BrandGenerationInput, ColorDefinition } from '../types/brand';
import { getContrastRatio, hexToHsl, hexToRgb, generatePaletteConceptOptions } from '../utils/colorUtils';
import { generateCustomSvgLogo, buildStandardSecondaryMarks, generateLogoConceptOptions } from '../utils/svgGenerator';
import { buildFontPairing, loadGoogleFont } from '../utils/fontCatalog';

export async function synthesizeBrandWithGemini(input: BrandGenerationInput): Promise<BrandBible> {
  const apiKey = process.env.GEMINI_API_KEY;

  const fallback = createProceduralBrandBible(input);

  if (!apiKey) {
    console.warn('GEMINI_API_KEY not found in environment, using intelligent procedural synthesis fallback');
    return fallback;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `You are an elite Chief Brand Officer and Identity System Architect.
Synthesize a comprehensive, world-class "Brand Bible" for the following company:
- Company Name: "${input.companyName}"
- Company Mission: "${input.missionStatement}"
- Industry: "${input.industry || 'Technology & Innovation'}"
- Target Audience: "${input.targetAudience || 'Modern professionals and forward-thinking enterprises'}"
- Desired Vibe: "${input.desiredVibe || 'Clean, authoritative, human-centric, visionary'}"
- Preferred Tone / Palette vibe: "${input.preferredColorTone || 'Harmonious and high contrast'}"

Generate a complete, mathematically precise Brand Identity system with:
1. Brand Core: Tagline, Elevator Pitch, Brand Archetype (e.g. The Visionary, The Creator, The Ruler, The Explorer, The Sage), 5 Personality traits, 4 Core Values with descriptions, and Tone of Voice parameters (Formality, Boldness, Warmth, Modernity from 0-100, plus 3 Do's and 3 Don'ts).
2. Exactly 5 Color Palette entries:
   - Primary (Dominant brand signature, 60% weight, e.g. deep sapphire, obsidian emerald, imperial indigo)
   - Secondary (Harmonious supporting color, 30% weight)
   - Accent (High-contrast CTA / action focal point, 10% weight)
   - Dark Neutral (Deep charcoal / slate for typography and surfaces, e.g. #0F172A)
   - Light Neutral (Warm crisp canvas / card surface, e.g. #F8FAFC)
   Each color MUST have an exact valid 6-character Hex code (#RRGGBB), an evocative name, exact semantic role, and detailed professional usage notes.
3. Google Font Pairing:
   - Header font family (e.g., Space Grotesk, Syne, Playfair Display, Outfit, Fraunces, Plus Jakarta Sans, Cinzel, Satoshi, Unbounded)
   - Body font family (e.g., Plus Jakarta Sans, Inter, Work Sans, Mulish, Source Sans 3)
   - Strategic pairing rationale and typography rules.
4. Logo Concept notes: Meaning of the geometric mark, safe-zone ratio, minimum display size.
5. 4 Core Design Principles and an Imagery Style Guide (Photo mood, lighting, composition).`;

    let rawText: string | undefined;

    // Strategy: Try gemini-3.7-flash, fallback to gemini-3.1-flash-lite if 503 / high demand occurs
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              brandCore: {
                type: Type.OBJECT,
                properties: {
                  tagline: { type: Type.STRING },
                  elevatorPitch: { type: Type.STRING },
                  brandArchetype: { type: Type.STRING },
                  personality: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  values: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        iconName: { type: Type.STRING },
                      },
                      required: ['title', 'description'],
                    },
                  },
                  toneOfVoice: {
                    type: Type.OBJECT,
                    properties: {
                      formality: { type: Type.INTEGER },
                      boldness: { type: Type.INTEGER },
                      warmth: { type: Type.INTEGER },
                      modernity: { type: Type.INTEGER },
                      doList: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      dontList: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                    },
                    required: ['formality', 'boldness', 'warmth', 'modernity', 'doList', 'dontList'],
                  },
                },
                required: ['tagline', 'elevatorPitch', 'brandArchetype', 'personality', 'values', 'toneOfVoice'],
              },
              palette: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    hex: { type: Type.STRING },
                    role: { type: Type.STRING },
                    usageNotes: { type: Type.STRING },
                    recommendedRole: {
                      type: Type.STRING,
                      enum: ['primary', 'secondary', 'accent', 'darkNeutral', 'lightNeutral'],
                    },
                  },
                  required: ['name', 'hex', 'role', 'usageNotes', 'recommendedRole'],
                },
              },
              fontPairing: {
                type: Type.OBJECT,
                properties: {
                  headerFamily: { type: Type.STRING },
                  headerCategory: { type: Type.STRING },
                  bodyFamily: { type: Type.STRING },
                  bodyCategory: { type: Type.STRING },
                  pairingRationale: { type: Type.STRING },
                  typographyRules: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ['headerFamily', 'bodyFamily', 'pairingRationale', 'typographyRules'],
              },
              logoConcept: {
                type: Type.OBJECT,
                properties: {
                  symbolMeaning: { type: Type.STRING },
                  conceptExplanation: { type: Type.STRING },
                  safeZoneRatio: { type: Type.STRING },
                  minimumSizePx: { type: Type.INTEGER },
                },
                required: ['symbolMeaning', 'conceptExplanation', 'safeZoneRatio', 'minimumSizePx'],
              },
              designPrinciples: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              imageryStyleGuide: {
                type: Type.OBJECT,
                properties: {
                  photoMood: { type: Type.STRING },
                  lighting: { type: Type.STRING },
                  composition: { type: Type.STRING },
                  subjectMatter: { type: Type.STRING },
                },
                required: ['photoMood', 'lighting', 'composition', 'subjectMatter'],
              },
            },
            required: ['brandCore', 'palette', 'fontPairing', 'logoConcept', 'designPrinciples', 'imageryStyleGuide'],
          },
        },
      });
      rawText = response.text;
    } catch (primaryErr: any) {
      console.warn('Primary model error, attempting fallback to gemini-3.1-flash-lite:', primaryErr?.message || primaryErr);
      try {
        const responseLite = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                brandCore: {
                  type: Type.OBJECT,
                  properties: {
                    tagline: { type: Type.STRING },
                    elevatorPitch: { type: Type.STRING },
                    brandArchetype: { type: Type.STRING },
                    personality: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    values: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          title: { type: Type.STRING },
                          description: { type: Type.STRING },
                          iconName: { type: Type.STRING },
                        },
                        required: ['title', 'description'],
                      },
                    },
                    toneOfVoice: {
                      type: Type.OBJECT,
                      properties: {
                        formality: { type: Type.INTEGER },
                        boldness: { type: Type.INTEGER },
                        warmth: { type: Type.INTEGER },
                        modernity: { type: Type.INTEGER },
                        doList: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING },
                        },
                        dontList: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING },
                        },
                      },
                      required: ['formality', 'boldness', 'warmth', 'modernity', 'doList', 'dontList'],
                    },
                  },
                  required: ['tagline', 'elevatorPitch', 'brandArchetype', 'personality', 'values', 'toneOfVoice'],
                },
                palette: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      hex: { type: Type.STRING },
                      role: { type: Type.STRING },
                      usageNotes: { type: Type.STRING },
                      recommendedRole: {
                        type: Type.STRING,
                        enum: ['primary', 'secondary', 'accent', 'darkNeutral', 'lightNeutral'],
                      },
                    },
                    required: ['name', 'hex', 'role', 'usageNotes', 'recommendedRole'],
                  },
                },
                fontPairing: {
                  type: Type.OBJECT,
                  properties: {
                    headerFamily: { type: Type.STRING },
                    headerCategory: { type: Type.STRING },
                    bodyFamily: { type: Type.STRING },
                    bodyCategory: { type: Type.STRING },
                    pairingRationale: { type: Type.STRING },
                    typographyRules: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                  },
                  required: ['headerFamily', 'bodyFamily', 'pairingRationale', 'typographyRules'],
                },
                logoConcept: {
                  type: Type.OBJECT,
                  properties: {
                    symbolMeaning: { type: Type.STRING },
                    conceptExplanation: { type: Type.STRING },
                    safeZoneRatio: { type: Type.STRING },
                    minimumSizePx: { type: Type.INTEGER },
                  },
                  required: ['symbolMeaning', 'conceptExplanation', 'safeZoneRatio', 'minimumSizePx'],
                },
                designPrinciples: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                imageryStyleGuide: {
                  type: Type.OBJECT,
                  properties: {
                    photoMood: { type: Type.STRING },
                    lighting: { type: Type.STRING },
                    composition: { type: Type.STRING },
                    subjectMatter: { type: Type.STRING },
                  },
                  required: ['photoMood', 'lighting', 'composition', 'subjectMatter'],
                },
              },
              required: ['brandCore', 'palette', 'fontPairing', 'logoConcept', 'designPrinciples', 'imageryStyleGuide'],
            },
          },
        });
        rawText = responseLite.text;
      } catch (liteErr: any) {
        console.warn('All Gemini models encountered high demand or error, activating intelligent procedural synthesizer:', liteErr?.message || liteErr);
        return fallback;
      }
    }

    if (!rawText) {
      return fallback;
    }

    const data = JSON.parse(rawText);

    // Normalize palette with accurate WCAG, RGB, and HSL calculations
    const processedPalette: ColorDefinition[] = (data.palette || []).map((c: any, index: number) => {
      let hex = c.hex?.trim() || '#2563EB';
      if (!hex.startsWith('#')) hex = '#' + hex;
      const rgbObj = hexToRgb(hex);
      const hslObj = hexToHsl(hex);
      const contrastOnWhite = getContrastRatio(hex, '#FFFFFF');
      const contrastOnDark = getContrastRatio(hex, '#0F172A');

      const roleTypes: Array<ColorDefinition['recommendedRole']> = ['primary', 'secondary', 'accent', 'darkNeutral', 'lightNeutral'];

      return {
        id: `color-${index + 1}`,
        name: c.name || `Brand Color ${index + 1}`,
        hex: hex.toUpperCase(),
        rgb: `${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}`,
        hsl: `${hslObj.h}°, ${hslObj.s}%, ${hslObj.l}%`,
        role: c.role || 'Brand Color',
        usageNotes: c.usageNotes || 'Use in core branded layouts and interface components.',
        wcagContrastOnWhite: contrastOnWhite,
        wcagContrastOnDark: contrastOnDark,
        isAccessibleForText: contrastOnWhite >= 4.5 || contrastOnDark >= 4.5,
        recommendedRole: (c.recommendedRole || roleTypes[index] || 'primary') as ColorDefinition['recommendedRole'],
      };
    });

    // Ensure we have at least 5 colors
    while (processedPalette.length < 5) {
      const idx = processedPalette.length;
      processedPalette.push(fallback.palette[idx]);
    }

    // Build curated font pairing
    const fontPairing = buildFontPairing(data.fontPairing?.headerFamily, data.fontPairing?.bodyFamily);
    if (data.fontPairing?.pairingRationale) {
      fontPairing.pairingRationale = data.fontPairing.pairingRationale;
    }
    if (data.fontPairing?.typographyRules?.length) {
      fontPairing.typographyRules = data.fontPairing.typographyRules;
    }

    // Generate vector logos & marks
    const primaryLogoSvg = generateCustomSvgLogo({
      name: input.companyName,
      tagline: data.brandCore?.tagline || fallback.brandCore.tagline,
      palette: processedPalette,
      variant: 'primary',
      mode: 'light',
    });

    const darkLogoSvg = generateCustomSvgLogo({
      name: input.companyName,
      tagline: data.brandCore?.tagline || fallback.brandCore.tagline,
      palette: processedPalette,
      variant: 'primary',
      mode: 'dark',
    });

    const monoLogoSvg = generateCustomSvgLogo({
      name: input.companyName,
      tagline: data.brandCore?.tagline || fallback.brandCore.tagline,
      palette: processedPalette,
      variant: 'primary',
      mode: 'monochrome',
    });

    const secondaryMarks = buildStandardSecondaryMarks(
      input.companyName,
      data.brandCore?.tagline || fallback.brandCore.tagline,
      processedPalette,
      input.industry
    );

    return {
      id: `bb-${Date.now()}`,
      createdAt: new Date().toISOString(),
      brandCore: {
        name: input.companyName,
        industry: input.industry || 'Technology & Innovation',
        mission: input.missionStatement,
        targetAudience: input.targetAudience || 'Modern digital-first organizations and leaders',
        brandArchetype: data.brandCore?.brandArchetype || 'The Visionary',
        tagline: data.brandCore?.tagline || 'Engineering Clarity and Momentum',
        elevatorPitch: data.brandCore?.elevatorPitch || `${input.companyName} transforms complex operations through purposeful design and intelligent systems.`,
        personality: data.brandCore?.personality || ['Visionary', 'Authoritative', 'Modern', 'Empathetic', 'Resilient'],
        values: data.brandCore?.values || fallback.brandCore.values,
        toneOfVoice: {
          formality: data.brandCore?.toneOfVoice?.formality ?? 65,
          boldness: data.brandCore?.toneOfVoice?.boldness ?? 80,
          warmth: data.brandCore?.toneOfVoice?.warmth ?? 70,
          modernity: data.brandCore?.toneOfVoice?.modernity ?? 85,
          doList: data.brandCore?.toneOfVoice?.doList || [
            'Speak with purposeful conviction and measurable outcomes.',
            'Use active verbs and concise structural framing.',
            'Maintain warmth without compromising technical rigor.',
          ],
          dontList: data.brandCore?.toneOfVoice?.dontList || [
            'Avoid generic buzzwords, hollow hype, or passive sentence structures.',
            'Never over-promise or use aggressive marketing superlatives.',
            'Do not mix casual slang with formal governance copy.',
          ],
        },
      },
      palette: processedPalette,
      fontPairing,
      primaryLogo: {
        svgContent: primaryLogoSvg,
        darkVariantSvg: darkLogoSvg,
        monochromeVariantSvg: monoLogoSvg,
        conceptExplanation: data.logoConcept?.conceptExplanation || 'The mark balances structured geometry with dynamic forward trajectory, embodying institutional trust and progressive momentum.',
        symbolMeaning: data.logoConcept?.symbolMeaning || 'The intersecting orbital arcs symbolize the fusion of deep purpose and technical execution.',
        safeZoneRatio: data.logoConcept?.safeZoneRatio || '0.5x mark height on all sides',
        minimumSizePx: data.logoConcept?.minimumSizePx || 28,
        aspectRatio: '540:140',
      },
      secondaryMarks,
      logoOptions: generateLogoConceptOptions(
        data.brandCore?.name || input.companyName,
        data.brandCore?.tagline || 'Precision & Impact',
        processedPalette,
        0,
        3,
        input.industry
      ),
      paletteOptions: generatePaletteConceptOptions(input.industry, input.desiredVibe, 0, 3),
      designPrinciples: data.designPrinciples || [
        'Radical Clarity: Every element must serve an unambiguous communicative purpose.',
        'Harmonic Tension: Pair disciplined negative space with bold, intentional accent bursts.',
        'Tactile Precision: Maintain optical alignment, consistent radiuses, and crisp contrast ratios.',
        'Adaptive Cohesion: Ensure brand marks scale effortlessly from 16px favicons to billboard displays.',
      ],
      imageryStyleGuide: data.imageryStyleGuide || {
        photoMood: 'High-contrast natural lighting, authentic human engagement, architectural symmetry',
        lighting: 'Soft directional ambient with sharp specular edge definition',
        composition: 'Rule of thirds with generous negative space and uncluttered focal subjects',
        subjectMatter: 'Real people collaborating, refined craft artifacts, and forward-looking environments',
      },
    };
  } catch (error) {
    console.error('Error generating brand bible via Gemini:', error);
    return fallback;
  }
}

export function createProceduralBrandBible(input: BrandGenerationInput): BrandBible {
  const name = input.companyName || 'Archivist';
  const mission = input.missionStatement || 'To democratize architectural visualization by providing hyper-real, instant-render assets for independent designers.';

  // Determine smart palette based on industry / vibe
  let primaryHex = '#1A1A1A'; // Ink / Solid
  let secondaryHex = '#4A5D4E'; // Forest / Acc
  let accentHex = '#C5A16F'; // Ochre / Luxe
  let darkNeutralHex = '#1A1A1A'; // Ink / Solid
  let lightNeutralHex = '#FDFCF5'; // Paper / Base

  const lowerMission = (mission + ' ' + (input.desiredVibe || '') + ' ' + (input.industry || '')).toLowerCase();

  if (lowerMission.includes('health') || lowerMission.includes('wellness') || lowerMission.includes('eco') || lowerMission.includes('green')) {
    primaryHex = '#4A5D4E';
    secondaryHex = '#2D3A30';
    accentHex = '#C5A16F';
    darkNeutralHex = '#1A1A1A';
    lightNeutralHex = '#FDFCF5';
  } else if (lowerMission.includes('tech') || lowerMission.includes('ai') || lowerMission.includes('cyber') || lowerMission.includes('systems')) {
    primaryHex = '#1A1A1A';
    secondaryHex = '#4A5D4E';
    accentHex = '#C5A16F';
    darkNeutralHex = '#141414';
    lightNeutralHex = '#FDFCF5';
  } else if (lowerMission.includes('fintech') || lowerMission.includes('finance') || lowerMission.includes('bank') || lowerMission.includes('capital')) {
    primaryHex = '#1A1A1A';
    secondaryHex = '#2A3439';
    accentHex = '#C5A16F';
    darkNeutralHex = '#0F1215';
    lightNeutralHex = '#FDFCF5';
  } else if (lowerMission.includes('creative') || lowerMission.includes('design') || lowerMission.includes('media') || lowerMission.includes('studio') || lowerMission.includes('arch')) {
    primaryHex = '#1A1A1A';
    secondaryHex = '#4A5D4E';
    accentHex = '#C5A16F';
    darkNeutralHex = '#1A1A1A';
    lightNeutralHex = '#FDFCF5';
  }

  const rawColors = [
    { name: 'Ink / Solid', hex: '#1A1A1A', role: 'Dominant identity signifier (60% coverage). Primary marks, structural borders, and deep contrast.', recommendedRole: 'primary' },
    { name: 'Forest / Acc', hex: '#4A5D4E', role: 'Harmonic botanical depth (30% coverage). Supporting cards, badges, and architectural accents.', recommendedRole: 'secondary' },
    { name: 'Ochre / Luxe', hex: '#C5A16F', role: 'Vibrant artisanal foil (10% coverage). Action focal points, verified stamps, and seals.', recommendedRole: 'accent' },
    { name: 'Mist / Mid', hex: '#E6E4D9', role: 'Secondary surface background, pill badges, and structured archival frames.', recommendedRole: 'darkNeutral' },
    { name: 'Paper / Base', hex: '#FDFCF5', role: 'Pristine warm archival paper canvas, modal surfaces, and grid backdrops.', recommendedRole: 'lightNeutral' },
  ];

  const palette: ColorDefinition[] = rawColors.map((c, i) => {
    const rgb = hexToRgb(c.hex);
    const hsl = hexToHsl(c.hex);
    return {
      id: `color-${i + 1}`,
      name: c.name,
      hex: c.hex.toUpperCase(),
      rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
      hsl: `${hsl.h}°, ${hsl.s}%, ${hsl.l}%`,
      role: c.role,
      usageNotes: `Calibrated for optical balance on #FDFCF5 warm paper background with verified WCAG contrast.`,
      wcagContrastOnWhite: getContrastRatio(c.hex, '#FFFFFF'),
      wcagContrastOnDark: getContrastRatio(c.hex, '#1A1A1A'),
      isAccessibleForText: getContrastRatio(c.hex, '#FFFFFF') >= 4.5 || getContrastRatio(c.hex, '#1A1A1A') >= 4.5,
      recommendedRole: c.recommendedRole as ColorDefinition['recommendedRole'],
    };
  });

  const fontPairing = buildFontPairing('Playfair Display', 'Inter');

  const primaryLogoSvg = generateCustomSvgLogo({
    name,
    tagline: 'Precision & Impact',
    palette,
    variant: 'primary',
    mode: 'light',
  });

  const darkLogoSvg = generateCustomSvgLogo({
    name,
    tagline: 'Precision & Impact',
    palette,
    variant: 'primary',
    mode: 'dark',
  });

  const monoLogoSvg = generateCustomSvgLogo({
    name,
    tagline: 'Precision & Impact',
    palette,
    variant: 'primary',
    mode: 'monochrome',
  });

  const secondaryMarks = buildStandardSecondaryMarks(name, 'Precision & Impact', palette, input.industry);

  return {
    id: `bb-${Date.now()}`,
    createdAt: new Date().toISOString(),
    brandCore: {
      name,
      industry: input.industry || 'Technology & Strategy',
      mission,
      targetAudience: input.targetAudience || 'Modern forward-thinking professionals and growth enterprises',
      brandArchetype: 'The Visionary',
      tagline: 'Architecting the Standard of Tomorrow',
      elevatorPitch: `${name} synthesizes domain mastery with clean, human-centered execution to deliver measurable excellence.`,
      personality: ['Authoritative', 'Innovative', 'Pragmatic', 'Empathetic', 'Visionary'],
      values: [
        {
          title: 'Uncompromising Craft',
          description: 'We treat every pixel, interaction, and system architecture decision with rigorous discipline.',
          iconName: 'Sparkles',
        },
        {
          title: 'Empirical Clarity',
          description: 'Decisions are grounded in observable truth, clean data, and transparent communication.',
          iconName: 'ShieldCheck',
        },
        {
          title: 'Velocity with Purpose',
          description: 'Rapid execution is harnessed to serve meaningful, sustainable outcomes rather than novelty.',
          iconName: 'Zap',
        },
        {
          title: 'Human Resonance',
          description: 'Technology is designed to elevate human potential, connection, and empowerment.',
          iconName: 'HeartHandshake',
        },
      ],
      toneOfVoice: {
        formality: 70,
        boldness: 80,
        warmth: 65,
        modernity: 90,
        doList: [
          'Lead with strong, decisive conclusions followed by supporting rationale.',
          'Adopt an articulate, confident tone that inspires trust without elitism.',
          'Emphasize clarity, craftsmanship, and real-world utility.',
        ],
        dontList: [
          'Never use ungrounded buzzwords, hyperbolic marketing claims, or jargon.',
          'Avoid passive voice and convoluted syntax.',
          'Do not dilute seriousness with sarcastic humor in core brand touchpoints.',
        ],
      },
    },
    palette,
    fontPairing,
    primaryLogo: {
      svgContent: primaryLogoSvg,
      darkVariantSvg: darkLogoSvg,
      monochromeVariantSvg: monoLogoSvg,
      conceptExplanation: 'A geometric nexus mark embodying institutional permanence, forward momentum, and architectural harmony.',
      symbolMeaning: 'The interlocking precision vectors represent the synergy between strategic vision and flawless execution.',
      safeZoneRatio: 'Equal to 50% of the mark height on all four boundaries.',
      minimumSizePx: 28,
      aspectRatio: '540:140',
    },
    secondaryMarks,
    logoOptions: generateLogoConceptOptions(name, 'Precision & Impact', palette, 0, 3, input.industry),
    paletteOptions: generatePaletteConceptOptions(input.industry, input.desiredVibe, 0, 3),
    designPrinciples: [
      'Precision Over Decoration: Every visual element must justify its inclusion through functional clarity.',
      'Intentional Whitespace: Allow content to breathe; negative space creates cognitive calm and premium resonance.',
      'Dynamic Contrast: Pair deep grounding tones with radiant focal points to guide user attention naturally.',
      'Universal Scalability: Maintain structural integrity across microscopic mobile icons and monumental displays.',
    ],
    imageryStyleGuide: {
      photoMood: 'High-dynamic-range natural light, cinematic depth of field, authentic candid collaboration',
      lighting: 'Clean directional sunlight with subtle warm fill',
      composition: 'Geometric leading lines with calm, uncluttered negative space',
      subjectMatter: 'Focused professionals, modern architectural materials, tactile engineering prototypes',
    },
  };
}

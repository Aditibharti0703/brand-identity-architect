import { ColorDefinition, LogoConceptOption, PrimaryLogo, SecondaryMark } from '../types/brand';

export interface LogoStyleOptions {
  name: string;
  tagline?: string;
  palette: ColorDefinition[];
  archetype?: string;
  industry?: string;
  symbolIndex?: number;
  layout?: 'horizontal' | 'stacked' | 'badge' | 'minimal';
  fontStyle?: 'serif' | 'sans' | 'display' | 'mono';
  variant?: 'primary' | 'monogram' | 'submark' | 'app-icon' | 'horizontal' | 'social-avatar' | 'favicon';
  mode?: 'light' | 'dark' | 'monochrome';
}

export function getInitials(name: string): string {
  if (!name) return 'B';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function getSymbolPaths(
  type: number,
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
  uid: string = 's'
): string {
  const normType = ((type % 10) + 10) % 10;

  switch (normType) {
    case 0: // Modern Geometric Helix / Infinity Monogram
      return `
        <defs>
          <linearGradient id="grad0A_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${primaryColor}" />
            <stop offset="100%" stop-color="${secondaryColor}" />
          </linearGradient>
          <linearGradient id="grad0B_${uid}" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${accentColor}" />
            <stop offset="100%" stop-color="${primaryColor}" />
          </linearGradient>
        </defs>
        <path d="M70,50 C70,33.4 56.6,20 40,20 C23.4,20 10,33.4 10,50 C10,66.6 23.4,80 40,80 C56.6,80 60,65 60,50" fill="none" stroke="url(#grad0A_${uid})" stroke-width="8.5" stroke-linecap="round" />
        <path d="M30,50 C30,66.6 43.4,80 60,80 C76.6,80 90,66.6 90,50 C90,33.4 76.6,20 60,20 C43.4,20 40,35 40,50" fill="none" stroke="url(#grad0B_${uid})" stroke-width="8.5" stroke-linecap="round" />
        <circle cx="50" cy="50" r="4.5" fill="${accentColor}" />
      `;

    case 1: // Dynamic Optical Prism / Diamond Core
      return `
        <defs>
          <linearGradient id="prism1_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${primaryColor}" />
            <stop offset="100%" stop-color="${secondaryColor}" />
          </linearGradient>
          <linearGradient id="prism2_${uid}" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${accentColor}" />
            <stop offset="100%" stop-color="${primaryColor}" />
          </linearGradient>
        </defs>
        <polygon points="50,14 86,34 86,76 50,96 14,76 14,34" fill="none" stroke="url(#prism1_${uid})" stroke-width="4.5" stroke-linejoin="round" />
        <polygon points="50,14 86,76 14,76" fill="url(#prism2_${uid})" fill-opacity="0.22" stroke="${accentColor}" stroke-width="3" stroke-linejoin="round" />
        <polygon points="50,96 14,34 86,34" fill="none" stroke="${primaryColor}" stroke-width="2.5" stroke-linejoin="round" stroke-dasharray="3 4" />
        <circle cx="50" cy="50" r="5" fill="${accentColor}" />
      `;

    case 2: // Minimalist Monolith / Wave Spectrum
      return `
        <defs>
          <linearGradient id="waveGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${primaryColor}" />
            <stop offset="100%" stop-color="${accentColor}" />
          </linearGradient>
        </defs>
        <rect x="18" y="34" width="15" height="46" rx="7.5" fill="${primaryColor}" />
        <rect x="42" y="16" width="15" height="66" rx="7.5" fill="url(#waveGrad_${uid})" />
        <rect x="66" y="44" width="15" height="36" rx="7.5" fill="${secondaryColor}" />
        <circle cx="50" cy="8" r="4" fill="${accentColor}" />
      `;

    case 3: // Sovereign Nexus Compass & 8-Point Star
      return `
        <defs>
          <linearGradient id="nexusGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${primaryColor}" />
            <stop offset="100%" stop-color="${secondaryColor}" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="38" fill="none" stroke="${primaryColor}" stroke-opacity="0.22" stroke-width="3.5" stroke-dasharray="3 5" />
        <polygon points="50,16 63,42 89,50 63,58 50,84 37,58 11,50 37,42" fill="url(#nexusGrad_${uid})" />
        <polygon points="50,28 57,45 74,50 57,55 50,72 43,55 26,50 43,45" fill="${accentColor}" fill-opacity="0.85" />
        <circle cx="50" cy="50" r="3.5" fill="#FFFFFF" />
      `;

    case 4: // Abstract Sovereign Linked Rings / Archival Seal
      return `
        <circle cx="35" cy="42" r="23" fill="none" stroke="${primaryColor}" stroke-width="6.5" stroke-linecap="round" />
        <circle cx="65" cy="58" r="23" fill="none" stroke="${secondaryColor}" stroke-width="6.5" stroke-linecap="round" />
        <path d="M50,22 A23,23 0 0,1 58,42 A23,23 0 0,1 42,58" fill="none" stroke="${accentColor}" stroke-width="6.5" stroke-linecap="round" />
        <circle cx="50" cy="50" r="4" fill="${accentColor}" />
      `;

    case 5: // Shield & Vertex / Quantum Aegis
      return `
        <defs>
          <linearGradient id="shieldGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${primaryColor}" />
            <stop offset="50%" stop-color="${secondaryColor}" />
            <stop offset="100%" stop-color="${accentColor}" />
          </linearGradient>
        </defs>
        <path d="M50,14 L84,28 C84,58 70,80 50,90 C30,80 16,58 16,28 Z" fill="none" stroke="url(#shieldGrad_${uid})" stroke-width="4.5" stroke-linejoin="round" />
        <path d="M50,24 L74,35 C74,56 64,72 50,80 C36,72 26,56 26,35 Z" fill="${primaryColor}" fill-opacity="0.12" />
        <path d="M37,49 L46,58 L65,39" fill="none" stroke="${accentColor}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
      `;

    case 6: // Radiant Tri-Hex Catalyst / Delta Core
      return `
        <defs>
          <linearGradient id="triGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${primaryColor}" />
            <stop offset="100%" stop-color="${accentColor}" />
          </linearGradient>
        </defs>
        <polygon points="50,15 88,80 12,80" fill="none" stroke="url(#triGrad_${uid})" stroke-width="5" stroke-linejoin="round" />
        <polygon points="50,38 72,74 28,74" fill="${secondaryColor}" fill-opacity="0.3" stroke="${secondaryColor}" stroke-width="2.5" stroke-linejoin="round" />
        <circle cx="50" cy="58" r="6" fill="${accentColor}" />
      `;

    case 7: // Celestial Sunburst & Horizon Arc
      return `
        <defs>
          <linearGradient id="sunGrad_${uid}" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="${secondaryColor}" />
            <stop offset="100%" stop-color="${accentColor}" />
          </linearGradient>
        </defs>
        <path d="M18,65 Q50,22 82,65" fill="none" stroke="${primaryColor}" stroke-width="6" stroke-linecap="round" />
        <circle cx="50" cy="48" r="16" fill="url(#sunGrad_${uid})" />
        <path d="M22,78 L78,78" stroke="${primaryColor}" stroke-width="4.5" stroke-linecap="round" />
        <path d="M32,86 L68,86" stroke="${accentColor}" stroke-width="3" stroke-linecap="round" />
      `;

    case 8: // Ascending Chevrons & Forward Horizon
      return `
        <path d="M20,68 L50,38 L80,68" fill="none" stroke="${primaryColor}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M28,50 L50,28 L72,50" fill="none" stroke="${secondaryColor}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M36,32 L50,18 L64,32" fill="none" stroke="${accentColor}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
      `;

    default: // Concentric Orbital Nodes
      return `
        <circle cx="50" cy="50" r="36" fill="none" stroke="${primaryColor}" stroke-width="4" stroke-dasharray="12 6" />
        <circle cx="50" cy="50" r="22" fill="none" stroke="${secondaryColor}" stroke-width="4" />
        <circle cx="50" cy="50" r="9" fill="${accentColor}" />
        <circle cx="50" cy="14" r="5" fill="${accentColor}" />
        <circle cx="76" cy="68" r="4" fill="${primaryColor}" />
      `;
  }
}

export function generateCustomSvgLogo(options: LogoStyleOptions): string {
  const {
    name,
    tagline,
    palette,
    variant = 'primary',
    mode = 'light',
    symbolIndex,
    layout = 'horizontal',
    fontStyle = 'serif',
  } = options;

  const initials = getInitials(name);

  // Derive colors safely
  const primary = palette[0]?.hex || '#1A1A1A';
  const secondary = palette[1]?.hex || '#4A5D4E';
  const accent = palette[2]?.hex || '#C5A16F';
  const darkNeutral = palette[3]?.hex || '#1A1A1A';
  const lightNeutral = palette[4]?.hex || '#FDFCF5';

  let textColor = mode === 'dark' ? '#FDFCF5' : darkNeutral;
  let subTextColor = mode === 'dark' ? '#E6E4D9' : '#4A5D4E';
  let bgColor = mode === 'dark' ? '#1A1A1A' : 'transparent';

  if (mode === 'monochrome') {
    textColor = '#1A1A1A';
    subTextColor = '#4A4A4A';
  }

  // Hash string or use explicit symbolIndex
  let symType = symbolIndex !== undefined ? symbolIndex : 0;
  if (symbolIndex === undefined) {
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) {
      hash = (hash << 5) - hash + name.charCodeAt(i);
      hash |= 0;
    }
    symType = Math.abs(hash);
  }

  const uid = `l_${symType}_${mode}_${layout}_${Math.abs(symType % 999)}`;
  const pColor = mode === 'monochrome' ? '#1A1A1A' : primary;
  const sColor = mode === 'monochrome' ? '#4A4A4A' : secondary;
  const aColor = mode === 'monochrome' ? '#1A1A1A' : accent;

  const cleanName = name || 'Archivist';
  const cleanTagline = tagline || 'Precision & Impact';

  // Font family string
  let fontFamilyName = "'Playfair Display', Georgia, serif";
  let fontStyleClass = "italic font-light";
  let taglineStyle = "font-sans font-bold tracking-[0.2em] uppercase";

  if (fontStyle === 'sans' || layout === 'minimal') {
    fontFamilyName = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
    fontStyleClass = "font-bold tracking-tight";
    taglineStyle = "font-mono font-medium tracking-[0.18em] uppercase";
  } else if (fontStyle === 'display') {
    fontFamilyName = "'Space Grotesk', system-ui, sans-serif";
    fontStyleClass = "font-bold tracking-tight";
    taglineStyle = "font-mono font-normal tracking-[0.22em] uppercase";
  } else if (fontStyle === 'mono') {
    fontFamilyName = "'Space Mono', monospace";
    fontStyleClass = "font-bold tracking-wider";
    taglineStyle = "font-mono text-[10px] tracking-[0.25em] uppercase";
  }

  if (variant === 'primary') {
    if (layout === 'stacked') {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 220" width="100%" height="100%" class="brand-logo-stacked">
        <rect width="540" height="220" fill="${bgColor}" rx="12" />
        <!-- Stacked Center Symbol -->
        <g transform="translate(220, 20)">
          <svg width="100" height="100" viewBox="0 0 100 100">
            ${getSymbolPaths(symType, pColor, sColor, aColor, uid)}
          </svg>
        </g>
        <!-- Wordmark Stacked -->
        <g transform="translate(270, 155)" text-anchor="middle">
          <text x="0" y="0" font-family="${fontFamilyName}" font-size="34" class="${fontStyleClass}" fill="${textColor}" letter-spacing="-0.02em">${cleanName}</text>
          <text x="0" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" class="${taglineStyle}" fill="${subTextColor}">${cleanTagline}</text>
        </g>
      </svg>`;
    }

    if (layout === 'badge') {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 140" width="100%" height="100%" class="brand-logo-badge">
        <rect width="540" height="140" fill="${bgColor}" rx="12" />
        <g transform="translate(30, 20)">
          <circle cx="50" cy="50" r="46" fill="${mode === 'dark' ? '#2A2A2A' : '#E6E4D9'}" stroke="${pColor}" stroke-width="2" />
          <svg width="68" height="68" x="16" y="16" viewBox="0 0 100 100">
            ${getSymbolPaths(symType, pColor, sColor, aColor, uid)}
          </svg>
        </g>
        <g transform="translate(155, 68)">
          <text x="0" y="6" font-family="${fontFamilyName}" font-size="32" class="${fontStyleClass}" fill="${textColor}" letter-spacing="-0.02em">${cleanName}</text>
          <text x="0" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" class="${taglineStyle}" fill="${subTextColor}">${cleanTagline}</text>
        </g>
      </svg>`;
    }

    // Default Horizontal Master Lockup
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 140" width="100%" height="100%" class="brand-logo-primary">
      <rect width="540" height="140" fill="${bgColor}" rx="12" />
      <!-- Symbol Mark -->
      <g transform="translate(24, 20)">
        <svg width="100" height="100" viewBox="0 0 100 100">
          ${getSymbolPaths(symType, pColor, sColor, aColor, uid)}
        </svg>
      </g>
      <!-- Wordmark -->
      <g transform="translate(142, 68)">
        <text x="0" y="6" font-family="${fontFamilyName}" font-size="34" class="${fontStyleClass}" fill="${textColor}" letter-spacing="-0.02em">${cleanName}</text>
        <text x="0" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" class="${taglineStyle}" fill="${subTextColor}">${cleanTagline}</text>
      </g>
    </svg>`;
  }

  if (variant === 'horizontal') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 110" width="100%" height="100%">
      <rect width="600" height="110" fill="${bgColor}" rx="8" />
      <g transform="translate(24, 15)">
        <svg width="80" height="80" viewBox="0 0 100 100">
          ${getSymbolPaths(symType, pColor, sColor, aColor, uid)}
        </svg>
      </g>
      <line x1="120" y1="25" x2="120" y2="85" stroke="${subTextColor}" stroke-opacity="0.3" stroke-width="1.5" />
      <g transform="translate(142, 60)">
        <text x="0" y="4" font-family="${fontFamilyName}" font-size="28" class="${fontStyleClass}" fill="${textColor}" letter-spacing="-0.02em">${cleanName}</text>
        <text x="0" y="25" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" class="${taglineStyle}" fill="${subTextColor}">${cleanTagline}</text>
      </g>
    </svg>`;
  }

  if (variant === 'monogram') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <defs>
        <linearGradient id="bgMonoGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${pColor}" />
          <stop offset="100%" stop-color="${sColor}" />
        </linearGradient>
      </defs>
      <rect width="160" height="160" rx="36" fill="url(#bgMonoGrad_${uid})" />
      <circle cx="80" cy="80" r="64" fill="none" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="3" />
      <text x="80" y="98" font-family="'Space Grotesk', system-ui, sans-serif" font-size="54" font-weight="900" fill="#FFFFFF" letter-spacing="-0.02em" text-anchor="middle">${initials}</text>
      <circle cx="120" cy="42" r="7" fill="${aColor}" />
    </svg>`;
  }

  if (variant === 'submark') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <path id="textCirclePath_${uid}" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" fill="none" />
      </defs>
      <circle cx="100" cy="100" r="92" fill="${bgColor === 'transparent' ? lightNeutral : bgColor}" stroke="${pColor}" stroke-width="2.5" />
      <circle cx="100" cy="100" r="84" fill="none" stroke="${sColor}" stroke-width="1" stroke-dasharray="3 3" />
      <text font-family="'Space Mono', monospace" font-size="8.5" font-weight="700" fill="${textColor}" letter-spacing="0.22em">
        <textPath href="#textCirclePath_${uid}" startOffset="0%">
          * ${cleanName.toUpperCase()} * OFFICIAL ARCHIVAL MARK *
        </textPath>
      </text>
      <g transform="translate(68, 68)">
        <svg width="64" height="64" viewBox="0 0 100 100">
          ${getSymbolPaths(symType, pColor, sColor, aColor, uid)}
        </svg>
      </g>
    </svg>`;
  }

  if (variant === 'app-icon') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="100%" height="100%">
      <defs>
        <linearGradient id="appIconGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${pColor}" />
          <stop offset="50%" stop-color="${sColor}" />
          <stop offset="100%" stop-color="${darkNeutral}" />
        </linearGradient>
      </defs>
      <rect width="180" height="180" rx="42" fill="url(#appIconGrad_${uid})" />
      <path d="M 20 20 Q 90 40 160 20 Q 140 10 90 10 Q 40 10 20 20 Z" fill="#FFFFFF" fill-opacity="0.18" />
      <g transform="translate(42, 42)">
        <svg width="96" height="96" viewBox="0 0 100 100">
          ${getSymbolPaths(symType, '#FFFFFF', aColor, '#FFFFFF', uid + '_app')}
        </svg>
      </g>
    </svg>`;
  }

  if (variant === 'social-avatar') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <linearGradient id="socGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${pColor}" />
          <stop offset="100%" stop-color="${sColor}" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="100" fill="url(#socGrad_${uid})" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="2" />
      <g transform="translate(45, 45)">
        <svg width="110" height="110" viewBox="0 0 100 100">
          ${getSymbolPaths(symType, '#FFFFFF', aColor, '#FFFFFF', uid + '_soc')}
        </svg>
      </g>
    </svg>`;
  }

  // Favicon (compact 64x64)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
    <rect width="64" height="64" rx="16" fill="${pColor}" />
    <text x="32" y="42" font-family="'Space Grotesk', system-ui, sans-serif" font-size="28" font-weight="900" fill="#FFFFFF" text-anchor="middle">${initials.charAt(0)}</text>
    <circle cx="48" cy="18" r="4" fill="${aColor}" />
  </svg>`;
}

export function buildStandardSecondaryMarks(
  name: string,
  tagline: string,
  palette: ColorDefinition[],
  industry?: string,
  symbolIndex: number = 0
): SecondaryMark[] {
  return [
    {
      id: 'mark-monogram',
      type: 'monogram',
      name: 'Monogram Mark',
      description: 'Compact 2-letter glyph for profile avatars, brand stamps, and device watermarks.',
      svgContent: generateCustomSvgLogo({ name, tagline, palette, symbolIndex, variant: 'monogram' }),
      recommendedUsage: 'Use on social profile icons, favicon alternates, and micro-applications (down to 24px).'
    },
    {
      id: 'mark-app-icon',
      type: 'app-icon',
      name: 'Mobile App / Launcher Icon',
      description: 'Squircle app store icon with radiant depth and dimensional badge silhouette.',
      svgContent: generateCustomSvgLogo({ name, tagline, palette, symbolIndex, variant: 'app-icon' }),
      recommendedUsage: 'Use for iOS / Android application badges, browser extension icons, and shortcut assets.'
    },
    {
      id: 'mark-submark',
      type: 'submark-stamp',
      name: 'Emblem Submark / Stamp',
      description: 'Circular heritage seal with circular orbital typography and internal core icon.',
      svgContent: generateCustomSvgLogo({ name, tagline, palette, symbolIndex, variant: 'submark' }),
      recommendedUsage: 'Use on official certificates, product packaging seals, invoices, and sticker merch.'
    },
    {
      id: 'mark-horizontal',
      type: 'horizontal-lockup',
      name: 'Compact Horizontal Lockup',
      description: 'Streamlined aspect ratio lockup engineered for thin headers and navigation bars.',
      svgContent: generateCustomSvgLogo({ name, tagline, palette, symbolIndex, variant: 'horizontal' }),
      recommendedUsage: 'Use in website navigation bars, email headers, software topbars, and invoices.'
    },
    {
      id: 'mark-social',
      type: 'social-avatar',
      name: 'Social Media Badge',
      description: 'High-visibility circular badge optimized for Instagram, Twitter/X, LinkedIn and GitHub.',
      svgContent: generateCustomSvgLogo({ name, tagline, palette, symbolIndex, variant: 'social-avatar' }),
      recommendedUsage: 'Use across all social channel profiles, Discord avatars, and community badges.'
    },
    {
      id: 'mark-favicon',
      type: 'favicon',
      name: 'Browser Favicon (16/32px)',
      description: 'High-contrast single-glyph pixel-grid aligned icon for browser tabs and bookmarks.',
      svgContent: generateCustomSvgLogo({ name, tagline, palette, symbolIndex, variant: 'favicon' }),
      recommendedUsage: 'Place in HTML head as favicon.svg / favicon.ico for instant tab recognition.'
    }
  ];
}

const CONCEPT_PRESETS = [
  {
    title: 'Modern Geometric Helix',
    style: 'Dynamic Tech & Infinite Flux',
    description: 'Interlocking continuous vector curves symbolizing frictionless cognitive velocity, evolution, and unity.',
    symbolMeaning: 'The infinity helix represents perpetual motion, mathematical harmony, and human-machine synergy.',
    conceptExplanation: 'Engineered with 8.5px line weight curves on an 80px bounding box for maximum legibility at miniature scales.',
    fontStyle: 'sans' as const,
    layout: 'horizontal' as const,
  },
  {
    title: 'Archival Prism & Serif',
    style: 'Editorial Elegance & Precision',
    description: 'Multi-faceted optical diamond with concentric vertex angles and refined Italian serif typography.',
    symbolMeaning: 'The diamond prism refracts complex challenges into structured, crystal-clear strategic insights.',
    conceptExplanation: 'Pairs a geometric hexagon frame with light display serif lettering to project timeless authority.',
    fontStyle: 'serif' as const,
    layout: 'horizontal' as const,
  },
  {
    title: 'Sovereign Nexus & Crest',
    style: 'Institutional Trust & Compass',
    description: 'An 8-point navigational compass vertex embedded within a subtle circular orbital clearance frame.',
    symbolMeaning: 'The 8-point compass marks true strategic direction, unswerving governance, and market leadership.',
    conceptExplanation: 'Features high-contrast geometric rays designed for embossed corporate seals and monumental signage.',
    fontStyle: 'display' as const,
    layout: 'badge' as const,
  },
  {
    title: 'Architectural Monolith',
    style: 'Minimalist Wave & Structure',
    description: 'Balanced vertical pillars of ascending rhythm expressing foundational stability and bold modularity.',
    symbolMeaning: 'The three monolithic pillars represent stability, growth, and forward transformation.',
    conceptExplanation: 'Pure reductive geometry with consistent corner radii for responsive software navigation bars.',
    fontStyle: 'sans' as const,
    layout: 'horizontal' as const,
  },
  {
    title: 'Quantum Aegis Shield',
    style: 'Defense, Trust & Integrity',
    description: 'A sovereign angular crest with an internal precision apex glyph signifying cryptographic protection.',
    symbolMeaning: 'The shield geometry embodies enterprise resilience, data sovereignty, and unwavering reliability.',
    conceptExplanation: 'Engineered with balanced dual-tone gradients and sharp vertices for physical badge engraving.',
    fontStyle: 'serif' as const,
    layout: 'horizontal' as const,
  },
  {
    title: 'Celestial Sunburst Horizon',
    style: 'Organic Vitality & Discovery',
    description: 'An arched dawn horizon with a glowing core apex radiating warmth, vitality, and optimism.',
    symbolMeaning: 'The sunrise arc symbolizes transformative beginnings, sustainable vitality, and bright futures.',
    conceptExplanation: 'Employs sweeping parabolic curves that blend beautifully with warm earth and terracotta tones.',
    fontStyle: 'serif' as const,
    layout: 'stacked' as const,
  }
];

export function generateLogoConceptOptions(
  name: string,
  tagline: string,
  palette: ColorDefinition[],
  seedOffset: number = 0,
  count: number = 3,
  industry?: string
): LogoConceptOption[] {
  const totalPresets = CONCEPT_PRESETS.length;
  const concepts: LogoConceptOption[] = [];

  for (let i = 0; i < count; i++) {
    const presetIndex = (seedOffset + i) % totalPresets;
    const preset = CONCEPT_PRESETS[presetIndex];
    const symbolIndex = (seedOffset + i) % 10;
    const id = `concept-${seedOffset}-${i}-${symbolIndex}`;

    const primarySvg = generateCustomSvgLogo({
      name,
      tagline,
      palette,
      symbolIndex,
      layout: preset.layout,
      fontStyle: preset.fontStyle,
      variant: 'primary',
      mode: 'light',
    });

    const darkSvg = generateCustomSvgLogo({
      name,
      tagline,
      palette,
      symbolIndex,
      layout: preset.layout,
      fontStyle: preset.fontStyle,
      variant: 'primary',
      mode: 'dark',
    });

    const monoSvg = generateCustomSvgLogo({
      name,
      tagline,
      palette,
      symbolIndex,
      layout: preset.layout,
      fontStyle: preset.fontStyle,
      variant: 'primary',
      mode: 'monochrome',
    });

    const secondaryMarks = buildStandardSecondaryMarks(name, tagline, palette, industry, symbolIndex);

    concepts.push({
      id,
      title: `Concept 0${i + 1}: ${preset.title}`,
      style: preset.style,
      description: preset.description,
      symbolIndex,
      layout: preset.layout,
      fontFamily: preset.fontStyle,
      primarySvg,
      darkSvg,
      monoSvg,
      symbolMeaning: preset.symbolMeaning,
      conceptExplanation: preset.conceptExplanation,
      safeZoneRatio: '0.5x mark height on all sides',
      minimumSizePx: 28,
      secondaryMarks,
    });
  }

  return concepts;
}

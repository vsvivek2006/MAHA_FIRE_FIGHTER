/**
 * CENTRALIZED THEME & BRAND CONFIGURATION
 * 
 * Edit colors, brand text, or contact details in this SINGLE file.
 * All changes will automatically propagate throughout the entire website:
 * header, hero, cards, buttons, badges, footer, and CSS variables.
 */

export const siteTheme = {
  // Brand Color Palette (Mirrored directly from live mahafirefighters.com)
  colors: {
    // Primary Fire Red (Accents, CTAs, Highlights)
    primary: '#C5221F',
    primaryHover: '#A71B18',
    primarySubtle: 'rgba(197, 34, 31, 0.08)',
    primaryBorder: 'rgba(197, 34, 31, 0.3)',

    // Background Layers (Live site uses clean crisp white for main body, top bar, & header)
    bgPage: '#FFFFFF',                 // Main page background
    bgTopBar: '#FFFFFF',               // Top announcement strip (white on live site)
    bgHeader: '#FFFFFF',               // Navigation header (white on live site)
    bgSurface: '#FFFFFF',              // Card surfaces
    bgSurfaceElevated: '#F9FAFB',      // Subtle elevated panels
    bgSurfaceSubtle: '#F3F4F6',        // Subtle pill backgrounds
    bgDarkSection: '#16202A',          // Specialized dark accent sections (services cards)
    bgFooter: '#111822',              // Bottom footer section (dark charcoal navy on live site)

    // Text & Content Colors
    textPrimary: '#1D1E20',            // High-contrast headings (from live site computed styles)
    textSecondary: '#374151',          // Readable body copy
    textMuted: '#6B7280',              // Subtitles, metadata, captions
    textSubtle: '#9CA3AF',             // Placeholders
    textOnDark: '#FFFFFF',             // Text inside dark hero / footer / dark cards

    // Borders & Separators
    borderSubtle: '#E5E7EB',
    borderMedium: '#D1D5DB',
    borderHighlight: 'rgba(197, 34, 31, 0.35)',

    // Functional Accents
    accentEmerald: '#10B981',          // Status & compliance
    accentAmber: '#F59E0B',            // Attention indicators
  },

  // Brand Identity, Headlines & Live Contact Desk
  branding: {
    name: 'MAHA FIREFIGHTERS',
    legalName: 'Maha Enterprises',
    tagline: 'Fire Hydrant and Sprinklers System Contractors in Delhi NCR',
    
    // Live Website Headlines
    topBarNotice: 'CaLL NOW 9873514657/9873337442',
    heroEyebrow: 'Trusted Fire Safety Experts Delhi/NCR',
    heroHeadline: 'Trusted Fire Safety Experts Delhi/NCR',
    heroSubheadline: 'From Detection to Suppression: End-to-End Fire Safety Solutions for a Safer Workspace. Get Your Fire Safety Audit Today Free !',
    
    // Core Focus Block (Live Site Section 3)
    focusHeadline: 'Expert Fire Hydrant Installation',
    focusDescription: 'Serving Delhi NCR for 15 years with expert fire hydrant systems Installation, Fire alarms, and Fire extinguisher sales & Refilling, Fire sprinklers Systems, with our In-house team of expert Technicians.',
    
    // Key Verifiable Statistics
    experienceYears: '15+',
    experienceLabel: 'Years of Experience',
    clientBase: '250+',
    clientLabel: 'Client Base',
    inHousePlant: 'In-House Plant',
    inHousePlantLabel: 'Fire Extinguisher Refilling & Sales (35 Bar HPT)',
    turnkeySuppression: '100% Turnkey',
    turnkeySuppressionLabel: 'Automatic Fire Sprinkler Systems',

    // Estimate & Fire Audit CTA (Live Site Section 5)
    estimateHeadline: 'For a Free Estimate | Fire Audit',
    estimateCallText: 'Call Us @ 9873337442 / 9873514657',

    // Contact Numbers & Locations
    phones: [
      { display: '+91-9873514657', raw: '+919873514657' },
      { display: '+91-9873337442', raw: '+919873337442' },
    ],
    whatsapp: '919873514657',
    email: 'mahaenterprisesdelhi@gmail.com',
    address: 'Daryaganj, New Delhi - 110002',
    operatingTerritory: 'Delhi, Noida, Gurugram, Faridabad, Ghaziabad (Delhi NCR)',
    copyrightYear: '2025',
  }
} as const;

export type SiteTheme = typeof siteTheme;

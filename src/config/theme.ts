/**
 * CENTRALIZED THEME & BRAND CONFIGURATION
 * 
 * Edit colors, brand text, or contact details in this SINGLE file.
 * All changes will automatically propagate throughout the entire website:
 * header, hero, cards, buttons, badges, footer, and CSS variables.
 */

export const siteTheme = {
  // Brand Color Palette
  colors: {
    // Primary Fire Red (Accents, CTAs, Highlights)
    primary: '#D32F2F',
    primaryHover: '#B71C1C',
    primarySubtle: 'rgba(211, 47, 47, 0.12)',
    primaryBorder: 'rgba(211, 47, 47, 0.35)',

    // Background Layers
    bgPage: '#0A0E17',                 // Main page background
    bgTopBar: '#000000',               // Top announcement / hotline strip
    bgHeader: 'rgba(11, 18, 32, 0.95)', // Sticky navigation header
    bgSurface: '#101826',              // Cards, workbench, timeline
    bgSurfaceElevated: '#162236',      // Hovered cards, dropdowns, dialogs
    bgSurfaceSubtle: '#0D1420',        // Input fields, nested panels
    bgFooter: '#070C14',               // Bottom footer section

    // Text & Content Colors
    textPrimary: '#FFFFFF',            // High-contrast headings
    textSecondary: '#E2E8F0',          // Readable body copy
    textMuted: '#94A3B8',              // Subtitles, metadata, captions
    textSubtle: '#64748B',             // Placeholders, disabled states

    // Borders & Separators
    borderSubtle: 'rgba(255, 255, 255, 0.08)',
    borderMedium: 'rgba(255, 255, 255, 0.16)',
    borderHighlight: 'rgba(211, 47, 47, 0.45)',

    // Functional Accents
    accentEmerald: '#10B981',          // Compliance checkmarks & status
    accentAmber: '#F59E0B',            // Attention indicators & alerts
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

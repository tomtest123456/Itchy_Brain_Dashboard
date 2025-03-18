/* 
    /src/app/dashboard/components/SummaryCard/config.ts
    ---------------------------------------
    Summary Card Configuration:
    - Defines card dimensions for all breakpoints
    - Sets consistent padding and spacing
    - Single source of truth for card sizing
*/

// const BREAKPOINTS = {
//     lg : 1200,
//     md : 996,
//     sm : 768,
//     xs : 480,
//     xxs: 0

export const SUMMARY_CARD_CONFIG = {
    dimensions: {
        lg : { w: 5, h: 4 },    // Base size for large screens
        md : { w: 5, h: 4 },    // Scaled for medium
        sm : { w: 10, h: 4 },    // Maintained for small
        xs : { w: 20, h: 4 },   // Mobile landscape (full width)
        xxs: { w: 20, h: 4 }    // Mobile portrait (full width)
    },
    minDimensions: {
        width : 5,   // Minimum width in grid units
        height: 4    // Minimum height in grid units
    }
} as const;

// Type exports for TypeScript support
export type SummaryCardBreakpoint = keyof typeof SUMMARY_CARD_CONFIG.dimensions;
export type SummaryCardDimensions = typeof SUMMARY_CARD_CONFIG.dimensions;
export type SummaryCardConfig     = typeof SUMMARY_CARD_CONFIG;
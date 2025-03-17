/* 
    /src/app/dashboard/components/SummaryCard/config.ts
    ---------------------------------------
    Summary Card Configuration:
    - Defines card dimensions for all breakpoints
    - Sets consistent padding and spacing
    - Single source of truth for card sizing
*/

export const SUMMARY_CARD_CONFIG = {
    dimensions: {
        lg : { w: 4, h: 5 },    // Base size for large screens
        md : { w: 3, h: 4 },    // Scaled for medium
        sm : { w: 3, h: 4 },    // Maintained for small
        xs : { w: 2, h: 3 },    // Mobile landscape
        xxs: { w: 2, h: 3 }     // Mobile portrait
    },
    minDimensions: {
        width : 3,   // Minimum width in grid units
        height: 4    // Minimum height in grid units
    },
    padding: {
        inner: 5  // Padding inside the card
    }
} as const;

// Type exports for TypeScript support
export type SummaryCardBreakpoint = keyof typeof SUMMARY_CARD_CONFIG.dimensions;
export type SummaryCardDimensions = typeof SUMMARY_CARD_CONFIG.dimensions;
export type SummaryCardConfig     = typeof SUMMARY_CARD_CONFIG;
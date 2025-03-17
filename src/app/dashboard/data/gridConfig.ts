/* 
    /src/app/dashboard/data/gridConfig.ts
    -------------------------------------
    Grid Configuration:
    
    - Defines breakpoint scales and column counts
    - Provides consistent grid sizing across components
    - Supports responsive layout adjustments
*/

// Breakpoint scaling factors (percentage of lg size)
export const BREAKPOINT_SCALES = {
    lg : 1,     // 100%
    md : 0.8,   // 80%
    sm : 0.6,   // 60%
    xs : 0.4,   // 40%
    xxs: 0.3    // 30%
};

// Column configuration for different breakpoints
export const GRID_COLS = {
    lg : 12,    // Base column count
    md : 10,    // Scaled from lg
    sm : 8,     // Scaled from lg
    xs : 6,     // Scaled from lg
    xxs: 4      // Scaled from lg
}; 
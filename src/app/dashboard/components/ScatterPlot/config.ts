/*
 * ScatterPlot Configuration
 * ------------------------
 * Core configuration for the ScatterPlot component.
 * All values are derived from tailwind.config.js colors
 * and used for consistent, responsive styling.
 */

/**
 * Main configuration object for ScatterPlot
 * Contains only essential settings used by the component
 */
export const SCATTER_PLOT_CONFIG = {
    // Responsive dimensions for different breakpoints
    dimensions: {
        lg : { w: 10, h: 10 },    // Desktop:      ≥1024px
        md : { w: 20, h: 10 },    // Tablet:       ≥768px
        sm : { w: 40, h: 10 },    // Small Tablet: ≥640px
        xs : { w: 40, h: 10 },    // Mobile:       ≥480px
        xxs: { w: 40, h: 10 }     // Small Mobile: <480px
    },

    // Chart margins (minimal padding for better data visibility)
    margin: {
        top   : 5,    // Reduced from title
        right : 5,    // Minimal right margin
        bottom: 35,    // Space for x-axis label
        left  : 35     // Space for y-axis label
    },

    // Chart specific settings
    chart: {
        point: {
            size : 6,    // Slightly smaller points for better density
            hover: 8     // Hover size (if interactive)
        },
        grid: {
            opacity: 0.15,   // Reduced opacity for better visibility
            lines  : 10      // Number of grid lines for both axes
        },
        axis: {
            tickPadding : 5,     // Reduced padding between ticks and labels
            legendOffset: {
                x: 30,    // Reduced bottom axis legend offset
                y: -30    // Reduced left axis legend offset
            }
        }
    }
} as const;

// Type exports
export type ScatterPlotConfig = typeof SCATTER_PLOT_CONFIG;
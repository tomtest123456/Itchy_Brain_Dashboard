/* 
    /src/app/dashboard/data/formatters.ts
    -------------------------------------
    Value Formatting Utilities:
    
    Centralized location for all data formatting rules.
    Each formatter should:
    - Be pure (same input always gives same output)
    - Handle edge cases (null, undefined, invalid input)
    - Include clear documentation of the formatting rules
*/

/**
 * Format number with commas as thousand separators
 * Example: 12345 -> "12,345"
 */
export function formatWithCommas(value: number | null | undefined): string {
    if (value === null || value === undefined) return '-';
    return value.toLocaleString('en-US');
}

/**
 * Format number with exactly one decimal place
 * Example: 32 -> "32.0", 32.1 -> "32.1"
 */
export function formatOneDecimal(value: number | null | undefined): string {
    if (value === null || value === undefined) return '-';
    return value.toFixed(1);
}

/**
 * Metric-specific formatters
 * Each metric should have its own formatter that applies the appropriate rules
 */
export const metricFormatters = {
    totalDistance: (value: number | null | undefined) => {
        return formatWithCommas(value);
    },
    avgSpeed: (value: number | null | undefined) => {
        return formatOneDecimal(value);
    },
    elevationGain: (value: number | null | undefined) => {
        return formatWithCommas(value);
    }
} as const;

// Type for metric keys
export type MetricKey = keyof typeof metricFormatters; 
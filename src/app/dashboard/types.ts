/* 
    /src/app/dashboard/types.ts
    ---------------------------------------
    Dashboard Type Definitions:
    - Defines common types used across dashboard components
    - Ensures type safety for metric data
    - Provides shared interfaces for components
*/

export type MetricId = string;

export interface MetricDefinition {
    displayName: string;
    value: string;
    unit?: string;
}

export interface ComponentConfig {
    type: string;
    defaultMetric: MetricId;
    allowMetricChange?: boolean;
}

export interface SummaryCardData {
    value: string;
    trend?: number;
    previousValue?: string;
} 
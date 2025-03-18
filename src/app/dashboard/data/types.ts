/* 
    /src/app/dashboard/data/types.ts
    -------------------------------------
    Type Definitions:
    
    - Component Types: Defines available dashboard component types
    - Configuration Types: Defines configuration structure for each component
    - Data Types: Defines data structure for each component type
*/

import type { MetricId } from './metricDefinitions';

// Component Types
export type ComponentType = 'summary' | 'barChart' | 'lineChart' | 'pieChart' | 'scatter';

// Base configuration shared by all components
export interface BaseComponentConfig {
    id   : string;
    type : ComponentType;
    title: string;
    size : {
        w: number;
        h: number;
    };
}

// Summary Card specific configuration
export interface SummaryCardConfig extends BaseComponentConfig {
    type  : 'summary';
    defaultMetric: MetricId;
    allowMetricChange?: boolean;
}

// Chart specific configuration
export interface ChartConfig extends BaseComponentConfig {
    type : 'barChart' | 'lineChart' | 'pieChart' | 'scatter';
    dimensions?: {
        [key: string]: {
            w: number;
            h: number;
        };
    };
}

// Raw data structure for summary cards (before formatting)
export interface RawSummaryData {
    value: number;
    unit : string;
}

// Formatted data structure for summary cards (after formatting)
export interface SummaryCardData {
    value: string;  // Formatted value (e.g., "11,847" or "32.1")
    unit : string;
}

// Generic chart data structure
export interface ChartData {
    labels: string[];
    datasets: {
        label : string;
        data  : number[];
        color?: string;
    }[];
} 
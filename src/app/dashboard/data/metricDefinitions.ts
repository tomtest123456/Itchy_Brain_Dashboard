/* 
    /src/app/dashboard/data/metricDefinitions.ts
    -------------------------------------
    Metric Definitions:
    
    Central registry of all available metrics.
    Each metric defines:
    - Raw field name from data source
    - Display name for UI
    - Unit of measurement
    - Formatting rule to apply
    - Category for grouping (optional)
*/

import { MetricKey } from './formatters';

export interface MetricDefinition {
    rawField    : string;     // Field name in data source
    displayName : string;     // Name to show in UI
    unit        : string;     // Unit of measurement
    formatter   : MetricKey;  // Formatting rule to apply
    category   ?: string;     // Optional grouping category
}

export const AVAILABLE_METRICS: Record<string, MetricDefinition> = {
    totalDistance: {
        rawField   : 'distance',
        displayName: 'Total Distance',
        unit       : 'km',
        formatter  : 'totalDistance',
        category   : 'Distance'
    },
    elevationGain: {
        rawField   : 'elevation_gain',
        displayName: 'Elevation Gain',
        unit       : 'm',
        formatter  : 'elevationGain',
        category   : 'Distance'
    },
    movingTime: {
        rawField   : 'moving_time',
        displayName: 'Moving Time',
        unit       : 'min',
        formatter  : 'totalDistance',
        category   : 'Time'
    },
    elapsedTime: {
        rawField   : 'elapsed_time',
        displayName: 'Elapsed Time',
        unit       : 'min',
        formatter  : 'totalDistance',
        category   : 'Time'
    },
    averageSpeed: {
        rawField   : 'average_speed',
        displayName: 'Avg. Speed',
        unit       : 'km/h',
        formatter  : 'avgSpeed',
        category   : 'Speed'
    },
    maxPower: {
        rawField   : 'max_power',
        displayName: 'Max. Power',
        unit       : 'W',
        formatter  : 'totalDistance',
        category   : 'Power'
    },
    averageHeartRate: {
        rawField   : 'average_heart_rate',
        displayName: 'Avg. HR',
        unit       : 'bpm',
        formatter  : 'totalDistance',
        category   : 'Health'
    },
    averageCadence: {
        rawField   : 'average_cadence',
        displayName: 'Avg. Cadence',
        unit       : 'rpm',
        formatter  : 'totalDistance',
        category   : 'Performance'
    },
    intensity: {
        rawField   : 'intensity',
        displayName: 'Intensity',
        unit       : '',
        formatter  : 'avgSpeed',
        category   : 'Performance'
    },
    calories: {
        rawField   : 'calories',
        displayName: 'Calories',
        unit       : 'kcal',
        formatter  : 'totalDistance',
        category   : 'Health'
    }
} as const;

// Group metrics by category for UI organization
export const METRIC_CATEGORIES = Object.values(AVAILABLE_METRICS).reduce((acc, metric) => {
    const category = metric.category || 'Other';
    if (!acc[category]) {
        acc[category] = [];
    }
    acc[category].push(metric);
    return acc;
}, {} as Record<string, MetricDefinition[]>);

// Type for metric IDs
export type MetricId = keyof typeof AVAILABLE_METRICS; 
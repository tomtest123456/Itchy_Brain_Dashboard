/* 
    /src/app/dashboard/data/componentConfig.ts
    -------------------------------------
    Component Configuration:
    
    - Defines all available dashboard components
    - Specifies size and layout settings
    - Configures component-specific settings
*/

import { SummaryCardConfig, ChartConfig } from './types';
import { SUMMARY_CARD_CONFIG } from '../components/SummaryCard/config';

// Base size configurations for non-summary components
const BASE_SIZES = {
    chart: { w: 8, h: 6 }
};

// Component Registry
export const COMPONENTS: Record<string, SummaryCardConfig | ChartConfig> = {
    // Summary Cards
    summary_totalDistance: {
        id               : 'summary_totalDistance',
        type             : 'summary',
        title            : 'Total Distance',
        defaultMetric    : 'totalDistance',
        allowMetricChange: true,
        size             : SUMMARY_CARD_CONFIG.dimensions.lg
    },
    summary_avgSpeed: {
        id               : 'summary_avgSpeed',
        type             : 'summary',
        title            : 'Average Speed',
        defaultMetric    : 'averageSpeed',
        allowMetricChange: true,
        size             : SUMMARY_CARD_CONFIG.dimensions.lg
    },
    summary_elevationGain: {
        id               : 'summary_elevationGain',
        type             : 'summary',
        title            : 'Elevation Gain',
        defaultMetric    : 'elevationGain',
        allowMetricChange: true,
        size             : SUMMARY_CARD_CONFIG.dimensions.lg
    },
    summary_movingTime: {
        id               : 'summary_movingTime',
        type             : 'summary',
        title            : 'Moving Time',
        defaultMetric    : 'movingTime',
        allowMetricChange: true,
        size             : SUMMARY_CARD_CONFIG.dimensions.lg
    },
    summary_maxPower: {
        id               : 'summary_maxPower',
        type             : 'summary',
        title            : 'Max Power',
        defaultMetric    : 'maxPower',
        allowMetricChange: true,
        size             : SUMMARY_CARD_CONFIG.dimensions.lg
    },
    summary_avgHeartRate: {
        id               : 'summary_avgHeartRate',
        type             : 'summary',
        title            : 'Average Heart Rate',
        defaultMetric    : 'averageHeartRate',
        allowMetricChange: true,
        size             : SUMMARY_CARD_CONFIG.dimensions.lg
    },
    summary_avgCadence: {
        id               : 'summary_avgCadence',
        type             : 'summary',
        title            : 'Average Cadence',
        defaultMetric    : 'averageCadence',
        allowMetricChange: true,
        size             : SUMMARY_CARD_CONFIG.dimensions.lg
    },
    summary_calories: {
        id               : 'summary_calories',
        type             : 'summary',
        title            : 'Calories',
        defaultMetric    : 'calories',
        allowMetricChange: true,
        size             : SUMMARY_CARD_CONFIG.dimensions.lg
    },

    // // Charts
    // chart_speedTrend: {
    //     id: 'chart_speedTrend',
    //     type: 'lineChart',
    //     title: 'Speed Over Time',
    //     size: BASE_SIZES.chart,
    //     xAxis: {
    //         label: 'Time',
    //         type: 'time'
    //     },
    //     yAxis: {
    //         label: 'Speed (km/h)',
    //         type: 'number'
    //     }
    // },
    // chart_elevationProfile: {
    //     id: 'chart_elevationProfile',
    //     type: 'lineChart',
    //     title: 'Elevation Profile',
    //     size: BASE_SIZES.chart,
    //     xAxis: {
    //         label: 'Distance',
    //         type: 'number'
    //     },
    //     yAxis: {
    //         label: 'Elevation (m)',
    //         type: 'number'
    //     }
    // }
}; 
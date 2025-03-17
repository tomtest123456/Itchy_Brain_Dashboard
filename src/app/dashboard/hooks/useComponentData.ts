/* 
    /src/app/dashboard/hooks/useComponentData.ts
    -------------------------------------
    Component Data Hook:
    
    - Consumes data from useDashboardData
    - Handles data transformation for different component types
    - Manages component-specific loading and error states
    - Applies appropriate formatting rules to values
*/

import { useState, useEffect } from 'react';
import { COMPONENTS } from '../data/componentConfig';
import { SummaryCardData, ChartData, SummaryCardConfig, ChartConfig } from '../data/types';
import { useDashboardData } from './useDashboardData';
import { metricFormatters } from '../data/formatters';
import { AVAILABLE_METRICS, MetricId } from '../data/metricDefinitions';

export function useComponentData(componentId: string, metricId?: MetricId) {
    const { summary, charts, isLoading: isDashboardLoading, error: dashboardError } = useDashboardData();
    const [transformedData, setTransformedData] = useState<SummaryCardData | ChartData | null>(null);
    const [error, setError] = useState<Error | null>(dashboardError);

    useEffect(() => {
        console.log('useComponentData Effect:', {
            componentId,
            metricId,
            summaryData: summary,
            isDashboardLoading
        });

        const config = COMPONENTS[componentId];
        if (!config) {
            setError(new Error(`No configuration found for component: ${componentId}`));
            return;
        }

        try {
            if (config.type === 'summary') {
                const summaryConfig = config as SummaryCardConfig;
                const selectedMetric = metricId || summaryConfig.defaultMetric;
                const metricDefinition = AVAILABLE_METRICS[selectedMetric];

                console.log('Processing Summary Data:', {
                    selectedMetric,
                    metricDefinition,
                    rawField: metricDefinition.rawField,
                    rawData: summary[metricDefinition.rawField]
                });

                const rawData = summary[metricDefinition.rawField];
                
                if (rawData) {
                    // Apply formatting based on metric type
                    const formatter = metricFormatters[metricDefinition.formatter];
                    const formattedValue = formatter(rawData.value);
                    
                    const transformedDataValue = {
                        value: formattedValue,
                        unit: metricDefinition.unit
                    };

                    console.log('Transformed Data:', transformedDataValue);
                    
                    setTransformedData(transformedDataValue);
                } else {
                    console.log('No raw data found for metric:', metricDefinition.rawField);
                }
            } else {
                const chartConfig = config as ChartConfig;
                const chartId = componentId.replace('chart_', '');
                const chartData = charts[chartId];
                if (chartData) {
                    setTransformedData(chartData);
                }
            }
            setError(null);
        } catch (err) {
            console.error('Data transformation error:', err);
            setError(err instanceof Error ? err : new Error('Failed to transform data'));
        }
    }, [componentId, metricId, summary, charts]);

    return {
        data: transformedData,
        isLoading: isDashboardLoading,
        error: error || dashboardError
    };
} 
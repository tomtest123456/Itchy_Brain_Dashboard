/* 
    /src/app/dashboard/components/SummaryCard/index.tsx
    -------------------------------------
    Summary Card Component:
    
    - Displays single metric value with optional unit
    - Supports metric switching via dropdown
    - Handles loading and error states
    - Pure presentational component that receives data through props
*/

import { useState } from 'react';
import { SummaryCardConfig, SummaryCardData } from '../../data/types';
import { useComponentData } from '../../hooks/useComponentData';
import { MetricSelector } from './MetricSelector';
import { AVAILABLE_METRICS } from '../../data/metricDefinitions';
import type { MetricId } from '../../data/metricDefinitions';

export interface SummaryCardProps {
    config: SummaryCardConfig;
}

export default function SummaryCard({ config }: SummaryCardProps) {
    const [selectedMetric, setSelectedMetric] = useState<MetricId>(config.defaultMetric);
    const { data, isLoading, error }          = useComponentData(config.id, selectedMetric);
    const summaryData                         = data as SummaryCardData | null;
    const metricDefinition                    = AVAILABLE_METRICS[selectedMetric];

    if (error) {
        return (
            <div className={`
                flex flex-col
                items-center
                justify-center
                h-full
                w-full
                bg-col_background
                border border-red-500
                rounded-lg
                shadow-lg
                p-4
            `}>
                <span className="text-red-500 text-sm">Error loading data</span>
            </div>
        );
    }

    if (isLoading || !summaryData) {
        return (
            <div className={`
                flex flex-col
                items-center
                justify-center
                h-full
                w-full
                bg-col_background
                border border-col_accent
                rounded-lg
                shadow-lg
                p-4
            `}>
                <span className="text-col_text/50">Loading...</span>
            </div>
        );
    }

    return (
        // Card Container
        <div className={`
            flex flex-col
            items-center
            justify-between
            h-full
            w-full
            relative
            bg-col_background
            border border-col_accent
            rounded-lg
            shadow-lg
        `}>
            
            {/* Title Section with Metric Selector */}
            <div className={`
                absolute
                top-[2%]
                w-full
                text-center
                flex
                items-center
                justify-center
            `}>
                {config.allowMetricChange ? (
                    <MetricSelector
                        currentMetricId={selectedMetric}
                        onMetricChange={setSelectedMetric}
                    />
                ) : (
                    <h2 className="text-sm font-semibold text-col_text/80">
                        {metricDefinition.displayName}
                    </h2>
                )}
            </div>

            {/* Value Display */}
            <div className={`
                absolute
                top-[55%]
                -translate-y-1/2
                w-full
                text-center
            `}>
                <span className={`
                    text-2xl
                    font-bold
                    text-col_text
                `}>
                    {summaryData.value}
                </span>
            </div>

            {/* Unit Display */}
            {metricDefinition.unit && (
                <div className={`
                    absolute
                    bottom-[2%]
                    w-full
                    text-center
                    flex
                    items-center
                    justify-center
                `}>
                    <span className={`
                        text-xs
                        font-semibold
                        text-col_text/80
                    `}>
                        {metricDefinition.unit}
                    </span>
                </div>
            )}
        </div>
    );
} 
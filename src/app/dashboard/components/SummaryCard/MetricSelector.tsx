/* 
    /src/app/dashboard/components/SummaryCard/MetricSelector.tsx
    -------------------------------------
    Metric Selector Component:
    
    - Dropdown menu for selecting different metrics to display
    - Styled as text but clickable for metric selection
    - Maintains original title appearance
*/

import { AVAILABLE_METRICS, METRIC_CATEGORIES } from '../../data/metricDefinitions';
import type { MetricId } from '../../data/metricDefinitions';

interface MetricSelectorProps {
    currentMetricId: MetricId;
    onMetricChange: (metricId: MetricId) => void;
}

export function MetricSelector({ currentMetricId, onMetricChange }: MetricSelectorProps) {
    return (
        <div className="relative w-full">
            <button
                onClick={() => document.getElementById(`metric-select-${currentMetricId}`)?.click()}
                className="text-sm font-semibold text-col_text/80 hover:text-col_text w-full text-center"
            >
                {AVAILABLE_METRICS[currentMetricId].displayName}
            </button>
            <select
                id={`metric-select-${currentMetricId}`}
                value={currentMetricId}
                onChange={(e) => onMetricChange(e.target.value as MetricId)}
                className="absolute opacity-0 w-full h-full top-0 left-0 cursor-pointer"
            >
                {Object.entries(METRIC_CATEGORIES).map(([category, metrics]) => (
                    <optgroup key={category} label={category}>
                        {metrics.map((metric) => {
                            const metricId = Object.entries(AVAILABLE_METRICS)
                                .find(([_, def]) => def.rawField === metric.rawField)?.[0] as MetricId;
                            
                            return (
                                <option 
                                    key={metric.rawField} 
                                    value={metricId}
                                >
                                    {metric.displayName}
                                </option>
                            );
                        })}
                    </optgroup>
                ))}
            </select>
        </div>
    );
} 
/* 
    /src/app/dashboard/components/MetricSelector/index.tsx
    ---------------------------------------
    Metric Selector Component:
    - Allows switching between different metrics
    - Maintains consistent styling with summary cards
    - Handles metric selection changes
*/

import { MetricId } from '../../types';

interface MetricSelectorProps {
    currentMetricId: MetricId;
    onMetricChange: (metricId: MetricId) => void;
}

export default function MetricSelector({ currentMetricId, onMetricChange }: MetricSelectorProps) {
    return (
        <select
            value={currentMetricId}
            onChange={(e) => onMetricChange(e.target.value)}
            className="bg-transparent text-xs sm:text-sm font-semibold text-col_text/80 border-none focus:ring-0 cursor-pointer"
        >
            <option value="distance">Distance</option>
            <option value="speed">Speed</option>
            <option value="elevation">Elevation</option>
            <option value="time">Time</option>
            <option value="calories">Calories</option>
            <option value="cadence">Cadence</option>
        </select>
    );
} 
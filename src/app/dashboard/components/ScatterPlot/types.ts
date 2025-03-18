/* 
    /src/app/dashboard/components/ScatterPlot/types.ts
    ---------------------------------------
    Scatter Plot Types:
    - Defines data structure for scatter plot points
    - Specifies configuration interfaces
    - Ensures type safety throughout the component
*/

export interface ScatterPlotPoint {
    x    : number;
    y    : number;
    id   : string;
    label?: string;
}

export interface ScatterPlotData {
    points: ScatterPlotPoint[];
    xLabel: string;   // X-axis label
    yLabel: string;   // Y-axis label
}

export type BreakpointType = 'lg' | 'md' | 'sm' | 'xs' | 'xxs';

export interface ScatterPlotConfig {
    dimensions: {
        [key in BreakpointType]: {
            w: number;
            h: number;
        };
    };
    margin: {
        top   : number;
        right : number;
        bottom: number;
        left  : number;
    };
    chart: {
        point: {
            size : number;
            hover: number;
        };
        grid: {
            opacity: number;
            lines : number;
        };
        axis: {
            tickPadding : number;
            legendOffset: {
                x: number;
                y: number;
            };
        };
    };
}

export interface ScatterPlotProps {
    config?: ScatterPlotConfig;
    title?: string;
    breakpoint: BreakpointType;
}

export interface TooltipData {
    node: {
        data: ScatterPlotPoint;
    };
} 
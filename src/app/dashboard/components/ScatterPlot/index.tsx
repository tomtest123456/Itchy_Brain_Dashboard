"use client";

/*
 * ScatterPlot Component
 * -----------------------
 * Responsive scatter plot with dynamic sizing and axis tick adjustments.
 * Uses configuration from config.ts for consistent styling and layout.
 */

import React, { useMemo, useRef, useEffect, useState } from 'react';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { SCATTER_PLOT_CONFIG }   from './config';
import { ScatterPlotProps, BreakpointType }      from './types';
import './styles.css';

const TEST_DATA = [
    { id: "1",  x: 33.85, y: 81.20 },
    { id: "2",  x: 26.95, y: 85.29 },
    { id: "3",  x: 33.05, y: 53.66 },
    { id: "4",  x: 34.95, y: 51.76 },
    { id: "5",  x: 28.69, y: 72.00 },
    { id: "6",  x: 26.36, y: 97.20 },
    { id: "7",  x: 32.97, y: 72.24 },
    { id: "8",  x: 26.64, y: 67.34 },
    { id: "9",  x: 25.02, y: 85.93 },
    { id: "10", x: 34.34, y: 97.24 }
];

const CHART_COLORS = {
    accent: "#4C00FF",
    text  : "#DCDCDC",
    grid  : "#DCDCDC"
} as const;

// Breakpoint widths for responsive behavior (matching grid system)
const BREAKPOINT_WIDTHS = {
    lg : 1200,
    md : 996,
    sm : 768,
    xs : 480,
    xxs: 0
} as const;

export default function ScatterPlot({ title = "Ride Analysis", breakpoint: initialBreakpoint = 'lg' }: Partial<ScatterPlotProps>) {
    const chartRef = useRef<HTMLDivElement>(null);
    const [breakpoint, setBreakpoint] = useState<BreakpointType>(initialBreakpoint);
    const dimensions = SCATTER_PLOT_CONFIG.dimensions[breakpoint];

    // State for container size
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    // Update breakpoint based on container width
    useEffect(() => {
        const updateBreakpoint = (width: number) => {
            let newBreakpoint: BreakpointType = 'xxs';
            for (const [bp, minWidth] of Object.entries(BREAKPOINT_WIDTHS)) {
                if (width >= minWidth) {
                    newBreakpoint = bp as BreakpointType;
                    break;
                }
            }
            if (newBreakpoint !== breakpoint) {
                console.log('ScatterPlot breakpoint changed:', { 
                    from: breakpoint, 
                    to: newBreakpoint, 
                    width,
                    dimensions: SCATTER_PLOT_CONFIG.dimensions[newBreakpoint]
                });
                setBreakpoint(newBreakpoint);
            }
        };

        if (containerSize.width) {
            updateBreakpoint(containerSize.width);
        }
    }, [containerSize.width, breakpoint]);

    // Data range with 10% padding
    const dataRanges = useMemo(() => {
        const xVals = TEST_DATA.map(d => d.x);
        const yVals = TEST_DATA.map(d => d.y);
        const xMin  = Math.floor(Math.min(...xVals));
        const xMax  = Math.ceil(Math.max(...xVals));
        const yMin  = Math.floor(Math.min(...yVals));
        const yMax  = Math.ceil(Math.max(...yVals));
        const xPad  = (xMax - xMin) * 0.1;
        const yPad  = (yMax - yMin) * 0.1;
        return {
            xMin: xMin - xPad,
            xMax: xMax + xPad,
            yMin: yMin - yPad,
            yMax: yMax + yPad
        };
    }, []);

    useEffect(() => {
        if (!chartRef.current) return;

        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                console.log('ScatterPlot container resized:', { 
                    width, 
                    height, 
                    breakpoint,
                    dimensions: SCATTER_PLOT_CONFIG.dimensions[breakpoint],
                    gridColumn: `span ${dimensions.w}`,
                    gridRow: `span ${dimensions.h}`
                });
                setContainerSize({ width, height });
            }
        });

        resizeObserver.observe(chartRef.current);
        return () => resizeObserver.disconnect();
    }, [breakpoint, dimensions]);

    // Minimum spacing of ~40px per tick, with at least 3 ticks
    const dynamicXTicks = containerSize.width
        ? Math.max(3, Math.floor(containerSize.width / 40))
        : 8;
    const dynamicYTicks = containerSize.height
        ? Math.max(3, Math.floor(containerSize.height / 40))
        : 8;

    return (
        <div
            className="scatter-plot"
            style={{
                gridColumn: `span ${dimensions.w}`,
                gridRow   : `span ${dimensions.h}`,
                height   : '100%',
                minHeight: '0'
            }}
        >
            <div className="scatter-plot-content">
                <div className="scatter-plot-title">{title}</div>
                <div className="scatter-plot-chart" ref={chartRef}>
                    <ResponsiveScatterPlot
                        data       = {[{ id: 'rides', data: TEST_DATA }]}
                        margin     = {SCATTER_PLOT_CONFIG.margin}
                        xScale     = {{ type: 'linear', min: dataRanges.xMin, max: dataRanges.xMax }}
                        yScale     = {{ type: 'linear', min: dataRanges.yMin, max: dataRanges.yMax }}
                        axisTop    = {null}
                        axisRight  = {null}
                        axisBottom = {{
                            tickSize      : 0,
                            tickPadding   : SCATTER_PLOT_CONFIG.chart.axis.tickPadding,
                            tickRotation  : 0,
                            tickValues    : dynamicXTicks,
                            legend        : "Avg. Speed (km/h)",
                            legendPosition: 'middle',
                            legendOffset  : SCATTER_PLOT_CONFIG.chart.axis.legendOffset.x
                        }}
                        axisLeft={{
                            tickSize      : 0,
                            tickPadding   : SCATTER_PLOT_CONFIG.chart.axis.tickPadding,
                            tickRotation  : 0,
                            tickValues    : dynamicYTicks,
                            legend        : "Distance (km)",
                            legendPosition: 'middle',
                            legendOffset  : SCATTER_PLOT_CONFIG.chart.axis.legendOffset.y
                        }}
                        nodeSize={SCATTER_PLOT_CONFIG.chart.point.size}
                        enableGridX={true}
                        enableGridY={true}
                        gridXValues={SCATTER_PLOT_CONFIG.chart.grid.lines}
                        gridYValues={SCATTER_PLOT_CONFIG.chart.grid.lines}
                        colors={[CHART_COLORS.accent]}
                        theme={{
                            background: 'transparent',
                            text: { fill: CHART_COLORS.text },
                            grid: {
                                line: {
                                    stroke: CHART_COLORS.grid,
                                    strokeWidth: 1,
                                    opacity: SCATTER_PLOT_CONFIG.chart.grid.opacity
                                }
                            }
                        }}
                        animate={false}
                        isInteractive={false}
                    />
                </div>
            </div>
        </div>
    );
}

/* 
    /src/app/dashboard/DashboardGrid.tsx
    -------------------------------------
    Grid Layout Configuration Guide:
    
    - Component Types:
      summary: Summary statistics cards
      barChart: Bar chart visualizations
      lineChart: Line chart visualizations
      table: Data table displays
      scatter: Scatter plot visualizations
    
    - Layout IDs follow pattern: type_metric
      Example: summary_totalDistance, barChart_speedOverTime
    
    - Breakpoint Scaling (relative to lg):
      lg: 100%, md: 80%, sm: 60%, xs: 40%, xxs: 30%
*/

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Responsive, WidthProvider, Layout, Layouts } from "react-grid-layout";
import SummaryCard from "./components/SummaryCard/index";
import { COMPONENTS } from "./data/componentConfig";
import { SUMMARY_CARD_CONFIG } from "./components/SummaryCard/config";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./styles/Dashboard.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

// Breakpoint scaling factors (percentage of lg size)
const BREAKPOINT_SCALES = {
    lg : 1,     // 100%
    md : 0.8,   // 80%
    sm : 0.6,   // 60%
    xs : 0.4,   // 40%
    xxs: 0.3    // 30%
};

// Column configuration for different breakpoints
const GRID_COLS = {
    lg : 40,    // Base column count
    md : 40,    // Maintain same columns for better scaling
    sm : 40,    // Maintain same columns for better scaling
    xs : 40,    // Full width on mobile
    xxs: 40     // Full width on mobile
};

// Breakpoint width definitions (in pixels)
const BREAKPOINTS = {
    lg : 1200,
    md : 996,
    sm : 768,
    xs : 480,
    xxs: 0
};

// Generate layout for a specific breakpoint
function generateBreakpointLayout(breakpoint: keyof typeof GRID_COLS): Layout[] {
    let currentX = 0;
    let currentY = 0;
    const maxCols = GRID_COLS[breakpoint];
    
    return Object.entries(COMPONENTS).map(([id, config]) => {
        // Get the correct dimensions for this breakpoint
        const dimensions = (config.type === 'summary')
            ? SUMMARY_CARD_CONFIG.dimensions[breakpoint]
            : config.size;

        // Apply minimum dimensions
        const w = Math.max(
            SUMMARY_CARD_CONFIG.minDimensions.width,
            dimensions.w
        );
        const h = Math.max(
            SUMMARY_CARD_CONFIG.minDimensions.height,
            dimensions.h
        );
        
        // Wrap to next row if exceeding max columns
        if (currentX + w > maxCols) {
            currentX = 0;
            currentY += h;
        }
        
        const layout = {
            i: id,
            x: currentX,
            y: currentY,
            w,
            h,
            minW: SUMMARY_CARD_CONFIG.minDimensions.width,
            minH: SUMMARY_CARD_CONFIG.minDimensions.height
        };
        
        currentX += w;
        return layout;
    });
}

// Generate layouts for all breakpoints
const defaultLayout: Layouts = {
    lg : generateBreakpointLayout('lg'),
    md : generateBreakpointLayout('md'),
    sm : generateBreakpointLayout('sm'),
    xs : generateBreakpointLayout('xs'),
    xxs: generateBreakpointLayout('xxs')
};

// Create a component mapper to handle different component types
const ComponentRenderer = ({ type, config }: { type: string, config: any }) => {
  switch (type) {
    case 'summary':
      return <SummaryCard config={config} />;
    default:
      return <div>Unknown component type: {type}</div>;
  }
};

export default function DashboardGrid() {
    const gridRef                                   = useRef<HTMLDivElement>(null);
    const [windowSize, setWindowSize]               = useState({ width: 0, height: 0 });
    const [layouts, setLayouts]                     = useState<Layouts>(defaultLayout);
    const [currentBreakpoint, setCurrentBreakpoint] = useState<keyof typeof GRID_COLS>("lg");
    const [showGridLines, setShowGridLines]         = useState(true);

    // Log grid measurements
    useEffect(() => {
        if (gridRef.current) {
            const rect = gridRef.current.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(gridRef.current);
            console.log('Grid Measurements:', {
                width         : rect.width,
                height        : rect.height,
                padding       : computedStyle.padding,
                margin        : computedStyle.margin,
                columnWidth   : rect.width / GRID_COLS[currentBreakpoint],
                effectiveWidth: rect.width - parseInt(computedStyle.paddingLeft) - parseInt(computedStyle.paddingRight),
                gridItems     : gridRef.current.querySelectorAll('.react-grid-item').length,
                firstItemSize : gridRef.current.querySelector('.react-grid-item')?.getBoundingClientRect()
            });
        }
    }, [windowSize, currentBreakpoint]);

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width : window.innerWidth,
                height: window.innerHeight
            });
        }
        
        handleResize();
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Update CSS variable for grid lines when breakpoint changes
    useEffect(() => {
        document.documentElement.style.setProperty('--grid-columns', GRID_COLS[currentBreakpoint].toString());
    }, [currentBreakpoint]);

    // Update grid lines opacity when showGridLines changes
    useEffect(() => {
        document.documentElement.style.setProperty('--grid-lines-opacity', showGridLines ? '0.4' : '0');
    }, [showGridLines]);

    return (
        <div className="p-2">
            
            {/* Header with controls */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-col_text">Dashboard Grid</h1>
                <div className="flex items-center gap-4">
                    
                    {/* Window size and column count display */}
                    <div className="text-sm text-col_text/70">
                        Window: {windowSize.width} × {windowSize.height} | Columns: {GRID_COLS[currentBreakpoint]}
                    </div>
                    
                    {/* Grid lines toggle button */}
                    <button
                        onClick={() => setShowGridLines(!showGridLines)}
                        className="px-4 py-2 bg-col_primary text-col_text border border-col_accent rounded hover:bg-col_primary/80 transition-colors"
                    >
                        {showGridLines ? 'Hide Grid' : 'Show Grid'}
                    </button>
                    
                    {/* Reset layout button */}
                    <button
                        onClick={() => setLayouts(defaultLayout)}
                        className="px-4 py-2 bg-col_primary text-col_text border border-col_accent rounded hover:bg-col_primary/80 transition-colors"
                    >
                        Reset Layout
                    </button>
                </div>
            </div>

            {/* Grid Layout */}
            <div ref={gridRef} className="p-0">
                <ResponsiveGridLayout
                    className          = "layout"
                    layouts            = {layouts}
                    breakpoints        = {{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols               = {GRID_COLS}
                    rowHeight          = {20}
                    margin             = {[0, 0]}
                    containerPadding   = {[0, 0]}
                    compactType        = {null}
                    preventCollision   = {true}
                    isDraggable        = {true}
                    isResizable        = {true}
                    useCSSTransforms   = {true}
                    onBreakpointChange = {(breakpoint) => {
                        console.log('Breakpoint changed:', {
                            from   : currentBreakpoint,
                            to     : breakpoint,
                            scale  : BREAKPOINT_SCALES[breakpoint as keyof typeof GRID_COLS],
                            columns: GRID_COLS[breakpoint as keyof typeof GRID_COLS]
                        });
                        setCurrentBreakpoint(breakpoint as keyof typeof GRID_COLS);
                    }}
                    onLayoutChange={(_, allLayouts) => {
                        console.log('Layout changed:', {
                            breakpoint: currentBreakpoint,
                            itemCount : Object.keys(COMPONENTS).length,
                            layouts   : allLayouts
                        });
                        setLayouts(allLayouts);
                    }}
                >
                    {Object.entries(COMPONENTS).map(([id, config]) => (
                        <div key={id} className="grid-item-wrapper">
                            <div className="grid-item-inner">
                                <ComponentRenderer type={config.type} config={config} />
                            </div>
                        </div>
                    ))}
                </ResponsiveGridLayout>
            </div>
        </div>
    );
}

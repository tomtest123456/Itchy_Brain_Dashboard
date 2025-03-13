/* 
    /src/app/dashboard/DashboardGrid.tsx
    -------------------------------------
    Grid Layout Configuration Guide:
    
    - Breakpoints: Screen width breakpoints for responsive layout
      lg: 1200px+, md: 996-1199px, sm: 768-995px, xs: 480-767px, xxs: 0-479px
    
    - Columns: Number of columns for each breakpoint
      lg: 20 cols, md: 10 cols, sm: 6 cols, xs: 4 cols, xxs: 2 cols
    
    - Item Properties in layouts:
      i: unique identifier
      x: column number (0-based)
      y: row number (0-based)
      w: width in columns
      h: height in rows
*/

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Responsive, WidthProvider, Layout, Layouts } from "react-grid-layout";
import SummaryCard from "./components/SummaryCard";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./styles/Dashboard.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

// Column configuration for different breakpoints
const GRID_COLS = {
    lg : 20,
    md : 10,
    sm : 6,
    xs : 4,
    xxs: 2
};

// Default layout - items arranged horizontally, adjusted for 20 columns
const defaultLayout: Layouts = {
    lg: [
        { i: "1", x: 0, y: 0, w: 3, h: 4 },
        { i: "2", x: 3, y: 0, w: 3, h: 4 },
        { i: "3", x: 6, y: 0, w: 3, h: 4 }
    ],
    md: [
        { i: "1", x: 0, y: 0, w: 3, h: 2 },
        { i: "2", x: 3, y: 0, w: 3, h: 2 },
        { i: "3", x: 6, y: 0, w: 3, h: 2 }
    ],
    sm: [
        { i: "1", x: 0, y: 0, w: 3, h: 2 },
        { i: "2", x: 3, y: 0, w: 3, h: 2 },
        { i: "3", x: 0, y: 2, w: 3, h: 2 }
    ],
    xs: [
        { i: "1", x: 0, y: 0, w: 4, h: 2 },
        { i: "2", x: 0, y: 2, w: 4, h: 2 },
        { i: "3", x: 0, y: 4, w: 4, h: 2 }
    ],
    xxs: [
        { i: "1", x: 0, y: 0, w: 2, h: 2 },
        { i: "2", x: 0, y: 2, w: 2, h: 2 },
        { i: "3", x: 0, y: 4, w: 2, h: 2 }
    ]
};

export default function DashboardGrid() {
    const gridRef                                   = useRef<HTMLDivElement>(null);
    const [windowSize, setWindowSize]               = useState({ width: 0, height: 0 });
    const [layouts, setLayouts]                     = useState<Layouts>(defaultLayout);
    const [currentBreakpoint, setCurrentBreakpoint] = useState<keyof typeof GRID_COLS>("lg");

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
                columnWidth   : rect.width / GRID_COLS[currentBreakpoint],                                               // Dynamic column count
                effectiveWidth: rect.width - parseInt(computedStyle.paddingLeft) - parseInt(computedStyle.paddingRight)
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

    return (
        <div className="p-4">
            {/* Header with controls */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Dashboard Grid</h1>
                <div className="flex items-center gap-4">
                    {/* Window size and column count display */}
                    <div className="text-sm text-gray-500">
                        Window: {windowSize.width} × {windowSize.height} | Columns: {GRID_COLS[currentBreakpoint]}
                    </div>
                    {/* Reset layout button */}
                    <button
                        onClick={() => setLayouts(defaultLayout)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Reset Layout
                    </button>
                </div>
            </div>

            {/* Grid Layout */}
            <div ref={gridRef}>
                <ResponsiveGridLayout
                    className          = "layout"
                    layouts            = {layouts}
                    breakpoints        = {{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols               = {GRID_COLS}
                    rowHeight          = {20}
                    margin             = {[5, 5]}
                    containerPadding   = {[0, 0]}
                    compactType        = {null}
                    preventCollision   = {false}
                    isDraggable        = {true}
                    isResizable        = {true}
                    useCSSTransforms   = {true}
                    onBreakpointChange = {(breakpoint) => {
                        setCurrentBreakpoint(breakpoint as keyof typeof GRID_COLS);
                    }}
                    onLayoutChange={(_, allLayouts) => {
                        console.log('Layout changed:', allLayouts);
                        setLayouts(allLayouts);
                    }}
                >
                    <div key="1" className="rounded-lg overflow-hidden p-[5px]">
                        <SummaryCard title="Total Distance" value="11,847" unit="km" />
                    </div>
                    
                    <div key="2" className="rounded-lg overflow-hidden p-[5px]">
                        <SummaryCard title="Avg Speed" value="32.1" unit="km/h" />
                    </div>
                    <div key="3" className="rounded-lg overflow-hidden p-[5px]">
                        <SummaryCard title="Elevation Gain" value="1,500" unit="m" />
                    </div>
                </ResponsiveGridLayout>
            </div>
        </div>
    );
}

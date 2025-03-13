/* 
    /src/app/dashboard/page.tsx
    --------------------------------
    Main dashboard page component.
    Renders the DashboardGrid which controls layout, dragging, and resizing.
*/

"use client";

import React from "react";
import DashboardGrid from "./DashboardGrid";

export default function DashboardPage() {
    return (
        <div>
            <DashboardGrid />
        </div>
    );
}

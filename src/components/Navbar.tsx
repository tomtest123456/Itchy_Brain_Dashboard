// src/components/Navbar.tsx
// Navigation sidebar for the dashboard
// Auto-collapses on mobile

"use client"; // Enables interactive behavior

import { useState } from "react";

export default function Navbar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <nav
            className={`bg-navbar text-text h-screen p-4 transition-all ${
                isCollapsed ? "w-16" : "w-48"
            }`}
        >
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="mb-4">
                {isCollapsed ? "▶" : "Collapse"}
            </button>
            <ul className="space-y-2">
                <li>Weekly Summary</li>
                <li>Monthly Summary</li>
                <li>Full Year Total</li>
                <li>Athlete Overview</li>
                <li>Power Profile</li>
            </ul>
        </nav>
    );
}

// src/components/Navbar.tsx
// Navigation sidebar for the dashboard
// Auto-collapses on mobile

"use client"; // Enables interactive behavior

import { useState, useEffect } from "react";
import { Menu, X } from 'lucide-react'; // Import icons

interface NavItem {
    title: string;
    href: string;
}

const NAV_ITEMS: NavItem[] = [
    { title: "Weekly Summary", href: "/weekly" },
    { title: "Monthly Summary", href: "/monthly" },
    { title: "Full Year Total", href: "/yearly" },
    { title: "Athlete Overview", href: "/athlete" },
    { title: "Power Profile", href: "/power" }
];

export default function Navbar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

    // Handle responsive behavior
    useEffect(() => {
        const handleResize = () => {
            setIsMobileOrTablet(window.innerWidth < 1024); // lg breakpoint
            setIsCollapsed(window.innerWidth < 1024);
        };

        // Initial check
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className={`
            relative
            h-screen
            bg-col_primary/90
            border-r
            border-col_accent/20
            transition-all
            duration-300
            ease-in-out
            ${isCollapsed ? 'w-16' : 'w-64'}
            p-4
        `}>
            {/* Mobile Toggle Button */}
            {isMobileOrTablet && (
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`
                        absolute
                        top-4
                        right-4
                        p-2
                        rounded-md
                        hover:bg-col_accent/10
                        transition-colors
                        text-col_text
                    `}
                >
                    {isCollapsed ? <Menu size={20} /> : <X size={20} />}
                </button>
            )}

            {/* Navigation Items */}
            <ul className="space-y-4 mt-12">
                {NAV_ITEMS.map((item, index) => (
                    <li key={index}>
                        <a
                            href={item.href}
                            className={`
                                flex
                                items-center
                                p-3
                                rounded-md
                                text-col_text
                                hover:bg-col_accent/10
                                transition-all
                                duration-200
                                ${isCollapsed ? 'justify-center' : 'justify-start'}
                            `}
                        >
                            {isCollapsed ? (
                                <span className="font-semibold">{item.title[0]}</span>
                            ) : (
                                <span className="font-medium">{item.title}</span>
                            )}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

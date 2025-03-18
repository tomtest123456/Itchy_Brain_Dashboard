// src/app/layout.tsx
// Defines the global layout and structure of the app, including <html> and <body>.
// Sets metadata (title, description) and applies global fonts.
// Ensures all pages share a consistent layout.

import type { Metadata } from "next";              // Defines metadata for SEO and browser behavior
import { Inter } from "next/font/google";          // Import only Inter font
import "./globals.css";                            // Imports global CSS for consistent styles
import Navbar from "@/components/Navbar";          // Imports the navigation bar component

// Initialize the Inter font with Latin subset support
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Cycling Dashboard",
    description: "A dashboard for tracking cycling metrics and performance",
};

// RootLayout wraps all pages in the app, providing a consistent structure
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.className}>
            <body className="bg-col_background text-col_text">
                <div className="flex h-screen">
                    <Navbar />
                    <main className="flex-1 overflow-auto p-1">
                        <div className="container mx-auto">
                            {children}
                        </div>
                    </main>
                </div>

                {/* FOOTER */}
                <footer className="bg-col_primary border-t border-col_accent text-col_text py-4 text-center">
                    <p>© 2025 Itchy Brain Dashboard</p>
                </footer>
            </body>
        </html>
    );
}

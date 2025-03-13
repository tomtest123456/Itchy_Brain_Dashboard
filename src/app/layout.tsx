// src/app/layout.tsx
// Defines the global layout and structure of the app, including <html> and <body>.
// Sets metadata (title, description) and applies global fonts.
// Ensures all pages share a consistent layout.

"use client"; // Ensure this file runs on the client-side

import type { Metadata } from "next"; // Defines metadata for SEO and browser behavior
import { Inter, Oswald } from "next/font/google"; // Imports Google Fonts (Inter and Oswald)
import "./globals.css"; // Imports global CSS for consistent styles
import Navbar from "@/components/Navbar"; // Imports the navigation bar component

// Initialize the Inter font with Latin subset support
const inter = Inter({ subsets: ["latin"] });
const oswald = Oswald({ subsets: ["latin"] });

//export const metadata: Metadata = {
//    title: "Cycling Dashboard",
//    description: "A dashboard for tracking cycling metrics and performance",
//};

// RootLayout wraps all pages in the app, providing a consistent structure
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased bg-background text-text`}>
                <div className="flex h-screen">
                    <Navbar />
                    <main className="flex-1 overflow-auto p-4">
                        <div className="container mx-auto">
                            {children}
                        </div>
                    </main>
                </div>

                {/* FOOTER */}
                <footer className="bg-gray-900 text-white py-4 text-center">
                    <p>© 2025 Itchy Brain Dashboard</p>
                </footer>
            </body>
        </html>
    );
}

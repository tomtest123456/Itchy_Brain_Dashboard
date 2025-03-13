// tailwind.config.js
// Configures Tailwind CSS for the project, defining global styles and utilities.
// Extends default settings with custom fonts, colors, spacing, and components.
// Ensures Tailwind scans all required files and includes necessary plugins.

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            /* Custom Fonts */
            fontFamily: {
                inter : ["Inter", "sans-serif"],
                oswald: ["Oswald", "sans-serif"],
            },

            /* Custom Colors */
            colors: {
                background: "#000000",   // Black (Background)
                text      : "#DCDCDC",   // Platinum (Text)
                navbar    : "#2A2D38",   // Raisin Black (Navbar)
                accent    : "#3900BD",   // Medium Blue (Accents/Borders)
                cta       : "#4C00FF",   // Bright Blue (Buttons/CTA)
                warning   : "#B30021",   // Firebrick (Warnings/Alerts)
            },

            /* Consistent Border Radius */
            borderRadius: {
                sm: "4px",
                md: "8px",
                lg: "12px",
                xl: "16px",
            },

            /* Default Container Settings */
            container: {
                center : true,
                padding: "1rem",
            },
        },
    },

    /* Tailwind Plugins */
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
        require("@tailwindcss/aspect-ratio"),
    ],
};

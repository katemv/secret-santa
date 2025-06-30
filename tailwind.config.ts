import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "christmas": {
                    50: "#fef2f2",
                    100: "#fee2e2", 
                    200: "#fecaca",
                    300: "#fca5a5",
                    400: "#f87171",
                    500: "#ef4444", // Main red
                    600: "#dc2626",
                    700: "#b91c1c",
                    800: "#991b1b",
                    900: "#7f1d1d",
                },
                "forest": {
                    50: "#f0fdf4",
                    100: "#dcfce7",
                    200: "#bbf7d0",
                    300: "#86efac",
                    400: "#4ade80",
                    500: "#22c55e",
                    600: "#16a34a", // Main green
                    700: "#15803d",
                    800: "#166534",
                    900: "#14532d",
                },
                "cream": {
                    50: "#fffbeb",
                    100: "#fef3c7",
                    200: "#fde68a",
                    300: "#fcd34d",
                    400: "#fbbf24",
                    500: "#f59e0b",
                    600: "#d97706",
                    700: "#b45309",
                    800: "#92400e",
                    900: "#78350f",
                },
                "mistletoe": {
                    50: "#f0f9f0",
                    100: "#dcf2dc",
                    200: "#bce5bc",
                    300: "#8bd18b",
                    400: "#4fb74f",
                    500: "#2d5a2d",
                    600: "#254a25", // Main mistletoe green
                    700: "#1f3d1f",
                    800: "#1a331a",
                    900: "#162b16", // Deep mistletoe green
                }
            },
            fontFamily: {
                sans: ["\"Open Sans\"", "system-ui", "sans-serif"],
                "fleur": ["Fleur De Leah", "cursive"],
                "fields": ["fields", "sans-serif"],
            },
        },
    },
    plugins: [],
};

export default config; 
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
    	extend: {
    		colors: {
    			"christmas": {
    				"50": "#fef2f2",
    				"100": "#fee2e2",
    				"200": "#fecaca",
    				"300": "#fca5a5",
    				"400": "#f87171",
    				"500": "#ef4444",
    				"600": "#e7342a",
    				"700": "#b91c1c",
    				"800": "#991b1b",
    				"900": "#7f1d1d"
    			},
    			"forest": {
    				"50": "#f0fdf4",
    				"100": "#dcfce7",
    				"200": "#bbf7d0",
    				"300": "#86efac",
    				"400": "#4ade80",
    				"500": "#22c55e",
    				"600": "#16a34a",
    				"700": "#15803d",
    				"800": "#166534",
    				"900": "#14532d"
    			},
    			"cream": {
    				"50": "#fffbeb",
    				"100": "#fef3c7",
    				"200": "#fde68a",
    				"300": "#fcd34d",
    				"400": "#fbbf24",
    				"500": "#f59e0b",
    				"600": "#d97706",
    				"700": "#b45309",
    				"800": "#92400e",
    				"900": "#78350f"
    			},
    			"mistletoe": {
    				"50": "#f0f9f0",
    				"100": "#dcf2dc",
    				"200": "#bce5bc",
    				"300": "#8bd18b",
    				"400": "#4fb74f",
    				"500": "#2d5a2d",
    				"600": "#254a25",
    				"700": "#1f3d1f",
    				"800": "#1a331a",
    				"900": "#162b16"
    			},
    			background: "hsl(var(--background))",
    			foreground: "hsl(var(--foreground))",
    			card: {
    				DEFAULT: "hsl(var(--card))",
    				foreground: "hsl(var(--card-foreground))"
    			},
    			popover: {
    				DEFAULT: "hsl(var(--popover))",
    				foreground: "hsl(var(--popover-foreground))"
    			},
    			primary: {
    				DEFAULT: "hsl(var(--primary))",
    				foreground: "hsl(var(--primary-foreground))"
    			},
    			secondary: {
    				DEFAULT: "hsl(var(--secondary))",
    				foreground: "hsl(var(--secondary-foreground))"
    			},
    			muted: {
    				DEFAULT: "hsl(var(--muted))",
    				foreground: "hsl(var(--muted-foreground))"
    			},
    			accent: {
    				DEFAULT: "hsl(var(--accent))",
    				foreground: "hsl(var(--accent-foreground))"
    			},
    			destructive: {
    				DEFAULT: "hsl(var(--destructive))",
    				foreground: "hsl(var(--destructive-foreground))"
    			},
    			border: "hsl(var(--border))",
    			input: "hsl(var(--input))",
    			ring: "hsl(var(--ring))",
    			chart: {
    				"1": "hsl(var(--chart-1))",
    				"2": "hsl(var(--chart-2))",
    				"3": "hsl(var(--chart-3))",
    				"4": "hsl(var(--chart-4))",
    				"5": "hsl(var(--chart-5))"
    			}
    		},
    		fontFamily: {
    			sans: [
    				"\\\"Open Sans\\\"",
    				"system-ui",
    				"sans-serif"
    			],
    			"fleur": [
    				"Fleur De Leah",
    				"cursive"
    			],
    			"fields": [
    				"fields",
    				"sans-serif"
    			]
    		},
    		borderRadius: {
    			lg: "var(--radius)",
    			md: "calc(var(--radius) - 2px)",
    			sm: "calc(var(--radius) - 4px)"
    		}
    	}
    },
    plugins: [tailwindcssAnimate],
};

export default config; 
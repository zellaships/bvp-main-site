import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ============================================
      // BVP BRAND COLORS — OFFICIAL PALETTE
      // ============================================
      colors: {
        bvp: {
          // Primary
          gold: "#FDC500",           // Insignia Gold
          white: "#FFFFFF",
          black: "#000000",          // Black Ops

          // Secondary
          orange: "#F44708",         // Flare Orange
          red: "#720C0C",            // Deep Red
          green: "#56C035",          // Tactical Green
          "green-dark": "#143601",   // Ranger Green
          blue: "#038BFF",           // Sky Blue
          navy: "#232651",           // Midnight Navy

          // Neutrals
          grey: "#A1A1A4",           // Steel Grey
          sand: "#F4E7C3",           // Sand
        },
        // Semantic aliases
        primary: "#FDC500",
        secondary: "#232651",
        accent: "#F44708",
        success: "#56C035",
        error: "#720C0C",
      },

      // ============================================
      // BVP TYPOGRAPHY
      // ============================================
      fontFamily: {
        // Headlines - Gunterz (bold, military-inspired)
        display: ["Gunterz", "system-ui", "sans-serif"],
        gunterz: ["Gunterz", "system-ui", "sans-serif"],
        // Ontika - Semi-display sans for buttons/CTAs
        ontika: ["Ontika", "system-ui", "sans-serif"],
        // Body - Linear Grotesk (clarity, modern)
        body: ["Linear Grotesk", "system-ui", "sans-serif"],
        linear: ["Linear Grotesk", "system-ui", "sans-serif"],
        // CTAs - Ontika Medium (action, confident)
        cta: ["Ontika", "system-ui", "sans-serif"],
      },

      fontSize: {
        // Display sizes
        "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        // Body sizes - WCAG AA compliant (16px+ for body, 14px+ for secondary)
        "body-xl": ["1.5rem", { lineHeight: "1.6" }],      // 24px
        "body-lg": ["1.25rem", { lineHeight: "1.6" }],     // 20px
        "body-md": ["1.0625rem", { lineHeight: "1.6" }],   // 17px (iOS minimum)
        "body-sm": ["1rem", { lineHeight: "1.5" }],        // 16px (WCAG minimum for body)
        // Label/UI sizes - WCAG AA compliant (14px minimum)
        "label-lg": ["1rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],     // 16px
        "label-md": ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.1em" }],  // 14px (WCAG minimum)
        "label-sm": ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.1em" }], // 13px (captions only)
      },

      // ============================================
      // BVP SPACING (Generous, "chunky" layouts)
      // ============================================
      spacing: {
        // Section spacing
        "section-desktop": "6rem", // 96px
        "section-mobile": "3rem", // 48px
        // Component spacing
        "component-lg": "4rem", // 64px
        "component-md": "2rem", // 32px
        "component-sm": "1rem", // 16px
      },

      // ============================================
      // BVP CONTAINER
      // ============================================
      maxWidth: {
        container: "1400px",
        content: "65ch", // ~60-70 characters for readability
      },

      // ============================================
      // BVP BORDERS (Bold, chunky)
      // ============================================
      borderWidth: {
        "3": "3px",
        "4": "4px",
      },

      // ============================================
      // BVP ANIMATIONS
      // ============================================
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out forwards",
        "fade-in": "fade-in 0.3s ease-out forwards",
      },

      // ============================================
      // BVP TRANSITIONS
      // ============================================
      transitionDuration: {
        "400": "400ms",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

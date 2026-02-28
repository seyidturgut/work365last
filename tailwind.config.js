/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#799B38",
          light: "#8FB14B",
          dark: "#5F7D2D",
        },
        work: {
          green: {
            50: '#F5F7F1',
            100: '#E9EFE0',
            200: '#D5E0C2',
            300: '#BDCF9F',
            400: '#A0BD6B',
            500: '#799B38', /* PRIMARY ACCENT */
            600: '#64822B',
            700: '#4D6621',
            800: '#3A4D19',
            900: '#2A3613',
            950: '#151C08',
          },
          navy: {
            50: "#F7F9FB",
            100: "#EEF2F6",
            200: "#E2E8F0",
            300: "#CBD5E1",
            400: "#94A3B8",
            500: "#64748B",
            600: "#475569",
            700: "#334155",
            800: "#2A3441", // Base Navy
            900: "#0F172A",
          },
        },
        secondary: {
          DEFAULT: "#F7F9FB",
          dark: "#E2E8F0",
        },
        success: "#7FA833",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
        text: {
          DEFAULT: "#1F2937",
          light: "#4B5563",
        },
        bg: "#F8FAFC",
        darkbg: "#161C28",
        // Premium token aliases (additive)
        "bg-0": "var(--w-bg-0)",
        "bg-50": "var(--w-bg-50)",
        "bg-100": "var(--w-bg-100)",
        "bg-200": "var(--w-bg-200)",
        "bg-300": "var(--w-bg-300)",
        "bg-400": "var(--w-bg-400)",
        "bg-500": "var(--w-bg-500)",
        "bg-600": "var(--w-bg-600)",
        "bg-700": "var(--w-bg-700)",
        "bg-800": "var(--w-bg-800)",
        "bg-900": "var(--w-bg-900)",
        "bg-950": "var(--w-bg-950)",
        "surface-50": "var(--w-surface-50)",
        "surface-100": "var(--w-surface-100)",
        "surface-200": "var(--w-surface-200)",
        "surface-300": "var(--w-surface-300)",
        "surface-400": "var(--w-surface-400)",
        "surface-500": "var(--w-surface-500)",
        "accent-blue": "var(--w-accent-blue)",
        "accent-purple": "var(--w-accent-purple)",
        "border-glow": "var(--w-border-glow)",
        "text-high": "var(--w-text-high)",
        "text-muted": "var(--w-text-muted)",
        "text-disabled": "var(--w-text-disabled)",
        "tooltip-bg": "var(--w-tooltip-bg)",
        "badge-bg": "var(--w-badge-bg)",
        stripe: {
          bg: "var(--stripe-bg)",
          surface: "var(--stripe-surface)",
          border: "var(--stripe-border)",
          text: "var(--stripe-text)",
          muted: "var(--stripe-text-muted)",
          accent: "var(--stripe-accent)",
        },
        light: {
          bg: "var(--bg)",
          surface: "var(--surface)",
          "surface-2": "var(--surface-2)",
          border: "var(--border)",
          text: "var(--text)",
          muted: "var(--muted)",
          accent: "var(--accent)",
          "accent-2": "var(--accent-2)",
          success: "var(--success)",
          warning: "var(--warning)",
          danger: "var(--danger)",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        "radius-xl": "var(--w-radius-xl)",
        "radius-2xl": "var(--w-radius-2xl)",
        "radius-3xl": "var(--w-radius-3xl)",
      },
      backdropBlur: {
        "glass-sm": "var(--w-blur-sm)",
        "glass-md": "var(--w-blur-md)",
        "glass-lg": "var(--w-blur-lg)",
      },
      boxShadow: {
        // Depth System
        'corporate': '0 1px 2px rgba(22,28,40,0.06), 0 8px 24px rgba(22,28,40,0.08)',
        'corporate-hover': '0 6px 18px rgba(121,155,56,0.16), 0 18px 36px rgba(22,28,40,0.12)',

        // Soft Glow System (For KPIs, Active Steps, Focus)
        'glow-green': '0 0 0 1px rgba(121,155,56,0.2), 0 10px 30px rgba(121,155,56,0.22)',

        // Dark Section System Border Fake
        'glass-border': 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
        // Premium token shadows (additive)
        "glow-subtle": "var(--w-glow-subtle)",
        "glow-medium": "var(--w-glow-medium)",
        "card": "var(--w-shadow-card)",
        "floating": "var(--w-shadow-floating)",
        "popup": "var(--w-shadow-popup)",
        "focus-ring": "var(--w-input-focus-ring-shadow)",
        "stripe-card": "var(--stripe-shadow-card)",
        "stripe-hover": "var(--stripe-shadow-hover)",
      },
      backgroundImage: {
        'hero-premium': 'none',
        'dark-section': 'linear-gradient(180deg, #1F2633 0%, #29303E 100%)',
        "accent-gradient": "var(--w-accent-gradient)",
        "surface-glass": "var(--w-surface-gradient)",
      },
      transitionTimingFunction: {
        'micro': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'linear-premium': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        180: "180ms",
        220: "220ms",
        280: "280ms",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

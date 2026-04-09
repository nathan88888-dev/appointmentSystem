/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kinetic Slate Palette
        surface: {
          dim: "#0b1326",           // Base foundation
          DEFAULT: "#0b1326",
          container: "#171f33",     // Structural sections
          "container-low": "#12192b",
          "container-high": "#222a3d", // Interactive objects
          "container-highest": "#2d3449", // Elevated modals
          bright: "#3b435a",        // Lit-from-within states
        },
        primary: {
          DEFAULT: "hsl(var(--primary))", // Link to CSS variables
          container: "#8083ff",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          container: "rgba(99, 102, 241, 0.4)",
        },
        tertiary: "#ffb783",
        "on-surface": "#ffffff",
        "on-surface-variant": "#c7c4d7",
        outline: {
          variant: "rgba(199, 196, 215, 0.15)",
        },
        // Shadcn/UI Compatibility
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        'md': 'var(--radius)',
        'lg': '0.5rem',
      },
      boxShadow: {
        'atmospheric': '0px 24px 48px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}

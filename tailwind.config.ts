import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-25": "#EEF5F0",
        "primary-50": "#E6F5EB",
        "primary-100": "#B0DFC0",
        "primary-200 ": "#8AD0A2",
        "primary-300": "#55BB78",
        "primary-400": "#34AD5D",
        "primary-500": "#019935",
        "primary-600": "#018B30",
        "primary-700": "#016D26",
        "primary-800": "#01541D",
        "primary-900": "#004016",
        "gray-25": "#f2f3f5",
        "gray-50": "#eaebed",
        "gray-100": "#bfc2c8",
        "gray-200 ": "#9fa4ad",
        "gray-300": "#747b87",
        "gray-400": "#596170",
        "gray-500": "#2f3a4c",
        "gray-600": "#2b3545",
        "gray-700": "#212936",
        "gray-800": "#1a202a",
        "gray-900": "#141820",
        "gray-primary": "#3B3B3B",
        "danger-25": "#fbf1f1",
        "danger-50": "#fbeae9",
        "danger-100": "#f3beba",
        "danger-200 ": "#ee9e99",
        "danger-300": "#e6726a",
        "danger-400": "#e1574d",
        "danger-500": "#d92d21",
        "danger-600": "#c5291e",
        "danger-700": "#9a2017",
        "danger-800": "#771912",
        "danger-900": "#5b130e",
        "warning-25": "#fffaf2",
        "warning-50": "#fff7e9",
        "warning-100": "#fee7ba",
        "warning-200 ": "#fedb99",
        "warning-300": "#feca6b",
        "warning-400": "#fdc04e",
        "warning-500": "#fdb022",
        "warning-600": "#e6a01f",
        "warning-700": "#b47d18",
        "warning-800": "#8b6113",
        "warning-900": "#6a4a0e",
        "success-25": "#eef8f3",
        "success-50": "#e7f8f0",
        "success-100": "#b6e9d1",
        "success-200 ": "#92deba",
        "success-300": "#60cf9b",
        "success-400": "#41c588",
        "success-500": "#12b76a",
        "success-600": "#10a760",
        "success-700": "#0d824b",
        "success-800": "#0a653a",
        "success-900": "#084d2d",
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
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      fontSize: {
        "display-3xl": [
          "96px",
          {
            lineHeight: "120px",
          },
        ],
        "display-2xl": [
          "72px",
          {
            lineHeight: "90px",
          },
        ],
        "display-xl": [
          "60px",
          {
            lineHeight: "72px",
          },
        ],
        "display-lg": [
          "48px",
          {
            lineHeight: "60px",
          },
        ],
        "display-md": [
          "36px",
          {
            lineHeight: "44px",
          },
        ],
        "display-sm": [
          "30px",
          {
            lineHeight: "38px",
          },
        ],
        "display-xs": [
          "24px",
          {
            lineHeight: "32px",
          },
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        md: "100%",
        lg: "1400px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

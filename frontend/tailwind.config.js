/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface": "#faf9f6",
        "on-surface": "#1b1c1a",
        "primary": "#004e99",
        "secondary": "#495f83",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f4f3f0",
        "outline-variant": "#c1c6d4",
        "on-surface-variant": "#414752",
        "error": "#ba1a1a",
      },
      fontFamily: {
        "manrope": ["Manrope", "sans-serif"],
        "inter": ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}
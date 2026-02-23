/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#1775d3",
        "primary-dark": "#125ea8",
        "background-light": "#FAFAFA",
        "background-dark": "#111921",
        "text-main": "#0e141b",
        "text-sub": "#4e7397",
        "danger": "#F44336",
      },
      fontFamily: {
        "display": ["Lexend", "sans-serif"]
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
      },
      colors: {
        primary: {
          500: '#1775d3',
        },
        slate: {
          600: '#4e7397',
          900: '#0e141b',
        }
      }
    },
  },
  plugins: [],
}
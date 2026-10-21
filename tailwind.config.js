/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'glow-pink': '#E91E63',
        'glow-pink-light': '#F8BBD0',
        'glow-pink-dark': '#C2185B',
      },
    },
  },
  plugins: [],
}
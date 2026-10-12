/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#31035C',
          600: '#43067A',
          700: '#31035C',
          800: '#230242',
          900: '#18012E',
          accent: '#A64FFC',
          vibrant: '#A64FFC',
          deep: '#31035C',
          navy: '#18012E',
          dark: '#230242',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 24px -2px rgba(15, 23, 42, 0.06)',
        'premium': '0 20px 40px -15px rgba(166, 79, 252, 0.25)',
        'glow': '0 0 25px -2px rgba(166, 79, 252, 0.45)',
        'glow-lg': '0 0 35px 2px rgba(166, 79, 252, 0.60)',
      }
    },
  },
  plugins: [],
}

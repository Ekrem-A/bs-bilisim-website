/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bs-blue': {
          50: '#e0f7ff',
          100: '#b3e9ff',
          200: '#80dbff',
          300: '#4dcdff',
          400: '#26c0ff',
          500: '#00b3ff',
          600: '#00a0e6',
          700: '#0086bf',
          800: '#006d99',
          900: '#004d6d',
        },
        'gorgonx-red': {
          500: '#ef4444',
          600: '#dc2626',
        },
        'gorgonx-orange': {
          500: '#f97316',
          600: '#ea580c',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

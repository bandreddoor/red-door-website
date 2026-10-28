import type { Config } from 'tailwindcss'
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { cream: '#fcf1e5', ink: '#000000', red: '#b22222' },
    fontFamily: {
      display: ['var(--font-display)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      sans: ['var(--font-body)', 'Helvetica Neue', 'Arial', 'sans-serif'],
    },
  } },
  plugins: [],
} satisfies Config

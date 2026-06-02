/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#080C14',
        darkCard: 'rgba(15, 23, 42, 0.45)',
        accentTeal: '#0df2c9',
        accentViolet: '#8b5cf6',
        accentIndigo: '#6366f1',
        textMuted: '#94a3b8',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        }
      },
      boxShadow: {
        'neon-teal': '0 0 15px rgba(13, 242, 201, 0.15)',
        'neon-indigo': '0 0 15px rgba(99, 102, 241, 0.15)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}

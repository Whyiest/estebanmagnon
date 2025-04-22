/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'float-slow': 'float 30s ease-in-out infinite',
        'float-slow-reverse': 'floatReverse 30s ease-in-out infinite',
        'pulse-slow': 'pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow-reverse': 'pulseReverse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(10px, 10px) scale(1.05)' },
          '50%': { transform: 'translate(0, 20px) scale(1)' },
          '75%': { transform: 'translate(-10px, 10px) scale(0.95)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(-10px, -10px) scale(0.95)' },
          '50%': { transform: 'translate(0, -20px) scale(1)' },
          '75%': { transform: 'translate(10px, -10px) scale(1.05)' },
        },
        pulse: {
          '0%, 100%': { opacity: '0.08', transform: 'scale(1)' },
          '50%': { opacity: '0.15', transform: 'scale(1.1)' },
        },
        pulseReverse: {
          '0%, 100%': { opacity: '0.15', transform: 'scale(1.1)' },
          '50%': { opacity: '0.08', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
} 
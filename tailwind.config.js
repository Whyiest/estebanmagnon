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
        'float-slow': 'float 20s ease-in-out infinite',
        'float-slow-reverse': 'floatReverse 20s ease-in-out infinite',
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow-reverse': 'pulseReverse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(20px, 20px) scale(1.1)' },
          '50%': { transform: 'translate(0, 40px) scale(1)' },
          '75%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(-20px, -20px) scale(0.9)' },
          '50%': { transform: 'translate(0, -40px) scale(1)' },
          '75%': { transform: 'translate(20px, -20px) scale(1.1)' },
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
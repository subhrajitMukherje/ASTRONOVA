/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      },
      colors: {
        cosmic: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6fe',
          300: '#a5b8fc',
          400: '#8b93f8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3d2aa3',
          900: '#312182',
          950: '#0f1629',
        },
        golden: {
          50: '#fefcf3',
          100: '#fef7e0',
          200: '#fdecc1',
          300: '#fbdb96',
          400: '#f7c469',
          500: '#f59e0b',
          600: '#dc8607',
          700: '#b76609',
          800: '#94530f',
          900: '#794510',
        },
        mystical: {
          50: '#faf7ff',
          100: '#f3edff',
          200: '#e8deff',
          300: '#d8c4ff',
          400: '#c19aff',
          500: '#a66eff',
          600: '#9147ff',
          700: '#7c2fff',
          800: '#6a1fff',
          900: '#5713d4',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.8)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #0f1629 0%, #1e1b4b 50%, #312e81 100%)',
        'golden-gradient': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        'mystical-gradient': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
      }
    },
  },
  plugins: [],
};
import type {Config} from 'tailwindcss';
import {fontFamily} from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx,mdx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1280px'
      }
    },
    extend: {
      colors: {
        forest: '#03423C',
        teal: '#03735F',
        sand: '#E7D2A0',
        mist: '#F7FAF9',
        ink: '#0F1F1C'
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        display: ['var(--font-tajawal)', ...fontFamily.sans]
      },
      boxShadow: {
        soft: '0 12px 40px -18px rgba(3, 66, 60, 0.3)',
        glow: '0 0 0 1px rgba(3, 115, 95, 0.12), 0 18px 38px -24px rgba(15, 31, 28, 0.25)'
      },
      borderRadius: {
        xl: '1rem',
        '3xl': '1.75rem'
      },
      keyframes: {
        fadeUp: {
          '0%': {opacity: '0', transform: 'translateY(20px)'},
          '100%': {opacity: '1', transform: 'translateY(0)'}
        }
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease-out forwards'
      }
    }
  },
  plugins: []
};

export default config;

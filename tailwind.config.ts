import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Soft Pastel Color Palette - Pure Love Theme
        love: {
          50: '#FFF0F5',   // Softest pink
          100: '#FFE4E9',  // Very light pink
          200: '#FFD1DC',  // Light pink
          300: '#FFB6C1',  // Light pink (classic)
          400: '#FFA8C5',  // Medium light pink
          500: '#FF91C7',  // Medium pink
          600: '#FF7BB8',  // Medium dark pink
        },
        lavender: {
          50: '#F5F0FF',
          100: '#E9E4FF',
          200: '#D1C4FF',
          300: '#B8A4FF',
          400: '#9F84FF',
        },
        peach: {
          50: '#FFF5ED',
          100: '#FFE8D6',
          200: '#FFD1B3',
          300: '#FFBA90',
        },
        mint: {
          50: '#F0FFF4',
          100: '#E4FFED',
          200: '#C4FFD6',
          300: '#A4FFBF',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        bodyEn: ['var(--font-body-en)', 'system-ui', 'sans-serif'],
        bodyTh: ['var(--font-body-th)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
        heading: ['var(--font-heading)', 'serif'],
        love: ['var(--font-love)', 'cursive'],
        elegant: ['var(--font-elegant)', 'serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        // Smooth entrance animations
        'fade-in': 'fade-in 0.6s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'fade-in-down': 'fade-in-down 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'zoom-in': 'zoom-in 0.5s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
        // Continuous animations
        'float-gentle': 'float-gentle 6s ease-in-out infinite',
        // New smooth animations
        'breathe': 'breathe 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'shimmer-slow': 'shimmer-slow 3s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'zoom-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-15px) translateX(10px) rotate(2deg)' },
          '66%': { transform: 'translateY(-5px) translateX(-10px) rotate(-2deg)' },
        },
        'breathe': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'shimmer-slow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'glow-pulse': {
          '0%': { boxShadow: '0 0 20px rgba(255, 182, 193, 0.4)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 182, 193, 0.8)' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 182, 193, 0.5)',
        'glow-lg': '0 0 40px rgba(255, 182, 193, 0.6)',
        'glow-xl': '0 0 60px rgba(255, 182, 193, 0.7)',
        'love': '0 10px 40px rgba(255, 182, 193, 0.3)',
        'love-lg': '0 20px 60px rgba(255, 182, 193, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};
export default config;


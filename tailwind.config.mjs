/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#D8FBFD',
        surface: '#F8EDEB',
        warm: {
          50: '#fdf8f6',
          100: '#f8edeb',
          200: '#f0d5d0',
          300: '#e5b8b0',
          400: '#d8958a',
          500: '#cc7a6d',
          600: '#b86152',
          700: '#9a4d40',
          800: '#814238',
          900: '#6c3a33',
        },
        teal: {
          light: '#D8FBFD',
          DEFAULT: '#5eead4',
          dark: '#0d9488',
        },
      },
      fontFamily: {
        serif: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'bounce-card': 'bounce-card 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'bounce-card': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
    },
  },
  plugins: [],
}

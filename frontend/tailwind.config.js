/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chicoia': {
          'lime': '#B8FF00',
          'dark': '#0a0a0a',
          'blue': '#4A90E2',
          'yellow': '#ffeb3b',
          'gray': '#666'
        }
      },
      backgroundColor: {
        'primary': '#0a0a0a',
        'secondary': '#1a1a1a',
        'tertiary': '#2a2a2a'
      },
      textColor: {
        'primary': '#ffffff',
        'secondary': '#B8FF00',
        'accent': '#4A90E2'
      }
    },
  },
  plugins: [],
}

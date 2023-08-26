/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '0.25rem',
          lg: '0.5rem',
          xl: '1rem',
          '2xl': '2rem',
        },
      },
      extend: {
        colors: {
          primary: '#008080',
          secondary: '#FF6B6B',
        }
      },
  },
  plugins: [],
}


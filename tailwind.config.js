/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'serif': ['Poppins', 'serif'],
      },
    extend: {
        colors: {
        'light-beige': '#F8F2ED',
        'medium-beige': '#EED4C3',
        'dark-beige': '#DDA683',
        'light-orange': '#FC8939',
        'dark-navy': '#2E3653',
        'dark-black': '#000000',
      },
    },
  },
  plugins: [],
};

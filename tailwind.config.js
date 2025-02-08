/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: '#F8F2ED',   // Light Beige
        peach: '#EED4C3',   // Soft Peach
        tan: '#DDA683',     // Warm Tan
        orange: '#FC8939',  // Vibrant Orange
        navy: '#2E3653',    // Deep Navy Blue
        black: '#000000'    // Black
      },
    },
  },
  plugins: [],
};

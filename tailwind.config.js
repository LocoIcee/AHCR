/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#9c7459',
        tealGrey: '#BAC9CD',
        darkbrown: '#523A28',
        offwhite: '#fAfAfA',
        beige: '#f3e6dc',
      },
      fontFamily: {
        secondary: ['"Cookie"', 'cursive'],
      },
    },
  },
  plugins: [],
};

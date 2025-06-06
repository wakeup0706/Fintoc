/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#371DCD',
        'hoverColor': "#4b31e1",
        'disableColor': "#7966e7",
        'secondary': '#EFEFEF',
        'secondary-100': 'light-gray',
        'ct-grey': '#3A3A3A',
        'ct-dark-600': '#222',
        'ct-dark-200': '#e5e7eb',
        'ct-dark-100': '#f5f6f7',
        'ct-blue-600': '#2363eb',
        'ct-yellow-600': '#f9d13e',
      },
      fontFamily: {
        Poppins: ['Poppins, sans-serif'],
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'spin-reverse': 'spin-reverse 20s linear infinite',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(to bottom right, #361BD0, #2680CD)',
      },
    },
  },
  plugins: [],
};

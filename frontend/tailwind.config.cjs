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
        'secondary': '#EFEFEF',
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
      container: {
        center: true,
        padding: '1rem',
        screens: {
          lg: '1125px',
          xl: '1125px',
          '2xl': '1125px',
        },
      },
      keyframes: {
        'stick-1-open': {
          '0%': { width: '45px' },
          '40%': { backgroundColor: '#ff1456', width: '8px', transform: 'translate(40px, 0)' },
          '75%': { width: '8px', transform: 'translate(40px, -50px)', animationTimingFunction: 'cubic-bezier(0,1,1,1)' },
          '100%': { backgroundColor: '#ff1456', width: '8px', transform: 'translate(35px, 46px)', display: 'none'},
        },
        'stick-1-close': {
          '0%': { width: '0px' },
          '100%': { width: '45px', transform: 'translate(0, 0)' },
        },
        'stick-2-open': {
          '80%': { backgroundColor: '#2DFDB9', transform: 'translate(0px, 0px) rotate(0deg)' },
          '100%': { backgroundColor: '#ff1456', transform: 'translate(0px, 0px) rotate(40deg)', },
        },
        'stick-2-close': {
          '0%': { backgroundColor: '#ff1456', width: '45px' },
          '20%': { backgroundColor: '#ff1456', width: '8px', transform: 'translate(0, 0px) rotate(40deg)' },
          '40%': { backgroundColor: '#2DFDB9', width: '0px' },
          '65%': { transform: 'translate(0, -70px)', animationTimingFunction: 'cubic-bezier(0,1,1,1)' },
          '100%': { width: '45px', transform: 'translate(0, 0px)' },
        },
        'stick-3-open': {
          '80%': { backgroundColor: '#2DFDB9', transform: 'translate(0px, 0px) rotate(0deg)' },
          '100%': { backgroundColor: '#ff1456', transform: 'translate(0px, -13px) rotate(-40deg)' },
        },
        'stick-3-close': {
          '0%': { backgroundColor: '#ff1456', width: '45px' },
          '20%': { backgroundColor: '#ff1456', width: '8px', transform: 'translate(0, -23px) rotate(-40deg)' },
          '40%': { backgroundColor: '#2DFDB9' },
          '65%': { transform: 'translate(0, -93px)', animationTimingFunction: 'cubic-bezier(0,1,1,1)' },
          '100%': { width: '45px', transform: 'translate(0, 0px)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        "stick-1-open": "stick-1-open 0.6s ease-out forwards",
        "stick-1-close": "stick-1-close 0.6s ease-out forwards",
        "stick-2-open": "stick-2-open 0.6s linear forwards",
        "stick-2-close": "stick-2-close 0.6s ease-out forwards",
        "stick-3-open": "stick-3-open 0.6s linear forwards",
        "stick-3-close": "stick-3-close 0.6s ease-out forwards",
        'spin-slow': 'spin 10s linear infinite', // Slower spin
        'spin-reverse': 'spin-reverse 20s linear infinite',
      },
    },
  },
  plugins: [],
};

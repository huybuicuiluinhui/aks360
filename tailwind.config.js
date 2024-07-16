/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-25%)' },
          '50%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'bounce-slow': 'bounce 1s infinite',
      },
      colors: {
        main: "#09121F",
        gray: "#768085",
        bg: "#FBFBFB",
      },
    },
  },
  plugins: [],
};

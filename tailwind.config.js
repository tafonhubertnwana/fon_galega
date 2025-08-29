/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#800000', // Maroon
        primaryLight: '#B22222', 
        secondary: 'rgba(252, 185, 0, 1)', 
      },
    //   animation: {
    //   spin: 'spin 0.8s linear infinite',
    // },
    },
  },
  plugins:  [require("daisyui")],
};

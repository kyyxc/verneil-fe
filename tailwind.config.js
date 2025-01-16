/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        caveat: ["Caveat", 'serif'],
        montserrat: ["Montserrat", 'serif'],
      },
      colors: {
        bg: "#4F4D4D"
      }
    },
  },
  plugins: [],
}
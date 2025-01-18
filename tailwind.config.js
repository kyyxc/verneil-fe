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
        apple: ["-apple-system", "BlinkMacSystemFont", "sans-serif"]
      },
      colors: {
        bg: "#4F4D4D",
        btn: "#363636",
        1: "#f5f5f5"
      }
    },
  },
  plugins: [],
}
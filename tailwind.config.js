/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F8FEE6",
          100: "#EBFDBA",
          200: "#DEFB8D",
          300: "#D1FA61",
          400: "#C4F834",
          500: "#B7F708",
          600: "#93C606",
          700: "#6E9405",
          800: "#496303",
          900: "#253102"
        }
      }
    },
  },
  plugins: [],
}

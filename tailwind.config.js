/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        curx:['"Amatic SC"', 'cursive'],
        cmax:['Montserrat', 'sans-serif']
      }
    }
    
  },
  plugins: [],
}


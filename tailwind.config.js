/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#dbe2ef',
        'regal-blue': '#3f72af',
        'dark-blue':  '#112d4e'
      }
    },
  },
  plugins: [],
}


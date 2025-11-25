/** @type {import {  } from "module";('tailwindcss').Config} */
module.exports = {
  // Set the dark mode strategy to 'class'
  darkMode: 'class', 
 content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
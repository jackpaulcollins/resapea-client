  // tailwind.config.js
  const colors = require('tailwindcss/colors')

  module.exports = {
    purge: [],
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
     darkMode: false, // or 'media' or 'class'
     theme: {
       extend: {
         colors: {
           "cream-orange": { 200: "#fccb8b"},
           "cyan": { 200: "#80deea"},
           "light-green": {200: "#c5e1a5"},
           "deep-orange": { 200: "#ffab91"},
           "amber": { 200: "#ffe082"},
           "teal": { 200: "#80cbc4"},
           "light-blue": { 200: "#b3e5fc"},
           "fuscia": { 200: "#d946ef"}
         }
       },
     },
     variants: {
       extend: {},
     },
     plugins: [
      require('@tailwindcss/forms')
     ],
   }
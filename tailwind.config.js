/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
 
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
   
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage:{
        'cover-image':"url('../public/images/coverimg.png')",
        'about-cover':"url('../public/images/about-cover.png')",
        'modal-img':"url('../public/images/imgmodal.png')",
      },
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        error:'#EB0028',
        cyan: '#79FFE1',
        'semi-black':'rgba(0,0,0,0.7)',
        'almost-black':'rgba(0,0,0,0.8)'
      },
   
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      zIndex: {
        '100': '100',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  darkMode: 'class',
  
}

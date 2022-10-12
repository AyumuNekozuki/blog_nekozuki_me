/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  content: [],
  theme: {
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      'themepurple': '#66AD6F',
      'themepurple_bg': '#F1F8F1',
      'themepurple_shadow': '#F1F8F1',
      'white': '#ffffff',
      'black': '#000000',
      'nicoblack': '#252525',
      'gray': '#cccccc',
    },
    fontFamily:{
      'mplus': ["M PLUS Rounded 1c", 'sans-serif'],
      'notosans': ["Noto Sans JP", 'sans-serif'],
    },
    extend: {
      boxShadow:{
        'card': '0 0 3px #66AD6F',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  content: [],
  theme: {
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      'themepurple': '#3A3343',
      'themepurple_bg': '#E9E9EA',
      'themepurple_shadow': '#E9E9EA',
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
        'card': '0 0 3px #3A3343',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}

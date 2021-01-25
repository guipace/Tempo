module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'background2': "url('./img/background2.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

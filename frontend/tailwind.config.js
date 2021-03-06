module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'background2': "url('./img/background2.jpg')",
      }),
      colors: {
        'space-cadet': '#2D3142',
        'independence': '#4F5D75',
        'silver': '#BFC0C0',
        'mandarin': '#EA5C1F',
        'mandarin-dark': '#BB4411',
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover'],
      scale: ['group-hover'],
    },
  },
  plugins: [],
}

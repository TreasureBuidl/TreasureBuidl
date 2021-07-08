module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      darkBlue: '#212B38',
      darkerBlue: '#1E272E',
      purple: {
        DEFAULT: '#726EFF',
        dark: '#5855c6',
        darker: '#3f3d8d',
      },
      black: '#000000',
      white: '#FFFFFF',
      offWhite: '#C4C3D0',
      aave: {
        DEFAULT: '#B6509E',
        dark: '#994385',
        darker: '#7c326b',
      },
      uniswap: {
        DEFAULT: '#FF007A',
        dark: '#a70050',
        darker: '#640030',
      },
      compound: {
        DEFAULT: '#00D395',
        dark: '#068b64',
        darker: '#01583f',
      },
      balancer: {
        DEFAULT: '#1f1e1f',
        dark: '#191919',
        darker: '#111011',
      },
      stakeDao: {
        DEFAULT: '#010001',
        dark: '#111111',
        darker: '#252525',
      },
    },
    fontFamily: {
      body: ['Open Sans'],
      display: ['"Gidole"'],
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [require('tailwind-scrollbar')],
}

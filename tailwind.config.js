module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
  },
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        primary: 'var(--primary-color)',
      },
    },
    screens: {
      // min-width
      xs: '481px',
      sm: '577px',
      md: '769px',
      lg: '993px',
      xl: '1201px',
      xxl: '1601px',
    },
  },
}

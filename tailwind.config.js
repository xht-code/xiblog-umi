module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
  },
  content: ['./src/**/*.tsx'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'rgb(155, 155, 155)',
      },
    },
    screens: {
      // 按照 antd 栅格匹配
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

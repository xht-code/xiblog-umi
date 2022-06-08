module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**.tsx',
    './src/layouts/**.tsx',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
      },
    },
  },
}

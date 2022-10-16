import routes from './routes'

export default {
  title: "XHT's Blog",
  history: { type: 'hash' },
  proxy: {
    '/api': {
      target: 'http://0.0.0.0:2022/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  routes,
  antd: {},
  request: {},
  tailwindcss: {},
  deadCode: {},
  targets: { chrome: 51 },
  mfsu: {
    // FIXME: umi 4.0.25 启动报错
    // https://github.com/umijs/umi/issues/9522#issuecomment-1278468580
    strategy: 'normal',
    esbuild: false,
  },
  lessLoader: {
    modifyVars: {
      hack: `true; @import "~@/styles/variables/index.less";`,
    },
  },
  npmClient: 'pnpm',
}

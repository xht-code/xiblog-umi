import routes from './routes'

export default {
  title: "XHT's Blog",
  history: { type: 'hash' },
  routes,
  antd: {},
  request: {},
  tailwindcss: {},
  deadCode: {},
  targets: { chrome: 51 },
  mfsu: {
    // FIXME: 4.0.0-rc.21 开启后 less 变量不生效
    // esbuild: true
  },
  lessLoader: {
    modifyVars: {
      hack: `true; @import "~@/styles/variables/index.less";`,
    },
  },
  hash: true,
  npmClient: 'pnpm',
}

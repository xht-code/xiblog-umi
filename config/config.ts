import routes from './routes'

export default {
  routes,
  antd: {},
  request: {},
  tailwindcss: {},
  deadCode: {},
  targets: { chrome: 51 },
  mfsu: {
    esbuild: true,
  },
  lessLoader: {
    modifyVars: {
      hack: `true; @import "~@/styles/variables/index.less";`,
    },
  },
  hash: true,
  npmClient: 'pnpm',
}

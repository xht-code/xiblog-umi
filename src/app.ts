import { message } from 'antd'
import { match } from 'path-to-regexp'
import { RequestConfig } from 'umi'
import { IS_PROD } from './utils/env'

export const request: RequestConfig = {
  requestInterceptors: [
    (config) => {
      const { url: originalUrl } = config
      const url = IS_PROD
        ? `//xiblog-nestjs-xiblog-hwfyluqscj.cn-shenzhen.fcapp.run${originalUrl}`
        : `/api${originalUrl}`
      return { ...config, url }
    },
  ]
    // 请求拦截器的顺序是反的
    .reverse(),
  responseInterceptors: [
    (response: any) => {
      const { data } = response
      if (data?.errCode) {
        return Promise.reject(response)
      }
      return response
    },
  ],
  errorConfig: {
    errorHandler(err) {
      console.log('errorHandler: ', err)

      if (err?.data?.errMsg) {
        message.error(err.data.errMsg)
      }
    },
  },
}

export function onRouteChange(opts: any) {
  const { routes, location } = opts
  const allRoute = Object.values<any>(routes).filter(
    (route) => route?.id !== '@@/global-layout',
  )
  const currentRoute = allRoute.find((route: any) =>
    match(route.path)(location.pathname.replace(/^\/qy/, '') || '/'),
  )
  // 设置标题
  if (currentRoute?.title) {
    document.title = `${currentRoute.title} | XHT's Blog`
  }
}

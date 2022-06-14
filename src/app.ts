import { RequestConfig } from '@umijs/max'
import { message } from 'antd'
import { match } from 'path-to-regexp'
import { setTitle } from './utils'
import { IS_PROD } from './utils/env'
import Storage, { StorageKey } from './utils/storage'

export const request: RequestConfig = {
  requestInterceptors: [
    (config) => {
      const { url: originalUrl } = config
      const url = IS_PROD
        ? `//xiblog-nestjs-xiblog-hwfyluqscj.cn-shenzhen.fcapp.run${originalUrl}`
        : `/api${originalUrl}`
      return { ...config, url }
    },
    (config) => {
      const token = Storage.get(StorageKey.TOKEN, '')
      return {
        ...config,
        headers: { ...config.headers, Authorization: `Bearer ${token}` },
      }
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
      // TODO：按文档说法应该是进不来，等官方处理后移除
      if (err?.config?.skipErrorHandler) return

      if (err?.name !== 'AxiosError') return

      const {
        response: { data },
      } = err
      if (data?.errMsg) {
        message.error(data.errMsg)
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
    match(route.path)(location.pathname),
  )
  // 设置标题
  if (currentRoute?.title) {
    setTitle(currentRoute.title)
  }
}

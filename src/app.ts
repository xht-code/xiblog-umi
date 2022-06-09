import { match } from 'path-to-regexp'

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

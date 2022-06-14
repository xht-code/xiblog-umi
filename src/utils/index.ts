import { base64Encode } from './encryption'

export const svgToImage = (svg: string) => {
  return 'data:image/svg+xml;base64,' + base64Encode(svg)
}

export const setTitle = (title: string) => {
  document.title = `${title} | XHT's Blog`
}

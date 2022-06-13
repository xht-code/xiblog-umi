export enum StorageKey {
  TOKEN = 'token',
  USER_INFO = 'userInfo',
}

const get = <T = Record<string, any> | string>(
  key: string,
  defaultValue?: T,
) => {
  let cache = localStorage.getItem(key) ?? ''
  if (/^\{(.|\r|\n)*\}$|^\[(.|\r|\n)*\]$/.test(cache)) {
    try {
      const obj = JSON.parse(cache)
      cache = obj.data
    } catch {}
  }
  return (
    typeof defaultValue !== 'undefined' ? cache || defaultValue : cache
  ) as T
}

const set = <T = Record<string, any> | string>(key: string, value: T) => {
  let cacheValue = JSON.stringify({ data: value })
  localStorage.setItem(key, cacheValue)
}

const remove = (key: string) => {
  localStorage.removeItem(key)
}

const clear = () => {
  localStorage.clear()
}

const Storage = { set, get, remove, clear }

export default Storage

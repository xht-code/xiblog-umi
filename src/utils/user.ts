import * as cryptojs from 'crypto-js'

export const encryptPassword = (password: string) => {
  return cryptojs.SHA256(password).toString()
}

export const DEFAULT_AVATAR = 'https://pics.xiblog.cn/avatar/default_avatar.png'

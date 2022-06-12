import * as cryptojs from 'crypto-js'

export const encryptPassword = (password: string) => {
  return cryptojs.SHA256(password).toString()
}

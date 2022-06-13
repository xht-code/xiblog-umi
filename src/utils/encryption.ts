import CryptoJS from 'crypto-js'

export const base64Parse = (base64: string) => {
  return CryptoJS.enc.Base64.parse(base64).toString(CryptoJS.enc.Utf8)
}

export const base64Encode = (str: string) => {
  return CryptoJS.enc.Utf8.parse(str).toString(CryptoJS.enc.Base64)
}

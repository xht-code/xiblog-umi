import { request } from '@umijs/max'

export const register = (data) => {
  return request('/auth/register', {
    method: 'POST',
    data,
  })
}

export const login = (data) => {
  return request('/auth/login', {
    method: 'POST',
    data,
  })
}

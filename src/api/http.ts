import axios from 'axios'
import { checkHaveToken, getToken } from '@/utils'
import { goToLogin } from '@/composables/goto'
import { messageError, messageRedirectToSignIn } from '@/composables/message'
import type { AxiosInstance, AxiosResponse } from 'axios'

export const http: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use((config) => {
  if (checkHaveToken()) config.headers!.Authorization = `Bearer ${getToken()}`

  return config
})

http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message, data } = response.data

    if (code === 0) {
      return data
    } else {
      messageError(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          messageRedirectToSignIn(goToLogin)
          break
      }
      return Promise.reject(error)
    }
  }
)

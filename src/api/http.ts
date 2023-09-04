import axios from 'axios'

import type {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'

interface newAxiosInstance extends AxiosInstance {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse<any>>
  }
}

const http: newAxiosInstance = axios.create({
  baseURL: 'http://localhost:5173',
  timeout: 3 * 1000
  // withCredentials: true,
})

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.params = { ...config.params }
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default http

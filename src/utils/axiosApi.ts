import axios, { AxiosInstance } from 'axios'

let api: AxiosInstance

export function createApi() {
  // Here we set the base URL for all requests made to the api
  api = axios.create()

  // We set an interceptor for each request to
  api.interceptors.request.use(
    (config: any) => {
        config.headers = {
          ...config.headers,
        }
      return config
    },
    (error: any) => {
      return Promise.reject(error)
    }
  )
  return api
}
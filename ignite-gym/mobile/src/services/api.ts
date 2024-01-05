import axios, { AxiosError, AxiosInstance } from 'axios'
import { AppError } from '@utils/AppError'
import { getAuthTokenInStorage, saveAuthTokenInStorage } from '@storage/storageAuthToken';

type SignOut = () => void;

interface PromiseType {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

interface ApiInstanceCustomProps extends AxiosInstance {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.0.101:3333'
}) as ApiInstanceCustomProps

let failedQueue: PromiseType[] = []
let isRefreshing = false

api.registerInterceptTokenManager = signOut => {
  // When we use the interceptor, its important to keep the requisition flow
  const interceptTokenManager =  api.interceptors.response.use((response) => {
    // If it resolves, just return the response
    return response
  }, async (requestError) => {
    // Verify if the error in the request, occurs because of an invalid token
    if (requestError.response.status === 401) {
      if (requestError.response.data.message === 'token.expired' || requestError.response.data.message === 'token.invalid') {
        const { refresh_token } = await getAuthTokenInStorage()

        if (!refresh_token) {
          signOut()
          return Promise.reject(requestError)
        }

        const originalRequestConfig = requestError.config
        
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              onSuccess: (token: string) => {
                originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` }
                resolve(api(originalRequestConfig))
              },
              onFailure: (error) => {
                reject(error)
              }
            })
          })
        }

        isRefreshing = true

        return new Promise(async (resolve, reject) => {
          try {
            const { data } = await api.post('/sessions/refresh-token', { refresh_token })
            await saveAuthTokenInStorage({ token: data.token, refresh_token: data.refresh_token })

            if (originalRequestConfig.data) {
              originalRequestConfig.data = JSON.parse(originalRequestConfig.data)
            }

            originalRequestConfig.headers = { 'Authorization': `Bearer ${data.token}` }
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

            failedQueue.forEach(request => {
              request.onSuccess(data.token)
            })

            resolve(api(originalRequestConfig))
          } catch (error: any) {
            failedQueue.forEach(request => {
              request.onFailure(error)
            })

            signOut()
            reject(error)
          } finally {
            isRefreshing = false
            failedQueue = []
          }
        })
      }

      signOut()
    }

    // If it rejects, if there is a message from the backend, we show it, if dont return the error, and where it occours, we show an message
    if (requestError.message && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message))
    } else {
      return Promise.reject(requestError)
    }
  })

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}



export { api }

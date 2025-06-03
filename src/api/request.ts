import Taro from '@tarojs/taro'

const BASE_URL = 'http://110.40.50.232:8081'

interface RequestParams {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  headers?: Record<string, string>
}

interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

class Request {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async request<T = any>(params: RequestParams): Promise<ApiResponse<T>> {
    const { url, method = 'GET', data, headers = {} } = params
    
    // 获取用户token
    const token = Taro.getStorageSync('token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    try {
      Taro.showLoading({ title: '加载中...' })

      const response = await Taro.request({
        url: this.baseURL + url,
        method,
        data,
        header: {
          'Content-Type': 'application/json',
          ...headers
        }
      })

      Taro.hideLoading()

      if (response.statusCode === 200) {
        return response.data as ApiResponse<T>
      } else {
        throw new Error(`请求失败: ${response.statusCode}`)
      }
    } catch (error) {
      Taro.hideLoading()
      Taro.showToast({
        title: '网络请求失败',
        icon: 'error'
      })
      throw error
    }
  }

  get<T = any>(url: string, data?: any, headers?: Record<string, string>) {
    return this.request<T>({ url, method: 'GET', data, headers })
  }

  post<T = any>(url: string, data?: any, headers?: Record<string, string>) {
    return this.request<T>({ url, method: 'POST', data, headers })
  }

  put<T = any>(url: string, data?: any, headers?: Record<string, string>) {
    return this.request<T>({ url, method: 'PUT', data, headers })
  }

  delete<T = any>(url: string, data?: any, headers?: Record<string, string>) {
    return this.request<T>({ url, method: 'DELETE', data, headers })
  }
}

export const request = new Request(BASE_URL)
export default request 
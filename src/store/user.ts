import { create } from 'zustand'
import Taro from '@tarojs/taro'

interface UserInfo {
  id: string
  username: string
  nickname: string
  avatar: string
  phone: string
  email: string
  role: 'student' | 'enterprise' | 'college' | 'admin'
  status: number
}

interface UserState {
  userInfo: UserInfo | null
  token: string | null
  isLogin: boolean
  setUserInfo: (userInfo: UserInfo) => void
  setToken: (token: string) => void
  login: (userInfo: UserInfo, token: string) => void
  logout: () => void
  initUserFromStorage: () => void
}

export const useUserStore = create<UserState>((set, get) => ({
  userInfo: null,
  token: null,
  isLogin: false,

  setUserInfo: (userInfo: UserInfo) => {
    set({ userInfo, isLogin: true })
    Taro.setStorageSync('userInfo', userInfo)
  },

  setToken: (token: string) => {
    set({ token })
    Taro.setStorageSync('token', token)
  },

  login: (userInfo: UserInfo, token: string) => {
    set({ userInfo, token, isLogin: true })
    Taro.setStorageSync('userInfo', userInfo)
    Taro.setStorageSync('token', token)
  },

  logout: () => {
    set({ userInfo: null, token: null, isLogin: false })
    Taro.removeStorageSync('userInfo')
    Taro.removeStorageSync('token')
    // 跳转到登录页
    Taro.reLaunch({ url: '/pages/login/index' })
  },

  initUserFromStorage: () => {
    try {
      const userInfo = Taro.getStorageSync('userInfo')
      const token = Taro.getStorageSync('token')
      
      if (userInfo && token) {
        set({ userInfo, token, isLogin: true })
      }
    } catch (error) {
      console.error('Failed to init user from storage:', error)
    }
  }
})) 
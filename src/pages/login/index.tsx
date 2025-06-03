import { useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useUserStore } from '../../store/user'
import './index.less'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const { login } = useUserStore()

  // 微信登录
  const handleWechatLogin = async () => {
    setLoading(true)
    try {
      // 获取微信登录code
      const loginRes = await Taro.login()
      
      if (loginRes.code) {
        // 获取用户信息授权
        const userProfileRes = await Taro.getUserProfile({
          desc: '用于完善用户资料'
        })
        
        if (userProfileRes.userInfo) {
          // 模拟调用后端API进行登录
          const mockUserInfo = {
            id: 'wx_' + Date.now(),
            username: userProfileRes.userInfo.nickName,
            nickname: userProfileRes.userInfo.nickName,
            avatar: userProfileRes.userInfo.avatarUrl,
            role: 'student' as 'student' | 'enterprise' | 'college' | 'admin',
            status: 1,
            phone: '',
            email: ''
          }
          
          const mockToken = 'mock_token_' + Date.now()
          
          // 保存用户信息到store
          login(mockUserInfo, mockToken)
          
          Taro.showToast({
            title: '登录成功',
            icon: 'success'
          })
          
          setTimeout(() => {
            Taro.reLaunch({ url: '/pages/home/index' })
          }, 1000)
        }
      } else {
        throw new Error('获取登录code失败')
      }
    } catch (error) {
      console.error('微信登录失败:', error)
      
      if (error.errMsg && error.errMsg.includes('cancel')) {
        Taro.showToast({
          title: '取消登录',
          icon: 'none'
        })
      } else {
        Taro.showToast({
          title: '登录失败，请重试',
          icon: 'error'
        })
      }
    } finally {
      setLoading(false)
    }
  }

  // 游客模式
  const handleGuestMode = () => {
    Taro.showModal({
      title: '游客模式',
      content: '游客模式下可以浏览内容，但无法使用个人功能。确定继续？',
      success: (res) => {
        if (res.confirm) {
          Taro.reLaunch({ url: '/pages/home/index' })
        }
      }
    })
  }

  // Web端登录提示
  const handleWebLogin = () => {
    Taro.showModal({
      title: '其他登录方式',
      content: '账号密码登录、手机验证码登录等功能请在Web端使用。',
      showCancel: false,
      confirmText: '我知道了'
    })
  }

  return (
    <View className='login-page'>
      {/* 顶部Logo区域 */}
      <View className='login-header'>
        <View className='logo-section'>
          <View className='logo-icon'>🌞</View>
          <Text className='app-name'>光伏产业云平台</Text>
          <Text className='app-slogan'>绿色能源，智慧未来</Text>
        </View>
      </View>

      {/* 登录区域 */}
      <View className='login-content'>
        <View className='welcome-text'>
          <Text className='welcome-title'>欢迎使用</Text>
          <Text className='welcome-subtitle'>连接光伏行业生态圈</Text>
        </View>

        {/* 微信登录按钮 */}
        <View className='login-methods'>
          <Button
            className='wechat-login-btn'
            loading={loading}
            onClick={handleWechatLogin}
          >
            <View className='btn-content'>
              <Text className='wechat-icon'>💬</Text>
              <Text className='btn-text'>微信快速登录</Text>
            </View>
          </Button>
        </View>

        {/* 功能介绍 */}
        <View className='features-section'>
          <Text className='features-title'>平台功能</Text>
          <View className='features-grid'>
            <View className='feature-item'>
              <Text className='feature-icon'>📰</Text>
              <Text className='feature-text'>行业资讯</Text>
            </View>
            <View className='feature-item'>
              <Text className='feature-icon'>💼</Text>
              <Text className='feature-text'>岗位信息</Text>
            </View>
            <View className='feature-item'>
              <Text className='feature-icon'>📚</Text>
              <Text className='feature-text'>在线学习</Text>
            </View>
            <View className='feature-item'>
              <Text className='feature-icon'>⚡</Text>
              <Text className='feature-text'>绿电交易</Text>
            </View>
          </View>
        </View>

        {/* 底部说明 */}
        <View className='login-footer'>
          <Text className='footer-text'>登录即表示同意《用户协议》和《隐私政策》</Text>
          <Text className='footer-tip'>
            完整功能体验请访问Web端平台
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Login 
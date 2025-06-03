import { useEffect, useState } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useUserStore } from '../../store/user'
import { userApi } from '../../api'
import './index.less'

const Personal = () => {
  const { userInfo, isLogin, logout } = useUserStore()
  const [userStats, setUserStats] = useState({
    courseCount: 0,
    jobApplications: 0,
    newsViewed: 0,
    tradingVolume: '0'
  })

  useEffect(() => {
    if (!isLogin) {
      Taro.navigateTo({ url: '/pages/login/index' })
      return
    }
    fetchUserStats()
  }, [isLogin])

  const fetchUserStats = async () => {
    try {
      // 这里可以添加获取用户统计数据的API调用
      // const res = await userApi.getUserStats()
      // setUserStats(res.data)
    } catch (error) {
      console.error('Failed to fetch user stats:', error)
    }
  }

  const handleLogout = () => {
    Taro.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          logout()
        }
      }
    })
  }

  const menuItems = [
    {
      icon: '📚',
      title: '我的课程',
      subtitle: `已报名 ${userStats.courseCount} 门课程`,
      url: '/pages/courses/index?tab=my'
    },
    {
      icon: '💼',
      title: '求职记录',
      subtitle: `已投递 ${userStats.jobApplications} 个职位`,
      url: '/pages/jobs/index?tab=my'
    },
    {
      icon: '📰',
      title: '阅读历史',
      subtitle: `已阅读 ${userStats.newsViewed} 篇文章`,
      url: '/pages/news/index?tab=history'
    },
    {
      icon: '⚡',
      title: '交易记录',
      subtitle: `累计交易 ${userStats.tradingVolume} 元`,
      url: '/pages/trading/index?tab=history'
    },
    {
      icon: '🔐',
      title: '身份认证',
      subtitle: '完善身份信息',
      url: '/pages/authentication/index'
    },
    {
      icon: '⚙️',
      title: '设置',
      subtitle: '账号设置和隐私',
      url: '/pages/settings/index'
    }
  ]

  const handleMenuClick = (item: any) => {
    Taro.navigateTo({ url: item.url })
  }

  if (!isLogin || !userInfo) {
    return (
      <View className='personal-page'>
        <View className='not-login'>
          <Text className='not-login-text'>请先登录</Text>
          <Button 
            className='login-btn'
            onClick={() => Taro.navigateTo({ url: '/pages/login/index' })}
          >
            去登录
          </Button>
        </View>
      </View>
    )
  }

  return (
    <View className='personal-page'>
      {/* 用户信息区域 */}
      <View className='user-header'>
        <View className='user-info'>
          <Image 
            src={userInfo.avatar || '/assets/images/default-avatar.jpg'} 
            className='avatar'
            mode='aspectFill'
          />
          <View className='user-details'>
            <Text className='username'>{userInfo.nickname || userInfo.username}</Text>
            <Text className='role'>{getRoleText(userInfo.role)}</Text>
            <Text className='status'>{userInfo.status === 1 ? '已认证' : '未认证'}</Text>
          </View>
        </View>
        <View className='user-stats'>
          <View className='stat-item'>
            <Text className='stat-value'>{userStats.courseCount}</Text>
            <Text className='stat-label'>课程</Text>
          </View>
          <View className='stat-item'>
            <Text className='stat-value'>{userStats.jobApplications}</Text>
            <Text className='stat-label'>求职</Text>
          </View>
          <View className='stat-item'>
            <Text className='stat-value'>{userStats.newsViewed}</Text>
            <Text className='stat-label'>阅读</Text>
          </View>
        </View>
      </View>

      {/* 功能菜单 */}
      <View className='menu-section'>
        {menuItems.map((item, index) => (
          <View 
            key={index} 
            className='menu-item'
            onClick={() => handleMenuClick(item)}
          >
            <View className='menu-icon'>
              <Text>{item.icon}</Text>
            </View>
            <View className='menu-content'>
              <Text className='menu-title'>{item.title}</Text>
              <Text className='menu-subtitle'>{item.subtitle}</Text>
            </View>
            <View className='menu-arrow'>
              <Text>{'>'}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* 退出登录 */}
      <View className='logout-section'>
        <Button 
          className='logout-button'
          onClick={handleLogout}
        >
          退出登录
        </Button>
      </View>
    </View>
  )
}

function getRoleText(role: string): string {
  const roleMap = {
    student: '学生',
    enterprise: '企业',
    college: '高校',
    admin: '管理员'
  }
  return roleMap[role] || '用户'
}

export default Personal 
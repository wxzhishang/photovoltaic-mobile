import { useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

interface InnovationItem {
  id: string
  title: string
  summary: string
  content: string
  thumbnail: string
  publishTime: string
  viewCount: number
  source: string
  tags: string[]
}

const Innovation = () => {
  const [innovationList, setInnovationList] = useState<InnovationItem[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: '创新政策' })
    fetchInnovationList()
  }, [])

  const fetchInnovationList = async (page = 1) => {
    if (loading) return
    
    setLoading(true)
    try {
      // 模拟政策数据
      const mockData: InnovationItem[] = [
        {
          id: '1',
          title: '国家支持光伏产业发展的最新政策',
          summary: '新能源补贴政策持续优化，助力光伏产业高质量发展，推动绿色能源产业升级转型',
          content: '详细政策内容...',
          thumbnail: '/assets/images/innovation1.jpg',
          publishTime: '2024-01-15',
          viewCount: 1250,
          source: '国家发改委',
          tags: ['光伏补贴', '新能源', '产业政策']
        },
        {
          id: '2',
          title: '分布式光伏发电管理办法解读',
          summary: '详解分布式光伏发电项目管理和并网要求，规范行业发展秩序',
          content: '详细政策内容...',
          thumbnail: '/assets/images/innovation2.jpg',
          publishTime: '2024-01-12',
          viewCount: 980,
          source: '国家能源局',
          tags: ['分布式', '并网管理', '项目管理']
        },
        {
          id: '3',
          title: '光伏发电项目用地政策指导意见',
          summary: '明确光伏发电项目用地性质和管理要求，保障项目合规建设',
          content: '详细政策内容...',
          thumbnail: '/assets/images/innovation3.jpg',
          publishTime: '2024-01-10',
          viewCount: 756,
          source: '自然资源部',
          tags: ['用地政策', '项目建设', '合规管理']
        },
        {
          id: '4',
          title: '碳达峰碳中和背景下光伏产业发展机遇',
          summary: '分析双碳目标对光伏产业的政策利好和发展机遇',
          content: '详细政策内容...',
          thumbnail: '/assets/images/innovation4.jpg',
          publishTime: '2024-01-08',
          viewCount: 1123,
          source: '生态环境部',
          tags: ['碳达峰', '碳中和', '发展机遇']
        },
        {
          id: '5',
          title: '光伏制造业高质量发展实施方案',
          summary: '推动光伏制造业技术创新和产业升级，提升国际竞争力',
          content: '详细政策内容...',
          thumbnail: '/assets/images/innovation5.jpg',
          publishTime: '2024-01-05',
          viewCount: 892,
          source: '工信部',
          tags: ['制造业', '技术创新', '产业升级']
        }
      ]

      // 模拟分页
      const pageSize = 10
      const startIndex = (page - 1) * pageSize
      const endIndex = startIndex + pageSize
      const pageData = mockData.slice(startIndex, endIndex)

      if (page === 1) {
        setInnovationList(pageData)
      } else {
        setInnovationList(prev => [...prev, ...pageData])
      }

      setHasMore(endIndex < mockData.length)
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch innovation list:', error)
      Taro.showToast({
        title: '加载失败',
        icon: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleItemClick = (item: InnovationItem) => {
    Taro.navigateTo({
      url: `/pages/innovationDetail/index?id=${item.id}`
    })
  }

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchInnovationList(currentPage + 1)
    }
  }

  return (
    <View className='innovation-page'>
      <View className='header-banner'>
        <Text className='banner-title'>创新政策</Text>
        <Text className='banner-subtitle'>关注政策动态，把握发展机遇</Text>
      </View>

      <View className='innovation-list'>
        {innovationList.map(item => (
          <View
            key={item.id}
            className='innovation-item'
            onClick={() => handleItemClick(item)}
          >
            <View className='item-header'>
              <View className='policy-tag'>政策</View>
              <Text className='item-source'>{item.source}</Text>
            </View>
            
            <Text className='item-title'>{item.title}</Text>
            
            <Text className='item-summary'>{item.summary}</Text>
            
            <View className='item-tags'>
              {item.tags.map((tag, index) => (
                <View key={index} className='tag'>
                  {tag}
                </View>
              ))}
            </View>
            
            <View className='item-meta'>
              <Text className='meta-time'>{item.publishTime}</Text>
              <Text className='meta-views'>阅读 {item.viewCount}</Text>
            </View>
          </View>
        ))}
      </View>

      {hasMore && (
        <View className='load-more' onClick={handleLoadMore}>
          <Text className='load-more-text'>
            {loading ? '加载中...' : '点击加载更多'}
          </Text>
        </View>
      )}

      {!hasMore && innovationList.length > 0 && (
        <View className='no-more'>
          <Text className='no-more-text'>已加载全部内容</Text>
        </View>
      )}
    </View>
  )
}

export default Innovation 
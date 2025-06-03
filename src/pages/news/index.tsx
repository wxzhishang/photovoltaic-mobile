import { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { newsApi } from '../../api'
import './index.less'

interface NewsItem {
  id: string
  title: string
  summary: string
  thumbnail: string
  publishTime: string
  viewCount: number
}

const News = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchNewsList(1)
  }, [])

  const fetchNewsList = async (pageNum: number) => {
    if (loading) return

    setLoading(true)
    try {
      const res = await newsApi.getNewsList({ page: pageNum, size: 20 })
      if (res.code === 200) {
        const newData = res.data.list || []
        if (pageNum === 1) {
          setNewsList(newData)
        } else {
          setNewsList(prev => [...prev, ...newData])
        }
        setHasMore(newData.length >= 20)
        setPage(pageNum)
      }
    } catch (error) {
      console.error('Failed to fetch news:', error)
      Taro.showToast({
        title: '加载失败',
        icon: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleNewsClick = (newsItem: NewsItem) => {
    Taro.navigateTo({ 
      url: `/pages/newsDetail/index?id=${newsItem.id}` 
    })
  }

  const onScrollToLower = () => {
    if (hasMore && !loading) {
      fetchNewsList(page + 1)
    }
  }

  return (
    <View className='news-page'>
      <ScrollView
        className='news-scroll'
        scrollY
        onScrollToLower={onScrollToLower}
      >
        <View className='news-list'>
          {newsList.map(news => (
            <View 
              key={news.id} 
              className='news-item'
              onClick={() => handleNewsClick(news)}
            >
              <Image 
                src={news.thumbnail || '/assets/images/default-news.jpg'} 
                className='news-thumbnail'
                mode='aspectFill'
              />
              <View className='news-content'>
                <Text className='news-title'>{news.title}</Text>
                <Text className='news-summary'>{news.summary}</Text>
                <View className='news-meta'>
                  <Text className='news-time'>{news.publishTime}</Text>
                  <Text className='news-views'>{news.viewCount}次阅读</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {loading && (
          <View className='loading'>
            <Text>加载中...</Text>
          </View>
        )}

        {!hasMore && newsList.length > 0 && (
          <View className='no-more'>
            <Text>没有更多了</Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default News 
import { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
// import { newsApi } from '../../api'
import './index.less'


interface NewsItem {
  id: string
  title: string
  summary: string
  thumbnail: string
  publishTime: string
  viewCount: number
}

// Mock 数据
const mockNewsList: NewsItem[] = [
  {
    id: '1',
    title: '光伏发电技术最新突破，转换效率达到新高度',
    summary: '中国科学家在硅基光伏电池领域取得重大突破，实验室转换效率突破26%，为商业化应用奠定基础。',
    thumbnail: 'https://img-s.msn.cn/tenant/amp/entityid/AA1HjU72.img?w=768&h=430&m=6',
    publishTime: '2024-01-15 10:30:00',
    viewCount: 1256
  },
  {
    id: '2',
    title: '绿色电力市场交易规模创新高',
    summary: '2024年第一季度绿色电力交易量同比增长45%，清洁能源消纳比例进一步提升。',
    thumbnail: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.qh5aC7TKjLBSzdao4TFZvQHaNW?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3',
    publishTime: '2024-01-14 14:20:00',
    viewCount: 987
  },
  {
    id: '3',
    title: '分布式光伏发电项目推广政策出台',
    summary: '国家发改委发布最新政策，支持分布式光伏发电项目建设，简化审批流程。',
    thumbnail: 'http://pmoe549a9.pic1.ysjianzhan.cn/upload/u4202821969320885464fm253fmtautoapp120fJPEG_webp.jpg',
    publishTime: '2024-01-13 09:15:00',
    viewCount: 2134
  },
  {
    id: '4',
    title: '储能技术与光伏发电融合发展趋势',
    summary: '储能技术的快速发展为光伏发电的稳定性和经济性提供了有力支撑。',
    thumbnail: 'https://ts1.tc.mm.bing.net/th/id/R-C.b03595e156485a93f398b99e45b6e401?rik=4XAWTMKCOpq1Rg&riu=http%3a%2f%2fi9.hexun.com%2f2021-12-29%2f205023516.jpg&ehk=FvZsPKc9T1pBAlx220elVxhnZAZKAaw20U8ndp1x54o%3d&risl=&pid=ImgRaw&r=0',
    publishTime: '2024-01-12 16:45:00',
    viewCount: 1567
  },
  {
    id: '5',
    title: '智能电网建设助力清洁能源发展',
    summary: '智能电网技术的推广应用，有效提升了清洁能源的并网消纳能力。',
    thumbnail: 'https://img3.jiemian.com/101/original/20210721/162686425355507300_a700x398.jpg',
    publishTime: '2024-01-11 11:30:00',
    viewCount: 890
  },
  {
    id: '6',
    title: '光伏产业链供应链稳定性持续增强',
    summary: '国内光伏产业链布局日趋完善，核心环节供应链稳定性大幅提升。',
    thumbnail: 'https://x0.ifengimg.com/res/2023/364FA32E52F1D91B38BA527629AFAE2703391823_size985_w1080_h608.png',
    publishTime: '2024-01-10 08:00:00',
    viewCount: 1890
  },
  {
    id: '7',
    title: '新能源汽车与光伏充电站结合发展',
    summary: '光伏充电站成为新能源汽车充电基础设施建设的重要方向。',
    thumbnail: 'https://img3.jiemian.com/101/original/20230208/167582241699903900_a700x398.jpg',
    publishTime: '2024-01-09 13:25:00',
    viewCount: 1456
  },
  {
    id: '8',
    title: '碳中和目标下的光伏发电规划',
    summary: '为实现碳中和目标，光伏发电装机容量将在未来十年内大幅增长。',
    thumbnail: 'https://ts1.tc.mm.bing.net/th/id/R-C.64a236e238299e14f648987d1655c47b?rik=kkkMjVKe%2biMmUQ&riu=http%3a%2f%2fstatics.nengyuanjie.net%2f2022%2f0407%2f20220407113641676.jpg&ehk=2nNDL0TH4R5%2be1qel0iRALrptTt5XtECGFK78zb2Uzw%3d&risl=&pid=ImgRaw&r=0',
    publishTime: '2024-01-08 15:40:00',
    viewCount: 2345
  },
  {
    id: '9',
    title: '光伏发电成本持续下降趋势分析',
    summary: '技术进步和规模效应推动光伏发电成本不断下降，平价上网时代到来。',
    thumbnail: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.ZNcyQzdbkWeqDtLoXnysLgHaEK?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3',
    publishTime: '2024-01-07 10:15:00',
    viewCount: 1678
  },
  {
    id: '10',
    title: '农光互补项目助力乡村振兴',
    summary: '农光互补模式在保障农业生产的同时，为农民增收提供了新途径。',
    thumbnail: 'https://ts1.tc.mm.bing.net/th/id/R-C.7302cbfdce1eae0d9f25c7449d9cd3ae?rik=mNbsczbO4G2K3w&riu=http%3a%2f%2fimg1.ally.net.cn%2f2017%2f0928%2f20170928015849322.jpg&ehk=dBFDmSHNnyljC4wTEn%2bjE8HNoZD34DucmJW%2fdFAzoec%3d&risl=&pid=ImgRaw&r=0',
    publishTime: '2024-01-06 14:30:00',
    viewCount: 1234
  },
  {
    id: '11',
    title: '海上光伏发电技术发展前景',
    summary: '海上光伏发电作为新兴技术，具有广阔的发展空间和应用前景。',
    thumbnail: 'https://n.sinaimg.cn/translate/20170927/__ZR-fymfcih6969990.jpg',
    publishTime: '2024-01-05 09:45:00',
    viewCount: 987
  },
  {
    id: '12',
    title: '光伏发电设备智能运维系统升级',
    summary: '基于人工智能的光伏发电设备运维系统，大幅提升了设备运行效率。',
    thumbnail: 'https://ts1.tc.mm.bing.net/th/id/R-C.c9f5cfe04d5120e3b0e988cb5b816441?rik=HCOYn0%2bTzBnaDw&riu=http%3a%2f%2fimg.cnwest.com%2fa%2f10001%2f202305%2f05%2f82b92a415db82324a33aa7ad8c5c8334.jpg&ehk=y7QSdVTjALvFQmaT8DESfH29ZeEwOTDQDcoKE9cIQx4%3d&risl=&pid=ImgRaw&r=0',
    publishTime: '2024-01-04 16:20:00',
    viewCount: 1567
  }
]

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
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const pageSize = 12
      const startIndex = (pageNum - 1) * pageSize
      const endIndex = startIndex + pageSize
      const newData = mockNewsList.slice(startIndex, endIndex)
      
      if (pageNum === 1) {
        setNewsList(newData)
      } else {
        setNewsList(prev => [...prev, ...newData])
      }
      setHasMore(endIndex < mockNewsList.length)
      setPage(pageNum)
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
      <View className='header-banner'>
        <Text className='banner-title'>咨询中心</Text>
        <Text className='banner-subtitle'>及时了解行业动态，掌握前沿资讯</Text>
      </View>

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
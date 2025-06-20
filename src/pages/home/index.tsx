import { useEffect, useState } from 'react'
import { View, Text, Image, Swiper, SwiperItem, Button, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
// import { newsApi, expertApi } from '../../api'
import { useUserStore } from '../../store/user'
import './index.less'
import Avatar1 from '../../assets/images/avatar1.jpg'
import Avatar2 from '../../assets/images/avatar2.jpg'



interface NewsItem {
  id: string
  title: string
  summary: string
  thumbnail: string
  publishTime: string
  viewCount: number
  category: 'industry' | 'policy' | 'technology' | 'market' | 'company'
  categoryName: string
  type?: 'news' | 'innovation'
}

interface ExpertItem {
  id: string
  name: string
  title: string
  avatar: string
  company: string
  expertise: string[]
  experience: string
  projects: number
}

interface StatsData {
  totalEnergy: string
  todayTrading: string
  activeUsers: string
  completedProjects: string
}

const Home = () => {
  const [bannerList] = useState([
    { id: 1, image: 'https://www.zjrongxiang.com/upfile/attached/202109/c14c94444bb04f25008209f9665b16c9.jpg', title: '光伏产业发展新机遇' },
    { id: 2, image: 'https://ts1.tc.mm.bing.net/th/id/R-C.7ebf8e6ea93ad6fc98d0b46f3eca2a4b?rik=pZFwTtmXHFFL8A&riu=http%3a%2f%2fwww.chinaden.cn%2fmeng_k%2fproducts_pic%2fimage%2f20210908154884298429.png&ehk=Kwzv7txuctUJ28aU%2ftiSqoy%2fSw%2belBLCJ9NR6mDeVxY%3d&risl=&pid=ImgRaw&r=0', title: '绿色能源交易平台' },
    { id: 3, image: 'https://pic1.zhimg.com/v2-59692850aecd5c691ce31340c7fee13c_720w.jpg?source=172ae18b', title: '专业人才培养计划' }
  ])
  
  const [statsData] = useState<StatsData>({
    totalEnergy: '1,234.5 MW',
    todayTrading: '89.6 万元',
    activeUsers: '12,345',
    completedProjects: '567'
  })

  const [newsList, setNewsList] = useState<NewsItem[]>([])
  const [expertList, setExpertList] = useState<ExpertItem[]>([])
  const [loading, setLoading] = useState(false)

  const { initUserFromStorage, userInfo } = useUserStore()

  const gridData = [
    {
      icon: '⚡',
      title: '绿电交易',
      color: '#1976d2'
    },
    {
      icon: '📰',
      title: '资讯中心',
      color: '#1976d2'
    },
    {
      icon: '📋',
      title: '创新政策',
      color: '#1976d2'
    },
    {
      icon: '👨‍🎓',
      title: '专家咨询',
      color: '#1976d2'
    },
    {
      icon: '📚',
      title: '在线学习',
      color: '#1976d2'
    },
    {
      icon: '💼',
      title: '招聘信息',
      color: '#1976d2'
    }
  ]

  useEffect(() => {
    initUserFromStorage()
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      // 获取新闻列表（mock数据）
      const mockNews: NewsItem[] = [
        {
          id: '1',
          title: '2024年光伏产业发展报告发布，装机量再创新高',
          summary: '据统计，2024年全国光伏新增装机容量达到216GW，同比增长48%，创历史新高。',
          thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzNjYzUxZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWPkeWxleeOhyDwn5ONPC90ZXh0Pjwvc3ZnPg==',
          publishTime: '2024-01-20',
          viewCount: 1520,
          category: 'industry',
          categoryName: '行业动态'
        },
        {
          id: '2',
          title: '分布式光伏发电政策迎来重大调整',
          summary: '国家能源局发布新政策，进一步优化分布式光伏发电项目的并网流程和补贴机制。',
          thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmY5ODAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5pS/562W8J+TiTwvdGV4dD48L3N2Zz4=',
          publishTime: '2024-01-18',
          viewCount: 980,
          category: 'policy',
          categoryName: '政策法规'
        },
        {
          id: '3',
          title: '钙钛矿太阳能电池效率突破25%大关',
          summary: '中科院最新研究成果显示，钙钛矿太阳能电池实验室效率已突破25%，有望实现商业化应用。',
          thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTk3NmQyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5oqA5pyv8J+UpDwvdGV4dD48L3N2Zz4=',
          publishTime: '2024-01-17',
          viewCount: 1320,
          category: 'technology',
          categoryName: '技术创新'
        },
        {
          id: '4',
          title: '光伏发电成本持续下降，平价上网时代来临',
          summary: '研究报告显示，光伏发电LCOE已降至0.25元/kWh以下，在多个地区实现平价上网。',
          thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNGNhZjUwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5biC5Zy65YiG5p6Q8J+ThTwvdGV4dD48L3N2Zz4=',
          publishTime: '2024-01-16',
          viewCount: 890,
          category: 'market',
          categoryName: '市场分析'
        },
        {
          id: '5',
          title: '隆基绿能发布新一代Hi-MO 6组件，效率再提升',
          summary: '隆基绿能正式发布Hi-MO 6系列组件，最高效率达到22.8%，引领行业技术进步。',
          thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOWMyN2IwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+57qm55qE6IO96LqQIPCfmoQgPC90ZXh0Pjwvc3ZnPg==',
          publishTime: '2024-01-15',
          viewCount: 750,
          category: 'company',
          categoryName: '企业资讯'
        },
        {
          id: '6',
          title: '储能系统成本下降助力光伏+储能模式普及',
          summary: '锂电池储能系统成本大幅下降，光伏+储能项目经济性不断提升，市场前景广阔。',
          thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmY1NzIyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5YKo6IO9IPCfUJQ8L3RleHQ+PC9zdmc+',
          publishTime: '2024-01-14',
          viewCount: 680,
          category: 'technology',
          categoryName: '技术创新'
        },
        {
          id: '7',
          title: '欧盟通过可再生能源新法案，光伏迎来新机遇',
          summary: '欧盟通过新的可再生能源法案，计划到2030年可再生能源占比达到45%。',
          thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjA3ZDhiIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+6ZKu55uf8J+NrTwvdGV4dD48L3N2Zz4=',
          publishTime: '2024-01-13',
          viewCount: 560,
          category: 'policy',
          categoryName: '政策法规'
        },
        {
          id: '8',
          title: '光伏制造业智能化转型加速推进',
          summary: '多家光伏企业加大智能制造投入，通过数字化转型提升生产效率和产品质量。',
          thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDBiY2Q0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5pm65og66IO96LqQ8J+kljwvdGV4dD48L3N2Zz4=',
          publishTime: '2024-01-12',
          viewCount: 420,
          category: 'industry',
          categoryName: '行业动态'
        },
        {
          id: '9',
          title: '家庭光伏发电用户突破300万户',
          summary: '数据显示，全国家庭分布式光伏装机用户已突破300万户，同比增长超过150%。',
          thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZjMTA3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5a625bqt8J+PoDwvdGV4dD48L3N2Zz4=',
          publishTime: '2024-01-11',
          viewCount: 380,
          category: 'market',
          categoryName: '市场分析'
        },
        {
          id: '10',
          title: '通威股份多晶硅产能扩张计划公布',
          summary: '通威股份宣布新建20万吨多晶硅产能，预计2025年投产，进一步巩固市场地位。',
          thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDVhMjQ5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+6YCa5aiB8J+UizwvdGV4dD48L3N2Zz4=',
          publishTime: '2024-01-10',
          viewCount: 290,
          category: 'company',
          categoryName: '企业资讯'
        }
      ]
      setNewsList(mockNews)

      // 获取专家推荐（mock数据）
      const mockExperts: ExpertItem[] = [
        {
          id: '1',
          name: '张明华',
          title: '光伏技术专家',
          avatar: Avatar1,
          company: '清华大学',
          expertise: ['太阳能电池技术', '光伏材料研究'],
          experience: '20年',
          projects: 50
        },
        {
          id: '2',
          name: '李建国',
          title: '光伏项目总监',
          avatar: Avatar2,
          company: '阳光电源',
          expertise: ['大型光伏电站建设', '项目管理'],
          experience: '15年',
          projects: 35
        },
        {
          id: '3',
          name: '王晓敏',
          title: '储能技术专家',
          avatar: 'https://cl.tyut.edu.cn/__local/C/A6/4E/79980161DCF16ADE233C975D5BF_F7083067_13B69.png',
          company: '宁德时代',
          expertise: ['储能系统设计', '电池技术'],
          experience: '12年',
          projects: 28
        },
        {
          id: '4',
          name: '陈志强',
          title: '光伏投资顾问',
          avatar: 'https://history.nankai.edu.cn/_upload/article/images/40/69/2287598b4493b6794b7152e27388/ce001c6a-7623-4377-bd9d-f09e1ff52300.jpg',
          company: '正泰新能源',
          expertise: ['投资分析', '市场研究'],
          experience: '18年',
          projects: 42
        },
        {
          id: '5',
          name: '刘海波',
          title: '光伏制造专家',
          avatar: 'https://faculty.ecnu.edu.cn/_upload/article/images/f9/0d/a490bfaa4200917bb035528c01ef/20030007_s.jpg',
          company: '隆基绿能',
          expertise: ['制造工艺', '质量管理'],
          experience: '16年',
          projects: 38
        },
        {
          id: '6',
          name: '赵文静',
          title: '政策研究专家',
          avatar: 'https://www.sustech.edu.cn/uploads/medium/2024/06/13160634_59621.jpg',
          company: '国家发改委',
          expertise: ['政策分析', '法规解读'],
          experience: '14年',
          projects: 25
        }
      ]
      setExpertList(mockExperts)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGridClick = (item: any, index: number) => {
    const routes = [
      '/pages/greenElectricity/index',
      '/pages/news/index',
      '/pages/innovation/index',
      '/pages/experts/index',
      '/pages/courses/index',
      '/pages/jobs/index'
    ]
    
    if (routes[index]) {
      Taro.navigateTo({ url: routes[index] })
    }
  }

  const handleNewsClick = (newsItem: NewsItem) => {
    Taro.navigateTo({ 
      url: `/pages/newsDetail/index?id=${newsItem.id}` 
    })
  }

  const handleMoreNews = () => {
    Taro.navigateTo({ url: '/pages/news/index' })
  }

  return (
    <View className='home-page'>
      {/* 轮播图 */}
      <View className='banner-section'>
        <Swiper
          className='banner-swiper'
          indicatorColor='rgba(255, 255, 255, 0.5)'
          indicatorActiveColor='#fff'
          circular
          indicatorDots
          autoplay
          interval={3000}
        >
          {bannerList.map(banner => (
            <SwiperItem key={banner.id}>
              <View className='banner-item'>
                <Image 
                  src={banner.image} 
                  className='banner-image'
                  mode='aspectFill'
                />
                <View className='banner-content'>
                  <Text className='banner-title'>{banner.title}</Text>
                </View>
              </View>
            </SwiperItem>
          ))}
        </Swiper>
      </View>

      {/* 统计数据 */}
      <View className='stats-section'>
        <View className='stats-card'>
          <View className='card-header'>
            <Text className='card-title'>实时数据</Text>
          </View>
          <View className='stats-grid'>
            <View className='stats-item'>
              <Text className='stats-value'>{statsData.totalEnergy}</Text>
              <Text className='stats-label'>总装机容量</Text>
            </View>
            <View className='stats-item'>
              <Text className='stats-value'>{statsData.todayTrading}</Text>
              <Text className='stats-label'>今日交易额</Text>
            </View>
            <View className='stats-item'>
              <Text className='stats-value'>{statsData.activeUsers}</Text>
              <Text className='stats-label'>活跃用户</Text>
            </View>
            <View className='stats-item'>
              <Text className='stats-value'>{statsData.completedProjects}</Text>
              <Text className='stats-label'>完成项目</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 功能网格 */}
      <View className='grid-section'>
        {gridData.map((item, index) => (
          <View
            key={index}
            className='grid-item'
            onClick={() => handleGridClick(item, index)}
          >
            <View className='grid-icon' style={{ backgroundColor: item.color }}>
              {item.icon}
            </View>
            <Text className='grid-title'>{item.title}</Text>
          </View>
        ))}
      </View>

      {/* 新闻资讯 */}
      <View className='news-section'>
        <View className='section-header'>
          <Text className='section-title'>新闻资讯</Text>
          <Text 
            className='more-text'
            onClick={handleMoreNews}
          >
            查看更多 →
          </Text>
        </View>
      </View>

      {/* 专家推荐 */}
      <View className='expert-section'>
        <View className='section-header'>
          <Text className='section-title'>专家推荐</Text>
        </View>
        
        <ScrollView scrollX className='expert-scroll'>
          <View className='expert-list-horizontal'>
            {expertList.map(expert => (
              <View
                key={expert.id}
                className='expert-card-horizontal'
              >
                <Image 
                  src={expert.avatar} 
                  className='expert-avatar-horizontal'
                  mode='aspectFill'
                />
                <View className='expert-info-horizontal'>
                  <Text className='expert-name-horizontal'>{expert.name}</Text>
                  <Text className='expert-title-horizontal'>{expert.title}</Text>
                  <Text className='expert-company-horizontal'>{expert.company}</Text>
                  <View className='expert-stats'>
                    <Text className='stat-item'>{expert.experience} 经验</Text>
                    <Text className='stat-item'>{expert.projects} 项目</Text>
                  </View>
                  <View className='expert-tags-horizontal'>
                    {expert.expertise.slice(0, 2).map((tag, index) => (
                      <View key={index} className='expert-tag-horizontal'>{tag}</View>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default Home

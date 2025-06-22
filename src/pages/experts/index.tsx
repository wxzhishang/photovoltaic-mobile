import { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { Search } from '@taroify/core'
import '@taroify/core/search/style'
import Taro from '@tarojs/taro'
import './index.less'

interface ExpertItem {
  id: string
  name: string
  title: string
  description: string
  avatar: string
  specialty: string[]
  experience: string
  organization: string
  rating: number
  consultationCount: number
  status: 'available' | 'busy' | 'offline'
  tags: string[]
}

const Experts = () => {
  const [expertsList, setExpertsList] = useState<ExpertItem[]>([])
  const [filteredExperts, setFilteredExperts] = useState<ExpertItem[]>([])
  const [loading, setLoading] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [activeTab, setActiveTab] = useState(0)

  const tabList = ['全部专家', '在线专家', '光伏技术', '政策咨询', '投资分析']

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: '专家咨询' })
    fetchExpertsList()
  }, [])

  const fetchExpertsList = async () => {
    if (loading) return
    
    setLoading(true)
    try {
      // 模拟专家数据
      const mockExperts: ExpertItem[] = [
        {
          id: '1',
          name: '张建华',
          title: '光伏系统设计专家',
          description: '20年光伏行业经验，专注于大型光伏电站设计与优化，参与过多个GW级项目建设',
          avatar: '/assets/images/avatar1.jpg',
          specialty: ['光伏系统设计', '电站规划', '技术咨询'],
          experience: '20年',
          organization: '中国光伏行业协会',
          rating: 4.9,
          consultationCount: 1250,
          status: 'available',
          tags: ['光伏设计', '电站建设', '技术指导']
        },
        {
          id: '2',
          name: '李明',
          title: '新能源政策专家',
          description: '长期从事新能源政策研究，对国家及地方光伏政策有深入理解，为企业提供政策解读服务',
          avatar: '/assets/images/avatar2.jpg',
          specialty: ['政策解读', '补贴申报', '项目备案'],
          experience: '15年',
          organization: '国家发改委能源研究所',
          rating: 4.8,
          consultationCount: 890,
          status: 'available',
          tags: ['政策解读', '补贴政策', '项目申报']
        },
        {
          id: '3',
          name: '王晓梅',
          title: '光伏投资分析师',
          description: '资深投资分析师，专注于光伏项目投资评估与风险分析，服务过百余个投资项目',
          avatar: '/assets/images/avatar1.jpg',
          specialty: ['投资分析', '项目评估', '财务建模'],
          experience: '12年',
          organization: '华能新能源投资有限公司',
          rating: 4.7,
          consultationCount: 650,
          status: 'busy',
          tags: ['投资分析', '项目评估', '风险控制']
        },
        {
          id: '4',
          name: '陈志强',
          title: '分布式光伏专家',
          description: '分布式光伏领域资深专家，在工商业分布式、户用光伏等领域有丰富实践经验',
          avatar: '/assets/images/avatar2.jpg',
          specialty: ['分布式光伏', '屋顶开发', '并网技术'],
          experience: '18年',
          organization: '隆基绿能科技股份有限公司',
          rating: 4.8,
          consultationCount: 780,
          status: 'available',
          tags: ['分布式光伏', '屋顶开发', '并网服务']
        },
        {
          id: '5',
          name: '刘芳',
          title: '光伏运维专家',
          description: '光伏电站运维管理专家，在电站运维、故障诊断、性能优化等方面具有丰富经验',
          avatar: '/assets/images/avatar1.jpg',
          specialty: ['运维管理', '故障诊断', '性能优化'],
          experience: '14年',
          organization: '天合光能股份有限公司',
          rating: 4.6,
          consultationCount: 520,
          status: 'offline',
          tags: ['运维管理', '故障诊断', '数据分析']
        },
        {
          id: '6',
          name: '赵国庆',
          title: '储能技术专家',
          description: '储能技术领域专家，专注于光储一体化系统设计，在储能技术应用方面有深度研究',
          avatar: '/assets/images/avatar2.jpg',
          specialty: ['储能技术', '光储一体化', '系统集成'],
          experience: '10年',
          organization: '宁德时代新能源科技有限公司',
          rating: 4.7,
          consultationCount: 380,
          status: 'available',
          tags: ['储能技术', '光储结合', '系统优化']
        }
      ]

      setExpertsList(mockExperts)
      setFilteredExperts(mockExperts)
    } catch (error) {
      console.error('Failed to fetch experts list:', error)
      Taro.showToast({
        title: '加载失败',
        icon: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  // 筛选专家
  const filterExperts = () => {
    let result = [...expertsList]
    
    // 按搜索关键词筛选
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase()
      result = result.filter(expert => 
        expert.name.toLowerCase().includes(keyword) || 
        expert.title.toLowerCase().includes(keyword) ||
        expert.specialty.some(s => s.toLowerCase().includes(keyword))
      )
    }
    
    // 按类别筛选
    if (activeTab > 0) {
      switch (activeTab) {
        case 1: // 在线专家
          result = result.filter(expert => expert.status === 'available')
          break
        case 2: // 光伏技术
          result = result.filter(expert => 
            expert.specialty.some(s => s.includes('光伏') || s.includes('技术') || s.includes('设计'))
          )
          break
        case 3: // 政策咨询
          result = result.filter(expert => 
            expert.specialty.some(s => s.includes('政策') || s.includes('申报') || s.includes('备案'))
          )
          break
        case 4: // 投资分析
          result = result.filter(expert => 
            expert.specialty.some(s => s.includes('投资') || s.includes('分析') || s.includes('评估'))
          )
          break
      }
    }
    
    setFilteredExperts(result)
  }

  useEffect(() => {
    filterExperts()
  }, [searchKeyword, activeTab, expertsList])

  const handleSearch = (event: any) => {
    setSearchKeyword(event.detail.value)
  }

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  const handleExpertClick = (expert: ExpertItem) => {
    Taro.navigateTo({ 
      url: `/pages/expertDetail/index?id=${expert.id}` 
    })
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return '在线'
      case 'busy': return '忙碌'
      case 'offline': return '离线'
      default: return '未知'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#52c41a'
      case 'busy': return '#faad14'
      case 'offline': return '#d9d9d9'
      default: return '#d9d9d9'
    }
  }

  return (
    <View className='experts-page'>
      <View className='header-banner'>
        <Text className='banner-title'>专家咨询</Text>
        <Text className='banner-subtitle'>汇聚行业顶尖专家，提供专业咨询服务</Text>
      </View>

      <View className='search-container'>
        <Search
          value={searchKeyword}
          placeholder='搜索专家姓名或专业领域'
          onSearch={handleSearch}
          onChange={handleSearch}
        />
      </View>

      <View className='tabs-container'>
        <View className='tabs-list'>
          {tabList.map((tab, index) => (
            <View
              key={index}
              className={`tab-item ${activeTab === index ? 'active' : ''}`}
              onClick={() => handleTabClick(index)}
            >
              <Text>{tab}</Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView className='experts-scroll' scrollY>
        <View className='experts-list'>
          {filteredExperts.map(expert => (
            <View 
              key={expert.id} 
              className='expert-item'
              onClick={() => handleExpertClick(expert)}
            >
              <View className='expert-avatar-container'>
                <Image 
                  src={expert.avatar || '/assets/images/default-avatar.jpg'} 
                  className='expert-avatar'
                  mode='aspectFill'
                />
                <View 
                  className='status-indicator'
                  style={{ backgroundColor: getStatusColor(expert.status) }}
                />
              </View>
              
              <View className='expert-content'>
                <View className='expert-header'>
                  <Text className='expert-name'>{expert.name}</Text>
                  <View className='expert-status'>
                    <Text style={{ color: getStatusColor(expert.status) }}>
                      {getStatusText(expert.status)}
                    </Text>
                  </View>
                </View>
                
                <Text className='expert-title'>{expert.title}</Text>
                <Text className='expert-organization'>{expert.organization}</Text>
                <Text className='expert-description'>{expert.description}</Text>
                
                <View className='expert-tags'>
                  {expert.tags.slice(0, 3).map((tag, index) => (
                    <View key={index} className='tag'>
                      <Text>{tag}</Text>
                    </View>
                  ))}
                </View>
                
                <View className='expert-meta'>
                  <View className='meta-item'>
                    <Text className='meta-label'>经验：</Text>
                    <Text className='meta-value'>{expert.experience}</Text>
                  </View>
                  <View className='meta-item'>
                    <Text className='meta-label'>评分：</Text>
                    <Text className='meta-value'>{expert.rating}分</Text>
                  </View>
                  <View className='meta-item'>
                    <Text className='meta-label'>咨询：</Text>
                    <Text className='meta-value'>{expert.consultationCount}次</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {filteredExperts.length === 0 && !loading && (
          <View className='empty-state'>
            <Text>暂无专家信息</Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default Experts 
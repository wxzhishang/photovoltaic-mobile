import { useEffect, useState } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
// import { tradingApi, greenElectricityApi } from '../../api'
import './index.less'

interface TradingItem {
  id: string
  title: string
  price: string
  volume: string
  location: string
  type: string
  status: string
  publishTime: string
}

interface PriceData {
  currentPrice: string
  change: string
  changePercent: string
  trend: 'up' | 'down' | 'stable'
}

// Mock数据
const mockTradingData = {
  buy: [
    {
      id: '1',
      title: '太阳能发电收购',
      price: '0.42',
      volume: '1500',
      location: '北京市',
      type: 'buy',
      status: 'active',
      publishTime: '2024-01-15 10:30'
    },
    {
      id: '2',
      title: '风力发电求购',
      price: '0.45',
      volume: '2000',
      location: '上海市',
      type: 'buy',
      status: 'active',
      publishTime: '2024-01-15 09:45'
    },
    {
      id: '3',
      title: '绿电批量收购',
      price: '0.40',
      volume: '5000',
      location: '广东省',
      type: 'buy',
      status: 'completed',
      publishTime: '2024-01-14 16:20'
    },
    {
      id: '4',
      title: '企业绿电采购',
      price: '0.43',
      volume: '3000',
      location: '江苏省',
      type: 'buy',
      status: 'active',
      publishTime: '2024-01-14 14:15'
    },
    {
      id: '5',
      title: '清洁能源收购',
      price: '0.44',
      volume: '1200',
      location: '浙江省',
      type: 'buy',
      status: 'cancelled',
      publishTime: '2024-01-14 11:30'
    }
  ],
  sell: [
    {
      id: '6',
      title: '光伏电站余电出售',
      price: '0.48',
      volume: '1800',
      location: '山东省',
      type: 'sell',
      status: 'active',
      publishTime: '2024-01-15 11:00'
    },
    {
      id: '7',
      title: '风电场绿电销售',
      price: '0.46',
      volume: '2500',
      location: '内蒙古',
      type: 'sell',
      status: 'active',
      publishTime: '2024-01-15 08:30'
    },
    {
      id: '8',
      title: '水电站清洁电力',
      price: '0.41',
      volume: '4000',
      location: '四川省',
      type: 'sell',
      status: 'completed',
      publishTime: '2024-01-14 17:45'
    },
    {
      id: '9',
      title: '分布式光伏发电',
      price: '0.47',
      volume: '800',
      location: '河南省',
      type: 'sell',
      status: 'active',
      publishTime: '2024-01-14 13:20'
    },
    {
      id: '10',
      title: '工业园区绿电',
      price: '0.44',
      volume: '2200',
      location: '江西省',
      type: 'sell',
      status: 'active',
      publishTime: '2024-01-14 10:15'
    }
  ]
}

const mockPriceData: PriceData = {
  currentPrice: '0.45',
  change: '+0.02',
  changePercent: '+4.65%',
  trend: 'up'
}

const Trading = () => {
  const [tradingList, setTradingList] = useState<TradingItem[]>([])
  const [priceData, setPriceData] = useState<PriceData>(mockPriceData)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('buy')

  useEffect(() => {
    fetchTradingData()
    fetchPriceData()
  }, [activeTab])

  const fetchTradingData = async () => {
    setLoading(true)
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // 使用mock数据
      const mockData = mockTradingData[activeTab as keyof typeof mockTradingData] || []
      setTradingList(mockData)
    } catch (error) {
      console.error('Failed to fetch trading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPriceData = async () => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 200))
      
      // 使用mock数据
      setPriceData(mockPriceData)
    } catch (error) {
      console.error('Failed to fetch price data:', error)
    }
  }

  const handleTradingClick = (item: TradingItem) => {
    Taro.navigateTo({ 
      url: `/pages/tradingDetail/index?id=${item.id}` 
    })
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  const getStatusText = (status: string) => {
    const statusMap = {
      active: '交易中',
      completed: '已成交',
      cancelled: '已取消'
    }
    return statusMap[status] || status
  }

  const getStatusColor = (status: string) => {
    const colorMap = {
      active: '#3cc51f',
      completed: '#999',
      cancelled: '#ff4757'
    }
    return colorMap[status] || '#999'
  }

  return (
    <View className='trading-page'>
      {/* 实时电价 */}
      <View className='price-header'>
        <View className='price-info'>
          <Text className='price-label'>实时电价</Text>
          <Text className='current-price'>¥{priceData.currentPrice}</Text>
          <View className={`price-change ${priceData.trend}`}>
            <Text className='change-value'>{priceData.change}</Text>
            <Text className='change-percent'>{priceData.changePercent}</Text>
          </View>
        </View>
      </View>

      {/* 标签切换 */}
      <View className='tab-header'>
        <View 
          className={`tab-item ${activeTab === 'buy' ? 'active' : ''}`}
          onClick={() => handleTabClick('buy')}
        >
          <Text>求购</Text>
        </View>
        <View 
          className={`tab-item ${activeTab === 'sell' ? 'active' : ''}`}
          onClick={() => handleTabClick('sell')}
        >
          <Text>出售</Text>
        </View>
      </View>

      {/* 交易列表 */}
      <ScrollView className='trading-scroll' scrollY>
        <View className='trading-list'>
          {tradingList.map(item => (
            <View 
              key={item.id} 
              className='trading-item'
              onClick={() => handleTradingClick(item)}
            >
              <View className='item-header'>
                <Text className='item-title'>{item.title}</Text>
                <Text 
                  className='item-status'
                  style={{ color: getStatusColor(item.status) }}
                >
                  {getStatusText(item.status)}
                </Text>
              </View>
              
              <View className='item-details'>
                <View className='detail-row'>
                  <Text className='detail-label'>价格:</Text>
                  <Text className='detail-value price'>¥{item.price}/kWh</Text>
                </View>
                <View className='detail-row'>
                  <Text className='detail-label'>电量:</Text>
                  <Text className='detail-value'>{item.volume}kWh</Text>
                </View>
                <View className='detail-row'>
                  <Text className='detail-label'>地区:</Text>
                  <Text className='detail-value'>{item.location}</Text>
                </View>
              </View>
              
              <View className='item-footer'>
                <Text className='publish-time'>{item.publishTime}</Text>
              </View>
            </View>
          ))}
        </View>

        {loading && (
          <View className='loading'>
            <Text>加载中...</Text>
          </View>
        )}
      </ScrollView>

      {/* 发布按钮 */}
      {/* <View className='publish-button'>
        <Text>发布交易</Text>
      </View> */}
    </View>
  )
}

export default Trading 
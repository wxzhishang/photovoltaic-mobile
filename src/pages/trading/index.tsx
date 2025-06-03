import { useEffect, useState } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { tradingApi, greenElectricityApi } from '../../api'
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

const Trading = () => {
  const [tradingList, setTradingList] = useState<TradingItem[]>([])
  const [priceData, setPriceData] = useState<PriceData>({
    currentPrice: '0.45',
    change: '+0.02',
    changePercent: '+4.65%',
    trend: 'up'
  })
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('buy')

  useEffect(() => {
    fetchTradingData()
    fetchPriceData()
  }, [activeTab])

  const fetchTradingData = async () => {
    setLoading(true)
    try {
      const res = await tradingApi.getTradingList({ 
        page: 1, 
        size: 20, 
        type: activeTab 
      })
      if (res.code === 200) {
        setTradingList(res.data.list || [])
      }
    } catch (error) {
      console.error('Failed to fetch trading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPriceData = async () => {
    try {
      const res = await greenElectricityApi.getRealTimePrice()
      if (res.code === 200) {
        setPriceData(res.data)
      }
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
      <View className='publish-button'>
        <Text>发布交易</Text>
      </View>
    </View>
  )
}

export default Trading 
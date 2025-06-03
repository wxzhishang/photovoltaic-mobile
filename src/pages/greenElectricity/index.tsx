import { useEffect, useState } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

interface StatsItem {
  icon: string
  number: string
  label: string
}

interface RegionData {
  name: string
  value: number
  percentage: string
}

interface CertificateData {
  id: string
  projectName: string
  company: string
  region: string
  capacity: string
  issueDate: string
  status: 'issued' | 'traded' | 'pending'
  price: number
}

interface TrendData {
  month: string
  issued: number
  traded: number
}

interface EnergyType {
  type: string
  percentage: number
  capacity: string
  color: string
}

const GreenElectricity = () => {
  const [activeTab, setActiveTab] = useState('statistics')
  const [loading, setLoading] = useState(false)

  // 统计数据
  const [statsData] = useState<StatsItem[]>([
    {
      icon: '🔋',
      number: '3,852万',
      label: '绿证发行总量(MWh)'
    },
    {
      icon: '🏭',
      number: '1,243',
      label: '参与企业数量'
    },
    {
      icon: '🌍',
      number: '31',
      label: '覆盖省市区域'
    },
    {
      icon: '💰',
      number: '126.5亿',
      label: '交易总金额(元)'
    }
  ])

  // 地区分布数据
  const [regionData] = useState<RegionData[]>([
    { name: '内蒙古', value: 8520, percentage: '22.1%' },
    { name: '新疆', value: 6890, percentage: '17.9%' },
    { name: '青海', value: 5640, percentage: '14.6%' },
    { name: '甘肃', value: 4320, percentage: '11.2%' },
    { name: '宁夏', value: 3150, percentage: '8.2%' },
    { name: '河北', value: 2980, percentage: '7.7%' },
    { name: '山东', value: 2760, percentage: '7.2%' },
    { name: '其他', value: 4190, percentage: '10.9%' }
  ])

  // 绿证发行详情
  const [certificateData] = useState<CertificateData[]>([
    {
      id: 'GC202401001',
      projectName: '阿拉善左旗100MW光伏电站',
      company: '内蒙古绿能科技有限公司',
      region: '内蒙古',
      capacity: '150,000 MWh',
      issueDate: '2024-01-15',
      status: 'issued',
      price: 45.8
    },
    {
      id: 'GC202401002',
      projectName: '哈密50MW风电项目',
      company: '新疆风电开发集团',
      region: '新疆',
      capacity: '80,000 MWh',
      issueDate: '2024-01-12',
      status: 'traded',
      price: 52.3
    },
    {
      id: 'GC202401003',
      projectName: '海西州光伏基地',
      company: '青海清洁能源有限公司',
      region: '青海',
      capacity: '200,000 MWh',
      issueDate: '2024-01-10',
      status: 'issued',
      price: 48.9
    },
    {
      id: 'GC202401004',
      projectName: '酒泉风光互补项目',
      company: '甘肃新能源投资公司',
      region: '甘肃',
      capacity: '120,000 MWh',
      issueDate: '2024-01-08',
      status: 'pending',
      price: 0
    }
  ])

  // 发展趋势数据
  const [trendData] = useState<TrendData[]>([
    { month: '2023-07', issued: 280, traded: 156 },
    { month: '2023-08', issued: 320, traded: 189 },
    { month: '2023-09', issued: 365, traded: 234 },
    { month: '2023-10', issued: 420, traded: 298 },
    { month: '2023-11', issued: 485, traded: 356 },
    { month: '2023-12', issued: 540, traded: 412 },
    { month: '2024-01', issued: 620, traded: 498 }
  ])

  // 能源类型占比
  const [energyTypes] = useState<EnergyType[]>([
    { type: '光伏发电', percentage: 65, capacity: '2,503万MWh', color: '#FFD700' },
    { type: '风力发电', percentage: 28, capacity: '1,079万MWh', color: '#87CEEB' },
    { type: '水力发电', percentage: 5, capacity: '193万MWh', color: '#20B2AA' },
    { type: '生物质发电', percentage: 2, capacity: '77万MWh', color: '#98FB98' }
  ])

  const tabList = [
    { key: 'statistics', label: '绿电绿证统计' },
    { key: 'map', label: '地区分布图' },
    { key: 'table', label: '绿证发行详情' },
    { key: 'trend', label: '发展趋势' },
    { key: 'types', label: '能源类型占比' }
  ]

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: '绿电绿证' })
  }, [])

  const handleTabClick = (tabKey: string) => {
    setActiveTab(tabKey)
  }

  const getStatusText = (status: string) => {
    const statusMap = {
      issued: '已发行',
      traded: '已交易',
      pending: '待发行'
    }
    return statusMap[status] || '未知'
  }

  const getStatusColor = (status: string) => {
    const colorMap = {
      issued: '#3cc51f',
      traded: '#1976d2',
      pending: '#ff9800'
    }
    return colorMap[status] || '#999'
  }

  const renderStatistics = () => (
    <View className='statistics-content'>
      <Text className='section-title'>绿电绿证总体情况</Text>
      <View className='stats-grid'>
        {statsData.map((stat, index) => (
          <View key={index} className='stat-card'>
            <View className='stat-icon'>{stat.icon}</View>
            <Text className='stat-number'>{stat.number}</Text>
            <Text className='stat-label'>{stat.label}</Text>
          </View>
        ))}
      </View>
      
      <View className='info-section'>
        <Text className='info-title'>什么是绿电绿证？</Text>
        <Text className='info-text'>
          绿证是可再生能源发电量的确权凭证，是国际通行的可再生能源消费认证机制，也是企业认证绿色电力消费的重要手段。一个绿证对应1兆瓦时的绿色电力，具有唯一性、不可重复使用的特点。
        </Text>
        <Text className='info-text'>
          绿电交易是指电力用户与可再生能源发电企业通过市场化方式开展的电能交易，用户通过购买绿电获得相应的环境效益，可用于减少温室气体排放。
        </Text>
        
        <Text className='info-title'>绿证的意义</Text>
        <View className='info-list'>
          <Text className='info-item'>• 促进可再生能源消费</Text>
          <Text className='info-item'>• 助力企业实现碳中和目标</Text>
          <Text className='info-item'>• 推动能源结构转型</Text>
          <Text className='info-item'>• 支持国家双碳战略实施</Text>
        </View>
      </View>
    </View>
  )

  const renderMap = () => (
    <View className='map-content'>
      <Text className='section-title'>绿证发行地区分布</Text>
      <View className='region-list'>
        {regionData.map((region, index) => (
          <View key={index} className='region-item'>
            <View className='region-info'>
              <Text className='region-name'>{region.name}</Text>
              <Text className='region-percentage'>{region.percentage}</Text>
            </View>
            <View className='region-bar'>
              <View 
                className='region-progress' 
                style={{ width: region.percentage }}
              ></View>
            </View>
            <Text className='region-value'>{region.value.toLocaleString()} MWh</Text>
          </View>
        ))}
      </View>
    </View>
  )

  const renderTable = () => (
    <View className='table-content'>
      <Text className='section-title'>绿证发行详情</Text>
      <View className='certificate-list'>
        {certificateData.map((cert) => (
          <View key={cert.id} className='certificate-card'>
            <View className='cert-header'>
              <Text className='cert-id'>{cert.id}</Text>
              <View 
                className='cert-status'
                style={{ color: getStatusColor(cert.status) }}
              >
                <Text className='status-text'>{getStatusText(cert.status)}</Text>
              </View>
            </View>
            
            <Text className='cert-project'>{cert.projectName}</Text>
            <Text className='cert-company'>{cert.company}</Text>
            
            <View className='cert-details'>
              <View className='cert-detail-item'>
                <Text className='detail-label'>地区：</Text>
                <Text className='detail-value'>{cert.region}</Text>
              </View>
              <View className='cert-detail-item'>
                <Text className='detail-label'>容量：</Text>
                <Text className='detail-value'>{cert.capacity}</Text>
              </View>
              <View className='cert-detail-item'>
                <Text className='detail-label'>发行日期：</Text>
                <Text className='detail-value'>{cert.issueDate}</Text>
              </View>
              {cert.price > 0 && (
                <View className='cert-detail-item'>
                  <Text className='detail-label'>交易价格：</Text>
                  <Text className='detail-value price'>¥{cert.price}/MWh</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  )

  const renderTrend = () => (
    <View className='trend-content'>
      <Text className='section-title'>绿电绿证发展趋势</Text>
      <View className='trend-chart'>
        {trendData.map((data, index) => (
          <View key={index} className='trend-item'>
            <Text className='trend-month'>{data.month}</Text>
            <View className='trend-bars'>
              <View className='trend-bar issued'>
                <View 
                  className='bar-fill' 
                  style={{ height: `${(data.issued / 620) * 100}%` }}
                ></View>
                <Text className='bar-value'>{data.issued}</Text>
              </View>
              <View className='trend-bar traded'>
                <View 
                  className='bar-fill' 
                  style={{ height: `${(data.traded / 620) * 100}%` }}
                ></View>
                <Text className='bar-value'>{data.traded}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      <View className='trend-legend'>
        <View className='legend-item'>
          <View className='legend-color issued'></View>
          <Text className='legend-text'>发行量(万MWh)</Text>
        </View>
        <View className='legend-item'>
          <View className='legend-color traded'></View>
          <Text className='legend-text'>交易量(万MWh)</Text>
        </View>
      </View>
    </View>
  )

  const renderTypes = () => (
    <View className='types-content'>
      <Text className='section-title'>能源类型占比</Text>
      <View className='energy-types'>
        {energyTypes.map((energy, index) => (
          <View key={index} className='energy-item'>
            <View className='energy-header'>
              <View className='energy-info'>
                <View 
                  className='energy-color' 
                  style={{ backgroundColor: energy.color }}
                ></View>
                <Text className='energy-type'>{energy.type}</Text>
              </View>
              <Text className='energy-percentage'>{energy.percentage}%</Text>
            </View>
            <View className='energy-bar'>
              <View 
                className='energy-progress' 
                style={{ 
                  width: `${energy.percentage}%`,
                  backgroundColor: energy.color 
                }}
              ></View>
            </View>
            <Text className='energy-capacity'>{energy.capacity}</Text>
          </View>
        ))}
      </View>
    </View>
  )

  return (
    <View className='green-electricity-page'>
      {/* 顶部横幅 */}
      <View className='page-banner'>
        <Text className='banner-title'>绿电绿证交易平台</Text>
        <Text className='banner-subtitle'>推动可再生能源发展，助力碳中和目标实现</Text>
      </View>

      {/* 标签页 */}
      <View className='tabs-container'>
        <ScrollView scrollX className='tabs-scroll'>
          <View className='tab-list'>
            {tabList.map((tab) => (
              <View
                key={tab.key}
                className={`tab-item ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.key)}
              >
                <Text className='tab-text'>{tab.label}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* 内容区域 */}
      <ScrollView scrollY className='content-container'>
        {activeTab === 'statistics' && renderStatistics()}
        {activeTab === 'map' && renderMap()}
        {activeTab === 'table' && renderTable()}
        {activeTab === 'trend' && renderTrend()}
        {activeTab === 'types' && renderTypes()}
      </ScrollView>
    </View>
  )
}

export default GreenElectricity

import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import './index.less'

interface TradingDetailData {
  id: string
  title: string
  price: string
  volume: string
  location: string
  type: 'buy' | 'sell'
  status: 'active' | 'completed' | 'cancelled'
  publishTime: string
  description: string
  validTime: string
  contactPerson: string
  contactPhone: string
  contactEmail: string
  company: string
  requirements?: string
  powerSource?: string
  deliveryMethod: string
  paymentMethod: string
  minVolume?: string
  maxVolume?: string
}

// Mock详细数据
const mockDetailData: Record<string, TradingDetailData> = {
  '1': {
    id: '1',
    title: '太阳能发电收购',
    price: '0.42',
    volume: '1500',
    location: '北京市',
    type: 'buy',
    status: 'active',
    publishTime: '2024-01-15 10:30',
    description: '本公司长期采购太阳能绿色电力，用于企业清洁能源配额。要求电力来源可追溯，具备完整的绿电证书。',
    validTime: '2024-02-15',
    contactPerson: '张经理',
    contactPhone: '138****1234',
    contactEmail: 'zhang@company.com',
    company: '北京清洁能源有限公司',
    requirements: '需要提供绿电证书，电力来源可追溯',
    minVolume: '500',
    maxVolume: '3000',
    deliveryMethod: '电网直供',
    paymentMethod: '月结30天'
  },
  '2': {
    id: '2',
    title: '风力发电求购',
    price: '0.45',
    volume: '2000',
    location: '上海市',
    type: 'buy',
    status: 'active',
    publishTime: '2024-01-15 09:45',
    description: '上海某大型制造企业寻求稳定的风力发电供应，要求24小时稳定供电，优先考虑长期合作伙伴。',
    validTime: '2024-02-20',
    contactPerson: '李总监',
    contactPhone: '139****5678',
    contactEmail: 'li@manufacturing.com',
    company: '上海制造集团',
    requirements: '24小时稳定供电，优先长期合作',
    minVolume: '1000',
    maxVolume: '5000',
    deliveryMethod: '专线直供',
    paymentMethod: '预付款'
  },
  '6': {
    id: '6',
    title: '光伏电站余电出售',
    price: '0.48',
    volume: '1800',
    location: '山东省',
    type: 'sell',
    status: 'active',
    publishTime: '2024-01-15 11:00',
    description: '山东某光伏电站产能富余，现对外销售绿色电力。电站装机容量50MW，年发电量稳定，具备完整的绿电认证。',
    validTime: '2024-03-15',
    contactPerson: '王站长',
    contactPhone: '137****9999',
    contactEmail: 'wang@solarpower.com',
    company: '山东阳光电力集团',
    powerSource: '屋顶分布式光伏',
    deliveryMethod: '国家电网',
    paymentMethod: '即时结算'
  },
  '7': {
    id: '7',
    title: '风电场绿电销售',
    price: '0.46',
    volume: '2500',
    location: '内蒙古',
    type: 'sell',
    status: 'active',
    publishTime: '2024-01-15 08:30',
    description: '内蒙古大型风电场，装机容量100MW，年发电量3亿kWh，现有富余电力对外销售，价格优惠。',
    validTime: '2024-04-15',
    contactPerson: '赵场长',
    contactPhone: '135****7777',
    contactEmail: 'zhao@windpower.com',
    company: '内蒙古风能发电公司',
    powerSource: '陆上风力发电',
    deliveryMethod: '特高压输电',
    paymentMethod: '季度结算'
  },
  '3': {
    id: '3',
    title: '绿电批量收购',
    price: '0.40',
    volume: '5000',
    location: '广东省',
    type: 'buy',
    status: 'completed',
    publishTime: '2024-01-14 16:20',
    description: '广东某大型企业集团采购绿色电力，用于满足RE100承诺。需要大批量稳定供应，优先考虑光伏和风电组合。',
    validTime: '2024-01-30',
    contactPerson: '陈总',
    contactPhone: '136****2222',
    contactEmail: 'chen@group.com',
    company: '广东实业集团',
    requirements: '需要RE100认证，大批量稳定供应',
    minVolume: '2000',
    maxVolume: '10000',
    deliveryMethod: '南方电网',
    paymentMethod: '预付50%'
  },
  '4': {
    id: '4',
    title: '企业绿电采购',
    price: '0.43',
    volume: '3000',
    location: '江苏省',
    type: 'buy',
    status: 'active',
    publishTime: '2024-01-14 14:15',
    description: '江苏制造企业寻求绿色电力供应商，用于生产线清洁能源改造。要求供电稳定，价格合理。',
    validTime: '2024-02-28',
    contactPerson: '刘经理',
    contactPhone: '138****3333',
    contactEmail: 'liu@manufacturing.com',
    company: '江苏智造科技',
    requirements: '供电稳定，24小时不间断',
    minVolume: '1000',
    maxVolume: '5000',
    deliveryMethod: '工业园区专线',
    paymentMethod: '月结15天'
  },
  '5': {
    id: '5',
    title: '清洁能源收购',
    price: '0.44',
    volume: '1200',
    location: '浙江省',
    type: 'buy',
    status: 'cancelled',
    publishTime: '2024-01-14 11:30',
    description: '浙江某高新技术企业采购清洁能源，用于数据中心运营。因项目调整，该需求已取消。',
    validTime: '2024-01-25',
    contactPerson: '王工程师',
    contactPhone: '139****4444',
    contactEmail: 'wang@tech.com',
    company: '浙江科技有限公司',
    requirements: '数据中心级别稳定性要求',
    minVolume: '800',
    maxVolume: '2000',
    deliveryMethod: '专用变电站',
    paymentMethod: '即时结算'
  },
  '8': {
    id: '8',
    title: '水电站清洁电力',
    price: '0.41',
    volume: '4000',
    location: '四川省',
    type: 'sell',
    status: 'completed',
    publishTime: '2024-01-14 17:45',
    description: '四川水电站丰水期发电量充足，现对外销售清洁电力。水电站装机容量80MW，发电稳定可靠。',
    validTime: '2024-03-01',
    contactPerson: '周站长',
    contactPhone: '134****5555',
    contactEmail: 'zhou@hydropower.com',
    company: '四川水电集团',
    powerSource: '大型水电站',
    deliveryMethod: '西电东送',
    paymentMethod: '结算完成'
  },
  '9': {
    id: '9',
    title: '分布式光伏发电',
    price: '0.47',
    volume: '800',
    location: '河南省',
    type: 'sell',
    status: 'active',
    publishTime: '2024-01-14 13:20',
    description: '河南某工业园区分布式光伏电站，装机容量20MW，日均发电量稳定，现有富余电力对外销售。',
    validTime: '2024-02-14',
    contactPerson: '郑主任',
    contactPhone: '132****6666',
    contactEmail: 'zheng@industrial.com',
    company: '河南工业园区管委会',
    powerSource: '分布式屋顶光伏',
    deliveryMethod: '园区内网',
    paymentMethod: '周结算'
  },
  '10': {
    id: '10',
    title: '工业园区绿电',
    price: '0.44',
    volume: '2200',
    location: '江西省',
    type: 'sell',
    status: 'active',
    publishTime: '2024-01-14 10:15',
    description: '江西省某新能源工业园区，集成光伏、风电、储能系统，现有绿色电力对外销售，价格优惠。',
    validTime: '2024-03-10',
    contactPerson: '吴总',
    contactPhone: '133****7777',
    contactEmail: 'wu@greenpark.com',
    company: '江西绿色能源园区',
    powerSource: '光伏+风电+储能',
    deliveryMethod: '园区微电网',
    paymentMethod: '双周结算'
  }
}

const TradingDetail = () => {
  const router = useRouter()
  const [detailData, setDetailData] = useState<TradingDetailData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const { id } = router.params
    if (id) {
      fetchDetailData(id)
    } else {
      setError('缺少交易ID参数')
      setLoading(false)
    }
  }, [router.params])

  const fetchDetailData = async (id: string) => {
    setLoading(true)
    setError('')
    
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const data = mockDetailData[id]
      if (data) {
        setDetailData(data)
      } else {
        setError('未找到对应的交易信息')
      }
    } catch (err) {
      setError('获取交易详情失败')
      console.error('Failed to fetch trading detail:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleContact = () => {
    if (detailData?.contactPhone) {
      Taro.makePhoneCall({
        phoneNumber: detailData.contactPhone.replace(/\*/g, '8')
      })
    }
  }

  const handleFavorite = () => {
    Taro.showToast({
      title: '已收藏',
      icon: 'success'
    })
  }

  const handleApply = () => {
    if (detailData?.type === 'buy') {
      Taro.showToast({
        title: '申请出售成功',
        icon: 'success'
      })
    } else {
      Taro.showToast({
        title: '申请购买成功',
        icon: 'success'
      })
    }
  }

  const getStatusText = (status: string) => {
    const statusMap = {
      active: '交易中',
      completed: '已成交',
      cancelled: '已取消'
    }
    return statusMap[status] || status
  }

  const getTypeText = (type: string) => {
    return type === 'buy' ? '求购' : '出售'
  }

  if (loading) {
    return (
      <View className='trading-detail-page'>
        <View className='loading'>
          <Text>加载中...</Text>
        </View>
      </View>
    )
  }

  if (error) {
    return (
      <View className='trading-detail-page'>
        <View className='error'>
          <Text className='error-message'>{error}</Text>
          <View 
            className='retry-button'
            onClick={() => {
              const { id } = router.params
              if (id) fetchDetailData(id)
            }}
          >
            <Text>重试</Text>
          </View>
        </View>
      </View>
    )
  }

  if (!detailData) {
    return (
      <View className='trading-detail-page'>
        <View className='error'>
          <Text className='error-message'>数据不存在</Text>
        </View>
      </View>
    )
  }

  return (
    <View className='trading-detail-page'>
      {/* 基本信息 */}
      <View className='detail-card header-card'>
        <Text className='trading-title'>{detailData.title}</Text>
        <Text className={`trading-type ${detailData.type}`}>
          {getTypeText(detailData.type)}
        </Text>
        
        <View className='detail-row'>
          <Text className='label'>交易状态</Text>
          <Text className={`value status ${detailData.status}`}>
            {getStatusText(detailData.status)}
          </Text>
        </View>
        
        <View className='detail-row'>
          <Text className='label'>发布时间</Text>
          <Text className='value'>{detailData.publishTime}</Text>
        </View>
        
        <View className='detail-row'>
          <Text className='label'>有效期至</Text>
          <Text className='value'>{detailData.validTime}</Text>
        </View>
      </View>

      {/* 交易详情 */}
      <View className='detail-card'>
        <Text className='card-title'>交易详情</Text>
        
        <View className='detail-row'>
          <Text className='label'>价格</Text>
          <Text className='value price'>¥{detailData.price}/kWh</Text>
        </View>
        
        <View className='detail-row'>
          <Text className='label'>电量</Text>
          <Text className='value'>{detailData.volume} kWh</Text>
        </View>
        
        <View className='detail-row'>
          <Text className='label'>地区</Text>
          <Text className='value'>{detailData.location}</Text>
        </View>
        
        {detailData.minVolume && (
          <View className='detail-row'>
            <Text className='label'>最小交易量</Text>
            <Text className='value'>{detailData.minVolume} kWh</Text>
          </View>
        )}
        
        {detailData.maxVolume && (
          <View className='detail-row'>
            <Text className='label'>最大交易量</Text>
            <Text className='value'>{detailData.maxVolume} kWh</Text>
          </View>
        )}
        
        {detailData.powerSource && (
          <View className='detail-row'>
            <Text className='label'>电力来源</Text>
            <Text className='value'>{detailData.powerSource}</Text>
          </View>
        )}
        
        <View className='detail-row'>
          <Text className='label'>交付方式</Text>
          <Text className='value'>{detailData.deliveryMethod}</Text>
        </View>
        
        <View className='detail-row'>
          <Text className='label'>付款方式</Text>
          <Text className='value'>{detailData.paymentMethod}</Text>
        </View>
      </View>

      {/* 详细描述 */}
      <View className='detail-card'>
        <Text className='card-title'>详细描述</Text>
        <View className='detail-row'>
          <Text className='value'>{detailData.description}</Text>
        </View>
        
        {detailData.requirements && (
          <>
            <Text className='card-title' style={{ marginTop: '15px' }}>特殊要求</Text>
            <View className='detail-row'>
              <Text className='value'>{detailData.requirements}</Text>
            </View>
          </>
        )}
      </View>

      {/* 联系信息 */}
      <View className='detail-card'>
        <Text className='card-title'>联系信息</Text>
        
        <View className='contact-section'>
          <View className='contact-item'>
            <View className='contact-icon'>
              <Text>👤</Text>
            </View>
            <View className='contact-info'>
              <Text className='contact-name'>{detailData.contactPerson}</Text>
              <Text className='contact-role'>{detailData.company}</Text>
            </View>
            {/* <View className='contact-button' onClick={handleContact}>
              <Text>联系</Text>
            </View> */}
          </View>
        </View>
        
        <View className='detail-row'>
          <Text className='label'>联系电话</Text>
          <Text className='value'>{detailData.contactPhone}</Text>
        </View>
        
        <View className='detail-row'>
          <Text className='label'>邮箱</Text>
          <Text className='value'>{detailData.contactEmail}</Text>
        </View>
      </View>

      {/* 底部操作按钮 */}
      {/* {detailData.status === 'active' && (
        <View className='action-buttons'>
          <View className='action-button secondary' onClick={handleFavorite}>
            <Text>收藏</Text>
          </View>
          <View className='action-button primary' onClick={handleApply}>
            <Text>
              {detailData.type === 'buy' ? '我要出售' : '我要购买'}
            </Text>
          </View>
        </View>
      )} */}
    </View>
  )
}

export default TradingDetail 
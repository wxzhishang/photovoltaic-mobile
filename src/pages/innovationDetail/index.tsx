import { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import './index.less'

interface InnovationDetail {
  id: string
  title: string
  summary: string
  content: string
  thumbnail: string
  publishTime: string
  viewCount: number
  source: string
  tags: string[]
  author: string
}

const InnovationDetail = () => {
  const router = useRouter()
  const { id } = router.params
  const [detail, setDetail] = useState<InnovationDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchInnovationDetail(id)
    }
  }, [id])

  const fetchInnovationDetail = async (itemId: string) => {
    setLoading(true)
    try {
      // 模拟获取详情数据
      const mockDetail: InnovationDetail = {
        id: itemId,
        title: '国家支持光伏产业发展的最新政策',
        summary: '新能源补贴政策持续优化，助力光伏产业高质量发展，推动绿色能源产业升级转型',
        content: `
          <h3>政策背景</h3>
          <p>为贯彻落实党中央、国务院关于碳达峰碳中和重大决策部署，推动光伏产业高质量发展，国家发展改革委、国家能源局等部门联合发布了《关于进一步支持光伏产业发展的政策措施》。</p>
          
          <h3>主要内容</h3>
          <p>1. <strong>完善补贴政策</strong>：继续完善光伏发电补贴政策，对分布式光伏项目给予更多支持。</p>
          <p>2. <strong>优化并网流程</strong>：简化光伏项目并网手续，提高并网效率。</p>
          <p>3. <strong>加大技术创新支持</strong>：支持光伏技术研发和产业化，提升核心竞争力。</p>
          <p>4. <strong>拓展应用场景</strong>：推动光伏在建筑、交通、农业等领域的应用。</p>
          
          <h3>政策影响</h3>
          <p>该政策的出台将进一步激发光伏产业发展活力，预计将带动：</p>
          <ul>
            <li>光伏装机容量快速增长</li>
            <li>产业技术水平持续提升</li>
            <li>成本进一步下降</li>
            <li>就业岗位大幅增加</li>
          </ul>
          
          <h3>实施要求</h3>
          <p>各地要结合实际情况，制定具体实施方案，确保政策措施落地见效。同时要加强监管，防范风险，促进光伏产业健康发展。</p>
        `,
        thumbnail: '/assets/images/innovation1.jpg',
        publishTime: '2024-01-15',
        viewCount: 1250,
        source: '国家发改委',
        tags: ['光伏补贴', '新能源', '产业政策'],
        author: '政策研究中心'
      }
      
      setDetail(mockDetail)
      Taro.setNavigationBarTitle({ title: mockDetail.title })
    } catch (error) {
      console.error('Failed to fetch innovation detail:', error)
      Taro.showToast({
        title: '加载失败',
        icon: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleShare = () => {
    Taro.showShareMenu({
      withShareTicket: true
    })
  }

  if (loading) {
    return (
      <View className='innovation-detail-page'>
        <View className='loading'>加载中...</View>
      </View>
    )
  }

  if (!detail) {
    return (
      <View className='innovation-detail-page'>
        <View className='error'>内容不存在</View>
      </View>
    )
  }

  return (
    <View className='innovation-detail-page'>
      <ScrollView scrollY className='scroll-container'>
        {/* 标题区域 */}
        <View className='header-section'>
          <View className='policy-tag'>政策</View>
          <Text className='title'>{detail.title}</Text>
          
          <View className='meta-info'>
            <View className='meta-item'>
              <Text className='label'>来源：</Text>
              <Text className='value'>{detail.source}</Text>
            </View>
            <View className='meta-item'>
              <Text className='label'>发布时间：</Text>
              <Text className='value'>{detail.publishTime}</Text>
            </View>
            <View className='meta-item'>
              <Text className='label'>阅读量：</Text>
              <Text className='value'>{detail.viewCount}</Text>
            </View>
          </View>

          <View className='tags-section'>
            {detail.tags.map((tag, index) => (
              <View key={index} className='tag'>
                {tag}
              </View>
            ))}
          </View>
        </View>

        {/* 摘要 */}
        <View className='summary-section'>
          <Text className='summary-title'>政策摘要</Text>
          <Text className='summary-content'>{detail.summary}</Text>
        </View>

        {/* 缩略图 */}
        {detail.thumbnail && (
          <View className='image-section'>
            <Image 
              src={detail.thumbnail} 
              className='detail-image'
              mode='aspectFit'
            />
          </View>
        )}

        {/* 正文内容 */}
        <View className='content-section'>
          <Text className='content-title'>政策详情</Text>
          <View className='content-body'>
            <Text className='content-text'>
              {detail.content.replace(/<[^>]*>/g, '\n').replace(/\n\s*\n/g, '\n')}
            </Text>
          </View>
        </View>

        {/* 底部操作 */}
        <View className='action-section'>
          <View className='action-tip'>
            <Text>详细政策文件请登录相关官方网站查看</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default InnovationDetail 
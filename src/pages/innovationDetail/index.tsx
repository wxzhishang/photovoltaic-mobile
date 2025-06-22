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
      // 根据id返回不同的mock数据
      const mockData: { [key: string]: InnovationDetail } = {
        '1': {
          id: '1',
          title: '国家支持光伏产业发展的最新政策',
          summary: '新能源补贴政策持续优化，助力光伏产业高质量发展，推动绿色能源产业升级转型',
          content: `政策背景

为贯彻落实党中央、国务院关于碳达峰碳中和重大决策部署，推动光伏产业高质量发展，国家发展改革委、国家能源局等部门联合发布了《关于进一步支持光伏产业发展的政策措施》。

主要内容

1. 完善补贴政策：继续完善光伏发电补贴政策，对分布式光伏项目给予更多支持。

2. 优化并网流程：简化光伏项目并网手续，提高并网效率。

3. 加大技术创新支持：支持光伏技术研发和产业化，提升核心竞争力。

4. 拓展应用场景：推动光伏在建筑、交通、农业等领域的应用。

政策影响

该政策的出台将进一步激发光伏产业发展活力，预计将带动：
• 光伏装机容量快速增长
• 产业技术水平持续提升
• 成本进一步下降
• 就业岗位大幅增加

实施要求

各地要结合实际情况，制定具体实施方案，确保政策措施落地见效。同时要加强监管，防范风险，促进光伏产业健康发展。`,
          thumbnail: '/assets/images/innovation1.jpg',
          publishTime: '2024-01-15',
          viewCount: 1250,
          source: '国家发改委',
          tags: ['光伏补贴', '新能源', '产业政策'],
          author: '政策研究中心'
        },
        '2': {
          id: '2',
          title: '分布式光伏发电管理办法解读',
          summary: '详解分布式光伏发电项目管理和并网要求，规范行业发展秩序',
          content: `管理办法概述

新修订的《分布式光伏发电管理办法》明确了分布式光伏发电项目的定义、分类、管理职责和技术要求，为规范分布式光伏发电项目建设和运营提供了重要指导。

项目分类与要求

1. 自然人分布式光伏：装机容量不超过50kW的户用光伏项目，简化备案流程。

2. 法人分布式光伏：装机容量50kW以上的工商业分布式光伏项目，需履行备案手续。

并网管理规定

• 项目并网应符合电网安全技术要求
• 优化并网流程，缩短并网时间
• 建立健全并网服务标准

运维管理要求

分布式光伏项目应建立完善的运维管理体系，确保设备安全稳定运行，定期开展设备检查和维护工作。`,
          thumbnail: '/assets/images/innovation2.jpg',
          publishTime: '2024-01-12',
          viewCount: 980,
          source: '国家能源局',
          tags: ['分布式', '并网管理', '项目管理'],
          author: '能源政策研究所'
        },
        '3': {
          id: '3',
          title: '光伏发电项目用地政策指导意见',
          summary: '明确光伏发电项目用地性质和管理要求，保障项目合规建设',
          content: `用地政策要点

《光伏发电项目用地政策指导意见》进一步明确了光伏发电项目用地的性质界定、供地方式、用地标准等关键问题。

用地分类管理

1. 集中式光伏发电项目：按建设用地管理，需办理建设用地手续。

2. 分布式光伏项目：利用既有建筑屋顶建设，不改变原用地性质。

3. 农光互补项目：在不改变农用地性质的前提下，允许建设光伏发电设施。

供地方式规定

• 符合划拨用地目录的项目可采用划拨方式供地
• 经营性项目应采用招拍挂方式供地
• 鼓励采用租赁方式供地

用地标准要求

光伏发电项目用地应集约节约，提高土地利用效率，严格控制用地规模，优先利用未利用地和废弃土地。`,
          thumbnail: '/assets/images/innovation3.jpg',
          publishTime: '2024-01-10',
          viewCount: 756,
          source: '自然资源部',
          tags: ['用地政策', '项目建设', '合规管理'],
          author: '土地政策研究中心'
        },
        '4': {
          id: '4',
          title: '碳达峰碳中和背景下光伏产业发展机遇',
          summary: '分析双碳目标对光伏产业的政策利好和发展机遇',
          content: `双碳目标背景

为实现2030年前碳达峰、2060年前碳中和的目标，我国正在加快构建清洁低碳、安全高效的能源体系，光伏产业迎来重大发展机遇。

发展机遇分析

1. 政策支持力度加大：各级政府出台系列支持政策，为光伏产业发展提供有力保障。

2. 市场需求快速增长：双碳目标推动清洁能源需求大幅增长，光伏装机规模将持续扩大。

3. 技术创新加速推进：产业技术不断突破，光伏发电成本持续下降，竞争力显著提升。

4. 产业链日趋完善：从硅料到组件，从逆变器到系统集成，产业链配套能力不断增强。

重点发展方向

• 大力发展分布式光伏
• 推进光伏建筑一体化
• 发展光伏制氢等新兴应用
• 加强光伏储能技术研发

预期发展目标

到2030年，我国光伏发电装机容量将达到12亿千瓦以上，为实现碳达峰目标提供重要支撑。`,
          thumbnail: '/assets/images/innovation4.jpg',
          publishTime: '2024-01-08',
          viewCount: 1123,
          source: '生态环境部',
          tags: ['碳达峰', '碳中和', '发展机遇'],
          author: '环境政策研究院'
        },
        '5': {
          id: '5',
          title: '光伏制造业高质量发展实施方案',
          summary: '推动光伏制造业技术创新和产业升级，提升国际竞争力',
          content: `实施方案目标

《光伏制造业高质量发展实施方案》旨在推动光伏制造业向高端化、智能化、绿色化发展，提升产业核心竞争力和国际影响力。

重点任务

1. 技术创新能力提升：支持关键技术研发，突破产业技术瓶颈，提高转换效率。

2. 产业结构优化升级：推动产业集中度提升，培育一批具有国际竞争力的龙头企业。

3. 绿色制造水平提升：推广清洁生产技术，降低生产过程能耗和排放。

4. 国际合作深化拓展：支持企业"走出去"，参与全球光伏产业链分工合作。

支持政策措施

• 加大研发投入支持力度
• 完善产业配套政策
• 优化营商环境
• 加强人才培养

预期发展成效

到2025年，我国光伏制造业技术水平和产业竞争力将进一步提升，产业规模持续扩大，国际市场份额稳步增长。`,
          thumbnail: '/assets/images/innovation5.jpg',
          publishTime: '2024-01-05',
          viewCount: 892,
          source: '工信部',
          tags: ['制造业', '技术创新', '产业升级'],
          author: '工业政策研究中心'
        }
      }
      
      const detailData = mockData[itemId]
      if (!detailData) {
        throw new Error('政策详情不存在')
      }
      
      setDetail(detailData)
      Taro.setNavigationBarTitle({ title: detailData.title })
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
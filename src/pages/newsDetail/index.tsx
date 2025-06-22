import { useEffect, useState } from 'react'
import { View, Text, Image, RichText } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import './index.less'

interface NewsDetail {
  id: string
  title: string
  summary: string
  content: string
  thumbnail: string
  publishTime: string
  viewCount: number
  author: string
  tags: string[]
}

// Mock 详细数据
const mockNewsDetail: { [key: string]: NewsDetail } = {
  '1': {
    id: '1',
    title: '光伏发电技术最新突破，转换效率达到新高度',
    summary: '中国科学家在硅基光伏电池领域取得重大突破，实验室转换效率突破26%，为商业化应用奠定基础。',
    content: `
      <h3>技术突破详情</h3>
      <p>近日，中国科学院光电技术研究所在硅基光伏电池技术方面取得重大突破，实验室条件下单晶硅电池转换效率突破26%，创造了新的世界纪录。</p>
      
      <h3>技术创新点</h3>
      <p>此次突破主要得益于以下几个方面的技术创新：</p>
      <ul>
        <li>采用了新型钝化接触技术，有效降低了载流子复合损失</li>
        <li>优化了电池表面织构设计，提高了光吸收效率</li>
        <li>引入了先进的金属化工艺，降低了串联电阻</li>
      </ul>
      
      <h3>产业化前景</h3>
      <p>该技术的突破为光伏产业的进一步发展提供了强有力的技术支撑。预计在未来2-3年内，相关技术将逐步实现产业化应用，推动光伏发电成本进一步下降。</p>
      
      <h3>市场影响</h3>
      <p>业内专家认为，这一技术突破将显著提升我国在全球光伏产业中的竞争优势，进一步巩固我国在光伏制造领域的领先地位。</p>
    `,
    thumbnail: '/assets/images/logo1.jpg',
    publishTime: '2024-01-15 10:30:00',
    viewCount: 1256,
    author: '科技日报',
    tags: ['光伏技术', '转换效率', '科技突破']
  },
  '2': {
    id: '2',
    title: '绿色电力市场交易规模创新高',
    summary: '2024年第一季度绿色电力交易量同比增长45%，清洁能源消纳比例进一步提升。',
    content: `
      <h3>交易数据分析</h3>
      <p>根据国家能源局最新统计数据，2024年第一季度全国绿色电力交易量达到156亿千瓦时，同比增长45%，创历史新高。</p>
      
      <h3>增长驱动因素</h3>
      <p>绿色电力交易规模快速增长主要得益于：</p>
      <ul>
        <li>政策支持力度不断加大，绿电交易机制日趋完善</li>
        <li>企业环保意识增强，主动采购绿色电力</li>
        <li>绿色电力价格竞争力提升，经济性优势凸显</li>
      </ul>
      
      <h3>参与主体多元化</h3>
      <p>目前参与绿色电力交易的主体日趋多元化，包括大型工业企业、数据中心、新能源汽车制造商等。其中，制造业企业占比最大，达到60%以上。</p>
      
      <h3>发展前景</h3>
      <p>预计2024年全年绿色电力交易量将突破600亿千瓦时，绿色电力市场将迎来更大发展机遇。</p>
    `,
    thumbnail: '/assets/images/logo2.jpg',
    publishTime: '2024-01-14 14:20:00',
    viewCount: 987,
    author: '能源新闻网',
    tags: ['绿色电力', '市场交易', '清洁能源']
  },
  '3': {
    id: '3',
    title: '分布式光伏发电项目推广政策出台',
    summary: '国家发改委发布最新政策，支持分布式光伏发电项目建设，简化审批流程。',
    content: `
      <h3>政策要点</h3>
      <p>国家发改委联合多部门发布《关于进一步支持分布式光伏发电发展的通知》，从多个维度支持分布式光伏项目发展。</p>
      
      <h3>主要措施</h3>
      <ul>
        <li>简化项目备案流程，实行承诺制管理</li>
        <li>优化电网接入服务，提高接入效率</li>
        <li>完善补贴政策，保障项目收益稳定</li>
        <li>加强土地政策支持，解决用地难题</li>
      </ul>
      
      <h3>适用范围</h3>
      <p>该政策主要适用于：</p>
      <ul>
        <li>工商业屋顶分布式光伏项目</li>
        <li>户用光伏发电系统</li>
        <li>农光互补等复合型项目</li>
      </ul>
      
      <h3>实施效果预期</h3>
      <p>政策实施后，预计将推动分布式光伏年新增装机容量达到70GW以上，为实现碳达峰碳中和目标提供有力支撑。</p>
    `,
    thumbnail: '/assets/images/logo3.jpg',
    publishTime: '2024-01-13 09:15:00',
    viewCount: 2134,
    author: '光伏资讯',
    tags: ['分布式光伏', '政策支持', '项目建设']
  },
  '4': {
    id: '4',
    title: '储能技术与光伏发电融合发展趋势',
    summary: '储能技术的快速发展为光伏发电的稳定性和经济性提供了有力支撑。',
    content: `
      <h3>融合发展背景</h3>
      <p>随着光伏发电规模的快速增长，其间歇性和波动性特点对电网稳定运行带来挑战。储能技术的发展为解决这一问题提供了有效途径。</p>
      
      <h3>技术优势</h3>
      <p>光伏储能一体化系统具有以下优势：</p>
      <ul>
        <li>提高电力系统稳定性，减少电网冲击</li>
        <li>实现削峰填谷，优化电力供需平衡</li>
        <li>提高光伏发电利用率，减少弃光现象</li>
        <li>增强电网灵活性，支持大规模可再生能源接入</li>
      </ul>
      
      <h3>应用场景</h3>
      <p>光储融合技术广泛应用于：</p>
      <ul>
        <li>大型光伏电站配套储能</li>
        <li>工商业用户侧储能</li>
        <li>户用光伏储能系统</li>
        <li>微电网和智能电网建设</li>
      </ul>
      
      <h3>发展前景</h3>
      <p>预计到2030年，光储一体化项目将成为新能源发展的主流模式，市场规模将超过1000亿元。</p>
    `,
    thumbnail: '/assets/images/logo4.jpg',
    publishTime: '2024-01-12 16:45:00',
    viewCount: 1567,
    author: '储能观察',
    tags: ['储能技术', '光伏发电', '融合发展']
  },
  '5': {
    id: '5',
    title: '智能电网建设助力清洁能源发展',
    summary: '智能电网技术的推广应用，有效提升了清洁能源的并网消纳能力。',
    content: `
      <h3>智能电网建设成果</h3>
      <p>近年来，我国智能电网建设取得显著成效，为清洁能源大规模发展提供了坚实基础。</p>
      
      <h3>关键技术应用</h3>
      <ul>
        <li>先进的电网调度系统，实现实时优化调度</li>
        <li>智能变电站技术，提高设备运行效率</li>
        <li>配电自动化系统，增强电网自愈能力</li>
        <li>用电信息采集系统，支持需求侧管理</li>
      </ul>
      
      <h3>清洁能源消纳能力提升</h3>
      <p>智能电网建设显著提升了清洁能源消纳能力：</p>
      <ul>
        <li>风电、光伏利用率分别达到96.8%和97.9%</li>
        <li>弃风弃光率持续下降，创历史最低水平</li>
        <li>清洁能源发电量占比超过30%</li>
      </ul>
      
      <h3>未来发展方向</h3>
      <p>下一步将重点推进源网荷储一体化发展，构建新型电力系统，为碳达峰碳中和目标实现提供有力支撑。</p>
    `,
    thumbnail: '/assets/images/logo5.jpg',
    publishTime: '2024-01-11 11:30:00',
    viewCount: 890,
    author: '电网周刊',
    tags: ['智能电网', '清洁能源', '电网建设']
  },
  '6': {
    id: '6',
    title: '光伏产业链供应链稳定性持续增强',
    summary: '国内光伏产业链布局日趋完善，核心环节供应链稳定性大幅提升。',
    content: `
      <h3>产业链布局现状</h3>
      <p>我国光伏产业已形成完整的产业链体系，从硅料、硅片、电池片到组件，各个环节都具备了强大的生产能力。</p>
      
      <h3>供应链优势</h3>
      <ul>
        <li>产能规模全球领先，市场占有率超过80%</li>
        <li>技术水平不断提升，产品质量持续改善</li>
        <li>成本控制能力强，具备显著的价格优势</li>
        <li>产业集群效应明显，协同发展能力强</li>
      </ul>
      
      <h3>稳定性提升措施</h3>
      <p>为进一步增强供应链稳定性，行业采取了以下措施：</p>
      <ul>
        <li>加强上游原材料保障，建立稳定供应体系</li>
        <li>推进产业链垂直整合，降低供应风险</li>
        <li>加大技术创新投入，提升产品竞争力</li>
        <li>拓展国际合作，构建全球供应网络</li>
      </ul>
      
      <h3>未来发展趋势</h3>
      <p>预计未来5年，光伏产业链将更加成熟稳定，为全球能源转型提供坚实的产业支撑。</p>
    `,
    thumbnail: '/assets/images/logo6.jpg',
    publishTime: '2024-01-10 08:00:00',
    viewCount: 1890,
    author: '产业观察',
    tags: ['光伏产业', '供应链', '产业链']
  },
  '7': {
    id: '7',
    title: '新能源汽车与光伏充电站结合发展',
    summary: '光伏充电站成为新能源汽车充电基础设施建设的重要方向。',
    content: `
      <h3>发展背景</h3>
      <p>随着新能源汽车保有量快速增长，充电需求日益旺盛。光伏充电站作为绿色充电解决方案，受到广泛关注。</p>
      
      <h3>技术特点</h3>
      <ul>
        <li>清洁环保，实现零碳充电</li>
        <li>降低用电成本，提高经济效益</li>
        <li>减轻电网负荷，缓解供电压力</li>
        <li>支持储能配置，实现灵活调节</li>
      </ul>
      
      <h3>应用模式</h3>
      <p>光伏充电站主要应用模式包括：</p>
      <ul>
        <li>分布式光伏+充电桩直接供电</li>
        <li>光伏+储能+充电一体化系统</li>
        <li>光伏车棚与充电设施结合</li>
        <li>高速公路服务区光储充一体站</li>
      </ul>
      
      <h3>市场前景</h3>
      <p>预计到2025年，光伏充电站市场规模将达到500亿元，成为新能源产业发展的重要增长点。</p>
    `,
    thumbnail: '/assets/images/logo1.jpg',
    publishTime: '2024-01-09 13:25:00',
    viewCount: 1456,
    author: '新能源周报',
    tags: ['新能源汽车', '光伏充电', '基础设施']
  },
  '8': {
    id: '8',
    title: '碳中和目标下的光伏发电规划',
    summary: '为实现碳中和目标，光伏发电装机容量将在未来十年内大幅增长。',
    content: `
      <h3>碳中和目标要求</h3>
      <p>我国提出2030年前实现碳达峰、2060年前实现碳中和的目标，对能源结构转型提出了更高要求。</p>
      
      <h3>光伏发电发展规划</h3>
      <ul>
        <li>2025年光伏装机容量达到330GW以上</li>
        <li>2030年光伏装机容量达到1000GW以上</li>
        <li>2060年光伏发电成为主力电源之一</li>
      </ul>
      
      <h3>实现路径</h3>
      <p>为实现上述目标，需要：</p>
      <ul>
        <li>大力发展集中式光伏电站</li>
        <li>积极推进分布式光伏建设</li>
        <li>加强光伏技术创新和产业升级</li>
        <li>完善配套电网和储能设施</li>
      </ul>
      
      <h3>政策保障</h3>
      <p>国家将从政策、资金、技术等多个方面为光伏产业发展提供全方位支持，确保碳中和目标如期实现。</p>
    `,
    thumbnail: '/assets/images/logo2.jpg',
    publishTime: '2024-01-08 15:40:00',
    viewCount: 2345,
    author: '碳中和研究院',
    tags: ['碳中和', '光伏规划', '能源转型']
  },
  '9': {
    id: '9',
    title: '光伏发电成本持续下降趋势分析',
    summary: '技术进步和规模效应推动光伏发电成本不断下降，平价上网时代到来。',
    content: `
      <h3>成本下降趋势</h3>
      <p>过去十年，光伏发电成本下降了85%以上，目前已实现平价上网，成为最具竞争力的电源之一。</p>
      
      <h3>成本下降驱动因素</h3>
      <ul>
        <li>技术进步：电池效率提升，制造工艺优化</li>
        <li>规模效应：产能扩大，单位成本下降</li>
        <li>产业链完善：配套产业发展，降低综合成本</li>
        <li>竞争加剧：市场竞争推动成本优化</li>
      </ul>
      
      <h3>成本构成分析</h3>
      <p>光伏发电成本主要包括：</p>
      <ul>
        <li>设备成本：组件、逆变器等硬件设备</li>
        <li>建设成本：土地、安装、施工等费用</li>
        <li>运维成本：设备维护、管理等费用</li>
        <li>财务成本：融资成本和资金成本</li>
      </ul>
      
      <h3>未来展望</h3>
      <p>预计未来5年，光伏发电成本仍有15-20%的下降空间，将进一步增强市场竞争优势。</p>
    `,
    thumbnail: '/assets/images/logo3.jpg',
    publishTime: '2024-01-07 10:15:00',
    viewCount: 1678,
    author: '成本分析师',
    tags: ['发电成本', '平价上网', '技术进步']
  },
  '10': {
    id: '10',
    title: '农光互补项目助力乡村振兴',
    summary: '农光互补模式在保障农业生产的同时，为农民增收提供了新途径。',
    content: `
      <h3>农光互补模式介绍</h3>
      <p>农光互补是指在农业用地上方建设光伏发电设施，下方继续从事农业生产的复合利用模式。</p>
      
      <h3>模式优势</h3>
      <ul>
        <li>土地利用效率高，实现"一地两用"</li>
        <li>为农业生产提供遮阴，改善作物生长环境</li>
        <li>增加农民收入，助力脱贫攻坚</li>
        <li>促进农业现代化，推动产业升级</li>
      </ul>
      
      <h3>适用场景</h3>
      <p>农光互补项目适用于：</p>
      <ul>
        <li>大棚种植：蔬菜、花卉等设施农业</li>
        <li>水产养殖：鱼塘、虾池等水面利用</li>
        <li>畜牧业：养殖场屋顶光伏建设</li>
        <li>经济作物：中药材、茶叶等种植</li>
      </ul>
      
      <h3>社会效益</h3>
      <p>农光互补项目为乡村振兴提供了有力支撑，预计可为农民年增收200-300元/亩，成为农村经济发展的新动能。</p>
    `,
    thumbnail: '/assets/images/logo4.jpg',
    publishTime: '2024-01-06 14:30:00',
    viewCount: 1234,
    author: '乡村振兴网',
    tags: ['农光互补', '乡村振兴', '农民增收']
  },
  '11': {
    id: '11',
    title: '海上光伏发电技术发展前景',
    summary: '海上光伏发电作为新兴技术，具有广阔的发展空间和应用前景。',
    content: `
      <h3>海上光伏技术特点</h3>
      <p>海上光伏发电是指在海洋、湖泊等水面上建设的光伏发电系统，具有独特的技术优势。</p>
      
      <h3>技术优势</h3>
      <ul>
        <li>水面冷却效应，提高发电效率</li>
        <li>减少土地占用，节约土地资源</li>
        <li>降低水分蒸发，具有环保效益</li>
        <li>避免阴影遮挡，发电量更稳定</li>
      </ul>
      
      <h3>技术挑战</h3>
      <p>海上光伏面临的主要挑战：</p>
      <ul>
        <li>防腐蚀要求高，设备成本较高</li>
        <li>施工难度大，建设周期较长</li>
        <li>维护不便，运维成本较高</li>
        <li>环境影响评估要求严格</li>
      </ul>
      
      <h3>发展前景</h3>
      <p>随着技术不断成熟和成本持续下降，海上光伏有望成为光伏产业发展的新增长点，预计市场规模将达到千亿级别。</p>
    `,
    thumbnail: '/assets/images/logo5.jpg',
    publishTime: '2024-01-05 09:45:00',
    viewCount: 987,
    author: '海洋能源',
    tags: ['海上光伏', '水面光伏', '技术发展']
  },
  '12': {
    id: '12',
    title: '光伏发电设备智能运维系统升级',
    summary: '基于人工智能的光伏发电设备运维系统，大幅提升了设备运行效率。',
    content: `
      <h3>智能运维系统概述</h3>
      <p>光伏智能运维系统集成了物联网、大数据、人工智能等先进技术，实现设备运行状态的实时监控和智能分析。</p>
      
      <h3>系统功能特点</h3>
      <ul>
        <li>实时监控：24小时不间断监测设备运行状态</li>
        <li>故障预警：提前识别潜在故障，减少停机损失</li>
        <li>智能诊断：基于AI算法，快速定位故障原因</li>
        <li>优化调度：根据天气和负荷情况，优化发电策略</li>
      </ul>
      
      <h3>应用效果</h3>
      <p>智能运维系统应用后：</p>
      <ul>
        <li>设备可用率提升至99%以上</li>
        <li>运维成本降低30-40%</li>
        <li>发电量提升3-5%</li>
        <li>故障处理时间缩短50%</li>
      </ul>
      
      <h3>发展趋势</h3>
      <p>未来智能运维系统将更加智能化，通过5G、边缘计算等技术，实现更精准的预测和更高效的运维管理。</p>
    `,
    thumbnail: '/assets/images/logo6.jpg',
    publishTime: '2024-01-04 16:20:00',
    viewCount: 1567,
    author: '智能运维',
    tags: ['智能运维', '人工智能', '设备管理']
  }
}

const NewsDetail = () => {
  const router = useRouter()
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { id } = router.params
    if (id) {
      fetchNewsDetail(id)
    }
  }, [router.params])

  const fetchNewsDetail = async (id: string) => {
    setLoading(true)
    try {
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const detail = mockNewsDetail[id]
      if (detail) {
        setNewsDetail(detail)
        // 更新阅读量
        detail.viewCount += 1
      } else {
        Taro.showToast({
          title: '新闻不存在',
          icon: 'error'
        })
        setTimeout(() => {
          Taro.navigateBack()
        }, 1500)
      }
    } catch (error) {
      console.error('Failed to fetch news detail:', error)
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

  const handleBack = () => {
    Taro.navigateBack()
  }

  if (loading) {
    return (
      <View className='news-detail-page'>
        <View className='loading-container'>
          <Text>加载中...</Text>
        </View>
      </View>
    )
  }

  if (!newsDetail) {
    return (
      <View className='news-detail-page'>
        <View className='error-container'>
          <Text>新闻不存在</Text>
        </View>
      </View>
    )
  }

  return (
    <View className='news-detail-page'>
      <View className='article-header'>
        <Text className='article-title'>{newsDetail.title}</Text>
        <View className='article-meta'>
          <View className='meta-item'>
            <Text className='meta-label'>作者：</Text>
            <Text className='meta-value'>{newsDetail.author}</Text>
          </View>
          <View className='meta-item'>
            <Text className='meta-label'>发布时间：</Text>
            <Text className='meta-value'>{newsDetail.publishTime}</Text>
          </View>
          <View className='meta-item'>
            <Text className='meta-label'>阅读量：</Text>
            <Text className='meta-value'>{newsDetail.viewCount}</Text>
          </View>
        </View>
        <View className='article-tags'>
          {newsDetail.tags.map((tag, index) => (
            <Text key={index} className='tag'>{tag}</Text>
          ))}
        </View>
      </View>

      <View className='article-body'>
        <Image 
          src={newsDetail.thumbnail} 
          className='article-image'
          mode='aspectFill'
        />
        <View className='article-summary'>
          <Text>{newsDetail.summary}</Text>
        </View>
        <View className='article-content'>
          <RichText nodes={newsDetail.content} />
        </View>
      </View>
    </View>
  )
}

export default NewsDetail

import { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import './index.less'

interface ExpertDetail {
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
  education: string
  certifications: string[]
  achievements: string[]
  workHistory: {
    company: string
    position: string
    duration: string
    description: string
  }[]
  serviceAreas: string[]
  consultation: {
    price: number
    responseTime: string
    satisfaction: number
  }
  portfolio: {
    id: string
    title: string
    description: string
    image?: string
  }[]
}

// Mock 详细数据
const mockExpertDetail: { [key: string]: ExpertDetail } = {
  '1': {
    id: '1',
    name: '张建华',
    title: '光伏系统设计专家',
    description: '20年光伏行业经验，专注于大型光伏电站设计与优化，参与过多个GW级项目建设。在光伏系统设计、电站规划、技术咨询等领域有深入研究，为众多企业提供专业的技术解决方案。',
    avatar: '/assets/images/avatar1.jpg',
    specialty: ['光伏系统设计', '电站规划', '技术咨询', '项目管理'],
    experience: '20年',
    organization: '中国光伏行业协会',
    rating: 4.9,
    consultationCount: 1250,
    status: 'available',
    tags: ['光伏设计', '电站建设', '技术指导', '项目优化'],
    education: '清华大学电气工程博士',
    certifications: ['高级工程师', '光伏系统设计师', 'PMP项目管理师', 'IEC国际认证'],
    achievements: [
      '主导设计50+个大型光伏电站项目',
      '发表光伏技术论文30余篇',
      '获得国家科技进步二等奖',
      '拥有光伏技术专利15项'
    ],
    workHistory: [
      {
        company: '中国光伏行业协会',
        position: '技术委员会主任',
        duration: '2020年至今',
        description: '负责行业技术标准制定和技术发展规划'
      },
      {
        company: '阳光电源股份有限公司',
        position: '首席技术官',
        duration: '2015-2020年',
        description: '主导公司技术战略规划和重大项目技术方案'
      },
      {
        company: '华为技术有限公司',
        position: '光伏事业部总工程师',
        duration: '2010-2015年',
        description: '负责光伏逆变器产品技术研发和系统解决方案'
      }
    ],
    serviceAreas: ['光伏电站设计', '系统优化咨询', '技术方案评审', '项目可行性分析', '团队技术培训'],
    consultation: {
      price: 500,
      responseTime: '2小时内',
      satisfaction: 98
    },
    portfolio: [
      {
        id: '1',
        title: '某100MW大型地面光伏电站',
        description: '设计装机容量100MW的大型地面光伏电站，采用先进的跟踪系统，年发电量达1.5亿度'
      },
      {
        id: '2',
        title: '工商业屋顶分布式光伏项目',
        description: '为某大型制造企业设计50MW屋顶分布式光伏系统，实现企业用电自给自足'
      },
      {
        id: '3',
        title: '农光互补示范项目',
        description: '创新性农光互补项目设计，在保证农业生产的同时实现清洁能源发电'
      }
    ]
  },
  '2': {
    id: '2',
    name: '李明',
    title: '新能源政策专家',
    description: '长期从事新能源政策研究，对国家及地方光伏政策有深入理解，为企业提供政策解读服务。在新能源政策制定、补贴申报、项目备案等方面具有丰富经验。',
    avatar: '/assets/images/avatar2.jpg',
    specialty: ['政策解读', '补贴申报', '项目备案', '法规咨询'],
    experience: '15年',
    organization: '国家发改委能源研究所',
    rating: 4.8,
    consultationCount: 890,
    status: 'available',
    tags: ['政策解读', '补贴政策', '项目申报', '法规分析'],
    education: '北京大学经济学硕士',
    certifications: ['高级经济师', '能源政策分析师', '项目评估师'],
    achievements: [
      '参与制定多项国家新能源政策',
      '为200+企业提供政策咨询服务',
      '发表政策解读文章100余篇',
      '获得国家能源局优秀咨询专家'
    ],
    workHistory: [
      {
        company: '国家发改委能源研究所',
        position: '新能源政策研究员',
        duration: '2018年至今',
        description: '负责新能源政策研究和政策建议起草'
      },
      {
        company: '中国可再生能源学会',
        position: '政策委员会秘书长',
        duration: '2015-2018年',
        description: '协调行业政策研究和对外交流合作'
      },
      {
        company: '国家能源局',
        position: '政策法规司处长',
        duration: '2010-2015年',
        description: '参与新能源相关法规和政策制定工作'
      }
    ],
    serviceAreas: ['政策解读咨询', '补贴申报指导', '项目合规审查', '政策风险评估', '法规培训'],
    consultation: {
      price: 400,
      responseTime: '1小时内',
      satisfaction: 96
    },
    portfolio: [
      {
        id: '1',
        title: '分布式光伏政策解读专题',
        description: '深度解读国家分布式光伏政策，为企业投资决策提供指导'
      },
      {
        id: '2',
        title: '绿证交易政策分析',
        description: '分析绿色电力证书交易政策，帮助企业参与绿证交易'
      },
      {
        id: '3',
        title: '碳交易市场政策研究',
        description: '研究碳交易市场政策对新能源行业的影响和机遇'
      }
    ]
  },
  '3': {
    id: '3',
    name: '王晓梅',
    title: '光伏投资分析师',
    description: '资深投资分析师，专注于光伏项目投资评估与风险分析，服务过百余个投资项目。在项目财务建模、投资收益分析、风险控制等方面具有专业能力。',
    avatar: '/assets/images/avatar1.jpg',
    specialty: ['投资分析', '项目评估', '财务建模', '风险管理'],
    experience: '12年',
    organization: '华能新能源投资有限公司',
    rating: 4.7,
    consultationCount: 650,
    status: 'busy',
    tags: ['投资分析', '项目评估', '风险控制', '财务咨询'],
    education: '上海财经大学金融学硕士',
    certifications: ['CFA特许金融分析师', '注册会计师', '风险管理师', '项目管理师'],
    achievements: [
      '成功评估投资项目总额超100亿元',
      '投资项目平均IRR超过12%',
      '获得最佳投资分析师奖',
      '发表投资分析报告50余份'
    ],
    workHistory: [
      {
        company: '华能新能源投资有限公司',
        position: '投资总监',
        duration: '2019年至今',
        description: '负责新能源项目投资决策和投资组合管理'
      },
      {
        company: '中金公司',
        position: '高级投资经理',
        duration: '2016-2019年',
        description: '专注清洁能源领域投资分析和尽职调查'
      },
      {
        company: '普华永道',
        position: '高级咨询顾问',
        duration: '2012-2016年',
        description: '为能源企业提供财务咨询和投资评估服务'
      }
    ],
    serviceAreas: ['项目投资评估', '财务尽职调查', '投资风险分析', '商业模式设计', '融资方案规划'],
    consultation: {
      price: 600,
      responseTime: '4小时内',
      satisfaction: 94
    },
    portfolio: [
      {
        id: '1',
        title: '某200MW光伏电站投资评估',
        description: '完成200MW光伏电站项目投资评估，IRR达到13.5%'
      },
      {
        id: '2',
        title: '分布式光伏投资基金设计',
        description: '设计10亿元分布式光伏投资基金，已成功募集完成'
      },
      {
        id: '3',
        title: '光伏制造企业并购分析',
        description: '为某光伏制造企业并购项目提供财务分析和风险评估'
      }
    ]
  },
  '4': {
    id: '4',
    name: '陈志强',
    title: '分布式光伏专家',
    description: '分布式光伏领域资深专家，在工商业分布式、户用光伏等领域有丰富实践经验。专注于屋顶资源开发、系统设计优化、并网技术等专业领域。',
    avatar: '/assets/images/avatar2.jpg',
    specialty: ['分布式光伏', '屋顶开发', '并网技术', '系统优化'],
    experience: '18年',
    organization: '隆基绿能科技股份有限公司',
    rating: 4.8,
    consultationCount: 780,
    status: 'available',
    tags: ['分布式光伏', '屋顶开发', '并网服务', '系统设计'],
    education: '华中科技大学电气工程硕士',
    certifications: ['高级工程师', '分布式发电工程师', '电气工程师', '安全工程师'],
    achievements: [
      '完成分布式光伏项目500+个',
      '屋顶资源开发经验丰富',
      '获得分布式光伏优秀工程师奖',
      '参与制定分布式光伏技术标准'
    ],
    workHistory: [
      {
        company: '隆基绿能科技股份有限公司',
        position: '分布式事业部总经理',
        duration: '2020年至今',
        description: '负责分布式光伏业务发展和技术创新'
      },
      {
        company: '晶科能源有限公司',
        position: '分布式技术总监',
        duration: '2016-2020年',
        description: '主导分布式光伏技术研发和项目实施'
      },
      {
        company: '正泰新能源开发有限公司',
        position: '高级工程师',
        duration: '2010-2016年',
        description: '从事分布式光伏系统设计和工程管理'
      }
    ],
    serviceAreas: ['分布式系统设计', '屋顶资源评估', '并网方案制定', '系统优化升级', '运维指导'],
    consultation: {
      price: 450,
      responseTime: '3小时内',
      satisfaction: 97
    },
    portfolio: [
      {
        id: '1',
        title: '某工业园区20MW分布式光伏',
        description: '为大型工业园区设计20MW分布式光伏系统，年发电量2500万度'
      },
      {
        id: '2',
        title: '商业综合体10MW屋顶光伏',
        description: '在商业综合体屋顶建设10MW光伏系统，实现绿色能源供应'
      },
      {
        id: '3',
        title: '学校分布式光伏示范项目',
        description: '为某大学建设5MW分布式光伏系统，打造绿色校园'
      }
    ]
  },
  '5': {
    id: '5',
    name: '刘芳',
    title: '光伏运维专家',
    description: '光伏电站运维管理专家，在电站运维、故障诊断、性能优化等方面具有丰富经验。专注于智能运维技术应用，提升电站发电效率。',
    avatar: '/assets/images/avatar1.jpg',
    specialty: ['运维管理', '故障诊断', '性能优化', '智能运维'],
    experience: '14年',
    organization: '天合光能股份有限公司',
    rating: 4.6,
    consultationCount: 520,
    status: 'offline',
    tags: ['运维管理', '故障诊断', '数据分析', '性能提升'],
    education: '西安交通大学自动化硕士',
    certifications: ['高级工程师', '运维工程师', '数据分析师', '项目管理师'],
    achievements: [
      '管理光伏电站装机容量超过2GW',
      '故障诊断准确率达95%以上',
      '获得最佳运维团队奖',
      '开发智能运维系统专利3项'
    ],
    workHistory: [
      {
        company: '天合光能股份有限公司',
        position: '运维事业部总监',
        duration: '2018年至今',
        description: '负责全国光伏电站运维管理和技术创新'
      },
      {
        company: '协鑫新能源控股有限公司',
        position: '运维部经理',
        duration: '2015-2018年',
        description: '管理多个大型光伏电站的运维工作'
      },
      {
        company: '中广核太阳能开发有限公司',
        position: '运维工程师',
        duration: '2010-2015年',
        description: '从事光伏电站运维技术和管理工作'
      }
    ],
    serviceAreas: ['运维体系建设', '故障快速诊断', '性能优化方案', '智能运维咨询', '运维团队培训'],
    consultation: {
      price: 380,
      responseTime: '4小时内',
      satisfaction: 95
    },
    portfolio: [
      {
        id: '1',
        title: '某200MW光伏电站运维优化',
        description: '通过运维优化，电站发电量提升8%，故障率降低60%'
      },
      {
        id: '2',
        title: '智能运维系统部署',
        description: '为多个电站部署智能运维系统，实现预防性维护'
      },
      {
        id: '3',
        title: '运维团队培训项目',
        description: '为行业内企业提供专业运维团队培训服务'
      }
    ]
  },
  '6': {
    id: '6',
    name: '赵国庆',
    title: '储能技术专家',
    description: '储能技术领域专家，专注于光储一体化系统设计，在储能技术应用方面有深度研究。致力于推动储能技术在可再生能源领域的应用。',
    avatar: '/assets/images/avatar2.jpg',
    specialty: ['储能技术', '光储一体化', '系统集成', '能量管理'],
    experience: '10年',
    organization: '宁德时代新能源科技有限公司',
    rating: 4.7,
    consultationCount: 380,
    status: 'available',
    tags: ['储能技术', '光储结合', '系统优化', '能量管理'],
    education: '中科院电工研究所博士',
    certifications: ['高级工程师', '储能系统工程师', '能源管理师', '安全评价师'],
    achievements: [
      '参与储能系统设计项目100+个',
      '发表储能技术论文20余篇',
      '获得储能技术专利8项',
      '参与储能行业标准制定'
    ],
    workHistory: [
      {
        company: '宁德时代新能源科技有限公司',
        position: '储能系统技术总监',
        duration: '2019年至今',
        description: '负责储能系统技术开发和产品应用'
      },
      {
        company: '比亚迪股份有限公司',
        position: '储能事业部高级工程师',
        duration: '2016-2019年',
        description: '从事储能技术研发和系统集成工作'
      },
      {
        company: '中科院电工研究所',
        position: '研究员',
        duration: '2014-2016年',
        description: '从事储能技术基础研究和技术开发'
      }
    ],
    serviceAreas: ['储能系统设计', '光储一体化方案', '能量管理策略', '储能技术咨询', '系统优化升级'],
    consultation: {
      price: 550,
      responseTime: '2小时内',
      satisfaction: 96
    },
    portfolio: [
      {
        id: '1',
        title: '某工业园区储能示范项目',
        description: '设计50MWh储能系统，实现园区能源自平衡'
      },
      {
        id: '2',
        title: '光储一体化微电网项目',
        description: '建设光储一体化微电网，提高能源利用效率'
      },
      {
        id: '3',
        title: '电网侧储能调频项目',
        description: '参与电网侧储能调频项目，提升电网稳定性'
      }
    ]
  }
}

const ExpertDetail = () => {
  const router = useRouter()
  const [expertDetail, setExpertDetail] = useState<ExpertDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)

  const tabList = ['专家介绍', '工作经历', '服务案例', '联系咨询']

  useEffect(() => {
    if (router.params.id) {
      fetchExpertDetail(router.params.id)
    }
  }, [router.params.id])

  const fetchExpertDetail = async (id: string) => {
    setLoading(true)
    try {
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const detail = mockExpertDetail[id]
      if (detail) {
        setExpertDetail(detail)
        Taro.setNavigationBarTitle({ title: detail.name })
      } else {
        Taro.showToast({
          title: '专家信息不存在',
          icon: 'error'
        })
      }
    } catch (error) {
      console.error('Failed to fetch expert detail:', error)
      Taro.showToast({
        title: '加载失败',
        icon: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleConsultation = () => {
    Taro.showModal({
      title: '咨询预约',
      content: `是否要预约与${expertDetail?.name}的咨询服务？\n\n咨询费用：¥${expertDetail?.consultation.price}/小时\n响应时间：${expertDetail?.consultation.responseTime}`,
      confirmText: '立即预约',
      cancelText: '稍后联系',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({
            title: '预约成功，专家将尽快与您联系',
            icon: 'success',
            duration: 2000
          })
        }
      }
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

  if (loading) {
    return (
      <View className='expert-detail-page'>
        <View className='loading-container'>
          <Text>加载中...</Text>
        </View>
      </View>
    )
  }

  if (!expertDetail) {
    return (
      <View className='expert-detail-page'>
        <View className='error-container'>
          <Text>专家信息不存在</Text>
        </View>
      </View>
    )
  }

  return (
    <View className='expert-detail-page'>
      {/* 专家基本信息 */}
      <View className='expert-header'>
        <View className='expert-avatar-container'>
          <Image 
            src={expertDetail.avatar || '/assets/images/default-avatar.jpg'} 
            className='expert-avatar'
            mode='aspectFill'
          />
          <View 
            className='status-indicator'
            style={{ backgroundColor: getStatusColor(expertDetail.status) }}
          />
        </View>
        
        <View className='expert-info'>
          <View className='expert-name-row'>
            <Text className='expert-name'>{expertDetail.name}</Text>
            <View className='expert-status'>
              <Text style={{ color: getStatusColor(expertDetail.status) }}>
                {getStatusText(expertDetail.status)}
              </Text>
            </View>
          </View>
          
          <Text className='expert-title'>{expertDetail.title}</Text>
          <Text className='expert-organization'>{expertDetail.organization}</Text>
          
          <View className='expert-stats'>
            <View className='stat-item'>
              <Text className='stat-value'>{expertDetail.rating}</Text>
              <Text className='stat-label'>评分</Text>
            </View>
            <View className='stat-item'>
              <Text className='stat-value'>{expertDetail.consultationCount}</Text>
              <Text className='stat-label'>咨询</Text>
            </View>
            <View className='stat-item'>
              <Text className='stat-value'>{expertDetail.experience}</Text>
              <Text className='stat-label'>经验</Text>
            </View>
            <View className='stat-item'>
              <Text className='stat-value'>{expertDetail.consultation.satisfaction}%</Text>
              <Text className='stat-label'>满意度</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 标签 */}
      <View className='expert-tags-section'>
        <View className='expert-tags'>
          {expertDetail.tags.map((tag, index) => (
            <View key={index} className='tag'>
              <Text>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tab导航 */}
      <View className='tabs-container'>
        <ScrollView className='tabs-scroll' scrollX>
          <View className='tabs-list'>
            {tabList.map((tab, index) => (
              <View
                key={index}
                className={`tab-item ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                <Text>{tab}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* 内容区域 */}
      <ScrollView className='content-scroll' scrollY>
        <View className='content-container'>
          {activeTab === 0 && (
            <View className='intro-content'>
              <View className='section'>
                <Text className='section-title'>专家简介</Text>
                <Text className='section-text'>{expertDetail.description}</Text>
              </View>

              <View className='section'>
                <Text className='section-title'>专业领域</Text>
                <View className='specialty-list'>
                  {expertDetail.specialty.map((item, index) => (
                    <View key={index} className='specialty-item'>
                      <Text>• {item}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View className='section'>
                <Text className='section-title'>教育背景</Text>
                <Text className='section-text'>{expertDetail.education}</Text>
              </View>

              <View className='section'>
                <Text className='section-title'>专业认证</Text>
                <View className='certification-list'>
                  {expertDetail.certifications.map((cert, index) => (
                    <View key={index} className='certification-item'>
                      <Text>• {cert}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View className='section'>
                <Text className='section-title'>主要成就</Text>
                <View className='achievement-list'>
                  {expertDetail.achievements.map((achievement, index) => (
                    <View key={index} className='achievement-item'>
                      <Text>• {achievement}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {activeTab === 1 && (
            <View className='history-content'>
              <View className='section'>
                <Text className='section-title'>工作经历</Text>
                <View className='work-history'>
                  {expertDetail.workHistory.map((work, index) => (
                    <View key={index} className='work-item'>
                      <View className='work-header'>
                        <Text className='work-company'>{work.company}</Text>
                        <Text className='work-duration'>{work.duration}</Text>
                      </View>
                      <Text className='work-position'>{work.position}</Text>
                      <Text className='work-description'>{work.description}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {activeTab === 2 && (
            <View className='portfolio-content'>
              <View className='section'>
                <Text className='section-title'>服务案例</Text>
                <View className='portfolio-list'>
                  {expertDetail.portfolio.map((item, index) => (
                    <View key={index} className='portfolio-item'>
                      <Text className='portfolio-title'>{item.title}</Text>
                      <Text className='portfolio-description'>{item.description}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View className='section'>
                <Text className='section-title'>服务领域</Text>
                <View className='service-areas'>
                  {expertDetail.serviceAreas.map((area, index) => (
                    <View key={index} className='service-area'>
                      <Text>• {area}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {activeTab === 3 && (
            <View className='contact-content'>
              <View className='section'>
                <Text className='section-title'>咨询服务</Text>
                <View className='consultation-info'>
                  <View className='info-item'>
                    <Text className='info-label'>咨询费用：</Text>
                    <Text className='info-value'>¥{expertDetail.consultation.price}/小时</Text>
                  </View>
                  <View className='info-item'>
                    <Text className='info-label'>响应时间：</Text>
                    <Text className='info-value'>{expertDetail.consultation.responseTime}</Text>
                  </View>
                  <View className='info-item'>
                    <Text className='info-label'>客户满意度：</Text>
                    <Text className='info-value'>{expertDetail.consultation.satisfaction}%</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default ExpertDetail 
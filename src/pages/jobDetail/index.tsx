import { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, Button } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import './index.less'
import Logo1 from '../../assets/images/logo1.jpg'
import Logo2 from '../../assets/images/logo2.jpg'
import Logo3 from '../../assets/images/logo3.jpg'
import Logo4 from '../../assets/images/logo4.jpg'
import Logo5 from '../../assets/images/logo5.jpg'
import Logo6 from '../../assets/images/logo6.jpg'

interface JobDetail {
  key: string
  title: string
  department: string
  address: string
  tags: string[]
  publishTime: string
  type: number
  companyId: string
  companyName: string
  companyLogo: string
  salary: string
  experience: string
  education: string
  description: string
}

const JobDetail = () => {
  const router = useRouter()
  const { id } = router.params
  const [jobDetail, setJobDetail] = useState<JobDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchJobDetail(id)
    }
  }, [id])

  const fetchJobDetail = async (jobId: string) => {
    setLoading(true)
    try {
      // 模拟岗位详情数据 - 根据ID匹配对应的详情
      const mockDetailsMap: Record<string, JobDetail> = {
        "1a2b3c": {
          key: "1a2b3c",
          title: "高级前端开发工程师",
          department: "技术中心",
          address: "北京",
          tags: ["已发布"],
          publishTime: "2024-01-15 13:20",
          type: 0,
          companyId: "c001",
          companyName: "阳光电力科技有限公司",
          companyLogo: Logo1,
          salary: "15K-25K",
          experience: "3-5年",
          education: "本科",
          description: `## 岗位职责

- 负责公司产品的前端开发工作，实现交互式用户界面
- 优化前端性能，提升用户体验  
- 参与技术方案设计和评审
- 配合产品经理进行需求分析和功能实现
- 与后端开发人员协作，完成接口对接

## 任职要求

### 技能要求
- 精通 HTML、CSS 和 JavaScript
- 熟悉 Vue.js 或 React 框架
- 了解前端工程化工具（Webpack、Vite等）
- 熟悉Git版本控制工具

### 经验要求
- 3年以上前端开发经验
- 有大型项目开发经验
- 良好的代码风格和编程习惯

### 学历要求
- 本科及以上学历
- 计算机相关专业优先

## 加分项

- 有移动端开发经验
- 熟悉 TypeScript
- 了解服务端渲染技术
- 有开源项目贡献经验
- 熟悉光伏行业或新能源领域

## 福利待遇

- 五险一金，补充商业保险
- 带薪年假，弹性工作制
- 年度体检，团队建设活动
- 培训学习机会，职业发展通道
- 餐饮补贴，交通补贴`
        },
        "4d5e6f": {
          key: "4d5e6f",
          title: "产品经理",
          department: "产品部",
          address: "上海",
          tags: ["已发布"],
          publishTime: "2024-01-10 09:45",
          type: 1,
          companyId: "c002",
          companyName: "绿能科技集团",
          companyLogo: Logo2,
          salary: "20K-30K",
          experience: "3-5年",
          education: "本科",
          description: `## 岗位职责

- 负责产品规划和需求分析，协调开发、设计和测试团队
- 深入了解用户需求，制定产品发展路线图
- 跟踪产品数据，分析用户行为，持续优化产品体验
- 协调跨部门合作，推动产品项目的顺利实施
- 参与市场调研，竞品分析，制定产品策略

## 任职要求

### 专业技能
- 具备产品思维和用户体验意识
- 熟练使用原型设计工具（Axure、Figma等）
- 了解数据分析工具和方法
- 具备良好的沟通协调能力

### 工作经验
- 3年以上产品经理工作经验
- 有B端或C端产品经验
- 有完整产品生命周期管理经验

### 其他要求
- 本科及以上学历
- 思维敏捷，学习能力强
- 具备团队协作精神

## 优先条件

- 有新能源或智能硬件产品经验
- 熟悉敏捷开发流程
- 具备一定的技术背景
- 有用户研究经验

## 公司福利

- 具有竞争力的薪酬体系
- 完善的培训发展机制
- 良好的团队氛围
- 年度旅游和团建活动
- 健身房、下午茶等福利`
        },
        "7g8h9i": {
          key: "7g8h9i",
          title: "UI设计师",
          department: "设计中心",
          address: "广州",
          tags: ["已发布"],
          publishTime: "2024-01-12 16:30",
          type: 1,
          companyId: "c003",
          companyName: "太阳能源科技有限公司",
          companyLogo: Logo3,
          salary: "12K-18K",
          experience: "2-4年",
          education: "本科",
          description: `## 岗位职责

- 负责产品界面设计，提升视觉效果和用户体验
- 制定设计规范和标准，保证产品设计一致性
- 与产品经理和开发团队紧密配合，完成设计落地
- 参与用户调研，了解用户行为和需求
- 持续关注设计趋势，提升设计水平

## 任职要求

### 设计技能
- 精通 Photoshop、Illustrator、Sketch、Figma 等设计工具
- 具备良好的视觉设计能力和审美水平
- 了解移动端和Web端设计规范
- 具备一定的交互设计经验

### 工作经验
- 2年以上UI设计工作经验
- 有完整项目设计经验
- 具备良好的沟通能力

### 教育背景
- 本科及以上学历
- 设计相关专业优先

## 加分技能

- 有动效设计经验
- 了解前端开发技术
- 有品牌设计经验
- 熟悉用户体验设计方法论

## 工作环境

- 开放式设计工作区
- 高配置设计工作站
- 灵活的工作时间
- 设计团队氛围活跃
- 定期设计分享和培训`
        },
        "j0k1l2": {
          key: "j0k1l2",
          title: "后端开发工程师",
          department: "技术中心",
          address: "深圳",
          tags: ["待发布"],
          publishTime: "2024-01-18 11:15",
          type: 0,
          companyId: "c006",
          companyName: "新能源科技有限公司",
          companyLogo: Logo4,
          salary: "18K-30K",
          experience: "3-5年",
          education: "本科",
          description: `## 岗位职责

- 负责后端服务开发与维护，优化数据库性能
- 设计和实现高可用、高性能的后端架构
- 参与系统架构设计，制定技术方案
- 编写API接口，与前端团队协作完成功能开发
- 解决系统性能瓶颈，保障系统稳定运行

## 技术要求

### 开发技能
- 精通 Java/Python/Go 等后端开发语言
- 熟悉 Spring Boot、Django、Gin 等主流框架
- 掌握 MySQL、Redis、MongoDB 等数据库
- 了解微服务架构和分布式系统设计

### 运维技能
- 熟悉 Linux 操作系统
- 了解 Docker、Kubernetes 容器技术
- 有云平台使用经验（阿里云、腾讯云等）
- 掌握Git版本控制工具

### 经验要求
- 3年以上后端开发经验
- 有大型项目架构设计经验
- 具备良好的代码规范和文档编写习惯

## 优先条件

- 有高并发系统开发经验
- 熟悉消息队列（RabbitMQ、Kafka等）
- 了解搜索引擎（Elasticsearch等）
- 有开源项目贡献经验

## 发展前景

- 技术专家成长路径
- 架构师培养计划
- 团队领导发展机会
- 前沿技术学习资源
- 内部技术分享平台`
        },
        "e1f2g3": {
          key: "e1f2g3",
          title: "光伏系统设计工程师",
          department: "研发中心",
          address: "苏州",
          tags: ["已发布"],
          publishTime: "2024-01-08 09:30",
          type: 0,
          companyId: "c005",
          companyName: "环球光伏科技股份有限公司",
          companyLogo: Logo5,
          salary: "20K-30K",
          experience: "3-5年",
          education: "本科及以上",
          description: `## 岗位职责

- 负责光伏发电系统的设计和优化，进行光伏系统性能分析
- 制定光伏电站设计方案，包括组件选型、系统配置等
- 参与项目可行性研究，提供技术支持和解决方案
- 跟进项目实施过程，解决技术问题
- 编写技术文档和设计报告

## 专业要求

### 技术能力
- 精通光伏系统设计原理和相关规范
- 熟练使用PVsyst、AutoCAD、SketchUp等专业软件
- 了解光伏组件、逆变器等设备特性
- 掌握电气设计和施工图绘制

### 专业知识
- 电气工程、新能源等相关专业
- 具备扎实的电力系统理论基础
- 了解国家电力政策和行业标准
- 具备项目管理基础知识

### 工作经验
- 3年以上光伏系统设计经验
- 有大型地面电站或分布式项目经验
- 具备良好的沟通协调能力

## 发展优势

- 新能源行业快速发展期
- 技术创新机会多
- 国家政策大力支持
- 职业前景广阔

## 薪酬福利

- 行业领先薪酬水平
- 项目奖金激励
- 技术培训和认证支持
- 完善的职业发展通道
- 股权激励计划`
        },
        "k7l8m9": {
          key: "k7l8m9",
          title: "光伏产品销售经理",
          department: "销售部",
          address: "重庆",
          tags: ["已发布"],
          publishTime: "2024-01-11 10:20",
          type: 2,
          companyId: "c004",
          companyName: "光能智慧能源有限公司",
          companyLogo: Logo6,
          salary: "15K-25K",
          experience: "3-5年",
          education: "本科",
          description: `## 岗位职责

- 负责光伏产品的销售和客户关系维护
- 开拓新客户，维护现有客户关系
- 制定销售策略，完成销售目标
- 参与商务谈判，签订销售合同
- 收集市场信息，分析竞争对手动态

## 能力要求

### 销售技能
- 具备优秀的销售技巧和谈判能力
- 有较强的市场开拓和客户维护能力
- 了解销售流程和客户管理方法
- 具备良好的表达和沟通能力

### 行业知识
- 了解光伏行业发展趋势和政策
- 熟悉光伏产品特性和应用场景
- 掌握基本的技术知识
- 了解市场价格和竞争情况

### 工作经验
- 3年以上销售工作经验
- 有新能源或工业产品销售经验优先
- 具备一定的客户资源

## 个人素质

- 积极主动，抗压能力强
- 诚信负责，团队合作精神
- 学习能力强，适应能力强
- 出差意愿，能够承受一定工作强度

## 薪酬体系

- 基本薪资 + 提成奖金
- 销售业绩奖励
- 年终绩效奖金
- 出差补贴和交通津贴
- 带薪年假和节日福利

## 职业发展

- 销售主管/经理晋升通道
- 区域负责人发展机会
- 销售培训和技能提升
- 行业经验积累平台`
        }
      }
      
      const matchedJob = mockDetailsMap[jobId]
      
      if (!matchedJob) {
        setJobDetail(null)
        return
      }
      
      setJobDetail(matchedJob)
      Taro.setNavigationBarTitle({ title: matchedJob.title })
    } catch (error) {
      console.error('Failed to fetch job detail:', error)
      Taro.showToast({
        title: '加载失败',
        icon: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApply = () => {
    Taro.showModal({
      title: '温馨提示',
      content: '请在Web端完成简历投递和职位申请',
      showCancel: false,
      confirmText: '我知道了'
    })
  }

  const handleCall = () => {
    Taro.makePhoneCall({
      phoneNumber: '400-123-4567'
    })
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // 渲染岗位描述，处理markdown格式
  const renderJobDescription = (description: string) => {
    const lines = description.split('\n')
    const elements: any[] = []
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim()
      
      if (trimmedLine.startsWith('##')) {
        // 二级标题
        const title = trimmedLine.replace(/^#+\s*/, '')
        elements.push(
          <Text key={index} className='section-title'>
            {title}
          </Text>
        )
      } else if (trimmedLine.startsWith('###')) {
        // 三级标题
        const title = trimmedLine.replace(/^#+\s*/, '')
        elements.push(
          <Text key={index} className='subsection-title'>
            {title}
          </Text>
        )
      } else if (trimmedLine.startsWith('-')) {
        // 列表项
        const content = trimmedLine.replace(/^-\s*/, '')
        elements.push(
          <View key={index} className='list-item'>
            <Text className='list-bullet'>•</Text>
            <Text className='list-content'>{content}</Text>
          </View>
        )
      } else if (trimmedLine) {
        // 普通文本
        elements.push(
          <Text key={index} className='normal-text'>
            {trimmedLine}
          </Text>
        )
      }
    })
    
    return elements
  }

  if (loading) {
    return (
      <View className='job-detail-page'>
        <View className='loading'>加载中...</View>
      </View>
    )
  }

  if (!jobDetail) {
    return (
      <View className='job-detail-page'>
        <View className='error'>岗位信息不存在</View>
      </View>
    )
  }

  return (
    <View className='job-detail-page'>
      <ScrollView scrollY className='scroll-container'>
        {/* 岗位基本信息 */}
        <View className='job-header'>
          <View className='company-section'>
            <Image 
              src={jobDetail.companyLogo} 
              className='company-logo'
              mode='aspectFill'
            />
            <View className='company-info'>
              <Text className='company-name'>{jobDetail.companyName}</Text>
              <Text className='job-location'>{jobDetail.address}</Text>
            </View>
            <View className='job-status'>
              <View className={`status-tag ${jobDetail.tags[0] === '已发布' ? 'published' : 'pending'}`}>
                <Text className='status-text'>{jobDetail.tags[0]}</Text>
              </View>
            </View>
          </View>

          <Text className='job-title'>{jobDetail.title}</Text>
          
          <View className='job-meta'>
            <View className='meta-item'>
              <Text className='meta-label'>薪资待遇</Text>
              <Text className='meta-value salary'>{jobDetail.salary}</Text>
            </View>
            <View className='meta-item'>
              <Text className='meta-label'>工作经验</Text>
              <Text className='meta-value'>{jobDetail.experience}</Text>
            </View>
            <View className='meta-item'>
              <Text className='meta-label'>学历要求</Text>
              <Text className='meta-value'>{jobDetail.education}</Text>
            </View>
            <View className='meta-item'>
              <Text className='meta-label'>所属部门</Text>
              <Text className='meta-value'>{jobDetail.department}</Text>
            </View>
          </View>

          <View className='publish-info'>
            <Text className='publish-text'>发布时间：{formatDate(jobDetail.publishTime)}</Text>
          </View>
        </View>

        {/* 岗位描述 */}
        <View className='job-content'>
          <Text className='content-title'>岗位详情</Text>
          <View className='content-body'>
            {renderJobDescription(jobDetail.description)}
          </View>
        </View>

        {/* 温馨提示 */}
        <View className='tips-section'>
          <View className='tips-card'>
            <Text className='tips-title'>💡 温馨提示</Text>
            <Text className='tips-content'>
              详细的岗位申请和简历投递请在Web端进行操作，移动端仅供浏览岗位信息。
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default JobDetail

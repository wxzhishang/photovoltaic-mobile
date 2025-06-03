import { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, Button } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import './index.less'

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
      // 模拟获取岗位详情数据
      const mockDetail: JobDetail = {
        key: jobId,
        title: "高级前端开发工程师",
        department: "技术中心",
        address: "北京",
        tags: ["已发布"],
        publishTime: "2024-01-15 13:20",
        type: 0,
        companyId: "c001",
        companyName: "阳光电力科技有限公司",
        companyLogo: "/assets/images/company-logo1.jpg",
        salary: "15K-25K",
        experience: "3-5年",
        education: "本科",
        description: `
## 岗位职责

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
- 餐饮补贴，交通补贴
        `
      }
      
      setJobDetail(mockDetail)
      Taro.setNavigationBarTitle({ title: mockDetail.title })
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
            <Text className='content-text'>
              {jobDetail.description.replace(/[#*-]/g, '').replace(/\n\s*\n/g, '\n')}
            </Text>
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

      {/* 底部操作栏 */}
      <View className='action-bar'>
        <Button 
          className='contact-btn'
          onClick={handleCall}
        >
          联系HR
        </Button>
        <Button 
          className='apply-btn'
          onClick={handleApply}
        >
          立即申请
        </Button>
      </View>
    </View>
  )
}

export default JobDetail

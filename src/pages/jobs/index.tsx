import { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { Search } from '@taroify/core'
import '@taroify/core/search/style'
import Taro from '@tarojs/taro'
import './index.less'
import Logo1 from '../../assets/images/logo1.jpg'
import Logo2 from '../../assets/images/logo2.jpg'
import Logo3 from '../../assets/images/logo3.jpg'
import Logo4 from '../../assets/images/logo4.jpg'
import Logo5 from '../../assets/images/logo5.jpg'
import Logo6 from '../../assets/images/logo6.jpg'

interface JobItem {
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

const Jobs = () => {
  const [jobsList, setJobsList] = useState<JobItem[]>([])
  const [filteredJobs, setFilteredJobs] = useState<JobItem[]>([])
  const [loading, setLoading] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // 岗位类型映射
  const jobTypeMap = {
    0: '技术',
    1: '产品/设计',
    2: '市场/销售'
  }

  const tabList = ['全部岗位', '技术', '产品/设计', '市场/销售']

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: '岗位信息' })
    fetchJobsList()
  }, [])

  const fetchJobsList = async (page = 1) => {
    if (loading) return
    
    setLoading(true)
    try {
      // 模拟岗位数据（基于Web端数据结构）
      const mockJobs: JobItem[] = [
        {
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
          description: "负责公司产品的前端开发工作，实现交互式用户界面..."
        },
        {
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
          description: "负责产品规划和需求分析，协调开发、设计和测试团队..."
        },
        {
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
          description: "负责产品界面设计，提升视觉效果..."
        },
        {
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
          description: "负责后端服务开发与维护，优化数据库性能..."
        },
        {
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
          description: "负责光伏发电系统的设计和优化，进行光伏系统性能分析..."
        },
        {
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
          description: "负责光伏产品的销售和客户关系维护..."
        }
      ]

      if (page === 1) {
        setJobsList(mockJobs)
        setFilteredJobs(mockJobs)
      } else {
        setJobsList(prev => [...prev, ...mockJobs])
        setFilteredJobs(prev => [...prev, ...mockJobs])
      }

      setHasMore(false) // 模拟数据只有一页
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch jobs list:', error)
      Taro.showToast({
        title: '加载失败',
        icon: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  // 筛选岗位
  const filterJobs = () => {
    let result = [...jobsList]
    
    // 按搜索关键词筛选
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase()
      result = result.filter(job => 
        job.title.toLowerCase().includes(keyword) || 
        job.companyName.toLowerCase().includes(keyword) ||
        job.department.toLowerCase().includes(keyword)
      )
    }
    
    // 按类型筛选
    if (activeTab > 0) {
      const targetType = activeTab - 1
      result = result.filter(job => job.type === targetType)
    }
    
    setFilteredJobs(result)
  }

  useEffect(() => {
    filterJobs()
  }, [searchKeyword, activeTab, jobsList])

  const handleSearch = (event: any) => {
    setSearchKeyword(event.detail.value)
  }

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  const handleJobClick = (job: JobItem) => {
    Taro.navigateTo({
      url: `/pages/jobDetail/index?id=${job.key}`
    })
  }

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchJobsList(currentPage + 1)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return '今天'
    if (days === 1) return '昨天'
    if (days < 7) return `${days}天前`
    return dateStr.split(' ')[0]
  }

  return (
    <View className='jobs-page'>
      {/* 搜索栏 */}
      <View className='search-section'>
        <Search
          value={searchKeyword}
          onChange={handleSearch}
          placeholder='搜索岗位或公司'
        />
      </View>

      {/* 分类标签 */}
      <View className='tabs-section'>
        <View className='tab-buttons'>
          {tabList.map((tab, index) => (
            <View
              key={index}
              className={`tab-button ${activeTab === index ? 'active' : ''}`}
              onClick={() => handleTabClick(index)}
            >
              <Text className='tab-text'>{tab}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 岗位列表 */}
      <ScrollView scrollY className='jobs-list'>
        {filteredJobs.map(job => (
          <View
            key={job.key}
            className='job-card'
            onClick={() => handleJobClick(job)}
          >
            <View className='job-header'>
              <View className='company-info'>
                <Image 
                  src={job.companyLogo} 
                  className='company-logo'
                  mode='aspectFill'
                />
                <View className='company-details'>
                  <Text className='company-name'>{job.companyName}</Text>
                  <Text className='job-location'>{job.address}</Text>
                </View>
              </View>
              <View className='job-status'>
                <View className={`status-tag ${job.tags[0] === '已发布' ? 'published' : 'pending'}`}>
                  <Text className='status-text'>{job.tags[0]}</Text>
                </View>
              </View>
            </View>

            <View className='job-content'>
              <Text className='job-title'>{job.title}</Text>
              <View className='job-meta'>
                <Text className='job-salary'>{job.salary}</Text>
                <Text className='job-experience'>{job.experience}</Text>
                <Text className='job-education'>{job.education}</Text>
              </View>
              <Text className='job-department'>{job.department}</Text>
              <Text className='job-description'>{job.description}</Text>
            </View>

            <View className='job-footer'>
              <View className='job-type-tag'>
                <Text className='type-text'>{jobTypeMap[job.type]}</Text>
              </View>
              <Text className='publish-time'>{formatDate(job.publishTime)}</Text>
            </View>
          </View>
        ))}

        {hasMore && (
          <View className='load-more' onClick={handleLoadMore}>
            <Text className='load-more-text'>
              {loading ? '加载中...' : '点击加载更多'}
            </Text>
          </View>
        )}

        {!hasMore && filteredJobs.length > 0 && (
          <View className='no-more'>
            <Text className='no-more-text'>已加载全部岗位</Text>
          </View>
        )}

        {!loading && filteredJobs.length === 0 && (
          <View className='empty-state'>
            <Text className='empty-text'>暂无符合条件的岗位</Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default Jobs

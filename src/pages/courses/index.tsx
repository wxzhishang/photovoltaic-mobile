import { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { Search } from '@taroify/core'
import '@taroify/core/search/style'
import Taro from '@tarojs/taro'
import './index.less'
import Course1 from '../../assets/images/course1.jpg'
import Course2 from '../../assets/images/course2.jpg'
import Course3 from '../../assets/images/course3.jpg'
import Course4 from '../../assets/images/course4.jpg'
import Course5 from '../../assets/images/course5.jpg'

interface CourseItem {
  id: string
  title: string
  description: string
  thumbnail: string
  instructor: string
  duration: string
  level: string
  category: string
  price: number
  originalPrice?: number
  studentCount: number
  rating: number
  tags: string[]
  status: 'ongoing' | 'completed' | 'upcoming'
}

const Courses = () => {
  const [coursesList, setCoursesList] = useState<CourseItem[]>([])
  const [filteredCourses, setFilteredCourses] = useState<CourseItem[]>([])
  const [loading, setLoading] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const tabList = ['全部课程', '进行中', '已完成', '即将开始']

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: '课程中心' })
    fetchCoursesList()
  }, [])

  const fetchCoursesList = async (page = 1) => {
    if (loading) return
    
    setLoading(true)
    try {
      // 模拟课程数据
      const mockCourses: CourseItem[] = [
        {
          id: '1',
          title: '光伏系统设计与安装基础',
          description: '从零开始学习光伏系统的设计原理、组件选择、安装规范等核心知识',
          thumbnail: 'https://www.zjrongxiang.com/upfile/attached/202109/c14c94444bb04f25008209f9665b16c9.jpg',
          instructor: '张教授',
          duration: '24课时',
          level: '初级',
          category: '技术基础',
          price: 299,
          originalPrice: 399,
          studentCount: 1250,
          rating: 4.8,
          tags: ['光伏设计', '系统安装', '实战案例'],
          status: 'ongoing'
        },
        {
          id: '2',
          title: '分布式光伏项目开发实务',
          description: '深入讲解分布式光伏项目的开发流程、政策解读、商业模式等实用内容',
          thumbnail: 'data:image/webp;base64,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',
          instructor: '李工程师',
          duration: '18课时',
          level: '中级',
          category: '项目管理',
          price: 399,
          originalPrice: 499,
          studentCount: 890,
          rating: 4.7,
          tags: ['项目开发', '政策解读', '商业模式'],
          status: 'ongoing'
        },
        {
          id: '3',
          title: '光伏电站运维管理',
          description: '全面掌握光伏电站的运维管理知识，包括故障诊断、维护保养、数据分析等',
          thumbnail: 'https://th.bing.com/th/id/OIP.fFdudQDdeu__UUwJuVWJiQHaHa?w=189&h=189&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3',
          instructor: '王主任',
          duration: '20课时',
          level: '中级',
          category: '运维管理',
          price: 349,
          studentCount: 650,
          rating: 4.6,
          tags: ['运维管理', '故障诊断', '数据分析'],
          status: 'completed'
        },
        {
          id: '4',
          title: '新能源政策解读与投资分析',
          description: '解读最新新能源政策，分析投资机会，为投资决策提供专业指导',
          thumbnail: 'https://th.bing.com/th/id/OIP.mwKf6KWG7h9cCYa66KCJpwAAAA?w=189&h=126&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3',
          instructor: '陈博士',
          duration: '16课时',
          level: '高级',
          category: '政策投资',
          price: 599,
          originalPrice: 799,
          studentCount: 420,
          rating: 4.9,
          tags: ['政策解读', '投资分析', '市场趋势'],
          status: 'upcoming'
        },
        {
          id: '5',
          title: '光伏组件技术与质量检测',
          description: '深入了解光伏组件的技术原理、性能参数、质量检测方法等专业知识',
          thumbnail: 'https://th.bing.com/th/id/OIP._uMCMojb2ab_hzUaCWZecQAAAA?w=189&h=126&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3',
          instructor: '刘专家',
          duration: '22课时',
          level: '高级',
          category: '技术进阶',
          price: 499,
          studentCount: 380,
          rating: 4.7,
          tags: ['组件技术', '质量检测', '专业技术'],
          status: 'ongoing'
        }
      ]

      if (page === 1) {
        setCoursesList(mockCourses)
        setFilteredCourses(mockCourses)
      } else {
        setCoursesList(prev => [...prev, ...mockCourses])
        setFilteredCourses(prev => [...prev, ...mockCourses])
      }

      setHasMore(false) // 模拟数据只有一页
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch courses list:', error)
      Taro.showToast({
        title: '加载失败',
        icon: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  // 筛选课程
  const filterCourses = () => {
    let result = [...coursesList]
    
    // 按搜索关键词筛选
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase()
      result = result.filter(course => 
        course.title.toLowerCase().includes(keyword) || 
        course.instructor.toLowerCase().includes(keyword) ||
        course.category.toLowerCase().includes(keyword)
      )
    }
    
    // 按状态筛选
    if (activeTab > 0) {
      const statusMap = ['', 'ongoing', 'completed', 'upcoming']
      const targetStatus = statusMap[activeTab]
      result = result.filter(course => course.status === targetStatus)
    }
    
    setFilteredCourses(result)
  }

  useEffect(() => {
    filterCourses()
  }, [searchKeyword, activeTab, coursesList])

  const handleSearch = (event: any) => {
    setSearchKeyword(event.detail.value)
  }

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  const handleCourseClick = (course: CourseItem) => {
    Taro.showModal({
      title: '课程详情',
      content: `课程名称：${course.title}\n\n移动端仅供浏览课程信息，完整的课程学习和互动功能请在Web端进行体验。\n\n是否要查看Web端详情？`,
      confirmText: '去Web端',
      cancelText: '我知道了',
      success: (res) => {
        if (res.confirm) {
          // 这里可以添加跳转到Web端的逻辑
          Taro.showToast({
            title: '请在浏览器中打开Web端',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchCoursesList(currentPage + 1)
    }
  }

  const getStatusText = (status: string) => {
    const statusMap = {
      ongoing: '进行中',
      completed: '已完成',
      upcoming: '即将开始'
    }
    return statusMap[status] || '未知'
  }

  const getStatusColor = (status: string) => {
    const colorMap = {
      ongoing: '#3cc51f',
      completed: '#999',
      upcoming: '#ff6b35'
    }
    return colorMap[status] || '#999'
  }

  return (
    <View className='courses-page'>
      {/* 搜索栏 */}
      <View className='search-section'>
        <Search
          value={searchKeyword}
          onChange={handleSearch}
          placeholder='搜索课程或讲师'
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

      {/* 提示横幅 */}
      <View className='notice-banner'>
        <Text className='notice-text'>
          💡 移动端可浏览课程信息，完整学习体验请前往Web端
        </Text>
      </View>

      {/* 课程列表 */}
      <ScrollView scrollY className='courses-list'>
        {filteredCourses.map(course => (
          <View
            key={course.id}
            className='course-card'
            onClick={() => handleCourseClick(course)}
          >
            <Image 
              src={course.thumbnail} 
              className='course-thumbnail'
              mode='aspectFill'
            />
            
            <View className='course-content'>
              <View className='course-header'>
                <Text className='course-title'>{course.title}</Text>
                <View 
                  className='course-status'
                  style={{ color: getStatusColor(course.status) }}
                >
                  <Text className='status-text'>{getStatusText(course.status)}</Text>
                </View>
              </View>

              <Text className='course-description'>{course.description}</Text>

              <View className='course-meta'>
                <Text className='instructor'>讲师：{course.instructor}</Text>
                <Text className='duration'>{course.duration}</Text>
                <Text className='level'>{course.level}</Text>
              </View>

              <View className='course-tags'>
                {course.tags.map((tag, index) => (
                  <View key={index} className='tag'>
                    {tag}
                  </View>
                ))}
              </View>

              <View className='course-footer'>
                <View className='price-section'>
                  <Text className='current-price'>¥{course.price}</Text>
                  {course.originalPrice && (
                    <Text className='original-price'>¥{course.originalPrice}</Text>
                  )}
                </View>
                <View className='stats-section'>
                  <Text className='student-count'>{course.studentCount}人学习</Text>
                  <Text className='rating'>★ {course.rating}</Text>
                </View>
              </View>
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

        {!hasMore && filteredCourses.length > 0 && (
          <View className='no-more'>
            <Text className='no-more-text'>已加载全部课程</Text>
          </View>
        )}

        {!loading && filteredCourses.length === 0 && (
          <View className='empty-state'>
            <Text className='empty-text'>暂无符合条件的课程</Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default Courses

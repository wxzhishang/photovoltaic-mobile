import { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { Search } from '@taroify/core'
import '@taroify/core/search/style'
import Taro from '@tarojs/taro'
import './index.less'

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
          thumbnail: '/assets/images/course1.jpg',
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
          thumbnail: '/assets/images/course2.jpg',
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
          thumbnail: '/assets/images/course3.jpg',
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
          thumbnail: '/assets/images/course4.jpg',
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
          thumbnail: '/assets/images/course5.jpg',
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

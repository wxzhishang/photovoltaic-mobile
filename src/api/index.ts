import request from './request'

// 用户相关接口
export const userApi = {
  // 登录
  login: (data: { username: string; password: string }) => 
    request.post('/auth/login', data),
  
  // 短信登录
  smsLogin: (data: { phone: string; code: string }) => 
    request.post('/auth/sms-login', data),
  
  // 注册
  register: (data: any) => 
    request.post('/auth/register', data),
  
  // 获取用户信息
  getUserInfo: () => 
    request.get('/user/info'),
  
  // 更新用户信息
  updateUserInfo: (data: any) => 
    request.put('/user/info', data),
  
  // 发送短信验证码
  sendSms: (phone: string) => 
    request.post('/auth/send-sms', { phone })
}

// 新闻相关接口
export const newsApi = {
  // 获取新闻列表
  getNewsList: (params: { page?: number; size?: number; type?: string }) => 
    request.get('/news/list', params),
  
  // 获取新闻详情
  getNewsDetail: (id: string) => 
    request.get(`/news/${id}`),
  
  // 获取政策列表
  getPolicyList: (params: { page?: number; size?: number }) => 
    request.get('/policy/list', params)
}

// 专家相关接口
export const expertApi = {
  // 获取专家列表
  getExpertList: (params: { page?: number; size?: number }) => 
    request.get('/expert/list', params),
  
  // 获取专家详情
  getExpertDetail: (id: string) => 
    request.get(`/expert/${id}`)
}

// 课程相关接口
export const courseApi = {
  // 获取课程列表
  getCourseList: (params: { page?: number; size?: number; category?: string }) => 
    request.get('/course/list', params),
  
  // 获取课程详情
  getCourseDetail: (id: string) => 
    request.get(`/course/${id}`),
  
  // 报名课程
  enrollCourse: (courseId: string) => 
    request.post(`/course/${courseId}/enroll`)
}

// 招聘相关接口
export const jobApi = {
  // 获取招聘信息列表
  getJobList: (params: { page?: number; size?: number; city?: string; salary?: string }) => 
    request.get('/job/list', params),
  
  // 获取招聘详情
  getJobDetail: (id: string) => 
    request.get(`/job/${id}`),
  
  // 投递简历
  applyJob: (jobId: string) => 
    request.post(`/job/${jobId}/apply`)
}

// 交易相关接口
export const tradingApi = {
  // 获取交易列表
  getTradingList: (params: { page?: number; size?: number; type?: string }) => 
    request.get('/trading/list', params),
  
  // 创建交易
  createTrading: (data: any) => 
    request.post('/trading/create', data),
  
  // 获取交易详情
  getTradingDetail: (id: string) => 
    request.get(`/trading/${id}`)
}

// 绿电相关接口
export const greenElectricityApi = {
  // 获取绿电数据
  getGreenElectricityData: () => 
    request.get('/green-electricity/data'),
  
  // 获取实时电价
  getRealTimePrice: () => 
    request.get('/green-electricity/price')
}

// 认证相关接口
export const authenticationApi = {
  // 学生认证
  studentAuth: (data: any) => 
    request.post('/auth/student', data),
  
  // 企业认证
  enterpriseAuth: (data: any) => 
    request.post('/auth/enterprise', data),
  
  // 高校认证
  collegeAuth: (data: any) => 
    request.post('/auth/college', data)
} 
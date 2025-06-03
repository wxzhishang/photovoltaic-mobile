export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/login/index',
    'pages/register/index',
    'pages/trading/index',
    'pages/news/index',
    'pages/newsDetail/index',
    'pages/experts/index',
    'pages/courses/index',
    'pages/courseDetail/index',
    'pages/jobs/index',
    'pages/jobDetail/index',
    'pages/personal/index',
    'pages/authentication/index',
    'pages/greenElectricity/index',
    'pages/innovation/index',
    'pages/innovationDetail/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '光伏产业云平台',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#7A7E83',
    selectedColor: '#3cc51f',
    borderStyle: 'black',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/home/index',
        iconPath: 'assets/images/tab-home.png',
        selectedIconPath: 'assets/images/tab-home-active.png',
        text: '首页'
      },
      {
        pagePath: 'pages/jobs/index',
        iconPath: 'assets/images/tab-jobs.png',
        selectedIconPath: 'assets/images/tab-jobs-active.png',
        text: '岗位信息'
      },
      {
        pagePath: 'pages/courses/index',
        iconPath: 'assets/images/tab-courses.png',
        selectedIconPath: 'assets/images/tab-courses-active.png',
        text: '课程中心'
      },
      {
        pagePath: 'pages/greenElectricity/index',
        iconPath: 'assets/images/tab-green.png',
        selectedIconPath: 'assets/images/tab-green-active.png',
        text: '绿电绿证'
      },
      {
        pagePath: 'pages/personal/index',
        iconPath: 'assets/images/tab-personal.png',
        selectedIconPath: 'assets/images/tab-personal-active.png',
        text: '我的'
      }
    ]
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    }
  }
})

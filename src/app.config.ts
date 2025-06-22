export default defineAppConfig({
  pages: [
    'pages/home/index',
    // 'pages/login/index',
    // 'pages/register/index',
    'pages/trading/index',
    'pages/tradingDetail/index',
    'pages/news/index',
    'pages/newsDetail/index',
    'pages/experts/index',
    'pages/expertDetail/index',
    'pages/courses/index',
    'pages/courseDetail/index',
    'pages/jobs/index',
    'pages/jobDetail/index',
    // 'pages/personal/index',
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
        iconPath: 'assets/images/icon1.jpg',
        selectedIconPath: 'assets/images/icon1_active.jpg',
        text: '首页'
      },
      {
        pagePath: 'pages/jobs/index',
        iconPath: 'assets/images/icon2.jpg',
        selectedIconPath: 'assets/images/icon2_active.jpg',
        text: '岗位信息'
      },
      {
        pagePath: 'pages/courses/index',
        iconPath: 'assets/images/icon3.jpg',
        selectedIconPath: 'assets/images/icon3_active.jpg',
        text: '课程中心'
      },
      {
        pagePath: 'pages/greenElectricity/index',
        iconPath: 'assets/images/icon4.jpg',
        selectedIconPath: 'assets/images/icon4_active.jpg',
        text: '绿电绿证'
      },
      // {
      //   pagePath: 'pages/personal/index',
      //   iconPath: 'assets/images/icon5.jpg',
      //   selectedIconPath: 'assets/images/icon5_active.jpg',
      //   text: '我的'
      // }
    ]
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    }
  }
})

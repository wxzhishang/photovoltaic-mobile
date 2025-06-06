// babel-preset-taro 更多选项和默认值：
// https://docs.taro.zone/docs/next/babel-config
export default {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true,
      compiler: 'webpack5',
      useBuiltIns: process.env.TARO_ENV === 'h5' ? 'usage' : false
    }]
  ]
}

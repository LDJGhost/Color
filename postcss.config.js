/**
 * PostCss 的配置文件
 * 注意 只有行内样式不会转化成rem ——padding
 */

module.exports = {
  plugins: {
    // 自动添加浏览器厂商声明前缀，用来兼容不同的浏览器
    autoprefixer: {
      // browsers: ['Android >= 4.0', 'ios >= 8']
    },
    // 把 px 转为 rem`
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}

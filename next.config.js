const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')

module.exports = withCSS(withLess({
  // css和less模块话导入默认是关闭的，需要手动开启
  cssModules:true
}))
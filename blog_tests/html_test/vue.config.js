const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  assetsDir: 'static',
  publicPath: '/',
  devServer: {
    port: 8006,
    // proxy: {
    //   '/': {
    //     target: 'http://localhost:8008',
    //     ws: false,
    //     changeOrigin: true
    //   }
    // }
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .uses.clear()
    config.module
      .rule('svg1')
      .test(/\.svg$/)
      .use('svg-sprite')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
      .include
      .add(resolve('src/icons'))
      .end()
  }
}
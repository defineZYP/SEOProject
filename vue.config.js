
const defaultSettings = require('./src/settings.js')

const name = defaultSettings.title || '快乐小虎鲸'

module.exports = {
  publicPath: '/',
  devServer: {
    host: 'localhost',
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:5000/api/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = name
        return args
      })
  },

  configureWebpack: {
    name: name
  }
}

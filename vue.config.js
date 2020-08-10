module.exports = {
  devServer: {
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://localhost:8443',   //代理接口
        //changeOrigin: true
      },
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}
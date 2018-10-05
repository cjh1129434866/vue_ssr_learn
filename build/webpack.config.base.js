const path = require('path')

const config = {
  target: 'web', // 目标网页
  mode: 'none',
  // 输入： 项目主文件（入口文件）
  entry: path.join(__dirname, '../client/index.js'), // 把当前文件的所在目录也就是根目录和 后面的‘../client/index.js’用join拼接起来
  output: {
    filename: 'build.[hash:8].js',
    path: path.join(__dirname, '../dist') // 输出路径
  },
  module: { // 配置加载资源
    rules: [ // 规则
      { 
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|gif|png|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024, // 文件小于1024字节，转换成base64编码。写入文件里
              name: 'resources/[path][name]-[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
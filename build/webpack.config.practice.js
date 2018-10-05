const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const baseConfig = require('./webpack.config.base')


const devServer = {
  port: 8088, // 端口设置
  host: '0.0.0.0', // 设置ip便于手机访问或其他电脑访问这个地址
  overlay: { // webpack编译出错则显示到网页上
    errors: true // 让报错信息可以在网页内看到，便于快速定位错误
  },
  historyApiFallback: true,
  hot: true // 热加载
}

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new htmlWebpackPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueLoaderPlugin()
]

let config

config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index'),
  devtool : '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          "stylus-loader"
        ]      
      }
    ]
  },
  devServer,
  resolve: {
    alias: { // 指定import 引入的vue de 位置，因为node_modules里面可以引入的vue有好几个版本;有runtime的vue不能在js里面插入template
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})
module.exports = config
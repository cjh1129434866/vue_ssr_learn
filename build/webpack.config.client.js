const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')

const baseConfig = require('./webpack.config.base')


const isDev = process.env.NODE_ENV === 'development'
const devServer = {
  port: 8089, // 端口设置
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
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new htmlWebpackPlugin(),
  new VueLoaderPlugin()
]

let config

if (isDev) {
  config = merge(baseConfig, {
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
    // for pratice
    // resolve: {
    //   alias: {
    //     'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    //   }
    // },
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            miniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new miniCssExtractPlugin({
        filename: '[name].[contenthash:8].css'
      })
    ]),
    optimization: {
      splitChunks: {
        cacheGroups: { // 这里开始设置缓存的chunks
          commons: {
            chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            minSize: 0, // 最小尺寸，默认0
            minChunks: 2, // 最小chunk， 默认1
            maxInitialRequests: 5 // 最大初始化请求输，默认1
          },
          vendor: {
            test: /node_modules/, // 正则规则验证，如果符合旧提取chunk
            chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            name: 'vendor', // 要缓存的 分割出来的 chunk 名称
            priority: 10, // 缓存组优先级
            enforce: true 
          }
        }
      },
      runtimeChunk: true
    }
  })
}

module.exports = config
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const isDev = process.env.NODE_ENV === 'development'
const htmlWebpackPlugin = require('html-webpack-plugin')
// const extractPlugin = require('extract-text-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const config = {
     target: 'web', // 目标网页
     mode: 'none',
     entry: path.join(__dirname, './src/index.js'), // 把当前文件的所在目录也就是根目录和 后面的‘src/index.js’用join拼接起来
     output: {
        filename: 'build.[hash:8].js',  // 输出的文件名
          path: path.join(__dirname, 'dist')
     },
     module: {
          rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 1024,
                            name: '[name]-output.[ext]'
                  }
                }
              ]
            }
          ]
     },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: isDev? '"development"': '"production"'
        }
      }),
      new htmlWebpackPlugin(),
      new VueLoaderPlugin()
    ]
}
if (isDev) {
  config.module.rules.push({
    test: /\.styl/,
    use: [
      "style-loader",
      "css-loader",
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      "stylus-loader"
    ]
  })
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8089, // 端口设置
    host: '0.0.0.0', // 设置ip便于手机访问或其他电脑访问这个地址
    overlay: {
      errors: true // 让报错信息可以在网页内看到，便于快速定位错误
    },
    hot: true // 热加载
  }
  config.plugins.push(  // push热加载模块
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  // 生产坏境的配置
  config.output.filename = '[name].[chunkhash:8].js'
  let extractLoader = {
    loader: miniCssExtractPlugin.loader,
    options: {}
  }
  config.module.rules.push(
    {
      test: /\.styl/,
      use: [
        extractLoader,
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
  )
  config.plugins.push(
    // 老师得代码里面写得是contentHash:8  但是我这里只能用chunkHash:8 不然报错
    new miniCssExtractPlugin({
      filename: "[name].[chunkhash:8].css"
    })
  )
  //将类库文件单独打包出来
  config.optimization = {
    splitChunks: {
      chunks: 'async',// 必须三选一： "initial" | "all" | "async"(默认就是异步)
      // 大于30KB才单独分离成chunk
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,// 最大初始化请求书，默认1
      name: true,
      cacheGroups: {//设置缓存的 chunks
        default: {
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          name: 'vendors',    // 要缓存的 分隔出来的 chunk 名称
          test: /[\\/]node_modules[\\/]/, //正则规则验证 符合就提取 chunk
          priority: -10,      // 缓存组优先级
          chunks: "all"       // 必须三选一： "initial" | "all" | "async"(默认就是异步)
        },

        echarts: {
          name: 'echarts',
          chunks: 'all',
          // 对echarts进行单独优化，优先级较高
          priority: 20,
          test: function(module){
            var context = module.context;
            return context && (context.indexOf('echarts') >= 0 || context.indexOf('zrender') >= 0)
          }
        }
      }
    }
    //单独打包 runtimeChunk
    ,runtimeChunk:{name: "manifest"}
    // 压缩代码
    ,minimizer: [
      // js mini
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      }),
      // css mini
      new OptimizeCSSPlugin({})
    ]
  }
}

module.exports = config
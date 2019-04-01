
本文分上、中、下三个部分(先写上篇)
- webpack历险记之一个简单的vue hellowrld  (上)
- vue项目搭建之vue全家桶和element ui、规范、单元测试等等。。。(中)
- vue项目优化之打包优化，页面加载优化等等。。。(下)

代码示例地址[https://github.com/zwfun/zw-vue-cli](https://github.com/zwfun/zw-vue-cli)

以下所有的知识都是从下面的参考文档学来的，如果看过好几遍的同学我这篇文章就不用看了，如果没看过的先去看几遍，看过了实在还是不会的同学再来看我这篇文章

本文不写具体的操作步骤, 只写这个过程中需要什么，具体怎么做 以参考文档的形式给出
网上很多文章一上来就介绍安装各种包，看完一遍之后还是一知半解，无从下手。
自己写一个文章，按自己需要的功能加载各种包。

#### 我要做什么
第一次配置webpack, 就从构建一个vue的helloworld项目开始。
我需要让webpack帮我打包vue项目

#### 1、需要webapck做什么

这时候是不是脑袋一片空白， 不知道从什么地方开始。 万事开头难，先从我需要webpack帮我做什么开始
- 首先当然是帮我打包vue文件
- 我们项目中会用到css,scss,js,img,字体文件，webpack是不是也能帮我们加载css并打包
- 我会使用es6语法，考虑到兼容性问题， webpack能不能帮我转成es5
- 开发时我需要在写代码的时候实时展示我的内容，需要热更新
- 构建整个项目

ps： 也就做5件事不多嘛

#### 2、怎么做
开始前先看看[webpack官方中文文档-指南](https://webpack.docschina.org/guides/)文档的概念和指南，也许[webpack官方文档-配置](https://webpack.docschina.org/configuration/)部分你也应该看下

看完之后应该对webpack有一定的了解了， 那咱们继续

- webpack安装和入口和出口配置
    这些直接忽略，不会的话看[官方文档的起步章节](https://webpack.docschina.org/guides/getting-started/)

- webpack帮我们打包vue文件
    - 参考[vue-loader官方文档-指北-如何冲v14迁移](https://vue-loader.vuejs.org/zh/)
    - 打包vue文件需要使用到vue-loader(Vue Loader 是一个 webpack 的 loader，它允许你以一种名为单文件组件 的格式撰写 Vue 组件)
    - 安装vue-loader [参考官方文档-手动设置](https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE)
        <pre>
            npm install -D vue-loader vue-template-compiler
        </pre>
    - vue-loader webpack配置 [参考官方文档-手动设置](https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE)
        <pre>
            // webpack.base.config.js
            const VueLoaderPlugin = require('vue-loader/lib/plugin')

            module.exports = {
            module: {
                rules: [
                // ... 其它规则
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                }
                ]
            },
            plugins: [
                // 请确保引入这个插件！
                new VueLoaderPlugin()
            ]
            }
        </pre>

- webpack帮我们打包css文件
    - 参考[webpack官方文档-指南-加载css](https://webpack.docschina.org/guides/asset-management/#%E5%8A%A0%E8%BD%BD-css)
    - 参考[vue-loader官方文档-使用预处理器](https://vue-loader.vuejs.org/zh/guide/pre-processors.html#sass)
    - 因为我会用到scss，以及在vue组件中使用css/scss，所以我需要使用一下三个loader帮我加载css。
        - 'vue-style-loader',
        - 'css-loader',
        - 'sass-loader'
    - 在正式环境下我需要webpack帮我把css提取出来，所以在正式环境中会[使用MiniCssExtractPlugin.loader](https://webpack.docschina.org/plugins/mini-css-extract-plugin)帮我提取css到单独的文件中
    <pre>
        // 正式环境配置
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: 'css/'
                        }
                    },
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: 'css/'
                        }
                    },
                    
                    'css-loader'
                ]
            },
        ]

        // 开发环境配置
        rules: [
            {
                test: /\.scss$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    </pre>
    
    
- 使用babel7帮我将es6转为es5
    - [babel官方文档](https://babel.docschina.org/docs/en/usage)
    - [babel在线试用](https://babeljs.io/repl)
    - [babel选择环境配置](https://babel.docschina.org/setup)
    - 使用配置文件的方式配置babel7. 新建一个.babelrc,@babel/env这个preset包括支持现代 JavaScript（ES2015，ES2016 等）的所有插件， @babel/plugin-transform-runtime帮我们动态转义内置函数(像 Array.from 或 Object.assign 这样的静态方法，像Array.prototype.includes 这样的实例方法)， 配置如下
    <pre>
        {
            "presets": [[
                "@babel/env",
                {
                "useBuiltIns": "entry"
                }
            ]],
            "plugins": ["@babel/plugin-transform-runtime"]
        }
    </pre>
    

- 加载字体和图片等
  - 参考[file-loader](https://webpack.docschina.org/loaders/file-loader/#src/components/Sidebar/Sidebar.jsx)
  - 字体和图片是使用file-loader加载。配置file-loader后我们能使用像import img from './file.png'这样的方式加载文件

    <pre>
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    </pre>
    

- 热更新
    - 参考[使用 webpack-dev-server](https://webpack.js.org/configuration/dev-server/)
    - 开发环境，使用webpack-dev-server本地服务器实现热加载，
    - webpack中配置，浏览器中输入0.0.0.0:8888即可打开项目。
      <pre> 
        devServer: {
            host: '0.0.0.0',
            historyApiFallback: true,
            port: 8888
        },
    </pre>
    - 在packge.json的script中配置"start": "node node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot --config build/webpack.local.config.js --progress --public --open"，这样我们使用webpack-dev-server加载项目，并实现热加载
    

- 构建整个项目
    - 参考[webpack官方文档-指南-管理输出](https://webpack.docschina.org/guides/output-management/)
    - 参考[设置-htmlwebpackplugin](https://webpack.docschina.org/guides/output-management/#%E8%AE%BE%E7%BD%AE-htmlwebpackplugin)
    - 参考[清理 /dist 文件夹](https://webpack.docschina.org/guides/output-management/#%E6%B8%85%E7%90%86-dist-%E6%96%87%E4%BB%B6%E5%A4%B9)
    - npm run build帮我们构建，那我们还需要点什么呢？ 
        - 每次打包时帮我们清空dist文件。使用(CleanWebpackPlugin)
        - 使用html模板自动将打包生成的js和css文件注入到html模板中,使用(HtmlWebpackPlugin)
        <pre>
            const CleanWebpackPlugin = require('clean-webpack-plugin');
            const HtmlWebpackPlugin = require('html-webpack-plugin');
            plugins: [
                new CleanWebpackPlugin(),
                new HtmlWebpackPlugin({
                    title: 'zw-vue-cli',
                    template: path.resolve(__dirname, '../', 'index.html')
                })
            ]
    </pre>

#### well done
一个基础的vue webpack配置就这样完成了

#### 参考文档

- [webpack官方中文文档-指北](https://webpack.docschina.org/guides/)
- [babel官方文档](https://babel.docschina.org/docs/en/usage)
- [vue-loader官方文档-指北-如何冲v14迁移](https://vue-loader.vuejs.org/zh/)
- [file-loader](https://webpack.docschina.org/loaders/file-loader/#src/components/Sidebar/Sidebar.jsx)
- [MiniCssExtractPlugin](https://webpack.docschina.org/plugins/mini-css-extract-plugin)
- [使用 webpack-dev-server](https://webpack.js.org/configuration/dev-server/)
- [设置-htmlwebpackplugin](https://webpack.docschina.org/guides/output-management/#%E8%AE%BE%E7%BD%AE-htmlwebpackplugin)
- [清理 /dist 文件夹](https://webpack.docschina.org/guides/output-management/#%E6%B8%85%E7%90%86-dist-%E6%96%87%E4%BB%B6%E5%A4%B9)
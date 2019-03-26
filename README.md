# 从零开始构建一个vue项目

本文不接受具体的步骤, 只写这个过程中需要什么，具体怎么做 以参考文档的形式给出
网上很多文章一上来就介绍安装各种包，看完一遍之后还是一知半解，无从下手。
自己写一个文章，按自己需要的功能加载各种包。

#### 我要做什么
- 使用webpack4构建一个vue项目
- 需要不同的开发环境(release, beta, dev)
- 使用ElementUi作为ui框架
- 使用vue全家桶(vue vuex vue-router axios)编写单页面应用程序
- 使用eslint，prettier， styleLint规范代码格式
- 使用cz-conventional-changelog规范commit msg
- 使用mocha做单元测试
- 后续的各种优化，不同环境下source-map开启和关闭；代码分离；相同模块的提取；模块动态加载；

#### 1、使用webpack构建一个vue的helloworld项目

<b>需要webapck做什么</b>
- 加载js
- 加载css
- 加载图像
- 加载字体
- 加载vue文件
- 热更新
- 打包

<b>怎么做</b>
- [webpack包的安装和基本配置](https://webpack.docschina.org/guides/getting-started/)
    - npm i webpack webpack-cli -D
    - 根目录创建index.js(项目的入口文件) 和 index.html(html模板)文件 
    - 根目录创建build文件夹和webapck.base.config.js文件(存放webpack配置)
    - 配置入口文件和输出文件
        <pre>
        module.exports = {
            entry: './src/index.js',
            output: {
                filename: 'main.js',
                path: path.resolve(__dirname, 'dist')
            }
        };
        </pre>
    - 加载js 使用bebal-loader加载js
    - 加载css 使用css-loader,style-loader加载css,  加载scss文件
        <pre>
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        },
        </pre>
    - 加载图片 使用file-loader，这样就能以相对路径的方式'./imge.png'加载图片
        <pre>
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        }
        </pre>
    - 加载字体 使用file-loader加载字体
        <pre>
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        }
        </pre>
    - 加载vue文件 使用vue-loader加载vue文件
    - 热更新 使用webpack-dev-server
    - 打包 先清空dist文件，使用index.html作为模板打包程序，

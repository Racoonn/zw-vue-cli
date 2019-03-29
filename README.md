# 从零开始构建一个vue项目第一弹之 --- webpack历险记

以下所有的知识都是从下面的参考文档学来的，如果看过好几遍的同学我这篇文章就不用看了，如果没看过的先去看几遍，看过了实在还是不会的同学再来看我这篇文章

本文不接受具体的步骤, 只写这个过程中需要什么，具体怎么做 以参考文档的形式给出
网上很多文章一上来就介绍安装各种包，看完一遍之后还是一知半解，无从下手。
自己写一个文章，按自己需要的功能加载各种包。

#### 我要做什么
第一次配置webpack, 就从构建一个vue的helloworld项目开始。
我需要让webpack帮我打包vue项目

#### 1、需要webapck做什么

这时候是不是脑袋一片空白， 不知道从什么地方开始。 完事开头难，先从我需要webpack帮我做什么开始
- 首先当然是帮我打包vue文件
- 我们项目中会用到css,scss,js,img,字体文件，webpack是不是也能帮我们加载css并打包
- 我会使用es6语法，考虑到兼容性问题， webpack能不能帮我转成es5
- 我需要在写代码的时候实时展示我的内容
- 构建整个项目
- .....好像没有了，或许还有许多，没关系继续往下走可能就会遇到更多要处理的事情

#### 2、怎么做
开始前先看看[webpack官方中文文档](https://webpack.docschina.org/guides/)文档的概念和指南，也许配置部分你也应该看下

看完之后应该对webpack有一定的了解了， 那咱们继续

- webpack安装和入口和出口配置
    这些直接忽略，不会的话看[官方文档的起步章节](https://webpack.docschina.org/guides/getting-started/)

- webpack帮我们打包vue文件
    - 参考[vue-loader官方文档-指北-如何冲v14迁移](https://vue-loader.vuejs.org/zh/)
    - 打包vue文件需要使用到vue-loader(Vue Loader 是一个 webpack 的 loader，它允许你以一种名为单文件组件 (SFCs)的格式撰写 Vue 组件)
    - 安装vue-loader [参考官方文档-手动设置](https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE)
        <pre>
            npm install -D vue-loader vue-template-compiler
        </pre>
    - webpack配置 [参考官方文档-手动设置](https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE)
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
        <pre>
            module: {
                rules: [
                    {
                        test: /\.css$/,
                        use: [
                        'style-loader',
                        'css-loader'
                        ]
                    }
                ]
            }
        </pre>
    - 我在vue项目中会用到scss, 需要webpack帮忙加载scss。参考[vue-loader官方文档-使用预处理器](https://vue-loader.vuejs.org/zh/guide/pre-processors.html#sass)
        <pre>
            module.exports = {
                module: {
                    rules: [
                    // ... 忽略其它规则

                    // 普通的 `.scss` 文件和 `*.vue` 文件中的
                    // `<style lang="scss">` 块都应用它
                    {
                        test: /\.scss$/,
                        use: [
                        'css-loader',
                        'sass-loader'
                        ]
                    }
                    ]
                },
                // 插件忽略
            }
        </pre>





#### 参考文档

- [webpack官方中文文档-指北](https://webpack.docschina.org/guides/)
- [bable官方文档](https://babel.docschina.org/docs/en/usage)
- [vue-loader官方文档-指北-如何冲v14迁移](https://vue-loader.vuejs.org/zh/)
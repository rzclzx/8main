const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
module.exports = {
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    // useBuiltIns: 'entry',
    outputDir: "dist",
    chainWebpack: () => {},
    // configureWebpack: configureWebpack,
    configureWebpack: config => {
        let plugins = [
        ]
        if (process.env.NODE_ENV === 'production' && process.env.outputDir === 'test') {
            plugins.push(
                new PrerenderSPAPlugin({
                    staticDir: path.join(__dirname, './dist'),
                    routes: ['/'],
                    minify: {
                        minifyCSS: true,
                        removeComments: true,
                        minifyJS: true,
                        minifyURLs: true
                    },
                    renderer: new Renderer({
                        inject: {
                            foo: 'bar'
                        },
                        // renderAfterDocumentEvent: 'render-event',
                        // 触发渲染的元素，该元素生成后就保存渲染结果 
                        renderAfterElementExists: '#app',
                        // 是否打开浏览器，false 是打开。可用于 debug 检查渲染结果
                        headless: true,
                        renderAfterTime: 5000
                    })
                })
            )
            config.plugins = [...config.plugins, ...plugins]
        } else if (process.env.NODE_ENV === 'production' && process.env.outputDir !== 'test') {
            plugins.push(
                new PrerenderSPAPlugin({
                    staticDir: path.join(__dirname, './dist'),
                    routes: ['/'],
                    minify: {
                        minifyCSS: true,
                        removeComments: true,
                        minifyJS: true,
                        minifyURLs: true
                    },
                    renderer: new Renderer({
                        inject: {
                            foo: 'bar'
                        },
                        // renderAfterDocumentEvent: 'render-event',
                        // 触发渲染的元素，该元素生成后就保存渲染结果 
                        renderAfterElementExists: '#app',
                        // 是否打开浏览器，false 是打开。可用于 debug 检查渲染结果
                        headless: true,
                        renderAfterTime: 5000
                    }),
                    postProcessHtml: function (context) {
                        return context.html.replace(
                        /"\/((css)|(js)|(img))\//g,
                        function (str) {
                            return '"' + 'https://img.58jdd.com/' + str.slice(2)
                        }
                        )
                    }
                })
            )
            config.plugins = [...config.plugins, ...plugins]
        }
    },
    productionSourceMap: false,
    devServer: {
        host: '0.0.0.0',
        port: 8084,
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
        overlay: {
            warnings: false,
            errors: true
        }
    },
    // 第三方插件配置
    pluginOptions: {
        foo: {
            // 插件可以作为 `options.pluginOptions.foo` 访问这些选项。
        }
    }
}
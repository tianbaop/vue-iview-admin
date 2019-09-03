const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: '/', //根路径
    outputDir: 'dist', //打包的时候生成的一个文件名
    assetsDir: 'assets', //静态资源目录(js,css,img,fonts)这些文件都可以写里面
    devServer: {
        hot: true,
        open: false, //启动项目后自动开启浏览器
        host: '0.0.0.0', //对应的主机名
        port: 9018, //端口号
        https: false, //是否开启协议名,如果开启会发出警告
        hotOnly: true //热模块更新的一种东西,webpack中自动有过配置,但如果我们下载一些新的模块可以更好的给我更新一些配置
    },
    // // webpack 配置进行更细粒度的修改  https://cli.vuejs.org/zh/config/#chainwebpack
    chainWebpack: (config) => {
    //修改文件引入自定义路径
        config.resolve.alias
            .set('@', resolve('src'))
            .set('style', resolve('src/assets/style'))
        config.resolve.symlinks(true);
    },
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 是否使用包含运行时编译器的Vue核心的构建
    runtimeCompiler: false,

    // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
    transpileDependencies: [],
    // 第三方插件配置
    pluginOptions: {
        'style-resources-loader': { //配置less全局样式
            preProcessor: 'less',
            patterns: ['src/assets/style/common.less']
        }
    }
}
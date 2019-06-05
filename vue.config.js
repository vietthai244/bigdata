module.exports = {
    lintOnSave: false,
    productionSourceMap: false,

    devServer: {
        disableHostCheck: true, //忽略host检查
        port: 3000,
        proxy: {
            '/api': {
                context: () => true,
                target: 'http://172.20.101.137:8080',
                pathRewrite: {'^/api': ''},
            },
        }
    },

    pluginOptions: {
        quasar: {
            theme: 'mat',
            rtlSupport: true,
            importAll: true
        }
    },

    transpileDependencies: [
        /[\\\/]node_modules[\\\/]quasar-framework[\\\/]/,
        'vue-echarts',
        'resize-detector'
    ],
};

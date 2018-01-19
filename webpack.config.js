const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

var root = path.resolve(__dirname);
var entry = path.resolve(root, 'js/module');
var build = path.resolve(root, 'build');
var isProduction = function () {
    return process.env.NODE_ENV === 'production';
};
var config = {
    entry: {                            //页面中的入口文件
    },
    output: {                           //页面通过webpack打包后生成的目标文件存放地址
        path: build,
        filename: "js/[name]"
    },
    resolve: {                          //定义了解析模块路径时的配置，常用的就是extensions; 可以用来指定模块的后缀，这样在引入模块时就不需要写后缀，会自动补全
        "modulesDirectories": [
            "node_modules"
        ],
        "extensions": [
            "",
            ".web.tsx",
            ".web.ts",
            ".web.jsx",
            ".web.js",
            ".ts",
            ".tsx",
            ".js",
            ".jsx",
            ".json"
        ],
        // 提高webpack搜索的速度
        alias: {}
    },
    module: {
        // 使用module.noParse针对单独的react.min.js这类没有依赖的模块，速度会更快
        //      noParse: [
        //     path.resolve(node_modules, 'react/dist/react.min.js'),
        //     path.resolve(node_modules, 'react-dom/dist/react-dom..min.js')
        //   ],
        loaders: [  // 文件的加载器
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                include: root,
                exclude: /node_modules/,
                query: {
                    presets: [
                        'es2015', 'react', 'stage-0'
                    ],
                    plugins: [
                        'transform-runtime',
                        [
                            "import",
                            {
                                "libraryName": "antd",
                                "style": "css"
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.tsx?$/,
                loaders: [
                    'babel',
                    'ts'
                ]
            },
            // {
            //     test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            //     loader: 'url?limit=10000&minetype=application/font-woff'
            // },
            // {
            //     test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            //     loader: 'url?limit=10000&minetype=application/font-woff'
            // },
            // {
            //     test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            //     loader: 'url?limit=10000&minetype=application/octet-stream'
            // },
            // {
            //     test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            //     loader: 'file'
            // },
            // {
            //     test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            //     loader: 'url?limit=10000&minetype=image/svg+xml'
            // },
            // {
            //     test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
            //     loader: 'url?limit=10000'
            // },
            {
                test: /\.(gif|jpg|jpeg|png|woff|woff2|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.html?$/,
                loader: 'file?name=[name].[ext]'
            },
            {
                test: /\.css/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    },
    plugins: [                                              //定义了需要使用的插件，比如commonsPlugin在打包多个入口文件时会提取公用的部分，生成common.js
        //new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.optimize.CommonsChunkPlugin({ name: 'common.js', minChunks: 2 }),
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
    }
};

// 匹配入口文件
var filepath;
var newentry = entry.replace(/\\/g, '/');
const files = glob.sync(entry + '/**/*Entry.js');
for (i = 0; i < files.length; i++) {
    filepath = files[i].replace(newentry, '');
    config.entry[filepath] = files[i];
}
if (isProduction()) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        })
    );
}
module.exports = config;
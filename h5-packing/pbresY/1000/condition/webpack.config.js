/**
 * Created by xiajing on 2017/2/16.
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = {
    entry:{
        main: './src/index.js',
        sl:'./src/slIndex.js',
        common:['vue','vue-router']
        //第三方插件单独打包
    },
    output:{
        path: path.join(__dirname,'./'),
        publicPath: '',
        filename:'js/[name].js',
        chunkFilename: "js/[id].chunk.js"
    },
    module:{
        loaders:[
            {test: /\.js[x]?$/,exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,loader: 'babel'},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.(jpg|png|gif)$/,loader: 'file?limit=25000&name=images/[hash].[ext]'},
            //{test: /\.woff[2]?$/, loader: "url?limit=10000&minetype=application/font-woff&name=fonts/[hash].[ext]"},//url-loader
            //{test: /\.ttf$/, loader: "url?limit=10000&name=fonts/[hash].[ext]"},
            //{test: /\.eot$/, loader: "url?limit=10000&name=fonts/[hash].[ext]"},
            //{test: /\.svg$/, loader: "url?limit=10000&name=fonts/[hash].[ext]"},
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.html$/, loader: "html?minimize=false" }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    plugins:[
        new ExtractTextPlugin("css/[name].css"),
        //new webpack.optimize.UglifyJsPlugin({	//压缩代码
        //    compress: {
        //        warnings: false
        //    },
        //    except: ['$super', '$', 'exports', 'require']	//排除关键字
        //}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')  //生产环境
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('common', 'js/common.js'),
    ]
}
module.exports = config;
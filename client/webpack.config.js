var webpack = require('webpack');

module.exports = {
    entry : './src/main.js',
    output : {
        filename : 'public/bundle.js'
    },
    module:{
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }            
        ]

    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    devServer: {
        host: 'localhost',
        port: 8088,
        proxy: [{
            path: '/api/*',
            target: 'http://localhost:3000'
        }],
    }
};
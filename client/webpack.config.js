var webpack = require('webpack');

module.exports = {
    entry : './client/main.js',
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
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            sourcemap: false,
            compress: { warnings: false }
        })
      ],
    devServer: {
        host: 'localhost',
        port: 8088
    }
};
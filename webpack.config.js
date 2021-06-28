const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');

module.exports = function (env, argv) {
    const isProduction = argv.mode === 'production';
    const entry = {main: path.resolve(__dirname, 'src', 'index.tsx')};
    if (!isProduction) {
        entry.mockServiceWorker = isProduction ? undefined : path.resolve(__dirname, 'src', 'mockServiceWorker.js');
    }
    return {
        devtool: isProduction ? false : 'source-map',
        entry: entry,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction ? '[name].[contenthash].js' : '[name].js',
            sourceMapFilename: '[file].map'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            plugins: [
                new TsconfigPathsPlugin({
                    configFile: path.resolve(__dirname, 'tsconfig.app.json')
                })
            ]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: path.resolve(__dirname, 'tsconfig.app.json')
                            }
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
                filename: 'index.html'
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {from: path.resolve(__dirname, 'src', 'assets'), to: 'assets'}
                ]
            })
        ],
        devServer: {
            port: 8080,
            historyApiFallback: true,

        }
    }
}
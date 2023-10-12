
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        "app" : path.resolve(__dirname, './src/app.js'),
        "interet" : path.resolve(__dirname, './src/interet.js'),
        "locate" : path.resolve(__dirname, './src/locate.js')
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ]
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].main.js',
    },
    devServer: {
        static: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/template/index.html"),
            filename: "index.html",
            chunks: ["app"]
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/template/interet.html"),
            filename: "interet.html",
            chunks: ["interet"]
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/template/interetgeo.html"),
            filename: "interetgeo.html",
            chunks: ["locate"]
        })
    ]

};
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
//const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './src/frontend/bootstrap.js',
    output: {
        path: __dirname + '/dist/frontend',
        filename: 'bundle.js'
    },
    //webpack does not avoid this object key
    //postcss: [autoprefixer],
    module: {
      loaders: [
        // load and compile javascript
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },

        { test: /\.json$/, loader: "json-loader" },
        { test: /\.css$/, loader: "css-loader" },
        { test: /\.html$/, exclude: /node_modules/, loader: "raw-loader" },

        { test: /\.scss$/, loaders: ['style', 'css', /*'postcss',*/ 'sass'] },
        { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
        // Bootstrap 4
        { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' }

      ]
    },

    // inject js reference bundle to index.html
    plugins: [
      new LiveReloadPlugin(),
      new HtmlWebpackPlugin({
        template: './src/frontend/index.html',
        inject: true,
        minify: false
      }),
      new CopyWebpackPlugin([{
        from: 'src/frontend/assets',
        to: 'assets'
      }])
    ],

    devtool: '#inline-source-map'
}

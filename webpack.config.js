require('dotenv').config();
const EnvironmentPlugin = require('webpack').EnvironmentPlugin;
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const deps = require('./package.json').dependencies;

module.exports = (env) => {
  return {
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.scss'],
    },

    devServer: {
      port: 4001,
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.module\.s(a|c)ss$/,
          use: [
            env.development ? 'style-loader' : MiniCssExtractPlugin.loader, // append to dom : externalize css
            {
              loader: 'css-loader', // process @import, url()
              options: {
                modules: true,
                sourceMap: env.development,
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader', // scss to css
              options: {
                sourceMap: env.development,
              },
            },
          ],
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module.(s(a|c)ss)$/,
          use: [
            env.development ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: env.development,
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: 'dashboard',
        filename: 'dashboard-remoteEntry.js',
        remotes: {
          search: process.env.SEARCH_PATH,
          kc_components: process.env.COMPONENTS_PATH,
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom'],
          },
        },
      }),
      new MiniCssExtractPlugin({
        filename: env.development ? '[name].css' : '[name].[hash].css',
        chunkFilename: env.development ? '[id].css' : '[id].[hash].css',
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
        excludeChunks: ['dashboard'],
      }),
      new EnvironmentPlugin(['COMPONENTS_PATH', 'SEARCH_PATH']),
    ],
  };
};

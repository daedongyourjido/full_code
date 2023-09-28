const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

dotenv.config();
console.log(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build"),
    publicPath: '/',
  },
  devServer: {
    open: true,
    port: 9000,
    historyApiFallback: true
  },
  mode: "development",
  plugins: [
    new HtmlWebPackPlugin({
			template: './public/index.html', 
      filename: './index.html',
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY': JSON.stringify(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env", ["@babel/preset-react", {"runtime": "automatic"}]
            ]
          }
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src/'),
      "@styles": path.resolve(__dirname, './src/styles/'),
      "@views": path.resolve(__dirname, './src/views/'),
      "@modules": path.resolve(__dirname, './src/modules/'),
      "@assets": path.resolve(__dirname, './src/assets/'),
      "@redux": path.resolve(__dirname, './src/redux/'),
    },
    extensions: [".js"]
  },
  target: "web", // 웹 브라우저 환경으로 설정
  externals: {
    fs: "empty", // fs 모듈을 비워버립니다.
    child_process: "empty", // child_process 모듈을 비워버립니다.
  },
};
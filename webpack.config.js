const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.jsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    // 확장자를 순서대로 해석
    extensions: [".js", ".jsx"],
  },
  // bundle.js 파일을 import는 하는 html 파일을 만들어주는 플러그인
  // template html 파일을 지정할 수 있음
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
    ],
  },
};

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 2222,
  },
  module: {
    rules: [
      {
        test: /\.bundle\.ts$/,
        use: {
          loader: "bundle-loader",
          options: {
            name: "[name]",
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|png|gif|jpg)$/,
        exclude: /fonts/,
        loader: "file-loader",
      },
      {
        test: /\.(ttf|eot|woff|svg|woff2)$/,
        loader: "file-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};

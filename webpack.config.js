import path from "path";
import dotenv from "dotenv";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createRequire } from "module";

const { ModuleFederationPlugin } = webpack.container;
const { DefinePlugin } = webpack;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const deps = require("./package.json");

export default (env) => {
  const environment = env?.ENV || "local";
  dotenv.config({ path: path.resolve(__dirname, `.env.${environment}`) });
  console.log(`🏗️ Building Remote1 for ENV: ${process.env.ENV_NAME}`);

  return {
    entry: path.resolve(__dirname, "src/index.js"),
    mode: process.env.NODE_ENV || "development",
    devServer: {
      port: 3001,
      historyApiFallback: true,
      static: { directory: path.resolve(__dirname, "dist") },
    },

    output: { publicPath: "auto", clean: true },
    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, use: "babel-loader" },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: { extensions: [".js", ".jsx"] },
    plugins: [
      new ModuleFederationPlugin({
        name: "remote1",
        filename: "remoteEntry.js",
        exposes: { "./UserButton": "./src/components/UserButton" },
        shared: {
          react: { singleton: true, requiredVersion: deps.react },
          "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
        },
      }),
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
      new DefinePlugin({
        "process.env.ENV_NAME": JSON.stringify(process.env.ENV_NAME),
      }),
    ],
  };
};

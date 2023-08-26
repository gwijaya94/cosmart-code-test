/** @type {import('@babel/core').TransformOptions['plugins']} */
const plugins = [
  [
    "babel-plugin-root-import",
    {
      root: __dirname,
      rootPathPrefix: "~/",
      // mapping ~/ to the ./app directory (again, your app structure may differ here)
      rootPathSuffix: "app",
    },
  ],
  /** react-native-reanimated web support @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#web */
  "@babel/plugin-proposal-export-namespace-from",
  /** NOTE: This must be last in the plugins @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#babel-plugin */
  "react-native-reanimated/plugin",
  [
    "module-resolver",
    {
      root: ["./app"],
      extensions: [".ios.js", ".android.js", ".js", ".jsx", ".ts", ".tsx", ".json"],
      alias: {
        "~": "./app",
      },
    },
  ],
]

/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: ["babel-preset-expo"],
  env: {
    production: {},
  },
  plugins,
}

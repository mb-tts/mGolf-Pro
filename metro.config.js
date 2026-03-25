// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// 👇 Thêm config cho SVG
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

config.resolver = {
  ...config.resolver,
  // loại bỏ svg khỏi assetExts
  assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
  // thêm svg vào sourceExts
  sourceExts: [...config.resolver.sourceExts, "svg"],
};

module.exports = config;

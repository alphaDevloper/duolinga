const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = withNativewind(config, {
  // Disable inline variables so CSS variable references (PlatformColor) work correctly.
  inlineVariables: false,
  // We add className support manually via react-native-css wrappers.
  globalClassNamePolyfill: false,
});

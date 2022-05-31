module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
  ],
  setupFiles: [
    "./jest-setup.js",
    "./node_modules/react-native-gesture-handler/jestSetup.js"
  ],
  setupFilesAfterEnv: [
    "./setupFiles.ts"
  ]
}
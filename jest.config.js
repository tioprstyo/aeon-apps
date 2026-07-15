// Pin the timezone so local-time date formatting is deterministic across
// machines/CI. Set before workers spawn so they inherit it.
process.env.TZ = 'Asia/Jakarta';

module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|react-native-screens|react-native-safe-area-context|@react-native-clipboard|react-native-svg)/)',
  ],
};

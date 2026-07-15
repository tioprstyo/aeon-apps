module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
        },
        extensions: ['.ios.tsx', '.android.tsx', '.tsx', '.ios.ts', '.android.ts', '.ts', '.js', '.json'],
      },
    ],
  ],
};

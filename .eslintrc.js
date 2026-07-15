module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx', 'jest.setup.js', 'jest.config.js'],
      env: { jest: true, node: true },
    },
  ],
};

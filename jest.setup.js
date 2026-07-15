// Provide static safe-area insets/components so anything using
// useSafeAreaInsets or SafeAreaView (e.g. the custom tab bar) renders
// deterministically under Jest.
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  const insets = { top: 0, right: 0, bottom: 0, left: 0 };
  const frame = { x: 0, y: 0, width: 320, height: 640 };
  return {
    __esModule: true,
    SafeAreaProvider: ({ children }) => React.createElement(View, null, children),
    SafeAreaView: ({ children, ...props }) => React.createElement(View, props, children),
    SafeAreaInsetsContext: React.createContext(insets),
    useSafeAreaInsets: () => insets,
    useSafeAreaFrame: () => frame,
    initialWindowMetrics: { insets, frame },
  };
});

// Mock the native clipboard module so components importing it can render
// under Jest (no native runtime available).
jest.mock('@react-native-clipboard/clipboard', () => ({
  __esModule: true,
  default: {
    setString: jest.fn(),
    getString: jest.fn(() => Promise.resolve('')),
  },
}));

// Mock the native blur view (liquid-glass tab bar background) as a plain View.
jest.mock('@react-native-community/blur', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    BlurView: (props) => React.createElement(View, props, props.children),
  };
});

// Mock lucide icons: any imported icon renders as a lightweight element so we
// don't pull react-native-svg into the Jest environment.
jest.mock('lucide-react-native', () => {
  const React = require('react');
  const Icon = (props) => React.createElement('Icon', props, null);
  return new Proxy(
    { __esModule: true },
    { get: (_target, prop) => (prop === '__esModule' ? true : Icon) },
  );
});

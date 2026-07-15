import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '@/theme';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const OPEN_DURATION = 300;
const CLOSE_DURATION = 300;

/**
 * Lightweight animated bottom sheet: a fading backdrop plus a panel that
 * slides up from the bottom. Built on RN's Modal + Animated (no extra deps).
 */
export function BottomSheet({ visible, onClose, children }: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  const [rendered, setRendered] = useState(visible);
  const [sheetHeight, setSheetHeight] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setRendered(true);
      Animated.timing(progress, {
        toValue: 1,
        duration: OPEN_DURATION,
        useNativeDriver: true,
      }).start();
    } else if (rendered) {
      Animated.timing(progress, {
        toValue: 0,
        duration: CLOSE_DURATION,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setRendered(false);
        }
      });
    }
  }, [visible, rendered, progress]);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [sheetHeight || 400, 0],
  });

  return (
    <Modal
      visible={rendered}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.root}>
        <Animated.View style={[styles.backdrop, { opacity: progress }]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            accessibilityLabel="Close"
            onPress={onClose}
          />
        </Animated.View>

        <Animated.View
          onLayout={e => setSheetHeight(e.nativeEvent.layout.height)}
          style={[
            styles.sheet,
            {
              paddingBottom:
                insets.bottom +
                (Platform.OS === 'android' && Platform.Version <= 34
                  ? spacing.lg
                  : 0),
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.draggableArea}>
            <View style={styles.handle} />
          </View>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: spacing.lg,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  draggableArea: {
    paddingTop: spacing.sm,
  },
});

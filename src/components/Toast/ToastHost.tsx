import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Check } from 'lucide-react-native';
import { colors, radius, spacing, typography } from '@/theme';
import { useToastStore } from './useToastStore';

const ANIM_MS = 180;

/**
 * App-wide toast overlay. Mount once near the root; trigger it via
 * `showToast()` or the `useToastStore`. A single host keeps the animation and
 * safe-area handling in one place and works identically on iOS and Android.
 */
export function ToastHost() {
  const message = useToastStore(s => s.message);
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;
  // Keep the last message mounted through the fade-out animation.
  const [rendered, setRendered] = useState<string | null>(null);

  useEffect(() => {
    if (message) {
      setRendered(message);
      Animated.timing(opacity, {
        toValue: 1,
        duration: ANIM_MS,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: ANIM_MS,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setRendered(null);
        }
      });
    }
  }, [message, opacity]);

  if (!rendered) {
    return null;
  }

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        {
          bottom: insets.bottom + spacing.xxl * 2,
          opacity,
          transform: [
            {
              translateY: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Animated.View style={styles.toast}>
        <Check size={16} color={colors.incoming} strokeWidth={3} />
        <Text style={styles.text}>{rendered}</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    maxWidth: '100%',
    backgroundColor: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.pill,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  text: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.textInverse,
    flexShrink: 1,
  },
});

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { colors, spacing, typography } from '@/theme';

interface CopyButtonProps {
  value: string;
  /** Accessible description of what is being copied, e.g. "reference ID". */
  label: string;
}

const RESET_DELAY_MS = 1500;

/** Copies `value` to the clipboard and briefly confirms with a "Copied" label. */
export function CopyButton({ value, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    },
    [],
  );

  const onPress = useCallback(() => {
    Clipboard.setString(value);
    setCopied(true);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => setCopied(false), RESET_DELAY_MS);
  }, [value]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Copy ${label}`}
      hitSlop={spacing.sm}
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
      {copied ? (
        <Text style={styles.copied}>Copied</Text>
      ) : (
        <View style={styles.icon}>
          <View style={styles.iconBack} />
          <View style={styles.iconFront} />
        </View>
      )}
    </Pressable>
  );
}

const ICON = 20;
const SQUARE = 13;

const styles = StyleSheet.create({
  container: { padding: spacing.xs },
  pressed: { opacity: 0.6 },
  copied: { ...typography.caption, fontWeight: '700', color: colors.incoming },
  icon: { width: ICON, height: ICON },
  iconBack: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: SQUARE,
    height: SQUARE,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  iconFront: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: SQUARE,
    height: SQUARE,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
});

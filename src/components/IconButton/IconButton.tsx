import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius } from '@/theme';

interface IconButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  accessibilityLabel: string;
  /** Highlights the button with the brand tint (e.g. an active filter). */
  active?: boolean;
  style?: ViewStyle;
}

/** Circular, bordered icon button used for header actions. */
export function IconButton({
  children,
  onPress,
  accessibilityLabel,
  active = false,
  style,
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        active ? styles.active : styles.inactive,
        pressed && styles.pressed,
        style,
      ]}>
      {children}
    </Pressable>
  );
}

const SIZE = 44;

const styles = StyleSheet.create({
  base: {
    width: SIZE,
    height: SIZE,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  inactive: { backgroundColor: colors.surface, borderColor: colors.border },
  active: { backgroundColor: colors.primaryLight, borderColor: colors.primaryLight },
  pressed: { opacity: 0.7 },
});

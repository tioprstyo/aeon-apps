import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radius, spacing, typography } from '@/theme';
import { getDirection } from '../types';

interface DirectionBadgeProps {
  amount: number;
  style?: ViewStyle;
}

/** Pill indicating whether money is coming in (↓) or going out (↑). */
export function DirectionBadge({ amount, style }: DirectionBadgeProps) {
  const isOutgoing = getDirection(amount) === 'outgoing';

  const surface = isOutgoing ? colors.outgoingSurface : colors.incomingSurface;
  const tint = isOutgoing ? colors.outgoing : colors.incoming;
  const label = isOutgoing ? 'Outgoing' : 'Incoming';
  const arrow = isOutgoing ? '↑' : '↓';

  return (
    <View style={[styles.badge, { backgroundColor: surface }, style]}>
      <Text style={[styles.text, { color: tint }]}>
        {arrow} {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  text: { ...typography.caption, fontWeight: '700' },
});

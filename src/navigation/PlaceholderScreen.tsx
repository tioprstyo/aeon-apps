import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Construction } from 'lucide-react-native';
import { Screen } from '@/components';
import { colors, spacing, typography } from '@/theme';

/**
 * Stand-in for tabs outside the assessment scope (Home, Accounts, …). Keeps the
 * bottom-tab navigation complete without pretending to implement those areas.
 */
export function PlaceholderScreen({ title }: { title: string }) {
  return (
    <Screen edges={['top', 'bottom']}>
      <View style={styles.centered}>
        <View style={styles.iconCircle}>
          <Construction size={28} color={colors.primary} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>
          Your <Text style={styles.bodyBold}>{title}</Text> will appear here
          once this feature becomes available.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    marginBottom: spacing.sm,
  },
  title: { ...typography.h2, color: colors.text },
  body: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  bodyBold: {
    fontWeight: '700',
    color: '#111827',
  },
});

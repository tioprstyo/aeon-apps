import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Construction } from 'lucide-react-native';
import { Screen } from '@/components';
import { colors, spacing, typography } from '@/theme';
import { TranslationKey, useTranslation } from '@/i18n';

/**
 * Stand-in for tabs outside the assessment scope (Home, Accounts, …). Keeps the
 * bottom-tab navigation complete without pretending to implement those areas.
 */
export function PlaceholderScreen({ titleKey }: { titleKey: TranslationKey }) {
  const { t } = useTranslation();
  const title = t(titleKey);

  return (
    <Screen edges={['top', 'bottom']}>
      <View style={styles.centered}>
        <View style={styles.iconCircle}>
          <Construction size={28} color={colors.primary} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{t('placeholder.body', { title })}</Text>
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
});

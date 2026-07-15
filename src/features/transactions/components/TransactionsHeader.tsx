import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { IconButton, LanguageToggle } from '@/components';
import { colors, spacing, typography } from '@/theme';
import { useTranslation } from '@/i18n';

interface TransactionsHeaderProps {
  searchActive: boolean;
  filtersActive: boolean;
  onToggleSearch: () => void;
  onToggleFilters: () => void;
}

export function TransactionsHeader({
  searchActive,
  filtersActive,
  onToggleSearch,
  onToggleFilters,
}: TransactionsHeaderProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.title} numberOfLines={1}>
          {t('transactions.title')}
        </Text>
        <View style={styles.actions}>
          <LanguageToggle />
          <IconButton
            accessibilityLabel={t('transactions.toggleSearch')}
            active={searchActive}
            onPress={onToggleSearch}
          >
            <Search
              size={20}
              color={searchActive ? colors.primary : colors.text}
            />
          </IconButton>
          <IconButton
            accessibilityLabel={t('transactions.toggleFilters')}
            active={filtersActive}
            onPress={onToggleFilters}
          >
            <SlidersHorizontal
              size={20}
              color={filtersActive ? colors.primary : colors.text}
            />
          </IconButton>
        </View>
      </View>
      <Text style={styles.subtitle}>{t('transactions.subtitle')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.xs },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  title: { fontSize: 26, fontWeight: '800', color: colors.text, flexShrink: 1 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  subtitle: { ...typography.body, color: colors.textSecondary },
});

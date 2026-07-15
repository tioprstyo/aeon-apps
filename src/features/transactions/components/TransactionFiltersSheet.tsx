import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Chip } from '@/components';
import { colors, radius, spacing, typography } from '@/theme';
import { TranslationKey, useTranslation } from '@/i18n';
import type { DateRange, SortOrder } from '../utils/filter';

interface TransactionFiltersSheetProps {
  dateRange: DateRange;
  onDateRangeChange: (value: DateRange) => void;
  sort: SortOrder;
  onSortChange: (value: SortOrder) => void;
  /** Raw text for the lower amount bound (empty string = no bound). */
  minAmount: string;
  onMinAmountChange: (value: string) => void;
  /** Raw text for the upper amount bound (empty string = no bound). */
  maxAmount: string;
  onMaxAmountChange: (value: string) => void;
  onReset: () => void;
  onApply: () => void;
}

/** Keep only digits and a single decimal point so the value parses cleanly. */
function sanitizeAmount(value: string): string {
  const cleaned = value.replace(/[^0-9.]/g, '');
  const [whole, ...rest] = cleaned.split('.');
  return rest.length > 0 ? `${whole}.${rest.join('')}` : whole;
}

const DATE_OPTIONS: { labelKey: TranslationKey; value: DateRange }[] = [
  { labelKey: 'filters.date.all', value: 'all' },
  { labelKey: 'filters.date.1week', value: '1week' },
  { labelKey: 'filters.date.1month', value: '1month' },
  { labelKey: 'filters.date.3month', value: '3month' },
];

const SORT_OPTIONS: { labelKey: TranslationKey; value: SortOrder }[] = [
  { labelKey: 'filters.sort.newest', value: 'newest' },
  { labelKey: 'filters.sort.oldest', value: 'oldest' },
];

export function TransactionFiltersSheet({
  dateRange,
  onDateRangeChange,
  sort,
  onSortChange,
  minAmount,
  onMinAmountChange,
  maxAmount,
  onMaxAmountChange,
  onReset,
  onApply,
}: TransactionFiltersSheetProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('filters.title')}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={onReset}
          hitSlop={spacing.sm}
        >
          <Text style={styles.reset}>{t('filters.reset')}</Text>
        </Pressable>
      </View>

      <Text style={styles.section}>{t('filters.dateRange')}</Text>
      <View style={styles.chips}>
        {DATE_OPTIONS.map(option => (
          <Chip
            key={option.value}
            label={t(option.labelKey)}
            selected={dateRange === option.value}
            onPress={() => onDateRangeChange(option.value)}
          />
        ))}
      </View>

      <Text style={styles.section}>{t('filters.amountRange')}</Text>
      <View style={styles.amountRow}>
        <TextInput
          style={styles.amountInput}
          placeholder={t('filters.minAmount')}
          placeholderTextColor={colors.textMuted}
          keyboardType="decimal-pad"
          inputMode="decimal"
          value={minAmount}
          onChangeText={value => onMinAmountChange(sanitizeAmount(value))}
        />
        <Text style={styles.amountSeparator}>–</Text>
        <TextInput
          style={styles.amountInput}
          placeholder={t('filters.maxAmount')}
          placeholderTextColor={colors.textMuted}
          keyboardType="decimal-pad"
          inputMode="decimal"
          value={maxAmount}
          onChangeText={value => onMaxAmountChange(sanitizeAmount(value))}
        />
      </View>

      <Text style={styles.section}>{t('filters.sortBy')}</Text>
      <View style={styles.chips}>
        {SORT_OPTIONS.map(option => (
          <Chip
            key={option.value}
            label={t(option.labelKey)}
            selected={sort === option.value}
            onPress={() => onSortChange(option.value)}
          />
        ))}
      </View>

      <Button
        label={t('filters.apply')}
        onPress={onApply}
        style={styles.apply}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.md },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { ...typography.h2, color: colors.text },
  reset: { ...typography.body, fontWeight: '600', color: colors.primary },
  section: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  amountRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  amountInput: {
    flex: 1,
    minHeight: 48,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    color: colors.text,
    ...typography.body,
  },
  amountSeparator: { ...typography.body, color: colors.textMuted },
  apply: { marginTop: spacing.sm },
});

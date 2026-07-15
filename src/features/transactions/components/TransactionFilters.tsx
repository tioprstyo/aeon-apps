import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Chip } from '@/components';
import { colors, radius, spacing, typography } from '@/theme';
import type { DateRange, TypeFilter } from '../utils/filter';

interface TransactionFiltersProps {
  query: string;
  onQueryChange: (value: string) => void;
  type: TypeFilter;
  onTypeChange: (value: TypeFilter) => void;
  dateRange: DateRange;
  onDateRangeChange: (value: DateRange) => void;
  /** Raw text for the lower amount bound (empty string = no bound). */
  minAmount: string;
  onMinAmountChange: (value: string) => void;
  /** Raw text for the upper amount bound (empty string = no bound). */
  maxAmount: string;
  onMaxAmountChange: (value: string) => void;
}

const TYPE_OPTIONS: { label: string; value: TypeFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Incoming', value: 'incoming' },
  { label: 'Outgoing', value: 'outgoing' },
];

const DATE_OPTIONS: { label: string; value: DateRange }[] = [
  { label: 'All Dates', value: 'all' },
  { label: '1 Week', value: '1week' },
  { label: '1 Month', value: '1month' },
];

/** Keep only digits and a single decimal point so the value parses cleanly. */
function sanitizeAmount(value: string): string {
  const cleaned = value.replace(/[^0-9.]/g, '');
  const [whole, ...rest] = cleaned.split('.');
  return rest.length > 0 ? `${whole}.${rest.join('')}` : whole;
}

export function TransactionFilters({
  query,
  onQueryChange,
  type,
  onTypeChange,
  dateRange,
  onDateRangeChange,
  minAmount,
  onMinAmountChange,
  maxAmount,
  onMaxAmountChange,
}: TransactionFiltersProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Manage your incoming and outgoing transfers.
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Search by recipient, reference, or transaction"
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        value={query}
        onChangeText={onQueryChange}
      />

      <View style={styles.chipRow}>
        {TYPE_OPTIONS.map(option => (
          <Chip
            key={option.value}
            label={option.label}
            selected={type === option.value}
            onPress={() => onTypeChange(option.value)}
          />
        ))}
      </View>

      <View style={styles.chipRow}>
        {DATE_OPTIONS.map(option => (
          <Chip
            key={option.value}
            label={option.label}
            selected={dateRange === option.value}
            onPress={() => onDateRangeChange(option.value)}
          />
        ))}
      </View>

      <View style={styles.amountRow}>
        <TextInput
          style={styles.amountInput}
          placeholder="Min amount"
          placeholderTextColor={colors.textMuted}
          keyboardType="decimal-pad"
          inputMode="decimal"
          value={minAmount}
          onChangeText={value => onMinAmountChange(sanitizeAmount(value))}
        />
        <Text style={styles.amountSeparator}>–</Text>
        <TextInput
          style={styles.amountInput}
          placeholder="Max amount"
          placeholderTextColor={colors.textMuted}
          keyboardType="decimal-pad"
          inputMode="decimal"
          value={maxAmount}
          onChangeText={value => onMaxAmountChange(sanitizeAmount(value))}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.md },
  subtitle: { ...typography.body, color: colors.textSecondary },
  search: {
    minHeight: 48,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    color: colors.text,
    ...typography.body,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
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
});

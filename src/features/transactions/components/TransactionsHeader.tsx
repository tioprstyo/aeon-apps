import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { IconButton } from '@/components';
import { colors, spacing, typography } from '@/theme';

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
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.title}>Transactions</Text>
        <View style={styles.actions}>
          <IconButton
            accessibilityLabel="Toggle search"
            active={searchActive}
            onPress={onToggleSearch}
          >
            <Search
              size={20}
              color={searchActive ? colors.primary : colors.text}
            />
          </IconButton>
          <IconButton
            accessibilityLabel="Toggle filters"
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
      <Text style={styles.subtitle}>
        Manage your incoming and outgoing transfers.
      </Text>
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
  title: { fontSize: 32, fontWeight: '800', color: colors.text },
  actions: { flexDirection: 'row', gap: spacing.sm },
  subtitle: { ...typography.body, color: colors.textSecondary },
});

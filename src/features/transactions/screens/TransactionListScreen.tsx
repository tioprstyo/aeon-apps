import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  View,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Clipboard from '@react-native-clipboard/clipboard';
import { BottomSheet, Button, Screen, SearchBar } from '@/components';
import { colors, spacing, typography } from '@/theme';
import type { RootStackScreenProps } from '@/navigation';
import { useTransactionStore } from '../store/useTransactionStore';
import { TransactionListItem } from '../components/TransactionListItem';
import { TransactionsHeader } from '../components/TransactionsHeader';
import { TypeSegmentedControl } from '../components/TypeSegmentedControl';
import { TransactionFiltersSheet } from '../components/TransactionFiltersSheet';
import {
  DateRange,
  filterTransactions,
  SortOrder,
  sortTransactions,
  TypeFilter,
} from '../utils/filter';
import { showTransactionActions } from '../utils/menu';
import { shareTransaction } from '../utils/share';
import { Transaction } from '../types';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/** Animate the next layout change (used when toggling the search field). */
function animateNext() {
  LayoutAnimation.configureNext({
    duration: 220,
    create: { type: 'easeInEaseOut', property: 'opacity' },
    update: { type: 'easeInEaseOut' },
    delete: { type: 'easeInEaseOut', property: 'opacity' },
  });
}

function ListSeparator() {
  return <View style={styles.separator} />;
}

export function TransactionListScreen({
  navigation,
}: RootStackScreenProps<'TransactionList'>) {
  const transactions = useTransactionStore(s => s.transactions);
  const status = useTransactionStore(s => s.status);
  const error = useTransactionStore(s => s.error);
  const fetchTransactions = useTransactionStore(s => s.fetchTransactions);

  const [query, setQuery] = useState('');
  const [type, setType] = useState<TypeFilter>('all');
  // Applied filters — these drive the visible list.
  const [dateRange, setDateRange] = useState<DateRange>('all');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [sort, setSort] = useState<SortOrder>('newest');
  // Draft filters — edited inside the sheet, committed only on "Apply Filters".
  const [draftDateRange, setDraftDateRange] = useState<DateRange>('all');
  const [draftMinAmount, setDraftMinAmount] = useState('');
  const [draftMaxAmount, setDraftMaxAmount] = useState('');
  const [draftSort, setDraftSort] = useState<SortOrder>('newest');
  const [searchVisible, setSearchVisible] = useState(false);
  const [filterSheetVisible, setFilterSheetVisible] = useState(false);
  const searchRef = useRef<TextInput>(null);
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const visibleTransactions = useMemo(() => {
    const parsedMin = parseFloat(minAmount);
    const parsedMax = parseFloat(maxAmount);
    const filtered = filterTransactions(transactions, {
      query,
      type,
      dateRange,
      minAmount: Number.isNaN(parsedMin) ? undefined : parsedMin,
      maxAmount: Number.isNaN(parsedMax) ? undefined : parsedMax,
    });
    return sortTransactions(filtered, sort);
  }, [transactions, query, type, dateRange, minAmount, maxAmount, sort]);

  const openDetail = useCallback(
    (transaction: Transaction) =>
      navigation.navigate('TransactionDetail', { refId: transaction.refId }),
    [navigation],
  );

  const openMenu = useCallback(
    (transaction: Transaction) =>
      showTransactionActions({
        onViewDetails: () => openDetail(transaction),
        onShare: () => {
          shareTransaction(transaction).catch(() => undefined);
        },
        onCopyRef: () => Clipboard.setString(transaction.refId),
      }),
    [openDetail],
  );

  const toggleSearch = useCallback(() => {
    animateNext();
    setSearchVisible(prev => {
      const next = !prev;
      if (next) {
        requestAnimationFrame(() => searchRef.current?.focus());
      }
      return next;
    });
  }, []);

  // Seed the drafts from the applied filters whenever the sheet is opened, so
  // editing starts from the current state and discards cleanly on dismiss.
  const openFilters = useCallback(() => {
    setDraftDateRange(dateRange);
    setDraftMinAmount(minAmount);
    setDraftMaxAmount(maxAmount);
    setDraftSort(sort);
    setFilterSheetVisible(true);
  }, [dateRange, minAmount, maxAmount, sort]);

  const applyFilters = useCallback(() => {
    setDateRange(draftDateRange);
    setMinAmount(draftMinAmount);
    setMaxAmount(draftMaxAmount);
    setSort(draftSort);
    setFilterSheetVisible(false);
  }, [draftDateRange, draftMinAmount, draftMaxAmount, draftSort]);

  const resetFilters = useCallback(() => {
    setDraftDateRange('all');
    setDraftMinAmount('');
    setDraftMaxAmount('');
    setDraftSort('newest');
  }, []);

  const advancedFiltersActive =
    dateRange !== 'all' ||
    sort !== 'newest' ||
    minAmount.trim() !== '' ||
    maxAmount.trim() !== '';
  const hasActiveFilters =
    query.trim() !== '' || type !== 'all' || advancedFiltersActive;
  const isInitialLoading = status === 'loading' && transactions.length === 0;
  const isRefreshing = status === 'loading' && transactions.length > 0;

  return (
    <Screen padded={false} edges={['top']}>
      <View style={styles.header}>
        <TransactionsHeader
          searchActive={searchVisible}
          filtersActive={advancedFiltersActive}
          onToggleSearch={toggleSearch}
          onToggleFilters={openFilters}
        />

        {searchVisible ? (
          <SearchBar
            ref={searchRef}
            value={query}
            onChangeText={setQuery}
            placeholder="Search by recipient, reference, or transaction"
          />
        ) : null}

        <TypeSegmentedControl value={type} onChange={setType} />
      </View>

      {isInitialLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : status === 'error' && transactions.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorBody}>
            {error ?? 'Unable to load transactions.'}
          </Text>
          <Button
            label="Try again"
            onPress={fetchTransactions}
            style={styles.retry}
          />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          showsVerticalScrollIndicator={false}
          data={visibleTransactions}
          keyExtractor={item => item.refId}
          renderItem={({ item }) => (
            <TransactionListItem
              transaction={item}
              onPress={openDetail}
              onMore={openMenu}
            />
          )}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: tabBarHeight + spacing.xl },
          ]}
          scrollIndicatorInsets={{ bottom: tabBarHeight }}
          ItemSeparatorComponent={ListSeparator}
          onRefresh={fetchTransactions}
          refreshing={isRefreshing}
          keyboardDismissMode="on-drag"
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text style={styles.emptyTitle}>No transactions found</Text>
              <Text style={styles.emptyBody}>
                {hasActiveFilters
                  ? 'Try adjusting your search or filters.'
                  : 'Your transactions will appear here.'}
              </Text>
            </View>
          }
        />
      )}

      <BottomSheet
        visible={filterSheetVisible}
        onClose={() => setFilterSheetVisible(false)}
      >
        <TransactionFiltersSheet
          dateRange={draftDateRange}
          onDateRangeChange={setDraftDateRange}
          sort={draftSort}
          onSortChange={setDraftSort}
          minAmount={draftMinAmount}
          onMinAmountChange={setDraftMinAmount}
          maxAmount={draftMaxAmount}
          onMaxAmountChange={setDraftMaxAmount}
          onReset={resetFilters}
          onApply={applyFilters}
        />
      </BottomSheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    gap: spacing.md,
  },
  list: { flex: 1 },
  listContent: { padding: spacing.md, gap: spacing.sm, flexGrow: 1 },
  separator: { height: spacing.sm },
  centered: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.sm,
  },
  errorTitle: { ...typography.h3, color: colors.text },
  errorBody: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  retry: { marginTop: spacing.md, alignSelf: 'stretch' },
  emptyTitle: { ...typography.h3, color: colors.text },
  emptyBody: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

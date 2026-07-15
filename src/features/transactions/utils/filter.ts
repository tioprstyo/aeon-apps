import { getDirection, Transaction, TransactionDirection } from '../types';

export type TypeFilter = 'all' | TransactionDirection;
export type DateRange = 'all' | '1week' | '1month' | '3month';
export type SortOrder = 'newest' | 'oldest';

export interface TransactionFilterCriteria {
  query: string;
  type: TypeFilter;
  dateRange: DateRange;
  /** Inclusive lower bound on the transaction magnitude (absolute amount). */
  minAmount?: number;
  /** Inclusive upper bound on the transaction magnitude (absolute amount). */
  maxAmount?: number;
}

export const DEFAULT_FILTERS: TransactionFilterCriteria = {
  query: '',
  type: 'all',
  dateRange: 'all',
  minAmount: undefined,
  maxAmount: undefined,
};

const DAY_MS = 24 * 60 * 60 * 1000;
const RANGE_DAYS: Record<Exclude<DateRange, 'all'>, number> = {
  '1week': 7,
  '1month': 30,
  '3month': 90,
};

/**
 * Filter transactions by free-text query, direction and date range.
 *
 * The date window is anchored to the most recent transaction in the list
 * (rather than "now") so the fixed demo dataset remains filterable. Against a
 * live backend you would anchor to `Date.now()`.
 */
export function filterTransactions(
  transactions: Transaction[],
  { query, type, dateRange, minAmount, maxAmount }: TransactionFilterCriteria,
): Transaction[] {
  const normalizedQuery = query.trim().toLowerCase();

  let cutoff = -Infinity;
  if (dateRange !== 'all' && transactions.length > 0) {
    const latest = Math.max(...transactions.map(t => new Date(t.transferDate).getTime()));
    cutoff = latest - RANGE_DAYS[dateRange] * DAY_MS;
  }

  return transactions.filter(transaction => {
    if (type !== 'all' && getDirection(transaction.amount) !== type) {
      return false;
    }

    if (new Date(transaction.transferDate).getTime() < cutoff) {
      return false;
    }

    const magnitude = Math.abs(transaction.amount);
    if (minAmount != null && magnitude < minAmount) {
      return false;
    }
    if (maxAmount != null && magnitude > maxAmount) {
      return false;
    }

    if (normalizedQuery.length > 0) {
      const haystack =
        `${transaction.transferName} ${transaction.recipientName} ${transaction.refId}`.toLowerCase();
      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });
}

/** Returns a new array sorted by transfer date. */
export function sortTransactions(transactions: Transaction[], order: SortOrder): Transaction[] {
  const direction = order === 'newest' ? -1 : 1;
  return [...transactions].sort(
    (a, b) =>
      direction * (new Date(a.transferDate).getTime() - new Date(b.transferDate).getTime()),
  );
}

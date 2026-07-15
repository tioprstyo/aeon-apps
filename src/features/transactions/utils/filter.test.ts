import { filterTransactions, sortTransactions } from './filter';
import { Transaction } from '../types';

const transactions: Transaction[] = [
  {
    refId: '123ABC',
    transferDate: '2024-10-15T12:34:56Z',
    recipientName: 'John Doe',
    transferName: 'Salary Payment',
    amount: 1500,
  },
  {
    refId: '789GHI',
    transferDate: '2024-10-05T16:18:30Z',
    recipientName: 'Robert Brown',
    transferName: 'Refund',
    amount: -500,
  },
  {
    refId: '456DEF',
    transferDate: '2024-09-21T09:12:45Z',
    recipientName: 'Jane Smith',
    transferName: 'Invoice Payment',
    amount: 2300.75,
  },
  {
    refId: '101JKL',
    transferDate: '2024-08-30T11:47:22Z',
    recipientName: 'Emily Davis',
    transferName: 'Bonus Payment',
    amount: 1200,
  },
];

const refIds = (result: Transaction[]) => result.map(t => t.refId);

describe('filterTransactions', () => {
  it('returns everything with default filters', () => {
    expect(filterTransactions(transactions, { query: '', type: 'all', dateRange: 'all' })).toHaveLength(4);
  });

  it('filters by direction', () => {
    const incoming = filterTransactions(transactions, { query: '', type: 'incoming', dateRange: 'all' });
    expect(refIds(incoming)).toEqual(['123ABC', '456DEF', '101JKL']);

    const outgoing = filterTransactions(transactions, { query: '', type: 'outgoing', dateRange: 'all' });
    expect(refIds(outgoing)).toEqual(['789GHI']);
  });

  it('searches recipient, ref ID and transfer name (case-insensitive)', () => {
    expect(refIds(filterTransactions(transactions, { query: 'jane', type: 'all', dateRange: 'all' }))).toEqual(['456DEF']);
    expect(refIds(filterTransactions(transactions, { query: '789ghi', type: 'all', dateRange: 'all' }))).toEqual(['789GHI']);
    expect(refIds(filterTransactions(transactions, { query: 'payment', type: 'all', dateRange: 'all' }))).toEqual(['123ABC', '456DEF', '101JKL']);
  });

  it('filters by date range anchored to the latest transaction', () => {
    expect(refIds(filterTransactions(transactions, { query: '', type: 'all', dateRange: '1week' }))).toEqual(['123ABC']);
    expect(refIds(filterTransactions(transactions, { query: '', type: 'all', dateRange: '1month' }))).toEqual(['123ABC', '789GHI', '456DEF']);
    // 3 months (90 days) back from 15 Oct 2024 reaches 17 Jul 2024 — all four.
    expect(filterTransactions(transactions, { query: '', type: 'all', dateRange: '3month' })).toHaveLength(4);
  });

  it('combines search with direction', () => {
    expect(refIds(filterTransactions(transactions, { query: 'payment', type: 'incoming', dateRange: 'all' }))).toEqual(['123ABC', '456DEF', '101JKL']);
    expect(filterTransactions(transactions, { query: 'refund', type: 'incoming', dateRange: 'all' })).toHaveLength(0);
  });
});

describe('sortTransactions', () => {
  it('sorts newest and oldest first without mutating the input', () => {
    expect(refIds(sortTransactions(transactions, 'newest'))).toEqual(['123ABC', '789GHI', '456DEF', '101JKL']);
    expect(refIds(sortTransactions(transactions, 'oldest'))).toEqual(['101JKL', '456DEF', '789GHI', '123ABC']);
    // original array order is preserved
    expect(refIds(transactions)).toEqual(['123ABC', '789GHI', '456DEF', '101JKL']);
  });
});

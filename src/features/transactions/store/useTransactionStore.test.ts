import { useTransactionStore } from './useTransactionStore';

describe('useTransactionStore', () => {
  beforeEach(() => {
    useTransactionStore.setState({ transactions: [], status: 'idle', error: null });
  });

  it('starts in an idle, empty state', () => {
    const state = useTransactionStore.getState();
    expect(state.status).toBe('idle');
    expect(state.transactions).toHaveLength(0);
  });

  it('loads the transactions payload as-is (ordering is the UI\'s job)', async () => {
    await useTransactionStore.getState().fetchTransactions();

    const { status, transactions } = useTransactionStore.getState();
    expect(status).toBe('success');
    expect(transactions).toHaveLength(4);
    // The store keeps the raw backend order; the list sorts by date via the
    // bottom-sheet filter (covered in filter.test.ts).
    expect(transactions.map(t => t.refId)).toEqual(['123ABC', '456DEF', '789GHI', '101JKL']);
  });

  it('looks up a transaction by refId', async () => {
    await useTransactionStore.getState().fetchTransactions();

    expect(useTransactionStore.getState().getByRefId('456DEF')?.recipientName).toBe('Jane Smith');
    expect(useTransactionStore.getState().getByRefId('nope')).toBeUndefined();
  });
});

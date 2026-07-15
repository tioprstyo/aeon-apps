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

  it('loads transactions sorted newest first', async () => {
    await useTransactionStore.getState().fetchTransactions();

    const { status, transactions } = useTransactionStore.getState();
    expect(status).toBe('success');
    expect(transactions).toHaveLength(4);
    expect(transactions.map(t => t.refId)).toEqual(['123ABC', '789GHI', '456DEF', '101JKL']);
  });

  it('looks up a transaction by refId', async () => {
    await useTransactionStore.getState().fetchTransactions();

    expect(useTransactionStore.getState().getByRefId('456DEF')?.recipientName).toBe('Jane Smith');
    expect(useTransactionStore.getState().getByRefId('nope')).toBeUndefined();
  });
});

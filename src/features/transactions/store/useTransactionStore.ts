import { create } from 'zustand';
import { transactionService } from '../services/transactionService';
import { Transaction } from '../types';

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

interface TransactionState {
  transactions: Transaction[];
  status: RequestStatus;
  error: string | null;

  /** Fetch the transaction list into the store. */
  fetchTransactions: () => Promise<void>;
  /** Look up a single transaction already in the store by its refId. */
  getByRefId: (refId: string) => Transaction | undefined;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  status: 'idle',
  error: null,

  fetchTransactions: async () => {
    set({ status: 'loading', error: null });
    try {
      const transactions = await transactionService.fetchTransactions();
      set({ transactions, status: 'success' });
    } catch (error) {
      set({
        status: 'error',
        error: error instanceof Error ? error.message : 'Failed to load transactions',
      });
    }
  },
  

  getByRefId: refId => get().transactions.find(t => t.refId === refId),
}));

import { Transaction, TransactionsResponse } from '../types';

/**
 * Mocked backend payload (from the assessment brief). Swap `fetchTransactions`
 * for a real call when an endpoint is available, e.g.:
 *
 *   import { apiClient } from '@/services/api';
 *   const { data } = await apiClient.get<TransactionsResponse>('/transactions');
 *   return data;
 */
const MOCK_RESPONSE: TransactionsResponse = {
  data: [
    {
      refId: '123ABC',
      transferDate: '2024-10-15T12:34:56Z',
      recipientName: 'John Doe',
      transferName: 'Salary Payment',
      amount: 1500.0,
    },
    {
      refId: '456DEF',
      transferDate: '2024-09-21T09:12:45Z',
      recipientName: 'Jane Smith',
      transferName: 'Invoice Payment',
      amount: 2300.75,
    },
    {
      refId: '789GHI',
      transferDate: '2024-10-05T16:18:30Z',
      recipientName: 'Robert Brown',
      transferName: 'Refund',
      amount: -500.0,
    },
    {
      refId: '101JKL',
      transferDate: '2024-08-30T11:47:22Z',
      recipientName: 'Emily Davis',
      transferName: 'Bonus Payment',
      amount: 1200.0,
    },
  ],
};

const NETWORK_DELAY_MS = 800;

export const transactionService = {
  /** Returns the customer's latest transactions, newest first. */
  async fetchTransactions(): Promise<Transaction[]> {
    await new Promise<void>(resolve => setTimeout(() => resolve(), NETWORK_DELAY_MS));

    return [...MOCK_RESPONSE.data].sort(
      (a, b) => new Date(b.transferDate).getTime() - new Date(a.transferDate).getTime(),
    );
  },
};

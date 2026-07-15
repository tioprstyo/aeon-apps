/**
 * Shape of a single transaction, matching the backend response.
 * A negative `amount` denotes an outgoing transaction (e.g. a transfer out or
 * a refund); a positive `amount` denotes incoming money.
 */
export interface Transaction {
  refId: string;
  /** ISO-8601 date-time string in UTC, e.g. "2024-10-15T12:34:56Z". */
  transferDate: string;
  recipientName: string;
  /** Human-readable label for the transfer, e.g. "Salary Payment". */
  transferName: string;
  amount: number;
}

/** Envelope returned by the transactions endpoint. */
export interface TransactionsResponse {
  data: Transaction[];
}

export type TransactionDirection = 'incoming' | 'outgoing';

export function getDirection(amount: number): TransactionDirection {
  return amount < 0 ? 'outgoing' : 'incoming';
}

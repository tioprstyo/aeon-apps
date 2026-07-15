import { Share } from 'react-native';
import { formatDateTime, formatSignedAmount } from '@/utils';
import { Transaction } from '../types';

/**
 * Build the human-readable message shared to external apps. Kept pure so it can
 * be unit-tested independently of the native Share sheet.
 */
export function buildShareMessage(transaction: Transaction): string {
  return [
    'Transaction Details',
    `Reference ID: ${transaction.refId}`,
    `Date: ${formatDateTime(transaction.transferDate)}`,
    `Recipient: ${transaction.recipientName}`,
    `Description: ${transaction.transferName}`,
    `Amount: ${formatSignedAmount(transaction.amount)}`,
  ].join('\n');
}

/** Open the OS share sheet for a transaction. */
export async function shareTransaction(transaction: Transaction): Promise<void> {
  await Share.share({
    title: `Transaction ${transaction.refId}`,
    message: buildShareMessage(transaction),
  });
}

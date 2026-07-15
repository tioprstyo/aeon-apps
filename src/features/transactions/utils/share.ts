import { Share } from 'react-native';
import { formatDateTime, formatSignedAmount } from '@/utils';
import { translate } from '@/i18n';
import { Transaction } from '../types';

/**
 * Build the human-readable message shared to external apps, localised to the
 * active language. Kept free of native calls so it can be unit-tested
 * independently of the Share sheet.
 */
export function buildShareMessage(transaction: Transaction): string {
  return [
    translate('share.title'),
    `${translate('share.reference')}: ${transaction.refId}`,
    `${translate('share.date')}: ${formatDateTime(transaction.transferDate)}`,
    `${translate('share.recipient')}: ${transaction.recipientName}`,
    `${translate('share.description')}: ${transaction.transferName}`,
    `${translate('share.amount')}: ${formatSignedAmount(transaction.amount)}`,
  ].join('\n');
}

/** Open the OS share sheet for a transaction. */
export async function shareTransaction(transaction: Transaction): Promise<void> {
  await Share.share({
    title: `Transaction ${transaction.refId}`,
    message: buildShareMessage(transaction),
  });
}

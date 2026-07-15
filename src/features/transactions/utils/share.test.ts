import { buildShareMessage } from './share';
import { Transaction } from '../types';

const transaction: Transaction = {
  refId: '789GHI',
  transferDate: '2024-10-05T16:18:30Z',
  recipientName: 'Robert Brown',
  transferName: 'Refund',
  amount: -500,
};

describe('buildShareMessage', () => {
  it('includes every transaction field in a readable form', () => {
    expect(buildShareMessage(transaction)).toBe(
      [
        'Transaction Details',
        'Reference ID: 789GHI',
        'Date: 05 Oct 2024 at 23:18',
        'Recipient: Robert Brown',
        'Description: Refund',
        'Amount: -RM 500.00',
      ].join('\n'),
    );
  });
});

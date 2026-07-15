import { formatCurrency, formatDate, formatDateTime, formatSignedAmount, formatTime } from './format';

describe('formatCurrency', () => {
  it('formats with thousand separators and two decimals', () => {
    expect(formatCurrency(1500)).toBe('RM 1,500.00');
    expect(formatCurrency(2300.75)).toBe('RM 2,300.75');
    expect(formatCurrency(1234567.5)).toBe('RM 1,234,567.50');
  });

  it('uses the absolute value', () => {
    expect(formatCurrency(-500)).toBe('RM 500.00');
  });
});

describe('formatSignedAmount', () => {
  it('prefixes a plus sign for incoming amounts', () => {
    expect(formatSignedAmount(1500)).toBe('+RM 1,500.00');
  });

  it('prefixes a minus sign for outgoing amounts', () => {
    expect(formatSignedAmount(-500)).toBe('-RM 500.00');
  });
});

// Timezone is pinned to Asia/Jakarta (UTC+7) in jest.config.js, so
// 12:34 UTC renders as 19:34 local.
describe('date formatting', () => {
  const iso = '2024-10-15T12:34:56Z';

  it('formats the date', () => {
    expect(formatDate(iso)).toBe('15 Oct 2024');
  });

  it('formats the time in local timezone', () => {
    expect(formatTime(iso)).toBe('19:34');
  });

  it('formats date and time in local timezone', () => {
    expect(formatDateTime(iso)).toBe('15 Oct 2024 at 19:34');
  });
});

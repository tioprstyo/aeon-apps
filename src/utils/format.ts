const CURRENCY_PREFIX = 'RM';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** Insert thousand separators into an integer string ("1234" -> "1,234"). */
function withThousandSeparators(intPart: string): string {
  return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format an amount as currency, e.g. `1500` -> "RM 1,500.00".
 * Always uses the absolute value; use {@link formatSignedAmount} for a sign.
 */
export function formatCurrency(amount: number): string {
  const [intPart, decimalPart] = Math.abs(amount).toFixed(2).split('.');
  return `${CURRENCY_PREFIX} ${withThousandSeparators(intPart)}.${decimalPart}`;
}

/**
 * Format an amount with an explicit leading sign, e.g.
 * `1500` -> "+RM 1,500.00", `-500` -> "-RM 500.00".
 */
export function formatSignedAmount(amount: number): string {
  const sign = amount < 0 ? '-' : '+';
  return `${sign}${formatCurrency(amount)}`;
}

/**
 * Format an ISO date-time as a date in the device's local timezone,
 * e.g. "15 Oct 2024".
 */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, '0');
  return `${day} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/** Format an ISO date-time as 24h time in the device's local timezone, e.g. "19:34". */
export function formatTime(iso: string): string {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

/**
 * Format an ISO date-time as date + 24h time in the device's local timezone,
 * e.g. "15 Oct 2024 at 19:34".
 */
export function formatDateTime(iso: string): string {
  return `${formatDate(iso)} at ${formatTime(iso)}`;
}

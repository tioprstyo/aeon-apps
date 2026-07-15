/**
 * Supported UI languages. `en` is the source of truth: every other language
 * must provide the same keys (enforced by the `Translations` type below).
 */
export type Language = 'en' | 'ms';

export interface LanguageOption {
  code: Language;
  /** Native name shown in menus. */
  label: string;
  /** Two-letter code shown on the compact header toggle. */
  short: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ms', label: 'Bahasa Malaysia', short: 'MS' },
];

/** English strings — the canonical key set for every other language. */
const en = {
  // Bottom tabs
  'tabs.home': 'Home',
  'tabs.accounts': 'Accounts',
  'tabs.transactions': 'Transactions',
  'tabs.recipients': 'Recipients',
  'tabs.more': 'More',

  // Transactions header
  'transactions.title': 'Transactions',
  'transactions.subtitle': 'Manage your incoming and outgoing transfers.',
  'transactions.searchPlaceholder':
    'Search by recipient, reference, or transaction',
  'transactions.toggleSearch': 'Toggle search',
  'transactions.toggleFilters': 'Toggle filters',

  // Direction segmented control
  'segment.all': 'All',
  'segment.incoming': 'Incoming',
  'segment.outgoing': 'Outgoing',

  // List states
  'list.errorTitle': 'Something went wrong',
  'list.errorBody': 'Unable to load transactions.',
  'list.retry': 'Try again',
  'list.emptyTitle': 'No transactions found',
  'list.emptyFiltered': 'Try adjusting your search or filters.',
  'list.emptyDefault': 'Your transactions will appear here.',
  'list.ref': 'Ref {refId}',
  'list.moreActions': 'More actions for {name}',

  // Filters sheet
  'filters.title': 'Filters',
  'filters.reset': 'Reset',
  'filters.dateRange': 'Date range',
  'filters.amountRange': 'Amount range',
  'filters.sortBy': 'Sort by',
  'filters.minAmount': 'Min amount',
  'filters.maxAmount': 'Max amount',
  'filters.apply': 'Apply Filters',
  'filters.date.all': 'All Dates',
  'filters.date.1week': '1 Week',
  'filters.date.1month': '1 Month',
  'filters.date.3month': '3 Months',
  'filters.sort.newest': 'Newest first',
  'filters.sort.oldest': 'Oldest first',

  // Transaction detail
  'detail.title': 'Transaction Detail',
  'detail.transferAmount': 'TRANSFER AMOUNT',
  'detail.receiptAmount': 'RECEIPT AMOUNT',
  'detail.referenceId': 'Reference ID',
  'detail.recipient': 'Recipient',
  'detail.transferDate': 'Transfer Date',
  'detail.transactionType': 'Transaction Type',
  'detail.amount': 'Amount',
  'detail.notFound': 'Transaction not found.',
  'detail.share': 'Share Transaction',
  'detail.shareErrorTitle': 'Unable to share',
  'detail.shareErrorBody': 'Please try again.',

  // Direction badge
  'direction.incoming': 'Incoming',
  'direction.outgoing': 'Outgoing',

  // Actions menu
  'menu.title': 'Transaction',
  'menu.viewDetails': 'View details',
  'menu.share': 'Share',
  'menu.copyRef': 'Copy Reference ID',
  'menu.cancel': 'Cancel',

  // Share message
  'share.title': 'Transaction Details',
  'share.reference': 'Reference ID',
  'share.date': 'Date',
  'share.recipient': 'Recipient',
  'share.description': 'Description',
  'share.amount': 'Amount',

  // Copy button
  'copy.action': 'Copy {label}',
  'copy.copied': 'Copied',
  'copy.refCopied': 'Reference ID copied',

  // Language toggle
  'language.change': 'Change language',

  // Placeholder tabs
  'placeholder.body':
    'Your {title} will appear here once this feature becomes available.',
} as const;

export type TranslationKey = keyof typeof en;

type Translations = Record<TranslationKey, string>;

/** Bahasa Malaysia strings. Must cover exactly the same keys as `en`. */
const ms: Translations = {
  'tabs.home': 'Utama',
  'tabs.accounts': 'Akaun',
  'tabs.transactions': 'Transaksi',
  'tabs.recipients': 'Penerima',
  'tabs.more': 'Lagi',

  'transactions.title': 'Transaksi',
  'transactions.subtitle': 'Urus pemindahan masuk dan keluar anda.',
  'transactions.searchPlaceholder':
    'Cari mengikut penerima, rujukan, atau transaksi',
  'transactions.toggleSearch': 'Togol carian',
  'transactions.toggleFilters': 'Togol penapis',

  'segment.all': 'Semua',
  'segment.incoming': 'Masuk',
  'segment.outgoing': 'Keluar',

  'list.errorTitle': 'Ada sesuatu yang tidak kena',
  'list.errorBody': 'Tidak dapat memuatkan transaksi.',
  'list.retry': 'Cuba lagi',
  'list.emptyTitle': 'Tiada transaksi dijumpai',
  'list.emptyFiltered': 'Cuba laraskan carian atau penapis anda.',
  'list.emptyDefault': 'Transaksi anda akan dipaparkan di sini.',
  'list.ref': 'Ruj {refId}',
  'list.moreActions': 'Tindakan lanjut untuk {name}',

  'filters.title': 'Penapis',
  'filters.reset': 'Set semula',
  'filters.dateRange': 'Julat tarikh',
  'filters.amountRange': 'Julat jumlah',
  'filters.sortBy': 'Susun mengikut',
  'filters.minAmount': 'Jumlah minimum',
  'filters.maxAmount': 'Jumlah maksimum',
  'filters.apply': 'Guna Penapis',
  'filters.date.all': 'Semua Tarikh',
  'filters.date.1week': '1 Minggu',
  'filters.date.1month': '1 Bulan',
  'filters.date.3month': '3 Bulan',
  'filters.sort.newest': 'Terbaru dahulu',
  'filters.sort.oldest': 'Terlama dahulu',

  'detail.title': 'Butiran Transaksi',
  'detail.transferAmount': 'JUMLAH PEMINDAHAN',
  'detail.receiptAmount': 'JUMLAH DITERIMA',
  'detail.referenceId': 'ID Rujukan',
  'detail.recipient': 'Penerima',
  'detail.transferDate': 'Tarikh Pemindahan',
  'detail.transactionType': 'Jenis Transaksi',
  'detail.amount': 'Jumlah',
  'detail.notFound': 'Transaksi tidak dijumpai.',
  'detail.share': 'Kongsi Transaksi',
  'detail.shareErrorTitle': 'Tidak dapat berkongsi',
  'detail.shareErrorBody': 'Sila cuba lagi.',

  'direction.incoming': 'Masuk',
  'direction.outgoing': 'Keluar',

  'menu.title': 'Transaksi',
  'menu.viewDetails': 'Lihat butiran',
  'menu.share': 'Kongsi',
  'menu.copyRef': 'Salin ID Rujukan',
  'menu.cancel': 'Batal',

  'share.title': 'Butiran Transaksi',
  'share.reference': 'ID Rujukan',
  'share.date': 'Tarikh',
  'share.recipient': 'Penerima',
  'share.description': 'Keterangan',
  'share.amount': 'Jumlah',

  'copy.action': 'Salin {label}',
  'copy.copied': 'Disalin',
  'copy.refCopied': 'ID Rujukan disalin',

  'language.change': 'Tukar bahasa',

  'placeholder.body':
    'Butiran {title} anda akan dipaparkan di sini apabila ciri ini tersedia.',
};

export const translations: Record<Language, Translations> = { en, ms };

/** Replace `{name}` placeholders in a template with the given values. */
export function interpolate(
  template: string,
  params?: Record<string, string | number>,
): string {
  if (!params) {
    return template;
  }
  return Object.keys(params).reduce(
    (result, name) => result.split(`{${name}}`).join(String(params[name])),
    template,
  );
}

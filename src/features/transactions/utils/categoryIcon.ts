import {
  ArrowLeftRight,
  CreditCard,
  Gift,
  LucideIcon,
  ReceiptText,
  RotateCcw,
  Users,
  Wallet,
} from 'lucide-react-native';
import { Transaction } from '../types';

/** Picks a representative icon for a transaction based on its transfer name. */
export function getCategoryIcon(transaction: Transaction): LucideIcon {
  const name = transaction.transferName.toLowerCase();

  if (name.includes('salary')) return Wallet;
  if (name.includes('refund')) return RotateCcw;
  if (name.includes('invoice')) return ReceiptText;
  if (name.includes('bonus')) return Gift;
  if (name.includes('client') || name.includes('transfer')) return Users;
  if (name.includes('supplier') || name.includes('payment')) return CreditCard;

  return ArrowLeftRight;
}

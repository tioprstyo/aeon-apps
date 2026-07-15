import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { EllipsisVertical } from 'lucide-react-native';
import { colors, radius, spacing, typography } from '@/theme';
import { formatDate, formatTime } from '@/utils';
import { getDirection, Transaction } from '../types';
import { getCategoryIcon } from '../utils/categoryIcon';
import { AmountText } from './AmountText';
import { DirectionBadge } from './DirectionBadge';

interface TransactionListItemProps {
  transaction: Transaction;
  onPress: (transaction: Transaction) => void;
  onMore: (transaction: Transaction) => void;
}

function TransactionListItemComponent({ transaction, onPress, onMore }: TransactionListItemProps) {
  const isOutgoing = getDirection(transaction.amount) === 'outgoing';
  const tint = isOutgoing ? colors.outgoing : colors.incoming;
  const tintSurface = isOutgoing ? colors.outgoingSurface : colors.incomingSurface;
  const CategoryIcon = getCategoryIcon(transaction);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${transaction.transferName}, ${formatDate(transaction.transferDate)}`}
      onPress={() => onPress(transaction)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={[styles.iconCircle, { backgroundColor: tintSurface }]}>
        <CategoryIcon size={22} color={tint} strokeWidth={2} />
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.title} numberOfLines={1}>
            {transaction.transferName}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`More actions for ${transaction.transferName}`}
            hitSlop={spacing.sm}
            onPress={() => onMore(transaction)}
            style={({ pressed }) => [styles.more, pressed && styles.pressed]}>
            <EllipsisVertical size={20} color={colors.textMuted} />
          </Pressable>
        </View>

        <View style={styles.topRow}>
          <Text style={styles.recipient} numberOfLines={1}>
            {transaction.recipientName}
          </Text>
          <AmountText amount={transaction.amount} style={styles.amount} />
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>
            {formatDate(transaction.transferDate)} • {formatTime(transaction.transferDate)}
          </Text>
          <Text style={styles.meta}>Ref {transaction.refId}</Text>
        </View>

        <DirectionBadge amount={transaction.amount} style={styles.badge} />
      </View>
    </Pressable>
  );
}

export const TransactionListItem = React.memo(TransactionListItemComponent);

const CIRCLE = 48;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  pressed: { opacity: 0.85 },
  iconCircle: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1, gap: spacing.xs },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  title: { ...typography.h3, color: colors.text, flex: 1 },
  amount: { ...typography.h3 },
  recipient: { ...typography.bodySmall, color: colors.textSecondary, flex: 1 },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  meta: { ...typography.caption, color: colors.textMuted },
  badge: { marginTop: spacing.xs },
  more: { padding: spacing.xs, marginRight: -spacing.xs },
});

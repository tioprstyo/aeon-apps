import React, { useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Screen } from '@/components';
import { colors, radius, spacing, typography } from '@/theme';
import { formatDateTime, formatSignedAmount } from '@/utils';
import { useTranslation } from '@/i18n';
import type { RootStackScreenProps } from '@/navigation';
import { useTransactionStore } from '../store/useTransactionStore';
import { AmountText } from '../components/AmountText';
import { DirectionBadge } from '../components/DirectionBadge';
import { CopyButton } from '../components/CopyButton';
import { getDirection } from '../types';
import { shareTransaction } from '../utils/share';

function DetailRow({
  label,
  value,
  accessory,
}: {
  label: string;
  value: string;
  accessory?: React.ReactNode;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.rowText}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
      {accessory}
    </View>
  );
}

export function TransactionDetailScreen({
  route,
}: RootStackScreenProps<'TransactionDetail'>) {
  const { t } = useTranslation();
  const { refId } = route.params;
  const transaction = useTransactionStore(s => s.getByRefId(refId));

  const onShare = useCallback(async () => {
    if (!transaction) {
      return;
    }
    try {
      await shareTransaction(transaction);
    } catch {
      Alert.alert(t('detail.shareErrorTitle'), t('detail.shareErrorBody'));
    }
  }, [transaction, t]);

  if (!transaction) {
    return (
      <Screen>
        <View style={styles.centered}>
          <Text style={styles.notFound}>{t('detail.notFound')}</Text>
        </View>
      </Screen>
    );
  }

  const isOutgoing = getDirection(transaction.amount) === 'outgoing';

  return (
    <Screen>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.hero}>
            <Text style={styles.heroLabel}>
              {isOutgoing
                ? t('detail.transferAmount')
                : t('detail.receiptAmount')}
            </Text>
            <AmountText amount={transaction.amount} style={styles.heroAmount} />
            <Text style={styles.heroName}>{transaction.transferName}</Text>
            <DirectionBadge
              amount={transaction.amount}
              style={styles.heroBadge}
            />
          </View>

          <View style={styles.divider} />

          <DetailRow
            label={t('detail.referenceId')}
            value={transaction.refId}
            accessory={
              <CopyButton
                value={transaction.refId}
                label={t('detail.referenceId')}
              />
            }
          />
          <View style={styles.divider} />
          <DetailRow
            label={t('detail.recipient')}
            value={transaction.recipientName}
          />
          <View style={styles.divider} />
          <DetailRow
            label={t('detail.transferDate')}
            value={formatDateTime(transaction.transferDate)}
          />
          <View style={styles.divider} />
          <DetailRow
            label={t('detail.transactionType')}
            value={
              isOutgoing ? t('direction.outgoing') : t('direction.incoming')
            }
          />
          <View style={styles.divider} />
          <DetailRow
            label={t('detail.amount')}
            value={formatSignedAmount(transaction.amount)}
          />
        </View>
      </ScrollView>

      <Button
        label={t('detail.share')}
        onPress={onShare}
        style={styles.share}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFound: { ...typography.body, color: colors.textSecondary },
  scrollView: { flex: 1 },
  scroll: { paddingBottom: spacing.md },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  hero: { alignItems: 'center', gap: spacing.sm },
  heroLabel: {
    ...typography.caption,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.textMuted,
  },
  heroAmount: { fontSize: 34, lineHeight: 40 },
  heroName: { ...typography.h2, color: colors.text },
  heroBadge: { alignSelf: 'flex-start' },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  rowText: { flex: 1, gap: 2 },
  rowLabel: { ...typography.bodySmall, color: colors.textSecondary },
  rowValue: { ...typography.body, fontWeight: '600', color: colors.text },
  share: { marginTop: spacing.md },
});

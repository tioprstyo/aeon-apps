import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { colors } from '@/theme';
import { formatSignedAmount } from '@/utils';

interface AmountTextProps {
  amount: number;
  style?: TextStyle;
}

/**
 * Renders a signed currency amount, coloured green for incoming (positive) and
 * red for outgoing (negative) money.
 */
export function AmountText({ amount, style }: AmountTextProps) {
  const isOutgoing = amount < 0;
  return (
    <Text
      accessibilityLabel={`${isOutgoing ? 'Outgoing' : 'Incoming'} ${formatSignedAmount(amount)}`}
      style={[styles.amount, { color: isOutgoing ? colors.outgoing : colors.incoming }, style]}>
      {formatSignedAmount(amount)}
    </Text>
  );
}

const styles = StyleSheet.create({
  amount: { fontWeight: '700' },
});

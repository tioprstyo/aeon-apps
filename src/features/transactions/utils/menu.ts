import { ActionSheetIOS, Alert, Platform } from 'react-native';

export interface TransactionActions {
  onViewDetails: () => void;
  onShare: () => void;
  onCopyRef: () => void;
}

const LABELS = ['View details', 'Share', 'Copy Reference ID'];

/** Presents the per-transaction "more actions" menu (native on iOS, Alert elsewhere). */
export function showTransactionActions({ onViewDetails, onShare, onCopyRef }: TransactionActions): void {
  const handlers = [onViewDetails, onShare, onCopyRef];

  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      { options: [...LABELS, 'Cancel'], cancelButtonIndex: LABELS.length },
      index => {
        if (index < LABELS.length) {
          handlers[index]();
        }
      },
    );
    return;
  }

  Alert.alert('Transaction', undefined, [
    { text: LABELS[0], onPress: onViewDetails },
    { text: LABELS[1], onPress: onShare },
    { text: LABELS[2], onPress: onCopyRef },
    { text: 'Cancel', style: 'cancel' },
  ]);
}

import { ActionSheetIOS, Alert, Platform } from 'react-native';
import { translate } from '@/i18n';

export interface TransactionActions {
  onViewDetails: () => void;
  onShare: () => void;
  onCopyRef: () => void;
}

/**
 * Presents the per-transaction "more actions" menu (native on iOS, Alert
 * elsewhere). Labels are resolved at call time so they honour the active
 * language.
 */
export function showTransactionActions({ onViewDetails, onShare, onCopyRef }: TransactionActions): void {
  const labels = [
    translate('menu.viewDetails'),
    translate('menu.share'),
    translate('menu.copyRef'),
  ];
  const handlers = [onViewDetails, onShare, onCopyRef];

  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...labels, translate('menu.cancel')],
        cancelButtonIndex: labels.length,
      },
      index => {
        if (index < labels.length) {
          handlers[index]();
        }
      },
    );
    return;
  }

  Alert.alert(translate('menu.title'), undefined, [
    { text: labels[0], onPress: onViewDetails },
    { text: labels[1], onPress: onShare },
    { text: labels[2], onPress: onCopyRef },
    { text: translate('menu.cancel'), style: 'cancel' },
  ]);
}

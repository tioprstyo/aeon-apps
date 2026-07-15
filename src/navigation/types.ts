import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Screens inside the Transactions stack and their route params. Add new routes
 * here so navigation is fully typed across the app.
 */
export type RootStackParamList = {
  TransactionList: undefined;
  TransactionDetail: { refId: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

/** Bottom tabs. Only "Transactions" is implemented; the rest are placeholders. */
export type RootTabParamList = {
  Home: undefined;
  Accounts: undefined;
  Transactions: undefined;
  Recipients: undefined;
  More: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

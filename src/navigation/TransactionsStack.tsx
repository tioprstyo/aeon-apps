import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { colors } from '@/theme';
import {
  TransactionDetailScreen,
  TransactionListScreen,
} from '@/features/transactions';
import { RootStackParamList } from './types';
import { Pressable, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const BackButton = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) => {
  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
      <ChevronLeft size={24} color={colors.text} strokeWidth={2.5} />
    </Pressable>
  );
};

const transactionDetailOptions = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) => ({
  title: 'Transaction Detail',
  headerBackVisible: false,
  headerLeft: () => <BackButton navigation={navigation} />,
});

/** Transactions tab: list (custom header) → detail (native header). */
export function TransactionsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700', color: colors.text },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="TransactionList"
        component={TransactionListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
        options={transactionDetailOptions}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  backButton: {
    borderRadius: 100,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.8)',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },
});

import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { colors } from '@/theme';
import { LanguageToggle } from '@/components';
import { useTranslation } from '@/i18n';
import {
  TransactionDetailScreen,
  TransactionListScreen,
} from '@/features/transactions';
import { RootStackParamList } from './types';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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

/** Localised header title — a component so it re-renders on language change. */
const DetailHeaderTitle = () => {
  const { t } = useTranslation();
  return <Text style={styles.headerTitle}>{t('detail.title')}</Text>;
};

const transactionDetailOptions = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) => ({
  headerBackVisible: false,
  headerTitle: () => <DetailHeaderTitle />,
  headerLeft: () => <BackButton navigation={navigation} />,
  headerRight: () => (
    <View style={styles.translatorContainer}>
      <LanguageToggle />
    </View>
  ),
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
  headerTitle: { fontSize: 17, fontWeight: '700', color: colors.text },
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
  translatorContainer: { marginHorizontal: -6 },
});

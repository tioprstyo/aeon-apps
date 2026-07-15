import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import {
  ArrowUpDown,
  Ellipsis,
  House,
  Users,
  Wallet,
} from 'lucide-react-native';
import { colors, typography } from '@/theme';
import { useTranslation } from '@/i18n';
import { RootTabParamList } from './types';
import { PlaceholderScreen } from './PlaceholderScreen';
import { TransactionsStack } from './TransactionsStack';

const Tab = createBottomTabNavigator<RootTabParamList>();

const HomeTab = () => <PlaceholderScreen titleKey="tabs.home" />;
const AccountsTab = () => <PlaceholderScreen titleKey="tabs.accounts" />;
const RecipientsTab = () => <PlaceholderScreen titleKey="tabs.recipients" />;
const MoreTab = () => <PlaceholderScreen titleKey="tabs.more" />;

interface TabIconProps {
  color: string;
  size: number;
}

const renderHomeIcon = ({ color, size }: TabIconProps) => (
  <House size={size} color={color} />
);
const renderAccountsIcon = ({ color, size }: TabIconProps) => (
  <Wallet size={size} color={color} />
);
const renderRecipientsIcon = ({ color, size }: TabIconProps) => (
  <Users size={size} color={color} />
);
const renderMoreIcon = ({ color, size }: TabIconProps) => (
  <Ellipsis size={size} color={color} />
);

function TransactionsTabIcon() {
  return (
    <View style={styles.centerIcon}>
      <ArrowUpDown size={22} color={colors.textInverse} strokeWidth={2.4} />
    </View>
  );
}

/** Liquid-glass background: a translucent blur that content scrolls beneath. */
const renderTabBarBackground = () => (
  <View style={[StyleSheet.absoluteFill, styles.tabBarWrapper]}>
    <BlurView
      style={StyleSheet.absoluteFill}
      blurType="light"
      blurAmount={20}
      reducedTransparencyFallbackColor={colors.surface}
    />
  </View>
);

export function RootTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName="Transactions"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarBackground: renderTabBarBackground,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{ tabBarLabel: t('tabs.home'), tabBarIcon: renderHomeIcon }}
      />
      <Tab.Screen
        name="Accounts"
        component={AccountsTab}
        options={{
          tabBarLabel: t('tabs.accounts'),
          tabBarIcon: renderAccountsIcon,
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionsStack}
        options={({ route }) => {
          const focused =
            getFocusedRouteNameFromRoute(route) ?? 'TransactionList';
          return {
            tabBarLabel: t('tabs.transactions'),
            tabBarIcon: TransactionsTabIcon,
            // Hide the tab bar on the full-screen detail view.
            tabBarStyle:
              focused === 'TransactionDetail' ? styles.hidden : styles.tabBar,
          };
        }}
      />
      <Tab.Screen
        name="Recipients"
        component={RecipientsTab}
        options={{
          tabBarLabel: t('tabs.recipients'),
          tabBarIcon: renderRecipientsIcon,
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreTab}
        options={{ tabBarLabel: t('tabs.more'), tabBarIcon: renderMoreIcon }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    elevation: 0,
    paddingTop: 6,
    height: 88,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  hidden: { display: 'none' },
  tabLabel: { ...typography.caption, fontWeight: '600' },
  centerIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    transform: [
      {
        translateY: -14,
      },
    ],
  },
  tabBarWrapper: {
    borderRadius: 30,
    overflow: 'hidden',
  },
});

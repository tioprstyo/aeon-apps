import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '@/theme';
import { ToastHost } from '@/components';

/**
 * Composes global providers in one place. Zustand stores need no provider, so
 * this currently wraps safe-area handling, the status bar and the global toast
 * host. New app-wide providers (theme, query client, etc.) belong here.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      {children}
      <ToastHost />
    </SafeAreaProvider>
  );
}

import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Languages } from 'lucide-react-native';
import { colors, radius, spacing, typography } from '@/theme';
import { LANGUAGES, useTranslation } from '@/i18n';

/**
 * Compact header pill that cycles the UI language (EN ⇄ MS). Shows a globe icon
 * and the active language's short code.
 */
export function LanguageToggle() {
  const { t, language, toggleLanguage } = useTranslation();
  const active =
    LANGUAGES.find(option => option.code === language) ?? LANGUAGES[0];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${t('language.change')}, ${active.label}`}
      onPress={toggleLanguage}
      style={({ pressed }) => [styles.pill, pressed && styles.pressed]}
    >
      <Languages size={18} color={colors.primary} />
      <Text style={styles.code}>{active.short}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  pressed: { opacity: 0.7 },
  code: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.primary,
  },
});

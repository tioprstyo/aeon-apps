import { useCallback } from 'react';
import { useLanguageStore } from './useLanguageStore';
import {
  interpolate,
  Language,
  translations,
  TranslationKey,
} from './translations';

export type TranslateParams = Record<string, string | number>;
export type TranslateFn = (key: TranslationKey, params?: TranslateParams) => string;

/** Look up a key for a specific language, falling back to English then the key. */
export function translateFor(
  language: Language,
  key: TranslationKey,
  params?: TranslateParams,
): string {
  const template =
    translations[language][key] ?? translations.en[key] ?? key;
  return interpolate(template, params);
}

/**
 * Translate using the current language from the store. Use this outside React
 * components (event handlers, native menus, share text) where hooks can't run.
 */
export function translate(key: TranslationKey, params?: TranslateParams): string {
  return translateFor(useLanguageStore.getState().language, key, params);
}

/**
 * React hook for translating UI strings. Re-renders the consuming component
 * whenever the active language changes.
 */
export function useTranslation() {
  const language = useLanguageStore(s => s.language);
  const setLanguage = useLanguageStore(s => s.setLanguage);
  const toggleLanguage = useLanguageStore(s => s.toggleLanguage);

  const t = useCallback<TranslateFn>(
    (key, params) => translateFor(language, key, params),
    [language],
  );

  return { t, language, setLanguage, toggleLanguage };
}

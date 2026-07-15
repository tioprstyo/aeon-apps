import { create } from 'zustand';
import { Language } from './translations';

interface LanguageState {
  language: Language;
  /** Set the active UI language. */
  setLanguage: (language: Language) => void;
  /** Cycle to the next language (EN ⇄ MS). */
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: 'en',
  setLanguage: language => set({ language }),
  toggleLanguage: () =>
    set({ language: get().language === 'en' ? 'ms' : 'en' }),
}));

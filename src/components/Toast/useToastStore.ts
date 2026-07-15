import { create } from 'zustand';

const VISIBLE_MS = 2200;

interface ToastState {
  /** The message currently being shown, or null when hidden. */
  message: string | null;
  /** Show a toast; auto-hides after a short delay. */
  show: (message: string) => void;
  /** Hide the toast immediately. */
  hide: () => void;
}

let hideTimer: ReturnType<typeof setTimeout> | null = null;

export const useToastStore = create<ToastState>(set => ({
  message: null,
  show: message => {
    if (hideTimer) {
      clearTimeout(hideTimer);
    }
    set({ message });
    hideTimer = setTimeout(() => set({ message: null }), VISIBLE_MS);
  },
  hide: () => {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
    set({ message: null });
  },
}));

/** Show a toast from anywhere, including non-React code (event handlers). */
export function showToast(message: string): void {
  useToastStore.getState().show(message);
}

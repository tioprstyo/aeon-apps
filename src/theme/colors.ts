export const colors = {
  primary: '#2563EB', // brand blue
  primaryDark: '#1D4ED8',
  primaryLight: '#E7EEFE', // tint for selected chips / icon circles

  background: '#F5F6F8', // app / screen background
  surface: '#FFFFFF', // cards & sheets
  surfaceMuted: '#F1F2F5', // segmented control track, inset fields
  border: '#ECECF1',

  text: '#16181D',
  textSecondary: '#6B7280',
  textMuted: '#9AA0AA',
  textInverse: '#FFFFFF',

  // Transaction direction accents
  incoming: '#16A34A',
  incomingSurface: '#E7F6EC',
  outgoing: '#EA580C',
  outgoingSurface: '#FDEDE3',

  success: '#16A34A',
  warning: '#EA580C',
  error: '#DC2626',
  info: '#2563EB',

  transparent: 'transparent',
} as const;

export type ColorName = keyof typeof colors;

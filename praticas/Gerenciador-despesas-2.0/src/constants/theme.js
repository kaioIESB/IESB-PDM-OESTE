import { Platform } from 'react-native';

export const lightColors = {
  background: '#F2F4F8',
  card: '#FFFFFF',
  text: '#1B1F2A',
  textSecondary: '#6B7280',
  primary: '#4F46E5',
  onPrimary: '#FFFFFF',
  border: '#D9DEE7',
  error: '#DC2626',
  inputBackground: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.4)',
};

export const darkColors = {
  background: '#0F1117',
  card: '#1C1F2B',
  text: '#F3F4F6',
  textSecondary: '#9CA3AF',
  primary: '#818CF8',
  onPrimary: '#0F1117',
  border: '#2E3345',
  error: '#F87171',
  inputBackground: '#242836',
  overlay: 'rgba(0, 0, 0, 0.6)',
};

// Recebe o valor de useColorScheme() e devolve a paleta correspondente.
export function getColors(scheme) {
  return scheme === 'dark' ? darkColors : lightColors;
}

// Sombra adaptada por plataforma (iOS: shadow*, Android: elevation, web: boxShadow).
export const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  android: {
    elevation: 3,
  },
  default: {
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.18)',
  },
});

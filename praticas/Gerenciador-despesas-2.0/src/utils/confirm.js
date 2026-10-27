import { Alert, Platform } from 'react-native';

// No celular usa Alert.alert (Cancelar/Excluir); na web o Alert.alert não
// exibe nada, então usamos window.confirm.
export function confirmDestructive({ title, message, confirmText = 'Excluir', onConfirm }) {
  if (Platform.OS === 'web') {
    if (window.confirm(`${title}\n\n${message}`)) {
      onConfirm();
    }
    return;
  }

  Alert.alert(title, message, [
    { text: 'Cancelar', style: 'cancel' },
    { text: confirmText, style: 'destructive', onPress: onConfirm },
  ]);
}
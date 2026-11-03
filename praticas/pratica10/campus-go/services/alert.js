import { Alert, Platform } from 'react-native';

export function showAlert(title, message, buttons) {
  if (Platform.OS === 'web') {
    window.alert(message ? `${title}\n${message}` : title);
    return;
  }
  Alert.alert(title, message, buttons);
}
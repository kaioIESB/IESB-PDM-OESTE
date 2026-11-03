import * as ImagePicker from 'expo-image-picker';
import { Linking } from 'react-native';
import { showAlert } from './alert';

export async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 0.7,
  });
  return result.canceled ? null : result.assets[0].uri;
}

export async function takePhoto() {
  const { granted } = await ImagePicker.requestCameraPermissionsAsync();
  if (!granted) {
    showAlert('Permissão negada', 'Libere a câmera.', [
      { text: 'Agora não', style: 'cancel' },
      { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
    ]);
    return null;
  }
  const shot = await ImagePicker.launchCameraAsync({ quality: 0.7 });
  return shot.canceled ? null : shot.assets[0].uri;
}
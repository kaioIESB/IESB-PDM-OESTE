import { useEffect, useState } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pickImage, takePhoto } from '../../services/media';

const PHOTO_KEY = '@profile-photo';

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState(null);
  const avatar = photoUri ? { uri: photoUri } : require('../../assets/icon.png');

  // Ao abrir a tela, recupera a foto salva
  useEffect(() => {
    AsyncStorage.getItem(PHOTO_KEY).then((saved) => {
      if (saved) setPhotoUri(saved);
    });
  }, []);

  // Atualiza a tela e salva a URI no armazenamento
  async function savePhoto(uri) {
    if (!uri) return;
    setPhotoUri(uri);
    await AsyncStorage.setItem(PHOTO_KEY, uri);
  }

  return (
    <View style={styles.screen}>
      <Pressable onPress={async () => savePhoto(await pickImage())}>
        <Image source={avatar} style={styles.avatar} />
      </Pressable>
      <Text style={styles.name}>Seu Nome</Text>
      <Button title="Galeria" onPress={async () => savePhoto(await pickImage())} />
      <Button title="Câmera" onPress={async () => savePhoto(await takePhoto())} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  name: { fontSize: 18, fontWeight: 'bold' },
});
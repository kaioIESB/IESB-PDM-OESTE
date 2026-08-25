import { title } from './util.js';
import titulo_padrao from './util.js';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, TextInput, StyleSheet } from 'react-native';
import {rotulo_input_meta, rotulo_btn_cadastro_meta, rotulo_listas_metas} from './mensagem.js';

export default function App() {
  return (
    <View style={styles.mainContainer}>
      <TextInput placeholder={rotulo_input_meta} />
      <Button title={rotulo_btn_cadastro_meta} />
      <Text>{rotulo_listas_metas}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {padding: 30 }

});

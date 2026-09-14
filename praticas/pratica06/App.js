import { useState, useEffect } from 'react';
import { View, Text, Image, Alert, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { tituloApp, placeholderCompromisso, botaoAdicionar, tituloLista, listaVazia } from './labels';
import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

const CHAVE_STORAGE = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await AsyncStorage.getItem(CHAVE_STORAGE);
        if (dados) setCompromissos(JSON.parse(dados));
      } catch (erro) {
        Alert.alert('Erro', 'Não foi possível carregar seus compromissos.');
      }
    }
    carregar();
  }, []);

  useEffect(() => {
    async function salvar() {
      try {
        await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(compromissos));
      } catch (erro) {
        Alert.alert('Erro', 'Não foi possível salvar seus compromissos.');
      }
    }
    salvar();
  }, [compromissos]);

  function adicionarCompromisso() {
    if (texto.trim() === '') {
      Alert.alert('Atenção', 'Digite um compromisso antes de adicionar.');
      return;
    }
    const novo = {
      id: Date.now().toString(),
      texto: texto.trim(),
      criadoEm: new Date().toLocaleString(),
    };
    setCompromissos((atual) => [...atual, novo]);
    setTexto('');
  }

  function removerCompromisso(id) {
    setCompromissos((atual) => atual.filter((item) => item.id !== id));
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
          <Text style={styles.tituloApp}>{tituloApp}</Text>
        </View>

        <CompromissoInput
          value={texto}
          onChangeText={setTexto}
          onAdd={adicionarCompromisso}
          labels={{ placeholderCompromisso, botaoAdicionar }}
        />

        <CompromissoList
          itens={compromissos}
          onDelete={removerCompromisso}
          tituloLista={tituloLista}
          listaVazia={listaVazia}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  tituloApp: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
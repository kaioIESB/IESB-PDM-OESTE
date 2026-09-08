import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarMetas() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
        if (dadosSalvos !== null) {
          setMetas(JSON.parse(dadosSalvos));
        }
      } catch (erro) {
        Alert.alert(
          'Erro ao carregar',
          'Não foi possível carregar suas metas salvas.'
        );
        console.log('Erro ao carregar metas:', erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarMetas();
  }, []);

  useEffect(() => {
    if (carregando) return;

    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (erro) {
        Alert.alert(
          'Erro ao salvar',
          'Não foi possível salvar suas metas.'
        );
        console.log('Erro ao salvar metas:', erro);
      }
    }

    salvarMetas();
  }, [metas]);

  function adicionarMeta() {
    const textoLimpo = texto.trim();

    if (textoLimpo.length === 0) {
      Alert.alert('Campo vazio', 'Digite uma meta antes de adicionar.');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    setMetas((metasAtuais) => [...metasAtuais, novaMeta]);
    setTexto('');
  }

  function removerMeta(id) {
    setMetas((metasAtuais) => metasAtuais.filter((meta) => meta.id !== id));
  }

  function alternarConcluida(id) {
    setMetas((metasAtuais) =>
      metasAtuais.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  }

  const pendentes = metas.filter((m) => !m.concluida).length;
  const concluidas = metas.filter((m) => m.concluida).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('./assets/skull_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg')}
            style={styles.logo}
          />
          <View>
            <Text style={styles.titulo}>Metas do Semestre</Text>
            <Text style={styles.contador}>
              {pendentes} pendentes / {concluidas} concluídas
            </Text>
          </View>
        </View>

        <MetaInput
          value={texto}
          onChangeText={setTexto}
          onAdd={adicionarMeta}
        />

        <MetaList
          metas={metas}
          onDelete={removerMeta}
          onToggle={alternarConcluida}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contador: {
    fontSize: 13,
    color: '#666',
  },
});
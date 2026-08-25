import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Switch,
  StyleSheet,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import {
  titulo_app,
  placeholder_input,
  texto_botao,
  titulo_lista,
} from './labels';

// Lista estática por enquanto (sem lógica de adicionar de verdade)
const disciplinas = [
  'Análise e Desenvolvimento de Sistemas',
  'Estrutura de Dados',
  'Banco de Dados',
  'Programação para Dispositivos Móveis',
];

export default function App() {
  const [apenasObrigatorias, setApenasObrigatorias] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Cabeçalho */}
        <Text style={styles.titulo}>{titulo_app}</Text>

        {/* Linha de cadastro: TextInput (~70%) + Botão (~25-30%) */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder={placeholder_input}
          />
          <Pressable
            style={({ pressed }) => [
              styles.botaoPressable,
              pressed && styles.botaoPressionado,
            ]}
          >
            <Text style={styles.botaoTexto}>{texto_botao}</Text>
          </Pressable>
        </View>

        {/* Switch (desafio opcional) */}
        <View style={styles.switchRow}>
          <Text>Mostrar apenas obrigatórias</Text>
          <Switch
            value={apenasObrigatorias}
            onValueChange={setApenasObrigatorias}
          />
        </View>

        {/* Lista de disciplinas */}
        <Text style={styles.tituloLista}>{titulo_lista}</Text>
        <View style={styles.lista}>
          {disciplinas.map((disciplina, index) => (
            <View key={index} style={styles.item}>
              <Text>{disciplina}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ocupa toda a tela disponível
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // centraliza o título no cabeçalho
  },
  inputRow: {
    flexDirection: 'row', // input e botão lado a lado
    alignItems: 'center', // alinha verticalmente no centro da linha
    marginBottom: 20,
  },
  input: {
    width: '70%', // uso de largura percentual (%)
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  botaoPressable: {
    flex: 1, // uso de flex — ocupa o espaço restante (~25-30%)
    marginLeft: 8,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoPressionado: {
    backgroundColor: '#0b7dda', // tom mais escuro ao pressionar
    opacity: 0.8,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tituloLista: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  lista: {
    flex: 1, // permite que a lista cresça no espaço restante da tela
  },
  item: {
    backgroundColor: '#fff',
    padding: 12,
    margin: 6, // espaço entre os itens
    borderRadius: 6,
  },
});
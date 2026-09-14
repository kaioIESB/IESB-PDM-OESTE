import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

export default function CompromissoInput({ value, onChangeText, onAdd, labels }) {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder={labels.placeholderCompromisso}
        value={value}
        onChangeText={onChangeText}
      />
      <Pressable
        style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
        android_ripple={{ color: '#ccc' }}
        onPress={onAdd}
      >
        <Text style={styles.botaoTexto}>{labels.botaoAdicionar}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    width: '68%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  botao: {
    width: '28%',
    marginLeft: '4%',
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  botaoPressionado: {
    opacity: 0.7,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
import React from 'react';
import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';

export default function MetaList({ metas, onDelete, onToggle }) {
  if (metas.length === 0) {
    return (
      <View style={styles.vazioContainer}>
        <Text style={styles.vazioTexto}>
          Nenhuma meta cadastrada ainda. Adicione a primeira acima!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Pressable
            style={styles.textoArea}
            onPress={() => onToggle(item.id)}
            android_ripple={{ color: '#ddd' }}
          >
            <Text
              style={[
                styles.itemTexto,
                item.concluida && styles.itemConcluido,
              ]}
            >
              {item.texto}
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.botaoRemover,
              pressed && styles.botaoPressionado,
            ]}
            android_ripple={{ color: '#ffffff55' }}
            onPress={() => onDelete(item.id)}
          >
            <Text style={styles.botaoRemoverTexto}>Remover</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  vazioContainer: {
    padding: 24,
    alignItems: 'center',
  },
  vazioTexto: {
    color: '#888',
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  textoArea: {
    flex: 1,
  },
  itemTexto: {
    fontSize: 15,
  },
  itemConcluido: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  botaoRemover: {
    backgroundColor: '#e94b4b',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginLeft: 8,
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  botaoRemoverTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
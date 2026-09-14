import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

export default function CompromissoList({ itens, onDelete, tituloLista, listaVazia }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloLista}</Text>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.vazio}>{listaVazia}</Text>}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.item, pressed && styles.itemPressionado]}
            android_ripple={{ color: '#eee' }}
            onPress={() => onDelete(item.id)}
          >
            <Text style={styles.itemTexto}>{item.texto}</Text>
            <Text style={styles.itemData}>{item.criadoEm}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  vazio: {
    color: '#888',
    fontStyle: 'italic',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemPressionado: {
    backgroundColor: '#f2f2f2',
  },
  itemTexto: {
    fontSize: 15,
  },
  itemData: {
    fontSize: 11,
    color: '#999',
  },
});
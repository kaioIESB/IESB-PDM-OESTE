import { FlatList, StyleSheet, View, useWindowDimensions } from 'react-native';
import DespesaItem from './DespesaItem';
import DespesaSumario from './DespesaSumario';
import DespesaSaida from './DespesaSaida';

export default function DespesaLista({
  expenses,
  periodName,
  emptyMessage = 'Nenhuma despesa',
  emptyHint = 'Toque em + para adicionar.',
}) {
  // Bônus (layout responsivo): 2 colunas quando a largura passa de 600.
  const { width } = useWindowDimensions();
  const numColumns = width > 600 ? 2 : 1;

  return (
    <FlatList
      // O FlatList exige uma key nova quando numColumns muda.
      key={numColumns}
      data={expenses}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
      renderItem={({ item }) => (
        <View style={styles.cell}>
          <DespesaItem
            id={item.id}
            description={item.description}
            amount={item.amount}
            date={item.date}
            category={item.category}
          />
        </View>
      )}
      ListHeaderComponent={<DespesaSumario expenses={expenses} periodName={periodName} />}
      ListEmptyComponent={<DespesaSaida message={emptyMessage} hint={emptyHint} />}
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  row: {
    gap: 12,
  },
  cell: {
    flex: 1,
  },
});
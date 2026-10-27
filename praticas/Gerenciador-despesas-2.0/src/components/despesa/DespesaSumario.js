import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { getColors } from '../../constants/theme';

export default function DespesaSumario({ expenses, periodName }) {
  const colors = getColors(useColorScheme());

  // Soma com .reduce(), sempre sobre a lista que está sendo exibida
  // (por isso o total acompanha a busca e os filtros).
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const count = expenses.length;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View>
        <Text style={[styles.period, { color: colors.textSecondary }]}>{periodName}</Text>
        <Text style={[styles.count, { color: colors.text }]}>
          {count} {count === 1 ? 'despesa' : 'despesas'}
        </Text>
      </View>
      <Text style={[styles.total, { color: colors.primary }]}>
        {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  period: {
    fontSize: 13,
    marginBottom: 2,
  },
  count: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
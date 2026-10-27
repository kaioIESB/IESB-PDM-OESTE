import { useMemo } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import DespesaLista from '../components/despesa/DespesaLista';
import { getColors } from '../constants/theme';
import { useExpenses } from '../store/expenses-context';
import { toDateString } from '../utils/date';

export default function DespesasRecentes() {
  const colors = getColors(useColorScheme());
  const { expenses } = useExpenses();

  // Apenas as despesas dos últimos 7 dias, calculadas a partir do contexto.
  const recentExpenses = useMemo(() => {
    const limit = new Date();
    limit.setDate(limit.getDate() - 7);
    const limitString = toDateString(limit);
    return expenses.filter((expense) => expense.date >= limitString);
  }, [expenses]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <DespesaLista
        expenses={recentExpenses}
        periodName="Últimos 7 dias"
        emptyMessage="Nenhuma despesa recente"
        emptyHint="Toque em + para adicionar."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
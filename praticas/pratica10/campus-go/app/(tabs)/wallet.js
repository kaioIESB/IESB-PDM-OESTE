import { Button, Share, StyleSheet, Text, View } from 'react-native';
import { useExpenses } from '../../store/expenses-context';
import { showAlert } from '../../services/alert';

export default function WalletScreen() {
  const { expenses } = useExpenses();

  const total = (expenses ?? []).reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  async function shareSummary() {
    const message = `Gastei R$ ${total.toFixed(2)} neste semestre.`;
    try {
      await Share.share({ message });
    } catch (e) {
      showAlert('Compartilhar', message);
    }
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.label}>Total gasto</Text>
      <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
      <Button title="Compartilhar resumo" onPress={shareSummary} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
  label: { fontSize: 16, color: '#666' },
  total: { fontSize: 32, fontWeight: 'bold' },
});
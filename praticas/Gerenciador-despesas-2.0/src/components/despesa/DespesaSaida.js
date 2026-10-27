import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getColors } from '../../constants/theme';

// Estado vazio da lista: ícone + mensagem + orientação.
export default function DespesaSaida({ message, hint }) {
  const colors = getColors(useColorScheme());

  return (
    <View style={styles.container}>
      <Ionicons name="wallet-outline" size={56} color={colors.textSecondary} />
      <Text style={[styles.message, { color: colors.text }]}>{message}</Text>
      <Text style={[styles.hint, { color: colors.textSecondary }]}>{hint}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },
  hint: {
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
});
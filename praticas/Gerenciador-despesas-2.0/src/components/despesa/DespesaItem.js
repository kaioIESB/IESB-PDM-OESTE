import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cardShadow, getColors } from '../../constants/theme';

export default function DespesaItem({ id, description, amount, date, category }) {
  const navigation = useNavigation();
  const colors = getColors(useColorScheme());

  // Ao tocar, abre a tela de edição enviando o id pela rota.
  function handlePress() {
    navigation.navigate('GerenciarDespesa', { expenseId: id });
  }

  // A data é guardada como AAAA-MM-DD; aqui só exibimos como DD/MM/AAAA.
  const formattedDate = date.split('-').reverse().join('/');
  const formattedAmount = Number(amount).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.card },
        cardShadow,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.info}>
        <Text style={[styles.description, { color: colors.text }]} numberOfLines={1}>
          {description}
        </Text>
        <Text style={[styles.meta, { color: colors.textSecondary }]}>
          {formattedDate} · {category}
        </Text>
      </View>
      <View style={[styles.amountBox, { backgroundColor: colors.primary }]}>
        <Text style={[styles.amount, { color: colors.onPrimary }]}>{formattedAmount}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 10,
    marginVertical: 6,
  },
  pressed: {
    opacity: 0.7,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  meta: {
    fontSize: 13,
  },
  amountBox: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  amount: {
    fontWeight: 'bold',
  },
});
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaLista from '../components/despesa/DespesaLista';
import { CATEGORIES } from '../constants/categories';
import { getColors } from '../constants/theme';
import { useDebounce } from '../hooks/useDebounce';
import { useExpenses } from '../store/expenses-context';
import { confirmDestructive } from '../utils/confirm';

export default function TodasDespesas() {
  const colors = getColors(useColorScheme());
  const { expenses, clearExpenses } = useExpenses();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const debouncedSearch = useDebounce(search, 300);

  // Busca por descrição (sem diferenciar maiúsculas/minúsculas) combinada
  // com o filtro de categoria. O total do sumário usa esta lista filtrada.
  const filteredExpenses = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    return expenses.filter((expense) => {
      const matchesText = expense.description.toLowerCase().includes(term);
      const matchesCategory = !selectedCategory || expense.category === selectedCategory;
      return matchesText && matchesCategory;
    });
  }, [expenses, debouncedSearch, selectedCategory]);

  function handleClearAll() {
    confirmDestructive({
      title: 'Limpar tudo',
      message: 'Isso apaga todas as despesas. Deseja continuar?',
      confirmText: 'Limpar',
      onConfirm: clearExpenses,
    });
  }

  const hasExpenses = expenses.length > 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.toolbar}>
        <View
          style={[
            styles.searchBox,
            { backgroundColor: colors.inputBackground, borderColor: colors.border },
          ]}
        >
          <Ionicons name="search" size={18} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Buscar por descrição"
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
          {[null, ...CATEGORIES].map((category) => {
            const selected = category === selectedCategory;
            return (
              <Pressable
                key={category ?? 'todas'}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: selected ? colors.primary : colors.card,
                    borderColor: selected ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text style={{ color: selected ? colors.onPrimary : colors.text }}>
                  {category ?? 'Todas'}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {hasExpenses && (
          <Pressable onPress={handleClearAll} style={styles.clearButton}>
            <Ionicons name="trash-outline" size={16} color={colors.error} />
            <Text style={[styles.clearText, { color: colors.error }]}>Limpar tudo</Text>
          </Pressable>
        )}
      </View>

      <DespesaLista
        expenses={filteredExpenses}
        periodName="Todas as despesas"
        emptyMessage={hasExpenses ? 'Nenhum resultado' : 'Nenhuma despesa'}
        emptyHint={
          hasExpenses ? 'Tente outro termo ou categoria.' : 'Toque em + para adicionar.'
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 8,
    fontSize: 16,
  },
  chips: {
    marginTop: 10,
    flexGrow: 0,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  clearText: {
    marginLeft: 4,
    fontSize: 13,
  },
});
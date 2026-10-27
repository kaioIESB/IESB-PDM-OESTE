import { useLayoutEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../constants/categories';
import { getColors } from '../constants/theme';
import { useExpenses } from '../store/expenses-context';
import { confirmDestructive } from '../utils/confirm';
import { toDateString } from '../utils/date';

const AMOUNT_REGEX = /^\d*\.?\d{0,2}$/;

// Devolve um objeto com uma mensagem para cada campo inválido.
function validate(values) {
  const errors = {};

  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }

  const amount = parseFloat(values.amount);
  if (isNaN(amount) || amount <= 0) {
    errors.amount = 'O valor deve ser maior que zero.';
  }

  if (!values.date) {
    errors.date = 'Informe a data.';
  } else if (values.date > toDateString(new Date())) {
    errors.date = 'A data não pode ser futura.';
  }

  if (!values.category) {
    errors.category = 'Selecione uma categoria.';
  }

  return errors;
}

// Rótulo + campo + mensagem de erro logo abaixo.
function Field({ label, error, colors, children }) {
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      {children}
      {error ? <Text style={[styles.error, { color: colors.error }]}>{error}</Text> : null}
    </View>
  );
}

export default function GerenciarDespesa({ route, navigation }) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();

  // Parâmetro de rota: se veio expenseId, estamos editando.
  const expenseId = route.params?.expenseId;
  const isEditing = Boolean(expenseId);
  const editedExpense = expenses.find((expense) => expense.id === expenseId);

  // Estado único do formulário; no modo edição já abre preenchido.
  const [form, setForm] = useState(() =>
    editedExpense
      ? {
          description: editedExpense.description,
          amount: String(editedExpense.amount),
          date: editedExpense.date,
          category: editedExpense.category,
        }
      : { description: '', amount: '', date: '', category: '' }
  );
  const [errors, setErrors] = useState({});
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

   function handleBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // Se a página foi recarregada direto nesta tela, não há histórico: vai para as abas.
      navigation.navigate('Tabs');
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
      headerLeft: () => (
        <Pressable onPress={handleBack} style={{ marginRight: 16 }}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
      ),
    });
  }, [navigation, isEditing, colors.text]);

  function handleChange(field, value) {
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);

    // Se o campo já mostrava erro, revalida só ele: a mensagem some ao corrigir.
    if (errors[field]) {
      const nextErrors = validate(nextForm);
      setErrors((current) => ({ ...current, [field]: nextErrors[field] }));
    }
  }

  // Máscara do valor: aceita só números com até 2 casas (vírgula vira ponto).
  function handleAmountChange(text) {
    const normalized = text.replace(',', '.');
    if (AMOUNT_REGEX.test(normalized)) {
      handleChange('amount', normalized);
    }
  }

  function handleSelectCategory(category) {
    handleChange('category', category);
    setCategoryModalVisible(false);
  }

  function handleSave() {
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };

    if (isEditing) {
      updateExpense(expenseId, data);
    } else {
      addExpense(data);
    }
    navigation.goBack();
  }

  function handleDelete() {
    confirmDestructive({
      title: 'Excluir despesa',
      message: 'Tem certeza que deseja excluir esta despesa?',
      confirmText: 'Excluir',
      onConfirm: () => {
        deleteExpense(expenseId);
        navigation.goBack();
      },
    });
  }

  function inputStyle(field) {
    return [
      styles.input,
      {
        backgroundColor: colors.inputBackground,
        color: colors.text,
        borderColor: errors[field] ? colors.error : colors.border,
      },
    ];
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Field label="Descrição" error={errors.description} colors={colors}>
          <TextInput
            style={inputStyle('description')}
            value={form.description}
            onChangeText={(text) => handleChange('description', text)}
            placeholder="Ex.: Almoço"
            placeholderTextColor={colors.textSecondary}
          />
        </Field>

        <Field label="Valor (R$)" error={errors.amount} colors={colors}>
          <TextInput
            style={inputStyle('amount')}
            value={form.amount}
            onChangeText={handleAmountChange}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor={colors.textSecondary}
          />
        </Field>

        <Field label="Data" error={errors.date} colors={colors}>
          {/* App só para web: usamos o seletor de data nativo do navegador. */}
          <input
            type="date"
            value={form.date}
            onChange={(event) => handleChange('date', event.target.value)}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: 12,
              fontSize: 16,
              fontFamily: 'inherit',
              borderRadius: 8,
              border: `1px solid ${errors.date ? colors.error : colors.border}`,
              backgroundColor: colors.inputBackground,
              color: colors.text,
              colorScheme: scheme === 'dark' ? 'dark' : 'light',
            }}
          />
        </Field>

        <Field label="Categoria" error={errors.category} colors={colors}>
          <Pressable
            style={[inputStyle('category'), styles.selectButton]}
            onPress={() => setCategoryModalVisible(true)}
          >
            <Text style={{ color: form.category ? colors.text : colors.textSecondary }}>
              {form.category || 'Selecione uma categoria'}
            </Text>
            <Ionicons name="chevron-down" size={18} color={colors.textSecondary} />
          </Pressable>
        </Field>

        <Pressable
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSave}
        >
          <Text style={[styles.saveText, { color: colors.onPrimary }]}>Salvar</Text>
        </Pressable>

        {isEditing && (
          <Pressable
            style={[styles.deleteButton, { borderColor: colors.error }]}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={18} color={colors.error} />
            <Text style={[styles.deleteText, { color: colors.error }]}>Excluir</Text>
          </Pressable>
        )}
      </ScrollView>

      <Modal
        visible={categoryModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <Pressable
          style={[styles.overlay, { backgroundColor: colors.overlay }]}
          onPress={() => setCategoryModalVisible(false)}
        >
          <View style={[styles.sheet, { backgroundColor: colors.card }]}>
            <Text style={[styles.sheetTitle, { color: colors.text }]}>
              Selecione a categoria
            </Text>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                style={[styles.option, { borderBottomColor: colors.border }]}
                onPress={() => handleSelectCategory(category)}
              >
                <Text
                  style={{
                    color: category === form.category ? colors.primary : colors.text,
                    fontWeight: category === form.category ? 'bold' : 'normal',
                  }}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  error: {
    fontSize: 13,
    marginTop: 4,
  },
  saveButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
  },
  deleteText: {
    marginLeft: 6,
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  option: {
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
});
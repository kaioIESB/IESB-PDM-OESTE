import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';

const ExpensesContext = createContext(null);

// Sempre devolve um NOVO array (sem push, splice ou mutação direta).
export function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id
          ? { ...expense, ...action.payload.data }
          : expense
      );
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'SET':
      return Array.isArray(action.payload) ? [...action.payload] : [];
    default:
      return state;
  }
}

function generateId() {
  return Date.now().toString() + Math.random().toString(36).slice(2, 7);
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega os dados salvos ao iniciar.
  useEffect(() => {
    async function loadExpenses() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          dispatch({ type: 'SET', payload: JSON.parse(stored) });
        }
      } catch (error) {
        console.error('Erro ao carregar despesas:', error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadExpenses();
  }, []);

  // Salva a cada alteração, mas só depois do carregamento inicial
  // (evita sobrescrever os dados salvos com a lista vazia).
  useEffect(() => {
    if (!isLoaded) return;

    async function saveExpenses() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.error('Erro ao salvar despesas:', error);
      }
    }
    saveExpenses();
  }, [expenses, isLoaded]);

  function addExpense({ description, amount, date, category }) {
    dispatch({
      type: 'ADD',
      payload: { id: generateId(), description, amount, date, category },
    });
  }

  function updateExpense(id, data) {
    dispatch({ type: 'UPDATE', payload: { id, data } });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function clearExpenses() {
    dispatch({ type: 'SET', payload: [] });
  }

  const value = { expenses, isLoaded, addExpense, updateExpense, deleteExpense, clearExpenses };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

// Hook que avisa claramente se for usado fora do Provider.
export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (context === null) {
    throw new Error('useExpenses deve ser usado dentro de um ExpensesContextProvider.');
  }
  return context;
}
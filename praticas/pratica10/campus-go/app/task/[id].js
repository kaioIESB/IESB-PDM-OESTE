import { router, useLocalSearchParams } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function TaskDetails() {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Tarefa número {id}</Text>
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  title: { fontSize: 20, fontWeight: 'bold' },
});
import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function NewTaskScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Nova tarefa</Text>
      <Button title="Fechar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  title: { fontSize: 20, fontWeight: 'bold' },
});
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';
import { showAlert } from '../../services/alert';

export default function TasksScreen() {
  const [label, setLabel] = useState('Sem check-in');

  async function handleCheckIn() {
    try {
      const place = await getCurrentPlace();
      if (!place) {
        showAlert('Sem localização', 'Permissão negada.');
        return;
      }
      setLabel(place.label);
    } catch (e) {
      showAlert('Sem localização', 'Não foi possível obter sua posição.');
    }
  }

  async function handleReminder() {
    try {
      const ok = await scheduleReminder('Estudar', 10);
      if (!ok) showAlert('Sem permissão', 'Libere as notificações.');
    } catch (e) {
      showAlert('Erro', 'Não foi possível agendar o lembrete.');
    }
  }

  async function handleComplete() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}
    showAlert('Tarefa concluída');
  }

  return (
    <View style={styles.screen}>
      <Link href="/new-task" style={styles.link}>+ Nova tarefa</Link>
      <Link href="/task/42" style={styles.link}>Abrir tarefa 42</Link>
      <Button title="Ver perfil" onPress={() => router.push('/profile')} />

      <Button title="Estudei aqui" onPress={handleCheckIn} />
      <Text>{label}</Text>

      <Button title="Lembrar em 10 s" onPress={handleReminder} />
      <Button title="Concluir" onPress={handleComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 14 },
  link: { fontSize: 16, color: '#4757B8' },
});
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useNotices } from '../../hooks/useNotices';
import { FadeIn } from '../../components/FadeIn';

export default function HomeScreen() {
  const { notices, isLoading, error, reload } = useNotices();

  // Estado 1: carregando
  if (isLoading && notices.length === 0) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  // Estado 2: erro
  if (error) {
    return (
      <View style={styles.center}>
        <Text>Não foi possível carregar: {error}</Text>
        <Button title="Tentar novamente" onPress={reload} />
      </View>
    );
  }

  // Estado 3: sucesso
  return (
    <FlatList
      data={notices}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <NoticeCard notice={item} />}
      refreshing={isLoading}
      onRefresh={reload}
      ListEmptyComponent={<Text style={styles.empty}>Nenhum aviso.</Text>}
      contentContainerStyle={{ padding: 16, gap: 12 }}
    />
  );
}

function NoticeCard({ notice }) {
  return (
    <FadeIn>
      <View style={styles.card}>
        <Text style={styles.title}>{notice.title}</Text>
        <Text numberOfLines={2}>{notice.body}</Text>
      </View>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, padding: 24 },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 10, elevation: 2 },
  title: { fontWeight: 'bold', marginBottom: 4 },
  empty: { textAlign: 'center', marginTop: 32 },
});
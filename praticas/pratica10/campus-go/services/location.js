import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;

  const { coords } = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
  const [address] = await Location.reverseGeocodeAsync({
    latitude: coords.latitude,
    longitude: coords.longitude,
  });

  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
        label: address
      ? [address.street, address.district, address.city].filter(Boolean).join(', ') ||
        'Local desconhecido'
      : 'Local desconhecido',
  };
}
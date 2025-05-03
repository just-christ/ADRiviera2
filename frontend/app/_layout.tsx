import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../src/services/authService'; 
import { ActivityIndicator, View } from 'react-native';

export default function Layout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false); // ✅ Évite les re-renders inutiles
  const router = useRouter(); 

  useEffect(() => {
    if (initialized) return; // ✅ Empêche une exécution multiple

    const checkAuth = async () => {
      try {
        const userData = await getUserInfo(); // Récupérer l'utilisateur depuis AsyncStorage
        setUser(userData);

        if (userData) {
          router.replace('/(tabs)'); 
        } else {
          router.replace('/(auth)/login');
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'utilisateur :", error);
      } finally {
        setLoading(false);
        setInitialized(true); // ✅ Marquer comme terminé
      }
    };

    checkAuth();
  }, []); // ✅ Exécuté une seule fois

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/otherInfo" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

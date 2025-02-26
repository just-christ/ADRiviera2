import { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import LoginScreen from './login';

export default function AuthIndex() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'Connexion' }); // Change le titre
  }, [navigation]);

  return <LoginScreen />;
}

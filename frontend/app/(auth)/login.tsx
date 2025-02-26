import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import { login } from '../../src/services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await login({ email, password });
  
      console.log("Réponse de l'API :", response); // 🔍 Debug API
  
      if (!response?.token) {
        Alert.alert('Erreur', "Token non reçu !");
        return;
      }
  
      await AsyncStorage.setItem('userToken', response.token);
      Alert.alert('Succès', 'Connexion réussie !');
      router.push('/(tabs)');
    } catch (error: any) {
      console.log("Données envoyées :", { email, password });
  
      if (error.response) {
        console.error("Erreur Backend :", error.response.data); // 🔍 Debug
        Alert.alert('Erreur', error.response.data.message || "Erreur serveur !");
      } else if (error.request) {
        console.error("Aucune réponse reçue :", error.request); // 🔍 Debug
        Alert.alert('Erreur', "Aucune réponse du serveur !");
      } else {
        console.error("Erreur inconnue :", error.message); // 🔍 Debug
        Alert.alert('Erreur', "Une erreur inconnue est survenue !");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Se connecter</Text>}
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => router.push('/(auth)/register')}>
        Pas de compte ? S'inscrire
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#aaa',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 16,
    color: '#007BFF',
    textAlign: 'center',
    fontSize: 16,
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { register } from '../../src/services/authService';
import { useRouter } from 'expo-router'; // Utilisation de useRouter()

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Récupération du router

  const handleRegister = async () => {
    try {
      await register({ name, email, password, role: 'member' });
      Alert.alert('Succès', 'Inscription réussie !');
      router.push('/(auth)/login'); // Rediriger vers la connexion après l'inscription
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erreur', error.message || 'Une erreur est survenue');
      } else {
        Alert.alert('Erreur', 'Une erreur inconnue est survenue');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="S'inscrire" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => router.push('/(auth)/login')}>
        Déjà un compte ? Se connecter
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  link: {
    marginTop: 16,
    color: 'blue',
    textAlign: 'center',
  },
});

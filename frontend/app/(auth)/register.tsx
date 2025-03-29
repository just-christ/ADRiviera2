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
import { register } from '../../src/services/authService';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert("Erreur", "Tous les champs sont requis.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Erreur", "Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    setLoading(true);

    try {
      const fullName = `${firstName} ${lastName}`.trim();
      await register({ 
        name: fullName, 
        email, 
        password, 
        role: 'member' 
      });
      
      Alert.alert('Succès', 'Inscription réussie !');
      router.replace('/(auth)/login');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erreur inconnue';
      Alert.alert('Erreur', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom"
        placeholderTextColor="#94a3b8"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Prénoms"
        placeholderTextColor="#94a3b8"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Adresse email"
        placeholderTextColor="#94a3b8"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe (8 caractères min)"
        placeholderTextColor="#94a3b8"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleRegister} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>S'inscrire</Text>
        )}
      </TouchableOpacity>

      <Text 
        style={styles.link} 
        onPress={() => router.push('/(auth)/login')}
      >
        Déjà un compte ? Se connecter
      </Text>
    </View>
  );
}

// Styles identiques à login.tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 28,
    marginBottom: 32,
    textAlign: 'center',
    color: '#2563eb',
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderColor: '#cbd5e1',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  link: {
    marginTop: 24,
    color: '#2563eb',
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
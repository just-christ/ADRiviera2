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
import { useRouter } from 'expo-router';
import { register } from '../../src/services/authService';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async () => {
    const missingFields = [];
    if (!firstName) missingFields.push('Nom');
    if (!lastName) missingFields.push('Prénom');
    if (!email) missingFields.push('Email');
    if (!password) missingFields.push('Mot de passe');
    if (!contact) missingFields.push('Contact');

    if (missingFields.length > 0) {
      Alert.alert("Champs manquants", `Veuillez remplir : ${missingFields.join(', ')}`);
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Email invalide", "Veuillez entrer une adresse email valide");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Mot de passe faible", "Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    setLoading(true);

    try {
      await register({ 
        firstName, 
        lastName,
        email,
        password,
        contact
      });
      
      router.push('/(auth)/otherInfo');
    } catch (error) {
      Alert.alert("Erreur", error instanceof Error ? error.message : "Une erreur inconnue s'est produite");
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
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Prénom"
        placeholderTextColor="#94a3b8"
        value={lastName}
        onChangeText={setLastName}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#94a3b8"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Téléphone"
        placeholderTextColor="#94a3b8"
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
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
          <Text style={styles.buttonText}>Continuer</Text>
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
  },
});
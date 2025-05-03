import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  Switch,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { updateUserProfile } from '../../src/services/authService';
import DateTimePicker, {
  DateTimePickerEvent
} from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OtherInfoScreen() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState(new Date());
  const [isChurchMember, setIsChurchMember] = useState(false);
  const [isBaptized, setIsBaptized] = useState(false);
  const [baptismDate, setBaptismDate] = useState<Date | null>(null);
  const [gender, setGender] = useState<'M' | 'F' | ''>('');
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState<'birth' | 'baptism' | null>(null);

  useEffect(() => {
    const loadUserId = async () => {
      const id = await AsyncStorage.getItem('currentUserId');
      if (!id) router.replace('/(auth)/register');
      setUserId(id);
    };
    loadUserId();
  }, []);

  // Signature conforme à l'API DateTimePicker
  const handleDateChange = (
    event: DateTimePickerEvent,
    date?: Date
  ) => {
    setShowDatePicker(null);
    if (!date) return;  // annulation du picker

    if (showDatePicker === 'birth') {
      setBirthDate(date);
    } else if (showDatePicker === 'baptism') {
      setBaptismDate(date);
    }
  };

  const handleSubmit = async () => {
    if (!gender) {
      Alert.alert("Erreur", "Veuillez sélectionner votre genre");
      return;
    }
    if (!userId) {
      Alert.alert("Erreur", "Session invalide");
      return;
    }

    setLoading(true);

    try {
      await updateUserProfile(userId, {
        // Si vous voulez gérer le nom ailleurs, sinon back ignore
        firstName: '',    
        lastName: '',     
        gender,
        birthDate,
        isChurchMember,
        isBaptized,
        baptismDate: isBaptized ? baptismDate : null,
        baptismLocation: "Église locale",
        // Ajouter contact si besoin
        contact: ''       
      });

      Alert.alert("Succès", "Profil complété avec succès!");
      router.replace('../(tabs)/index');
    } catch (error) {
      Alert.alert("Erreur", error instanceof Error ? error.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Complétez votre profil</Text>

      {/* Genre */}
      <View style={styles.section}>
        <Text style={styles.label}>Genre *</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'M' && styles.selectedGender]}
            onPress={() => setGender('M')}
          >
            <Text style={gender === 'M' ? styles.selectedGenderText : styles.genderText}>
              Homme
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'F' && styles.selectedGender]}
            onPress={() => setGender('F')}
          >
            <Text style={gender === 'F' ? styles.selectedGenderText : styles.genderText}>
              Femme
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Date de naissance */}
      <View style={styles.section}>
        <Text style={styles.label}>Date de naissance *</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDatePicker('birth')}
        >
          <Text style={styles.dateText}>{birthDate.toLocaleDateString('fr-FR')}</Text>
          <MaterialIcons name="event" size={24} color="#2563eb" />
        </TouchableOpacity>
      </View>

      {/* Membre de l'église */}
      <View style={styles.section}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Membre de l'église ?</Text>
          <Switch
            value={isChurchMember}
            onValueChange={setIsChurchMember}
            trackColor={{ true: '#2563eb' }}
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Baptisé ?</Text>
          <Switch
            value={isBaptized}
            onValueChange={setIsBaptized}
            trackColor={{ true: '#2563eb' }}
            disabled={!isChurchMember}
          />
        </View>
      </View>

      {/* Date de baptême */}
      {isBaptized && (
        <View style={styles.section}>
          <Text style={styles.label}>Date de baptême</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker('baptism')}
            disabled={!isBaptized}
          >
            <Text style={styles.dateText}>
              {baptismDate ? baptismDate.toLocaleDateString('fr-FR') : 'Sélectionner une date'}
            </Text>
            <MaterialIcons name="event" size={24} color="#2563eb" />
          </TouchableOpacity>
        </View>
      )}

      {/* DateTimePicker avec style visible */}
      {showDatePicker && (
        <DateTimePicker
          value={showDatePicker === 'birth' ? birthDate : baptismDate || new Date()}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          style={{ backgroundColor: 'white' }}     // fond clair
          textColor="#000"                       // texte noir sur Android
          themeVariant="light"                   // thème clair sur iOS
        />
      )}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Terminer l'inscription</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    backgroundColor: '#f0f4f8',
    marginTop: 30,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    marginBottom: 32,
    textAlign: 'center',
    color: '#2563eb',
    fontWeight: '600',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 12,
    color: '#1e293b',
    fontWeight: '500',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    alignItems: 'center',
  },
  selectedGender: {
    backgroundColor: '#dbeafe',
    borderColor: '#2563eb',
  },
  genderText: {
    color: '#64748b',
  },
  selectedGenderText: {
    color: '#2563eb',
    fontWeight: '500',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  dateText: {
    fontSize: 16,
    color: '#1e293b',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: '#1e293b',
  },
  submitButton: {
    backgroundColor: '#2563eb',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
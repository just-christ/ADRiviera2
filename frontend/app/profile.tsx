import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const COLORS = {
  black: '#000000',
  primary: '#2563eb'
};

const LOGO_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLKI40qlQ4_22IVPjTOvXjkCSGO4aDCG9TITGaTC3PwbyshmBxVQxNh1zjsOu5K6QAOd4&usqp=CAU';

export default function Profile() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
            source={{ uri: LOGO_URL }} 
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>AD Riviéra 2</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.replace('/(tabs)')} // Retour au menu principal
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Contenu profil */}
      <View style={styles.content}>
        <Text style={styles.title}>Mon Profil</Text>
        {/* Ton contenu ici */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    paddingTop: 40, // Ajuste selon ta barre de status
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  logo: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    marginLeft: 60, // Compensation logo
    marginRight: 60, // Compensation bouton
  },
  backButton: {
    width: 40,
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 20,
  },
});
import { Tabs } from 'expo-router';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const COLORS = {
  black: '#000000',
  primary: '#2563eb',
  inactive: '#64748b'
};

const LOGO_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLKI40qlQ4_22IVPjTOvXjkCSGO4aDCG9TITGaTC3PwbyshmBxVQxNh1zjsOu5K6QAOd4&usqp=CAU';

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.inactive,
        headerTitle: () => (
          <View style={styles.headerContainer}>
            <Image 
              source={{ uri: LOGO_URL }} 
              style={styles.logo}
            />
            <Text style={styles.title}>AD Riviéra 2</Text>
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.push('../profile')}
          >
            <FontAwesome name="user-circle" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        ),
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#ffffff',
          elevation: 0, // Supprime l'ombre sous le header sur Android
          shadowOpacity: 0, // Supprime l'ombre sous le header sur iOS
        },
        headerLeft: () => null, // Supprime tout espace à gauche
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groupes',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="group" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="annonce"
        options={{
          title: 'Annonces',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="megaphone" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Événements',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: -80, // Collé au bord gauche
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    textAlign: 'center',
  },
  profileButton: {
    marginRight: 16,
  },
});
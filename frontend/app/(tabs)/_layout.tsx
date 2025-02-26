import { Tabs } from 'expo-router';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        headerTitle: 'AD Riviéra 2', // Ajoute le titre en haut
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          headerTitle: 'AD Riviéra 2', // Assure que chaque écran affiche bien le titre
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groupes',
          headerTitle: 'AD Riviéra 2',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="group" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="annonce"
        options={{
          title: 'Annonces',
          headerTitle: 'AD Riviéra 2',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="megaphone" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Événements',
          headerTitle: 'AD Riviéra 2',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          headerTitle: 'AD Riviéra 2',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

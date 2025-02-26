// app/(tabs)/groups.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getAnnouncements } from '../../src/services/apiService';

// Définir le type d'annonce
interface Annonce {
  id: number;
  title: string;
  content: string;
}

export default function AnnounceScreen() {
  // Spécifier le type de l'état
  const [annonce, setAnnonce] = useState<Annonce[]>([]);

  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        const data = await getAnnouncements();
        setAnnonce(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAnnonce();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Annonces</Text>
      <FlatList
        data={annonce}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.groupItem}>
            <Text style={styles.groupName}>{item.title}</Text>
            <Text style={styles.groupDescription}>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  groupItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  groupDescription: {
    fontSize: 14,
    color: '#666',
  },
});
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface Group {
  id: number;
  name: string;
  description: string;
}

const GroupsScreen = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  // Données temporaires (à remplacer par l'appel API)
  useEffect(() => {
    setGroups([
      {
        id: 1,
        name: "Accueil et Sécurité",
        description: "Chargé d'accueillir les fidèles et d'assurer leur sécurité lors des cultes et événements."
      },
      {
        id: 2,
        name: "École du Dimanche",
        description: "Enseignement biblique pour enfants, adolescents et jeunes avec méthodes adaptées."
      },
      {
        id: 3, 
        name: "Évangélisation",
        description: "Diffusion du message de l'Évangile dans la communauté locale et au-delà."
      },
      {
        id: 4,
        name: "Communication",
        description: "Production de contenus audiovisuels pour soutenir les activités de l'église."
      },
      {
        id: 5,
        name: "Intercession",
        description: "Prière continue pour l'église, ses membres et diverses causes."
      },
      {
        id: 6,
        name: "Couples & Familles",
        description: "Encadrement des couples mariés, familles et fiancés par des enseignements spécifiques."
      },
      {
        id: 7,
        name: "Jeunesse",
        description: "Croissance spirituelle et engagement communautaire des jeunes adultes."
      },
      {
        id: 8,
        name: "Femmes",
        description: "Activités spirituelles, sociales et de soutien mutuel pour les femmes."
      },
      {
        id: 9,
        name: "Hommes",
        description: "Formation des hommes pour être des ambassadeurs de l'Évangile."
      },
      {
        id: 10,
        name: "Technique",
        description: "Gestion de la sonorisation, éclairage et projections lors des événements."
      }
    ]);
  }, []);

  const handleLearnMore = (groupId: number) => {
    console.log("Voir détails du groupe", groupId);
    // Navigation vers détail du groupe
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des groupes et départements</Text>
      
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.groupCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="people" size={24} color={COLORS.primary} />
              <Text style={styles.groupName}>{item.name}</Text>
            </View>
            
            <Text style={styles.groupDescription}>{item.description}</Text>
            
            <TouchableOpacity 
              style={styles.learnMoreButton}
              onPress={() => handleLearnMore(item.id)}
            >
              <Text style={styles.learnMoreText}>En savoir plus</Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  groupCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    marginLeft: 10,
  },
  groupDescription: {
    color: COLORS.darkGray,
    lineHeight: 20,
    marginBottom: 15,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  learnMoreText: {
    color: COLORS.primary,
    fontWeight: '600',
    marginRight: 5,
  },
});

export default GroupsScreen;
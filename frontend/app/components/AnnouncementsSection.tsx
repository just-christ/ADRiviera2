import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS } from '../../constants/Colors';

const AnnouncementsSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Annonces</Text>

      {/* Annonce 1 : Retraite Spirituelle */}
      <TouchableOpacity 
        style={styles.announcementCard}
        onPress={() => Alert.alert("Retraite de l'Avent", "Détails complets")}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardDate}>15 Nov. 2025</Text>
          <View style={[styles.cardSideLine, {backgroundColor: COLORS.primary}]} />
        </View>
        <Text style={styles.cardTitle}>Retraite de l'Avent 2025</Text>
        <Text style={styles.cardContent}>
          Préparons nos cœurs pour Noël ! Inscriptions ouvertes pour la retraite du 8-10 décembre à l'abbaye de Saint-Wandrille.
        </Text>
        <Text style={styles.readMore}>Détails et inscription →</Text>
      </TouchableOpacity>

      {/* Annonce 2 : Groupe de Prière */}
      <TouchableOpacity 
        style={styles.announcementCard}
        onPress={() => Alert.alert("Groupe Charismatique", "Détails complets")}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardDate}>2 Nov. 2025</Text>
          <View style={[styles.cardSideLine, {backgroundColor: COLORS.inactive}]} />
        </View>
        <Text style={styles.cardTitle}>Nouveau Groupe Charismatique</Text>
        <Text style={styles.cardContent}>
          Tous les jeudis à 20h à la salle Saint-Pierre. Louange, enseignement et prière de guérison.
        </Text>
        <Text style={styles.readMore}>En savoir plus →</Text>
      </TouchableOpacity>

      {/* Annonce 3 : Action Solidaire */}
      <TouchableOpacity 
        style={styles.announcementCard}
        onPress={() => Alert.alert("Collecte", "Détails complets")}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardDate}>28 Oct. 2025</Text>
          <View style={[styles.cardSideLine, {backgroundColor: COLORS.youtubeRed}]} />
        </View>
        <Text style={styles.cardTitle}>Collecte pour les Sans-Abri</Text>
        <Text style={styles.cardContent}>
          Apportez vos dons (couvertures, produits d'hygiène) avant le 20 novembre.
        </Text>
        <Text style={styles.readMore}>Voir la liste des besoins →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    marginBottom: -12,
    marginTop: -50
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 15,
  },
  announcementCard: {
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
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardSideLine: {
    width: 4,
    height: 24,
    borderRadius: 2,
  },
  cardDate: {
    color: COLORS.darkGray,
    fontSize: 12,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: 5,
    color: COLORS.black,
    fontSize: 16
  },
  cardContent: {
    color: COLORS.darkGray,
    lineHeight: 20,
    marginVertical: 8,
  },
  readMore: {
    color: COLORS.primary,
    fontWeight: '600',
    textAlign: 'right',
    fontSize: 14,
  },
});

export default AnnouncementsSection;
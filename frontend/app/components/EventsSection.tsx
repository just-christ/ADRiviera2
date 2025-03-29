import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS } from '../../constants/Colors';

const EventsSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Événements</Text>

        {/* Événement 2 - Culte Spécial */}
      <TouchableOpacity 
        style={styles.eventCard}
        onPress={() => Alert.alert("Culte de Pâques", "Détails complets")}
      >
        <View style={styles.eventHeader}>
          <View style={[styles.eventDateBadge, {backgroundColor: COLORS.primary}]}>
            <Text style={[styles.eventDay, {color: COLORS.white}]}>DIM</Text>
            <Text style={[styles.eventNumber, {color: COLORS.white}]}>9</Text>
            <Text style={[styles.eventMonth, {color: COLORS.white}]}>AVR</Text>
          </View>
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>Culte Spécial de Pâques</Text>
            <View style={styles.eventMeta}>
              <Text style={styles.eventTime}>⏱ 10h30 - Temple Principal</Text>
              <Text style={[styles.eventStatus, {color: COLORS.primary}]}>Aujourd'hui</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Événement 1 - Mariage */}
      <TouchableOpacity 
        style={styles.eventCard}
        onPress={() => Alert.alert("Mariage", "Détails complets")}
      >
        <View style={styles.eventHeader}>
          <View style={styles.eventDateBadge}>
            <Text style={styles.eventDay}>SAM</Text>
            <Text style={styles.eventNumber}>10</Text>
            <Text style={styles.eventMonth}>JUIN</Text>
          </View>
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>Mariage de Jean & Marie</Text>
            <View style={styles.eventMeta}>
              <Text style={styles.eventTime}>⏱ 14h00 - Église Saint-Pierre</Text>
              <Text style={styles.eventStatus}>À venir</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.eventActionButton}
          onPress={(e) => {
            e.stopPropagation();
            Alert.alert("Inscription", "Formulaire d'inscription");
          }}
        >
          <Text style={styles.eventActionText}>Confirmer présence</Text>
        </TouchableOpacity>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 15,
  },
  eventCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventDateBadge: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 8,
    width: 60,
    alignItems: 'center',
    marginRight: 15,
  },
  eventDay: {
    fontWeight: 'bold',
    fontSize: 12,
    color: COLORS.darkGray,
  },
  eventNumber: {
    fontWeight: 'bold',
    fontSize: 20,
    color: COLORS.black,
  },
  eventMonth: {
    fontSize: 12,
    color: COLORS.darkGray,
    marginTop: -4,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 5,
  },
  eventMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventTime: {
    color: COLORS.darkGray,
    fontSize: 12,
  },
  eventStatus: {
    color: COLORS.inactive,
    fontSize: 12,
    fontWeight: '600',
  },
  eventActionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  eventActionText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default EventsSection;
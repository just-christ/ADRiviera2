import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import { COLORS } from '../../constants/Colors';

interface EventCardProps {
  day: string;
  number: string;
  month: string;
  title: string;
  time: string;
  location: string;
  status: string;
  isToday?: boolean;
  onPress: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  day,
  number,
  month,
  title,
  time,
  location,
  status,
  isToday = false,
  onPress
}) => (
  <TouchableOpacity 
    style={styles.card}
    onPress={onPress}
    activeOpacity={0.9}
  >
    <View style={styles.header}>
      <View style={[styles.dateBadge, isToday && { backgroundColor: COLORS.primary }]}>
        <Text style={[styles.day, isToday && { color: COLORS.white }]}>{day}</Text>
        <Text style={[styles.number, isToday && { color: COLORS.white }]}>{number}</Text>
        <Text style={[styles.month, isToday && { color: COLORS.white }]}>{month}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.meta}>
          <Text style={styles.time}>⏱ {time} - {location}</Text>
          <Text style={[styles.status, isToday && { color: COLORS.primary }]}>
            {status}
          </Text>
        </View>
      </View>
    </View>
    {!isToday && (
      <TouchableOpacity
        style={styles.actionButton}
        onPress={(e) => {
          e.stopPropagation();
          Alert.alert("Inscription", `Ouverture du formulaire pour: ${title}`);
        }}
      >
        <Text style={styles.actionText}>S'inscrire</Text>
      </TouchableOpacity>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateBadge: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 8,
    width: 60,
    alignItems: 'center',
    marginRight: 15,
  },
  day: {
    fontWeight: 'bold',
    fontSize: 12,
    color: COLORS.darkGray,
  },
  number: {
    fontWeight: 'bold',
    fontSize: 20,
    color: COLORS.black,
  },
  month: {
    fontSize: 12,
    color: COLORS.darkGray,
    marginTop: -4,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 5,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    color: COLORS.darkGray,
    fontSize: 12,
  },
  status: {
    color: COLORS.inactive,
    fontSize: 12,
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  actionText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default EventCard;
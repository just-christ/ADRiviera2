import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import { COLORS } from '../../constants/Colors';

interface AnnouncementCardProps {
  date: string;
  title: string;
  content: string;
  color: string;
  onPress: () => void;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  date,
  title,
  content,
  color,
  onPress
}) => (
  <TouchableOpacity 
    style={styles.card} 
    onPress={onPress}
    activeOpacity={0.9}
  >
    <View style={styles.header}>
      <Text style={styles.date}>{date}</Text>
      <View style={[styles.sideLine, {backgroundColor: color}]} />
    </View>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.content}>{content}</Text>
    <Text style={styles.readMore}>Lire plus →</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sideLine: {
    width: 4,
    height: 24,
    borderRadius: 2,
  },
  date: {
    color: COLORS.darkGray,
    fontSize: 12,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 8,
  },
  content: {
    color: COLORS.darkGray,
    lineHeight: 20,
    marginBottom: 8,
  },
  readMore: {
    color: COLORS.primary,
    fontWeight: '600',
    textAlign: 'right',
    fontSize: 14,
  },
});

export default AnnouncementCard;
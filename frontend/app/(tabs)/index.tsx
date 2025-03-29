import { StyleSheet, View, ScrollView, TouchableOpacity, Animated, RefreshControl, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import YouTubeFeed from '../components/YouTubeFeed';
import { COLORS } from '../../constants/Colors';
import AnnouncementsSection from '../components/AnnouncementsSection';
import EventsSection from '../components/EventsSection';
import Footer from '../components/Footer';

const HomeScreen = () => {
  // Messages défilants
  const messages = [
    "Bienvenue ! ",
    "1er culte : 06h a 10h",
    "2ème culte : 10h30 a 13h", 
    "Étude biblique tout les mercredi à 19h",
  ];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [currentMessage, setCurrentMessage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  // Animation des messages
  useEffect(() => {
    const timer = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);
  
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[COLORS.primary]}
        />
      }
    >
      {/* Bannière défilante */}
      <View style={styles.banner}>
        <Animated.Text style={[styles.bannerText, { opacity: fadeAnim }]}>
          {messages[currentMessage]}
        </Animated.Text>
      </View>

      {/* YouTubeFeed */}
      <YouTubeFeed />

      {/* Annonces */}
      <AnnouncementsSection />

      {/* Evênements */}
      <EventsSection />

      {/* Footer */}
      <Footer />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  banner: {
    backgroundColor: COLORS.white,
    padding: 15,
  },
  bannerText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 300,
    paddingVertical: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default HomeScreen;
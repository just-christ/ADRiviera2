import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { COLORS } from '../../constants/Colors';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

type SocialPlatform = 'facebook' | 'instagram' | 'youtube';

const Footer = () => {
  const urls: Record<SocialPlatform, string> = {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com'
  };

  const handleSocialPress = (platform: SocialPlatform) => {
    Linking.openURL(urls[platform]).catch(err => console.error('Erreur : ', err));
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.footerTitle}>Eglise Évangélique des Assemblées de DIEU (Riviera 2)</Text>
      {/* Liens de contact */}
      <TouchableOpacity 
        style={styles.linkContainer}
        onPress={() => Linking.openURL('mailto:contact@adriviera2.com')}
      >
        <Ionicons name="mail" size={20} color={COLORS.primary} />
        <Text style={styles.linkText}>contact@adriviera2.com</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.linkContainer}
        onPress={() => Linking.openURL('tel:0123456789')}
      >
        <Ionicons name="call" size={20} color={COLORS.primary} />
        <Text style={styles.linkText}>07 69 57 34 45</Text>
      </TouchableOpacity>
      
      {/* Ligne de séparation */}
      <View style={styles.separator} />
      
      {/* Icônes sociales */}
      <View style={styles.socialIcons}>
        <TouchableOpacity onPress={() => handleSocialPress('facebook')}>
          <FontAwesome name="facebook" size={24} color={COLORS.primary} style={styles.icon} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => handleSocialPress('instagram')}>
          <FontAwesome name="instagram" size={24} color={COLORS.primary} style={styles.icon} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => handleSocialPress('youtube')}>
          <FontAwesome name="youtube" size={24} color={COLORS.primary} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 25,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 15,
    textAlign: 'center'
  },
  separator: {
    height: 1,
    width: '80%',
    backgroundColor: COLORS.primary,
    marginVertical: 15,
    opacity: 0.3,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  linkText: {
    marginLeft: 10,
    color: COLORS.primary,
    fontSize: 14,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 15,
  },
});

export default Footer;
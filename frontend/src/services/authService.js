import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_API_URL, MEMBERS_API_URL } from '../services/config';

//
// Inscription + connexion automatique
//
export const register = async (userData) => {
  try {
    // 1. Création du compte
    const fullName = `${userData.lastName} ${userData.firstName}`;
    await axios.post(`${AUTH_API_URL}/register`, {
      name: fullName,
      email: userData.email,
      password: userData.password,
      contact: userData.contact,
      // …autres champs si nécessaire
    });

    // 2. Connexion automatique pour récupérer le token
    const { data: loginData } = await axios.post(`${AUTH_API_URL}/login`, {
      email: userData.email.trim(),
      password: userData.password
    });

    if (!loginData.token) {
      throw new Error("Aucun token reçu après l'inscription");
    }

    // 3. Stockage en AsyncStorage
    await AsyncStorage.multiSet([
      ['userToken', loginData.token],
      ['currentUserId', String(loginData.userId)]
    ]);

    return loginData;
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Échec de l'inscription";
    throw new Error(message);
  }
};

//
// Mise à jour du profil utilisateur
//
export const updateUserProfile = async (userId, profileData) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) throw new Error('Token manquant');

    const payload = {
      gender: profileData.gender,
      birth_date: profileData.birthDate.toISOString().split('T')[0],
      is_church_member: profileData.isChurchMember,
      is_baptized: profileData.isBaptized,
      baptism_date:
        profileData.isBaptized && profileData.baptismDate
          ? profileData.baptismDate.toISOString().split('T')[0]
          : null,
      baptism_location: profileData.baptismLocation || null
    };

    const response = await axios.put(
      `${MEMBERS_API_URL}/${userId}`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (err) {
    console.error('Erreur updateUserProfile:', err.response?.data || err.message);
    const msg = err.response?.data?.error || 'Échec de la mise à jour du profil';
    throw new Error(msg);
  }
};


//
// Gestion de session
//
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('userToken');
  } catch (error) {
    console.error('[TOKEN ERROR]', error);
    return null;
  }
};

export const getUserInfo = async () => {
  try {
    const info = await AsyncStorage.getItem('userInfo');
    return info ? JSON.parse(info) : null;
  } catch (error) {
    console.error('[USER INFO ERROR]', error);
    return null;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.multiRemove(['userToken', 'userInfo']);
  } catch (error) {
    console.error('[LOGOUT ERROR]', error);
    throw error;
  }
};
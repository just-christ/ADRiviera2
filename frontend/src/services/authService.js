import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Configuration de l'API
const API_URL = 'http://192.168.1.65:5000/api/auth';

// 2. Service d'inscription
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      ...userData,
      name: userData.name.trim()
    });

    if (!response.data.token) {
      throw new Error('Erreur lors de la création du compte');
    }

    await AsyncStorage.setItem('userToken', response.data.token);
    await AsyncStorage.setItem('userInfo', JSON.stringify({
      id: response.data.userId,
      email: userData.email,
      name: userData.name
    }));

    return response.data;
  } catch (error) {
    const errorData = error.response?.data;
    console.error('[REGISTER]', errorData || error.message);
    throw new Error(errorData?.error || errorData?.message || "Échec de l'inscription");
  }
};

// 3. Service de connexion (version optimisée)
export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { 
      email: email.trim(),
      password 
    });

    console.log('[LOGIN RESPONSE]', response.data); // Debug

    if (!response.data.token) {
      throw new Error('Réponse serveur invalide');
    }

    await AsyncStorage.multiSet([
      ['userToken', response.data.token],
      ['userInfo', JSON.stringify({
        id: response.data.userId,
        email: email.trim()
      })]
    ]);

    return { 
      token: response.data.token,
      userId: response.data.userId 
    };
  } catch (error) {
    const serverError = error.response?.data?.error;
    console.error('[LOGIN ERROR]', serverError || error.message);
    throw new Error(serverError || 'Échec de la connexion');
  }
};

// 4. Gestion de session
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
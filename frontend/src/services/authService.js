import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://172.16.5.13:5000';

// Fonction pour s'inscrire
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, userData);
    return response.data; 
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    throw error;
  }
};

// Fonction pour se connecter
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
    const { token, user } = response.data;

    if (!user) {
      throw new Error("L'utilisateur est invalide.");
    }

    await AsyncStorage.setItem('userToken', JSON.stringify({ token, user })); // Stocker token + user

    return user;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
};


// Fonction pour récupérer les infos de l'utilisateur stockées
export const getUserInfo = async () => {
  try {
    const userInfo = await AsyncStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error('Erreur lors de la récupération des infos utilisateur:', error);
    return null;
  }
};

// Fonction pour récupérer le token stocké
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('userToken');
  } catch (error) {
    console.error('Erreur lors de la récupération du token:', error);
    return null;
  }
};

// Fonction pour se déconnecter
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userInfo');
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    throw error;
  }
};

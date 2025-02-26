import axios from 'axios';

const API_URL = 'http://172.16.5.13:5000/api';

// Fonction pour récupérer les groupes
export const getGroups = async () => {
  try {
    const response = await axios.get(`${API_URL}/groups`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des groupes:', error);
    throw error;
  }
};

// Fonction pour récupérer les annonces
export const getAnnouncements = async () => {
  try {
    const response = await axios.get(`${API_URL}/announcements`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des annonces:', error);
    throw error;
  }
};

// Fonction pour récupérer les événements
export const getEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    throw error;
  }
};

// Fonction pour récupérer les informations du profil
export const getProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/members/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    throw error;
  }
};
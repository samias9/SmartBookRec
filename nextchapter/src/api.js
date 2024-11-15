import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/users'; // Préfixe correct pour les routes utilisateur

// Fonction pour créer un utilisateur
export const createUser = async (pseudo, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, { pseudo, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fonction pour mettre à jour un utilisateur
export const updateUser = async (userId, pseudo, password) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update/${userId}`, { pseudo, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fonction pour supprimer un utilisateur
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fonction pour se connecter
export const loginUser = async (pseudo, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { pseudo, password }); // Préfixe /api/users ajouté
    return response.data; // Le token devrait être dans `response.data.token` si envoyé par le backend
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fonction pour se déconnecter
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`); // Préfixe /api/users ajouté
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fonction pour récupérer tous les utilisateurs
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

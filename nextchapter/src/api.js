import axios from 'axios';

// Instance Axios avec la base URL
const API_BASE_URL = axios.create({ baseURL: 'http://localhost:5000/api' });


// Fonction pour créer un utilisateur
export const createUser = async (pseudo, password) => {
  try {
    const response = await API_BASE_URL.post('users/create', { pseudo, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fonction pour mettre à jour un utilisateur
export const updateUser = async (userId, pseudo, password) => {
  try {
    const response = await API_BASE_URL.put(`users/update/${userId}`, { pseudo, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fonction pour supprimer un utilisateur
export const deleteUser = async (userId) => {
  try {
    const response = await API_BASE_URL.delete(`users/delete/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fonction pour se connecter
export const loginUser = async (pseudo, password) => {
  try {
    const response = await API_BASE_URL.post('users/login', { pseudo, password });
    const token = response.data.token; // Récupérer le token à partir de la réponse
    localStorage.setItem('token', token); // Stocker le token dans localStorage
    return response.data; // Retourner la réponse complète
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fonction pour se déconnecter
export const logoutUser = async () => {
  try {
    const response = await API_BASE_URL.post('users/logout');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fonction pour récupérer tous les utilisateurs
export const getAllUsers = async () => {
  try {
    const response = await API_BASE_URL.get('users/all');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fonction pour promouvoir un utilisateur au niveau premium
export const promoteToPremium = async (userId, token) => {
  try {
    const response = await API_BASE_URL.put(`users/promote/premium/${userId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fonction pour rétrograder un utilisateur au niveau basique
export const promoteToBasic = async (userId, token) => {
  try {
    const response = await API_BASE_URL.put(`users/promote/basic/${userId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fonction pour rétrograder un utilisateur au niveau free
export const demoteToFree = async (userId, token) => {
  try {
    const response = await API_BASE_URL.put(`users/demote/free/${userId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fonction pour rétrograder un utilisateur au niveau basique
export const demoteToBasic = async (userId, token) => {
  try {
    const response = await API_BASE_URL.put(`users/demote/basic/${userId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getUserInfo = async (token) => {
  try {
    const response = await API_BASE_URL.get('users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Les données utilisateur renvoyées par le backend
  } catch (error) {
    console.error('Erreur lors de la récupération des informations utilisateur:', error.response || error.message);
    throw error.response ? error.response.data : { message: 'Une erreur inconnue s\'est produite' };
  }
};
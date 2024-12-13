import axios from 'axios';


const API_BASE_URL = axios.create({ baseURL: 'http://localhost:5000/api' });

export const createUser = async (pseudo, password) => {
  try {
    const response = await API_BASE_URL.post('users/create', { pseudo, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateUser = async (userId, pseudo, password) => {
  try {
    const response = await API_BASE_URL.put(`users/update/${userId}`, { pseudo, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await API_BASE_URL.delete(`users/delete/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const loginUser = async (pseudo, password) => {
  try {
    const response = await API_BASE_URL.post('users/login', { pseudo, password });
    const token = response.data.token; 
    localStorage.setItem('token', token); 
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const logoutUser = async () => {
  try {
    const response = await API_BASE_URL.post('users/logout');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const getAllUsers = async () => {
  try {
    const response = await API_BASE_URL.get('users/all');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateUserGrade = async (userId, grade, token) => {
  try {
    const response = await API_BASE_URL.patch(`users/${userId}/grade`, { grade }, {
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
    return response.data; 
  } catch (error) {
    console.error('Erreur lors de la récupération des informations utilisateur:', error.response || error.message);
    throw error.response ? error.response.data : { message: 'Une erreur inconnue s\'est produite' };
  }
};

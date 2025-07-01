import axios from 'axios';

const API_URL = 'http://localhost:3000/api/taches';

// Récupérer le token stocké et retourner les headers avec Authorization
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Obtenir toutes les tâches
export const getTaches = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

// Créer une nouvelle tâche
export const createTache = async (tacheData) => {
  const response = await axios.post(API_URL, tacheData, getAuthHeaders());
  return response.data;
};

// Mettre à jour une tâche
export const updateTache = async (id, tacheData) => {
  const response = await axios.put(`${API_URL}/${id}`, tacheData, getAuthHeaders());
  return response.data;
};

// Supprimer une tâche
export const deleteTache = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

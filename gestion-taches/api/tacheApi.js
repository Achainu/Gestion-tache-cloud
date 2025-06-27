// api/tacheApi.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/taches';

// Obtenir toutes les tâches
export const getTaches = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Créer une nouvelle tâche
export const createTache = async (tacheData) => {
  const response = await axios.post(API_URL, tacheData);
  return response.data;
};

// Mettre à jour une tâche
export const updateTache = async (id, tacheData) => {
  const response = await axios.put(`${API_URL}/${id}`, tacheData);
  return response.data;
};

// Supprimer une tâche
export const deleteTache = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

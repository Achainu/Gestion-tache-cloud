import axios from 'axios';

//  Utilise le bon port correspondant à ton backend Express
const API_URL = 'http://localhost:3000/api/taches';

// Obtenir toutes les tâches
export const getTaches = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Obtenir une tâche par ID (optionnel)
export const getTache = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Créer une nouvelle tâche
export const createTache = async (tache) => {
  const res = await axios.post(API_URL, tache);
  return res.data;
};

// Mettre à jour une tâche
export const updateTache = async (id, tache) => {
  const res = await axios.put(`${API_URL}/${id}`, tache);
  return res.data;
};

// Supprimer une tâche
export const deleteTache = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

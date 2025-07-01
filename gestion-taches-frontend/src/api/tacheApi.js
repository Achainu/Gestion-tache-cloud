import axios from 'axios';

// ⚙️ À adapter selon ton environnement (dev, prod...)
const API_BASE_URL = 'http://localhost:3000/api';
const TACHE_URL = `${API_BASE_URL}/taches`;
const LOGIN_URL = `${API_BASE_URL}/auth/login`;

// 📦 Headers avec le token JWT
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  };
};

// 🔐 Connexion (authentification)
export const login = async (email, password) => {
  try {
    const res = await axios.post(LOGIN_URL, { email, password });
    const token = res.data.token;
    if (token) {
      localStorage.setItem('token', token); // 🔒 Stockage du token
    }
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 📥 Obtenir toutes les tâches
export const getTaches = async () => {
  const res = await axios.get(TACHE_URL, getAuthHeaders());
  return res.data;
};

// 📄 Obtenir une tâche par ID
export const getTache = async (id) => {
  const res = await axios.get(`${TACHE_URL}/${id}`, getAuthHeaders());
  return res.data;
};

// ➕ Créer une nouvelle tâche
export const createTache = async (tache) => {
  const res = await axios.post(TACHE_URL, tache, getAuthHeaders());
  return res.data;
};

// ✏️ Modifier une tâche
export const updateTache = async (id, tache) => {
  const res = await axios.put(`${TACHE_URL}/${id}`, tache, getAuthHeaders());
  return res.data;
};

// ❌ Supprimer une tâche
export const deleteTache = async (id) => {
  const res = await axios.delete(`${TACHE_URL}/${id}`, getAuthHeaders());
  return res.data;
};

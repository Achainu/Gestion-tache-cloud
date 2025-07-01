const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const tacheRoutes = require('./routes/tacheRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Route publique pour l’authentification
app.use('/api/auth', authRoutes);

// Middleware pour protéger les routes suivantes
const authMiddleware = require('./middleware/authMiddleware');
app.use('/api/taches', authMiddleware, tacheRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connecté à MongoDB Atlas');
    app.listen(PORT, () => console.log(`Serveur en ligne sur http://localhost:${PORT}`));
  })
  .catch(err => console.error('Erreur MongoDB:', err));

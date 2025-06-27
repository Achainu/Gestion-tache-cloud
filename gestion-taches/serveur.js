const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const tacheRoutes = require('./routes/tacheRoutes');

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/taches', tacheRoutes);

// Connexion à MongoDB + lancement du serveur
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" Connecté à MongoDB Atlas");
    app.listen(PORT, () => console.log(` Serveur en ligne sur http://localhost:${PORT}`));
  })
  .catch(err => console.error(" Erreur MongoDB:", err));

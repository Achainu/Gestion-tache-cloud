const mongoose = require('mongoose');

const TacheSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  status: {
    type: String,
    enum: ['à faire', 'en cours', 'terminé'],
    default: 'à faire',
  },
  dateDebut: {
    type: Date,
    required: false,
  },
  dateFin: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Tache', TacheSchema);
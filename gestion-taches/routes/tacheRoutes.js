const express = require('express');
const router = express.Router();
const Tache = require('../models/Tache');
const authMiddleware = require('../middleware/authMiddleware');

// 📋 GET - Lister toutes les tâches
router.get('/', authMiddleware, async (req, res) => {
  try {
    const taches = await Tache.find().sort({ createdAt: -1 });
    res.status(200).json(taches);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🔍 GET - Une tâche par ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const tache = await Tache.findById(req.params.id);
    if (!tache) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.status(200).json(tache);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ➕ POST - Ajouter une tâche
router.post('/', authMiddleware, async (req, res) => {
  try {
    const nouvelleTache = new Tache(req.body);
    const saved = await nouvelleTache.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Erreur création tâche' });
  }
});

// ✏️ PUT - Modifier une tâche
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Tache.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erreur modification' });
  }
});

// ❌ DELETE - Supprimer une tâche
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Tache.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.status(200).json({ message: 'Tâche supprimée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur suppression' });
  }
});

module.exports = router;

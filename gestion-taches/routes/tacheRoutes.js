const express = require('express');
const router = express.Router();
const Tache = require('../models/Tache');

// GET - Liste de toutes les tâches
router.get('/', async (req, res) => {
  try {
    const taches = await Tache.find().sort({ createdAt: -1 });
    res.status(200).json(taches);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// GET - Récupérer une tâche par ID
router.get('/:id', async (req, res) => {
  try {
    const tache = await Tache.findById(req.params.id);
    if (!tache) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.status(200).json(tache);
  } catch (err) {
    console.error('Erreur lors de la récupération :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST - Ajouter une tâche
router.post('/', async (req, res) => {
  try {
    const nouvelleTache = new Tache(req.body);
    const savedTache = await nouvelleTache.save();
    res.status(201).json(savedTache);
  } catch (err) {
    console.error('Erreur lors de la création :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// PUT - Modifier une tâche par ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTache = await Tache.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTache) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.status(200).json(updatedTache);
  } catch (err) {
    console.error('Erreur lors de la modification :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// DELETE - Supprimer une tâche par ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTache = await Tache.findByIdAndDelete(req.params.id);
    if (!deletedTache) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.status(200).json({ message: 'Tâche supprimée avec succès' });
  } catch (err) {
    console.error('Erreur lors de la suppression :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;

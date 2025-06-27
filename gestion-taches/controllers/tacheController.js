const Tache = require('../models/Tache');

// GET toutes les tâches
exports.getTaches = async (req, res) => {
  try {
    const taches = await Tache.find();
    res.status(200).json(taches);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors du chargement des tâches." });
  }
};

// POST - Créer une nouvelle tâche
exports.createTache = async (req, res) => {
  try {
    const { titre, description, status } = req.body;
    if (!titre) {
      return res.status(400).json({ message: "Le titre est requis." });
    }

    const tache = new Tache({ titre, description, status });
    await tache.save();
    res.status(201).json(tache);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la tâche." });
  }
};

// PUT - Modifier une tâche
exports.updateTache = async (req, res) => {
  try {
    const updatedTache = await Tache.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTache) {
      return res.status(404).json({ message: "Tâche non trouvée." });
    }

    res.status(200).json(updatedTache);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour." });
  }
};

// DELETE - Supprimer une tâche
exports.deleteTache = async (req, res) => {
  try {
    const deleted = await Tache.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Tâche non trouvée." });
    }
    res.status(200).json({ message: "Tâche supprimée." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression." });
  }
};

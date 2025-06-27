import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  PencilSquareIcon,
  DocumentTextIcon,
  FlagIcon,
  CalendarDaysIcon,
  XCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { UserContext } from '../context/contexts.jsx';

const EditTache = ({ onTacheUpdated }) => {
  const navigate = useNavigate();
  const { valeurUtiliserPartout, setValeurUtiliserPartout } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValeurUtiliserPartout((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (valeurUtiliserPartout.dateFin && valeurUtiliserPartout.dateFin < valeurUtiliserPartout.dateDebut) {
      toast.error("La date de fin doit être égale ou postérieure à la date de début");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(`http://localhost:3000/api/taches/${valeurUtiliserPartout._id}`, valeurUtiliserPartout);
      toast.success("Tâche mise à jour avec succès");
      onTacheUpdated && onTacheUpdated(res.data);
      navigate('/liste');
    } catch (err) {
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  if (!valeurUtiliserPartout) {
    return (
      <p className="text-center text-red-500 mt-10">
        Aucune tâche sélectionnée pour modification.
      </p>
    );
  }

  return (
    <section className="max-w-3xl mx-auto mt-10 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border shadow-xl p-8 space-y-6"
      >
        <div className="flex items-center gap-2 text-yellow-600 mb-4">
          <PencilSquareIcon className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Modifier la tâche</h2>
        </div>

        {/* Titre */}
        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
            <PencilSquareIcon className="h-5 w-5" />
            Titre
          </label>
          <input
            type="text"
            name="titre"
            value={valeurUtiliserPartout.titre}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
            <DocumentTextIcon className="h-5 w-5" />
            Description
          </label>
          <textarea
            name="description"
            value={valeurUtiliserPartout.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Statut */}
        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
            <FlagIcon className="h-5 w-5" />
            Statut
          </label>
          <select
            name="status"
            value={valeurUtiliserPartout.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="à faire">📌 À faire</option>
            <option value="en cours">⏳ En cours</option>
            <option value="terminé">✅ Terminé</option>
          </select>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
              <CalendarDaysIcon className="h-5 w-5" />
              Date de début
            </label>
            <input
              type="date"
              name="dateDebut"
              value={valeurUtiliserPartout.dateDebut}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
              <CalendarDaysIcon className="h-5 w-5" />
              Date de fin
            </label>
            <input
              type="date"
              name="dateFin"
              value={valeurUtiliserPartout.dateFin}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
        </div>

        {/* Boutons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/liste')}
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <XCircleIcon className="h-5 w-5 inline" /> Annuler
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow"
            disabled={loading}
          >
            <CheckCircleIcon className="h-5 w-5 inline" /> Enregistrer
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditTache;

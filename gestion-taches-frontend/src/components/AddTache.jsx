import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  PencilSquareIcon,
  DocumentTextIcon,
  FlagIcon,
  CalendarDaysIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

const AddTache = ({ onTacheAdded }) => {
  const [tache, setTache] = useState({
    titre: '',
    description: '',
    status: 'à faire',
    dateDebut: '',
    dateFin: '',
  });

  const handleChange = (e) => {
    setTache({ ...tache, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/taches', tache);
      toast.success('Tâche ajoutée avec succès');
      setTache({
        titre: '',
        description: '',
        status: 'à faire',
        dateDebut: '',
        dateFin: '',
      });
      onTacheAdded && onTacheAdded();
    } catch (error) {
      toast.error("Erreur lors de l'ajout");
    }
  };

  return (
    <section className="max-w-3xl mx-auto mt-12 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-3xl border p-8 space-y-6 animate-fade-in"
      >
        <div className="flex items-center gap-2 text-blue-700 mb-4">
          <PlusCircleIcon className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Ajouter une nouvelle tâche</h2>
        </div>

        {/* Champ titre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <PencilSquareIcon className="h-5 w-5" />
            Titre
          </label>
          <input
            type="text"
            name="titre"
            value={tache.titre}
            onChange={handleChange}
            placeholder="Entrez le titre de la tâche"
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <DocumentTextIcon className="h-5 w-5" />
            Description
          </label>
          <textarea
            name="description"
            value={tache.description}
            onChange={handleChange}
            placeholder="Ajoutez des détails"
            rows={3}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Statut */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FlagIcon className="h-5 w-5" />
            Statut
          </label>
          <select
            name="status"
            value={tache.status}
            onChange={handleChange}
            className={`w-full rounded-lg px-4 py-2 border focus:ring-2 focus:ring-blue-500 
              ${tache.status === 'à faire' ? 'bg-gray-100 text-gray-800' : ''}
              ${tache.status === 'en cours' ? 'bg-yellow-100 text-yellow-800' : ''}
              ${tache.status === 'terminé' ? 'bg-green-100 text-green-800' : ''}
            `}
          >
            <option value="à faire">📌 À faire</option>
            <option value="en cours">⏳ En cours</option>
            <option value="terminé">✅ Terminé</option>
          </select>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <CalendarDaysIcon className="h-5 w-5" />
              Date de début
            </label>
            <input
              type="date"
              name="dateDebut"
              value={tache.dateDebut}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <CalendarDaysIcon className="h-5 w-5" />
              Date de fin
            </label>
            <input
              type="date"
              name="dateFin"
              value={tache.dateFin}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Bouton */}
        <div className="text-right mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow flex items-center gap-2"
          >
            <PlusCircleIcon className="h-5 w-5" />
            Ajouter la tâche
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddTache;

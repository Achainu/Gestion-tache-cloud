import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Accueil from './pages/Accueil';
import AddTache from './components/AddTache';
import ListeTaches from './components/ListeTaches';
import EditTache from './components/EditTache';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './context/contexts.jsx';

export default function App() {
  // const { valeurUtiliserPartout, setValeurUtiliserPartout } = useContext(UserContext);
  const [taches, setTaches] = useState([]);
  const [valeurUtiliserPartout, setValeurUtiliserPartout] = useState();

  // Récupérer les tâches au chargement (exemple API)


  const ajouterTache = (tache) => {
    setTaches([...taches, tache]);
    toast.success('Tâche ajoutée !');
  };

  const supprimerTache = (id) => {
    setTaches(taches.filter(t => t._id !== id));
    toast.info('Tâche supprimée');
  };

  const modifierTache = (tacheModif) => {
    if (!tacheModif || !tacheModif._id) {
      toast.error('Tâche invalide');
      return;
    }

    setTaches((prevTaches) =>
      prevTaches.map((t) => (t._id === tacheModif._id ? { ...t, ...tacheModif } : t))
    );
    toast.success('Tâche modifiée avec succès');
  };

  return (
    <UserContext.Provider value={{ valeurUtiliserPartout, setValeurUtiliserPartout }}>
      <BrowserRouter>
        <nav className="bg-blue-600 shadow-md p-4 text-white">
          <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap">
            {/* Logo ou nom de l'app */}
            <div className="text-2xl font-extrabold tracking-tight">
              AMBD<span className="text-yellow-300">Tasks</span>
            </div>

            {/* Liens de navigation */}
            <div className="flex space-x-6 mt-2 sm:mt-0">
              <Link
                to="/"
                className="hover:bg-blue-700 px-4 py-2 rounded transition duration-200 font-medium"
              >
                Accueil
              </Link>
              <Link
                to="/ajouter"
                className="hover:bg-blue-700 px-4 py-2 rounded transition duration-200 font-medium"
              >
                Ajouter tâche
              </Link>
              <Link
                to="/liste"
                className="hover:bg-blue-700 px-4 py-2 rounded transition duration-200 font-medium"
              >
                Liste des tâches
              </Link>
            </div>
          </div>
        </nav>


        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/ajouter" element={<AddTache onTacheAdded={ajouterTache} />} />
          <Route path="/liste" element={<ListeTaches taches={taches} onSupprimer={supprimerTache} />} />
          <Route path="/modifier/:id" element={<EditTache taches={taches} onModifier={modifierTache} />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Navbar from './components/Navbar.jsx';
import AddTache from './components/AddTache';
import ListeTaches from './components/ListeTaches';
import EditTache from './components/EditTache';
import Login from './pages/Login.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './context/contexts.jsx';

const Layout = ({ children }) => {
  return <>{children}</>;
};

function App() {
  const [valeurUtiliserPartout, setValeurUtiliserPartout] = useState(null);
  const [taches, setTaches] = useState([]);

  const ajouterTache = (nouvelleTache) => {
    setTaches((prev) => [...prev, nouvelleTache]);
    toast.success('Tâche ajoutée avec succès !');
  };

  const supprimerTache = (id) => {
    setTaches((prev) => prev.filter((t) => t.id !== id));
    toast.info('Tâche supprimée.');
  };

  const modifierTache = (id, tacheModifiee) => {
    setTaches((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...tacheModifiee } : t))
    );
    toast.success('Tâche modifiée !');
  };

  return (
    <UserContext.Provider value={{ valeurUtiliserPartout, setValeurUtiliserPartout }}>
      <BrowserRouter>
        <Layout>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/ajouter" element={<AddTache onTacheAdded={ajouterTache} />} />
            <Route path="/liste" element={<ListeTaches taches={taches} onSupprimer={supprimerTache} />} />
            <Route path="/modifier/:id" element={<EditTache taches={taches} onModifier={modifierTache} />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

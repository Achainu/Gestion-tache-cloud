import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/contexts';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const { valeurUtiliserPartout } = useContext(UserContext);
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info("Déconnexion réussie");
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 shadow-md p-4 text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap">
        <div className="text-2xl font-extrabold tracking-tight">
          AMBD<span className="text-yellow-300">Tasks</span>
        </div>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          {isLoggedIn && (
            <>
              <Link to="/accueil" className="hover:bg-blue-700 px-4 py-2 rounded font-medium">
                Accueil
              </Link>
              <Link to="/ajouter" className="hover:bg-blue-700 px-4 py-2 rounded font-medium">
                Ajouter tâche
              </Link>
              <Link to="/liste" className="hover:bg-blue-700 px-4 py-2 rounded font-medium">
                Liste des tâches
              </Link>
              <button
                onClick={handleLogout}
                className="hover:bg-red-500 px-4 py-2 rounded font-medium bg-red-400 text-white"
              >
                Déconnexion
              </button>
            </>
          )}
          {!isLoggedIn && (
            <Link to="" className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded text-black font-medium">
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

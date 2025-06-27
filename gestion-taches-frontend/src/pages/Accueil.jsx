import React from 'react';
import { Link } from 'react-router-dom';
import {
  ClipboardDocumentListIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

const Accueil = () => (
  <section className="relative isolate overflow-hidden bg-gradient-to-r from-blue-50 via-white to-green-50 py-20 sm:py-28">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 items-center gap-12">
        
        {/* Texte & Actions */}
        <div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl leading-tight">
            Bienvenue sur <span className="text-blue-700">AMBDTasks</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            Gérez vos tâches efficacement avec 
            <span className="text-blue-600 font-semibold"> AMBDTasks</span>, votre outil intelligent pour 
            <strong className="text-gray-900"> organiser, suivre et accomplir</strong> vos priorités.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/liste"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white text-base font-semibold shadow hover:bg-blue-700 transition duration-200"
            >
              <ClipboardDocumentListIcon className="h-6 w-6" />
              Voir mes tâches
            </Link>

            <Link
              to="/ajouter"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white text-base font-semibold shadow hover:bg-green-700 transition duration-200"
            >
              <PlusCircleIcon className="h-6 w-6" />
              Nouvelle tâche
            </Link>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4761/4761472.png"
            alt="Illustration tâches"
            className="w-full max-w-md mx-auto drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  </section>
);

export default Accueil;

import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import EditTache from './EditTache';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    CalendarDaysIcon,
    PencilSquareIcon,
    TrashIcon,
    ClockIcon,
    ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { UserContext } from '../context/contexts';


const ListeTaches = () => {
    const navigate = useNavigate();
    const { valeurUtiliserPartout, setValeurUtiliserPartout } = useContext(UserContext);
    const [taches, setTaches] = useState([]);
    const [tacheAModifier, setTacheAModifier] = useState(null);

    useEffect(() => {
        fetchTaches();
    }, []);

    useEffect(() => {
        if (valeurUtiliserPartout) {
            console.log("Tâche à modifier :", valeurUtiliserPartout);
        }
    }, [valeurUtiliserPartout])
    const fetchTaches = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/taches');
            setTaches(res.data);
        } catch (error) {
            toast.error("Erreur lors du chargement des tâches");
        }
    };

    const supprimerTache = async (id) => {
        if (!window.confirm("Supprimer cette tâche ?")) return;
        try {
            await axios.delete(`http://localhost:3000/api/taches/${id}`);
            toast.success("Tâche supprimée");
            fetchTaches();
        } catch (error) {
            toast.error("Erreur lors de la suppression");
        }
    };

    const formatterDate = (dateStr) =>
        dateStr ? new Date(dateStr).toLocaleDateString() : "Non défini";

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-blue-700 flex items-center justify-center gap-2">
                    <ClipboardDocumentCheckIcon className="h-8 w-8" />
                    Mes tâches
                </h2>
                <p className="text-gray-600 mt-2">Consultez, modifiez ou supprimez vos tâches à tout moment.</p>
            </div>

            {tacheAModifier ? (
                <EditTache
                    tacheId={tacheAModifier}
                    onTacheUpdated={() => {
                        setTacheAModifier(null);
                        fetchTaches();
                    }}
                    onCancel={() => setTacheAModifier(null)}
                />
            ) : taches.length === 0 ? (
                <p className="text-gray-500 text-center">Aucune tâche disponible.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {taches.map((t) => (
                        <div
                            key={t._id}
                            className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-6 shadow-md transition hover:shadow-xl"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <ClipboardDocumentCheckIcon className="h-5 w-5 text-blue-500" />
                                {t.titre}
                            </h3>

                            <p className="text-sm text-gray-600 mt-1">{t.description}</p>

                            <div className="text-sm text-gray-700 mt-4 space-y-2">
                                <p className="flex items-center gap-2">
                                    <ClockIcon className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Statut :</span>
                                    <span
                                        className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold inline-block
                      ${t.status === 'à faire'
                                                ? 'bg-gray-200 text-gray-700'
                                                : t.status === 'en cours'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-green-100 text-green-700'}`}
                                    >
                                        {t.status}
                                    </span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <CalendarDaysIcon className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Début :</span>
                                    <span className="ml-1">{formatterDate(t.dateDebut)}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <CalendarDaysIcon className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Fin :</span>
                                    <span className="ml-1">{formatterDate(t.dateFin)}</span>
                                </p>
                            </div>

                            <div className="flex justify-end gap-3 mt-5">
                                <button
                                    onClick={() => {
                                        // setTacheAModifier(t._id);
                                        setValeurUtiliserPartout(t);
                                        navigate(`/modifier/${t._id}`);
                                    }}
                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm shadow"
                                >
                                    <PencilSquareIcon className="h-4 w-4" />
                                    Modifier
                                </button>
                                <button
                                    onClick={() => supprimerTache(t._id)}
                                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm shadow"
                                >
                                    <TrashIcon className="h-4 w-4" />
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ListeTaches;

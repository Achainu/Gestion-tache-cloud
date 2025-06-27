import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ListeTaches from './ListeTaches';
import AjouterTache from './AjouterTache';
import Modifier from './Modifier';

import {
    getTaches,
    createTache,
    updateTache,
    deleteTache,
} from '../api/tacheApi';

const TachesPage = () => {
    const [taches, setTaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tacheAModifier, setTacheAModifier] = useState(null);

    // Charger la liste des tâches
    const fetchTaches = async () => {
        setLoading(true);
        try {
            const data = await getTaches();
            setTaches(data);
        } catch (err) {
            toast.error('Erreur lors du chargement des tâches');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTaches();
        // eslint-disable-next-line
    }, []);

    // Ajouter une tâche
    const handleAjouter = async (newTache) => {
        try {
            const saved = await createTache(newTache);
            setTaches((prev) => [...prev, saved]);
            toast.success('Tâche ajoutée avec succès');
        } catch {
            toast.error('Erreur lors de l\'ajout');
        }
    };

    // Supprimer une tâche
    const handleSupprimer = async (id) => {
        if (!window.confirm('Confirmer la suppression ?')) return;

        try {
            await deleteTache(id);
            setTaches((prev) => prev.filter(t => t._id !== id));
            toast.success('Tâche supprimée');
        } catch {
            toast.error('Erreur lors de la suppression');
        }
    };

    // Modifier une tâche
    const handleModifier = async (tacheModifiee) => {
        try {
            const updated = await updateTache(tacheModifiee._id, tacheModifiee);
            setTaches((prev) =>
                prev.map(t => (t._id === updated._id ? updated : t))
            );
            setTacheAModifier(null);
            toast.success('Tâche modifiée avec succès');
        } catch {
            toast.error('Erreur lors de la modification');
        }
    };

    if (loading) return <p className="text-center mt-8">Chargement...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            {!tacheAModifier ? (
                <>
                    <AjouterTache onAjouter={handleAjouter} />
                    <ListeTaches
                        taches={taches}
                        onSupprimer={handleSupprimer}
                        onModifier={setTacheAModifier}
                    />
                </>
            ) : (
                <Modifier
                    tache={tacheAModifier}
                    onModifier={handleModifier}
                    onAnnuler={() => setTacheAModifier(null)}
                />
            )}
        </div>
    );
};

export default TachesPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/tacheApi';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await login(email, password);
            toast.success('Connexion réussie !');

            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                navigate('/Accueil');
            } else {
                toast.error('Erreur de stockage du token');
            }
        } catch (err) {
            toast.error('Échec de connexion : identifiants invalides ou serveur indisponible');
            console.error('Erreur login :', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="w-full max-w-md bg-white bg-opacity-90 rounded-xl shadow-lg p-8 space-y-6">
                <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Connexion</h2>

                {/* Loader */}
                {isLoading && (
                    <div className="flex justify-center mb-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Entrez votre email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded px-4 py-2 w-full transition"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Entrez votre mot de passe"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded px-4 py-2 w-full transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 rounded font-semibold text-white shadow transition ${
                            isLoading
                                ? 'bg-blue-300 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

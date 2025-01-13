import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import Menu from '../components/Menu';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';

const UserProfile = () => {
    const { user, token } = useContext(AuthContext);
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            fetchUserProfile();
        }
    }, [user]);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProfile(response.data);
        } catch (error) {
            console.error('Error al obtener el perfil del usuario:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:5001/api/users/profile', profile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage('Perfil actualizado exitosamente');
            setIsEditing(false);
        } catch (error) {
            console.error('Error al actualizar el perfil del usuario:', error);
            setMessage('Error al actualizar el perfil');
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        fetchUserProfile();
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-100 to-orange-200 text-gray-800">
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <div
                className={`container mx-auto p-6 mt-16 transition-all duration-300 ${
                    isMenuOpen ? 'ml-64' : ''
                }`}
            >
                <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 p-10 rounded-3xl shadow-xl overflow-hidden flex items-center">
                    <div className="w-2/3">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-4xl font-extrabold text-white">
                                {isEditing ? 'Editar Perfil' : 'Perfil del Usuario'}
                            </h2>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-semibold rounded-lg hover:shadow-lg transition-transform"
                                onClick={isEditing ? handleCancelClick : handleEditClick}
                            >
                                {isEditing ? 'Cancelar' : 'Editar'}
                            </motion.button>
                        </div>
                        {message && (
                            <motion.div
                                className="text-center text-green-500 mb-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                {message}
                            </motion.div>
                        )}
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, x: isEditing ? -100 : 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                            {isEditing ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {[
                                        { label: 'Nombre', name: 'name', type: 'text' },
                                        { label: 'Correo Electrónico', name: 'email', type: 'email' },
                                        { label: 'Dirección', name: 'address', type: 'text' },
                                        { label: 'Ciudad', name: 'city', type: 'text' },
                                        { label: 'Código Postal', name: 'postalCode', type: 'text' },
                                        { label: 'País', name: 'country', type: 'text' },
                                    ].map(({ label, name, type }) => (
                                        <div key={name}>
                                            <label className="text-gray-400 text-sm mb-2 block">{label}</label>
                                            <input
                                                type={type}
                                                name={name}
                                                value={profile[name]}
                                                onChange={handleChange}
                                                className="px-4 py-2 border border-gray-600 bg-gray-700 text-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 w-full"
                                            />
                                        </div>
                                    ))}
                                    <div className="flex justify-center mt-4 space-x-4">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="submit"
                                            className="px-6 py-3 bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-semibold rounded-lg hover:shadow-lg transition-transform"
                                        >
                                            Guardar
                                        </motion.button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-6">
                                    {[
                                        { label: 'Nombre', value: profile.name },
                                        { label: 'Correo Electrónico', value: profile.email },
                                        { label: 'Dirección', value: profile.address },
                                        { label: 'Ciudad', value: profile.city },
                                        { label: 'Código Postal', value: profile.postalCode },
                                        { label: 'País', value: profile.country },
                                    ].map(({ label, value }) => (
                                        <div key={label}>
                                            <label className="text-gray-400 text-sm mb-2 block">{label}</label>
                                            <p className="px-4 py-2 border border-gray-600 bg-gray-700 text-gray-300 rounded-lg">
                                                {value || 'Sin especificar'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                    {/* Carrito decorativo animado */}
                    <div className="w-1/3 flex justify-center items-center">
                        <motion.div
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            transition={{
                                repeat: Infinity,
                                duration: 1.5,
                                repeatType: 'reverse',
                            }}
                            className="text-orange-400 text-9xl"
                        >
                            <FaShoppingCart />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

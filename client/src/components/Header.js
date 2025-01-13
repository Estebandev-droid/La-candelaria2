import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import NotificationPopup from './NotificationPopup';

const Header = ({ toggleMenu, isMenuOpen }) => {
    const { user, logout } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/notifications', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setNotifications(response.data);
        } catch (error) {
            console.error('Error al obtener las notificaciones:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleNotificationClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <header className={`bg-gradient-to-r from-orange-400 to-yellow-500 p-4 shadow-lg transition-all duration-300 ${isMenuOpen ? 'ml-64' : ''}`}>
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-3xl font-extrabold text-white flex items-center">
                    <i className="fas fa-shopping-cart mr-3"></i>
                    La Candelaria
                </Link>
                <div className="flex items-center space-x-6">
                    {user ? (
                        <>
                            <span className="text-white font-semibold">Hola, {user.username}</span>
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                            >
                                Cerrar Sesión
                            </button>
                            <div className="relative">
                                <button className="text-white text-2xl focus:outline-none" onClick={handleNotificationClick}>
                                    <i className="fas fa-bell"></i>
                                    {notifications.length > 0 && (
                                        <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-red-600 rounded-full"></span>
                                    )}
                                </button>
                                {showPopup && (
                                    <NotificationPopup notifications={notifications} onClose={handleClosePopup} fetchNotifications={fetchNotifications} />
                                )}
                            </div>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Iniciar Sesión
                        </Link>
                    )}
                    <button onClick={toggleMenu} className="text-white text-2xl focus:outline-none">
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
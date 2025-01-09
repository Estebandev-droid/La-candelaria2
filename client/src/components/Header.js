import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = ({ toggleMenu, isMenuOpen }) => {
    const { user, logout } = useContext(AuthContext);

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
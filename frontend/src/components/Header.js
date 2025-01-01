import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = ({ toggleMenu, isMenuOpen }) => {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className={`bg-gradient-to-r from-blue-500 to-purple-500 p-4 shadow-lg ${isMenuOpen ? 'ml-64' : ''} transition-all duration-300`}>
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-extrabold text-white">
                    <i className="fas fa-shopping-cart mr-2"></i>
                    La Candelaria
                </h1>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-white">Hola, {user.username}</span>
                            <button onClick={logout} className="text-white">Cerrar Sesión</button>
                        </>
                    ) : (
                        <Link to="/login" className="text-white">Iniciar Sesión</Link>
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

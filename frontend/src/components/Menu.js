import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Menu = ({ toggleMenu, isMenuOpen }) => {
    const { user } = useContext(AuthContext);

    return (
        <div
            className={`fixed top-0 left-0 h-full bg-gray-900 text-white shadow-lg w-64 transform transition-transform duration-300 z-40 ${
                isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Menú</h2>
                <button
                    onClick={toggleMenu}
                    className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
                >
                    <i className="fas fa-times"></i>
                </button>
            </div>
            <nav className="space-y-4 p-4">
                <Link
                    to="/"
                    onClick={toggleMenu}
                    className="block py-2 px-4 rounded hover:bg-gray-700 transition"
                >
                    <i className="fas fa-home mr-2"></i> Inicio
                </Link>
                {user ? (
                    <>
                        <Link
                            to="/cart"
                            onClick={toggleMenu}
                            className="block py-2 px-4 rounded hover:bg-gray-700 transition"
                        >
                            <i className="fas fa-shopping-cart mr-2"></i> Carrito
                        </Link>
                        <Link
                            to="/create-product"
                            onClick={toggleMenu}
                            className="block py-2 px-4 rounded hover:bg-gray-700 transition"
                        >
                            <i className="fas fa-plus mr-2"></i> Crear Producto
                        </Link>
                        <Link
                            to="/product-list"
                            onClick={toggleMenu}
                            className="block py-2 px-4 rounded hover:bg-gray-700 transition"
                        >
                            <i className="fas fa-list mr-2"></i> Lista de Productos
                        </Link>
                    </>
                ) : (
                    <Link
                        to="/login"
                        onClick={toggleMenu}
                        className="block py-2 px-4 rounded hover:bg-gray-700 transition"
                    >
                        <i className="fas fa-user mr-2"></i> Iniciar Sesión
                    </Link>
                )}
            </nav>
        </div>
    );
};

export default Menu;
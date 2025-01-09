import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Menu = ({ toggleMenu, isMenuOpen }) => {
    const { user, isAuthenticated } = useContext(AuthContext);

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
                <nav className="mt-8">
                    <ul className="space-y-4">
                        <li>
                            <Link to="/" className="flex items-center space-x-2 hover:text-yellow-500">
                                <i className="fas fa-home"></i>
                                <span>Inicio</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/product-list" className="flex items-center space-x-2 hover:text-yellow-500">
                                <i className="fas fa-box"></i>
                                <span>Lista de Productos</span>
                            </Link>
                        </li>
                        {isAuthenticated && (
                            <>
                                <li>
                                    <Link to="/create-product" className="flex items-center space-x-2 hover:text-yellow-500">
                                        <i className="fas fa-plus"></i>
                                        <span>Crear Producto</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/inventory" className="flex items-center space-x-2 hover:text-yellow-500">
                                        <i className="fas fa-warehouse"></i>
                                        <span>Inventario</span>
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link to="/cart" className="flex items-center space-x-2 hover:text-yellow-500">
                                <i className="fas fa-shopping-cart"></i>
                                <span>Carrito</span>
                            </Link>
                        </li>
                        {!isAuthenticated && (
                            <li>
                                <Link to="/login" className="flex items-center space-x-2 hover:text-yellow-500">
                                    <i className="fas fa-sign-in-alt"></i>
                                    <span>Iniciar Sesión</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Menu;

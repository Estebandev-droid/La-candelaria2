import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Menu = ({ toggleMenu, isMenuOpen }) => {
    const { user, isAuthenticated } = useContext(AuthContext);

    return (
        <div
            className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-2xl w-64 transform transition-transform duration-300 z-50 ${
                isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <div className="p-6 relative">
                <h2 className="text-3xl font-extrabold mb-6 text-yellow-500">Menú</h2>
                <button
                    onClick={toggleMenu}
                    className="absolute top-6 right-6 text-white text-2xl hover:text-yellow-500 focus:outline-none"
                >
                    <i className="fas fa-times"></i>
                </button>
                <nav className="mt-10">
                    <ul className="space-y-6">
                        <li>
                            <Link to="/" className="flex items-center space-x-3 hover:text-yellow-500">
                                <i className="fas fa-home"></i>
                                <span>Inicio</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/product-list" className="flex items-center space-x-3 hover:text-yellow-500">
                                <i className="fas fa-box"></i>
                                <span>Lista de Productos</span>
                            </Link>
                        </li>
                        {isAuthenticated && (
                            <>
                                <li>
                                    <Link to="/create-product" className="flex items-center space-x-3 hover:text-yellow-500">
                                        <i className="fas fa-plus"></i>
                                        <span>Crear Producto</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/inventory" className="flex items-center space-x-3 hover:text-yellow-500">
                                        <i className="fas fa-warehouse"></i>
                                        <span>Inventario</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/order-history" className="flex items-center space-x-3 hover:text-yellow-500">
                                        <i className="fas fa-history"></i>
                                        <span>Historial de Pedidos</span>
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link to="/cart" className="flex items-center space-x-3 hover:text-yellow-500">
                                <i className="fas fa-shopping-cart"></i>
                                <span>Carrito</span>
                            </Link>
                        </li>
                        {!isAuthenticated && (
                            <li>
                                <Link to="/login" className="flex items-center space-x-3 hover:text-yellow-500">
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
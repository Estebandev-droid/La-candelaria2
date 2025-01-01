import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import Header from '../components/Header';
import Menu from '../components/Menu';
import { Link } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { addToCart } = useContext(CartContext);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
            setFeaturedProducts(response.data.filter(product => product.featured));
            setNewProducts(response.data.filter(product => product.isNew));
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

            {/* Carrousel / Banner */}
            <div className="relative w-full h-64 bg-gradient-to-r from-purple-500 to-indigo-500">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/images/banner.jpg")' }}></div>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h2 className="text-white text-3xl sm:text-5xl font-bold text-center">¡Descubre nuestras promociones!</h2>
                </div>
            </div>

            {/* Barra de búsqueda */}
            <div className="container mx-auto p-6">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>

            {/* Productos destacados */}
            <div className="container mx-auto p-6">
                <h3 className="text-2xl font-bold mt-8">Productos destacados</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {featuredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="rounded-lg shadow-lg bg-gray-800 hover:scale-105 transition-transform overflow-hidden"
                        >
                            <Link to={`/product/${product._id}`}>
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                            </Link>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{product.name}</h2>
                                <p className="text-gray-400">{product.description}</p>
                                <p className="text-lg font-bold text-indigo-400">${product.price}</p>
                                <div className="flex items-center mt-4 space-x-4">
                                    <button
                                        onClick={() => addToCart(product, 1)}
                                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition"
                                    >
                                        Agregar al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Nuevos productos */}
            <div className="container mx-auto p-6">
                <h3 className="text-2xl font-bold mt-8">Nuevos productos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {newProducts.map((product) => (
                        <div
                            key={product._id}
                            className="rounded-lg shadow-lg bg-gray-800 hover:scale-105 transition-transform overflow-hidden"
                        >
                            <Link to={`/product/${product._id}`}>
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                            </Link>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{product.name}</h2>
                                <p className="text-gray-400">{product.description}</p>
                                <p className="text-lg font-bold text-indigo-400">${product.price}</p>
                                <div className="flex items-center mt-4 space-x-4">
                                    <button
                                        onClick={() => addToCart(product, 1)}
                                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition"
                                    >
                                        Agregar al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Botón flotante */}
            <button
                className="fixed bottom-4 right-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-full shadow-lg"
                onClick={() => window.location.href = '/cart'}
            >
                <i className="fas fa-shopping-cart text-2xl"></i>
            </button>

            {/* Footer */}
            <footer className="bg-gray-800 text-white mt-12 p-4">
                <div className="flex justify-center space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer">
                        <i className="fab fa-facebook text-xl"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer">
                        <i className="fab fa-twitter text-xl"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer">
                        <i className="fab fa-instagram text-xl"></i>
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default Home;

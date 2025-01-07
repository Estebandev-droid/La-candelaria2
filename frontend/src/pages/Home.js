import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import Menu from '../components/Menu';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productService';
import CategoryCarousel from '../components/CategoryCarousel';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [message, setMessage] = useState('');
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts();
                setProducts(products);
                setFeaturedProducts(products.filter(product => product.featured));
                setNewProducts(products.filter(product => product.isNewProduct));
            } catch (error) {
                setMessage('Error al obtener los productos');
            }
        };

        fetchProducts();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleAddToCart = (product) => {
        if (!user) {
            setMessage('Debes estar logueado para agregar productos al carrito');
            setTimeout(() => {
                setMessage('');
            }, 2000);
            return;
        }
        addToCart(product, 1);
        setMessage('Producto agregado al carrito');
        setTimeout(() => {
            setMessage('');
        }, 2000); // Ocultar el mensaje después de 2 segundos
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-900 via-red-800 to-green-900 text-white">
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

            <main className={`container mx-auto p-6 mt-16 transition-all duration-300 ${isMenuOpen ? 'ml-64' : ''}`}>
                <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-green-400 to-yellow-400 mb-8">
                    Bienvenido a Mi Tienda
                </h1>
                <p className="mt-4 text-center text-lg text-gray-300 mb-8">
                    Encuentra los mejores productos aquí.
                </p>
                {message && (
                    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300">
                        {message}
                    </div>
                )}
                {/* Barra de búsqueda */}
                <div className="container mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500 shadow-md placeholder-gray-400"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <i className="fas fa-search absolute top-3 right-4 text-gray-400"></i>
                    </div>
                </div>

                {/* Carrusel de categorías */}
                <CategoryCarousel />

                {/* Espaciado adicional entre el carrusel y los productos */}
                <div className="my-12"></div>

                {/* Productos destacados */}
                <div className="container mx-auto mb-16">
                    <h3 className="text-4xl font-bold mb-8 text-green-300 text-center">Productos destacados</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div
                                    key={product._id}
                                    className="rounded-lg shadow-lg bg-gray-800 bg-opacity-50 hover:scale-105 transition-transform overflow-hidden"
                                >
                                    <Link to={`/product/${product._id}`}>
                                        <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/uploads/${product.imageUrl}`}
                                                alt={product.name}
                                                className="w-48 h-48 object-cover rounded-full hover:opacity-90 transition-transform duration-300"
                                            />
                                        </div>
                                    </Link>
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold text-green-400 text-center">{product.name}</h2>
                                        <p className="text-gray-400 text-sm text-center">{product.description}</p>
                                        <p className="text-lg font-bold text-green-400 mt-2 text-center">${product.price}</p>
                                        <div className="mt-4 flex justify-center">
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className="px-4 py-2 bg-gradient-to-r from-green-500 to-red-500 text-white font-medium rounded-lg hover:opacity-90 transition"
                                            >
                                                Agregar al carrito
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-400">No se encontraron productos.</p>
                        )}
                    </div>
                </div>

                {/* Nuevos productos */}
                <div className="container mx-auto mb-8">
                    <h3 className="text-4xl font-bold mb-8 text-red-300 text-center">Nuevos productos</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {newProducts.map((product) => (
                            <div
                                key={product._id}
                                className="rounded-lg shadow-lg bg-gray-800 bg-opacity-50 hover:scale-105 transition-transform overflow-hidden"
                            >
                                <Link to={`/product/${product._id}`}>
                                    <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/uploads/${product.imageUrl}`}
                                            alt={product.name}
                                            className="w-48 h-48 object-cover rounded-full hover:opacity-90 transition-transform duration-300"
                                        />
                                    </div>
                                </Link>
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-red-400 text-center">{product.name}</h2>
                                    <p className="text-gray-400 text-sm text-center">{product.description}</p>
                                    <p className="text-lg font-bold text-green-400 mt-2 text-center">${product.price}</p>
                                    <div className="mt-4 flex justify-center">
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-green-500 text-white font-medium rounded-lg hover:opacity-90 transition"
                                        >
                                            Agregar al carrito
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botón flotante de WhatsApp */}
                <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noreferrer"
                    className="fixed bottom-24 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                    <i className="fab fa-whatsapp text-2xl"></i>
                </a>

                {/* Botón flotante del carrito */}
                <Link
                    to="/cart"
                    className="fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-red-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                    <i className="fas fa-shopping-cart text-2xl"></i>
                </Link>

                {/* Footer */}
                <footer className="mt-16 p-4 bg-gray-800 text-center">
                    <div className="mt-4 text-center text-sm text-gray-500">&copy; 2025 Tu Tienda. Todos los derechos reservados.</div>
                </footer>
            </main>
        </div>
    );
};

export default Home;

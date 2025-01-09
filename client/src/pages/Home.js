import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import Menu from '../components/Menu';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productService';
import CategoryCarousel from '../components/CategoryCarousel';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
                toast.error('Error al obtener los productos');
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
            toast.error('Debes estar logueado para agregar productos al carrito');
            return;
        }
        addToCart(product, 1);
        toast.success(
            <div className="flex items-center space-x-2">
                <span>Producto agregado al carrito</span>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-yellow-400"
                >
                    ⭐
                </motion.div>
            </div>
        );
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-100 to-orange-200 text-gray-800">
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

            <main className={`container mx-auto p-6 mt-16 transition-all duration-300 ${isMenuOpen ? 'ml-64' : ''}`}>
                <div className="bg-white bg-opacity-70 rounded-lg shadow-lg p-8">
                    <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 mb-8 animate-fade-in">
                        Bienvenido a Mi Tienda
                    </h1>
                    <p className="mt-4 text-center text-lg text-gray-600 mb-8 animate-fade-in-delay">
                        Encuentra los mejores productos aquí.
                    </p>

                    {/* Barra de búsqueda */}
                    <div className="flex justify-center mb-8">
                        <div className="relative group w-1/2">
                            <motion.input
                                type="text"
                                placeholder="Buscar productos..."
                                className="w-full px-4 py-4 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-green-500 shadow-lg placeholder-gray-400 text-lg transition-transform duration-300"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <motion.i
                                className="fas fa-search absolute top-4 right-4 text-gray-400 cursor-pointer group-hover:text-green-500 text-2xl"
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            ></motion.i>
                        </div>
                    </div>

                    {/* Carrusel de categorías */}
                    <CategoryCarousel />

                    {/* Espaciado adicional entre el carrusel y los productos */}
                    <div className="my-12"></div>

                    {/* Productos destacados */}
                    <section>
                        <h3 className="text-4xl font-bold mb-8 text-orange-700 text-center">Productos destacados</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <motion.div
                                        key={product._id}
                                        whileHover={{ scale: 1.05 }}
                                        className="rounded-xl shadow-2xl bg-gradient-to-r from-yellow-400 to-orange-400 p-4 relative border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                                    >
                                        <Link to={`/product/${product._id}`} className="block">
                                            <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                                                <motion.img
                                                    src={`${process.env.REACT_APP_API_URL}/uploads/${product.image}`}
                                                    alt={product.name}
                                                    className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-md hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                        </Link>
                                        <div className="mt-4 text-center">
                                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                                            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                                            <p className="text-lg font-bold text-gray-900 mb-4">${product.price}</p>
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-medium rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform"
                                            >
                                                Agregar al carrito
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-center text-gray-600">No se encontraron productos.</p>
                            )}
                        </div>
                    </section>

                    {/* Nuevos productos */}
                    <section className="mt-16">
                        <h3 className="text-4xl font-bold mb-8 text-orange-700 text-center">Nuevos productos</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {newProducts.map((product) => (
                                <motion.div
                                    key={product._id}
                                    whileHover={{ scale: 1.05 }}
                                    className="rounded-xl shadow-2xl bg-gradient-to-r from-yellow-400 to-orange-400 p-4 relative border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                                >
                                    <Link to={`/product/${product._id}`} className="block">
                                        <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                                            <motion.img
                                                src={`${process.env.REACT_APP_API_URL}/uploads/${product.image}`}
                                                alt={product.name}
                                                className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-md hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                    </Link>
                                    <div className="mt-4 text-center">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                                        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                                        <p className="text-lg font-bold text-gray-900 mb-4">${product.price}</p>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-medium rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform"
                                        >
                                            Agregar al carrito
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
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
                    className="fixed bottom-4 right-4 bg-gradient-to-r from-orange-400 to-yellow-400 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                    <i className="fas fa-shopping-cart text-2xl"></i>
                </Link>

                {/* Footer */}
                <footer className="mt-16 p-4 bg-gray-800 text-center text-gray-400 text-sm">
                    &copy; 2025 Tu Tienda. Todos los derechos reservados.
                </footer>
            </main>
        </div>
    );
};

export default Home;

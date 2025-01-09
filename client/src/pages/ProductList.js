import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Menu from '../components/Menu';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            fetchProducts();
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredProducts(
            products.filter(product =>
                product.name.toLowerCase().includes(term) ||
                product.description.toLowerCase().includes(term)
            )
        );
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-100 to-orange-200 text-gray-800">
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <main className={`container mx-auto p-6 mt-16 transition-all duration-300 ${isMenuOpen ? 'ml-64' : ''}`}>
                <div className="bg-white/30 backdrop-blur-md rounded-xl p-8 shadow-lg">
                    <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 mb-8">
                        Lista de Productos
                    </h1>
                    <div className="flex justify-between items-center mb-6">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Buscar productos..."
                            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <Link
                            to="/create-product"
                            className="ml-4 px-6 py-3 bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-medium rounded-lg hover:opacity-90 transition"
                        >
                            Crear Producto
                        </Link>
                    </div>
                    <ul className="space-y-4">
                        {filteredProducts.map(product => (
                            <li key={product._id} className="bg-white/20 backdrop-blur-lg p-6 rounded-lg shadow-lg">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/uploads/${product.image}`}
                                        alt={product.name}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div>
                                        <h2 className="text-xl font-semibold text-orange-700">{product.name}</h2>
                                        <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                                        <p className="text-lg font-bold text-orange-700 mt-2">${product.price}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4 space-x-4">
                                    <Link
                                        to={`/edit-product/${product._id}`}
                                        className="px-4 py-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-medium rounded-lg hover:opacity-90 transition"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => deleteProduct(product._id)}
                                        className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:opacity-90 transition"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default ProductList;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Menu from '../components/Menu';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Añade el token de autenticación
                },
            });
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <main className={`container mx-auto p-6 mt-16 transition-all duration-300 ${isMenuOpen ? 'ml-64' : ''}`}>
                <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-green-400 to-yellow-400">
                    Lista de Productos
                </h1>
                <div className="mt-8">
                    <Link to="/create-product" className="px-4 py-2 bg-gradient-to-r from-green-500 to-red-500 text-white font-medium rounded-lg hover:opacity-90 transition">
                        Crear Producto
                    </Link>
                </div>
                <div className="mt-8">
                    <ul className="space-y-4">
                        {products.map(product => (
                            <li key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <img src={`${process.env.REACT_APP_API_URL}/uploads/${product.imageUrl}`} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                                    <div>
                                        <h2 className="text-xl font-semibold text-green-400">{product.name}</h2>
                                        <p className="text-gray-400 text-sm">{product.description}</p>
                                        <p className="text-lg font-bold text-red-400 mt-2">${product.price}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <Link to={`/edit-product/${product._id}`} className="px-4 py-2 bg-gradient-to-r from-green-500 to-red-500 text-white font-medium rounded-lg hover:opacity-90 transition">
                                        Editar
                                    </Link>
                                    <button onClick={() => deleteProduct(product._id)} className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:opacity-90 transition">
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

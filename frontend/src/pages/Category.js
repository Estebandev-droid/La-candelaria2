import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Menu from '../components/Menu';

const Category = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/api/products?category=${categoryName}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [categoryName]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-900 via-red-800 to-green-900 text-white">
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

            <main className={`container mx-auto p-6 mt-16 transition-all duration-300 ${isMenuOpen ? 'ml-64' : ''}`}>
                <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-green-400 to-yellow-400">
                    {categoryName}
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div
                                key={product._id}
                                className="rounded-lg shadow-lg bg-gray-800 bg-opacity-50 hover:scale-105 transition-transform overflow-hidden"
                            >
                                <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover hover:opacity-90 transition"
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-green-400">{product.name}</h2>
                                    <p className="text-gray-400 text-sm">{product.description}</p>
                                    <p className="text-lg font-bold text-red-400 mt-2">${product.price}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-400">No se encontraron productos.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Category;
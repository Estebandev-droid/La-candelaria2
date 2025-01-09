import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import Header from '../components/Header';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error al obtener el producto:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-100 via-yellow-100 to-orange-200 text-gray-800">
                <div className="text-lg font-bold text-orange-500 animate-pulse">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-100 to-orange-200 text-gray-800">
            <Header />
            <div className="container mx-auto p-6">
                <div className="flex flex-col md:flex-row items-center bg-white shadow-2xl rounded-2xl overflow-hidden transition-all transform hover:scale-105">
                    <img
                        src={`${process.env.REACT_APP_API_URL}/uploads/${product.image}`}
                        alt={product.name}
                        className="w-full md:w-1/2 h-72 object-cover rounded-l-2xl hover:opacity-95 transition duration-300"
                    />
                    <div className="md:ml-8 p-8 flex flex-col justify-between">
                        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 mb-6">
                            {product.name}
                        </h1>
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">{product.description}</p>
                        <p className="text-3xl font-bold text-orange-600 mb-8">${product.price}</p>
                        <div className="flex items-center space-x-6">
                            <input
                                type="number"
                                min="1"
                                defaultValue="1"
                                className="w-20 p-3 text-lg rounded-lg bg-orange-50 text-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-lg"
                            />
                            <button
                                onClick={() => addToCart(product, 1)}
                                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform"
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

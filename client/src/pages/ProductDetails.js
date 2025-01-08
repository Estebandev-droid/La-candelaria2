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
        return <div>Cargando...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-100 to-orange-200 text-gray-800">
            <Header />
            <div className="container mx-auto p-6">
                <div className="flex flex-col md:flex-row items-center">
                    <img src={`${process.env.REACT_APP_API_URL}/uploads/${product.image}`} alt={product.name} className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-lg" />
                    <div className="md:ml-6 mt-6 md:mt-0">
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
                            {product.name}
                        </h1>
                        <p className="mt-4 text-orange-600">{product.description}</p>
                        <p className="mt-4 text-lg font-bold text-orange-800">${product.price}</p>
                        <div className="flex items-center mt-4 space-x-4">
                            <input
                                type="number"
                                min="1"
                                defaultValue="1"
                                className="w-16 p-2 rounded-lg bg-orange-50 text-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                            <button
                                onClick={() => addToCart(product, 1)}
                                className="px-4 py-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg font-medium hover:opacity-90 transition"
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

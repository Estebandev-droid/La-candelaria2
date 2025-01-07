import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../services/productService';

const CategoryProducts = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await getProducts();
                const filteredProducts = allProducts.filter(product =>
                    product.category === categoryName
                );
                setProducts(filteredProducts);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchProducts();
    }, [categoryName]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-green-400 to-yellow-400 mb-8">
                {categoryName}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-green-400">{product.name}</h2>
                        <p className="text-gray-300">{product.description}</p>
                        <p className="text-lg font-bold text-green-400 mt-2">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryProducts;
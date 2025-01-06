import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getProductById, createProduct, updateProduct } from '../services/productService';
import { AuthContext } from '../context/AuthContext';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        image: null,
        featured: false,
        isNewProduct: false,
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const productData = await getProductById(id);
                    setProduct(productData);
                } catch (error) {
                    console.error('Error al obtener el producto:', error);
                }
            };

            fetchProduct();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (name === 'image') {
            setProduct({
                ...product,
                image: files[0],
            });
        } else {
            setProduct({
                ...product,
                [name]: type === 'checkbox' ? checked : value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setMessage('Debes estar logueado para crear un producto.');
            return;
        }
        try {
            if (id) {
                await updateProduct(id, product);
                setMessage('Producto actualizado con éxito.');
            } else {
                await createProduct(product);
                setMessage('Producto creado con éxito.');
            }
            setTimeout(() => {
                navigate('/');
            }, 2000); // Redirigir después de 2 segundos
        } catch (error) {
            console.error('Error al guardar el producto:', error);
            setMessage('Error al guardar el producto.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
            <Header />
            <div className="container mx-auto p-6 mt-16">
                <div className="max-w-lg mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-green-400 to-yellow-400">
                        {id ? 'Editar Producto' : 'Crear Producto'}
                    </h1>
                    {message && <p className="text-center text-green-500">{message}</p>}
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Descripción</label>
                            <textarea
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Precio</label>
                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Imagen</label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
                                accept="image/*"
                            />
                            {product.image && (
                                <div className="mt-4">
                                    <img
                                        src={URL.createObjectURL(product.image)}
                                        alt="Vista previa"
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={product.featured}
                                onChange={handleChange}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-300">Destacado</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isNewProduct"
                                checked={product.isNewProduct}
                                onChange={handleChange}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-300">Nuevo</label>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-green-500 rounded-lg font-medium hover:opacity-90 transition"
                            >
                                {id ? 'Actualizar Producto' : 'Crear Producto'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Menu from '../components/Menu';
import { getProductById, createProduct, updateProduct } from '../services/productService';
import { AuthContext } from '../context/AuthContext';
import { categoriesData } from '../data/categoriesData';
import { toast } from 'react-toastify';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [featured, setFeatured] = useState(false);
    const [isNewProduct, setIsNewProduct] = useState(false);
    const [stock, setStock] = useState(0);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const productData = await getProductById(id);
                    setName(productData.name);
                    setDescription(productData.description);
                    setPrice(productData.price);
                    setCategory(productData.category);
                    setImage(productData.image);
                    setFeatured(productData.featured);
                    setIsNewProduct(productData.isNewProduct);
                    setStock(productData.stock);
                } catch (error) {
                    console.error('Error al obtener el producto:', error);
                }
            };

            fetchProduct();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            toast.error('Debes estar logueado para crear un producto.');
            return;
        }

        // Validación de campos
        if (!name || !description || !price || !category || stock === undefined) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        try {
            const productData = {
                name,
                description,
                price,
                category,
                featured,
                isNewProduct,
                stock,
                image: image ? image : null,
            };

            if (id) {
                await updateProduct(id, productData);
                toast.success('Producto actualizado con éxito.');
            } else {
                await createProduct(productData);
                toast.success('Producto creado con éxito.');
            }
            setTimeout(() => {
                navigate('/product-list');
            }, 2000); // Redirigir después de 2 segundos
        } catch (error) {
            console.error('Error al guardar el producto:', error);

            if (error.response && error.response.data) {
                // Check for detailed error messages from the server
                const serverError = error.response.data;
                if (serverError.details && Array.isArray(serverError.details)) {
                    toast.error(serverError.details.map(detail => `${detail.field}: ${detail.message}`).join(', '));
                } else if (serverError.message) {
                    toast.error(serverError.message);
                } else {
                    toast.error('Error al guardar el producto.'); // Fallback message
                }
            } else if (error.request) {
                // The request was made but no response was received
                toast.error('No se recibió respuesta del servidor.');
            } else {
                // Something happened in setting up the request that triggered an Error
                toast.error('Error al configurar la solicitud.');
            }
        }
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-100 to-orange-200 text-gray-800">
            <Header />
            <Menu />
            <div className="container mx-auto p-6 mt-16">
                <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-lg rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
                        {id ? 'Editar Producto' : 'Crear Producto'}
                    </h1>
                    {message && <p className="text-center text-green-500">{message}</p>}
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-orange-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Descripción</label>
                            <textarea
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-orange-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Precio</label>
                            <input
                                type="number"
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-orange-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Categoría</label>
                            <select
                                name="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-orange-400"
                                required
                            >
                                <option value="">Selecciona una categoría</option>
                                {categoriesData.map((category) => (
                                    <option key={category.name} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Imagen</label>
                            <div className="flex flex-col items-center">
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                    accept="image/*"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer px-4 py-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-medium rounded-lg hover:scale-105 transition-transform"
                                >
                                    Seleccionar archivo
                                </label>
                                {image && (
                                    <div className="mt-6">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="Vista previa"
                                            className="w-32 h-32 object-cover rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={featured}
                                onChange={(e) => setFeatured(e.target.checked)}
                                className="h-4 w-4 text-orange-600 focus:ring-orange-400 border-orange-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-orange-700">Destacado</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isNewProduct"
                                checked={isNewProduct}
                                onChange={(e) => setIsNewProduct(e.target.checked)}
                                className="h-4 w-4 text-orange-600 focus:ring-orange-400 border-orange-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-orange-700">Nuevo</label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-orange-400"
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg font-medium hover:scale-105 transition-transform"
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
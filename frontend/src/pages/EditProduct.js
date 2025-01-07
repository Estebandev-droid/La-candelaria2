import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../services/productService';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import Menu from '../components/Menu';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        featured: false,
        isNewProduct: false,
    });
    const [image, setImage] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [message, setMessage] = useState('');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error('Error al obtener el producto:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProduct = { ...product, image };
            await updateProduct(id, updatedProduct);
            setMessage('Producto actualizado exitosamente');
            setTimeout(() => {
                navigate('/product-list'); // Redirigir a la lista de productos después de actualizar
            }, 2000); // Esperar 2 segundos antes de redirigir
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            setMessage('Error al actualizar el producto');
        }
    };

    if (!isAuthenticated) {
        return <p>No estás autorizado para editar productos.</p>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <main className={`container mx-auto p-6 mt-16 transition-all duration-300 ${isMenuOpen ? 'ml-64' : ''}`}>
                <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-green-400 to-yellow-400">
                    Editar Producto
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
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
                            accept="image/*"
                        />
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
                            Actualizar Producto
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default EditProduct;

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
        stock: 0,
        imageUrl: '',
    });
    const [newStock, setNewStock] = useState(0);
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
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleStockChange = (e) => {
        setNewStock(parseInt(e.target.value, 10));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProduct = { ...product, stock: product.stock + newStock };
            if (image) {
                updatedProduct.image = image;
            }
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
        <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-100 to-orange-200 text-gray-800">
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <main className={`container mx-auto p-6 mt-16 transition-all duration-300 ${isMenuOpen ? 'ml-64' : ''}`}>
                <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
                    Editar Producto
                </h1>
                {message && <p className="text-center text-green-500">{message}</p>}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-800">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-orange-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-800">Descripción</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-orange-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-800">Precio</label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-orange-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-800">Stock Actual</label>
                        <input
                            type="number"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-orange-400"
                            disabled
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-800">Unidades Nuevas</label>
                        <input
                            type="number"
                            name="newStock"
                            value={newStock}
                            onChange={handleStockChange}
                            className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-800">Imagen</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-orange-400"
                            accept="image/*"
                        />
                        {product.imageUrl && (
                            <img
                                src={`${process.env.REACT_APP_API_URL}/uploads/${product.imageUrl}`}
                                alt={product.name}
                                className="w-32 h-32 object-cover mt-4"
                            />
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg font-medium hover:opacity-90 transition"
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

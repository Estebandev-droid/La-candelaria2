import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Header from '../components/Header';
import Menu from '../components/Menu';
import { AuthContext } from '../context/AuthContext';
import { categoriesData } from '../data/categoriesData';
import Modal from 'react-modal';

// Registrar los elementos de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Inventory = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

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

    useEffect(() => {
        fetchProducts();
    }, []);

    const getCategoryData = (category) => {
        const categoryProducts = products.filter(product => product.category === category);
        const labels = categoryProducts.map(product => product.name);
        const data = categoryProducts.map(product => product.stock);

        return {
            labels,
            datasets: [
                {
                    label: `Stock de ${category}`,
                    data,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                    ],
                },
            ],
        };
    };

    const openModal = (category) => {
        setSelectedCategory(category);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedCategory(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-100 to-orange-200 text-gray-800">
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <div className={`container mx-auto p-6 mt-16 transition-all duration-300 ${isMenuOpen ? 'ml-64' : ''}`}>
                <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
                    Inventario de Productos
                </h1>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categoriesData.map((category) => (
                        <div key={category.name} className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg cursor-pointer" onClick={() => openModal(category.name)}>
                            <h2 className="text-2xl font-semibold text-center text-orange-700 mb-4">{category.name}</h2>
                            <Pie data={getCategoryData(category.name)} />
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Productos de la Categoría"
                className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Productos de {selectedCategory}</h2>
                <ul className="space-y-4">
                    {products.filter(product => product.category === selectedCategory).map((product) => (
                        <li key={product._id} className="flex items-center justify-between bg-white/10 backdrop-blur-lg p-4 rounded-lg shadow-lg">
                            <div className="flex items-center space-x-4">
                                <img src={`${process.env.REACT_APP_API_URL}/uploads/${product.image}`} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                                <div>
                                    <h3 className="text-xl font-semibold text-orange-700">{product.name}</h3>
                                    <p className="text-gray-600 text-sm">Stock: {product.stock}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="text-center mt-6">
                    <button onClick={closeModal} className="px-4 py-2 bg-gradient-to-r from-red-400 to-green-400 text-white font-medium rounded-lg hover:scale-105 transition-transform">
                        Cerrar
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Inventory;
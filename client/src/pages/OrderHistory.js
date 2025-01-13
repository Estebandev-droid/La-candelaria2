import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Header from '../components/Header';
import Menu from '../components/Menu'; // Importar el componente Menu
import OrderDetailsPopup from '../components/OrderDetailsPopup'; // Importar el componente OrderDetailsPopup

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false); // Estado para manejar el loader
    const [selectedOrder, setSelectedOrder] = useState(null); // Estado para manejar el pedido seleccionado
    const [showPopup, setShowPopup] = useState(false); // Estado para manejar el popup
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para manejar el menú

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true); // Mostrar el loader mientras se cargan los pedidos
            try {
                const response = await axios.get('http://localhost:5001/api/orders/myorders', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error al obtener el historial de pedidos:', error);
            } finally {
                setLoading(false); // Ocultar el loader después de cargar los pedidos
            }
        };

        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, status) => {
        setLoading(true); // Mostrar el loader mientras se actualiza el estado del pedido
        try {
            const response = await axios.put(`http://localhost:5001/api/orders/${orderId}/status`, { status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            // Actualizar la lista de pedidos después de cambiar el estado
            const updatedOrders = orders.map(order => 
                order._id === orderId ? { ...order, status } : order
            );
            setOrders(updatedOrders);
            // Actualizar el pedido seleccionado si está abierto en el popup
            if (selectedOrder && selectedOrder._id === orderId) {
                setSelectedOrder({ ...selectedOrder, status });
                // Cerrar el popup si el estado del pedido se actualiza a "Pedido cerrado"
                if (status === 'Pedido cerrado') {
                    setShowPopup(false);
                    setSelectedOrder(null);
                }
            }
        } catch (error) {
            console.error('Error al actualizar el estado del pedido:', error);
        } finally {
            setLoading(false); // Ocultar el loader después de actualizar el estado del pedido
        }
    };

    const handleOrderDetails = (order) => {
        setSelectedOrder(order);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedOrder(null);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-100 to-orange-200 text-gray-800">
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <div className={`container mx-auto p-6 mt-16 transition-all duration-300 ${isMenuOpen ? 'ml-64' : ''}`}>
                <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Historial de Pedidos</h2>
                {loading ? (
                    <Loader /> // Mostrar el loader mientras se actualiza el estado del pedido
                ) : (
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <ul className="space-y-4">
                            {orders.map((order) => (
                                <li key={order._id} className="flex justify-between items-center bg-gradient-to-r from-yellow-400 to-orange-400 p-4 rounded-lg shadow-lg bg-opacity-40">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Pedido ID: {order._id}</h3>
                                        <p className="text-sm text-gray-600">Total: ${order.totalPrice}</p>
                                        <p className="text-sm text-gray-600">Estado: {order.status}</p>
                                        <div className="mt-2">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                className="px-2 py-1 rounded-lg bg-gray-200 text-gray-800"
                                            >
                                                <option value="Pedido en proceso">Pedido en proceso</option>
                                                <option value="Alistando pedido">Alistando pedido</option>
                                                <option value="Pedido enviado">Pedido enviado</option>
                                                <option value="Pedido cerrado">Pedido cerrado</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleOrderDetails(order)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Ver Detalles
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {showPopup && selectedOrder && (
                    <OrderDetailsPopup order={selectedOrder} onClose={handleClosePopup} />
                )}
            </div>
        </div>
    );
};

export default OrderHistory;

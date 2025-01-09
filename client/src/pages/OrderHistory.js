import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getMyOrders } from '../services/orderService';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
    const { user, token } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getMyOrders(token);
                setOrders(data);
            } catch (error) {
                console.error('Error al obtener los pedidos:', error);
            }
        };

        fetchOrders();
    }, [token]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-100 to-orange-200 text-gray-800">
            <div className="container mx-auto p-6 mt-16">
                <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
                    Historial de Pedidos
                </h1>
                <div className="mt-10">
                    {orders.length === 0 ? (
                        <p className="text-center text-gray-600">No has realizado ningún pedido.</p>
                    ) : (
                        <ul className="space-y-4">
                            {orders.map((order) => (
                                <li key={order._id} className="bg-white/10 backdrop-blur-lg p-4 rounded-lg shadow-lg">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-xl font-semibold text-orange-700">Pedido #{order._id}</h2>
                                            <p className="text-gray-600">Fecha: {new Date(order.createdAt).toLocaleDateString()}</p>
                                            <p className="text-gray-600">Total: ${order.totalPrice}</p>
                                        </div>
                                        <Link to={`/order/${order._id}`} className="px-4 py-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-medium rounded-lg hover:opacity-90 transition">
                                            Ver Detalles
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
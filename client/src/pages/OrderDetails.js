import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getOrderById } from '../services/orderService';

const OrderDetails = () => {
    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await getOrderById(id, token);
                setOrder(data);
            } catch (error) {
                console.error('Error al obtener el pedido:', error);
            }
        };

        fetchOrder();
    }, [id, token]);

    if (!order) {
        return <p className="text-center text-gray-600">Cargando...</p>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-100 to-orange-200 text-gray-800">
            <div className="container mx-auto p-6 mt-16">
                <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
                    Detalles del Pedido
                </h1>
                <div className="mt-10 bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-orange-700 mb-4">Pedido #{order._id}</h2>
                    <p className="text-gray-600 mb-4">Fecha: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="text-gray-600 mb-4">Total: ${order.totalPrice}</p>
                    <h3 className="text-xl font-semibold text-orange-700 mb-4">Artículos del Pedido</h3>
                    <ul className="space-y-4 mb-6">
                        {order.orderItems.map((item) => (
                            <li key={item.product} className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-800">{item.name} x {item.qty}</p>
                                </div>
                                <p className="text-gray-800">${item.price * item.qty}</p>
                            </li>
                        ))}
                    </ul>
                    <h3 className="text-xl font-semibold text-orange-700 mb-4">Dirección de Envío</h3>
                    <p className="text-gray-600 mb-4">{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                    <h3 className="text-xl font-semibold text-orange-700 mb-4">Método de Pago</h3>
                    <p className="text-gray-600 mb-4">{order.paymentMethod}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
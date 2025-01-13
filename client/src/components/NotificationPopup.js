import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NotificationPopup = ({ notifications, onClose, fetchNotifications }) => {
    const navigate = useNavigate();

    const handleStatusChange = async (orderId, status) => {
        try {
            await axios.put(`http://localhost:5001/api/orders/${orderId}/status`, { status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            fetchNotifications(); // Refrescar las notificaciones después de actualizar el estado
        } catch (error) {
            console.error('Error al actualizar el estado del pedido:', error);
        }
    };

    const handleCloseNotification = async (notificationId) => {
        try {
            await axios.delete(`http://localhost:5001/api/notifications/${notificationId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            fetchNotifications(); // Refrescar las notificaciones después de eliminar una notificación
        } catch (error) {
            console.error('Error al eliminar la notificación:', error);
        }
    };

    const handleNotificationClick = () => {
        navigate('/order-history'); // Redirigir a la página de historial de pedidos
        onClose(); // Cerrar el popup
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Notificaciones</h2>
                <ul className="space-y-4">
                    {notifications.map((notification) => (
                        <li key={notification._id} className="flex justify-between items-center bg-gradient-to-r from-yellow-400 to-orange-400 p-4 rounded-lg shadow-lg bg-opacity-40">
                            <div>
                                <p className="text-lg font-semibold text-gray-800">{notification.message}</p>
                                <p className="text-sm text-gray-600">Usuario: {notification.user.username}</p>
                                <p className="text-sm text-gray-600">Estado: {notification.order.status}</p>
                                <div className="mt-2">
                                    <select
                                        value={notification.order.status}
                                        onChange={(e) => handleStatusChange(notification.order._id, e.target.value)}
                                        className="px-2 py-1 rounded-lg bg-gray-200 text-gray-800"
                                    >
                                        <option value="Pedido en proceso">Pedido en proceso</option>
                                        <option value="Alistando pedido">Alistando pedido</option>
                                        <option value="Pedido enviado">Pedido enviado</option>
                                        <option value="Pedido cerrado">Pedido cerrado</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handleNotificationClick}
                                    className="text-blue-500 hover:underline"
                                >
                                    Ver Detalles
                                </button>
                                <button
                                    onClick={() => handleCloseNotification(notification._id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    &times;
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="text-center mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gradient-to-r from-red-400 to-green-400 text-white font-medium rounded-lg hover:scale-105 transition-transform duration-300"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationPopup;
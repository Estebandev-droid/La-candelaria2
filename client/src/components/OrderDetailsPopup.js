import React from 'react';

const OrderDetailsPopup = ({ order, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gradient-to-r from-orange-400 to-yellow-400 p-8 rounded-lg shadow-xl max-w-2xl w-full text-gray-800">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">Detalles del Pedido</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
                    <div className="space-y-2">
                        <p><strong>ID del Pedido:</strong> {order._id}</p>
                        <p><strong>Total:</strong> ${order.totalPrice}</p>
                        <p><strong>Estado:</strong> {order.status}</p>
                        <p>
                            <strong>Dirección de Envío:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        <p><strong>Método de Pago:</strong> {order.paymentMethod}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">Artículos del Pedido:</h3>
                        <ul className="space-y-4 mt-4">
                            {order.orderItems.map((item) => (
                                <li
                                    key={item.product}
                                    className="flex justify-between items-center bg-gradient-to-r from-yellow-400 to-orange-400 p-4 rounded-lg shadow-md"
                                >
                                    <div>
                                        <p className="font-semibold text-white"><strong>Producto:</strong> {item.name}</p>
                                        <p className="text-white"><strong>Cantidad:</strong> {item.qty}</p>
                                        <p className="text-white"><strong>Precio:</strong> ${item.price}</p>
                                    </div>
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/uploads/${item.image}`}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded-lg shadow-lg"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPopup;

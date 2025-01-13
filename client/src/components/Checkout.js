import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Checkout = ({ onClose, total, totalItems, paymentMethod, handlePaymentMethodChange, handlePurchase }) => {
    const { cart, clearCart } = useContext(CartContext);
    const { token } = useContext(AuthContext);

    const handleOrder = async () => {
        try {
            const orderData = {
                orderItems: cart.map(item => ({
                    name: item.product.name,
                    qty: item.quantity,
                    image: item.product.image, // Asegúrate de incluir la imagen
                    price: item.product.price,
                    product: item.product._id
                })),
                shippingAddress: {
                    address: '123 Main St',
                    city: 'Anytown',
                    postalCode: '12345',
                    country: 'USA'
                },
                paymentMethod: paymentMethod || 'Credit Card', // Asegúrate de que el método de pago esté presente
                itemsPrice: total,
                taxPrice: 0,
                shippingPrice: 0,
                totalPrice: total // Asegúrate de que el total esté presente
            };

            const response = await axios.post('http://localhost:5001/api/orders', orderData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Pedido realizado con éxito');
            clearCart();
            onClose();
        } catch (error) {
            console.error('Error al realizar el pedido:', error);
            if (error.response && error.response.data) {
                console.log(error.response.data); // Agrega esta línea para obtener más detalles del error
            }
            toast.error('Error al realizar el pedido');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full bg-opacity-40">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Resumen de la Compra</h2>
                <ul className="space-y-4">
                    {cart.map((item) => (
                        <li key={item.product._id} className="flex justify-between items-center bg-gradient-to-r from-yellow-400 to-orange-400 p-4 rounded-lg shadow-lg bg-opacity-40">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                                <p className="text-gray-600">Cantidad: {item.quantity}</p>
                            </div>
                            <p className="text-lg font-bold text-gray-800">${item.product.price * item.quantity}</p>
                        </li>
                    ))}
                </ul>
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800">Método de Pago</h3>
                    <div className="flex space-x-4 mt-2">
                        <button
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${paymentMethod === 'Credit Card' ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => handlePaymentMethodChange('Credit Card')}
                        >
                            <i className="fas fa-credit-card"></i>
                            <span>Tarjeta de Crédito</span>
                        </button>
                        <button
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${paymentMethod === 'Cash' ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => handlePaymentMethodChange('Cash')}
                        >
                            <i className="fas fa-money-bill-wave"></i>
                            <span>Efectivo</span>
                        </button>
                        <button
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${paymentMethod === 'Mobile' ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => handlePaymentMethodChange('Mobile')}
                        >
                            <i className="fas fa-mobile-alt"></i>
                            <span>Móvil</span>
                        </button>
                    </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                    <p className="text-lg font-bold text-gray-800">Total: ${total}</p>
                    <button
                        onClick={handleOrder}
                        className="px-4 py-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-medium rounded-lg hover:scale-105 transition-transform"
                    >
                        Realizar Pedido
                    </button>
                </div>
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

export default Checkout;

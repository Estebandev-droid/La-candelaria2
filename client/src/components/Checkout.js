import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { createOrder } from '../services/orderService';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Checkout = ({ onClose, total, paymentMethod, handlePaymentMethodChange }) => {
    const { cart, clearCart } = useContext(CartContext);
    const { token } = useContext(AuthContext);

    const handleOrder = async () => {
        const orderData = {
            orderItems: cart.map(item => ({
                name: item.product.name,
                qty: item.quantity,
                image: item.product.image,
                price: item.product.price,
                product: item.product._id
            })),
            shippingAddress: {
                address: '123 Main St',
                city: 'Anytown',
                postalCode: '12345',
                country: 'USA'
            },
            paymentMethod,
            itemsPrice: total,
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: total
        };

        try {
            await createOrder(orderData, token);
            toast.success('Compra realizada con éxito');
            clearCart();
            onClose();
        } catch (error) {
            console.error('Error al realizar la compra:', error);
            toast.error('Error al realizar la compra');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Resumen de la Compra</h2>
                <ul className="space-y-4">
                    {cart.map(item => (
                        <li
                            key={item.product._id}
                            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                                <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                            </div>
                            <p className="text-lg font-bold text-gray-800">${item.product.price * item.quantity}</p>
                        </li>
                    ))}
                </ul>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Método de Pago</h3>
                    <div className="flex space-x-4">
                        <button
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${paymentMethod === 'Credit Card' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => handlePaymentMethodChange('Credit Card')}
                        >
                            <i className="fas fa-credit-card"></i>
                            <span>Tarjeta</span>
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${paymentMethod === 'Cash' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => handlePaymentMethodChange('Cash')}
                        >
                            <i className="fas fa-money-bill-wave"></i>
                            <span>Efectivo</span>
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${paymentMethod === 'Mobile' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'}`}
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
                        className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-all"
                    >
                        Comprar
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400 transition-all"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

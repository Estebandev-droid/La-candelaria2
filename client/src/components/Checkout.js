import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { FaCreditCard, FaPaypal, FaMoneyBillWave, FaMobileAlt } from 'react-icons/fa';

const Checkout = ({ onClose, total, totalItems, paymentMethod, handlePaymentMethodChange, handlePurchase }) => {
    const { cart } = useContext(CartContext);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Resumen de Compra</h2>
                <ul className="mb-6">
                    {cart.map((item) => (
                        <li key={item.product._id} className="flex justify-between mb-4">
                            <span className="text-gray-800">{item.product.name} x {item.quantity}</span>
                            <span className="text-gray-800">${item.product.price * item.quantity}</span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between mb-4 text-gray-800">
                    <span className="font-bold">Total de productos:</span>
                    <span className="font-bold">{totalItems}</span>
                </div>
                <div className="flex justify-between mb-4 text-gray-800">
                    <span className="font-bold">Total a pagar:</span>
                    <span className="font-bold">${total}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Métodos de Pago</h3>
                <div className="flex justify-around mb-4">
                    <button
                        onClick={() => handlePaymentMethodChange('Visa')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${paymentMethod === 'Visa' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        <FaCreditCard size={32} />
                    </button>
                    <button
                        onClick={() => handlePaymentMethodChange('MasterCard')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${paymentMethod === 'MasterCard' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        <FaCreditCard size={32} />
                    </button>
                    <button
                        onClick={() => handlePaymentMethodChange('PayPal')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${paymentMethod === 'PayPal' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        <FaPaypal size={32} />
                    </button>
                    <button
                        onClick={() => handlePaymentMethodChange('Efectivo')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${paymentMethod === 'Efectivo' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        <FaMoneyBillWave size={32} />
                    </button>
                    <button
                        onClick={() => handlePaymentMethodChange('Nequi')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${paymentMethod === 'Nequi' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        <FaMobileAlt size={32} />
                    </button>
                </div>
                <div className="flex justify-between items-center">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:opacity-90 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handlePurchase}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:opacity-90 transition"
                    >
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

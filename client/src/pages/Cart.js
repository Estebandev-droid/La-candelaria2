import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Checkout from '../components/Checkout';
import axios from 'axios';
import { motion } from 'framer-motion';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
    const { isAuthenticated, user } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCheckout = () => {
        setIsCheckoutOpen(true);
    };

    const handleCloseCheckout = () => {
        setIsCheckoutOpen(false);
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const calculateTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    if (!isAuthenticated) {
        return <div>Debes iniciar sesión para ver tu carrito.</div>;
    }

    const handleQuantityChange = (productId, quantity) => {
        updateQuantity(productId, quantity);
    };

    const handlePurchase = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5001/api/orders', {
                items: cart.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity,
                })),
                total: calculateTotal(),
                paymentMethod,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            clearCart();
            handleCloseCheckout();
        } catch (error) {
            console.error('Error al realizar la compra:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-100 to-orange-200 text-gray-800">
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <div className={`container mx-auto p-6 mt-16 transition-all duration-300 ${isMenuOpen ? 'ml-64' : ''}`}>
                <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
                    Carrito de Compras
                </h1>
                <div className="mt-10">
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-600">Tu carrito está vacío.</p>
                    ) : (
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {cart.map((item) => (
                                    <motion.div
                                        key={item.product._id}
                                        whileHover={{ scale: 1.05 }}
                                        className="rounded-xl shadow-lg bg-gradient-to-r from-yellow-400 to-orange-400 p-6 relative border border-gray-300 overflow-hidden hover:shadow-xl transition-transform"
                                    >
                                        <img src={`${process.env.REACT_APP_API_URL}/uploads/${item.product.image}`} alt={item.product.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                                        <h2 className="text-xl font-bold text-gray-800">{item.product.name}</h2>
                                        <p className="text-sm text-gray-600 mt-2">{item.product.description}</p>
                                        <p className="text-lg font-bold text-green-600 mt-2">${item.product.price}</p>
                                        <div className="flex items-center mt-4">
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                                                className="w-16 p-2 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                            />
                                            <button
                                                onClick={() => removeFromCart(item.product._id)}
                                                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:scale-105 transition-transform"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="mt-10 text-center">
                                <p className="text-lg font-bold text-gray-700">Total: ${calculateTotal()}</p>
                                <button
                                    onClick={handleCheckout}
                                    className="mt-4 px-6 py-3 bg-gradient-to-r from-orange-400 to-yellow-500 text-white font-semibold rounded-lg hover:scale-110 transition-transform"
                                >
                                    Proceder al Pago
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {isCheckoutOpen && (
                    <Checkout
                        onClose={handleCloseCheckout}
                        total={calculateTotal()}
                        totalItems={calculateTotalItems()}
                        paymentMethod={paymentMethod}
                        handlePaymentMethodChange={handlePaymentMethodChange}
                        handlePurchase={handlePurchase}
                    />
                )}
            </div>
        </div>
    );
};

export default Cart;

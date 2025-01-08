import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Checkout from '../components/Checkout';

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
        return (
            <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-100 to-orange-200 text-gray-800 flex items-center justify-center">
                <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
                    Inicia sesión para acceder a tu carrito
                </h1>
            </div>
        );
    }

    const handleQuantityChange = (productId, quantity) => {
        if (quantity > 0) {
            updateQuantity(productId, quantity);
        }
    };

    const handlePurchase = () => {
        alert(`Pago realizado con ${paymentMethod}`);
        // Aquí puedes agregar la lógica para generar el pedido
        setIsCheckoutOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-100 to-orange-200 text-gray-800">
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <div className={`container mx-auto p-6 mt-16 transition-all duration-300 ${isMenuOpen ? 'ml-64' : ''}`}>
                <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
                    Tu Carrito de Compras
                </h1>
                {cart.length === 0 ? (
                    <p className="text-center mt-12 text-lg">No tienes productos en tu carrito. ¡Explora nuestras ofertas y agrega tus favoritos!</p>
                ) : (
                    <div className="mt-10 space-y-6">
                        {cart.map((item) => (
                            <div key={item.product._id} className="flex flex-col md:flex-row items-center justify-between bg-orange-50 p-6 rounded-lg shadow-md">
                                <div className="flex items-center space-x-6">
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/uploads/${item.product.image}`}
                                        alt={item.product.name}
                                        className="w-20 h-20 object-cover rounded-lg shadow-md"
                                    />
                                    <div>
                                        <h2 className="text-2xl font-semibold text-orange-700">{item.product.name}</h2>
                                        <p className="text-gray-600 text-sm mt-2">Cantidad:</p>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                                            className="w-16 px-2 py-1 mt-1 rounded-lg bg-orange-100 text-gray-800 focus:ring-2 focus:ring-orange-400 focus:outline-none text-center"
                                            min="1"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 md:text-right">
                                    <p className="text-xl font-bold text-orange-700">${item.product.price}</p>
                                    <button
                                        onClick={() => removeFromCart(item.product._id)}
                                        className="mt-4 px-4 py-2 bg-gradient-to-r from-red-400 to-green-400 text-white rounded-lg font-medium hover:scale-105 transition-transform"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="text-right">
                            <button
                                onClick={clearCart}
                                className="px-6 py-3 bg-gradient-to-r from-red-400 to-green-400 text-white rounded-lg font-bold hover:scale-105 transition-transform"
                            >
                                Vaciar Carrito
                            </button>
                            <button
                                onClick={handleCheckout}
                                className="ml-4 px-6 py-3 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-lg font-bold hover:scale-105 transition-transform"
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
    );
};

export default Cart;

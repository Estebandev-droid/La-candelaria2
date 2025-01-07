import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import Menu from '../components/Menu';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
    const { isAuthenticated, user } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
                <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-green-500 to-yellow-500">
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <div className={`container mx-auto p-6 mt-16 transition-all duration-300 ${isMenuOpen ? 'ml-64' : ''}`}>
                <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-green-500 to-yellow-500">
                    Tu Carrito de Compras
                </h1>
                {cart.length === 0 ? (
                    <p className="text-center mt-12 text-lg">No tienes productos en tu carrito. ¡Explora nuestras ofertas y agrega tus favoritos!</p>
                ) : (
                    <div className="mt-10 space-y-6">
                        {cart.map((item) => (
                            <div key={item.product._id} className="flex flex-col md:flex-row items-center justify-between bg-gray-800 p-6 rounded-lg shadow-md">
                                <div className="flex items-center space-x-6">
                                    <img
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        className="w-20 h-20 object-cover rounded-lg shadow-md"
                                    />
                                    <div>
                                        <h2 className="text-2xl font-semibold text-green-300">{item.product.name}</h2>
                                        <p className="text-gray-400 text-sm mt-2">Cantidad:</p>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                                            className="w-16 px-2 py-1 mt-1 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none text-center"
                                            min="1"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 md:text-right">
                                    <p className="text-xl font-bold text-green-400">${item.product.price}</p>
                                    <button
                                        onClick={() => removeFromCart(item.product._id)}
                                        className="mt-4 px-4 py-2 bg-gradient-to-r from-red-500 to-green-500 text-white rounded-lg font-medium hover:opacity-90 transition"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="text-right">
                            <button
                                onClick={clearCart}
                                className="px-6 py-3 bg-gradient-to-r from-red-500 to-green-500 text-white rounded-lg font-bold hover:opacity-90 transition"
                            >
                                Vaciar Carrito
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;

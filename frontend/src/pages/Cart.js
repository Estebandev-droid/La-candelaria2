import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
    const { isAuthenticated, user } = useContext(AuthContext);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
                <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                    Debes estar logueado para ver el carrito
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
            <Header />
            <div className="container mx-auto p-6 mt-16">
                <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                    Carrito de Compras
                </h1>
                {cart.length === 0 ? (
                    <p className="text-center mt-8">Tu carrito está vacío.</p>
                ) : (
                    <div className="mt-8">
                        {cart.map((item) => (
                            <div key={item.product._id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-lg mb-4">
                                <div className="flex items-center">
                                    <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                                    <div>
                                        <h2 className="text-xl font-semibold">{item.product.name}</h2>
                                        <div className="flex items-center mt-2">
                                            <label className="text-gray-400 mr-2">Cantidad:</label>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                                                className="w-16 px-2 py-1 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500"
                                                min="1"
                                            />
                                        </div>
                                        <p className="text-lg font-bold text-indigo-400 mt-2">${item.product.price}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.product._id)}
                                    className="px-4 py-2 bg-red-500 rounded-lg font-medium hover:opacity-90 transition"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                        <div className="flex justify-end mt-8">
                            <button
                                onClick={clearCart}
                                className="px-4 py-2 bg-red-500 rounded-lg font-medium hover:opacity-90 transition"
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
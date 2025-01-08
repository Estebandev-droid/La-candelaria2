import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {
        const existingProduct = cart.find((item) => item.product._id === product._id);
        if (existingProduct) {
            setCart(
                cart.map((item) =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );
        } else {
            setCart([...cart, { product, quantity }]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.product._id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCart(cart.map((item) =>
            item.product._id === productId
                ? { ...item, quantity }
                : item
        ));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
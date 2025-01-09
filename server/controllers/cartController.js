const Product = require('../models/productModel');

exports.purchase = async (req, res) => {
    const { cart, paymentMethod } = req.body;

    try {
        for (const item of cart) {
            const product = await Product.findById(item.product._id);
            if (!product) {
                return res.status(404).json({ message: `Producto con ID ${item.product._id} no encontrado` });
            }

            product.stock -= item.quantity;
            await product.save();
        }

        res.status(200).json({ message: `Pago realizado con ${paymentMethod}` });
    } catch (error) {
        console.error('Error al procesar la compra:', error);
        res.status(500).json({ message: 'Error al procesar la compra', error: error.message });
    }
};
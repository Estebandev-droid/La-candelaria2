const Order = require('../models/orderModel');

class OrderController {
    async createOrder(req, res) {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400).json({ message: 'No hay artículos en el pedido' });
            return;
        } else {
            const order = new Order({
                user: req.user._id,
                orderItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    }

    async getOrderById(req, res) {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    }

    async getMyOrders(req, res) {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    }
}

module.exports = new OrderController();
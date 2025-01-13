const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Notification = require('../models/notificationModel');
const { sendNotification } = require('../utils/notification');

class OrderController {
    async createOrder(req, res) {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400).json({ message: 'No hay artículos en el pedido' });
            return;
        } else {
            // Asegúrate de que cada item tenga una imagen
            for (const item of orderItems) {
                if (!item.image) {
                    return res.status(400).json({ message: `El artículo ${item.name} no tiene una imagen` });
                }
            }

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

            // Actualizar el inventario
            for (const item of orderItems) {
                const product = await Product.findById(item.product);
                if (product) {
                    product.stock -= item.qty;
                    await product.save();
                }
            }

            // Crear notificación
            const notificationMessage = `Nuevo pedido realizado por ${req.user.username}. Total: $${totalPrice}. Método de pago: ${paymentMethod}.`;
            const notification = new Notification({
                message: notificationMessage,
                order: createdOrder._id,
                user: req.user._id
            });
            await notification.save();

            // Enviar notificación al administrador
            sendNotification({
                title: 'Nuevo Pedido',
                message: notificationMessage,
                order: createdOrder
            });

            res.status(201).json(createdOrder);
        }
    }

    async getOrderById(req, res) {
        try {
            const order = await Order.findById(req.params.id).populate('user', 'username email');
            if (order) {
                res.json(order);
            } else {
                res.status(404).json({ message: 'Pedido no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el pedido' });
        }
    }

    async getMyOrders(req, res) {
        try {
            const orders = await Order.find({ user: req.user._id, status: { $ne: 'Pedido cerrado' } });
            res.json(orders);
        } catch (error) {
            console.error('Error al obtener los pedidos:', error);
            res.status(500).json({ message: 'Error al obtener los pedidos' });
        }
    }

    async updateOrderStatus(req, res) {
        try {
            const { status } = req.body;
            const order = await Order.findById(req.params.id);

            if (order) {
                order.status = status;
                if (status === 'Pedido enviado') {
                    order.isDelivered = true;
                    order.deliveredAt = Date.now();
                }
                const updatedOrder = await order.save();

                // Eliminar notificación si el pedido está cerrado
                if (status === 'Pedido cerrado') {
                    await Notification.deleteMany({ order: order._id });
                }

                res.json(updatedOrder);
            } else {
                res.status(404).json({ message: 'Pedido no encontrado' });
            }
        } catch (error) {
            console.error('Error al actualizar el estado del pedido:', error); // Registra el error completo
            res.status(500).json({ error: 'Error al actualizar el estado del pedido', details: error.message }); // Error más informativo
        }
    }
}

module.exports = new OrderController();
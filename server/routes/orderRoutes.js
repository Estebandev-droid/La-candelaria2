const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); // Asegúrate de importar el controlador correctamente
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: The orders managing API
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Returns the list of all the orders for the authenticated user
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: The list of the orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.route('/').post(protect, orderController.createOrder);
router.route('/myorders').get(protect, orderController.getMyOrders);
router.route('/:id').get(protect, orderController.getOrderById);
router.route('/:id/status').put(protect, orderController.updateOrderStatus);

module.exports = router;
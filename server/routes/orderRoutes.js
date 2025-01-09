const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
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
router.get('/', protect, (req, res) => orderController.getOrders(req, res));

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get the order by id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: The order description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: The order was not found
 */
router.get('/:id', protect, (req, res) => orderController.getOrderById(req, res));

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: The order was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Some server error
 */
router.post('/', protect, (req, res) => orderController.createOrder(req, res));

/**
 * @swagger
 * /api/orders/myorders:
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
router.get('/myorders', protect, (req, res) => orderController.getMyOrders(req, res));

module.exports = router;
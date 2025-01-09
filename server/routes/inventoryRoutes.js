const express = require('express');
const router = express.Router();
const { getInventory, createInventory } = require('../controllers/inventoryController');

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: The inventory managing API
 */

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Returns the list of all the inventory records
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: The list of the inventory records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inventory'
 */
router.get('/', getInventory);

/**
 * @swagger
 * /api/inventory:
 *   post:
 *     summary: Create a new inventory record
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventory'
 *     responses:
 *       201:
 *         description: The inventory record was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *       500:
 *         description: Some server error
 */
router.post('/', createInventory);

module.exports = router;
const Inventory = require('../models/inventoryModel');
const Product = require('../models/productModel');

exports.getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find().populate('product');
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el inventario', error: error.message });
    }
};

exports.createInventory = async (req, res) => {
    const { product, type, quantity } = req.body;

    // Validación de campos
    if (!product || !type || !quantity) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const newInventory = new Inventory({
            product,
            type,
            quantity,
        });

        await newInventory.save();

        // Actualizar el stock del producto
        const productToUpdate = await Product.findById(product);
        if (type === 'entrada') {
            productToUpdate.stock += quantity;
        } else {
            productToUpdate.stock -= quantity;
        }
        await productToUpdate.save();

        res.status(201).json(newInventory);
    } catch (error) {
        console.error('Error al crear el inventario:', error);
        res.status(500).json({ message: 'Error al crear el inventario', error: error.message });
    }
};
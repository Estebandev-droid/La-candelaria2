const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    const { name, description, price, category, featured, isNewProduct } = req.body;
    const image = req.file ? req.file.filename : null;

    // Validación de campos
    if (!name || !description || !price || !category) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            image,
            featured,
            isNewProduct,
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    const { name, description, price, category, featured, isNewProduct } = req.body;
    const image = req.file ? req.file.filename : null;

    // Validación de campos
    if (!name || !description || !price || !category) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                price,
                category,
                image,
                featured,
                isNewProduct,
            },
            { new: true }
        );

        res.json(updatedProduct);
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
};
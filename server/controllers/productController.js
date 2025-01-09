const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    const { name, description, price, category, featured, isNewProduct, stock } = req.body;
    const image = req.file ? req.file.filename : null;

    // Validación de campos
    if (!name || !description || !price || !category || stock === undefined) {
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
            stock,
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    const { name, description, price, category, featured, isNewProduct, stock } = req.body;
    const image = req.file ? req.file.filename : null;

    // Validación de campos
    if (!name || !description || !price || !category || stock === undefined) {
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
                stock,
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
};
const Product = require('../models/productModel');
const multer = require('multer');
const path = require('path');

// Configuración de multer para guardar las imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

class ProductController {
    async getProducts(req, res) {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos', error });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el producto', error });
        }
    }

    async createProduct(req, res) {
        const { name, description, price, featured, isNewProduct } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
        try {
            const newProduct = new Product({ name, description, price, imageUrl, featured, isNewProduct });
            await newProduct.save();
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el producto', error });
        }
    }

    async updateProduct(req, res) {
        const { name, description, price, featured, isNewProduct } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                { name, description, price, imageUrl, featured, isNewProduct },
                { new: true }
            );
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el producto', error });
        }
    }

    async deleteProduct(req, res) {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.status(200).json({ message: 'Producto eliminado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el producto', error });
        }
    }
}

module.exports = { ProductController, upload };
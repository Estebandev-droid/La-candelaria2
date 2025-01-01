const express = require('express');
const router = express.Router();
const { ProductController, upload } = require('../controllers/productController');

const productController = new ProductController();

router.get('/', (req, res) => productController.getProducts(req, res));
router.get('/:id', (req, res) => productController.getProductById(req, res));
router.post('/', upload.single('image'), (req, res) => productController.createProduct(req, res));
router.put('/:id', upload.single('image'), (req, res) => productController.updateProduct(req, res));
router.delete('/:id', (req, res) => productController.deleteProduct(req, res));

module.exports = router;
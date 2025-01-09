const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    isNewProduct: {
        type: Boolean,
        default: false,
    },
    stock: {
        type: Number,
        default: 0,
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
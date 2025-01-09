const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Asegúrate de importar las rutas de pedidos
const inventoryRoutes = require('./routes/inventoryRoutes');
const { swaggerUi, specs } = require('./config/swagger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Servir archivos estáticos

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes); // Asegúrate de incluir las rutas de pedidos
app.use('/api/inventory', inventoryRoutes);

// Conexión a MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
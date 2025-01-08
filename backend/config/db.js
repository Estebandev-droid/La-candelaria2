const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

// Verificar que la URL de conexión es correcta
console.log(process.env.MONGO_URI);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error al conectar a MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

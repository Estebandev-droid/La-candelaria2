const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendNotification = async ({ title, message, order }) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: title,
        text: `${message}\n\nDetalles del Pedido:\nID: ${order._id}\nTotal: ${order.totalPrice}\nMétodo de Pago: ${order.paymentMethod}\n\nGracias.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Notificación enviada al administrador');
    } catch (error) {
        console.error('Error al enviar la notificación:', error);
    }
};

module.exports = { sendNotification };
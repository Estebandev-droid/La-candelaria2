const Notification = require('../models/notificationModel');

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({}).sort({ createdAt: -1 }).populate('user', 'username').populate('order');
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las notificaciones' });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (notification) {
            await notification.remove();
            res.json({ message: 'Notificación eliminada' });
        } else {
            res.status(404).json({ message: 'Notificación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la notificación' });
    }
};

module.exports = { getNotifications, deleteNotification };
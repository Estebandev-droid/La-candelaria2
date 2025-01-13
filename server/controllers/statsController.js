const Order = require('../models/orderModel');

exports.getSalesStats = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const match = {};
        if (startDate) {
            match.createdAt = { $gte: new Date(startDate) };
        }
        if (endDate) {
            match.createdAt = match.createdAt || {};
            match.createdAt.$lte = new Date(endDate);
        }

        const stats = await Order.aggregate([
            { $match: match },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        day: { $dayOfMonth: "$createdAt" }
                    },
                    totalSales: { $sum: "$totalPrice" },
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
        ]);

        res.json(stats);
    } catch (error) {
        console.error('Error al obtener las estadísticas de ventas:', error);
        res.status(500).json({ message: 'Error al obtener las estadísticas de ventas', error: error.message });
    }
};
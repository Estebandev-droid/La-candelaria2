const express = require('express');
const router = express.Router();
const { getSalesStats } = require('../controllers/statsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/sales', protect, getSalesStats);

module.exports = router;
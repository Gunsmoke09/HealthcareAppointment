const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createAppointment } = require('../controllers/appointmentController');

router.post('/', protect, createAppointment);

module.exports = router;

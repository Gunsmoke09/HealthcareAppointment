const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // your protect middleware
const { createAppointment } = require('../controllers/appointmentController');

router.post('/', protect, createAppointment); // POST /api/appointments

module.exports = router;

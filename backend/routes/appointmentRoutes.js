const express = require('express');
const { getAppointments, addAppointment, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getAppointments).post(protect, addAppointment);
router.route('/:id').put(protect, updateAppointment).delete(protect, deleteAppointment);

module.exports = router;

const Appointment = require('../models/Appointment');
const User = require('../models/User'); // to check doctor exists

// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const patientId = req.user.id; 

    // check doctor exists
    const doctor = await User.findById(doctorId);
    if (!doctor) return res.status(400).json({ message: 'Doctor not found' });

    const appointment = new Appointment({ patientId, doctorId, date, time });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAppointment };
